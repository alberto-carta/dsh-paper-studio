# Paper Studio

A persistent Overleaf-style LaTeX workspace for the DeepSeek Harness Web GUI.

- **Sidebar panel icon → full-window workspace** with a file explorer, a tabbed
  editor, and the compiled PDF on the right.
- **Project registry** in `~/.dsh/paper-studio/projects.json` (mode 600), so
  projects survive sessions, restarts, and profile upgrades.
- **Compile on manual save** is on by default: the Save button, Ctrl/Cmd+S and
  Vim `:w` save and then compile; autosaves compile only with the separate
  auto-compile toggle. Both live in Settings → Editor → Editing.
- **Manual save** next to the compile button (disabled when everything is saved),
  an **autosave** toggle and delay in Settings (default 1 s), and a split compile
  button: click the centre for an incremental build, or the caret → **Full
  recompile** to ignore the cache.
- **Compile** with `pdflatex` + `bibtex`, streamed live to a **terminal** that
  shows each command and its output while it runs.
- **Problems list** with one click from the header: errors and warnings
  (LaTeX/package warnings, over/underfull boxes, bibtex warnings), each row
  jumping to its source line.
- **Bracket matching**: put the caret on `{`, `[` or `(` (or just after it) and
  the pair is boxed, including nested pairs; escaped `\{` is ignored and an
  unmatched bracket is marked in red.
- **LaTeX syntax highlighting** with per-token colours (purple commands,
  environment names, math, comments, braces), **translucent background bands**
  for figure / equation / table / theorem / code blocks, and a **box around the
  cursor line**. A palette button opens *Highlight colors* with live preview,
  a reset, and per-preference persistence.
- **Completion** for commands, environments, packages, `\ref` labels,
  `\cite` keys, and file paths — including bare filenames such as
  `figures/plot` typed inside a figure environment.
- **PDF → source jump**: double-click a word in the rendered page and the editor
  opens the matching file/line via SyncTeX, falling back to nearest-word text
  matching when SyncTeX has no position (or no `.synctex` exists).
- **Git panel** in the explorer: branch and upstream, ahead/behind, changed files,
  diff against the upstream, fetch/pull/push, branch switch/create, the SSH key in
  use, and a guarded *Reset to origin* (fetch → reset --hard → clean, keeping
  `.paper-studio`).
- **Editor**: soft-wrap toggle (line numbers stay aligned), Vim mode
  (normal/insert/visual, motions, operators, text objects such as `ciw`, and
  `:w`/`:%s///g`/`:<n>` — scoped to the editor textarea only, never to dialogs,
  rename fields or the terminal), bracket matching, aspell spellcheck (US/UK)
  with wavy underlines, Cut/Copy/Paste + Bold/Italic/Underline context menu,
  clipboard shortcuts in insert mode only (native Ctrl/Cmd+C/V/X plus
  Ctrl+Insert / Shift+Insert / Shift+Delete and Ctrl+Shift+C/X/V where the
  browser does not reserve them; normal/visual mode refuse them, and with
  diagnostics on they warn “vim bindings, ctrl-v not allowed in normal mode”),
  configurable shortcuts,
  word-level undo, and a save button.
- **Completion** now indexes project macros (`\newcommand`, `\def`, …) and custom
  environments, inserts required argument braces, and expands whole blocks for
  figure/table/itemize/equation/align/theorem/…
- **PDF text layer**: drag to select text like a real PDF, double-click a word,
  then *Go to editor*; two-column pages are read column by column.
- **Diff review window** can be dragged by its header and resized from the
  bottom-right corner (size remembered); **Delete chat** sits in the chat header.
- **Agent questions:** agents can present 2–4 options in a fenced `choices` block
  (`Label — description`); the chat shows radio options plus an **Other…** field and
  a **Choose** button. The choice is sent back as a message and the agent then
  proposes the diff — Keep/Discard only appears after you decide.
- **Chat suggestions:** when an agent proposes an edit as a fenced `diff` block, a
  floating card opens **in the editor over the changed lines** (tinted red), showing
  green/red lines with **Keep / Discard per hunk**; the chat card offers **Keep all /
  Discard all**. Keeping applies through the normal edit path, so it is undoable and
  autosaved.
  Right-click → **Add selection to current chat** appends context to the open chat.
- **Chat**: right-click → **Discuss with agent…** shows a **Start new chat** row
  (agent dropdown + button) and, directly below it, **Old conversations** across
  all agents (agent name in bold, title, count, time, red delete bin). The selection is
  attached as context and the right pane switches to **PDF | Chat**.
  (grouped general/local) and chat in the right pane’s **PDF | Chat** tabs. Answers
  stream, the selection is attached as context, and chats are saved per project +
  agent with a history dropdown. The built-in assistant is always available.
- **Agents**: Settings → Agents edits markdown-defined agents (YAML frontmatter
  with `name`, `description`, optional `model`, `readFiles`, `web` + prompt body),
  stored globally or per project (`.paper-studio/agents/`). They are the basis for
  the in-editor chat.
- **Settings**: one gear dialog with Editor (Appearance / Editing / Spelling /
  Shortcuts) and Project tabs, plus an optional diagnostics readout.
- **Resizable panes**: drag the dividers between explorer, editor, PDF and the
  bottom dock; widths and heights persist.
- **Folder picker**: Add folder, New paper, Clone and Locate offer an inline
  directory browser (Up / Home / Papers, "In Paper Studio" markers) instead of
  typing an absolute path by hand.
- **Missing-folder recovery**: if a registered project's folder disappears, the
  panel shows a dedicated view with Locate folder, Remove from Paper Studio and
  Retry, and the project is marked `missing` in the dropdown — no broken layout.
- **Incremental builds**: unchanged sources reuse the last PDF instantly, a
  prose-only edit is a single pdflatex pass with bibtex skipped, pages render on
  demand, and compiler output is coalesced before it reaches the terminal. On a
  10-page, 30-section benchmark: first build 1.3 s, unchanged 5 ms, one-section
  edit 0.4 s.
- **Agent tool** `paper_studio` (`list`, `create`, `add`, `compile`) so the
  assistant can scaffold and compile papers while you watch.
- **Overleaf git bridge**: clone `https://www.overleaf.com/project/<id>` (or
  the `git.overleaf.com` URL) with a personal token, then pull/push from the
  project settings. The token is stored in the registry file only and is passed
  to git through a temporary `GIT_ASKPASS` helper, never written to
  `.git/config`.

## Shared prompt and look-around

- **Common prompt:** `~/.dsh/paper-studio/agents/_common.md` is prepended to every
  agent's own prompt. Edit it in Settings → Agents → **Common prompt (all agents)**.
  Files starting with `_` are not listed as agents.
- **Context:** each chat request includes the selected passage, the current file
  (up to 12k chars) and the main file's structure (`\input`, `\include`,
  `\section` lines).
- **On-demand reads:** the agent can reply with a fenced `read` block containing
  one relative path; the host resolves it inside the project (no traversal,
  capped at 10k chars), appends the contents and streams another round (max 2
  files per turn, 3 rounds). The chat shows `📄 path` instead of dumping the file.
  `readFiles: deny` in the agent frontmatter disables this; `ask` currently
  allows reads without a blocking prompt.

- **Math:** chat messages render LaTeX math with KaTeX in MathML mode (no font/CSS
  assets): inline `$...$` / `\(...\)` and display `$$...$$` / `\[...\]`. The
  renderer is loaded lazily from `vendor/katex.js` through the asset route.

- **Thinking:** model reasoning is streamed separately and stored on each
  assistant turn. Chat shows a collapsible block — Settings → Editor → Editing →
  **Model thinking** chooses Off / Last step (default, shows the tail) / Full.
- **Budgeting:** chat requests keep the last 8 messages and, when the estimated
  request exceeds `PAPER_STUDIO_CHAT_BUDGET` (default 60k chars), older turns are
  summarized into `chat.summary` with a separate model call (`summaryCount` marks
  the compacted prefix). The summary is sent as leading context; the full
  transcript stays on disk. A toast reports when it happens.
- **Web:** agents can search or fetch through the Harness web service (`ctx.web`)
  with a fenced `web` block — `search: <query>` or `fetch: https://...` — up to two
  per turn. Results are framed as untrusted evidence with URLs to cite; `web: deny`
  in the agent frontmatter disables it. A missing provider surfaces as an error
  message in the transcript.
- **Literature:** the main file's `\bibliography{...}` / `\addbibresource{...}`
  declarations are resolved to `.bib` files; every chat request carries a compact
  index (key, year, title; first 80 entries) and the file paths, so agents know
  the paper's literature. Full `.bib` files can be fetched with a `read` block.

- - **Memory:** memory belongs to **one conversation**, not to the agent. It is stored
  in that chat's JSON (`memory`), starts empty for every new chat, and is never
  inherited across chats. The agent adds a note when you ask it to remember
  something or when it learns a durable preference, decision, definition or style
  rule, by replying with a fenced `memory` block. Memory is injected as a separate
  leading user message, is never summarized, and never rewrites the frozen system
  prompt. The 🧠 button in the chat header opens it for editing.

**Prompt snapshots:** the first message of a conversation stores the complete
  system prompt it received (common prompt + agent prompt + protocol + attached
  context). Later turns reuse that snapshot, so editing, renaming or deleting the
  agent affects only new conversations. An ℹ icon beside the trash bin (and in the
  chat header) shows the frozen prompt.

On startup the host folds a legacy `assistant.md` (Paper assistant) into
`research-partner.md` once — both prompts are preserved under a `## Merged from
Paper assistant` heading, `assistant.md` is backed up in `agents/.backup/`, and
its chats move to Research partner. There is no merge button.

## Agent files

Agents are plain markdown and live outside the paper repositories:

| Scope | Path |
| --- | --- |
| Global (all papers) | `~/.dsh/paper-studio/agents/<id>.md` |
| Local project only | `<project>/agents/<id>.md` (travels with the paper; legacy `.paper-studio/agents/` is still read) |

Each file starts with YAML frontmatter and then the prompt body:

```md
---
name: Condensed matter proofreader
description: Reviews condensed-matter prose
model:            # optional provider/model override
readFiles: ask    # ask | allow
web: ask          # ask | allow
---

You are a careful proofreader...
```

The plugin ships five default agents in its own `agents/` directory (Research partner, Explainer, Scientific editor, Referee, LaTeX assistant) plus `_common.md`. Research partner absorbs literature search/BibTeX; Scientific editor absorbs proofreading of the selected paragraphs. `agents-optional/response-to-reviewers.md` is not seeded but can be copied or imported., seeded into the global folder on start without overwriting anything. Settings → Agents shows both paths, lists both scopes, and can **Export/Import** agents as a JSON file. A new agent can start
from the template or be **merged from one or more existing agents** (their bodies
are appended under `## From <name>` before your own prompt).

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

Repository: `git@github.com:alberto-carta/dsh-paper-studio.git`
(https://github.com/alberto-carta/dsh-paper-studio).

The plugin is installed in the **web profile** as a `link:` dependency, so it
appears in every session regardless of the workspace:

```sh
# from this directory
dsh plugin install ~/Documents/Papers/paper-studio   # or Plugins page → Add
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
