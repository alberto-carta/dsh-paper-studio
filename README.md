# Paper Studio

A persistent, Overleaf-style LaTeX workspace for the DeepSeek Harness Web GUI:
file explorer, tabbed editor, live PDF, git, and an in-editor LLM chat.

## Install

Repository: <https://github.com/alberto-carta/dsh-paper-studio>

```sh
dsh plugin install ~/Documents/Papers/paper-studio   # or Plugins page → Add
```

The web profile links the plugin, so it is available in every session. Restart the
Harness after host changes; a page reload is enough for `client.js`. The registry
and papers are independent of the plugin path.

## Quick start

1. Open the Paper Studio icon in the sidebar.
2. **Add folder**, **New paper**, or **Clone** (Overleaf or any git remote).
3. Edit and compile (`Ctrl/⌘+Enter`); the PDF opens on the right.
4. Save manually (`Ctrl/⌘+S`) or enable autosave in Settings.

## Features

**Workspace** — resizable explorer/editor/PDF/dock, tabs, folder picker,
missing-folder recovery, per-project settings.

**Editor** — LaTeX highlighting with customizable colours, block bands and a
cursor-line box, bracket matching, soft wrap, completion (commands, environments,
packages, `\ref`, `\cite`, paths), aspell spellcheck, context menu, word-level
undo. The gutter marks Git-HEAD changes (green added, blue modified, red
deleted; recomputed on save, Settings → Appearance → Diff gutter). Vim mode (normal/insert/visual,
text objects, `:w`, `:%s///g`) is scoped to the editor.

**Compile** — `pdflatex` + `bibtex` with incremental builds, a streamed terminal,
one-click Problems with source jumps, full recompile, cache in
`.paper-studio/build/`.

**PDF** — select text, double-click a word to jump to the source via SyncTeX
(text fallback), two-column aware.

**Git** — branch/upstream, ahead/behind, diffs, fetch/pull/push, branch
switch/create, guarded reset; Overleaf git bridge with a token kept out of
`.git/config`; commits only with explicit approval.

## Chat and agents

Right-click → **Discuss with agent…**. A **Start new chat** row (agent dropdown)
sits above **Old conversations** across all agents; chats stream in the right pane
(**PDF | Chat**).

- Agents are markdown files: global `~/.dsh/paper-studio/agents/<id>.md`, project
  `<project>/agents/<id>.md`. Five defaults ship and seed on first start; import or
  export JSON from Settings → Agents; rename in place.
- `_common.md` is prepended to every agent. The selected passage, current file,
  main-file outline and bibliography index are attached automatically.
- Agents can read other project files (`read`) and search/fetch the web through the
  Harness web service; results are cited and treated as untrusted.
- Edits arrive as `diff` blocks: green/red review in the editor with per-hunk
  Keep/Discard, plus Keep all/Discard all in chat; undoable.
- Questions can be a `choices` block; the chat shows the options and an Other field.
- Markdown and LaTeX math render in chat; reasoning is collapsible
  (Off / Last step / Full).
- **Prompt snapshot:** each conversation freezes its full system prompt, so editing
  an agent affects only new chats. ℹ shows it.
- **Memory:** per conversation only, never summarized, editable with 🧠.
- Long chats compact older turns into a stored summary
  (`PAPER_STUDIO_CHAT_BUDGET`, default 1M chars, about 250k tokens).

## Chat controls

- **🧠 brain menu** bundles per-conversation memory with **Thinking effort**
  (model default / off / low / high / max); the choice is stored on the chat and
  sent as the model's reasoning effort.

## Shortcuts

| Keys | Action |
| --- | --- |
| `Ctrl/⌘ + Enter` | Compile |
| `Ctrl/⌘ + S` | Save (and compile, by default) |
| `Ctrl/⌘ + Space` | Completion |
| `Ctrl/⌘ + \`` | Terminal |
| `↑`/`↓`, `Enter`/`Tab`, `Esc` | Completion navigation |

## Requirements

`pdflatex`, `bibtex`, `pdfinfo`, `pdftoppm` (TeX Live/MacTeX + poppler), and `git`
for sync. Missing tools are reported in the panel.

## Data

| Path | Contents |
| --- | --- |
| `~/.dsh/paper-studio/projects.json` | project registry (mode 600) |
| `~/.dsh/paper-studio/agents/` | global agents and `_common.md` |
| `~/.dsh/paper-studio/chats/` | per-project/agent conversations |
| `<project>/agents/` | project-local agents |
| `<project>/.paper-studio/build/` | compile artifacts (gitignored) |

## Tests

```sh
npm test               # host + HTTP/SSE + client logic
npm run test:render    # React render smoke (needs PS_REACT_DIR)
```

## Internals

`index.js` is the host half, `client.js` the browser half; `cordis.patch.yml`
registers the panel.
