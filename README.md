# Paper Studio

A persistent Overleaf-style LaTeX workspace for the DeepSeek Harness Web GUI.

- **Sidebar panel icon → full-window workspace** with a file explorer, a tabbed
  editor, and the compiled PDF on the right.
- **Project registry** in `~/.dsh/paper-studio/projects.json` (mode 600), so
  projects survive sessions, restarts, and profile upgrades.
- **Compile** with `pdflatex` + `bibtex`, streamed live to a **terminal** that
  shows each command and its output while it runs.
- **Problems list** with one click from the header: errors and warnings
  (LaTeX/package warnings, over/underfull boxes, bibtex warnings), each row
  jumping to its source line.
- **LaTeX syntax highlighting** in the editor and **completion** for commands,
  environments, packages, `\ref` labels, `\cite` keys and file paths.
- **Resizable panes**: drag the dividers between explorer, editor, PDF and the
  bottom dock; widths and heights persist.
- **Incremental builds**: unchanged sources reuse the last PDF instantly, a
  prose-only edit skips bibtex and the second pass, and pages render on demand,
  so a compile no longer rasterizes the whole document.
- **Agent tool** `paper_studio` (`list`, `create`, `add`, `compile`) so the
  assistant can scaffold and compile papers while you watch.
- **Overleaf git bridge**: clone `https://www.overleaf.com/project/<id>` (or
  the `git.overleaf.com` URL) with a personal token, then pull/push from the
  project settings. The token is stored in the registry file only and is passed
  to git through a temporary `GIT_ASKPASS` helper, never written to
  `.git/config`.

## Shortcuts

| Keys | Action |
| --- | --- |
| `Ctrl/⌘ + Enter` | Compile |
| `Ctrl/⌘ + S` | Save now (autosave also runs ~0.85 s after typing) |
| `Ctrl/⌘ + Space` | Open completion at the caret |
| `Ctrl/⌘ + \`` | Toggle the terminal dock |
| `↑` / `↓`, `Enter`/`Tab`, `Esc` | Navigate, accept, dismiss completion |

## Requirements

`pdflatex`, `pdfinfo`, `pdftoppm` (TeX Live / MacTeX + poppler), and `git` for
sync. The panel reports missing tooling.

## Compile layout

Build artifacts go to `<project>/.paper-studio/build/`; the explorer hides that
folder. Generated projects include a `.gitignore` for it. Page images are
written to `build/pages/` on demand and belong to exactly one PDF revision.

## Install and move

The plugin is installed in the **web profile** as a `link:` dependency, so it
appears in every session regardless of the workspace:

```sh
# from this directory
dsh plugin install /home/acarta/Documents/Papers/paper-studio   # or Plugins page → Add
```

The profile registers `@local/paper-studio` in
`~/.dsh/profiles/web/package.json` (dependency + `dsh.profile.bundles`). Do not
hand-edit those files; reinstall instead.

To move the plugin (another machine or folder): copy/clone this repository,
install from its new absolute path, and **restart the Harness** (the host half
of a plugin is cached for the life of the Node process). A page reload alone
picks up `client.js` changes; host changes need the restart. The registry and
the papers themselves are independent of the plugin path and are never touched
by a reinstall.

## Tests

```sh
npm test          # host pipeline, HTTP/SSE routes and the client's pure logic
npm run test:render   # optional headless React render; needs PS_REACT_DIR
```

`test/render.smoke.mjs` mounts the panel, editor and both dock tabs with real
React and fails on markup or hook errors. It is kept out of `npm test` because
the plugin does not depend on React — the Harness page provides it.

## Files

| Path | Role |
| --- | --- |
| `index.js` | Host half: registry, file operations, compile pipeline, jobs/SSE, symbols, git sync, HTTP API, agent tool |
| `client.js` | Browser half: `sidebar.panellist` icon + `main` panel, editor, dock |
| `cordis.patch.yml` | Loader row inserted by the bundle |
| `locale/en.json` | Plugin Manager title and description |
| `icon.svg` | Original panel artwork |
| `test/` | Offline tests for the pipeline, routes and client logic |
