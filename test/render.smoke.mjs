/**
 * Headless render smoke test for the panel. This is not part of `npm test`
 * because it needs a React installation apart from the Harness page; point
 * PS_REACT_DIR at a directory whose node_modules holds react + react-dom and
 * run `node test/render.smoke.mjs`.
 *
 * It catches the class of defect a static syntax check cannot: undefined
 * variables, bad element props, hook misuse and broken markup in the empty
 * state, the editor and both dock tabs.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const dir = process.env.PS_REACT_DIR;
if (!dir) {
  console.log("PS_REACT_DIR is unset: skipping the render smoke test.");
  process.exit(0);
}

const React = (await import(`${dir}/node_modules/react/index.js`)).default;
const server = await import(`${dir}/node_modules/react-dom/server.node.js`);
const renderToStaticMarkup = server.renderToStaticMarkup || server.default.renderToStaticMarkup;
const h = React.createElement;

const storage = new Map();
globalThis.window = {
  __ModuleLoader__: { load: (value) => { definition = value; } },
  localStorage: {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, String(value)),
  },
  location: { origin: "http://127.0.0.1:3080" },
  __DSH_PAPER_STUDIO__: { token: "test-token", route: "/paper-studio/api", panelId: "paper-studio" },
  addEventListener() {},
  removeEventListener() {},
};
globalThis.document = {
  createElement: () => ({ getContext: () => null }),
  head: { append() {} },
  body: { classList: { add() {}, remove() {} } },
};

let definition = null;
const source = await readFile(new URL("../client.js", import.meta.url), "utf8");
new Function("window", source)(globalThis.window);
const plugin = definition.factory((id) => {
  if (id === "react") return React;
  throw new Error(`unexpected require: ${id}`);
});
const { Studio, EditorPane, Dock } = plugin.__internals;

const t = (key) => key;

// 1. Empty state: no project registered yet.
const empty = renderToStaticMarkup(h(Studio, { t, panelInfo: null }));
assert.match(empty, /ps-root/u);
assert.match(empty, /noProjectTitle/u);
assert.match(empty, /ps-head/u);

// 2. Editor with LaTeX highlighting and the completion popup closed.
const tab = {
  path: "main.tex",
  content: "\\section{Intro}\nText $x^2$ % a note\n",
  dirty: false,
  saving: false,
  conflict: null,
};
const editor = renderToStaticMarkup(h(EditorPane, {
  t,
  tabs: [tab],
  activePath: "main.tex",
  tab,
  cursor: { line: 1, col: 1 },
  compile: null,
  status: { kind: "idle" },
  onSelectTab() {}, onCloseTab() {}, onEdit() {}, onScroll() {}, onCursor() {}, onInsertText() {},
  onReloadDisk() {}, onKeepMine() {},
  editorRef: { current: null },
  gutterInnerRef: { current: null },
  symbols: { labels: [], citations: [], files: [] },
}));
assert.match(editor, /ps-highlight/u);
assert.match(editor, /ps-hl-cmd/u);
assert.match(editor, /ps-code-area/u);
assert.match(editor, /ps-gutter/u);

// 3. Terminal tab with streamed commands and output.
const terminal = renderToStaticMarkup(h(Dock, {
  t,
  tab: "terminal",
  onTab() {}, onClose() {}, onClear() {}, onResize() {}, onOpenProblem() {},
  compile: { ok: true, durationMs: 1500, errors: [], warningsList: [] },
  terminal: [
    { kind: "cmd", text: "$ pdflatex -interaction=nonstopmode main.tex" },
    { kind: "out", text: "This is pdfTeX\nentering extended mode" },
    { kind: "stage", text: "▸ bibtex" },
  ],
  stage: "pdflatex · pass 2",
  elapsed: 2,
  compiling: true,
  height: 200,
}));
assert.match(terminal, /pdflatex -interaction=nonstopmode/u);
assert.match(terminal, /This is pdfTeX/u);
assert.match(terminal, /bibtex/u);

// 4. Problems tab with one error and one warning.
const problems = renderToStaticMarkup(h(Dock, {
  t,
  tab: "problems",
  onTab() {}, onClose() {}, onClear() {}, onResize() {}, onOpenProblem() {},
  compile: {
    ok: false,
    durationMs: 900,
    errors: [{ file: "main.tex", line: 3, message: "Undefined control sequence." }],
    warningsList: [{ kind: "badbox", file: "main.tex", line: 9, message: "Overfull \\hbox (3.2pt too wide)" }],
  },
  terminal: [],
  stage: "",
  elapsed: 0,
  compiling: false,
  height: 200,
}));
assert.match(problems, /Undefined control sequence/u);
assert.match(problems, /Overfull/u);
assert.match(problems, /ps-sev/u);

console.log("render smoke test passed: empty state, editor, terminal, problems");
