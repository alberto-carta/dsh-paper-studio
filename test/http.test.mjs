/**
 * End-to-end checks over a real HTTP server: authentication, the symbol index,
 * streamed compile events (SSE) and on-demand page rendering.
 */
import assert from "node:assert/strict";
import http from "node:http";
import { after, test } from "node:test";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { __test } from "../index.js";

const token = "test-token-123";
const server = http.createServer(__test.createHandler(token));
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const api = (action, params) => {
  const url = new URL(`${origin}/paper-studio/api/${action}`);
  url.searchParams.set("t", token);
  for (const [key, value] of Object.entries(params || {})) url.searchParams.set(key, value);
  return url.toString();
};

after(() => new Promise((resolve) => server.close(resolve)));

const json = async (url, options) => {
  const response = await fetch(url, options);
  const body = await response.json();
  return { status: response.status, body };
};

test("routes reject callers without the page token", async () => {
  const response = await fetch(`${origin}/paper-studio/api/info`);
  assert.equal(response.status, 403);
});

test("a chat job streams the model answer and persists the transcript", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-chat-"));
  const project = { id: `chat-test-${Date.now()}`, name: "Chat test", path: dir };
  try {
    await __test.saveAgentFile(project, { scope: "project", markdown: "---\nname: Tester\n---\n\nBe brief.\n" });
    let lastOptions = null;
    __test.setServiceContext({
      get(name) {
        if (name === "llm") {
          return {
            stream: async function* stream(options) {
              lastOptions = options;
              yield { type: "text-delta", text: "Hello" };
              yield { type: "text-delta", text: " there" };
              yield { type: "finish", reason: { kind: "stop" } };
            },
          };
        }
        if (name === "agentDefaultModel") return { currentSelection: () => ({ provider: "fake", model: "fake" }) };
        return undefined;
      },
    });
    const job = __test.startChatJob(project, { agentId: "tester", agentScope: "project", message: "hi" });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("chat job timed out")), 2000);
      const check = () => {
        if (job.events.some((event) => event.type === "done" || event.type === "error")) {
          clearTimeout(timer);
          resolve();
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
    const deltas = job.events.filter((event) => event.type === "delta").map((event) => event.text).join("");
    assert.equal(deltas, "Hello there");
    assert.equal(job.done, true);
    const chats = await __test.listChats(project, "tester");
    assert.equal(chats.length, 1);
    const chat = await __test.readChat(project, "tester", chats[0].id);
    assert.deepEqual(chat.messages.map((message) => message.content), ["hi", "Hello there"]);

    // A second turn sends the assistant history; it must carry source.provider/model.
    const followUp = __test.startChatJob(project, { agentId: "tester", agentScope: "project", chatId: chat.id, message: "again" });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("follow-up chat timed out")), 2000);
      const check = () => {
        if (followUp.events.some((event) => event.type === "done" || event.type === "error")) { clearTimeout(timer); resolve(); }
        else setTimeout(check, 10);
      };
      check();
    });
    const assistant = lastOptions.messages.filter((message) => message.role === "assistant");
    assert.ok(assistant.length >= 1, "history keeps assistant turns");
    assert.deepEqual(assistant[0].source, { kind: "model", provider: "fake", model: "fake" });
  } finally {
    __test.setServiceContext(null);
    await rm(join(__test.CHATS_ROOT, project.id), { recursive: true, force: true });
    await rm(dir, { recursive: true, force: true });
  }
});

test("default agents are seeded once without overwriting", async () => {
  await __test.seedDefaultAgents();
  const agents = await __test.agentFiles(null);
  assert.ok(agents.some((agent) => agent.id === "research-partner"));
  assert.ok(agents.some((agent) => agent.id === "scientific-editor"));
  assert.equal((await __test.seedDefaultAgents()), 0);
  const common = await __test.readCommonAgent();
  assert.match(common, /Shared rules for every Paper Studio agent/u);
});

test("conversation memory is per chat, persisted and never summarized", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-memory-"));
  const project = { id: `memory-${Date.now()}`, name: "Memory", path: dir, mainFile: "main.tex" };
  try {
    await writeFile(join(dir, "main.tex"), "\\documentclass{article}\n", "utf8");
    await __test.saveAgentFile(project, { scope: "project", markdown: "---\nname: Memo\n---\n\nBe helpful.\n" });
    const seen = [];
    let calls = 0;
    __test.setServiceContext({
      get(name) {
        if (name === "llm") {
          return {
            stream: async function* stream(options) {
              calls += 1;
              seen.push(JSON.stringify(options.messages));
              if (calls === 1) {
                yield { type: "text-delta", text: "```memory\n- Uses emph for terms\n```\nok" };
              } else {
                yield { type: "text-delta", text: "ok" };
              }
              yield { type: "finish", reason: { kind: "stop" } };
            },
          };
        }
        if (name === "agentDefaultModel") return { currentSelection: () => ({ provider: "fake", model: "fake" }) };
        return undefined;
      },
    });
    const wait = (job) => new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("memory chat timed out")), 3000);
      const check = () => {
        if (job.events.some((event) => event.type === "done" || event.type === "error")) { clearTimeout(timer); resolve(); }
        else setTimeout(check, 10);
      };
      check();
    });
    await wait(__test.startChatJob(project, { agentId: "memo", agentScope: "project", message: "one" }));
    const chats = await __test.listChats(project, "memo");
    const chatId = chats[0].id;
    const chat = await __test.readChat(project, "memo", chatId);
    assert.match(chat.memory, /Uses emph for terms/u);
    assert.doesNotMatch(chat.systemPrompt, /Uses emph for terms/u);
    await wait(__test.startChatJob(project, { agentId: "memo", agentScope: "project", chatId, message: "two" }));
    assert.match(seen[1], /Uses emph for terms/u);
    await wait(__test.startChatJob(project, { agentId: "memo", agentScope: "project", message: "three" }));
    assert.doesNotMatch(seen[2], /Uses emph for terms/u);
    assert.match(seen[2], /\(empty\)/u);
    const chatsAfter = await __test.listChats(project, "memo");
    const fresh = await __test.readChat(project, "memo", chatsAfter.find((entry) => entry.id !== chatId).id);
    assert.equal(fresh.memory, undefined);
    assert.ok(!chat.messages.some((message) => String(message.content).includes("Uses emph for terms") && message.role === "user"));
  } finally {
    __test.setServiceContext(null);
    await rm(join(__test.CHATS_ROOT, project.id), { recursive: true, force: true });
    await rm(dir, { recursive: true, force: true });
  }
});

test("a chat freezes its system prompt and survives agent edits", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-snapshot-"));
  const project = { id: `snapshot-${Date.now()}`, name: "Snapshot", path: dir, mainFile: "main.tex" };
  try {
    await writeFile(join(dir, "main.tex"), "\\documentclass{article}\n", "utf8");
    await __test.saveAgentFile(project, { scope: "project", markdown: "---\nname: Snap\n---\n\nOLD PROMPT\n" });
    const systems = [];
    __test.setServiceContext({
      get(name) {
        if (name === "llm") {
          return {
            stream: async function* stream(options) {
              systems.push(options.system);
              yield { type: "text-delta", text: "ok" };
              yield { type: "finish", reason: { kind: "stop" } };
            },
          };
        }
        if (name === "agentDefaultModel") return { currentSelection: () => ({ provider: "fake", model: "fake" }) };
        return undefined;
      },
    });
    const wait = (job) => new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("snapshot chat timed out")), 3000);
      const check = () => {
        if (job.events.some((event) => event.type === "done" || event.type === "error")) { clearTimeout(timer); resolve(); }
        else setTimeout(check, 10);
      };
      check();
    });
    await wait(__test.startChatJob(project, { agentId: "snap", agentScope: "project", message: "one" }));
    const chats = await __test.listChats(project, "snap");
    const chatId = chats[0].id;
    await __test.saveAgentFile(project, { scope: "project", markdown: "---\nname: Snap\n---\n\nNEW PROMPT\n" });
    await wait(__test.startChatJob(project, { agentId: "snap", agentScope: "project", chatId, message: "two" }));
    assert.match(systems[0], /OLD PROMPT/u);
    assert.match(systems[1], /OLD PROMPT/u);
    assert.doesNotMatch(systems[1], /NEW PROMPT/u);
    const chat = await __test.readChat(project, "snap", chatId);
    assert.match(chat.systemPrompt, /OLD PROMPT/u);
    assert.equal(chat.promptMeta.agentName, "Snap");
    await __test.deleteAgentFile(project, "snap", "project");
    await wait(__test.startChatJob(project, { agentId: "snap", agentScope: "project", chatId, message: "three" }));
    assert.match(systems[2], /OLD PROMPT/u);
  } finally {
    __test.setServiceContext(null);
    await rm(join(__test.CHATS_ROOT, project.id), { recursive: true, force: true });
    await rm(dir, { recursive: true, force: true });
  }
});

test("the legacy Paper assistant folds into Research partner once", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-legacy-"));
  try {
    await writeFile(join(dir, "assistant.md"), "---\nname: Paper assistant\n---\n\nLegacy rules.\n", "utf8");
    await writeFile(join(dir, "research-partner.md"), "---\nname: Research partner\nreadFiles: allow\n---\n\nPartner rules.\n", "utf8");
    const merged = await __test.mergeLegacyPaperAssistant({ agentsRoot: dir, marker: join(dir, ".merged") });
    assert.equal(merged, true);
    const target = await readFile(join(dir, "research-partner.md"), "utf8");
    assert.match(target, /## Merged from Paper assistant/u);
    assert.match(target, /Partner rules\./u);
    assert.match(target, /Legacy rules\./u);
    await assert.rejects(() => readFile(join(dir, "assistant.md"), "utf8"));
    const backup = await readdir(join(dir, ".backup"));
    assert.ok(backup.some((name) => name.startsWith("assistant-")));
    assert.equal(await __test.mergeLegacyPaperAssistant({ agentsRoot: dir, marker: join(dir, ".merged") }), false);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("agents merge into a target and keep a backup", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-merge-"));
  try {
    await __test.saveAgentFile({ path: dir }, { scope: "project", markdown: "---\nname: Source agent\n---\n\nSource prompt.\n" });
    await __test.saveAgentFile({ path: dir }, { scope: "project", markdown: "---\nname: Target agent\n---\n\nTarget prompt.\n" });
    const merged = await __test.mergeAgentFile({ path: dir }, {
      sourceId: "source-agent", sourceScope: "project", targetId: "target-agent", targetScope: "project",
    });
    assert.equal(merged.id, "target-agent");
    assert.match(merged.markdown, /Target prompt\./u);
    assert.match(merged.markdown, /## Merged from Source agent/u);
    assert.match(merged.markdown, /Source prompt\./u);
    await assert.rejects(() => __test.readAgentFile({ path: dir }, "source-agent", "project"), /not found/u);
    const backup = await readdir(join(dir, "agents", ".backup"));
    assert.ok(backup.some((name) => name.startsWith("source-agent-")));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("agents can be renamed and the file moves", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-rename-"));
  try {
    await __test.saveAgentFile({ path: dir }, { scope: "project", markdown: "---\nname: Old name\n---\n\nPrompt.\n" });
    const renamed = await __test.renameAgentFile({ path: dir }, { id: "old-name", scope: "project", name: "New Name" });
    assert.equal(renamed.id, "new-name");
    assert.match(renamed.markdown, /name: New Name/u);
    const moved = await readFile(join(dir, "agents", "new-name.md"), "utf8");
    assert.match(moved, /Prompt\./u);
    await assert.rejects(() => __test.readAgentFile({ path: dir }, "old-name", "project"), /not found/u);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("project agents live in <project>/agents and export/import as JSON", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-local-agents-"));
  try {
    await __test.saveAgentFile({ path: dir }, { scope: "project", markdown: "---\nname: Local proof\n---\n\nBe local.\n" });
    const onDisk = await readFile(join(dir, "agents", "local-proof.md"), "utf8");
    assert.match(onDisk, /Be local\./u);
    const exported = await __test.exportAgents({ path: dir });
    assert.equal(exported.version, 1);
    assert.ok(exported.agents.some((agent) => agent.id === "local-proof"));
    const imported = await __test.importAgents({ path: dir }, {
      agents: [{ id: "imported-proof", markdown: "---\nname: Imported proof\n---\n\nImported.\n" }],
    });
    assert.equal(imported.imported, 1);
    const importedFile = await readFile(join(dir, "agents", "imported-proof.md"), "utf8");
    assert.match(importedFile, /Imported\./u);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("agents are markdown files in global or project scope", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-agents-"));
  const project = { path: dir };
  try {
    assert.equal((await __test.agentFiles(project)).some((agent) => agent.id === "test-proof"), false);
    const markdown = "---\nname: Test Proof\ndescription: prose review\nreadFiles: ask\n---\n\nBe strict.\n";
    const saved = await __test.saveAgentFile(project, { scope: "project", markdown });
    assert.equal(saved.id, "test-proof");
    const listed = await __test.agentFiles(project);
    const entry = listed.find((agent) => agent.id === "test-proof");
    assert.equal(entry.name, "Test Proof");
    assert.equal(entry.scope, "project");
    assert.equal(entry.readFiles, "ask");
    const read = await __test.readAgentFile(project, "test-proof", "project");
    assert.match(read.markdown, /Be strict/u);
    await __test.deleteAgentFile(project, "test-proof", "project");
    assert.equal((await __test.agentFiles(project)).some((agent) => agent.id === "test-proof"), false);
    await assert.rejects(() => __test.saveAgentFile(project, { scope: "project", markdown: "no frontmatter" }), /frontmatter/u);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("chat streams reasoning and stores it on the assistant turn", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-think-"));
  const project = { id: `think-test-${Date.now()}`, name: "Think", path: dir, mainFile: "main.tex" };
  try {
    await writeFile(join(dir, "main.tex"), "\\documentclass{article}\n", "utf8");
    await __test.saveAgentFile(project, { scope: "project", markdown: "---\nname: Thinker\n---\n\nBe brief.\n" });
    __test.setServiceContext({
      get(name) {
        if (name === "llm") {
          return {
            stream: async function* stream() {
              yield { type: "reasoning-delta", text: "First thought. " };
              yield { type: "reasoning-delta", text: "Last thought." };
              yield { type: "text-delta", text: "Answer" };
              yield { type: "finish", reason: { kind: "stop" } };
            },
          };
        }
        if (name === "agentDefaultModel") return { currentSelection: () => ({ provider: "fake", model: "fake" }) };
        return undefined;
      },
    });
    const job = __test.startChatJob(project, { agentId: "thinker", agentScope: "project", message: "hi" });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("thinking chat timed out")), 3000);
      const check = () => {
        if (job.events.some((event) => event.type === "done" || event.type === "error")) { clearTimeout(timer); resolve(); }
        else setTimeout(check, 10);
      };
      check();
    });
    assert.ok(job.events.some((event) => event.type === "reasoning"));
    const chats = await __test.listChats(project, "thinker");
    const chat = await __test.readChat(project, "thinker", chats[0].id);
    const assistant = chat.messages.find((message) => message.role === "assistant");
    assert.equal(assistant.reasoning, "First thought. Last thought.");
    assert.equal(assistant.content, "Answer");
  } finally {
    __test.setServiceContext(null);
    await rm(join(__test.CHATS_ROOT, project.id), { recursive: true, force: true });
    await rm(dir, { recursive: true, force: true });
  }
});

test("memory blocks contain one durable note per line", () => {
  assert.deepEqual(__test.memoryRequests("```memory\n- Prefers British spelling\n* Uses emph for terms\n```"), ["Prefers British spelling", "Uses emph for terms"]);
  assert.deepEqual(__test.memoryRequests("nothing"), []);
});

test("long chats summarize older turns and keep the tail", async () => {
  const chat = {
    messages: Array.from({ length: 30 }, (unused, index) => ({ role: index % 2 === 0 ? "user" : "assistant", content: `message ${index} ${"x".repeat(3000)}` })),
  };
  const events = [];
  const llm = {
    stream: async function* stream() {
      yield { type: "text-delta", text: "Condensed summary" };
      yield { type: "finish", reason: { kind: "stop" } };
    },
  };
  const job = { controller: new AbortController(), emit: (event) => events.push(event) };
  await __test.summarizeChat(llm, "fake", "fake", chat, 0, job);
  assert.equal(chat.summary, "Condensed summary");
  assert.ok(chat.summaryCount > 0);
  assert.ok(events.some((event) => event.type === "summary"));
  const messages = __test.chatRequestMessages(chat, "fake", "fake");
  assert.ok(messages.some((message) => /Summary of earlier conversation/u.test(message.content[0].text)));
});

test("summarizing never rewrites the frozen system prompt", async () => {
  const chat = {
    systemPrompt: "FROZEN SYSTEM PROMPT",
    promptMeta: { agentName: "Frozen agent", capturedAt: "2026-01-01T00:00:00.000Z" },
    messages: Array.from({ length: 30 }, (unused, index) => ({ role: index % 2 === 0 ? "user" : "assistant", content: `message ${index} ${"x".repeat(3000)}` })),
  };
  const llm = {
    stream: async function* stream() {
      yield { type: "text-delta", text: "Condensed summary" };
      yield { type: "finish", reason: { kind: "stop" } };
    },
  };
  await __test.summarizeChat(llm, "fake", "fake", chat, 0, { controller: new AbortController(), emit() {} });
  assert.equal(chat.summary, "Condensed summary");
  assert.equal(chat.systemPrompt, "FROZEN SYSTEM PROMPT");
  assert.deepEqual(chat.promptMeta, { agentName: "Frozen agent", capturedAt: "2026-01-01T00:00:00.000Z" });
});

test("short chats are not summarized", async () => {
  const chat = { messages: [{ role: "user", content: "hi" }] };
  const llm = { stream: async function* stream() { throw new Error("should not summarize"); } };
  const job = { controller: new AbortController(), emit() {} };
  await __test.summarizeChat(llm, "p", "m", chat, 0, job);
  assert.equal(chat.summary, undefined);
});

test("chat history gives assistant turns a model source", () => {
  const messages = __test.chatRequestMessages({ messages: [
    { role: "user", content: "hi" },
    { role: "assistant", content: "yo" },
  ] }, "deepseek", "chat");
  const assistant = messages.find((message) => message.role === "assistant");
  assert.deepEqual(assistant.source, { kind: "model", provider: "deepseek", model: "chat" });
  assert.ok(messages.some((message) => message.role === "user" && message.content[0].text === "hi"));
  assert.match(messages[0].content[0].text, /Persistent memory for this conversation/u);
});

test("git HEAD content is available for diff baselines", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-gitfile-"));
  try {
    execFileSync("git", ["init", "-q"], { cwd: dir });
    execFileSync("git", ["config", "user.email", "test@example.com"], { cwd: dir });
    execFileSync("git", ["config", "user.name", "Test"], { cwd: dir });
    await writeFile(join(dir, "main.tex"), "old\n", "utf8");
    execFileSync("git", ["add", "main.tex"], { cwd: dir });
    execFileSync("git", ["commit", "-qm", "init"], { cwd: dir });
    await writeFile(join(dir, "main.tex"), "new\n", "utf8");
    const base = await __test.gitFileContent({ path: dir }, "main.tex");
    assert.equal(base.tracked, true);
    assert.equal(base.content, "old\n");
    assert.equal((await __test.gitFileContent({ path: dir }, "other.tex")).tracked, false);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("PDF selection maps the full phrase inside its paragraph", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-word-"));
  try {
    await writeFile(join(dir, "main.tex"), "First paragraph line.\nSecond targetword here.\n\nAnother paragraph.\n", "utf8");
    const project = { path: dir };
    const hit = await __test.paragraphWordSelection(project, "main.tex", 2, "Second targetword here");
    assert.equal(hit.line, 2);
    assert.equal(hit.column, 0);
    assert.equal(hit.endLine, 2);
    assert.equal(hit.endColumn, 22);
    const miss = await __test.paragraphWordSelection(project, "main.tex", 2, "absent phrase here");
    assert.equal(miss.line, 1);
    assert.equal(miss.column, 0);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("literature is discovered from the main file's bibliography", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-bib-"));
  try {
    await writeFile(join(dir, "main.tex"), "\\documentclass{article}\n\\bibliography{refs}\n", "utf8");
    await writeFile(join(dir, "refs.bib"), "@article{einstein1905,\n  title = {On the Electrodynamics of Moving Bodies},\n  author = {Einstein, Albert},\n  year = {1905},\n  journal = {Annalen der Physik}\n}\n", "utf8");
    const context = await __test.literatureContext({ path: dir, mainFile: "main.tex" });
    assert.match(context, /refs\.bib/u);
    assert.match(context, /einstein1905/u);
    assert.match(context, /On the Electrodynamics of Moving Bodies/u);
    assert.match(context, /1905/u);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("web blocks parse search and fetch requests", () => {
  assert.deepEqual(__test.webRequests("```web\nsearch: bandit materials discovery\n```"), [{ kind: "search", query: "bandit materials discovery" }]);
  assert.deepEqual(__test.webRequests("```web\nfetch: https://example.com/paper\n```"), [{ kind: "fetch", url: "https://example.com/paper" }]);
  assert.deepEqual(__test.webRequests("no web here"), []);
});

test("read blocks map to relative paths", () => {
  assert.deepEqual(__test.readRequests("```read\nsections/methods.tex\n```\nand\n```read\nmain.tex\n```"), ["sections/methods.tex", "main.tex"]);
  assert.deepEqual(__test.readRequests("no reads here"), []);
});

test("a chat can search the web on demand", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-web-"));
  const project = { id: `web-test-${Date.now()}`, name: "Web", path: dir, mainFile: "main.tex" };
  try {
    await writeFile(join(dir, "main.tex"), "\\documentclass{article}\n", "utf8");
    await __test.saveAgentFile(project, { scope: "project", markdown: "---\nname: Searcher\nweb: allow\n---\n\nBe brief.\n" });
    let calls = 0;
    const queries = [];
    __test.setServiceContext({
      get(name) {
        if (name === "llm") {
          return {
            stream: async function* stream() {
              calls += 1;
              if (calls === 1) {
                yield { type: "text-delta", text: "Let me look.\n```web\nsearch: bandit materials discovery\n```" };
                yield { type: "finish", reason: { kind: "stop" } };
                return;
              }
              yield { type: "text-delta", text: "Final answer with [1]" };
              yield { type: "finish", reason: { kind: "stop" } };
            },
          };
        }
        if (name === "agentDefaultModel") return { currentSelection: () => ({ provider: "fake", model: "fake" }) };
        if (name === "web") {
          return {
            search: async (request) => {
              queries.push(request.query);
              return { sources: [{ title: "Bandit paper", url: "https://example.com/a", snippet: "a snippet" }] };
            },
            fetch: async () => ({ url: "https://example.com/a", statusCode: 200, body: { kind: "text", content: "page" }, truncated: false }),
          };
        }
        return undefined;
      },
    });
    const job = __test.startChatJob(project, { agentId: "searcher", agentScope: "project", message: "hi" });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("web chat timed out")), 3000);
      const check = () => {
        if (job.events.some((event) => event.type === "done" || event.type === "error")) { clearTimeout(timer); resolve(); }
        else setTimeout(check, 10);
      };
      check();
    });
    assert.equal(calls, 2);
    assert.deepEqual(queries, ["bandit materials discovery"]);
    const chats = await __test.listChats(project, "searcher");
    const chat = await __test.readChat(project, "searcher", chats[0].id);
    const webMessage = chat.messages.find((message) => message.kind === "web");
    assert.match(webMessage.content, /https:\/\/example\.com\/a/u);
    assert.equal(chat.messages.at(-1).content, "Final answer with [1]");
  } finally {
    __test.setServiceContext(null);
    await rm(join(__test.CHATS_ROOT, project.id), { recursive: true, force: true });
    await rm(dir, { recursive: true, force: true });
  }
});

test("a chat can read another project file on demand", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-read-"));
  const project = { id: `read-test-${Date.now()}`, name: "Read", path: dir, mainFile: "main.tex" };
  try {
    await writeFile(join(dir, "main.tex"), "\\section{Intro}\n", "utf8");
    await mkdir(join(dir, "sections"), { recursive: true });
    await writeFile(join(dir, "sections", "methods.tex"), "methods content\n", "utf8");
    await __test.saveAgentFile(project, { scope: "project", markdown: "---\nname: Reader\n---\n\nBe brief.\n" });
    let calls = 0;
    __test.setServiceContext({
      get(name) {
        if (name === "llm") {
          return {
            stream: async function* stream() {
              calls += 1;
              if (calls === 1) {
                yield { type: "text-delta", text: "Need context\n```read\nsections/methods.tex\n```" };
                yield { type: "finish", reason: { kind: "stop" } };
                return;
              }
              yield { type: "text-delta", text: "Final answer" };
              yield { type: "finish", reason: { kind: "stop" } };
            },
          };
        }
        if (name === "agentDefaultModel") return { currentSelection: () => ({ provider: "fake", model: "fake" }) };
        return undefined;
      },
    });
    const job = __test.startChatJob(project, { agentId: "reader", agentScope: "project", message: "hi" });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("read chat timed out")), 3000);
      const check = () => {
        if (job.events.some((event) => event.type === "done" || event.type === "error")) { clearTimeout(timer); resolve(); }
        else setTimeout(check, 10);
      };
      check();
    });
    assert.equal(calls, 2);
    const chats = await __test.listChats(project, "reader");
    const chat = await __test.readChat(project, "reader", chats[0].id);
    const fileMessage = chat.messages.find((message) => message.kind === "file");
    assert.equal(fileMessage.path, "sections/methods.tex");
    assert.match(fileMessage.content, /methods content/u);
    assert.equal(chat.messages.at(-1).content, "Final answer");
  } finally {
    __test.setServiceContext(null);
    await rm(join(__test.CHATS_ROOT, project.id), { recursive: true, force: true });
    await rm(dir, { recursive: true, force: true });
  }
});

test("agent and chat POST routes work through the HTTP handler", async () => {
  const post = async (action, payload) => {
    const response = await fetch(api(action), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { status: response.status, body: await response.json() };
  };
  const info = await json(api("info"));
  const project = info.body.projects[0].id;
  let chatId = null;
  try {
    const saved = await post("agent/save", { scope: "global", markdown: "---\nname: Route Test\n---\n\nhi\n" });
    assert.equal(saved.status, 200);
    assert.equal(saved.body.id, "route-test");
    const created = await post("chat/create", {
      project, agentId: "route-test", agentScope: "global",
      context: { file: "main.tex", text: "ctx", startLine: 1, endLine: 1 },
    });
    assert.equal(created.status, 200, JSON.stringify(created.body));
    chatId = created.body.chat.id;
    const list = await json(api("chats", { project, agent: "route-test" }));
    assert.ok(list.body.chats.some((chat) => chat.id === chatId));
    const all = await json(api("chats/all", { project }));
    const entry = all.body.chats.find((chat) => chat.id === chatId);
    assert.ok(entry, "cross-agent list contains the chat");
    assert.equal(entry.agentId, "route-test");
    assert.equal(entry.agentName, "Route Test");
  } finally {
    if (chatId) await post("chat/delete", { project, agentId: "route-test", chatId });
    await post("agent/delete", { scope: "global", id: "route-test" });
  }
});

test("the bundled editor asset is served, and only by name", async () => {
  const response = await fetch(api("asset", { name: "codemirror.js" }));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /javascript/u);
  const body = await response.text();
  assert.ok(body.length > 100_000, "bundled editor should be substantial");
  assert.match(body, /vim/iu);
  const katex = await fetch(api("asset", { name: "katex.js" }));
  assert.equal(katex.status, 200);
  assert.ok((await katex.text()).length > 100_000, "KaTeX bundle is served");
  assert.equal((await fetch(api("asset", { name: "missing.js" }))).status, 404);
  assert.equal((await fetch(api("asset", { name: "../index.js" }))).status, 400);
});

test("info lists the registered demo project", async () => {
  const { status, body } = await json(api("info"));
  assert.equal(status, 200);
  assert.ok(body.projects.some((project) => project.name === "Paper Studio Demo"));
});

test("symbols returns citation keys and labels", async () => {
  const info = await json(api("info"));
  const project = info.body.projects.find((entry) => entry.name === "Paper Studio Demo");
  const { status, body } = await json(api("symbols", { project: project.id }));
  assert.equal(status, 200);
  assert.ok(body.citations.some((entry) => entry.key === "einstein1905"));
});

test("compile streams commands, output and a finish event", async () => {
  const info = await json(api("info"));
  const project = info.body.projects.find((entry) => entry.name === "Paper Studio Demo");
  const started = await json(api("compile/start"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ project: project.id }),
  });
  assert.equal(started.status, 200);
  assert.match(started.body.jobId, /^j_/u);

  const response = await fetch(api("compile/events", { job: started.body.jobId }));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/event-stream/u);

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const events = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let split;
    while ((split = buffer.indexOf("\n\n")) !== -1) {
      const chunk = buffer.slice(0, split);
      buffer = buffer.slice(split + 2);
      const data = chunk.split("\n").filter((line) => line.startsWith("data: ")).map((line) => line.slice(6)).join("\n");
      if (data) events.push(JSON.parse(data));
    }
  }

  const types = events.map((event) => event.type);
  assert.ok(types.includes("start"));
  assert.ok(types.includes("command"));
  assert.ok(types.includes("out"));
  assert.ok(types.includes("finish"));
  const commands = events.filter((event) => event.type === "command").map((event) => event.argv[0]);
  assert.ok(commands.includes("pdflatex"));
  assert.ok(commands.includes("bibtex"));

  const finish = events.find((event) => event.type === "finish");
  assert.equal(finish.ok, true);
  assert.equal(finish.result.pages, 1);
  assert.equal(finish.result.errors.length, 0);
});

test("fs/list browses directories for the folder picker", async () => {
  const root = await mkdtemp(join(tmpdir(), "paper-studio-fs-"));
  try {
    await mkdir(join(root, "paper-one"));
    await mkdir(join(root, "paper-two"));
    await mkdir(join(root, "node_modules"));
    const { status, body } = await json(api("fs/list", { path: root }));
    assert.equal(status, 200);
    assert.deepEqual(body.entries.map((entry) => entry.name), ["paper-one", "paper-two"]);
    assert.equal(body.path, root);
    assert.ok(body.entries.every((entry) => entry.path.startsWith(root)));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("project/update can re-point a project at an existing folder", async () => {
  const info = await json(api("info"));
  const project = info.body.projects.find((entry) => entry.name === "Paper Studio Demo");
  const { status, body } = await json(api("project/update"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ project: project.id, path: project.path }),
  });
  assert.equal(status, 200);
  assert.equal(body.project.path, project.path);
  assert.equal(body.project.mainFile, "main.tex");
});

test("pdf/locate maps a page point back to a source line", async () => {
  const info = await json(api("info"));
  const project = info.body.projects.find((entry) => entry.name === "Paper Studio Demo");
  const { status, body } = await json(api("pdf/locate"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ project: project.id, page: 1, x: 300, y: 300 }),
  });
  assert.equal(status, 200);
  assert.equal(body.ok, true);
  assert.match(body.file, /\.tex$/u);
  assert.ok(body.line >= 1);
});

test("page 1 is served and unknown pages are refused", async () => {
  const info = await json(api("info"));
  const project = info.body.projects.find((entry) => entry.name === "Paper Studio Demo");
  const page = await fetch(api("page", { project: project.id, page: 1 }));
  assert.equal(page.status, 200);
  assert.equal(page.headers.get("content-type"), "image/png");
  assert.ok((await page.arrayBuffer()).byteLength > 1000);

  const missing = await fetch(api("page", { project: project.id, page: 99 }));
  assert.equal(missing.status, 404);
});
