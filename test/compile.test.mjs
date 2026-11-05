/**
 * Offline checks for the host half: compile pipeline, incremental cache,
 * warning parsing, on-demand page rendering and the completion symbol index.
 *
 * Run with `node --test test/` (needs pdflatex/bibtex on PATH).
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { __test } from "../index.js";

const here = dirname(fileURLToPath(import.meta.url));
const demo = join(here, "..", "..", "paper-studio-demo");
const project = { id: "test-project", name: "Paper Studio Demo", path: demo, mainFile: "main.tex" };

test("compile streams commands and output, then reports one page and no errors", async () => {
  const events = [];
  const first = await __test.compileProject(project, (event) => events.push(event));

  assert.equal(first.ok, true, `compile failed:\n${first.log.slice(-3000)}`);
  assert.equal(first.pages, 1);
  assert.equal(first.errors.length, 0);
  assert.equal(first.cached, false);
  assert.equal(first.bibtex, true);
  assert.ok(first.warningsList.length >= 0);

  const commands = events.filter((event) => event.type === "command").map((event) => event.argv[0]);
  assert.ok(commands.includes("pdflatex"), "terminal should see the pdflatex command");
  assert.ok(commands.includes("bibtex"), "terminal should see the bibtex command");
  assert.ok(events.some((event) => event.type === "out" && event.text.length > 0), "terminal should receive output");

  assert.match(first.log, /plain\.bst/u, "bibtex must resolve the system plain.bst");
  assert.equal(/undefined (?:citation|reference)/iu.test(first.log), false);

  // Pages are rasterized on demand, so a compile no longer waits for pdftoppm.
  assert.equal(first.renderedPages, 0);
  const pageOne = await __test.renderPage(join(demo, ".paper-studio", "build", "main.pdf"), join(demo, ".paper-studio", "build"), 1, await __test.detectTooling());
  assert.equal(pageOne, "page-1.png");
});

test("recompiling unchanged sources is served from the incremental cache", async () => {
  const second = await __test.compileProject(project, () => {});
  assert.equal(second.ok, true);
  assert.equal(second.cached, true);
  assert.equal(second.passes, 0);
  assert.equal(second.durationMs, 0);
  assert.equal(second.pages, 1);
});

test("a prose-only edit compiles in one pass and skips bibtex", async () => {
  const { readFile, writeFile } = await import("node:fs/promises");
  const touched = join(demo, "sections", "methods.tex");
  const original = await readFile(touched, "utf8");
  await writeFile(touched, `${original}\n% prose-only edit\n`, "utf8");
  try {
    const events = [];
    const result = await __test.compileProject(project, (event) => events.push(event));
    assert.equal(result.ok, true);
    assert.equal(result.cached, false);
    assert.equal(result.passes, 1, "only one pdflatex pass for a prose edit");
    assert.equal(result.bibtex, false, "bibtex must not rerun when citations did not change");
    assert.ok(
      events.some((event) => event.type === "stage" && /bibtex skipped/u.test(event.label || "")),
      "terminal should explain the skipped bibtex",
    );
  } finally {
    await writeFile(touched, original, "utf8");
  }
});

test("PDF points map back to source lines through SyncTeX", async () => {
  const hit = await __test.locateInPdf(project, { page: 1, x: 300, y: 300 });
  assert.equal(hit.ok, true);
  assert.match(hit.file, /\.tex$/u);
  assert.ok(hit.line >= 1);
  assert.equal(hit.method, "synctex");
});

test("a missing .synctex falls back to matching the nearest word", async () => {
  const { rename } = await import("node:fs/promises");
  const map = join(demo, ".paper-studio", "build", "main.synctex.gz");
  await rename(map, `${map}.test-bak`);
  try {
    const hit = await __test.locateInPdf(project, { page: 1, x: 300, y: 300 });
    assert.equal(hit.ok, true);
    assert.equal(hit.method, "text");
    assert.match(hit.file, /\.tex$/u);
  } finally {
    await rename(`${map}.test-bak`, map);
  }
});

test("warning parser surfaces LaTeX warnings, boxes and bibtex warnings", () => {
  const log = [
    "LaTeX Warning: Citation `x' on page 1 undefined on input line 12.",
    "Package hyperref Warning: Token not allowed in a PDF string on input line 4.",
    "Overfull \\hbox (3.2pt too wide) in paragraph at lines 7--8",
    "Underfull \\vbox (badness 10000) has occurred while \\output is active",
    "Warning--I didn't find a database entry for \"y\"",
  ].join("\n");
  const warnings = __test.parseLatexWarnings(log, "main.tex");
  assert.equal(warnings.filter((entry) => entry.kind === "warning").length, 2);
  assert.equal(warnings.filter((entry) => entry.kind === "badbox").length, 1);
  assert.equal(warnings.filter((entry) => entry.kind === "bibtex").length, 1);
  const citation = warnings.find((entry) => entry.message.includes("Citation"));
  assert.equal(citation.line, 12);
});

test("symbol index finds labels and citation keys for autocomplete", async () => {
  const symbols = await __test.collectSymbols(project);
  assert.ok(symbols.citations.some((entry) => entry.key === "einstein1905"), "citation key from references.bib");
  assert.ok(symbols.citations.every((entry) => typeof entry.key === "string" && entry.key.length > 0));
  assert.ok(Array.isArray(symbols.labels));
  assert.ok(symbols.files.includes("main.tex"));
});
