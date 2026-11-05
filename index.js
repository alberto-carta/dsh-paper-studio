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
import { randomBytes } from "node:crypto";
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
function run(argv, { cwd, env, timeoutMs = COMPILE_TIMEOUT_MS } = {}) {
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
      if (text !== undefined) stdout += text;
    });
    child.stderr?.on("data", (chunk) => {
      const text = append(chunk);
      if (text !== undefined) stderr += text;
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

async function renderPages(pdfPath, buildDir, pageCount, tooling) {
  if (!tooling.pdftoppm || pageCount === 0) return [];
  const pagesDir = join(buildDir, "pages");
  await rm(pagesDir, { recursive: true, force: true });
  await mkdir(pagesDir, { recursive: true });
  const limit = Math.min(pageCount, MAX_RENDER_PAGES);
  await run([
    "pdftoppm", "-png", "-r", String(PAGE_DPI), "-f", "1", "-l", String(limit), pdfPath, join(pagesDir, "page"),
  ], { timeoutMs: 120_000 });
  const files = (await readdir(pagesDir).catch(() => [])).filter((file) => file.endsWith(".png"));
  return files.sort((a, b) => pageNumber(a) - pageNumber(b)).map((file) => ({ file, page: pageNumber(file) }));
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
  let files = (await readdir(join(buildDir, "pages")).catch(() => [])).filter((file) => file.endsWith(".png"));
  files = files.sort((a, b) => pageNumber(a) - pageNumber(b)).map((file) => ({ file, page: pageNumber(file) }));
  if (files.length === 0 && tooling.pdftoppm && pages > 0) files = await renderPages(pdfPath, buildDir, pages, tooling);
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
    logTail: "",
    durationMs: 0,
    at: new Date(info.mtimeMs).toISOString(),
    restored: true,
  };
  compiled.set(project.id, cache);
  return cache;
}

async function ensureCompiled(project) {
  return compiled.get(project.id) ?? buildCacheFromDisk(project);
}

async function compileProject(project) {
  const started = Date.now();
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

  const passes = [];
  const latexArgv = [
    "pdflatex", "-interaction=nonstopmode", "-file-line-error", "-synctex=1", "-output-directory", buildDir, basename(mainFile),
  ];
  const first = await run(latexArgv, { cwd: project.path, timeoutMs: COMPILE_TIMEOUT_MS });
  passes.push(first);
  let bibtexRan = false;
  const auxPath = join(buildDir, `${base}.aux`);
  const aux = await readFile(auxPath, "utf8").catch(() => "");
  if (tooling.bibtex && /\\bibdata\{/u.test(aux)) {
    const bibtex = await run(["bibtex", base], {
      cwd: buildDir,
      timeoutMs: 60_000,
      env: {
        // The trailing separator keeps kpathsea's default search path after the
        // project root, so `plain.bst` and friends still resolve while the
        // project's own `references.bib` is found from the build directory.
        BIBINPUTS: `${project.path}${sep === "\\" ? ";" : ":"}${process.env.BIBINPUTS ?? ""}`,
      },
    });
    passes.push(bibtex);
    bibtexRan = true;
  }
  if (bibtexRan || first.code !== 0) {
    const second = await run(latexArgv, { cwd: project.path, timeoutMs: COMPILE_TIMEOUT_MS });
    passes.push(second);
  }
  let last = passes[passes.length - 1];
  const rerun = /Rerun to get|Label\(s\) may have changed|undefined references/iu.test(`${last.stdout}\n${last.stderr}`);
  if (rerun) {
    last = await run(latexArgv, { cwd: project.path, timeoutMs: COMPILE_TIMEOUT_MS });
    passes.push(last);
  }

  const combined = passes.map((pass) => `${pass.stdout}\n${pass.stderr}`).join("\n");
  const log = truncateLog(combined);
  const errors = parseLatexErrors(combined, mainFile).map((entry) => {
    let file = entry.file.replace(/^\.\//u, "");
    if (isAbsolute(file) && (file === project.path || file.startsWith(project.path + sep))) {
      file = file.slice(project.path.length + 1);
    }
    return { ...entry, file };
  });
  const warningMatch = combined.match(/LaTeX Warning:/gu);
  const pdfPath = join(buildDir, `${base}.pdf`);
  const pdfInfo = await stat(pdfPath).catch(() => null);
  const ok = last.code === 0 && Boolean(pdfInfo?.isFile());
  const pages = ok ? await pdfPageCount(pdfPath, tooling) : 0;
  const files = ok ? await renderPages(pdfPath, buildDir, pages, tooling) : [];
  const cache = {
    ok,
    rev: ok ? Number(pdfInfo.mtimeMs) : Date.now(),
    mainFile,
    base,
    pdfPath: ok ? pdfPath : null,
    pages,
    files,
    errors,
    warnings: warningMatch ? warningMatch.length : 0,
    logTail: log,
    durationMs: Date.now() - started,
    bibtex: bibtexRan,
    passes: passes.length,
    at: new Date().toISOString(),
  };
  if (ok) compiled.set(project.id, cache);
  return {
    ok,
    durationMs: cache.durationMs,
    mainFile,
    pages,
    renderedPages: files.length,
    errors,
    warnings: cache.warnings,
    bibtex: bibtexRan,
    passes: passes.length,
    rev: cache.rev,
    exitCode: last.code,
    timedOut: passes.some((pass) => pass.timedOut),
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

async function gitSync(project, action) {
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

  async updateProject({ project: reference, name: nextName, mainFile, overleaf }) {
    const project = projectRef(reference);
    if (typeof nextName === "string" && nextName.trim().length > 0) project.name = nextName.trim();
    if (mainFile !== undefined) {
      const value = String(mainFile ?? "").trim();
      if (value.length > 0) {
        const target = insideProject(project, value);
        if (!(await stat(target).catch(() => null))?.isFile()) throw new HttpError(404, `File not found: ${value}`);
        project.mainFile = value;
      } else {
        project.mainFile = null;
      }
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
    return { ok: true, path: relative, dir: false };
  },

  async deleteEntry({ project: reference, path: relative }) {
    const project = projectRef(reference);
    const target = insideProject(project, relative);
    if (target === project.path) throw new HttpError(400, "Refusing to delete the project root");
    await rm(target, { recursive: true, force: true });
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
    return { ok: true, from, to };
  },

  async compile({ project: reference }) {
    const project = projectRef(reference);
    const { tooling: _tooling, ...result } = await compileProject(project);
    return { project: publicProject(project), ...result };
  },

  async git({ project: reference, action, url, token, name: cloneName, path: clonePath }) {
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
    return gitSync(project, action ?? "status");
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
        return sendJson(response, 200, cache?.pdfPath
          ? { exists: true, rev: cache.rev, pages: cache.pages, renderedPages: cache.files.length, at: cache.at, mainFile: cache.mainFile, restored: Boolean(cache.restored) }
          : { exists: false });
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
        if (action === "pdf") {
          const bytes = await readFile(cache.pdfPath);
          return sendBytes(response, 200, bytes, "application/pdf", { "content-disposition": "inline" });
        }
        const requested = Number(url.searchParams.get("page") ?? "0");
        const file = cache.files.find((candidate) => candidate.page === requested);
        if (!file) return sendJson(response, 404, { error: `Page ${requested} is not rendered` });
        const bytes = await readFile(join(dirname(cache.pdfPath), "pages", file.file));
        return sendBytes(response, 200, bytes, "image/png");
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
