/**
 * Paper Studio — host half.
 *
 * A persistent, profile-wide registry of LaTeX paper projects plus the operations
 * the Paper Studio panel needs: browse files, read/save text, compile with
 * pdflatex + bibtex, render PDF pages to PNG, and sync with a git remote
 * (including Overleaf's git bridge).
 *
 * The browser half talks to this module only through `/paper-studio/api/*`
 * routes guarded by a per-process random token injected into the page index.
 * The same operations are exposed to the agent as the `paper_studio` tool.
 */
import { execFile, spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import {
  chmod, mkdir, readFile, readdir, rename, rm, stat, writeFile,
} from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, isAbsolute, join, resolve, sep } from "node:path";

/** Cordis plugin identity. */
export const name = "paper-studio";

/** The plugin injects `webServer` and `tools` through scoped `ctx.inject` calls, so neither is a hard dependency. */

/** Path prefix owned by this plugin on the Web carrier (no trailing slash: prefix routes match on segments). */
const ROUTE = "/paper-studio/api";
/** Sidebar entry id and `main` slot key; they must match. */
export const PANEL_ID = "paper-studio";

/** Directory names never listed or traversed by the file explorer. */
const SKIP_DIRS = new Set([".git", ".paper-studio", "node_modules", ".venv", "venv", "__pycache__", ".idea", ".vscode", ".cache", ".mypy_cache", ".pytest_cache"]);
/** Dotfiles that remain visible because LaTeX projects use them. */
const VISIBLE_DOTFILES = new Set([".gitignore", ".latexmkrc", ".gitattributes", ".editorconfig", ".bibignore"]);

const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MIME = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".tex": "text/plain; charset=utf-8",
  ".bib": "text/plain; charset=utf-8",
};
const MAX_TREE_ENTRIES = 4000;
const MAX_TREE_DEPTH = 8;
const MAX_LOG_CHARS = 120_000;
const MAX_RENDER_PAGES = 80;
const PAGE_DPI = 110;
const COMPILE_TIMEOUT_MS = 180_000;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

let dataDir = "";
let storeFile = "";
let store = null;
let loading = null;
let writeChain = Promise.resolve();

function defaultDataDir() {
  const home = process.env.DSH_HOME && isAbsolute(process.env.DSH_HOME) ? process.env.DSH_HOME : join(homedir(), ".dsh");
  return join(home, "paper-studio");
}

function freshStore() {
  return { version: 1, projects: [], lastProjectId: null };
}

function normalizeStore(raw) {
  const next = freshStore();
  if (raw && typeof raw === "object" && Array.isArray(raw.projects)) {
    for (const item of raw.projects) {
      if (!item || typeof item !== "object") continue;
      if (typeof item.path !== "string" || item.path.length === 0) continue;
      if (typeof item.id !== "string" || item.id.length === 0) continue;
      next.projects.push({
        id: item.id,
        name: typeof item.name === "string" && item.name.length > 0 ? item.name : basename(item.path),
        path: resolve(item.path),
        mainFile: typeof item.mainFile === "string" && item.mainFile.length > 0 ? item.mainFile : null,
        createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
        lastOpenedAt: typeof item.lastOpenedAt === "string" ? item.lastOpenedAt : null,
        overleaf: item.overleaf && typeof item.overleaf === "object" && typeof item.overleaf.remote === "string"
          ? {
            remote: item.overleaf.remote,
            token: typeof item.overleaf.token === "string" && item.overleaf.token.length > 0 ? item.overleaf.token : null,
          }
          : null,
      });
    }
  }
  if (typeof raw?.lastProjectId === "string" && next.projects.some((project) => project.id === raw.lastProjectId)) {
    next.lastProjectId = raw.lastProjectId;
  }
  return next;
}

async function loadStore() {
  dataDir = process.env.PAPER_STUDIO_HOME && isAbsolute(process.env.PAPER_STUDIO_HOME) ? process.env.PAPER_STUDIO_HOME : defaultDataDir();
  await mkdir(dataDir, { recursive: true, mode: 0o700 });
  await chmod(dataDir, 0o700).catch(() => {});
  storeFile = join(dataDir, "projects.json");
  try {
    store = normalizeStore(JSON.parse(await readFile(storeFile, "utf8")));
  } catch (error) {
    if (error.code !== "ENOENT") console.error("[paper-studio] projects.json unreadable; starting with an empty registry:", error.message);
    store = freshStore();
  }
  await persistStore();
  return store;
}

function persistStore() {
  const snapshot = JSON.stringify(store, null, 2);
  writeChain = writeChain.then(async () => {
    const temporary = `${storeFile}.tmp`;
    await writeFile(temporary, snapshot, { mode: 0o600 });
    await rename(temporary, storeFile);
    await chmod(storeFile, 0o600).catch(() => {});
  }).catch((error) => {
    console.error("[paper-studio] could not persist the project registry:", error.message);
  });
  return writeChain;
}

async function readyStore() {
  if (store !== null) return store;
  loading ??= loadStore().catch((error) => {
    loading = null;
    throw error;
  });
  return loading;
}

// ---------------------------------------------------------------------------
// Paths and project helpers
// ---------------------------------------------------------------------------

function expandPath(input) {
  const text = String(input ?? "").trim();
  if (text.length === 0) return "";
  if (text === "~") return homedir();
  if (text.startsWith("~/")) return join(homedir(), text.slice(2));
  if (isAbsolute(text)) return resolve(text);
  return resolve(homedir(), text);
}

function papersRoot() {
  return join(homedir(), "Documents", "Papers");
}

function slugify(value) {
  const slug = String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-+|-+$/gu, "");
  return slug.length > 0 ? slug.slice(0, 60) : `paper-${randomBytes(3).toString("hex")}`;
}

function projectId() {
  return `p_${randomBytes(5).toString("hex")}`;
}

/** Resolve a project-relative path, refusing traversal outside the project root. */
function insideProject(project, relative) {
  const text = String(relative ?? "").replace(/\\/gu, "/");
  if (text.includes("\0")) throw new HttpError(400, "Invalid path");
  const target = resolve(project.path, text);
  if (target !== project.path && !target.startsWith(project.path + sep)) {
    throw new HttpError(400, "Path escapes the project directory");
  }
  return target;
}

function findProject(id) {
  const project = store.projects.find((candidate) => candidate.id === id);
  if (!project) throw new HttpError(404, "Unknown project");
  return project;
}

function projectRef(ref) {
  const text = String(ref ?? "").trim();
  if (text.length === 0) {
    if (store.lastProjectId) return findProject(store.lastProjectId);
    throw new HttpError(400, "No project selected");
  }
  return store.projects.find((candidate) => candidate.id === text)
    ?? store.projects.find((candidate) => candidate.name === text)
    ?? store.projects.find((candidate) => candidate.path === expandPath(text))
    ?? (() => { throw new HttpError(404, `Unknown project: ${text}`); })();
}

function publicProject(project) {
  return {
    id: project.id,
    name: project.name,
    path: project.path,
    mainFile: project.mainFile,
    createdAt: project.createdAt,
    lastOpenedAt: project.lastOpenedAt,
    overleaf: project.overleaf ? { remote: project.overleaf.remote, hasToken: Boolean(project.overleaf.token) } : null,
  };
}

function touchProject(project) {
  project.lastOpenedAt = new Date().toISOString();
  store.lastProjectId = project.id;
}

async function directoryExists(path) {
  const info = await stat(path).catch(() => null);
  return Boolean(info?.isDirectory());
}

async function findMainFile(project) {
  if (project.mainFile) {
    const candidate = insideProject(project, project.mainFile);
    const info = await stat(candidate).catch(() => null);
    if (info?.isFile()) return project.mainFile;
  }
  const root = project.path;
  let entries;
  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch {
    return null;
  }
  const texFiles = entries.filter((entry) => entry.isFile() && /\.tex$/iu.test(entry.name)).map((entry) => entry.name).sort();
  if (texFiles.includes("main.tex")) return "main.tex";
  for (const file of texFiles) {
    const text = await readFile(join(root, file), "utf8").catch(() => "");
    if (/\\documentclass/u.test(text)) return file;
  }
  return texFiles[0] ?? null;
}

// ---------------------------------------------------------------------------
// Tooling detection and process execution
// ---------------------------------------------------------------------------

let toolingPromise = null;

function probe(command, args = ["--version"]) {
  return new Promise((resolveProbe) => {
    execFile(command, args, { timeout: 10_000, maxBuffer: 1024 * 1024 }, (error, stdout) => {
      if (error) return resolveProbe({ ok: false, version: null });
      resolveProbe({ ok: true, version: String(stdout).split("\n")[0].trim() || null });
    });
  });
}

async function detectTooling() {
  toolingPromise ??= (async () => {
    const [pdflatex, bibtex, pdftoppm, pdfinfo, git] = await Promise.all([
      probe("pdflatex"), probe("bibtex"), probe("pdftoppm", ["-v"]), probe("pdfinfo", ["-v"]), probe("git", ["--version"]),
    ]);
    return {
      pdflatex: pdflatex.ok,
      bibtex: bibtex.ok,
      pdftoppm: pdftoppm.ok,
      pdfinfo: pdfinfo.ok,
      git: git.ok,
      versions: {
        pdflatex: pdflatex.version, bibtex: bibtex.version, pdftoppm: pdftoppm.version, pdfinfo: pdfinfo.version, git: git.version,
      },
    };
  })();
  return toolingPromise;
}

/** Run one bounded child process, collecting capped stdout/stderr. */
function run(argv, { cwd, env, timeoutMs = COMPILE_TIMEOUT_MS, onData } = {}) {
  return new Promise((resolveRun) => {
    let stdout = "";
    let stderr = "";
    let budget = MAX_LOG_CHARS * 2;
    let timedOut = false;
    let settled = false;
    const append = (chunk) => {
      if (budget <= 0) return;
      const text = chunk.toString("utf8");
      budget -= text.length;
      return text;
    };
    let child;
    try {
      child = spawn(argv[0], argv.slice(1), {
        cwd,
        env: { ...process.env, ...(env ?? {}) },
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (error) {
      resolveRun({ code: -1, signal: null, stdout: "", stderr: String(error?.message ?? error), timedOut: false });
      return;
    }
    const timer = setTimeout(() => {
      timedOut = true;
      try { child.kill("SIGKILL"); } catch { /* already gone */ }
    }, Math.max(1000, timeoutMs));
    child.stdout?.on("data", (chunk) => {
      const text = append(chunk);
      if (text !== undefined) {
        stdout += text;
        if (onData) onData(text, "stdout");
      }
    });
    child.stderr?.on("data", (chunk) => {
      const text = append(chunk);
      if (text !== undefined) {
        stderr += text;
        if (onData) onData(text, "stderr");
      }
    });
    const finish = (code, signal) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolveRun({ code, signal, stdout, stderr, timedOut });
    };
    child.on("error", (error) => {
      stderr += `\n${error.message}`;
      finish(-1, null);
    });
    child.on("close", (code, signal) => finish(code, signal));
  });
}

function truncateLog(text) {
  if (text.length <= MAX_LOG_CHARS) return text;
  return `…(${text.length - MAX_LOG_CHARS} earlier characters omitted)…\n${text.slice(-MAX_LOG_CHARS)}`;
}

// ---------------------------------------------------------------------------
// Compilation
// ---------------------------------------------------------------------------

/** Successful/known compile state per project, rebuilt lazily after a restart. */
const compiled = new Map();

function parseLatexErrors(log, fallbackFile) {
  const errors = [];
  const seen = new Set();
  const push = (entry) => {
    const key = `${entry.file}:${entry.line}:${entry.message}`;
    if (seen.has(key)) return;
    seen.add(key);
    errors.push(entry);
  };
  const lines = log.split(/\r?\n/u);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fileLine = /^(?:\.\/)?(.+?\.(?:tex|sty|cls|bib|bst)):(\d+):\s*(.+)$/u.exec(line.trim());
    if (fileLine) {
      push({ file: fileLine[1], line: Number(fileLine[2]), message: fileLine[3].trim() });
      continue;
    }
    const bang = /^!\s+(.+)$/u.exec(line.trim());
    if (bang) {
      let lineNumber = null;
      for (let ahead = index + 1; ahead < Math.min(lines.length, index + 8); ahead += 1) {
        const context = /^l\.(\d+)/u.exec(lines[ahead].trim());
        if (context) { lineNumber = Number(context[1]); break; }
      }
      push({ file: fallbackFile, line: lineNumber, message: bang[1].trim() });
    }
  }
  return errors.slice(0, 100);
}

async function pdfPageCount(pdfPath, tooling) {
  if (tooling.pdfinfo) {
    const result = await run(["pdfinfo", pdfPath], { timeoutMs: 20_000 });
    const match = /^Pages:\s+(\d+)/mu.exec(result.stdout);
    if (match) return Number(match[1]);
  }
  try {
    const bytes = await readFile(pdfPath);
    const matches = bytes.toString("latin1").match(/\/Type\s*\/Page[^s]/gu);
    return matches ? matches.length : 0;
  } catch {
    return 0;
  }
}

function pageNumber(file) {
  const match = /(\d+)(?=\.png$)/u.exec(file);
  return match ? Number(match[1]) : 0;
}

async function buildCacheFromDisk(project) {
  const tooling = await detectTooling();
  const mainFile = await findMainFile(project);
  if (!mainFile) return null;
  const base = basename(mainFile).replace(/\.tex$/iu, "");
  const buildDir = join(project.path, ".paper-studio", "build");
  const pdfPath = join(buildDir, `${base}.pdf`);
  const info = await stat(pdfPath).catch(() => null);
  if (!info?.isFile()) return null;
  const pages = await pdfPageCount(pdfPath, tooling);
  const files = (await readdir(join(buildDir, "pages")).catch(() => [])).filter((file) => file.endsWith(".png"))
    .sort((a, b) => pageNumber(a) - pageNumber(b)).map((file) => ({ file, page: pageNumber(file) }));
  const cache = {
    ok: true,
    rev: Math.round(info.mtimeMs),
    mainFile,
    base,
    pdfPath,
    pages,
    files,
    errors: [],
    warnings: 0,
    warningsList: [],
    logTail: "",
    durationMs: 0,
    bibtex: false,
    passes: 0,
    fingerprint: (await projectFingerprint(project)).hash,
    exitCode: 0,
    timedOut: false,
    at: new Date(info.mtimeMs).toISOString(),
    restored: true,
  };
  compiled.set(project.id, cache);
  return cache;
}

async function ensureCompiled(project) {
  return compiled.get(project.id) ?? buildCacheFromDisk(project);
}

/**
 * Warnings the panel lists beside errors: LaTeX/package warnings, over- and
 * underfull boxes (the usual "it compiles but the typesetting is ugly" cases),
 * and bibtex's `Warning--` lines.
 */
function parseLatexWarnings(log, fallbackFile) {
  const warnings = [];
  const seen = new Set();
  const push = (entry) => {
    const key = `${entry.kind}:${entry.file}:${entry.line}:${entry.message}`;
    if (seen.has(key) || warnings.length >= 200) return;
    seen.add(key);
    warnings.push(entry);
  };
  const lines = log.split(/\r?\n/u);
  for (let index = 0; index < lines.length; index += 1) {
    const text = lines[index].trim();
    const warning = /^(?:LaTeX|Package\s+[\w@.-]+|Class\s+[\w@.-]+)\s+Warning:\s*(.+)$/u.exec(text);
    if (warning) {
      const message = warning[1].trim();
      const inline = /(?:on input line|at lines?)\s+(\d+)/u.exec(message);
      let lineNumber = inline ? Number(inline[1]) : null;
      if (lineNumber === null) {
        for (let ahead = index + 1; ahead < Math.min(lines.length, index + 6); ahead += 1) {
          const context = /^(?:l\.|on input line\s+)(\d+)/u.exec(lines[ahead].trim());
          if (context) { lineNumber = Number(context[1]); break; }
        }
      }
      push({ kind: "warning", file: fallbackFile, line: lineNumber, message: message.slice(0, 600) });
      continue;
    }
    const box = /^(Overfull|Underfull)\s+\\[hv]box[\s\S]*?at lines?\s+(\d+)/u.exec(text);
    if (box) {
      push({ kind: "badbox", file: fallbackFile, line: Number(box[2]), message: text.slice(0, 400) });
      continue;
    }
    const bibtexWarning = /^Warning--(.+)$/u.exec(text);
    if (bibtexWarning) {
      push({ kind: "bibtex", file: null, line: null, message: bibtexWarning[1].trim().slice(0, 400) });
      continue;
    }
    const bibtexError = /^(I couldn't open .+|I found no .+|Sorry---you've exceeded.+)$/u.exec(text);
    if (bibtexError) {
      push({ kind: "bibtex", file: null, line: null, message: text.slice(0, 400) });
    }
  }
  return warnings;
}

/** Inputs whose change invalidates a build. */
const FINGERPRINT_RE = /\.(?:tex|bib|cls|sty|bst|cfg|def|clo|bbx|cbx|lbx|bibtex)$/iu;

async function listInputs(root, relative, out) {
  let entries;
  try {
    entries = await readdir(relative.length === 0 ? root : join(root, relative), { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const child = relative.length === 0 ? entry.name : `${relative}/${entry.name}`;
    if (entry.isDirectory()) {
      await listInputs(root, child, out);
      continue;
    }
    if (!FINGERPRINT_RE.test(entry.name)) continue;
    const info = await stat(join(root, child)).catch(() => null);
    if (info?.isFile()) out.push(`${child}\u0000${Math.round(info.mtimeMs)}\u0000${info.size}`);
  }
}

/**
 * Cheap content fingerprint: source mtimes + sizes, so an unchanged recompile is
 * skipped. `bibHash` covers only bibliography files, letting a prose edit reuse
 * the existing `.bbl` instead of rerunning bibtex and a second pdflatex pass.
 */
async function projectFingerprint(project) {
  const inputs = [];
  await listInputs(project.path, "", inputs);
  inputs.sort();
  const bibs = inputs.filter((entry) => /\.bib\u0000/u.test(entry));
  return {
    hash: createHash("sha1").update(inputs.join("\n")).digest("hex"),
    bibHash: createHash("sha1").update(bibs.join("\n")).digest("hex"),
  };
}

/** In-flight page rasterizations, so two <img> loads for one page share a run. */
const pageJobs = new Map();

/** Render one page on demand into `.paper-studio/build/pages`, reusing the file if present. */
async function renderPage(pdfPath, buildDir, page, tooling) {
  if (!tooling.pdftoppm || !Number.isFinite(page) || page < 1) return null;
  const pagesDir = join(buildDir, "pages");
  const name = `page-${page}.png`;
  const target = join(pagesDir, name);
  const existing = await stat(target).catch(() => null);
  if (existing?.isFile() && existing.size > 0) return name;
  const key = `${pdfPath}:${page}`;
  if (!pageJobs.has(key)) {
    const job = (async () => {
      await mkdir(pagesDir, { recursive: true });
      await run([
        "pdftoppm", "-png", "-r", String(PAGE_DPI), "-singlefile", "-f", String(page), "-l", String(page), pdfPath, join(pagesDir, `page-${page}`),
      ], { timeoutMs: 60_000 });
      const after = await stat(target).catch(() => null);
      return after?.isFile() && after.size > 0 ? name : null;
    })().finally(() => pageJobs.delete(key));
    pageJobs.set(key, job);
  }
  return pageJobs.get(key);
}

async function compileProject(project, emit) {
  const started = Date.now();
  const signal = typeof emit === "function" ? emit : () => {};
  const tooling = await detectTooling();
  if (!tooling.pdflatex) {
    throw new HttpError(503, "pdflatex was not found on PATH. Install a TeX distribution (TeX Live / MacTeX) and retry.");
  }
  if (!(await directoryExists(project.path))) {
    throw new HttpError(410, `Project directory is missing: ${project.path}`);
  }
  const mainFile = await findMainFile(project);
  if (!mainFile) throw new HttpError(400, "No LaTeX main file found. Add a .tex file or set the main file in project settings.");
  const base = basename(mainFile).replace(/\.tex$/iu, "");
  const buildDir = join(project.path, ".paper-studio", "build");
  await mkdir(buildDir, { recursive: true });

  // Inputs unchanged since the last successful build: reuse it instead of
  // spending three pdflatex passes on an identical document.
  const fingerprint = await projectFingerprint(project);
  const previous = compiled.get(project.id);
  if (previous?.ok && previous.fingerprint === fingerprint.hash && previous.pdfPath) {
    const pdfInfo = await stat(previous.pdfPath).catch(() => null);
    if (pdfInfo?.isFile()) {
      signal({ type: "stage", label: "up to date", detail: "sources unchanged since the last build" });
      const files = (await readdir(join(buildDir, "pages")).catch(() => [])).filter((file) => file.endsWith(".png")).sort((a, b) => pageNumber(a) - pageNumber(b)).map((file) => ({ file, page: pageNumber(file) }));
      const reuse = { ...previous, rev: Math.round(pdfInfo.mtimeMs), files, durationMs: 0, cached: true, at: new Date().toISOString() };
      compiled.set(project.id, reuse);
      return {
        ok: true,
        cached: true,
        durationMs: 0,
        mainFile,
        pages: reuse.pages,
        renderedPages: files.length,
        errors: reuse.errors ?? [],
        warnings: (reuse.warningsList ?? []).length,
        warningsList: reuse.warningsList ?? [],
        bibtex: Boolean(reuse.bibtex),
        passes: 0,
        rev: reuse.rev,
        exitCode: 0,
        timedOut: false,
        log: reuse.logTail ?? "",
        tooling,
      };
    }
  }

  const passes = [];
  const latexArgv = [
    "pdflatex", "-interaction=nonstopmode", "-file-line-error", "-synctex=1", "-output-directory", buildDir, basename(mainFile),
  ];
  const streamOutput = (chunk, channel) => signal({ type: "out", channel, text: chunk });
  const hashFile = async (path) => {
    const text = await readFile(path, "utf8").catch(() => "");
    return text.length === 0 ? "" : createHash("sha1").update(text).digest("hex");
  };
  const auxPath = join(buildDir, `${base}.aux`);
  const bblPath = join(buildDir, `${base}.bbl`);
  const latexPasses = [];
  const lastOfLatex = () => latexPasses[latexPasses.length - 1] || first;
  const latexPass = async (label) => {
    signal({ type: "command", argv: latexArgv, stage: label });
    const result = await run(latexArgv, { cwd: project.path, timeoutMs: COMPILE_TIMEOUT_MS, onData: streamOutput });
    passes.push(result);
    latexPasses.push(result);
    return result;
  };
  const first = await latexPass("pdflatex · pass 1");
  const auxText = await readFile(auxPath, "utf8").catch(() => "");
  const auxHash = await hashFile(auxPath);
  let bibtexRan = false;
  let bibtexChanged = false;
  let bibtexPass = null;
  const rerunHint = (pass) => /Rerun to get|Label\(s\) may have changed/iu.test(`${pass.stdout}\n${pass.stderr}`);
  if (tooling.bibtex && /\\bibdata\{/u.test(auxText)) {
    const bblBefore = await hashFile(bblPath);
    // Rerun bibtex only when the citations or the .bib changed, or no .bbl exists.
    const needsBibtex = !previous?.ok || previous.bibHash !== fingerprint.bibHash || previous.auxHash !== auxHash || bblBefore === "";
    if (needsBibtex) {
      const argv = ["bibtex", base];
      signal({ type: "command", argv, stage: "bibtex" });
      const bibtex = await run(argv, {
        cwd: buildDir,
        timeoutMs: 60_000,
        onData: streamOutput,
        env: {
          // The trailing separator keeps kpathsea's default search path after the
          // project root, so `plain.bst` and friends still resolve while the
          // project's own `references.bib` is found from the build directory.
          BIBINPUTS: `${project.path}${sep === "\\" ? ";" : ":"}${process.env.BIBINPUTS ?? ""}`,
        },
      });
      passes.push(bibtex);
      bibtexRan = true;
      bibtexPass = bibtex;
      bibtexChanged = (await hashFile(bblPath)) !== bblBefore;
    } else {
      signal({ type: "stage", label: "bibtex skipped", detail: "citations unchanged" });
    }
  }
  // A second pdflatex pass is only needed when the bibliography actually changed,
  // the first pass failed, or LaTeX asked for a rerun (labels/citations moved).
  if (bibtexChanged || first.code !== 0 || rerunHint(first)) {
    await latexPass(bibtexRan ? "pdflatex · pass 2" : "pdflatex · retry");
  }
  let lastLatex = lastOfLatex();
  if (lastLatex !== first && rerunHint(lastLatex)) lastLatex = await latexPass("pdflatex · pass 3 (cross-references)");

  const combined = passes.map((pass) => `${pass.stdout}\n${pass.stderr}`).join("\n");
  const log = truncateLog(combined);
  // Diagnose the last pass only: an earlier pass's "undefined citation" is fixed
  // by the rerun, so reporting it would flag a successful build as broken.
  const finalLog = `${lastLatex.stdout}\n${lastLatex.stderr}`;
  const bibtexLog = bibtexPass ? `${bibtexPass.stdout}\n${bibtexPass.stderr}` : "";
  const relativeFile = (entry) => {
    let file = String(entry.file ?? "").replace(/^\.\//u, "");
    if (isAbsolute(file) && (file === project.path || file.startsWith(project.path + sep))) {
      file = file.slice(project.path.length + 1);
    }
    return { ...entry, file };
  };
  const errors = parseLatexErrors(finalLog, mainFile).map(relativeFile);
  const warningsList = parseLatexWarnings(`${finalLog}\n${bibtexLog}`, mainFile).map(relativeFile);
  const pdfPath = join(buildDir, `${base}.pdf`);
  const pdfInfo = await stat(pdfPath).catch(() => null);
  const ok = lastLatex.code === 0 && Boolean(pdfInfo?.isFile());
  const pages = ok ? await pdfPageCount(pdfPath, tooling) : 0;
  let files = [];
  if (ok) {
    // Page images belong to exactly one PDF revision. Dropping the old ones is
    // enough: the panel requests page 1 immediately, and the `/page` route
    // rasterizes each page on demand, so compile does not wait for pdftoppm.
    await rm(join(buildDir, "pages"), { recursive: true, force: true });
  }
  const durationMs = Date.now() - started;
  const cache = {
    ok,
    rev: ok ? Number(pdfInfo.mtimeMs) : Date.now(),
    mainFile,
    base,
    pdfPath: ok ? pdfPath : null,
    pages,
    files,
    errors,
    warnings: warningsList.length,
    warningsList,
    logTail: log,
    durationMs,
    bibtex: bibtexRan,
    passes: passes.length,
    fingerprint: fingerprint.hash,
    bibHash: fingerprint.bibHash,
    auxHash: await hashFile(auxPath),
    exitCode: lastLatex.code,
    bibtexExitCode: bibtexRan && bibtexPass ? bibtexPass.code : null,
    timedOut: latexPasses.some((pass) => pass.timedOut),
    at: new Date().toISOString(),
  };
  if (ok) compiled.set(project.id, cache);
  return {
    ok,
    cached: false,
    durationMs,
    mainFile,
    pages,
    renderedPages: files.length,
    errors,
    warnings: warningsList.length,
    warningsList,
    bibtex: bibtexRan,
    passes: passes.length,
    rev: cache.rev,
    exitCode: lastLatex.code,
    bibtexExitCode: bibtexRan && bibtexPass ? bibtexPass.code : null,
    timedOut: latexPasses.some((pass) => pass.timedOut),
    log,
    tooling,
  };
}

// ---------------------------------------------------------------------------
// Git / Overleaf sync
// ---------------------------------------------------------------------------

let askpassPromise = null;

function askpassScript() {
  askpassPromise ??= (async () => {
    const script = join(dataDir, "git-askpass.sh");
    const body = [
      "#!/bin/sh",
      'case "$1" in',
      '  *sername*) printf "%s\\n" "git" ;;',
      '  *) printf "%s\\n" "$PAPER_STUDIO_GIT_TOKEN" ;;',
      "esac",
      "",
    ].join("\n");
    await writeFile(script, body, { mode: 0o700 });
    await chmod(script, 0o700).catch(() => {});
    return script;
  })();
  return askpassPromise;
}

function normalizeOverleafRemote(input) {
  let text = String(input ?? "").trim();
  if (text.length === 0) return "";
  text = text.replace(/^(https?:\/\/)[^@/\s]+@/iu, "$1");
  try {
    const url = new URL(text);
    if (/(^|\.)overleaf\.com$/iu.test(url.hostname)) {
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts[0] === "project" && parts[1]) return `https://git.overleaf.com/${parts[1]}`;
    }
  } catch {
    // Not a URL; keep the raw value for ssh/file remotes.
  }
  return text;
}

async function gitEnvironment(token) {
  const env = { GIT_TERMINAL_PROMPT: "0" };
  if (token) {
    const script = await askpassScript();
    env.GIT_ASKPASS = script;
    env.PAPER_STUDIO_GIT_TOKEN = token;
    env.GIT_ASKPASS_REQUIRE = "force";
  }
  return env;
}

async function runGit(cwd, args, { token, timeoutMs = 180_000 } = {}) {
  const env = await gitEnvironment(token);
  const result = await run(["git", "-C", cwd, ...args], { cwd, env, timeoutMs });
  return {
    ok: result.code === 0,
    code: result.code,
    output: truncateLog(`${result.stdout}${result.stderr}`.trim()).slice(-20_000),
    // Raw stdout keeps porcelain's significant leading space (` M main.tex`).
    stdout: result.stdout.slice(-200_000),
    timedOut: result.timedOut,
  };
}

async function gitStatus(project) {
  if (!(await directoryExists(project.path))) return { repo: false, reason: "project directory is missing" };
  const inside = await runGit(project.path, ["rev-parse", "--is-inside-work-tree"], { timeoutMs: 20_000 });
  if (!inside.ok || !inside.output.includes("true")) return { repo: false };
  const status = await runGit(project.path, ["status", "--porcelain=v1", "-b"], { timeoutMs: 30_000 });
  const lines = status.output.split(/\r?\n/u).filter(Boolean);
  const head = lines.find((line) => line.startsWith("##")) ?? "";
  const branchMatch = /^##\s+(?:No commits yet on\s+)?([^\s.]+)/u.exec(head);
  const ahead = /ahead (\d+)/u.exec(head);
  const behind = /behind (\d+)/u.exec(head);
  let remote = null;
  const remoteResult = await runGit(project.path, ["remote", "get-url", "origin"], { timeoutMs: 20_000 });
  if (remoteResult.ok) remote = remoteResult.output.trim().replace(/\/\/[^@/]+@/u, "//");
  return {
    repo: true,
    branch: branchMatch ? branchMatch[1] : null,
    dirty: lines.filter((line) => !line.startsWith("##")).length,
    ahead: ahead ? Number(ahead[1]) : 0,
    behind: behind ? Number(behind[1]) : 0,
    remote,
    clean: lines.filter((line) => !line.startsWith("##")).length === 0,
  };
}

const sshKeyCache = new Map();

/** Which SSH key git actually offers, best effort: config override, then a probe. */
async function gitSshKey(project) {
  const cached = sshKeyCache.get(project.id);
  if (cached && Date.now() - cached.at < 60_000) return cached.value;
  let value = null;
  const configured = await runGit(project.path, ["config", "--get", "core.sshCommand"], { timeoutMs: 10_000 });
  if (configured.ok && configured.output.trim().length > 0) {
    value = configured.output.trim();
  } else {
    const remote = (await runGit(project.path, ["remote", "get-url", "origin"], { timeoutMs: 10_000 })).output.trim();
    const host = /^[^@]+@([^:]+):/u.exec(remote)?.[1] ?? (/^ssh:\/\/([^/]+)/u.exec(remote)?.[1]) ?? null;
    if (host) {
      const probe = await run(
        ["ssh", "-o", "BatchMode=yes", "-o", "ConnectTimeout=5", "-v", "-T", `git@${host}`],
        { timeoutMs: 12_000 },
      );
      const offered = /Offering public key:\s*(\S+)/u.exec(`${probe.stdout}\n${probe.stderr}`);
      if (offered) value = offered[1];
    }
  }
  sshKeyCache.set(project.id, { at: Date.now(), value });
  return value;
}

/** Run a process with stdin, for filters such as aspell. */
function runWithInput(argv, input, { timeoutMs = 30_000 } = {}) {
  return new Promise((resolveRun) => {
    let stdout = "";
    let stderr = "";
    let settled = false;
    const finish = (code, error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error) stderr += `\n${error.message}`;
      resolveRun({ code, stdout, stderr });
    };
    let child;
    try {
      child = spawn(argv[0], argv.slice(1), { stdio: ["pipe", "pipe", "pipe"] });
    } catch (error) {
      resolveRun({ code: -1, stdout: "", stderr: String(error?.message ?? error) });
      return;
    }
    const timer = setTimeout(() => {
      try { child.kill("SIGKILL"); } catch { /* already gone */ }
    }, Math.max(1000, timeoutMs));
    child.stdout.on("data", (chunk) => { stdout += chunk.toString("utf8"); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString("utf8"); });
    child.on("error", (error) => finish(-1, error));
    child.on("close", (code) => finish(code));
    child.stdin.on("error", () => {});
    child.stdin.end(input);
  });
}

const SPELL_LANGS = new Set(["en_US", "en_GB"]);

/** Unique misspelled words in LaTeX source, via aspell's TeX mode. */
async function spellCheck(text, lang) {
  const language = SPELL_LANGS.has(lang) ? lang : "en_US";
  const input = String(text ?? "").slice(0, 200_000);
  if (input.trim().length === 0) return { ok: true, lang: language, words: [] };
  const result = await runWithInput(
    ["aspell", "-a", "--mode=tex", `--lang=${language}`],
    input,
    { timeoutMs: 20_000 },
  );
  if (result.code !== 0) {
    return { ok: false, lang: language, words: [], error: result.stderr.trim() || `aspell exited ${result.code}` };
  }
  const words = new Set();
  for (const line of result.stdout.split(/\r?\n/u)) {
    const match = /^[&#]\s+(\S+)/u.exec(line);
    if (!match) continue;
    const word = match[1].replace(/^[^A-Za-z]+|[^A-Za-z]+$/gu, "").toLowerCase();
    if (word.length > 0) words.add(word);
  }
  return { ok: true, lang: language, words: [...words].slice(0, 2000) };
}

async function gitInfo(project) {
  const base = await gitStatus(project);
  if (!base.repo) return base;
  const [filesResult, upstream, branches, last] = await Promise.all([
    runGit(project.path, ["status", "--porcelain=v1"], { timeoutMs: 30_000 }),
    runGit(project.path, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], { timeoutMs: 10_000 }),
    runGit(project.path, ["for-each-ref", "--format=%(refname:short)", "refs/heads"], { timeoutMs: 10_000 }),
    runGit(project.path, ["log", "-1", "--format=%h %s"], { timeoutMs: 10_000 }),
  ]);
  const files = filesResult.stdout.split(/\r?\n/u).filter(Boolean).map((line) => ({
    status: line.slice(0, 2).trim(),
    path: line.slice(3).trim(),
  })).filter((entry) => entry.path.length > 0 && !entry.path.startsWith(".paper-studio/"));
  return {
    ...base,
    upstream: upstream.ok ? upstream.output.trim() : null,
    files,
    branches: branches.output.split(/\r?\n/u).filter(Boolean),
    lastCommit: last.ok ? last.output.trim() : null,
    sshKey: await gitSshKey(project),
  };
}

async function gitDiff(project) {
  const status = await gitStatus(project);
  if (!status.repo) return { ok: false, reason: "Not a git repository" };
  // Differences from the published branch: committed-but-unpushed plus local edits.
  const upstream = await runGit(project.path, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], { timeoutMs: 10_000 });
  const base = upstream.ok && upstream.output.trim().length > 0 ? upstream.output.trim() : "HEAD";
  const patch = await runGit(project.path, ["diff", "--no-color", base], { timeoutMs: 60_000 });
  return { ok: true, patch: patch.output.slice(-200_000), branch: status.branch, base };
}

async function gitSync(project, action, options = {}) {
  if (action === "status") return { ok: true, ...(await gitStatus(project)) };
  const token = project.overleaf?.token ?? null;
  if (action === "pull") {
    const result = await runGit(project.path, ["pull", "--rebase", "--autostash"], { token });
    return { ...result, ...(await gitStatus(project)) };
  }
  if (action === "push") {
    const result = await runGit(project.path, ["push", "origin", "HEAD"], { token });
    return { ...result, ...(await gitStatus(project)) };
  }
  if (action === "fetch") {
    const result = await runGit(project.path, ["fetch", "--all", "--prune"], { token });
    return { ...result, ...(await gitStatus(project)) };
  }
  if (action === "nuke") {
    const branch = (await gitStatus(project)).branch;
    if (!branch) throw new HttpError(400, "No branch is checked out");
    const fetch = await runGit(project.path, ["fetch", "--all", "--prune"], { token });
    if (!fetch.ok) return { ...fetch, ...(await gitStatus(project)) };
    const reset = await runGit(project.path, ["reset", "--hard", `origin/${branch}`], { timeoutMs: 60_000 });
    if (!reset.ok) return { ...reset, ...(await gitStatus(project)) };
    // Keep Paper Studio's own build directory: it is untracked and rebuilding is cheap.
    const clean = await runGit(project.path, ["clean", "-fd", "-e", ".paper-studio"], { timeoutMs: 60_000 });
    return {
      ok: clean.ok,
      output: truncateLog([fetch.output, reset.output, clean.output].filter(Boolean).join("\n")).slice(-20_000),
      ...(await gitStatus(project)),
    };
  }
  if (action === "switch" || action === "create") {
    const name = String(options.branch ?? "").trim();
    if (!/^[A-Za-z0-9][A-Za-z0-9._/-]{0,80}$/u.test(name)) throw new HttpError(400, "Invalid branch name");
    const argv = action === "create" ? ["switch", "-c", name] : ["switch", name];
    const result = await runGit(project.path, argv, { token });
    return { ...result, ...(await gitStatus(project)) };
  }
  if (action === "init") {
    const init = await runGit(project.path, ["init"], {});
    if (!init.ok) return init;
    if (project.overleaf?.remote) {
      await runGit(project.path, ["remote", "remove", "origin"], {});
      await runGit(project.path, ["remote", "add", "origin", project.overleaf.remote], {});
    }
    return { ...init, ...(await gitStatus(project)) };
  }
  throw new HttpError(400, `Unknown git action: ${action}`);
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

function articleTemplate(name) {
  return {
    "main.tex": `\\documentclass[11pt,a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage[margin=2.5cm]{geometry}
\\usepackage{microtype}
\\usepackage[hidelinks]{hyperref}

\\title{${name.replace(/[\\{}%#&_$^~]/gu, (character) => `\\${character}`)}}
\\author{Your Name}
\\date{\\today}

\\begin{document}
\\maketitle

\\begin{abstract}
A short abstract. Replace this paragraph with the motivation, the main result,
and the take-home message of the paper.
\\end{abstract}

\\input{sections/introduction}
\\input{sections/methods}

\\section*{Acknowledgements}
We thank colleagues for useful discussions.

\\bibliographystyle{plain}
\\bibliography{references}

\\end{document}
`,
    "sections/introduction.tex": `\\section{Introduction}
\\label{sec:introduction}

Scientific writing benefits from a clear question, a short state of the art,
and an explicit statement of the contribution. This project was created with
Paper Studio, which compiles \\texttt{main.tex} with \\texttt{pdflatex} and
renders the resulting PDF beside the editor.

Cite related work as in \\cite{einstein1905} and keep equations like
\\begin{equation}
  E = mc^2 \\label{eq:energy}
\\end{equation}
referenced with Equation~\\eqref{eq:energy}.

`,
    "sections/methods.tex": `\\section{Methods}
\\label{sec:methods}

Describe the model, the data, and the analysis. For example,
\\begin{equation}
  H = -J \\sum_{\\langle i,j \\rangle} \\sigma_i \\sigma_j
       - h \\sum_i \\sigma_i ,
\\end{equation}
is the Hamiltonian of an Ising model in an external field.

`,
    "references.bib": `@article{einstein1905,
  author  = {Einstein, Albert},
  title   = {On the Electrodynamics of Moving Bodies},
  journal = {Annalen der Physik},
  volume  = {322},
  number  = {10},
  pages   = {891--921},
  year    = {1905},
  doi     = {10.1002/andp.19053221004}
}

@book{onsager1944,
  author    = {Onsager, Lars},
  title     = {Crystal Statistics. {I}. {A} Two-Dimensional Model with an Order-Disorder Transition},
  journal   = {Physical Review},
  volume    = {65},
  pages     = {117--149},
  year      = {1944},
  publisher = {American Physical Society}
}
`,
    ".gitignore": `.paper-studio/
*.aux
*.log
*.out
*.toc
*.bbl
*.blg
*.fls
*.fdb_latexmk
*.synctex.gz
.DS_Store
`,
    "README.md": `# ${name}

LaTeX paper managed with Paper Studio.

- Main file: \`main.tex\`
- Sections: \`sections/\`
- References: \`references.bib\`

Compile from the Paper Studio panel, or run:

\`\`\`sh
pdflatex -output-directory .paper-studio/build main.tex
bibtex .paper-studio/build/main
pdflatex -output-directory .paper-studio/build main.tex
\`\`\`
`,
  };
}

// ---------------------------------------------------------------------------
// PDF → source lookup (SyncTeX inverse search, with a text fallback)
// ---------------------------------------------------------------------------

function decodeXmlEntities(text) {
  return String(text)
    .replace(/&lt;/gu, "<")
    .replace(/&gt;/gu, ">")
    .replace(/&quot;/gu, '"')
    .replace(/&#39;/gu, "'")
    .replace(/&amp;/gu, "&");
}

async function listSourceFiles(root, relative, out) {
  let entries;
  try {
    entries = await readdir(relative.length === 0 ? root : join(root, relative), { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const child = relative.length === 0 ? entry.name : `${relative}/${entry.name}`;
    if (entry.isDirectory()) await listSourceFiles(root, child, out);
    else if (/\.tex$/iu.test(entry.name)) out.push(child);
  }
}

const wordsCache = new Map();

/** Word boxes for one page in PDF points (origin top-left). */
async function pageWords(pdfPath, page) {
  const key = `${pdfPath}:${page}`;
  const cached = wordsCache.get(key);
  if (cached) return cached;
  const result = await run(
    ["pdftotext", "-f", String(page), "-l", String(page), "-bbox", pdfPath, "-"],
    { timeoutMs: 20_000 },
  );
  const size = /<page width="([\d.]+)" height="([\d.]+)"/u.exec(result.stdout);
  const words = [];
  const pattern = /<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<\/word>/gu;
  let match;
  while ((match = pattern.exec(result.stdout))) {
    words.push({
      text: decodeXmlEntities(match[5]),
      xMin: Number(match[1]),
      yMin: Number(match[2]),
      xMax: Number(match[3]),
      yMax: Number(match[4]),
    });
  }
  const value = { width: Number(size ? size[1] : 0), height: Number(size ? size[2] : 0), words };
  wordsCache.set(key, value);
  if (wordsCache.size > 80) wordsCache.delete(wordsCache.keys().next().value);
  return value;
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

/**
 * Find a phrase (as selected in the PDF) in the sources. Tries the whole phrase,
 * then shorter prefixes and finally its longest word, because LaTeX markup often
 * sits between the words the PDF shows.
 */
async function findTextInSources(project, phrase, preferred) {
  const tokens = String(phrase ?? "")
    .replace(/\s+/gu, " ")
    .trim()
    .split(" ")
    .map((token) => token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter((token) => token.length > 0);
  if (tokens.length === 0) return null;
  const files = [];
  await listSourceFiles(project.path, "", files);
  const ordered = preferred && files.includes(preferred)
    ? [preferred, ...files.filter((file) => file !== preferred)]
    : files;
  const longest = [...tokens].sort((left, right) => right.length - left.length)[0];
  const variants = [];
  const add = (list) => {
    if (list.length === 0) return;
    if (!variants.some((existing) => existing.join(" ") === list.join(" "))) variants.push(list);
  };
  if (tokens.length > 1) add(tokens);
  if (tokens.length > 4) add(tokens.slice(0, 4));
  if (tokens.length > 2) add(tokens.slice(0, 2));
  add([longest]);
  for (const variant of variants) {
    const pattern = new RegExp(variant.map(escapeRegExp).join("\\s+"), "iu");
    for (const file of ordered) {
      const text = await readFile(join(project.path, file), "utf8").catch(() => "");
      const match = pattern.exec(text);
      if (match) return { file, line: text.slice(0, match.index).split("\n").length };
    }
  }
  return null;
}

/**
 * SyncTeX reports the line where a paragraph's box started, so several words on
 * one page can map to the same line. Given the word/phrase actually selected,
 * pick the occurrence closest to that line instead.
 */
async function refineTextLine(project, file, line, text) {
  const source = await readFile(join(project.path, file), "utf8").catch(() => "");
  if (source.length === 0) return null;
  const tokens = String(text ?? "")
    .replace(/\s+/gu, " ")
    .trim()
    .split(" ")
    .map((token) => token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter((token) => token.length > 0);
  if (tokens.length === 0) return null;
  const longest = [...tokens].sort((left, right) => right.length - left.length)[0];
  const variants = [];
  const add = (list) => {
    if (list.length === 0) return;
    if (!variants.some((existing) => existing.join(" ") === list.join(" "))) variants.push(list);
  };
  if (tokens.length > 1) add(tokens);
  if (tokens.length > 4) add(tokens.slice(0, 4));
  if (tokens.length > 2) add(tokens.slice(0, 2));
  add([longest]);

  let best = null;
  for (const variant of variants) {
    const pattern = new RegExp(variant.map(escapeRegExp).join("\\s+"), "giu");
    let match;
    while ((match = pattern.exec(source)) !== null) {
      const candidate = source.slice(0, match.index).split("\n").length;
      const distance = Math.abs(candidate - line);
      if (!best || distance < best.distance) best = { line: candidate, distance, phrase: variant.length > 1 };
      if (pattern.lastIndex === match.index) pattern.lastIndex += 1;
    }
    if (best && best.distance <= 30) break;
  }
  if (!best) return null;
  // A multi-word phrase is specific enough to trust even far from the SyncTeX
  // hint; a single common word is not.
  return best.distance <= 120 || best.phrase ? best.line : null;
}

/** First source line containing `needle`, preferring the file already open. */
async function findInSources(project, needle, preferred) {
  const files = [];
  await listSourceFiles(project.path, "", files);
  const ordered = preferred && files.includes(preferred)
    ? [preferred, ...files.filter((file) => file !== preferred)]
    : files;
  const lower = needle.toLowerCase();
  for (const file of ordered) {
    const text = await readFile(join(project.path, file), "utf8").catch(() => "");
    if (text.length === 0) continue;
    const index = text.toLowerCase().indexOf(lower);
    if (index >= 0) return { file, line: text.slice(0, index).split("\n").length };
  }
  return null;
}

/**
 * Map a point on a rendered page back to a source line. SyncTeX is exact; when it
 * has nothing (or the point is outside the .synctex map), fall back to the word
 * nearest the click and its first occurrence in the .tex sources.
 */
async function locateInPdf(project, options) {
  const { page, x, y, current } = options || {};
  const cache = await ensureCompiled(project);
  if (!cache?.pdfPath) throw new HttpError(409, "No compiled PDF yet; compile first.");
  const pdfPath = cache.pdfPath;
  const pageNumberValue = Math.max(1, Math.floor(Number(page) || 1));
  const px = Number(x);
  const py = Number(y);
  if (!Number.isFinite(px) || !Number.isFinite(py) || px < 0 || py < 0) {
    throw new HttpError(400, "Invalid PDF coordinates");
  }
  const relative = (input) => {
    let value = String(input ?? "").trim();
    if (value === project.path) return "";
    if (value.startsWith(project.path + sep)) value = value.slice(project.path.length + 1);
    return value.replace(/^\.\//u, "");
  };

  const sync = await run(
    ["synctex", "edit", "-o", `${pageNumberValue}:${px.toFixed(2)}:${py.toFixed(2)}:${pdfPath}`],
    { cwd: project.path, timeoutMs: 20_000 },
  );
  if (sync.code === 0) {
    const input = /^Input:(.+)$/mu.exec(sync.stdout);
    const line = /^Line:(\d+)/mu.exec(sync.stdout);
    if (input && line) {
      const file = relative(input[1]);
      if (file.length > 0 && !isAbsolute(file) && !file.startsWith("..")) {
        const syncLine = Number(line[1]);
        const text = typeof options.text === "string" ? options.text : "";
        const refined = text.length > 0 ? await refineTextLine(project, file, syncLine, text) : null;
        // Only a nearby match may override SyncTeX; otherwise its paragraph start
        // is the more trustworthy answer.
        if (refined !== null) return { ok: true, file, line: refined, method: "synctex+text" };
        return { ok: true, file, line: syncLine, method: "synctex" };
      }
    }
  }

  if (typeof options.text === "string" && options.text.trim().length > 0) {
    const found = await findTextInSources(project, options.text, current);
    if (found) return { ok: true, file: found.file, line: found.line, method: "text", text: options.text };
  }

  const bbox = await run(
    ["pdftotext", "-f", String(pageNumberValue), "-l", String(pageNumberValue), "-bbox", pdfPath, "-"],
    { timeoutMs: 20_000 },
  );
  const words = [];
  const wordPattern = /<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<\/word>/gu;
  let match;
  while ((match = wordPattern.exec(bbox.stdout))) {
    words.push({
      xMin: Number(match[1]),
      yMin: Number(match[2]),
      xMax: Number(match[3]),
      yMax: Number(match[4]),
      text: decodeXmlEntities(match[5]),
    });
  }
  const candidates = words
    .map((word) => {
      const dx = Math.max(word.xMin - px, 0, px - word.xMax);
      const dy = Math.max(word.yMin - py, 0, py - word.yMax);
      return { word, distance: Math.hypot(dx, dy) };
    })
    .filter((candidate) => candidate.distance <= 140)
    .sort((left, right) => left.distance - right.distance);
  for (const candidate of candidates) {
    const needle = candidate.word.text.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
    // Skip punctuation and one-letter tokens (articles, list markers) and look
    // for the next useful word instead of giving up on the click.
    if (needle.length < 2) continue;
    const found = await findInSources(project, needle, current);
    if (found) return { ok: true, file: found.file, line: found.line, method: "text", word: needle };
    return { ok: false, word: needle, reason: "That text is not in the .tex sources." };
  }
  return { ok: false, reason: "No source position at that point." };
}

// ---------------------------------------------------------------------------
// Operations (shared by the HTTP API and the agent tool)
// ---------------------------------------------------------------------------

const ops = {
  async info() {
    const tooling = await detectTooling();
    const projects = [];
    for (const project of store.projects) {
      projects.push({ ...publicProject(project), exists: await directoryExists(project.path) });
    }
    return {
      panelId: PANEL_ID,
      dataDir,
      pageDpi: PAGE_DPI,
      projects,
      lastProjectId: store.lastProjectId,
      newProjectRoot: papersRoot(),
      tooling,
    };
  },

  async createProject({ name: requestedName, path: requestedPath, template = "article" }) {
    const title = String(requestedName ?? "").trim();
    if (title.length === 0) throw new HttpError(400, "Project name is required");
    const target = requestedPath && String(requestedPath).trim().length > 0
      ? expandPath(requestedPath)
      : join(papersRoot(), slugify(title));
    const existing = await stat(target).catch(() => null);
    if (existing) {
      if (!existing.isDirectory()) throw new HttpError(409, `A file already exists at ${target}`);
      const entries = await readdir(target);
      if (entries.length > 0) throw new HttpError(409, `Directory is not empty: ${target}`);
    }
    await mkdir(target, { recursive: true });
    if (template !== "none") {
      for (const [file, content] of Object.entries(articleTemplate(title))) {
        const destination = join(target, file);
        await mkdir(dirname(destination), { recursive: true });
        await writeFile(destination, content, "utf8");
      }
    }
    const project = {
      id: projectId(),
      name: title,
      path: target,
      mainFile: template === "none" ? null : "main.tex",
      createdAt: new Date().toISOString(),
      lastOpenedAt: new Date().toISOString(),
      overleaf: null,
    };
    store.projects.push(project);
    store.lastProjectId = project.id;
    await persistStore();
    return { project: publicProject(project) };
  },

  async addProject({ path: requestedPath, name: requestedName }) {
    const target = expandPath(requestedPath);
    if (target.length === 0) throw new HttpError(400, "Folder path is required");
    if (!(await directoryExists(target))) throw new HttpError(404, `Folder not found: ${target}`);
    const duplicate = store.projects.find((project) => project.path === target);
    if (duplicate) {
      touchProject(duplicate);
      await persistStore();
      return { project: publicProject(duplicate), existing: true };
    }
    const project = {
      id: projectId(),
      name: String(requestedName ?? "").trim() || basename(target),
      path: target,
      mainFile: null,
      createdAt: new Date().toISOString(),
      lastOpenedAt: new Date().toISOString(),
      overleaf: null,
    };
    project.mainFile = await findMainFile(project);
    if (!project.mainFile) console.warn(`[paper-studio] no .tex main file found in ${target}`);
    store.projects.push(project);
    store.lastProjectId = project.id;
    await persistStore();
    return { project: publicProject(project), existing: false };
  },

  async updateProject({ project: reference, name: nextName, path: nextPath, mainFile, overleaf }) {
    const project = projectRef(reference);
    if (typeof nextName === "string" && nextName.trim().length > 0) project.name = nextName.trim();
    if (nextPath !== undefined) {
      const target = expandPath(String(nextPath ?? "").trim());
      if (target.length === 0) throw new HttpError(400, "Folder path is required");
      if (!(await directoryExists(target))) throw new HttpError(404, `Folder not found: ${target}`);
      project.path = target;
      project.mainFile = null;
      compiled.delete(project.id);
      symbolsCache.delete(project.id);
    }
    if (mainFile !== undefined) {
      const value = String(mainFile ?? "").trim();
      if (value.length > 0) {
        const target = insideProject(project, value);
        if (!(await stat(target).catch(() => null))?.isFile()) throw new HttpError(404, `File not found: ${value}`);
        project.mainFile = value;
      } else {
        project.mainFile = null;
      }
    } else if (nextPath !== undefined) {
      project.mainFile = await findMainFile(project);
    }
    if (overleaf !== undefined) {
      if (overleaf === null) {
        project.overleaf = null;
      } else {
        const remote = normalizeOverleafRemote(overleaf.remote);
        const token = overleaf.token === undefined ? project.overleaf?.token ?? null : (String(overleaf.token ?? "").trim() || null);
        project.overleaf = remote.length > 0 || token ? { remote, token } : null;
      }
    }
    await persistStore();
    return { project: publicProject(project) };
  },

  async removeProject({ project: reference }) {
    const project = projectRef(reference);
    store.projects = store.projects.filter((candidate) => candidate.id !== project.id);
    if (store.lastProjectId === project.id) store.lastProjectId = store.projects[0]?.id ?? null;
    await persistStore();
    return { removed: project.id, note: "Files on disk were left untouched." };
  },

  async selectProject({ project: reference }) {
    const project = projectRef(reference);
    touchProject(project);
    await persistStore();
    return { project: publicProject(project) };
  },

  async tree({ project: reference }) {
    const project = projectRef(reference);
    if (!(await directoryExists(project.path))) throw new HttpError(410, `Project directory is missing: ${project.path}`);
    const entries = [];
    await walkTree(project.path, "", entries, 0);
    return { project: publicProject(project), entries, truncated: entries.length >= MAX_TREE_ENTRIES };
  },

  async readFile({ project: reference, path: relative }) {
    const project = projectRef(reference);
    const target = insideProject(project, relative);
    const info = await stat(target).catch(() => null);
    if (!info?.isFile()) throw new HttpError(404, `File not found: ${relative}`);
    if (info.size > MAX_FILE_BYTES) throw new HttpError(413, `File is too large to edit (${Math.round(info.size / 1024)} KiB): ${relative}`);
    const buffer = await readFile(target);
    if (buffer.includes(0)) throw new HttpError(415, `Binary file cannot be edited as text: ${relative}`);
    return { path: relative, content: buffer.toString("utf8"), mtime: info.mtimeMs, size: info.size };
  },

  async saveFile({ project: reference, path: relative, content, expectedMtime, force }) {
    const project = projectRef(reference);
    const target = insideProject(project, relative);
    const info = await stat(target).catch(() => null);
    const next = String(content ?? "");
    if (next.length > MAX_FILE_BYTES) throw new HttpError(413, "Refusing to write a file larger than 2 MiB");
    if (!force && typeof expectedMtime === "number" && info && Math.abs(info.mtimeMs - expectedMtime) > 1) {
      const disk = await readFile(target).catch(() => null);
      return {
        conflict: true,
        path: relative,
        mtime: info.mtimeMs,
        content: disk && !disk.includes(0) ? disk.toString("utf8") : null,
      };
    }
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, next, "utf8");
    symbolsCache.delete(project.id);
    const after = await stat(target);
    return { ok: true, path: relative, mtime: after.mtimeMs, size: after.size };
  },

  async createEntry({ project: reference, path: relative, kind }) {
    const project = projectRef(reference);
    const target = insideProject(project, relative);
    if (target === project.path) throw new HttpError(400, "Path is required");
    const existing = await stat(target).catch(() => null);
    if (existing) throw new HttpError(409, `Already exists: ${relative}`);
    if (kind === "dir") {
      await mkdir(target, { recursive: true });
      return { ok: true, path: relative, dir: true };
    }
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, "", "utf8");
    symbolsCache.delete(project.id);
    return { ok: true, path: relative, dir: false };
  },

  async deleteEntry({ project: reference, path: relative }) {
    const project = projectRef(reference);
    const target = insideProject(project, relative);
    if (target === project.path) throw new HttpError(400, "Refusing to delete the project root");
    await rm(target, { recursive: true, force: true });
    symbolsCache.delete(project.id);
    return { ok: true, path: relative };
  },

  async renameEntry({ project: reference, from, to }) {
    const project = projectRef(reference);
    const source = insideProject(project, from);
    const destination = insideProject(project, to);
    if (source === project.path) throw new HttpError(400, "Refusing to rename the project root");
    if (await stat(destination).catch(() => null)) throw new HttpError(409, `Already exists: ${to}`);
    await mkdir(dirname(destination), { recursive: true });
    await rename(source, destination);
    symbolsCache.delete(project.id);
    return { ok: true, from, to };
  },

  async locate({ project: reference, page, x, y, current }) {
    const project = projectRef(reference);
    return locateInPdf(project, { page, x, y, current });
  },

  async compile({ project: reference }) {
    const project = projectRef(reference);
    const { tooling: _tooling, ...result } = await serializeCompile(project.id, () => compileProject(project));
    return { project: publicProject(project), ...result };
  },

  async gitInfo({ project: reference }) {
    return gitInfo(projectRef(reference));
  },

  async gitDiff({ project: reference }) {
    return gitDiff(projectRef(reference));
  },

  async spell({ text, lang }) {
    return spellCheck(text, lang);
  },

  async git({ project: reference, action, url, token, name: cloneName, path: clonePath, branch }) {
    if (action === "clone") {
      const remote = normalizeOverleafRemote(url);
      if (remote.length === 0) throw new HttpError(400, "Repository URL is required");
      const target = clonePath && String(clonePath).trim().length > 0
        ? expandPath(clonePath)
        : join(papersRoot(), slugify(cloneName || remote.split("/").filter(Boolean).pop() || "overleaf-paper"));
      const existing = await stat(target).catch(() => null);
      if (existing) {
        const remaining = existing.isDirectory() ? await readdir(target) : [""];
        if (remaining.length > 0) throw new HttpError(409, `Destination is not empty: ${target}`);
      }
      const env = await gitEnvironment(String(token ?? "").trim() || null);
      const clone = await run(["git", "clone", "--", remote, target], {
        cwd: dirname(target), env, timeoutMs: 300_000,
      });
      const output = truncateLog(`${clone.stdout}${clone.stderr}`.trim()).slice(-20_000);
      if (clone.code !== 0) throw new HttpError(400, `git clone failed:\n${output}`);
      const added = await ops.addProject({ path: target, name: cloneName });
      const project = findProject(added.project.id);
      project.overleaf = { remote, token: String(token ?? "").trim() || null };
      await persistStore();
      return { ok: true, project: publicProject(project), output };
    }
    const project = projectRef(reference);
    return gitSync(project, action ?? "status", { branch });
  },
};

async function walkTree(root, relative, out, depth) {
  let entries;
  try {
    entries = await readdir(relative.length === 0 ? root : join(root, relative), { withFileTypes: true });
  } catch (error) {
    if (error.code !== "ENOENT") console.warn(`[paper-studio] cannot list ${relative}:`, error.message);
    return;
  }
  entries.sort((left, right) => {
    const leftDir = left.isDirectory();
    const rightDir = right.isDirectory();
    if (leftDir !== rightDir) return leftDir ? -1 : 1;
    return left.name.localeCompare(right.name, undefined, { numeric: true });
  });
  for (const entry of entries) {
    if (out.length >= MAX_TREE_ENTRIES) return;
    const name = entry.name;
    if (name.startsWith(".") && !VISIBLE_DOTFILES.has(name)) continue;
    if (SKIP_DIRS.has(name)) continue;
    const child = relative.length === 0 ? name : `${relative}/${name}`;
    if (entry.isDirectory()) {
      out.push({ path: child, name, dir: true });
      if (depth + 1 < MAX_TREE_DEPTH) await walkTree(root, child, out, depth + 1);
      continue;
    }
    const info = await stat(join(root, child)).catch(() => null);
    out.push({ path: child, name, dir: false, size: info?.size ?? 0, mtime: info?.mtimeMs ?? 0 });
  }
}

// ---------------------------------------------------------------------------
// Directory browsing (the panel's folder picker)
// ---------------------------------------------------------------------------

const BROWSER_MAX_ENTRIES = 400;

/** List subdirectories of a path so the panel can offer a folder picker. */
async function listDirectories(input) {
  const requested = String(input ?? "").trim();
  const target = expandPath(requested.length === 0 ? papersRoot() : requested);
  const info = await stat(target).catch(() => null);
  if (!info?.isDirectory()) throw new HttpError(404, `Folder not found: ${target}`);
  let children;
  try {
    children = await readdir(target, { withFileTypes: true });
  } catch {
    throw new HttpError(403, `Cannot read folder: ${target}`);
  }
  const directories = children
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules")
    .sort((left, right) => left.name.localeCompare(right.name, undefined, { numeric: true, sensitivity: "base" }));
  const entries = directories.slice(0, BROWSER_MAX_ENTRIES).map((entry) => {
    const child = join(target, entry.name);
    return {
      name: entry.name,
      path: child,
      registered: store.projects.some((project) => project.path === child),
    };
  });
  return {
    path: target,
    parent: dirname(target) === target ? null : dirname(target),
    home: homedir(),
    papers: papersRoot(),
    entries,
    truncated: directories.length > BROWSER_MAX_ENTRIES,
  };
}

// ---------------------------------------------------------------------------
// Compile jobs (streamed to the panel's terminal) and completion symbols
// ---------------------------------------------------------------------------

const JOB_TTL_MS = 10 * 60_000;
const MAX_JOB_EVENTS = 6000;
const jobs = new Map();
/** One compile per project at a time: concurrent runs would share the build dir. */
const compileChains = new Map();

function serializeCompile(projectId, work) {
  const previous = compileChains.get(projectId) ?? Promise.resolve();
  const next = previous.catch(() => {}).then(work);
  const tail = next.finally(() => {
    if (compileChains.get(projectId) === tail) compileChains.delete(projectId);
  });
  compileChains.set(projectId, tail);
  return next;
}

function createJob(project) {
  const job = {
    id: `j_${randomBytes(6).toString("hex")}`,
    projectId: project.id,
    projectName: project.name,
    events: [],
    listeners: new Set(),
    done: false,
    result: null,
    error: null,
    startedAt: Date.now(),
    finishedAt: null,
  };
  let seq = 0;
  job.emit = (event) => {
    const entry = { seq: (seq += 1), at: Date.now(), ...event };
    job.events.push(entry);
    if (job.events.length > MAX_JOB_EVENTS) job.events.splice(0, job.events.length - MAX_JOB_EVENTS);
    for (const listener of job.listeners) {
      try { listener(entry); } catch { /* the browser went away mid-stream */ }
    }
  };
  jobs.set(job.id, job);
  const timer = setTimeout(() => jobs.delete(job.id), JOB_TTL_MS);
  timer.unref?.();
  return job;
}

/** Start a compile for a project and return immediately; progress arrives over SSE. */
function startCompileJob(project) {
  const job = createJob(project);
  job.emit({ type: "start", project: { id: project.id, name: project.name, path: project.path } });
  let buffer = "";
  let channel = "stdout";
  let flushTimer = null;
  const flush = () => {
    if (buffer.length === 0) return;
    job.emit({ type: "out", channel, text: buffer });
    buffer = "";
  };
  const emit = (event) => {
    if (event.type === "out") {
      if (event.channel !== channel) {
        flush();
        channel = event.channel;
      }
      buffer += event.text;
      if (buffer.length >= 24_000) flush();
      if (!flushTimer) {
        flushTimer = setInterval(flush, 120);
        flushTimer.unref?.();
      }
      return;
    }
    flush();
    job.emit(event);
  };
  const stopStreaming = () => {
    flush();
    if (flushTimer) {
      clearInterval(flushTimer);
      flushTimer = null;
    }
  };
  void serializeCompile(project.id, () => compileProject(project, emit))
    .then((result) => {
      stopStreaming();
      job.result = result;
      job.done = true;
      job.finishedAt = Date.now();
      job.emit({ type: "finish", ok: Boolean(result.ok), result });
    })
    .catch((error) => {
      stopStreaming();
      job.error = error?.message ?? String(error);
      job.done = true;
      job.finishedAt = Date.now();
      job.emit({ type: "error", message: job.error });
    });
  return job;
}

function streamJob(request, response, job) {
  response.writeHead(200, {
    "content-type": "text/event-stream; charset=utf-8",
    "cache-control": "no-store, no-transform",
    connection: "keep-alive",
    "x-accel-buffering": "no",
  });
  let closed = false;
  const send = (entry) => {
    if (closed) return;
    try {
      response.write(`id: ${entry.seq}\ndata: ${JSON.stringify(entry)}\n\n`);
    } catch {
      cleanup();
    }
  };
  const cleanup = () => {
    if (closed) return;
    closed = true;
    clearInterval(heartbeat);
    job.listeners.delete(onEvent);
    try { response.end(); } catch { /* already closed */ }
  };
  const onEvent = (entry) => {
    send(entry);
    if (entry.type === "finish" || entry.type === "error") cleanup();
  };
  const heartbeat = setInterval(() => {
    if (!closed) {
      try { response.write(": ping\n\n"); } catch { cleanup(); }
    }
  }, 15_000);
  response.on("close", cleanup);
  request.on("close", cleanup);
  let lastSeq = 0;
  for (const entry of job.events) {
    send(entry);
    lastSeq = entry.seq;
  }
  // A job can finish between the replay above and the listener registration;
  // catch up on anything emitted in that window so the client always sees the
  // final event instead of waiting forever.
  job.listeners.add(onEvent);
  if (job.done) {
    for (const entry of job.events) if (entry.seq > lastSeq) send(entry);
    cleanup();
  }
}

const SYMBOL_CACHE_MS = 5_000;
const symbolsCache = new Map();

/** Read one bibtex field value, respecting braces and quotes. */
function readBibValue(body, field) {
  const match = new RegExp(`\\b${field}\\s*=\\s*`, "iu").exec(body);
  if (!match) return "";
  let index = match.index + match[0].length;
  if (body[index] === "{") {
    const start = index + 1;
    let depth = 0;
    for (; index < body.length; index += 1) {
      if (body[index] === "{") depth += 1;
      else if (body[index] === "}") {
        depth -= 1;
        if (depth === 0) return body.slice(start, index);
      }
    }
    return body.slice(start);
  }
  if (body[index] === '"') {
    const end = body.indexOf('"', index + 1);
    return end === -1 ? body.slice(index + 1) : body.slice(index + 1, end);
  }
  const end = body.slice(index).search(/[,\n]/u);
  return end === -1 ? body.slice(index) : body.slice(index, index + end);
}

function parseBibEntries(text) {
  const entries = [];
  const header = /@([a-zA-Z]+)\s*\{\s*([^,\s}]+)\s*,/gu;
  let match;
  while ((match = header.exec(text))) {
    const type = match[1].toLowerCase();
    if (type === "string" || type === "preamble" || type === "comment") continue;
    let depth = 1;
    let index = header.lastIndex;
    for (; index < text.length; index += 1) {
      if (text[index] === "{") depth += 1;
      else if (text[index] === "}") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    const body = text.slice(header.lastIndex - 1, index);
    const title = readBibValue(body, "title");
    const year = /\b(\d{4})\b/u.exec(readBibValue(body, "year"));
    entries.push({
      key: match[2],
      type,
      title: title.replace(/[{}]/gu, "").replace(/\s+/gu, " ").trim().slice(0, 160),
      year: year ? year[1] : null,
    });
  }
  return entries;
}

/** Citation keys, cross-reference labels and includable files for autocomplete. */
async function collectSymbols(project) {
  const cached = symbolsCache.get(project.id);
  if (cached && Date.now() - cached.at < SYMBOL_CACHE_MS) return cached.value;
  const labels = [];
  const citations = [];
  const commands = [];
  const environments = [];
  const files = [];
  const seenCommands = new Set();
  const seenEnvironments = new Set();
  const seenLabels = new Set();
  const seenCites = new Set();
  const visit = async (relative) => {
    const dir = relative.length === 0 ? project.path : join(project.path, relative);
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
      const child = relative.length === 0 ? entry.name : `${relative}/${entry.name}`;
      if (entry.isDirectory()) {
        await visit(child);
        continue;
      }
      if (/\.(?:png|jpe?g|pdf|eps|svg|tex|bib)$/iu.test(entry.name)) files.push(child);
      if (!/\.(?:tex|bib)$/iu.test(entry.name)) continue;
      const info = await stat(join(project.path, child)).catch(() => null);
      if (!info?.isFile() || info.size > MAX_FILE_BYTES) continue;
      const text = await readFile(join(project.path, child), "utf8").catch(() => "");
      if (/\.tex$/iu.test(entry.name)) {
        const lineOf = (index) => text.slice(0, index).split("\n").length;
        const labelRe = /\\label\s*\{([^{}]+)\}/gu;
        let match;
        while ((match = labelRe.exec(text))) {
          const key = match[1].trim();
          if (key.length === 0 || seenLabels.has(key)) continue;
          seenLabels.add(key);
          labels.push({ key, file: child, line: lineOf(match.index) });
        }
        // User macros: \newcommand{\name}[n], \def\name#1..., \DeclareMathOperator
        const newCommand = /\\(?:newcommand|renewcommand|providecommand|DeclareRobustCommand)\*?\s*\{\s*\\([A-Za-z@]+)\s*\}(?:\s*\[(\d)\])?/gu;
        while ((match = newCommand.exec(text))) {
          const name = match[1];
          if (seenCommands.has(name)) continue;
          seenCommands.add(name);
          commands.push({ name, arity: Number(match[2] || 0), file: child, line: lineOf(match.index) });
        }
        const defCommand = /\\def\s*\\([A-Za-z@]+)((?:#\d)*)/gu;
        while ((match = defCommand.exec(text))) {
          const name = match[1];
          if (seenCommands.has(name)) continue;
          seenCommands.add(name);
          commands.push({ name, arity: (match[2].match(/#\d/gu) || []).length, file: child, line: lineOf(match.index) });
        }
        const operator = /\\DeclareMathOperator\*?\s*\{\s*\\([A-Za-z@]+)\s*\}/gu;
        while ((match = operator.exec(text))) {
          const name = match[1];
          if (seenCommands.has(name)) continue;
          seenCommands.add(name);
          commands.push({ name, arity: 0, file: child, line: lineOf(match.index) });
        }
        const newEnvironment = /\\(?:newenvironment|renewenvironment)\s*\{\s*([^{}]+?)\s*\}/gu;
        while ((match = newEnvironment.exec(text))) {
          const name = match[1].trim();
          if (name.length === 0 || /[#\\]/u.test(name) || seenEnvironments.has(name)) continue;
          seenEnvironments.add(name);
          environments.push({ name, file: child, line: lineOf(match.index) });
        }
      } else {
        for (const cite of parseBibEntries(text)) {
          if (seenCites.has(cite.key)) continue;
          seenCites.add(cite.key);
          citations.push({ ...cite, file: child });
        }
      }
    }
  };
  await visit("");
  const value = {
    labels: labels.slice(0, 2000),
    citations: citations.slice(0, 2000),
    commands: commands.slice(0, 1000),
    environments: environments.slice(0, 500),
    files: files.slice(0, 2000),
  };
  symbolsCache.set(project.id, { at: Date.now(), value });
  return value;
}

// ---------------------------------------------------------------------------
// HTTP API
// ---------------------------------------------------------------------------

function sendJson(response, status, value) {
  if (response.headersSent) return;
  const body = JSON.stringify(value);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body),
  });
  response.end(body);
}

function sendBytes(response, status, bytes, contentType, extraHeaders = {}) {
  if (response.headersSent) return;
  response.writeHead(status, {
    "content-type": contentType,
    "cache-control": "no-store",
    "content-length": bytes.length,
    ...extraHeaders,
  });
  response.end(bytes);
}

function readJsonBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 10 * 1024 * 1024) {
        rejectBody(new HttpError(413, "Request body too large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      if (size === 0) return resolveBody({});
      try {
        resolveBody(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        rejectBody(new HttpError(400, "Invalid JSON body"));
      }
    });
    request.on("error", rejectBody);
  });
}

function createHandler(token) {
  const authorized = (request) => {
    const header = request.headers["x-paper-token"];
    if (typeof header === "string" && header === token) return true;
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    return url.searchParams.get("t") === token;
  };
  return async (request, response) => {
    try {
      if (!authorized(request)) return sendJson(response, 403, { error: "Unauthorized" });
      await readyStore();
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      const action = decodeURIComponent(url.pathname.slice(ROUTE.length)).replace(/^\/+|\/+$/gu, "");
      if (request.method === "GET" && action === "info") return sendJson(response, 200, await ops.info());
      if (request.method === "GET" && action === "tree") return sendJson(response, 200, await ops.tree({ project: url.searchParams.get("project") }));
      if (request.method === "GET" && action === "file") {
        return sendJson(response, 200, await ops.readFile({ project: url.searchParams.get("project"), path: url.searchParams.get("path") }));
      }
      if (request.method === "GET" && action === "pdf-info") {
        const project = projectRef(url.searchParams.get("project"));
        const cache = await ensureCompiled(project).catch(() => null);
        if (!cache?.pdfPath) return sendJson(response, 200, { exists: false });
        const onDisk = await stat(cache.pdfPath).catch(() => null);
        if (!onDisk?.isFile()) {
          compiled.delete(project.id);
          return sendJson(response, 200, { exists: false });
        }
        return sendJson(response, 200, {
          exists: true, rev: cache.rev, pages: cache.pages, renderedPages: cache.files.length,
          at: cache.at, mainFile: cache.mainFile, restored: Boolean(cache.restored),
        });
      }
      if (request.method === "GET" && action === "git") {
        return sendJson(response, 200, await ops.git({ project: url.searchParams.get("project"), action: url.searchParams.get("action") ?? "status" }));
      }
      if (request.method === "GET" && action === "raw") {
        const project = projectRef(url.searchParams.get("project"));
        const target = insideProject(project, url.searchParams.get("path"));
        const info = await stat(target).catch(() => null);
        if (!info?.isFile()) return sendJson(response, 404, { error: "File not found" });
        if (info.size > 48 * 1024 * 1024) return sendJson(response, 413, { error: "File is too large to preview" });
        const bytes = await readFile(target);
        return sendBytes(response, 200, bytes, MIME[extname(target).toLowerCase()] ?? "application/octet-stream", {
          "content-disposition": "inline",
        });
      }
      if (request.method === "GET" && (action === "pdf" || action === "page")) {
        const project = projectRef(url.searchParams.get("project"));
        const cache = await ensureCompiled(project);
        if (!cache?.pdfPath) return sendJson(response, 404, { error: "No compiled PDF yet" });
        if (!(await stat(cache.pdfPath).catch(() => null))?.isFile()) {
          compiled.delete(project.id);
          return sendJson(response, 404, { error: "Compiled PDF is missing; compile again." });
        }
        if (action === "pdf") {
          const bytes = await readFile(cache.pdfPath);
          return sendBytes(response, 200, bytes, "application/pdf", { "content-disposition": "inline" });
        }
        const requested = Number(url.searchParams.get("page") ?? "0");
        if (!Number.isInteger(requested) || requested < 1) return sendJson(response, 400, { error: "Invalid page number" });
        const buildDir = dirname(cache.pdfPath);
        const rendered = await renderPage(cache.pdfPath, buildDir, requested, await detectTooling());
        if (!rendered) return sendJson(response, 404, { error: `Page ${requested} could not be rendered` });
        if (!cache.files.some((entry) => entry.page === requested)) {
          cache.files.push({ file: rendered, page: requested });
          cache.files.sort((left, right) => left.page - right.page);
        }
        const bytes = await readFile(join(buildDir, "pages", rendered));
        return sendBytes(response, 200, bytes, "image/png");
      }
      if (request.method === "GET" && action === "page/words") {
        const project = projectRef(url.searchParams.get("project"));
        const cache = await ensureCompiled(project);
        if (!cache?.pdfPath) return sendJson(response, 404, { error: "No compiled PDF yet" });
        const page = Number(url.searchParams.get("page") ?? "1");
        if (!Number.isInteger(page) || page < 1) return sendJson(response, 400, { error: "Invalid page number" });
        return sendJson(response, 200, await pageWords(cache.pdfPath, page));
      }
      if (request.method === "GET" && action === "fs/list") {
        return sendJson(response, 200, await listDirectories(url.searchParams.get("path")));
      }
      if (request.method === "GET" && action === "git/info") {
        return sendJson(response, 200, await ops.gitInfo({ project: url.searchParams.get("project") }));
      }
      if (request.method === "GET" && action === "git/diff") {
        return sendJson(response, 200, await ops.gitDiff({ project: url.searchParams.get("project") }));
      }
      if (request.method === "GET" && action === "symbols") {
        const project = projectRef(url.searchParams.get("project"));
        return sendJson(response, 200, await collectSymbols(project));
      }
      if (request.method === "GET" && action === "compile/events") {
        const job = jobs.get(String(url.searchParams.get("job") ?? ""));
        if (!job) return sendJson(response, 404, { error: "Unknown compile job (it may have expired; compile again)" });
        return streamJob(request, response, job);
      }
      if (request.method !== "POST") return sendJson(response, 405, { error: "Method not allowed" });
      const body = await readJsonBody(request);
      switch (action) {
        case "project/create": return sendJson(response, 200, await ops.createProject(body));
        case "project/add": return sendJson(response, 200, await ops.addProject(body));
        case "project/update": return sendJson(response, 200, await ops.updateProject(body));
        case "project/remove": return sendJson(response, 200, await ops.removeProject(body));
        case "project/select": return sendJson(response, 200, await ops.selectProject(body));
        case "file/save": return sendJson(response, 200, await ops.saveFile(body));
        case "file/create": return sendJson(response, 200, await ops.createEntry(body));
        case "file/delete": return sendJson(response, 200, await ops.deleteEntry(body));
        case "file/rename": return sendJson(response, 200, await ops.renameEntry(body));
        case "compile": return sendJson(response, 200, await ops.compile(body));
        case "pdf/locate": return sendJson(response, 200, await ops.locate(body));
        case "spell": return sendJson(response, 200, await ops.spell(body));
        case "compile/start": {
          const project = projectRef(body.project);
          const job = startCompileJob(project);
          return sendJson(response, 200, { jobId: job.id, projectId: project.id, startedAt: job.startedAt });
        }
        case "git": return sendJson(response, 200, await ops.git(body));
        default: return sendJson(response, 404, { error: `Unknown action: ${action}` });
      }
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      if (status >= 500) console.error("[paper-studio]", error);
      sendJson(response, status, { error: error?.message ?? String(error) });
    }
  };
}

// ---------------------------------------------------------------------------
// Agent tool
// ---------------------------------------------------------------------------

function registerTool(ctx, tools) {
  const dispose = tools.register({
    name: "paper_studio",
    description: "Manage the user's Paper Studio LaTeX projects (the panel beside the conversation). Actions: `list` returns registered papers and the LaTeX toolchain status; `create` scaffolds a new paper project (main.tex, sections/, references.bib) and registers it; `add` registers an existing folder; `compile` runs pdflatex/bibtex in the project and returns the parsed errors, warnings, log tail, PDF page count and the paths that were produced. Use it after editing .tex files so the user sees a fresh PDF, and read the errors it returns before fixing them.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        action: { type: "string", enum: ["list", "create", "add", "compile"], description: "Operation to perform." },
        project: { type: "string", description: "Project id, exact name, or absolute path. Defaults to the last opened project." },
        name: { type: "string", description: "Title for `create`, or a display name for `add`." },
        path: { type: "string", description: "Target folder for `create`, or the existing folder for `add`. Defaults to ~/Documents/Papers/<slug>." },
        template: { type: "string", enum: ["article", "none"], description: "`article` writes the starter paper; `none` registers an empty folder." },
      },
      required: ["action"],
    },
    output: {
      schema: { type: "object", additionalProperties: true },
      render: (_args, value) => [{ type: "text", text: JSON.stringify(value, null, 2) }],
    },
    presentCall: (args) => ({
      card: "generic",
      kind: args?.action === "compile" ? "execute" : "read",
      title: args?.action === "compile" ? "Compile LaTeX paper" : "Paper Studio",
    }),
    async execute(args) {
      await readyStore();
      const action = args?.action;
      if (action === "list") {
        const info = await ops.info();
        return {
          ok: true,
          projects: info.projects.map((project) => ({ id: project.id, name: project.name, path: project.path, mainFile: project.mainFile, exists: project.exists, overleaf: project.overleaf?.remote ?? null })),
          lastProjectId: info.lastProjectId,
          tooling: info.tooling,
        };
      }
      if (action === "create") {
        const result = await ops.createProject({ name: args?.name, path: args?.path, template: args?.template ?? "article" });
        return { ok: true, ...result };
      }
      if (action === "add") {
        const result = await ops.addProject({ path: args?.path, name: args?.name });
        return { ok: true, ...result };
      }
      if (action === "compile") {
        return await ops.compile({ project: args?.project });
      }
      throw new Error(`Unknown action: ${String(action)}`);
    },
  });
  ctx.effect(() => dispose, "paper-studio: agent tool");
}

// ---------------------------------------------------------------------------
// Plugin entry
// ---------------------------------------------------------------------------

export function apply(ctx) {
  readyStore().catch((error) => {
    console.error("[paper-studio] registry initialization failed:", error);
  });

  ctx.inject(["webServer"], (scoped) => {
    const token = randomBytes(24).toString("hex");
    const injection = `<script>window.__DSH_PAPER_STUDIO__=${JSON.stringify({ token, route: ROUTE, panelId: PANEL_ID })}<\/script>`;
    scoped.effect(() => scoped.webServer.tapIndex((html) => (html.includes("</head>") ? html.replace(/<\/head>/iu, `${injection}</head>`) : `${injection}${html}`)), "paper-studio: browser token");
    scoped.effect(() => scoped.webServer.register({ kind: "prefix", path: ROUTE, handler: createHandler(token) }), "paper-studio: api routes");
  });

  ctx.inject(["tools"], (scoped) => {
    registerTool(scoped, scoped.tools);
  });
}

/** Internal helpers for `npm test` (test/compile.test.mjs); not part of the plugin API. */
export const __test = {
  createHandler,
  ops,
  compileProject,
  collectSymbols,
  locateInPdf,
  findInSources,
  findTextInSources,
  refineTextLine,
  spellCheck,
  gitInfo,
  gitDiff,
  gitSshKey,
  pageWords,
  run,
  parseBibEntries,
  parseLatexErrors,
  parseLatexWarnings,
  projectFingerprint,
  renderPage,
  detectTooling,
};
