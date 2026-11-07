/**
 * Headless browser checks for the CodeMirror editor. Needs Playwright + React
 * in a scratch directory; run with:
 *   PLAYWRIGHT_BROWSERS_PATH=.pw-browsers node test/editor.browser.mjs
 */
import assert from "node:assert/strict";
import http from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const pluginRoot = join(here, "..");
const deps = process.env.PS_TEST_DEPS || "/home/acarta/Documents/Papers/.ps-test-deps";
const require = createRequire(join(deps, "package.json"));
const { chromium } = require("playwright");

const HTML = `<!doctype html><html><head><meta charset="utf-8">
<style>
  html,body{margin:0;height:100%}
  #root{height:520px;display:flex}
  .ps-editor{display:flex;flex-direction:column;flex:1;min-height:0}
  .ps-code-wrap{display:flex;flex:1;min-height:0;position:relative;overflow:hidden}
  .ps-cm-wrap{flex:1;min-height:0;overflow:hidden}
  .cm-editor{height:100%}
</style>
<script src="/react.js"></script><script src="/react-dom.js"></script>
<script>
  window.__ModuleLoader__ = { load(definition) { window.__pluginDefinition = definition; } };
  window.__DSH_PAPER_STUDIO__ = { token: "test", route: "/paper-studio/api" };
</script>
<script type="module" src="/host.js"></script>
</head><body><div id="root"></div></body></html>`;

const HOST = `
await import("/client.js");
const React = window.React;
const plugin = window.__pluginDefinition.factory((id) => {
  if (id === "react") return React;
  throw new Error("unexpected module " + id);
});
const { EditorPane, DEFAULT_SYNTAX, CSS, searchHunk } = plugin.__internals;
const style = document.createElement("style");
style.textContent = CSS;
document.head.append(style);
const h = React.createElement;

function Host() {
  const [tab, setTab] = React.useState({ path: "main.tex", content: "alpha beta gamma\\nsecond line\\n", base: "", saved: "", mtime: 0, dirty: false, saving: false, conflict: null });
  const [changes, setChanges] = React.useState([]);
  const [cursor, setCursor] = React.useState({ line: 1, col: 1 });
  const [vim, setVim] = React.useState(true);
  const apiRef = React.useRef(null);
  const history = React.useRef({ past: [], future: [] });
  const symbols = React.useMemo(() => ({ labels: [{ key: "intro", file: "main.tex", line: 1 }], citations: [], files: [], commands: [{ name: "pref", arity: 1 }, { name: "acarta", arity: 1 }], environments: [], packages: ["physics"] }), []);
  const misspelled = React.useMemo(() => new Set(), []);
  const onEdit = React.useCallback((path, content) => {
    setTab((current) => {
      history.current.past.push(current.content);
      history.current.future = [];
      return { ...current, content, dirty: true };
    });
  }, []);
  const onUndo = React.useCallback(() => {
    setTab((current) => {
      if (history.current.past.length === 0) return current;
      history.current.future.push(current.content);
      return { ...current, content: history.current.past.pop() };
    });
  }, []);
  const onRedo = React.useCallback(() => {
    setTab((current) => {
      if (history.current.future.length === 0) return current;
      history.current.past.push(current.content);
      return { ...current, content: history.current.future.pop() };
    });
  }, []);
  const onCursor = React.useCallback((event) => {
    const target = event.currentTarget || event.target;
    const value = target.value || "";
    const position = target.selectionStart || 0;
    const before = value.slice(0, position);
    setCursor({ line: before.split("\\n").length, col: position - before.lastIndexOf("\\n") });
  }, []);
  const noop = React.useCallback(() => {}, []);
  React.useEffect(() => {
    window.__setContent = (content) => setTab((current) => ({ ...current, content }));
    window.__setBase = (base) => setTab((current) => ({ ...current, base }));
    window.__searchHunk = searchHunk;
    window.__setChanges = (value) => setChanges(value);
    window.__editorApi = apiRef;
    window.__setVim = setVim;
  }, []);
  return h(EditorPane, {
    t: (key) => key,
    tabs: [tab], activePath: tab.path, tab, cursor,
    compile: null, status: { kind: "idle" },
    onSelectTab: noop, onCloseTab: noop, onEdit,
    editorRef: { current: null }, gutterInnerRef: { current: null }, editorApiRef: apiRef,
    onScroll: noop, onCursor, onInsertText: noop,
    onReloadDisk: noop, onKeepMine: noop,
    symbols, misspelled, changes,
    onKeepChange: noop, onDiscardChange: noop, onCloseReview: noop,
    onSave: () => { window.__saved = (window.__saved || 0) + 1; },
    onUndo, onRedo, notify: noop,
    syntax: { ...DEFAULT_SYNTAX, engine: "codemirror", vim, diagnostics: true },
  });
}
ReactDOM.createRoot(document.getElementById("root")).render(h(Host));
`;

const server = http.createServer(async (request, response) => {
  const path = new URL(request.url, "http://x").pathname;
  const send = (body, type) => { response.writeHead(200, { "content-type": type }); response.end(body); };
  try {
    if (path === "/") return send(HTML, "text/html; charset=utf-8");
    if (path === "/host.js") return send(HOST, "text/javascript; charset=utf-8");
    if (path === "/client.js") return send(await readFile(join(pluginRoot, "client.js")), "text/javascript; charset=utf-8");
    if (path === "/paper-studio/api/asset") {
      const name = new URL(request.url, "http://x").searchParams.get("name");
      return send(await readFile(join(pluginRoot, "vendor", name)), "text/javascript; charset=utf-8");
    }
    if (path === "/react.js") return send(await readFile(join(deps, "node_modules/react/umd/react.development.js")), "text/javascript; charset=utf-8");
    if (path === "/react-dom.js") return send(await readFile(join(deps, "node_modules/react-dom/umd/react-dom.development.js")), "text/javascript; charset=utf-8");
    response.writeHead(404); response.end("not found");
  } catch (error) {
    response.writeHead(500); response.end(String(error));
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", (error) => console.error("PAGE ERROR:", error.message));
await page.goto(origin);
await page.waitForSelector(".cm-editor");
await page.context().grantPermissions(["clipboard-read", "clipboard-write"], { origin });

let failures = 0;
const check = async (name, fn) => {
  try { await fn(); console.log("ok  ", name); }
  catch (error) { failures += 1; console.error("FAIL", name, "-", error.message); }
};
const content = async () => page.evaluate(() => document.querySelector(".ps-cm-wrap").__cmView.state.doc.toString());
const setContent = async (value) => { await page.evaluate((text) => window.__setContent(text), value); await page.waitForTimeout(150); };
const focus = async () => {
  await page.locator(".cm-content").click();
  await page.keyboard.press("Escape");
  await page.waitForTimeout(80);
};

await check("CM loads and Vim yyp works", async () => {
  await setContent("one\ntwo\nthree\n");
  await focus();
  await page.keyboard.press("g"); await page.keyboard.press("g");
  await page.keyboard.press("y"); await page.keyboard.press("y");
  await page.keyboard.press("p");
  await page.waitForTimeout(100);
  assert.equal(await content(), "one\none\ntwo\nthree\n");
});

await check("CM completes custom commands, braces and labels", async () => {
  await setContent("");
  await focus();
  await page.keyboard.press("i");
  await page.keyboard.type("\\pre", { delay: 25 });
  await page.waitForTimeout(250);
  assert.ok((await page.locator(".cm-tooltip-autocomplete").count()) > 0, "completion opens");
  const options = await page.locator(".cm-tooltip-autocomplete li").allInnerTexts();
  assert.ok(options.some((text) => text.includes("pref")), `options ${options.join(",")}`);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(120);
  assert.equal(await content(), "\\pref{}");
  await setContent("");
  await focus();
  await page.keyboard.press("i");
  await page.keyboard.type("\\pref{", { delay: 25 });
  await page.waitForTimeout(250);
  const labels = await page.locator(".cm-tooltip-autocomplete li").allInnerTexts();
  assert.ok(labels.some((text) => text.includes("intro")), `labels ${labels.join(",")}`);
});

await check("math completion prioritizes math and package commands", async () => {
  await setContent("$");
  await focus();
  await page.evaluate(() => window.__editorApi.current.selectRange(1, 1));
  await page.keyboard.press("i");
  await page.keyboard.type("\\qty", { delay: 25 });
  await page.waitForTimeout(300);
  const options = await page.locator(".cm-tooltip-autocomplete li").allInnerTexts();
  assert.ok(options.some((text) => text.includes("qty")), `math options ${options.join(",")}`);
  await page.keyboard.press("Escape");
  await setContent("$");
  await focus();
  await page.evaluate(() => window.__editorApi.current.selectRange(1, 1));
  await page.keyboard.press("i");
  await page.keyboard.type("\\si", { delay: 25 });
  await page.waitForTimeout(300);
  const mathOptions = await page.locator(".cm-tooltip-autocomplete li").allInnerTexts();
  assert.ok(mathOptions.some((text) => text.includes("simeq")), `math commands ${mathOptions.join(",")}`);
  await page.keyboard.press("Escape");
});

await check("CM keeps a selected word when revealing its line", async () => {
  await setContent("alpha\nbeta\ngamma\n");
  const selection = await page.evaluate(() => {
    const api = window.__editorApi.current;
    api.selectRange(6, 10);
    api.scrollToLine(2);
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return { from: view.state.selection.main.from, to: view.state.selection.main.to };
  });
  assert.deepEqual(selection, { from: 6, to: 10 });
});

await check("silent caret restore keeps the viewport", async () => {
  await setContent(Array.from({ length: 60 }, (unused, index) => `line ${index}`).join("\n"));
  await page.evaluate(() => { const view = document.querySelector(".ps-cm-wrap").__cmView; view.scrollDOM.scrollTop = 600; });
  await page.waitForTimeout(100);
  const before = await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return view.state.doc.lineAt(view.lineBlockAtHeight(view.scrollDOM.scrollTop).from).number;
  });
  await page.evaluate(() => window.__editorApi.current.selectRangeSilent(0, 0));
  await page.waitForTimeout(120);
  const after = await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return view.state.doc.lineAt(view.lineBlockAtHeight(view.scrollDOM.scrollTop).from).number;
  });
  assert.ok(Math.abs(after - before) <= 1, `top ${before} -> ${after}`);
});

await check("CM normal mode arrows move without losing the view", async () => {
  await setContent(Array.from({ length: 40 }, (unused, index) => `line ${index}`).join("\n"));
  await focus();
  await page.keyboard.press("g"); await page.keyboard.press("g");
  for (let index = 0; index < 8; index += 1) await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(100);
  const result = await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return { line: view.state.doc.lineAt(view.state.selection.main.head).number, direct: document.querySelector(".ps-cm-wrap").__cmDirectArrows || 0 };
  });
  assert.ok(result.line >= 5, `line ${result.line}`);
  assert.ok(result.direct > 0, "direct arrow handler ran");
});

await check("CM keeps the top visible line when external content changes", async () => {
  const lines = Array.from({ length: 60 }, (unused, index) => `line ${index}`).join("\n");
  await setContent(lines);
  await page.evaluate(() => { const view = document.querySelector(".ps-cm-wrap").__cmView; view.scrollDOM.scrollTop = 500; });
  await page.waitForTimeout(100);
  const before = await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return view.state.doc.lineAt(view.lineBlockAtHeight(view.scrollDOM.scrollTop).from).number;
  });
  await setContent(lines + "\nappended");
  const after = await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return view.state.doc.lineAt(view.lineBlockAtHeight(view.scrollDOM.scrollTop).from).number;
  });
  assert.ok(Math.abs(after - before) <= 1, `top ${before} -> ${after}`);
});

await check("CM paints bands and first-paint colours", async () => {
  await setContent("\\begin{figure}\nfig\n\\end{figure}\n\\begin{equation}\neq\n\\end{equation}\n\\section{Hello} $x^2$ % note\n");
  await page.waitForTimeout(250);
  assert.ok((await page.locator(".cm-band-figure").count()) > 0, "figure band");
  assert.ok((await page.locator(".cm-band-math").count()) > 0, "equation band");
  const backgrounds = await page.evaluate(() => ({
    figure: getComputedStyle(document.querySelector(".cm-band-figure")).backgroundColor,
    math: getComputedStyle(document.querySelector(".cm-band-math")).backgroundColor,
  }));
  assert.notEqual(backgrounds.figure, "rgba(0, 0, 0, 0)", `figure background ${backgrounds.figure}`);
  assert.notEqual(backgrounds.math, "rgba(0, 0, 0, 0)", `equation background ${backgrounds.math}`);
  const colours = await page.evaluate(() => {
    const result = {};
    for (const span of document.querySelectorAll(".cm-line span")) {
      const text = span.textContent || "";
      if (text.includes("\\section") && !result.command) result.command = getComputedStyle(span).color;
      if (text.includes("note") && !result.comment) result.comment = getComputedStyle(span).color;
    }
    return result;
  });
  assert.ok(colours.command && colours.command !== "rgb(0, 0, 0)", `command ${colours.command}`);
  assert.ok(colours.comment && colours.comment !== "rgb(0, 0, 0)", `comment ${colours.comment}`);
});

await check("deleted lines use an arrow instead of a red bar", async () => {
  await page.evaluate(() => window.__setBase("alpha\nremoved line\n"));
  await setContent("alpha\n");
  await page.waitForTimeout(200);
  assert.ok((await page.locator(".cm-diff-del").count()) > 0, "deleted marker");
  const styles = await page.evaluate(() => {
    const line = document.querySelector(".cm-diff-del");
    const arrow = document.querySelector(".cm-diff-arrow");
    return { shadow: getComputedStyle(line).boxShadow, arrow: arrow ? arrow.textContent : "" };
  });
  assert.equal(styles.shadow, "none", `shadow ${styles.shadow}`);
  assert.equal(styles.arrow, "▶", `arrow ${styles.arrow}`);
  await page.evaluate(() => window.__setBase(""));
});

await check("CM valid diff is not stale and tints its target", async () => {
  await setContent("alpha\nbeta\n");
  await page.evaluate(() => window.__setChanges([{ id: "valid-1", file: "main.tex", hunk: { header: "@@ -1,1 +1,1 @@", lines: [{ type: "-", text: "alpha" }, { type: "+", text: "ALPHA" }] } }]));
  await page.waitForTimeout(300);
  assert.equal(await page.locator(".ps-cm-stale").count(), 0);
  assert.ok((await page.locator(".cm-review-target").count()) > 0, "target tint");
  assert.ok((await page.locator(".ps-diff-edit-add").count()) > 0, "added lines are editable");
  assert.ok((await page.locator(".ps-diff-word-add").count()) > 0, "changed words highlighted");
  await page.evaluate(() => window.__setChanges([]));
  await page.waitForTimeout(150);
});

await check("search/replace suggestions are valid without line numbers", async () => {
  await setContent("alpha\nbeta\n");
  await page.evaluate(() => {
    const hunk = window.__searchHunk("alpha", "ALPHA");
    window.__setChanges([{ id: "edit-1", file: "main.tex", search: "alpha", replace: "ALPHA", hunk }]);
  });
  await page.waitForTimeout(250);
  assert.equal(await page.locator(".ps-cm-stale").count(), 0, "search change is valid");
  assert.ok((await page.locator(".cm-review-target").count()) > 0, "search target tinted");
  await page.evaluate(() => window.__setChanges([{ id: "edit-2", file: "main.tex", search: "missing text", replace: "x", hunk: window.__searchHunk("missing text", "x") }]));
  await page.waitForTimeout(200);
  assert.ok((await page.locator(".ps-cm-stale").count()) > 0, "missing search is stale");
  await page.evaluate(() => window.__setChanges([]));
});

await check("CM flags stale diffs", async () => {
  await page.evaluate(() => window.__setChanges([{ id: "stale-1", file: "main.tex", hunk: { header: "@@ -1,1 +1,1 @@", lines: [{ type: "-", text: "not in the document" }, { type: "+", text: "replacement" }] } }]));
  await page.waitForTimeout(250);
  assert.ok((await page.locator(".ps-diff-pop").count()) > 0);
  assert.ok((await page.locator(".ps-cm-stale").count()) > 0);
  await page.evaluate(() => window.__setChanges([]));
  await page.waitForTimeout(150);
});

await check("equation preview sits outside the line being typed", async () => {
  await setContent("\\begin{equation}\nx^2 + y^2\n\\end{equation}\n");
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    const line = view.state.doc.line(2);
    window.__editorApi.current.selectRange(line.from + 2, line.from + 2);
  });
  await page.waitForTimeout(450);
  assert.ok((await page.locator(".ps-math-preview").count()) > 0, "preview appears");
  const boxes = await page.evaluate(() => {
    const preview = document.querySelector(".ps-math-preview").getBoundingClientRect();
    const line = document.querySelector(".cm-activeLine").getBoundingClientRect();
    return { preview: { top: preview.top, bottom: preview.bottom }, line: { top: line.top, bottom: line.bottom } };
  });
  assert.ok(boxes.preview.top >= boxes.line.bottom - 1 || boxes.preview.bottom <= boxes.line.top + 1,
    `preview ${JSON.stringify(boxes.preview)} overlaps line ${JSON.stringify(boxes.line)}`);
});

await check("inline math preview appears and clears outside math", async () => {
  await setContent("before $a^2+b^2$ after\n");
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    const line = view.state.doc.line(1);
    window.__editorApi.current.selectRange(line.from + 11, line.from + 11);
  });
  await page.waitForTimeout(450);
  assert.ok((await page.locator(".ps-math-preview").count()) > 0, "inline preview");
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    const line = view.state.doc.line(1);
    window.__editorApi.current.selectRange(line.from + 1, line.from + 1);
  });
  await page.waitForTimeout(350);
  assert.equal(await page.locator(".ps-math-preview").count(), 0, "preview clears outside math");
});

await check("Ctrl-B / Ctrl-I wrap text in insert mode", async () => {
  await setContent("hello\n");
  await focus();
  await page.keyboard.press("i");
  await page.evaluate(() => window.__editorApi.current.selectRange(0, 5));
  await page.keyboard.press("Control+b");
  await page.waitForTimeout(100);
  assert.equal(await content(), "\\textbf{hello}\n");
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    const end = view.state.doc.line(1).to;
    view.dispatch({ selection: { anchor: end } });
  });
  await page.keyboard.press("Control+i");
  await page.waitForTimeout(100);
  assert.equal(await content(), "\\textbf{hello}\\textit{}\n");
});

await check("Ctrl-B works with Vim disabled and from the context menu", async () => {
  await page.evaluate(() => window.__setVim(false));
  await setContent("hello\n");
  await focus();
  await page.evaluate(() => window.__editorApi.current.selectRange(0, 5));
  await page.keyboard.press("Control+b");
  await page.waitForTimeout(100);
  assert.equal(await content(), "\\textbf{hello}\n");
  await setContent("hello\n");
  await page.evaluate(() => window.__editorApi.current.selectRange(0, 5));
  const box = await page.locator(".cm-content").boundingBox();
  await page.mouse.click(box.x + 20, box.y + 10, { button: "right" });
  await page.waitForTimeout(100);
  await page.getByText("Bold", { exact: true }).click();
  await page.waitForTimeout(100);
  assert.equal(await content(), "\\textbf{hello}\n");
  await page.evaluate(() => window.__setVim(true));
});

await check("CM vim u and r undo/redo", async () => {
  await setContent("base\n");
  await focus();
  await page.keyboard.press("g");
  await page.keyboard.press("g");
  await page.keyboard.press("i");
  await page.keyboard.type("X");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(100);
  const typed = await content();
  assert.equal(typed, "Xbase\n");
  await page.keyboard.press("u");
  await page.waitForTimeout(150);
  assert.equal(await content(), "base\n");
  await page.keyboard.press("r");
  await page.waitForTimeout(150);
  assert.equal(await content(), "Xbase\n");
  await page.keyboard.press("Control+z");
  await page.waitForTimeout(150);
  assert.equal(await content(), "base\n", "Ctrl+Z uses the same history as u");
  await page.keyboard.press("Control+y");
  await page.waitForTimeout(150);
  assert.equal(await content(), "Xbase\n", "Ctrl+Y uses the same history as r");
});

await check("CM vim :w saves", async () => {
  await setContent("save me\n");
  await focus();
  await page.keyboard.press("Escape");
  await page.keyboard.press(":");
  await page.keyboard.type("w", { delay: 20 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  assert.ok((await page.evaluate(() => window.__saved || 0)) > 0);
});

await check("CM right-click offers clipboard and agent actions", async () => {
  await setContent("hello world\n");
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    view.dispatch({ selection: { anchor: 0, head: 5 } });
    view.focus();
  });
  const box = await page.locator(".cm-content").boundingBox();
  await page.mouse.click(box.x + 20, box.y + 10, { button: "right" });
  await page.waitForTimeout(150);
  const labels = await page.locator(".ps-cm-menu .ps-ctx-item").allInnerTexts();
  assert.ok(labels.includes("Copy"), `labels ${labels.join(",")}`);
  assert.ok(labels.some((label) => label.includes("Discuss with agent")), `labels ${labels.join(",")}`);
  await page.keyboard.press("Escape");
});

await browser.close();
await new Promise((resolve) => server.close(resolve));
if (failures > 0) { console.error(`${failures} browser editor test(s) failed`); process.exit(1); }
console.log("editor browser tests passed");
