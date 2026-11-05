/**
 * End-to-end checks over a real HTTP server: authentication, the symbol index,
 * streamed compile events (SSE) and on-demand page rendering.
 */
import assert from "node:assert/strict";
import http from "node:http";
import { after, test } from "node:test";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
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

test("agents are markdown files in global or project scope", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ps-agents-"));
  const project = { path: dir };
  try {
    assert.equal((await __test.agentFiles(project)).some((agent) => agent.id === "proofreader"), false);
    const markdown = "---\nname: Proofreader\ndescription: prose review\nreadFiles: ask\n---\n\nBe strict.\n";
    const saved = await __test.saveAgentFile(project, { scope: "project", markdown });
    assert.equal(saved.id, "proofreader");
    const listed = await __test.agentFiles(project);
    const entry = listed.find((agent) => agent.id === "proofreader");
    assert.equal(entry.name, "Proofreader");
    assert.equal(entry.scope, "project");
    assert.equal(entry.readFiles, "ask");
    const read = await __test.readAgentFile(project, "proofreader", "project");
    assert.match(read.markdown, /Be strict/u);
    await __test.deleteAgentFile(project, "proofreader", "project");
    assert.equal((await __test.agentFiles(project)).some((agent) => agent.id === "proofreader"), false);
    await assert.rejects(() => __test.saveAgentFile(project, { scope: "project", markdown: "no frontmatter" }), /frontmatter/u);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("chat history gives assistant turns a model source", () => {
  const messages = __test.chatRequestMessages({ messages: [
    { role: "user", content: "hi" },
    { role: "assistant", content: "yo" },
  ] }, "deepseek", "chat");
  assert.deepEqual(messages[0], { role: "user", content: [{ type: "text", text: "hi" }] });
  assert.equal(messages[1].role, "assistant");
  assert.deepEqual(messages[1].source, { kind: "model", provider: "deepseek", model: "chat" });
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
