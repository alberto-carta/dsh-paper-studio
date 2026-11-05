# Paper Studio — handover

Prepared 2026-11-04; updated 2026-11-05 for Paper Studio 1.3.0.

## Where it lives now

| What | Path |
| --- | --- |
| Plugin source (authoritative, git repo) | `~/Documents/Papers/paper-studio` |
| Profile dependency | `link:` entry in `~/.dsh/profiles/web/package.json` |
| Profile selection | `@local/paper-studio` in `dsh.profile.bundles` |
| Project registry | `~/.dsh/paper-studio/projects.json` (mode 600) |
| Overleaf tokens | inside the registry, per project; never in `.git/config` |
| Papers | `~/Documents/Papers/<slug>` |
| Demo paper | `~/Documents/Papers/paper-studio-demo` |
| Build output | `<project>/.paper-studio/build/` (hidden, gitignored) |

The source used to live in `~/.local/share/dsh-plugins/paper-studio`. That copy
is now stale and unused; the profile link points at the repository above.
Older references to the old path no longer apply.

## Restart once after switching the install path

The Host half of a plugin is cached for the life of the Node process. After
reinstalling from the new path, restart the process that runs `dsh web`, then
reload the page (the panel's API token is injected into the page HTML at load
time). A page reload alone is enough for `client.js`-only changes; anything in
`index.js` needs the restart.

## 1.3.0 — editor, Git panel, PDF text layer, settings

**Operational note (important):** the Web host snapshots client bundles at boot
and serves them under an immutable rev, so a page reload alone does **not** pick
up a changed `client.js`. After client-side changes, **restart the Harness**. The
editor footer and Settings show a build tag (e.g. `b05:24`) to confirm what the
page actually loaded.

- **Editor scroll/wrap rewrite:** the highlighted text layer is aligned with the
  textarea by width (`textarea.clientWidth`, scrollbar included), re-applied when
  a file mounts, and kept in sync via layout effects; a stray `blockRef`
  reference in the host-side scroll handler (which threw and aborted the sync)
  was removed.
- **Soft wrap:** toggle in Settings → Editor → Editing and in the editor footer;
- **Clipboard scope:** shortcuts only act in insert mode (or with Vim off).
  Normal/visual mode refuse paste/cut (Ctrl+V is visual-block there) and, when
  diagnostics are on, log/toast `warning, vim bindings, ctrl-v not allowed in
  normal mode`. Ctrl+Shift+C is reserved by browsers for DevTools; Ctrl+C or
  Ctrl+Insert are the reliable copy shortcuts.
- **Bracket matching:** the pair around the caret is measured with the same mirror
  as the caret and drawn in a layer that scrolls with the text; escaped braces
  are skipped and unmatched brackets are red.

  line numbers are rendered inside the text layer so they stay aligned with
  wrapped logical lines.
- **Vim mode** (Settings → Editor → Shortcuts): normal/insert/visual, motions
  `h j k l w b e 0 $ gg G`, operators `x dd yy p P u`, visual `v`+`d`/`y`, and an
  ex command line supporting `:w`, `:wq`, `:<n>`, `:%s/pat/rep/g`,
  `:s/pat/rep/g` (with `i`). Arrow/Home/End/Page keys stay native, so they follow
  visual rows under wrap. Block cursor in normal mode, line caret in insert.
- **Spellcheck** via aspell (`--mode=tex`) with US/UK dictionaries and wavy
  underlines; off by default.
- **Completion:** project macros (`\newcommand`/`\def`/`\DeclareMathOperator`,
  with arity) and custom environments are indexed; commands insert their required
  argument braces; `\begin{…}` expands figure/table/itemize/enumerate/equation/
  align/theorem/proof/abstract/tikzpicture snippets with the caret placed
  sensibly. The popup is fixed below the caret line and accepts with Tab or click
  (Enter inserts a newline).
- **Context menu:** Cut/Copy/Paste, separator, then Bold/Italic/Underline with
  shortcut hints.
- **Settings:** one gear dialog, Editor tab split into Appearance / Editing /
  Spelling / Shortcuts, plus the Project tab (name, main file, remote, token,
  git sync, remove). Optional diagnostics readout for layout investigations.
- **Git panel:** status, upstream/ahead/behind, changed files, diff vs upstream,
  fetch/pull/push, branch switch/create, SSH key display, and *Reset to origin*
  behind an explicit red confirmation (explosion animation on success).
- **PDF:** real text layer over the page (drag selection, double-click a word,
  *Go to editor*), column-aware reading order for two-column papers, reload
  button and a missing-PDF state.
- **Header:** Terminal and Problems merged into one Output button; auto-compile
  moved to Settings (off by default).
- **Compile on manual save:** a toggle in Settings → Editor → Editing, on by
  default. Manual saves (header Save, Ctrl/Cmd+S, Vim `:w`) schedule a compile
  120 ms later; autosaves do not, unless the separate Auto-compile toggle is on.
  The compile pass saves with `manual: false` so it cannot re-trigger itself.
- **Saving/compiling:** manual Save button beside the status (disabled when clean);
  autosave on by default with a 0.5–10 s delay selectable in Settings → Editor →
  Editing; the compile button is split — centre click is the incremental build,
  the caret opens **Full recompile**, which bypasses the fingerprint cache and
  forces the bibtex/rerun passes (`force: true` on `compile` and `compile/start`).

Verification: 27 offline tests plus the headless render smoke; scroll/wrap
alignment confirmed against the diagnostics readout (`cw` == `pw`).

## What is new in 1.1.0

- **Streamed compile terminal.** The panel starts a compile job and reads its
  events over SSE (`POST compile/start`, `GET compile/events?job=…`). The
  terminal shows `$ pdflatex …` / `$ bibtex …`, every command's live stdout and
  stderr, stage markers and a timer. Header button or `Ctrl/⌘ + \`` toggles it.
- **Problems list.** The header button opens a dock listing errors and warnings
  with severity badges; a row opens the file at that line where one is known.
  Warnings now include `LaTeX Warning`, `Package … Warning`, over/underfull
  boxes and bibtex `Warning--` lines. Diagnostics are read from the **final**
  pass, so a citation fixed by a rerun no longer shows as a problem.
- **Faster compiles.** Input fingerprint (source mtimes/sizes) makes an
  unchanged rebuild instant; bibtex and the second pdflatex pass are skipped
  when the bibliography and aux are unchanged (typical prose edit: one pass);
  pages render on demand per page instead of rasterizing the whole PDF; the
  `-synctex=1` write (unused by the panel) was dropped.
- **LaTeX syntax highlighting** behind the textarea (commands, math, comments,
  braces), scroll-synced, with the caret and selection preserved.
- **Completion** for commands, environments, packages, `\ref` labels, `\cite`
  keys, `\includegraphics` images and `\input` files; `Ctrl/⌘ + Space` forces
  it, `↑/↓` navigate, `Enter`/`Tab` accept, `Esc` dismisses.
- **Resizable panes.** Explorer width, PDF width and dock height are draggable
  and persisted in `localStorage` (`dsh.paper-studio.ui`).
- Host additions: `GET symbols`, `POST compile/start`, `GET compile/events`,
  on-demand `GET page`, structured `warningsList` on compile results.

## CodeMirror groundwork (2026-11-05)

The long-term editor migration to CodeMirror 6 (for complete Vim via the MIT
`@replit/codemirror-vim`, which Overleaf also forks) starts with a shippable
bundle rather than a rewrite in place:

```sh
npm install            # devDependencies (esbuild + CodeMirror + vim)
npm run build:editor   # vendor/entry.js -> vendor/codemirror.js (~493 KB, committed)
```

The bundle is served to the page at
`GET /paper-studio/api/asset?name=codemirror.js` (token-guarded, whitelisted
names only), so the plugin needs no DSH client-bundle changes and no
`node_modules` at runtime. The current textarea editor is untouched; the
CM6 editor will be added behind a “Use CodeMirror editor” setting and switched
on only once highlighting, completion, spellcheck and Vim match.

## 1.2.0 — colour themes, environment bands, cursor line, PDF inverse search

- **Colours:** commands default to purple (`#8b5cf6`), environment names amber,
  math green, comments/braces grey. Each environment family gets a translucent
  band: figure/table/math/theorem/code. Translucency (`rgba`, 12 %) keeps the
  bands readable in both light and dark themes.
- **Settings:** the palette button in the header opens *Highlight colors* —
  five token colours, five band colours with an enable switch, and the cursor
  line switch/colour. Changes preview live, *Reset* restores defaults, *Save*
  persists to `localStorage` (`dsh.paper-studio.syntax`); dismissing the dialog
  or pressing Escape restores the previous theme.
- **Cursor line:** the current line carries an `outline` box in the highlight
  layer; it tracks typing and caret moves and scrolls with the text.
- **PDF inverse search:** pages carry `-synctex=1` data. Double-clicking a point
  converts the image pixel to PDF points (`72 / pageDpi`, with `pageDpi` exposed
  by `info`) and calls `POST pdf/locate`:
  1. `synctex edit -o page:x:y:pdf` → exact `Input:` file/`Line:`;
  2. otherwise `pdftotext -bbox` finds the nearest word (≤ 140 pt, skipping
     punctuation and one-letter tokens) and `findInSources` returns the first
     matching line, preferring the open file;
  3. otherwise the panel shows "No matching source found at that point."
  The editor jumps to the line and selects it (SyncTeX's `Column` is `-1` for
  most LaTeX files, so word-level selection is not attempted).

Verified point mapping on the demo: `(300,300)` → `sections/introduction.tex:4`,
`(300,500)` → `sections/methods.tex:8`, `(300,120)` → `main.tex:17`; with the
`.synctex` removed the fallback returned `main.tex:19` via the word `short`.

## 1.1.2 — highlighting, one-pass edits, filename completion

- **Highlighting fix:** the textarea must render its own glyphs transparently for
  the coloured layer beneath to show. A bare `.ps-code` selector lost the
  cascade to the harness theme's own `textarea` rule, so the plain text was
  painted over the highlight. The transparency, caret colour and layer colour
  are now set on `.ps-root textarea.ps-code` / `.ps-root pre.ps-highlight` with
  `!important`. Environment names get their own colour too.
- **One-pass minimal edits:** the rerun trigger no longer matches the word
  `undefined`. A permanently undefined `\ref` used to force a second (and often
  a third) full pdflatex pass on every compile; now only a changed `.bbl` or the
  cross-reference messages trigger extra passes.
- **No rasterization in the compile path:** page 1 is no longer rendered eagerly;
  the panel's own `<img>` request rasterizes it. Compile returns as soon as the
  PDF exists, and the pane mode falls back to the PDF iframe when `pdftoppm` is
  missing.
- **Coalesced output:** compiler stdout/stderr is buffered and flushed to the
  terminal at most every 120 ms (or 24 KB), instead of one SSE event per chunk.
- **Filename completion:** a bare path/filename word now completes against the
  project's images, `.tex` and `.bib` files (basename prefix, or path substring
  when it contains `/`), so `figures/plot` completes inside a `figure`
  environment. Non-matching prose yields no popup.

Benchmark (synthetic 10-page, 30-section paper, this machine):

| Case | Time | Passes |
| --- | --- | --- |
| First full build | 1.27 s | 3 pdflatex + bibtex |
| Unchanged recompile | 5 ms | 0 (cached) |
| One section edited | 0.39 s | 1 (bibtex skipped) |
| Render page 1 / 5 / 10 | 79 / 154 / 51 ms | on demand |

## 1.1.1 — missing folders and the folder picker

- **Fixed:** with no usable project the pane grid still emitted its 5px splitter
  columns, collapsing the editor into a strip ("GUI all messed up") when the
  last opened project's folder had been deleted. Splitters and panes now share
  one visibility source, and a missing folder gets its own recovery view
  (Locate folder / Remove / Retry) instead of an error toast over a broken grid.
- **Folder picker:** `GET fs/list` lists subdirectories; the Add, New, Clone and
  Locate dialogs have a Browse button that opens it inline (Up, Home, Papers,
  and an "In Paper Studio" tag on already-registered folders).
- **Re-pointing:** `project/update` accepts `path`, so Locate can move an
  existing registration to a folder that still exists (main `.tex` re-detected,
  build and symbol caches invalidated).
- Missing projects are labelled `— missing` in the project dropdown.

## Verification (2026-11-04)

Automated, all passing:

```sh
cd ~/Documents/Papers/paper-studio
npm test        # 12 tests: compile pipeline, HTTP/SSE routes, client pure logic
```

- Cold compile of the demo: 1 page, zero errors, `plain.bst` resolved, citation
  `[1]`.
- Unchanged recompile: 0 ms, `cached: true`, 0 passes.
- Prose-only touch: 1 pdflatex pass, bibtex skipped (~2.1 s vs ~4.2 s before).
- New citation + new `.bib` entry: bibtex reran, second pass ran, PDF text shows
  `[2]` and the reference entry; no undefined-citation warning reported.
- HTTP: 403 without the page token; `symbols` returns `einstein1905`; SSE stream
  carries `start`/`command`/`out`/`finish` with `pdflatex` and `bibtex`; page 1
  is served as `image/png`, page 99 is 404.
- Headless React render of the panel, editor, terminal and problems dock passes
  (`PS_REACT_DIR=… node test/render.smoke.mjs`, run against a scratch React 18
  install).

**Not verified:** the rendered panel in a real browser (this environment has no
browser control). The first visual check must confirm: syntax colours and caret
alignment, completion popup placement near the caret, drag handles, terminal
scrolling, and light/dark contrast. Report anything off.

## Moving it to another session or machine

```sh
git clone git@github.com:alberto-carta/dsh-paper-studio.git ~/somewhere/dsh-paper-studio
# then, in that Harness:
#   Plugins page → Add → /home/<user>/somewhere/paper-studio
#   or plugin_manager install_bundle with that absolute path
# restart the Harness process
```

Nothing in a paper folder, the registry, or `~/.dsh` points back at the plugin
source path, so moving the repository is safe; only the profile dependency must
be reinstalled. Uninstalling the bundle never deletes papers or the registry.

## Known limits

- One compile runs at a time per project (concurrent runs would share a build
  directory); the HTTP and agent paths serialize through the same queue.
- Completion data is cached for 5 s per project and invalidated on save.
- The terminal keeps the last ~3000 lines; the full log is in the Log tab.
- The highlighter stops coloured output above 300 KB per file (plain text after
  that) to keep typing responsive.
