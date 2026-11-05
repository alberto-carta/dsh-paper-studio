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
  useRef: (value) => ({ current: value }),
  useState: (value) => [value, () => {}],
};
const plugin = definition.factory((id) => {
  if (id === "react") return React;
  throw new Error(`unexpected require: ${id}`);
});
const { highlightLatex, highlightLines, completionContext, completionItems, escapeHtml, DEFAULT_SYNTAX, syntaxVariables } = plugin.__internals;

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
  // Outside a command, a bare word is a candidate filename: completion filters
  // it against the project's files before showing anything.
  assert.deepEqual(completionContext("plain text", 10), { kind: "anyfile", query: "text", start: 6, end: 10 });
});

test("defaults are purple commands with translucent environment bands", () => {
  assert.equal(DEFAULT_SYNTAX.command, "#8b5cf6");
  const vars = syntaxVariables(DEFAULT_SYNTAX);
  assert.equal(vars["--ps-hl-command"], "#8b5cf6");
  assert.match(vars["--ps-bg-figure"], /^rgba\(59, 130, 246, 0\.12\)$/u);
  assert.match(vars["--ps-current-line"], /^rgba\(139, 92, 246, 0\.85\)$/u);
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

  // Typing a bare filename inside a figure completes against project files.
  const bareImage = completionItems("anyfile", "plo", symbols);
  assert.deepEqual(bareImage.map((item) => item.insert), ["figures/plot.png"]);
  const barePath = completionItems("anyfile", "figures/", symbols);
  assert.deepEqual(barePath.map((item) => item.insert), ["figures/plot.png"]);
  // Prose that matches no file yields nothing, so the popup stays closed.
  assert.deepEqual(completionItems("anyfile", "text", symbols), []);
});
