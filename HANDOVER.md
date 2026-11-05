# Paper Studio — handover

Prepared 2026-11-04, for Paper Studio 1.1.0.

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
git clone <remote> ~/somewhere/paper-studio
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
