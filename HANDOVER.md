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
