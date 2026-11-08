# Agent context, compilation and literature — design

## Principles

- The agent stays confined: read, search and propose. It cannot write files directly,
  run arbitrary commands, or compile without permission.
- Context is explicit and inspectable. Nothing silently enters the prompt.
- Expensive or visible actions (compile, network literature calls) obey per-chat
  permission and are never retried automatically merely because an edit happened.
- Reuse existing code: `chatContextMessage`, `chatRequestMessages`, `summarizeChat`,
  `readRequests`, `webRequests`, `projectRead`, the agent job stream, and the modal /
  title-detail card patterns.

## 1. Compilation gate

Per-chat setting `compile`: `never` (default), `ask`, `allow`.

- `never`: the agent is told it cannot compile. It may ask the user to run Compile.
- `ask`: the agent may emit a fenced `compile` block with a short reason. The host
  does not compile; it emits a `compile-request` event with the reason. The chat shows
  an approval card. Approval runs the normal compile path and appends a structured
  compile result to the chat, then continues the agent loop if it is still open.
- `allow`: the agent may compile automatically, at most once per turn. It still
  receives structured errors/warnings, not raw logs.

No compile is triggered by save, patch application, or Keep/Discard.

Data: `chat.compilePermission`, persisted with the chat. UI lives with Memory &
thinking in the brain dialog, or as a compact permissions row.

## 2. Context management

Context layers, displayed in an inspector:

1. system/agent prompt + common prompt
2. per-chat memory
3. conversation summary
4. selection context
5. pinned files/sections
6. literature results
7. recent messages

Meter: approximate characters and tokens, with a configurable per-chat budget.
Warn at 75%, critical at 90%. Auto-summarise only when over budget, and show the
new summary in the inspector.

Pins:
- `chat.pins: [{ path, startLine, endLine }]`.
- Added from the editor "Pin to chat", explorer context menu, or `@` picker.
- The context builder includes bounded excerpts and marks them as pinned.
- Pins are removed from the inspector; no implicit pinning.

`@` mentions in the chat composer:
- files, labels, citations; selecting one adds it to the message context/pins.
- Completion is local and capped.

Inspector:
- button in the chat bar opens a modal listing each layer with size and a remove
  action where meaningful.
- Shows what will actually be sent; system prompt is read-only but inspectable.

## 3. Literature APIs and cards

Providers, in order: Crossref, OpenAlex, arXiv; Semantic Scholar optional.
Cache by query/DOI; obey rate limits; respect the chat's web/literature permission.

Agent block:

```text
literature
search: hole-doped LaH10 superconductivity
```

or `doi: 10.1103/PhysRevLett...`.

Results are added to the chat as **literature cards**:

```
[card]
Title
Authors · Year · Journal/Venue
DOI / arXiv · Open link
Abstract (3 lines, expandable)
Suggested BibTeX key            [Copy BibTeX] [Use in .bib]
```

- Cards are visually distinct from prose, with title, authors, year, venue and a
  clickable page/DOI/arXiv link.
- "Use in .bib" proposes an edit to the bibliography file; it never writes directly.
- Cards go into context as compact metadata by default; the abstract is included only
  when the user asks for it or the agent requests details.

Data:
- `chat.literature: [{ key, title, authors, year, venue, doi, url, abstract, bibtex }]`.
- The agent's context gets compact lines; cards are rendered from the structured data.

## Order

1. Compilation gate (small, immediate safety).
2. Context meter + inspector + pins.
3. `@` mentions.
4. Literature providers + cards + `.bib` proposal.

## Non-goals

- No arbitrary shell or file create/delete.
- No compile-on-save for the agent.
- No silent context injection.
