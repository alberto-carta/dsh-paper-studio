/**
 * Headless browser checks for the editor's key handling (Vim visual modes,
 * text objects, clipboard). Needs Playwright + React installed in a scratch
 * directory; run with:
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
  #root{height:420px;display:flex}
  .ps-editor{display:flex;flex-direction:column;flex:1;min-height:0}
  .ps-code-wrap{display:flex;flex:1;min-height:0;position:relative}
  .ps-code-area{position:relative;display:flex;flex:1;min-width:0;overflow:hidden}
  textarea.ps-code{flex:1;width:100%;height:100%;font:13px/20px monospace;padding:8px;border:0;outline:0;resize:none;background:transparent;caret-color:#000}
</style>
<script src="/react.js"></script><script src="/react-dom.js"></script>
<script>
  window.__ModuleLoader__ = { load(definition) { window.__pluginDefinition = definition; } };
  window.__DSH_PAPER_STUDIO__ = { token: "test", route: "/paper-studio/api" };
</script>
<script type="module" src="/host.js"></script>
</head><body><div id="root"></div><input id="outside" style="position:fixed;top:0;right:0"></body></html>`;

const HOST = `
await import("/client.js");
const React = window.React;
const plugin = window.__pluginDefinition.factory((id) => {
  if (id === "react") return React;
  throw new Error("unexpected module " + id);
});
const { EditorPane, DEFAULT_SYNTAX } = plugin.__internals;
const h = React.createElement;

function Host() {
  const [tab, setTab] = React.useState({ path: "main.tex", content: "alpha beta gamma\\nsecond line\\n", saved: "", mtime: 0, dirty: false, saving: false, conflict: null });
  const [cursor, setCursor] = React.useState({ line: 1, col: 1 });
  const [syntax, setSyntax] = React.useState({ ...DEFAULT_SYNTAX, engine: "textarea", vim: true, diagnostics: true });
  const [changes, setChanges] = React.useState([]);
  const editorRef = React.useRef(null);
  const gutterRef = React.useRef(null);
  const apiRef = React.useRef(null);
  const symbols = React.useMemo(() => ({ labels: [{ key: 'intro', file: 'main.tex', line: 1 }], citations: [], files: [], commands: [{ name: 'pref', arity: 1 }, { name: 'acarta', arity: 1 }], environments: [] }), []);
  const misspelled = React.useMemo(() => new Set(), []);
  const onCursor = React.useCallback((event) => {
    const textarea = event.currentTarget || event.target;
    const position = textarea.selectionStart;
    const before = textarea.value.slice(0, position);
    setCursor({ line: before.split("\\n").length, col: position - before.lastIndexOf("\\n") });
  }, []);
  const onEdit = React.useCallback((path, content) => {
    setTab((current) => ({ ...current, content, dirty: true }));
  }, []);
  const noop = React.useCallback(() => {}, []);
  React.useEffect(() => {
    window.__setContent = (content) => setTab((current) => ({ ...current, content }));
    window.__setEngine = (engine) => setSyntax((current) => ({ ...current, engine }));
    window.__setChanges = (value) => setChanges(value);
    window.__editorApi = apiRef;
    window.__setVim = (value) => setSyntax((current) => ({ ...current, vim: value }));
    const textarea = editorRef.current;
    if (textarea) { textarea.focus(); textarea.setSelectionRange(0, 0); }
  }, []);
  return h(EditorPane, {
    t: (key) => key,
    tabs: [tab], activePath: tab.path, tab, cursor,
    compile: null, status: { kind: "idle" },
    onSelectTab: noop, onCloseTab: noop,
    onEdit,
    editorRef,
    gutterInnerRef: gutterRef,
    editorApiRef: apiRef,
    onScroll: noop,
    onCursor,
    onInsertText: noop,
    onReloadDisk: noop, onKeepMine: noop,
    symbols,
    syntax, misspelled, changes,
    onKeepChange: noop, onDiscardChange: noop, onCloseReview: noop,
    onSave: () => { window.__saved = (window.__saved || 0) + 1; }, onUndo: noop, onRedo: noop, notify: noop,
  });
}

window.__state = () => {
  const textarea = document.querySelector("textarea.ps-code");
  return {
    content: textarea ? textarea.value : null,
    start: textarea ? textarea.selectionStart : -1,
    end: textarea ? textarea.selectionEnd : -1,
    mode: document.querySelector(".ps-vim") ? document.querySelector(".ps-vim").textContent : "",
    block: Boolean(document.querySelector(".ps-block-caret")),
  };
};
window.__setCaret = (position) => {
  const textarea = document.querySelector("textarea.ps-code");
  textarea.focus();
  textarea.setSelectionRange(position, position);
  textarea.dispatchEvent(new Event("select", { bubbles: true }));
};
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
await page.waitForSelector("textarea.ps-code");

await page.context().grantPermissions(["clipboard-read", "clipboard-write"], { origin });
const consoleMessages = [];
page.on("console", (message) => consoleMessages.push(message.text()));

const state = () => page.evaluate(() => window.__state());
const focus = async (content, caret) => {
  // Setting a controlled textarea's value moves the caret to the end, so set
  // the content first, let React commit, then place the caret.
  await page.evaluate((value) => window.__setContent(value), content);
  await page.waitForTimeout(40);
  await page.evaluate((position) => window.__setCaret(position), caret);
  await page.waitForTimeout(30);
};

let failures = 0;
const check = async (name, fn) => {
  try { await fn(); console.log("ok  ", name); }
  catch (error) { failures += 1; console.error("FAIL", name, "-", error.message); }
};

await check("v enters visual mode and shows a selection", async () => {
  await focus("alpha beta gamma\nsecond line\n", 0);
  await page.keyboard.press("v");
  await page.keyboard.press("l");
  await page.keyboard.press("l");
  const result = await state();
  assert.equal(result.mode, "VISUAL");
  assert.ok(result.end > result.start, `selection ${result.start}-${result.end}`);
});

await check("arrows extend the visual selection", async () => {
  await page.keyboard.press("ArrowRight");
  const result = await state();
  assert.equal(result.mode, "VISUAL");
  assert.ok(result.end >= 3, `selection end ${result.end}`);
});

await check("V enters linewise visual mode", async () => {
  await page.keyboard.press("Escape");
  await page.keyboard.press("V");
  const result = await state();
  assert.equal(result.mode, "V-LINE");
  assert.ok(result.end > result.start);
});

await check("Ctrl+V enters block visual mode", async () => {
  await page.keyboard.press("Escape");
  await page.keyboard.press("Control+v");
  const result = await state();
  assert.equal(result.mode, "V-BLOCK");
});

await check("ciw changes the word under the caret", async () => {
  await page.keyboard.press("Escape");
  await focus("alpha beta gamma\nsecond line\n", 6);
  await page.keyboard.press("c");
  await page.keyboard.press("i");
  await page.keyboard.press("w");
  const result = await state();
  assert.equal(result.content, "alpha  gamma\nsecond line\n");
  assert.equal(result.mode, "INSERT");
});

await check("diw deletes the word", async () => {
  await page.keyboard.press("Escape");
  await focus("alpha beta gamma\nsecond line\n", 6);
  await page.keyboard.press("d");
  await page.keyboard.press("i");
  await page.keyboard.press("w");
  const result = await state();
  assert.equal(result.content, "alpha  gamma\nsecond line\n");
  assert.equal(result.mode, "NORMAL");
});

await check("visual d deletes the selected characters", async () => {
  await page.keyboard.press("Escape");
  await focus("alpha beta gamma\nsecond line\n", 0);
  await page.keyboard.press("v");
  await page.keyboard.press("l");
  await page.keyboard.press("l");
  await page.keyboard.press("d");
  const result = await state();
  assert.equal(result.content, "ha beta gamma\nsecond line\n");
  assert.equal(result.mode, "NORMAL");
});

// Ctrl+Shift+C is reserved by Chromium/Firefox for DevTools and never reaches
// the page, so exercise the copy path through the X11 alias instead.
await check("Ctrl+Insert copies the selection in insert mode", async () => {
  await focus("alpha beta gamma\nsecond line\n", 0);
  await page.keyboard.press("i");
  await page.evaluate(() => {
    const textarea = document.querySelector("textarea.ps-code");
    textarea.focus();
    textarea.setSelectionRange(0, 3);
  });
  await page.keyboard.press("Control+Insert");
  await page.waitForTimeout(50);
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  assert.equal(clip, "alp");
  await page.keyboard.press("Escape");
});

await check("Ctrl+Shift+V pastes at the caret in insert mode", async () => {
  await focus("alpha beta gamma\nsecond line\n", 5);
  await page.keyboard.press("i");
  await page.evaluate(() => navigator.clipboard.writeText("XYZ"));
  await page.keyboard.press("Control+Shift+V");
  await page.waitForTimeout(50);
  const result = await state();
  assert.equal(result.content, "alphaXYZ beta gamma\nsecond line\n");
  await page.keyboard.press("Escape");
});

await check("Ctrl+Shift+X cuts the selection in insert mode", async () => {
  await focus("alpha beta gamma\nsecond line\n", 0);
  await page.keyboard.press("i");
  await page.evaluate(() => {
    const textarea = document.querySelector("textarea.ps-code");
    textarea.focus();
    textarea.setSelectionRange(0, 5);
  });
  await page.keyboard.press("Control+Shift+X");
  await page.waitForTimeout(50);
  const result = await state();
  assert.equal(result.content, " beta gamma\nsecond line\n");
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  assert.equal(clip, "alpha");
  await page.keyboard.press("Escape");
});

await check("normal mode refuses paste and warns when diagnostics are on", async () => {
  await page.keyboard.press("Escape");
  await focus("alpha beta gamma\nsecond line\n", 5);
  await page.evaluate(() => navigator.clipboard.writeText("XYZ"));
  const before = consoleMessages.length;
  await page.keyboard.press("Control+Shift+V");
  await page.waitForTimeout(50);
  const result = await state();
  assert.equal(result.content, "alpha beta gamma\nsecond line\n");
  assert.equal(result.mode, "NORMAL");
  assert.ok(
    consoleMessages.slice(before).some((line) => line.includes("warning, vim bindings, ctrl-v not allowed in normal mode")),
    `expected a diagnostic warning, got: ${consoleMessages.slice(before).join(" | ")}`,
  );
});

await check("normal mode ignores native Ctrl+X", async () => {
  await page.keyboard.press("Escape");
  await focus("alpha beta gamma\nsecond line\n", 0);
  await page.evaluate(() => {
    const textarea = document.querySelector("textarea.ps-code");
    textarea.focus();
    textarea.setSelectionRange(0, 5);
  });
  await page.keyboard.press("Control+x");
  await page.waitForTimeout(50);
  const result = await state();
  assert.equal(result.content, "alpha beta gamma\nsecond line\n");
});

await check("vim keys in another field do not touch the editor", async () => {
  await page.keyboard.press("Escape");
  await focus("alpha beta gamma\nsecond line\n", 0);
  await page.click("#outside");
  await page.keyboard.type("vdd");
  const result = await state();
  assert.equal(result.content, "alpha beta gamma\nsecond line\n");
  assert.equal(await page.inputValue("#outside"), "vdd");
});

const vimCase = async (name, content, caret, keys, expected, expectedCaret) => {
  await check(name, async () => {
    await focus(content, caret);
    await page.keyboard.press("Escape");
    for (const key of keys) await page.keyboard.press(key);
    await page.waitForTimeout(40);
    const result = await state();
    assert.equal(result.content, expected);
    if (expectedCaret !== undefined) assert.equal(result.start, expectedCaret, `caret ${result.start}`);
  });
};

const exCase = async (name, content, command, expected) => {
  await check(name, async () => {
    await focus(content, 0);
    await page.keyboard.press("Escape");
    await page.keyboard.press(":");
    await page.keyboard.type(command, { delay: 0 });
    await page.keyboard.press("Enter");
    await page.waitForTimeout(60);
    const result = await state();
    assert.equal(result.content, expected);
  });
};

await vimCase("yyp copies the line below", "alpha\nbeta\n", 0, ["y", "y", "p"], "alpha\nalpha\nbeta\n");
await vimCase("yy then j p pastes below the target line", "one\ntwo\nthree\n", 0, ["y", "y", "j", "p"], "one\ntwo\none\nthree\n");
await vimCase("yyP pastes above the current line", "one\ntwo\nthree\n", 0, ["j", "y", "y", "j", "P"], "one\ntwo\ntwo\nthree\n");
await vimCase("ddp deletes a line and pastes it below", "one\ntwo\nthree\n", 0, ["d", "d", "p"], "two\none\nthree\n");
await vimCase("dw deletes the next word", "alpha beta gamma\n", 0, ["d", "w"], "beta gamma\n");
await vimCase("x then p pastes the character after the cursor", "abc", 0, ["x", "p"], "bac");
await vimCase("visual-line y p is linewise", "one\ntwo\n", 0, ["V", "y", "p"], "one\none\ntwo\n");
await vimCase("dd on the last line removes the newline", "one\ntwo", 4, ["d", "d"], "one\n");
await vimCase("f finds the next character", "a3b3c", 0, ["f", "3"], "a3b3c", 1);
await vimCase("; repeats the find", "a3b3c", 0, ["f", "3", ";"], "a3b3c", 3);
await vimCase("F finds the previous character", "a3b3c", 5, ["F", "3"], "a3b3c", 3);
await exCase("s substitutes the first match on the current line", "aa\nba\n", "s/a/b/", "ba\nba\n");
await exCase("%s substitutes globally", "aa\naa\n", "%s/a/b/g", "bb\nbb\n");
await exCase("1,2s substitutes a line range", "aa\naa\nba\n", "1,2s/a/b/g", "bb\nbb\nba\n");

await check("CodeMirror preview loads and Vim yyp works", async () => {
  await page.evaluate(() => { window.__setEngine("codemirror"); window.__setVim(true); });
  await page.waitForSelector(".cm-editor", { timeout: 15000, state: "attached" });
  await page.evaluate(() => window.__setContent("alpha\nbeta\n"));
  await page.waitForTimeout(300);
  await page.locator(".cm-content").click();
  await page.keyboard.press("g");
  await page.keyboard.press("g");
  await page.waitForTimeout(50);
  await page.keyboard.press("y");
  await page.waitForTimeout(50);
  await page.keyboard.press("y");
  await page.waitForTimeout(50);
  await page.keyboard.press("p");
  await page.waitForTimeout(200);
  const doc = await page.evaluate(() => document.querySelector(".ps-cm-wrap").__cmView.state.doc.toString());
  assert.equal(doc, "alpha\nalpha\nbeta\n");
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    view.dispatch({ selection: { anchor: 0, head: 5 } });
    view.focus();
  });
  await page.waitForTimeout(120);
  assert.ok((await page.locator(".cm-selectionBackground").count()) > 0, "selection layer is visible");
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: "" }, selection: { anchor: 0 } });
    view.focus();
  });
  await page.keyboard.press("i");
  await page.keyboard.type("\\pre", { delay: 30 });
  await page.waitForTimeout(300);
  const tools = await page.locator(".cm-tooltip-autocomplete").count();
  assert.ok(tools > 0, "custom command completion opens");
  const commandOptions = await page.locator(".cm-tooltip-autocomplete li").allInnerTexts();
  assert.ok(commandOptions.some((text) => text.includes("pref")), `command options ${commandOptions.join(",")}`);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(120);
  const completed = await page.evaluate(() => document.querySelector(".ps-cm-wrap").__cmView.state.doc.toString());
  assert.equal(completed, "\\pref{}");
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: "" }, selection: { anchor: 0 } });
    view.focus();
  });
  await page.keyboard.press("i");
  await page.keyboard.type("\\pref{", { delay: 30 });
  await page.waitForTimeout(300);
  const options = await page.locator(".cm-tooltip-autocomplete li").allInnerTexts();
  assert.ok(options.some((text) => text.includes("intro")), `label options ${options.join(",")}`);
});

await check("CM right-click offers clipboard and agent actions", async () => {
  await page.evaluate(() => window.__setContent("hello world\n"));
  await page.waitForTimeout(150);
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    view.dispatch({ selection: { anchor: 0, head: 5 } });
    view.focus();
  });
  const box = await page.locator(".cm-content").boundingBox();
  await page.mouse.click(box.x + 20, box.y + 10, { button: "right" });
  await page.waitForTimeout(150);
  const labels = await page.locator(".ps-cm-menu .ps-ctx-item").allInnerTexts();
  assert.ok(labels.includes("Copy"), `menu labels ${labels.join(",")}`);
  assert.ok(labels.some((label) => label.includes("Discuss with agent")), `menu labels ${labels.join(",")}`);
  await page.keyboard.press("Escape");
});

await check("CM keeps the selected word when revealing its line", async () => {
  await page.evaluate(() => window.__setContent("alpha\nbeta\ngamma\n"));
  await page.waitForTimeout(150);
  const selection = await page.evaluate(() => {
    const api = window.__editorApi.current;
    api.selectRange(6, 10);
    api.scrollToLine(2);
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return { from: view.state.selection.main.from, to: view.state.selection.main.to };
  });
  assert.deepEqual(selection, { from: 6, to: 10 });
});

await check("CM keeps the top visible line when external content changes", async () => {
  const lines = Array.from({ length: 60 }, (unused, index) => `line ${index}`).join("\n");
  await page.evaluate((value) => window.__setContent(value), lines);
  await page.waitForTimeout(200);
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    const line = view.state.doc.line(25);
    view.dispatch({ selection: { anchor: line.from }, effects: view.constructor.scrollIntoView ? [] : [] });
    view.scrollDOM.scrollTop = 25 * 20;
  });
  await page.waitForTimeout(100);
  const before = await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return view.state.doc.lineAt(view.lineBlockAtHeight(view.scrollDOM.scrollTop).from).number;
  });
  await page.evaluate((value) => window.__setContent(value + "\nappended"), lines);
  await page.waitForTimeout(250);
  const after = await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return view.state.doc.lineAt(view.lineBlockAtHeight(view.scrollDOM.scrollTop).from).number;
  });
  assert.ok(Math.abs(after - before) <= 1, `top line ${before} -> ${after}`);
});

await check("CM normal mode arrows move without losing the view", async () => {
  const lines = Array.from({ length: 40 }, (unused, index) => `line ${index}`).join("\n");
  await page.evaluate((value) => window.__setContent(value), lines);
  await page.waitForTimeout(200);
  await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    view.dispatch({ selection: { anchor: 0 } });
    view.focus();
  });
  for (let index = 0; index < 8; index += 1) await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(100);
  const line = await page.evaluate(() => {
    const view = document.querySelector(".ps-cm-wrap").__cmView;
    return { number: view.state.doc.lineAt(view.state.selection.main.head).number, direct: document.querySelector(".ps-cm-wrap").__cmDirectArrows || 0 };
  });
  assert.ok(line.number >= 5, `moved to line ${line.number}`);
  assert.ok(line.direct > 0, "direct arrow handler ran");
});

await check("CM paints figure and equation bands", async () => {
  await page.evaluate(() => window.__setContent("\\begin{figure}\nfig\n\\end{figure}\n\\begin{equation}\neq\n\\end{equation}\n"));
  await page.waitForTimeout(250);
  assert.ok((await page.locator(".cm-band-figure").count()) > 0, "figure band");
  assert.ok((await page.locator(".cm-band-math").count()) > 0, "equation band");
});

await check("CM does not mark a matching diff as stale", async () => {
  await page.evaluate(() => window.__setContent("alpha\nbeta\n"));
  await page.waitForTimeout(150);
  await page.evaluate(() => window.__setChanges([
    { id: "valid-1", file: "main.tex", hunk: { header: "@@ -1,1 +1,1 @@", lines: [
      { type: " ", text: "alpha" },
      { type: "-", text: "alpha" },
      { type: "+", text: "ALPHA" },
    ] } },
  ]));
  await page.waitForTimeout(250);
  assert.equal(await page.locator(".ps-cm-stale").count(), 0, "valid diff is not stale");
  assert.ok((await page.locator(".cm-review-target").count()) > 0, "pending change is tinted");
  await page.evaluate(() => window.__setChanges([]));
  await page.waitForTimeout(150);
});

await check("CM vim :w saves", async () => {
  await page.evaluate(() => window.__setContent("save me\n"));
  await page.waitForTimeout(150);
  await page.locator(".cm-content").click();
  await page.keyboard.press("Escape");
  await page.keyboard.press(":");
  await page.keyboard.type("w", { delay: 20 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  assert.ok((await page.evaluate(() => window.__saved || 0)) > 0, "save called");
});

await check("CM colours commands, math and comments on first paint", async () => {
  await page.evaluate(() => window.__setContent("\\section{Hello} $x^2$ % note\n"));
  await page.waitForTimeout(250);
  const colours = await page.evaluate(() => {
    const result = {};
    for (const span of document.querySelectorAll(".cm-line span")) {
      const text = span.textContent || "";
      if (text.includes("\\section") && !result.command) result.command = getComputedStyle(span).color;
      if (text.includes("note") && !result.comment) result.comment = getComputedStyle(span).color;
    }
    return result;
  });
  assert.ok(colours.command && colours.command !== "rgb(0, 0, 0)", `command colour ${colours.command}`);
  assert.ok(colours.comment && colours.comment !== "rgb(0, 0, 0)", `comment colour ${colours.comment}`);
});

await check("CM suggestion card opens near the change and flags stale hunks", async () => {
  await page.evaluate(() => window.__setChanges([
    { id: "stale-1", file: "main.tex", hunk: { header: "@@ -1,1 +1,1 @@", lines: [
      { type: " ", text: "not in the document" },
      { type: "-", text: "not in the document" },
      { type: "+", text: "replacement" },
    ] } },
  ]));
  await page.waitForTimeout(300);
  assert.ok((await page.locator(".ps-diff-pop").count()) > 0, "diff card");
  assert.ok((await page.locator(".ps-cm-stale").count()) > 0, "stale warning");
  await page.evaluate(() => window.__setChanges([]));
  await page.waitForTimeout(200);
  assert.equal(await page.locator(".ps-diff-pop").count(), 0);
});

await browser.close();
await new Promise((resolve) => server.close(resolve));
if (failures > 0) {
  console.error(`${failures} browser editor test(s) failed`);
  process.exit(1);
}
console.log("editor browser tests passed");
