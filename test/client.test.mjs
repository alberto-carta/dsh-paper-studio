/**
 * Headless checks for the browser half's pure logic: the LaTeX highlighter and
 * the completion context/ranking rules. The module wrapper is stubbed so the
 * file can be evaluated outside a browser.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../client.js", import.meta.url), "utf8");
let definition = null;
const window = { __ModuleLoader__: { load: (value) => { definition = value; } } };
new Function("window", source)(window);

const React = {
  createElement: () => null,
  Fragment: {},
  useCallback: (fn) => fn,
  useEffect: () => {},
  useMemo: (fn) => fn(),
  memo: (component) => component,
  useRef: (value) => ({ current: value }),
  useState: (value) => [value, () => {}],
};
const plugin = definition.factory((id) => {
  if (id === "react") return React;
  throw new Error(`unexpected require: ${id}`);
});
const { highlightLatex, highlightLines, completionContext, completionItems, escapeHtml, DEFAULT_SYNTAX, syntaxVariables, bindingFromEvent, matchesBinding, orderPageWords, environmentSnippet, bracketMatch, vimTextObject, shouldCompileAfterSave, parseDiffSuggestions, applySuggestion, collectChanges, diffChangeKey, parseChoiceBlocks, stripChoiceBlocks, splitMath, diffLineKinds, normalizeSymbols, rebaseHunk, equationAtCursor, buildOutline, inMathContext, usepackagePackages, changeFingerprint, changeAlreadyApplied, inlineWordDiff, pairHunkLines, parseEditSuggestions, findSearchRange, applySearchReplace } = plugin.__internals;

test("highlighter marks commands, braces and comments and escapes HTML", () => {
  const html = highlightLatex("\\section{Intro} % note <b>\nText $x^2$ here");
  assert.match(html, /ps-hl-cmd[^>]*>\\section/u);
  assert.match(html, /ps-hl-brace[^>]*>\{/u);
  assert.match(html, /ps-hl-comment[^>]*>% note &lt;b&gt;/u);
  assert.match(html, /ps-hl-math[^>]*>\$x\^2\$/u);

  const env = highlightLatex("\\begin{figure}\n\\centering\n\\end{figure}");
  assert.match(env, /ps-hl-env[^>]*>figure</u, "environment names are highlighted");
  assert.equal(escapeHtml('<a>&"'), "&lt;a&gt;&amp;&quot;");
});

test("environment bands cover their whole block", () => {
  const lines = highlightLines("\\begin{figure}\n\\centering\n\\end{figure}\nplain text");
  assert.deepEqual(lines.map((line) => line.bg), ["figure", "figure", "figure", null]);
  const math = highlightLines("\\begin{align}\na &= b\n\\end{align}");
  assert.deepEqual(math.map((line) => line.bg), ["math", "math", "math"]);
  const inline = highlightLines("text $x$ and \\section{Intro}");
  assert.equal(inline.length, 1);
  assert.equal(inline[0].bg, null);
});

test("completion context recognises cites, refs, commands, packages and paths", () => {
  assert.deepEqual(completionContext("\\cite{ein", 9), { kind: "citation", query: "ein", start: 6, end: 9 });
  assert.deepEqual(completionContext("See \\ref{sec:", 13), { kind: "label", query: "sec:", start: 9, end: 13 });
  assert.deepEqual(completionContext("\\begi", 5), { kind: "command", query: "begi", start: 1, end: 5 });
  assert.deepEqual(completionContext("\\usepackage{ams", 15), { kind: "package", query: "ams", start: 12, end: 15 });
  assert.deepEqual(completionContext("\\includegraphics[width=1\\linewidth]{fig", 39), { kind: "image", query: "fig", start: 36, end: 39 });
  // Prose never opens the completion popup: files exist only inside commands.
  assert.equal(completionContext("plain text", 10), null);
});

test("defaults are purple commands with translucent environment bands", () => {
  assert.equal(DEFAULT_SYNTAX.command, "#8b5cf6");
  const vars = syntaxVariables(DEFAULT_SYNTAX);
  assert.equal(vars["--ps-hl-command"], "#8b5cf6");
  assert.match(vars["--ps-bg-figure"], /^rgba\(59, 130, 246, 0\.12\)$/u);
  assert.match(vars["--ps-current-line"], /^rgba\(139, 92, 246, 0\.85\)$/u);
});

test("two-column pages read the left column before the right", () => {
  const title = { text: "Title", xMin: 150, xMax: 450, yMin: 20, yMax: 35 };
  const left = Array.from({ length: 5 }, (unused, index) => ({
    text: `L${index + 1}`, xMin: 50, xMax: 250, yMin: 100 + index * 20, yMax: 112 + index * 20,
  }));
  const right = Array.from({ length: 5 }, (unused, index) => ({
    text: `R${index + 1}`, xMin: 330, xMax: 550, yMin: 100 + index * 20, yMax: 112 + index * 20,
  }));
  const ordered = orderPageWords([...right, ...left, title], 600, 300);
  assert.deepEqual(ordered.map((word) => word.text), ["Title", "L1", "L2", "L3", "L4", "L5", "R1", "R2", "R3", "R4", "R5"]);

  const single = [
    { text: "A", xMin: 50, xMax: 550, yMin: 100, yMax: 112 },
    { text: "B", xMin: 50, xMax: 550, yMin: 80, yMax: 92 },
    { text: "C", xMin: 50, xMax: 550, yMin: 120, yMax: 132 },
  ];
  assert.deepEqual(orderPageWords(single, 600, 300).map((word) => word.text), ["B", "A", "C"]);
});

test("a wide figure* band keeps the columns on either side in order", () => {
  const column = (prefix, xMin, xMax, startY, count) => Array.from({ length: count }, (unused, index) => ({
    text: `${prefix}${index + 1}`, xMin, xMax, yMin: startY + index * 20, yMax: startY + 12 + index * 20,
  }));
  const above = [...column("L", 50, 250, 100, 3), ...column("R", 330, 550, 100, 3)];
  const below = [...column("M", 50, 250, 260, 2), ...column("N", 330, 550, 260, 2)];
  const figure = [
    { text: "F1", xMin: 50, xMax: 292, yMin: 200, yMax: 212 },
    { text: "F2", xMin: 297, xMax: 550, yMin: 200, yMax: 212 },
  ];
  const title = { text: "Title", xMin: 150, xMax: 450, yMin: 20, yMax: 35 };
  const ordered = orderPageWords([...below, ...figure, ...above, title], 600, 300).map((word) => word.text);
  assert.deepEqual(ordered, ["Title", "L1", "L2", "L3", "R1", "R2", "R3", "F1", "F2", "M1", "M2", "N1", "N2"]);
});

test("project macros complete with their argument shape", () => {
  const symbols = {
    labels: [], citations: [], files: [],
    commands: [{ name: "pref", arity: 1, file: "main.tex" }, { name: "acarta", arity: 0, file: "main.tex" }],
    environments: [{ name: "mybox", file: "main.tex" }],
  };
  const pref = completionItems("command", "pre", symbols).find((item) => item.insert === "pref");
  assert.ok(pref, "user macro is offered");
  assert.equal(pref.suffix, "{}");
  assert.equal(pref.caret, "pref".length + 1);

  const acarta = completionItems("command", "acar", symbols).find((item) => item.insert === "acarta");
  assert.equal(acarta.suffix, "", "a zero-argument macro adds no braces");

  const section = completionItems("command", "sect", symbols).find((item) => item.insert === "section");
  assert.equal(section.suffix, "{}");
  assert.equal(section.caret, "section".length + 1);

  const figure = completionItems("environment", "figu", symbols).find((item) => item.insert === "figure");
  assert.ok(figure.template);
  assert.match(figure.template.text, /\\begin\{figure\}/u);
  assert.match(figure.template.text, /\\includegraphics/u);

  const custom = completionItems("environment", "myb", symbols).find((item) => item.insert === "mybox");
  assert.equal(custom.template, null);
  assert.equal(environmentSnippet("itemize").text.includes("\\item"), true);
});

test("key bindings normalize modifiers and compare exactly", () => {
  assert.equal(bindingFromEvent({ key: "b", ctrlKey: true, metaKey: false, shiftKey: false, altKey: false }), "mod+b");
  assert.equal(bindingFromEvent({ key: "Z", ctrlKey: false, metaKey: true, shiftKey: true, altKey: false }), "mod+shift+z");
  assert.equal(bindingFromEvent({ key: "Shift", shiftKey: true }), null);
  assert.equal(matchesBinding({ key: "s", ctrlKey: true, metaKey: false, shiftKey: false, altKey: false }, "mod+s"), true);
  assert.equal(matchesBinding({ key: "s", ctrlKey: true, metaKey: false, shiftKey: true, altKey: false }, "mod+s"), false);
  assert.equal(matchesBinding({ key: "s", ctrlKey: false, metaKey: false, shiftKey: false, altKey: false }, "mod+s"), false);
});

test("completion ranking prefers prefixes and filters by type", () => {
  const symbols = {
    labels: [{ key: "sec:intro", file: "main.tex", line: 3 }, { key: "fig:model", file: "main.tex", line: 40 }],
    citations: [{ key: "einstein1905", title: "On the electrodynamics of moving bodies", year: "1905" }, { key: "newton1687", title: "Principia", year: "1687" }],
    files: ["main.tex", "sections/methods.tex", "figures/plot.png", "references.bib"],
  };
  const cites = completionItems("citation", "ein", symbols);
  assert.equal(cites[0].insert, "einstein1905");
  assert.ok(cites.every((item) => item.label.includes("ein") || item.detail.includes("ein")));

  const labels = completionItems("label", "fig", symbols);
  assert.deepEqual(labels.map((item) => item.insert), ["fig:model"]);

  const commands = completionItems("command", "sect", symbols);
  assert.equal(commands[0].label, "\\section");

  const images = completionItems("image", "", symbols);
  assert.deepEqual(images.map((item) => item.insert), ["figures/plot.png"]);

  const bibs = completionItems("bibfile", "", symbols);
  assert.deepEqual(bibs.map((item) => item.insert), ["references.bib"]);

  // Images are completed only inside \includegraphics{…}.
  assert.deepEqual(completionItems("image", "plo", symbols).map((item) => item.insert), ["figures/plot.png"]);
});

test("bracket matching pairs braces, brackets and parentheses at the caret", () => {
  const text = "\\section{a {b} c}";
  assert.deepEqual(bracketMatch(text, 9), { open: 8, close: 16 });
  assert.deepEqual(bracketMatch(text, 11), { open: 11, close: 13 });
  assert.deepEqual(bracketMatch(text, 12), { open: 11, close: 13 });
  assert.deepEqual(bracketMatch("(a [b] c)", 4), { open: 3, close: 5 });
  assert.deepEqual(bracketMatch("a {b", 3), { open: 2, close: -1 });
  assert.equal(bracketMatch("a \\{ b", 4), null, "escaped braces are ignored");
  assert.equal(bracketMatch("plain text", 3), null);
});

test("vim text objects cover words, brackets and quotes", () => {
  assert.deepEqual(vimTextObject("hello world", 2, false, "w"), { start: 0, end: 5 });
  assert.deepEqual(vimTextObject("hello world", 2, true, "w"), { start: 0, end: 6 });
  assert.deepEqual(vimTextObject("a {b c} d", 3, false, "{"), { start: 3, end: 6 });
  assert.deepEqual(vimTextObject("a {b c} d", 3, true, "{"), { start: 2, end: 7 });
  assert.deepEqual(vimTextObject('say "hi" now', 6, false, '"'), { start: 5, end: 7 });
  assert.deepEqual(vimTextObject("\\cite{key}", 6, false, "w"), { start: 6, end: 9 });
  assert.equal(vimTextObject("plain", 2, false, "("), null);
});

test("manual saves compile by default; autosaves follow the auto option", () => {
  assert.equal(shouldCompileAfterSave({ manual: true, compileOnSave: true, autoCompile: false }), true);
  assert.equal(shouldCompileAfterSave({ manual: true, compileOnSave: false, autoCompile: true }), false);
  assert.equal(shouldCompileAfterSave({ manual: false, compileOnSave: true, autoCompile: false }), false);
  assert.equal(shouldCompileAfterSave({ manual: false, compileOnSave: false, autoCompile: true }), true);
});

test("diff suggestions parse and apply to the source", () => {
  const message = "Proposed change:\n```diff\n--- a/main.tex\n+++ b/main.tex\n@@ -1,3 +1,3 @@\n a\n-old\n+new\n b\n```\n";
  const suggestions = parseDiffSuggestions(message);
  assert.equal(suggestions.length, 1);
  assert.equal(suggestions[0].file, "main.tex");
  assert.equal(applySuggestion("a\nold\nb\n", suggestions[0]), "a\nnew\nb\n");
  assert.equal(applySuggestion("a\nchanged\nb\n", suggestions[0]), null);
});

test("collectChanges flattens every hunk into a stable list", () => {
  const first = "```diff\n--- a/main.tex\n+++ b/main.tex\n@@ -2,2 +2,2 @@\n-old\n+new\n```";
  const second = "```diff\n--- a/sections/x.tex\n+++ b/sections/x.tex\n@@ -5,1 +5,1 @@\n-a\n+b\n```";
  const changes = collectChanges([
    { role: "user", content: "hi" },
    { role: "assistant", content: first },
    { role: "assistant", content: second },
  ]);
  assert.equal(changes.length, 2);
  assert.equal(changes[0].file, "main.tex");
  assert.equal(changes[1].file, "sections/x.tex");
  assert.equal(new Set(changes.map((change) => change.id)).size, 2);
});

test("change ids are stable across identical hunks, so resolutions persist", () => {
  const hunk = { header: "@@ -2,2 +2,2 @@", lines: [{ type: " ", text: "a" }, { type: "-", text: "old" }, { type: "+", text: "new" }] };
  const again = JSON.parse(JSON.stringify(hunk));
  assert.equal(diffChangeKey("main.tex", hunk), diffChangeKey("main.tex", again));
  assert.notEqual(diffChangeKey("main.tex", hunk), diffChangeKey("other.tex", hunk));
  const messages = [{ role: "assistant", content: "```diff\n--- a/main.tex\n+++ b/main.tex\n@@ -2,2 +2,2 @@\n a\n-old\n+new\n```" }];
  assert.equal(collectChanges(messages)[0].id, collectChanges(JSON.parse(JSON.stringify(messages)))[0].id);
});

test("choice blocks parse into options and are stripped from the prose", () => {
  const text = "Which version?\n```choices\n1. Concise — short and direct\n2. Detailed — with examples\n3. Middle — a compromise\n```";
  const blocks = parseChoiceBlocks(text);
  assert.equal(blocks.length, 1);
  assert.equal(blocks[0].options.length, 3);
  assert.equal(blocks[0].options[0].label, "Concise");
  assert.equal(blocks[0].options[0].description, "short and direct");
  assert.equal(stripChoiceBlocks(text).trim(), "Which version?");
});

test("multiline choice descriptions do not create extra options", () => {
  const numbered = "```choices\n1. Concise\n   Short and direct.\n   Still the same option.\n2. Detailed\n   With examples.\n```";
  assert.equal(parseChoiceBlocks(numbered)[0].options.length, 2);
  const paragraphs = "```choices\nConcise — short and direct.\nIt continues on a new line.\n\nDetailed — with examples.\n```";
  const options = parseChoiceBlocks(paragraphs)[0].options;
  assert.equal(options.length, 2);
  assert.equal(options[0].label, "Concise");
});

test("math is split into inline and display segments", () => {
  const parts = splitMath("Inline $x^2$ and display $$y = mc^2$$.");
  assert.equal(parts.filter((part) => part.math).length, 2);
  assert.equal(parts[0].text, "Inline ");
  assert.equal(parts[1].text, "x^2");
  assert.equal(parts[1].display, false);
  assert.equal(parts[3].text, "y = mc^2");
  assert.equal(parts[3].display, true);
  assert.deepEqual(splitMath("no math"), [{ math: false, text: "no math" }]);
});

test("diff gutter classifies additions, modifications and deletions", () => {
  assert.deepEqual([...diffLineKinds("a\nb\nc", "a\nB\nc").entries()], [[1, "mod"]]);
  assert.deepEqual([...diffLineKinds("a\nb\nc", "a\nc").entries()], [[1, "del"]]);
  assert.deepEqual([...diffLineKinds("a\nc", "a\nb\nc").entries()], [[1, "add"]]);
  assert.deepEqual([...diffLineKinds("a\nb", "a\nb\nc").entries()], [[2, "add"]]);
  assert.equal(diffLineKinds("same", "same").size, 0);
});

test("citation completion continues after a comma", () => {
  const text = "\\cite{smith2020, doe2021";
  const context = completionContext(text, text.length);
  assert.equal(context.kind, "citation");
  assert.equal(context.query, "doe2021");
  assert.equal(text.slice(context.start, context.end), "doe2021");
  const items = completionItems("citation", "doe2021", {
    citations: [{ key: "smith2020", title: "A", year: "2020" }, { key: "doe2021", title: "B", year: "2021" }],
  });
  assert.equal(items[0].insert, "doe2021");
});

test("symbol loading keeps custom commands and environments", () => {
  const symbols = normalizeSymbols({
    labels: [{ key: "intro" }], citations: [{ key: "smith" }], files: ["main.tex"],
    commands: [{ name: "pref", arity: 1 }, { name: "acarta", arity: 1 }],
    environments: [{ name: "mynote" }],
  });
  assert.equal(symbols.commands.length, 2);
  assert.equal(symbols.environments.length, 1);
  assert.equal(symbols.labels[0].key, "intro");
  const items = completionItems("command", "pre", symbols);
  assert.equal(items[0].label, "\\pref");
});

test("retry rebases the same hunk onto shifted content", () => {
  const hunk = {
    header: "@@ -1,1 +1,1 @@",
    lines: [
      { type: "-", text: "alpha" },
      { type: "+", text: "ALPHA" },
    ],
  };
  const content = "a\nb\nalpha\nc";
  const rebased = rebaseHunk(content, hunk);
  assert.ok(rebased);
  assert.equal(rebased.header, "@@ -3,1 +3,1 @@");
  assert.equal(applySuggestion(content, { hunks: [rebased] }), "a\nb\nALPHA\nc");
});

test("two-column reading order keeps each column contiguous", () => {
  const words = [
    { text: "L1", xMin: 50, xMax: 100, yMin: 10, yMax: 20 },
    { text: "R1", xMin: 350, xMax: 400, yMin: 10, yMax: 20 },
    { text: "L2", xMin: 50, xMax: 100, yMin: 30, yMax: 40 },
    { text: "R2", xMin: 350, xMax: 400, yMin: 30, yMax: 40 },
  ];
  assert.deepEqual(orderPageWords(words, 600, 800).map((word) => word.text), ["L1", "L2", "R1", "R2"]);
});

test("equation preview finds only supported math contexts", () => {
  const display = "\\begin{equation}\nx^2+y^2\n\\end{equation}\n";
  assert.deepEqual(equationAtCursor(display, 2, 3), { text: "x^2+y^2", display: true });
  assert.equal(equationAtCursor("plain text\n", 1, 3), null);
  const inline = "before $a^2+b^2$ after\n";
  assert.deepEqual(equationAtCursor(inline, 1, 11), { text: "a^2+b^2", display: false });
  assert.equal(equationAtCursor(inline, 1, 1), null);
  const paren = "x \\(a+b\\) y\n";
  assert.deepEqual(equationAtCursor(paren, 1, 6), { text: "a+b", display: false });
  assert.equal(equationAtCursor("\\begin{gather}x\\end{gather}\n", 1, 15), null);
  assert.equal(equationAtCursor("\\[x\\]\n", 1, 2), null);
});

test("equation shading defaults to amber", () => {
  assert.equal(DEFAULT_SYNTAX.bgMath, "#f59e0b");
});

test("retry adapts a hunk whose removed line was edited", () => {
  const hunk = {
    header: "@@ -1,1 +1,1 @@",
    lines: [{ type: "-", text: "alpha" }, { type: "+", text: "ALPHA" }],
  };
  const content = "alpha edited\nbeta";
  const adapted = rebaseHunk(content, hunk);
  assert.ok(adapted);
  assert.equal(adapted.lines[0].text, "alpha edited");
  assert.equal(adapted.lines[1].text, "ALPHA");
  assert.equal(applySuggestion(content, { hunks: [adapted] }), "ALPHA\nbeta");
});

test("retry finds a hunk that moved far by similar text", () => {
  const hunk = {
    header: "@@ -1,1 +1,1 @@",
    lines: [{ type: "-", text: "alpha" }, { type: "+", text: "ALPHA" }],
  };
  const content = [...Array.from({ length: 120 }, (unused, index) => `filler ${index}`), "alpha edited", "tail"].join("\n");
  const adapted = rebaseHunk(content, hunk);
  assert.ok(adapted);
  assert.equal(adapted.header, "@@ -121,1 +121,1 @@");
  assert.equal(adapted.lines[0].text, "alpha edited");
  assert.match(applySuggestion(content, { hunks: [adapted] }), /ALPHA\ntail$/u);
});

test("search/replace edit blocks parse and apply with layered matching", () => {
  const message = "```edit\nmain.tex\n<<<<<<< SEARCH\nThe old sentence.\n=======\nThe new sentence.\n>>>>>>> REPLACE\n```";
  const [suggestion] = parseEditSuggestions(message);
  assert.equal(suggestion.file, "main.tex");
  assert.equal(suggestion.search, "The old sentence.");
  assert.equal(suggestion.replace, "The new sentence.");
  const content = "Intro\nThe old sentence.\nTail";
  assert.equal(applySearchReplace(content, suggestion.search, suggestion.replace), "Intro\nThe new sentence.\nTail");
  assert.ok(findSearchRange(content, "The old sentence."));
  assert.ok(findSearchRange("Intro\nThe old sentence.  \nTail", "The old sentence."), "trailing whitespace tolerated");
  assert.ok(findSearchRange("Intro\nThe old sentence was changed.\nTail", "The old sentence."), "fuzzy match");
  assert.equal(findSearchRange("nothing here", "The old sentence."), null);
});

test("inline diff brackets only changed words and pairs hunk lines", () => {
  const diff = inlineWordDiff("The quick brown fox", "The slow brown fox");
  assert.deepEqual(diff.old.filter((part) => part.changed).map((part) => part.text), ["quick"]);
  assert.deepEqual(diff.new.filter((part) => part.changed).map((part) => part.text), ["slow"]);
  assert.equal(diff.old.filter((part) => !part.changed).map((part) => part.text.trim()).filter(Boolean).join(" "), "The brown fox");
  const pairs = pairHunkLines([
    { type: "-", text: "old" }, { type: "+", text: "new" }, { type: " ", text: "ctx" },
  ]);
  assert.equal(pairs[0].kind, "pair");
  assert.equal(pairs[1].kind, "line");
});

test("outline lists numbered sections, equations and figures", () => {
  const outline = buildOutline([
    "\\section{Intro}",
    "\\begin{equation}",
    "x = 1",
    "\\label{eq:one}",
    "\\end{equation}",
    "\\subsection{Setup}",
    "\\begin{figure}",
    "\\caption{A figure}",
    "\\label{fig:one}",
    "\\end{figure}",
  ].join("\n"));
  assert.deepEqual(outline.map((entry) => [entry.kind, entry.number, entry.text]), [
    ["section", "1", "Intro"],
    ["equation", "1", "eq:one"],
    ["subsection", "1.1", "Setup"],
    ["figure", "1", "fig:one"],
  ]);
});

test("math contexts and math-command completion", () => {
  assert.equal(inMathContext("Cost is $5 and $10", 8), false);
  assert.equal(inMathContext("Inline $x + ", 12), true);
  assert.equal(inMathContext("Display \\(x + ", 14), true);
  assert.equal(inMathContext("\\begin{equation}\nx", 22), true);
  assert.equal(inMathContext("plain \\alpha", 12), false);
  const mathItems = completionItems("command", "alp", {}, { math: true });
  assert.equal(mathItems[0].label, "\\alpha");
  const plainItems = completionItems("command", "alp", {}, {});
  assert.ok(plainItems.length > 0);
  const packageItems = completionItems("command", "qty", { packages: ["physics"] }, { math: true });
  assert.ok(packageItems.some((item) => item.label === "\\qty"), "physics command");
  assert.deepEqual(usepackagePackages("\\usepackage{amsmath, physics}"), ["amsmath", "physics"]);
});

test("duplicate reroll suggestions are collapsed", () => {
  const block = "```edit\nmain.tex\n<<<<<<< SEARCH\nold\n=======\nnew\n>>>>>>> REPLACE\n```";
  const changes = collectChanges([{ role: "assistant", content: `${block}\n${block}` }]);
  assert.equal(changes.length, 1);
});

test("applied suggestions are detected and fingerprinted by content", () => {
  assert.equal(changeAlreadyApplied({ file: "main.tex", search: "old", replace: "new" }, "new text"), true);
  assert.equal(changeAlreadyApplied({ file: "main.tex", search: "old", replace: "new" }, "old text"), false);
  assert.equal(changeFingerprint({ file: "main.tex", search: "old", replace: "new" }), "main.tex|s|old|new");
});

test("bib edit suggestions are collected for manual review", () => {
  const block = "```edit\nrefs.bib\n<<<<<<< SEARCH\nold\n=======\nnew\n>>>>>>> REPLACE\n```";
  const changes = collectChanges([{ role: "assistant", content: block }]);
  assert.equal(changes.length, 1);
  assert.equal(changes[0].file, "refs.bib");
});
