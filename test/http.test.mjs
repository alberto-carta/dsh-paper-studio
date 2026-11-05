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
