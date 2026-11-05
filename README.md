# Paper Studio

A persistent Overleaf-style LaTeX workspace for the DeepSeek Harness Web GUI.

- **Sidebar panel icon → full-window workspace** with a file explorer, a tabbed
  editor, and the compiled PDF on the right.
- **Project registry** in `~/.dsh/paper-studio/projects.json` (mode 600), so
  projects survive sessions, restarts, and profile upgrades.
- **Compile** with `pdflatex` + `bibtex`; PDF pages are rendered with
  `pdftoppm` and served to the panel. Errors are clickable and jump to the
  `.tex` line.
- **Agent tool** `paper_studio` (`list`, `create`, `add`, `compile`) so the
  assistant can scaffold and compile papers while you watch.
- **Overleaf git bridge**: clone `https://www.overleaf.com/project/<id>` (or
  the `git.overleaf.com` URL) with a personal token, then pull/push from the
  project settings. The token is stored in the registry file only and is passed
  to git through a temporary `GIT_ASKPASS` helper, never written to
  `.git/config`.

## Requirements

`pdflatex`, `pdfinfo`, `pdftoppm` (TeX Live / MacTeX + poppler), and `git` for
sync. The panel reports missing tooling.

## Compile layout

Build artifacts go to `<project>/.paper-studio/build/`; the explorer hides that
folder. Generated projects include a `.gitignore` for it.

## Files

| Path | Role |
| --- | --- |
| `index.js` | Host half: registry, file operations, compile pipeline, git sync, HTTP API, agent tool |
| `client.js` | Browser half: `sidebar.panellist` icon + `main` panel |
| `cordis.patch.yml` | Loader row inserted by the bundle |
| `locale/en.json` | Plugin Manager title and description |
| `icon.svg` | Original panel artwork |
