# Paper Studio — handover and migration checklist

Prepared 2026-11-04. This is the operator guide for the Paper Studio plugin and
the checklist for moving to the papers workspace.

## What it is

An Overleaf-style LaTeX workspace inside the DeepSeek Harness Web GUI:

- a **Paper Studio** icon in the sidebar's global panel list;
- a full-window panel with a file explorer, a tabbed source editor, and the
  compiled PDF on the right;
- a **profile-wide project registry**, so papers stay registered across
  sessions, workspaces, and restarts;
- `pdflatex` + `bibtex` compilation with clickable errors, and PDF pages
  rendered to PNG for the preview;
- an agent tool, `paper_studio`, with `list`, `create`, `add`, `compile`;
- Overleaf git-bridge clone/pull/push.

## Where everything lives

| What | Path |
| --- | --- |
| Plugin source (authoritative) | `~/.local/share/dsh-plugins/paper-studio` |
| Profile dependency | `link:` entry in `~/.dsh/profiles/web/package.json` |
| Profile selection | `@local/paper-studio` in `~/.dsh/profiles/web/package.json` → `dsh.profile.bundles` |
| Project registry | `~/.dsh/paper-studio/projects.json` (mode 600) |
| Overleaf tokens | inside the registry, per project; never in `.git/config` |
| Papers | `~/Documents/Papers/<slug>` (default for new projects) |
| Demo paper | `~/Documents/Papers/paper-studio-demo` |
| Build output | `<project>/.paper-studio/build/` (hidden, gitignored) |
| Agent tool | `paper_studio` |

The plugin is installed in the **web profile**, not in a workspace: it appears
in every session regardless of the session's working directory.

## Restart once (required after this migration)

The GUI currently runs as:

```sh
npm exec @deepseek-ai/dsh web
```

Stop it with `Ctrl-C` in that terminal and run the same command again. Then
reopen the session with workspace `~/Documents/Papers` (or a single paper
folder) and reload the page.

Why both steps:

- the Host half of a plugin is cached for the life of the Node process, so the
  two source fixes below activate only after a restart;
- the panel's API token is injected into the page HTML when the page is loaded,
  so a page loaded before installation has no token and the panel's requests
  would be rejected with 403.

### Post-restart checklist

1. The sidebar shows the Paper Studio icon between **Plugins** and **Schedules**.
2. The project dropdown lists **Paper Studio Demo**.
3. Opening the demo shows page 1 in the PDF pane (restored from disk, even
   before recompiling).
4. **Compile** reports `Compiled 1 pages in …` and the citation renders as
   `[1]`, not `??`.
5. Asking the agent to compile returns JSON (not `invalid output`).

## First steps

- **New paper**: header → New paper. Creates `~/Documents/Papers/<slug>` from a
  starter article (`main.tex`, `sections/`, `references.bib`, `.gitignore`) and
  opens it.
- **Add folder**: header → Add folder. Registers any existing LaTeX folder and
  detects its main `.tex` by `\documentclass`.
- **Edit**: click a file in the explorer. Autosave runs ~0.85 s after typing;
  `Ctrl/⌘+S` saves immediately. Tabs with unsaved changes show a dot.
- **Compile**: `Ctrl/⌘+Enter` or the header button. Errors appear in the bottom
  drawer; clicking one opens the file at that line.
- **PDF**: page images with zoom (75–200 %), or open the PDF in a browser tab.
- **Removed from panel ≠ deleted**: project settings → Remove from Paper Studio
  leaves all files on disk.

## Overleaf

Overleaf exposes a Git bridge with a personal token (Overleaf → Account
Settings → Git integration).

1. Header → **Clone from Overleaf**.
2. Paste `https://www.overleaf.com/project/<id>` or
   `https://git.overleaf.com/<id>`, paste the token, confirm the folder.
3. The project is cloned, registered, and opened.
4. Project settings → **Git sync**: Status / Pull / Push / Initialize git.

The token is stored only in the 0600 registry file and passed to git through a
temporary `GIT_ASKPASS` helper, so it is never written into `.git/config`.
Pull before editing locally and push afterwards; the Overleaf web editor and
git do not merge live.

## What was verified

- Bundle install applied live (`application: applied`); the bundle is selected
  in the profile and the dependency is a link to the source directory.
- Live slot registrations: `sidebar.panellist` occupant `paper-studio`, and
  `main` key `paper-studio`, both active.
- HTTP route registered: `/paper-studio/api/info` answers `403` without the
  browser token, as designed.
- Full compile pipeline on the demo paper: `pdflatex` → `bibtex` →
  `pdflatex` ×2, 1-page A4 PDF, `main.bbl` 202 bytes, zero undefined citations,
  `pages/page-1.png` rendered.
- Agent tool `paper_studio` `list` returns the project and toolchain versions.

**Not verified:** the rendered panel itself (layout, light/dark, PDF image
display). This environment has no browser control, so the first visual check
must be done by opening the panel. Report anything off and it can be fixed.

## Fixes present in the source, pending the restart

1. **bibtex search path** — the pipeline used to override `BSTINPUTS`, which hid
   the system `plain.bst`; citations came out as `??`. The override was removed
   and only `BIBINPUTS` is extended, keeping kpathsea defaults.
2. **Agent tool result shape** — `compile` returned an `undefined` field, which
   the tool validator rejects (`invalid output`). The compile itself succeeded;
   the result is now valid JSON.
3. **Client autosave timers** — debounced saves from the previous project are
   now cleared when switching projects. (A page reload loads this fix.)

Until the restart, panel and tool compiles still use the old bibtex path, so
expect `??` citations; recompile after the restart to fix them.

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Icon missing after install | Refresh the page. If still missing, check the profile link below. |
| Panel loads but every action fails | Page was loaded before installation (no token). Reload the page. |
| `pdflatex was not found` | Install TeX Live / MacTeX; the panel reports which tools it can see. |
| `plain.bst` not found | Ensure `BSTINPUTS` is not set in the shell that launches the Harness (the plugin no longer overrides it). |
| Plugin fails to load after moving folders | Reinstall from the new absolute path (Plugins page or `plugin_manager install_bundle`), then restart. |
| `pnpm` missing during install | `corepack enable pnpm` (already done on this machine; pnpm 12.16.1). |
| Build looks stale | Builds go to `<project>/.paper-studio/build`; delete it and compile again. |

Check the profile registration with:

```sh
readlink -f ~/.dsh/profiles/web/node_modules/@local/paper-studio
```

It must print the plugin source directory.

## Migration notes

- The source was moved out of the calculation workspace so that repository can
  be archived safely. Nothing in the papers tree points at that repository.
- The profile dependency is an absolute `link:`; moving the source again means
  reinstalling from the new path and restarting.
- Do not hand-edit `~/.dsh/profiles/web/package.json` or `cordis.patch.yml`;
  use the Plugins page / `plugin_manager`.
- Uninstalling the bundle does not touch the registry or any paper.

## Suggested next workspace

`~/Documents/Papers` — the agent can then read and edit every paper's `.tex`
sources directly with its own tools, while the panel previews them. A single
paper folder also works if you prefer a narrower sandbox.
