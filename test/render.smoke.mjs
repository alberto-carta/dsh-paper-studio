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
const { Studio, EditorPane, Dock, FolderPicker, PdfPage, GitView, Explosion } = plugin.__internals;

const t = (key) => key;

// 1. Empty state: no project registered yet.
const empty = renderToStaticMarkup(h(Studio, { t, panelInfo: null }));
assert.match(empty, /ps-root/u);
assert.match(empty, /noProjectTitle/u);
assert.match(empty, /ps-head/u);
// Regression: without a project the grid must not keep 5px splitter columns,
// which squeezed the editor into a 5px strip.
assert.doesNotMatch(empty, /ps-split/u);

// 2. Editor with LaTeX highlighting and the completion popup closed.
const syntax = {
  command: "#8b5cf6", environment: "#d97706", math: "#059669", comment: "#94a3b8", brace: "#94a3b8",
  bgFigure: "#3b82f6", bgMath: "#10b981", bgTable: "#f59e0b", bgTheorem: "#8b5cf6", bgCode: "#6b7280",
  backgrounds: true, currentLine: true, currentLineColor: "#8b5cf6",
};
const tab = {
  path: "main.tex",
  content: "\\section{Intro}\n\\begin{figure}\nText $x^2$ % a note\n\\end{figure}\n",
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
  syntax,
}));
assert.match(editor, /ps-highlight/u);
assert.match(editor, /ps-hl-cmd/u);
assert.match(editor, /ps-code-area/u);
assert.match(editor, /data-line="1"/u, "line numbers travel with the text");
assert.match(editor, /ps-hl-line/u, "one wrapper per source line");
assert.match(editor, /data-bg="figure"/u, "figure block is shaded");
assert.match(editor, /ps-hl-line current/u, "cursor line is boxed");
assert.match(editor, /--ps-hl-command:#8b5cf6/u, "theme variables reach the layer");

// Wrapped mode: textarea soft-wraps, the gutter (aligned to logical lines) is hidden.
const wrapped = renderToStaticMarkup(h(EditorPane, {
  t, tabs: [tab], activePath: "main.tex", tab, cursor: { line: 1, col: 1 },
  compile: null, status: { kind: "idle" },
  onSelectTab() {}, onCloseTab() {}, onEdit() {}, onScroll() {}, onCursor() {}, onInsertText() {},
  onReloadDisk() {}, onKeepMine() {},
  editorRef: { current: null }, gutterInnerRef: { current: null },
  symbols: { labels: [], citations: [], files: [] },
  syntax: { ...syntax, wrap: true },
}));
assert.match(wrapped, /ps-code wrap/u);
assert.match(wrapped, /ps-highlight wrap/u);
assert.doesNotMatch(wrapped, /ps-gutter/u);

// Vim mode shows its mode badge.
const vim = renderToStaticMarkup(h(EditorPane, {
  t, tabs: [tab], activePath: "main.tex", tab, cursor: { line: 1, col: 1 },
  compile: null, status: { kind: "idle" },
  onSelectTab() {}, onCloseTab() {}, onEdit() {}, onScroll() {}, onCursor() {}, onInsertText() {},
  onReloadDisk() {}, onKeepMine() {},
  editorRef: { current: null }, gutterInnerRef: { current: null },
  symbols: { labels: [], citations: [], files: [] },
  syntax: { ...syntax, vim: true },
}));
assert.match(vim, /ps-vim[^>]*>NORMAL</u);

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

// 5. Folder picker (the effect that lists directories does not run during SSR).
const picker = renderToStaticMarkup(h(FolderPicker, {
  t,
  start: "/home/example/Papers",
  onPick() {},
  onClose() {},
}));
assert.match(picker, /ps-browser/u);
assert.match(picker, /ps-browser-foot/u);
assert.match(picker, /useFolder/u);

// 6. PDF page with its selectable word layer (no selection yet).
const pdfPage = renderToStaticMarkup(h(PdfPage, {
  t,
  project: "p_demo",
  page: 1,
  rev: 123,
  url: "/paper-studio/api/page?project=p_demo&page=1&rev=123",
  eager: true,
  onGoTo() {},
  notify() {},
}));
assert.match(pdfPage, /ps-page-box/u);
assert.match(pdfPage, /src="\/paper-studio\/api\/page/u);
assert.doesNotMatch(pdfPage, /goToEditor/u, "no action bar without a selection");

// 7. Git tab with status, files, SSH key and a coloured diff.
const gitHtml = renderToStaticMarkup(h(GitView, {
  t,
  info: {
    data: {
      repo: true, branch: "main", upstream: "origin/main", ahead: 1, behind: 0,
      files: [{ status: "M", path: "main.tex" }, { status: "??", path: "notes.tex" }],
      branches: ["main", "feature"],
      sshKey: "/home/me/.ssh/id_ed25519",
      lastCommit: "abc123 a commit",
    },
    error: "",
  },
  diff: "@@ -1 +1 @@\n-old\n+new",
  diffOpen: true,
  busy: "",
  onAction() {}, onNewBranch() {}, onNuke() {}, onSwitch() {}, onRefresh() {}, onOpenFile() {}, onToggleDiff() {},
}));
assert.match(gitHtml, /origin\/main/u);
assert.match(gitHtml, /main\.tex/u);
assert.match(gitHtml, /id_ed25519/u);
assert.match(gitHtml, /class="add"/u);
assert.match(gitHtml, /class="del"/u);

// 8. The reset explosion renders every particle.
const boomHtml = renderToStaticMarkup(h(Explosion, { nonce: 1, onDone() {} }));
assert.match(boomHtml, /ps-boom-ring/u);
assert.match(boomHtml, /ps-boom-flash/u);
assert.equal((boomHtml.match(/ps-boom-particle/gu) || []).length, 46);
assert.match(boomHtml, /--dx:/u);

console.log("render smoke test passed: empty state, editor, terminal, problems, picker, pdf page, git, explosion");
