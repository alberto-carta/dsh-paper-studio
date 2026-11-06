window.__ModuleLoader__.load({
  id: "@local/paper-studio",
  factory(require) {
    const React = require("react");
let flushSync = null;
try { flushSync = require("react-dom").flushSync || null; } catch { flushSync = null; }
    const h = React.createElement;
    const { useCallback, useEffect, useMemo, useRef, useState } = React;
    const useLayoutEffectSafe = React.useLayoutEffect || useEffect;

    const PANEL_ID = "paper-studio";
    /** Shown in Settings so the loaded client can be matched to the source file. */
    const CLIENT_BUILD = "2026-11-06T07:10";
    const NS = "paperStudio";
    const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

    // -- locale ------------------------------------------------------------
    const DICT = {
      en: {
        brand: "Paper Studio",
        project: "Project",
        projects: "Projects",
        newPaper: "New paper",
        addFolder: "Add folder",
        cloneOverleaf: "Clone from Overleaf",
        compile: "Compile",
        compiling: "Compiling…",
        compileOk: "Compiled {pages} pages in {time}",
        compileOkShort: "Compiled {pages} pages",
        compileFailed: "Compilation failed",
        compileFailedWith: "{count} problem(s)",
        files: "Files",
        pdf: "PDF",
        editor: "Editor",
        noProjectTitle: "No paper yet",
        noProjectBody: "Create a LaTeX project, register an existing folder, or clone an Overleaf repository. Projects stay registered across sessions.",
        noFileTitle: "No file open",
        noFileBody: "Pick a file in the explorer, or press Compile to build the current paper.",
        noPdfTitle: "No PDF yet",
        noPdfBody: "Press Compile (Ctrl/⌘ + Enter) to build the paper.",
        save: "Save",
        saved: "Saved",
        savedAt: "Saved {time}",
        saving: "Saving…",
        unsaved: "Unsaved",
        refresh: "Refresh",
        newFile: "New file",
        newFolder: "New folder",
        delete: "Delete",
        rename: "Rename",
        close: "Close",
        openInNewTab: "Open PDF in a new tab",
        problems: "Problems",
        log: "Log",
        noProblems: "No problems reported.",
        chooseProject: "Choose a project",
        settings: "Settings",
        settingsTitle: "Settings",
        editorSettings: "Editor",
        appearance: "Appearance",
        diffGutter: "Diff gutter",
        diffOff: "Off",
        diffGit: "Git HEAD",
        editing: "Editing",
        wrapLines: "Soft-wrap long lines",
        wrapShort: "Wrap",
        diagnostics: "Show diagnostics",
        output: "Output",
        vim: "Vim",
        vimBindings: "Vim key bindings (normal/insert, :commands)",
        projectSettings: "Project",
        removeProject: "Remove from Paper Studio",
        removeTitle: "Remove this project?",
        removeBody: "The folder and its files stay on disk. Only the Paper Studio registration is removed.",
        title: "Title",
        path: "Folder",
        pathHint: "Absolute path; ~ is expanded.",
        template: "Template",
        starter: "Starter article",
        emptyTemplate: "Empty folder",
        name: "Name",
        nameOptional: "Name (optional)",
        mainFile: "Main file",
        mainFileHint: "Relative to the project root, for example main.tex.",
        remote: "Git remote",
        remoteHint: "Overleaf project URL or git URL. www.overleaf.com/project/… is converted to its git bridge.",
        token: "Access token",
        tokenSaved: "A token is saved — leave blank to keep it.",
        tokenHint: "Overleaf: Account Settings → Git integration. Stored only in ~/.dsh/paper-studio/projects.json (mode 600).",
        clone: "Clone",
        add: "Add",
        create: "Create",
        cancel: "Cancel",
        apply: "Save",
        sync: "Git sync",
        pull: "Pull",
        push: "Push",
        status: "Status",
        initializeGit: "Initialize git",
        output: "Output",
        gitUnavailable: "git is not available on PATH",
        conflictTitle: "File changed on disk",
        conflictBody: "Another process changed this file after you opened it. Reload the disk copy or overwrite it with your version.",
        reloadDisk: "Reload",
        keepMine: "Overwrite",
        zoom: "Zoom",
        fitWidth: "Fit width",
        lineCol: "Ln {line}, Col {col}",
        lines: "{count} lines",
        autoCompile: "Auto-compile on save",
        compileOnSave: "Compile on manual save",
        agentsTab: "Agents",
        agentsGeneral: "Agents (general)",
        agentsProject: "Agents (local project)",
        chatTab: "Chat",
        discussWithAgent: "Discuss with agent",
        discussHint: "Pick an agent; the current selection becomes the chat context.",
        back: "Back",
        noPreviousChats: "No previous chats with this agent.",
        chatPickHint: "Start a new chat with this agent, or continue one below.",
        deleteChat: "Delete chat",
        chatDeleteConfirm: "Delete this chat and its transcript?",
        chatDeleted: "Chat deleted",
        chatSummarized: "Older messages summarized to keep the context within budget",
        recentChats: "Recent chats",
        noChats: "No old conversations yet.",
        newChatWith: "New chat",
        startNewChat: "Start new chat",
        oldChats: "Old conversations",
        agentPaths: "Global agents: ~/.dsh/paper-studio/agents/ · Project agents: <project>/agents/",
        exportAgents: "Export agents",
        importAgents: "Import agents",
        agentsImported: "Agents imported",
        agentRename: "Rename",
        viewPrompt: "Show full prompt",
        promptTitle: "Conversation prompt",
        promptEmpty: "No prompt snapshot yet; it is captured with the next message.",
        memory: "Memory",
        memoryTitle: "Conversation memory",
        memoryHint: "Only this conversation: never summarized, not inherited by new chats. One note per line.",
        memorySaved: "Memory saved",
        memoryUpdated: "Agent memory updated",
        agentRenamePrompt: "New agent name",
        commonPrompt: "Common prompt (all agents)",
        scopeCommon: "common",
        agentBaseHint: "Optionally start from existing agents, then edit the merged prompt.",
        agentBaseMerge: "Merge selected",
        addToChat: "Add selection to current chat",
        contextAdded: "Selection added to the chat",
        suggestedEdit: "Suggested edit",
        keep: "Keep",
        discard: "Discard",
        reviewInEditor: "Review in editor",
        chooseOption: "Choose an option",
        otherOption: "Other…",
        choose: "Choose",
        keepAll: "Keep all",
        discardAll: "Discard all",
        suggestionApplied: "Suggestion applied to the buffer",
        suggestionMismatch: "This diff no longer matches the file; it may have changed.",
        suggestionNoFile: "Open the target file first.",
        chatHistory: "Chats",
        newChat: "New chat",
        send: "Send",
        stop: "Stop",
        thinking: "Thinking",
        thinkingMode: "Model thinking",
        thinkingOff: "Off",
        thinkingLast: "Last step",
        thinkingFull: "Full",
        showThinking: "Show thinking",
        hideThinking: "Hide thinking",
        you: "You",
        chatPlaceholder: "Ask this agent about the paper…  (Enter sends, Shift+Enter newline)",
        chatStartHint: "Send a message to start this chat. The selected passage is attached as context.",
        cancel: "Cancel",
        agentNew: "New",
        agentNewGlobal: "New global agent",
        agentNewProject: "New project agent",
        agentSave: "Save agent",
        agentDelete: "Delete",
        agentSelectHint: "Select an agent, or create one from a template.",
        agentNone: "No agents yet.",
        agentSaved: "Agent saved",
        agentDeleted: "Agent deleted",
        agentDeleteConfirm: "Delete this agent file?",
        agentNoProject: "Open a project to use local agents.",
        scopeGlobal: "global",
        scopeProject: "project",
        scopeBuiltin: "built-in",
        autosave: "Autosave",
        autosaveDelay: "Save changes after",
        save: "Save",
        saveHint: "Save all modified files",
        compileOptions: "Compile options",
        fullRecompile: "Full recompile",
        fullRecompileHint: "Ignore the cache and run every pdflatex/bibtex pass",
        warningCount: "{count} warning(s)",
        deleteTitle: "Delete this file?",
        deleteBody: "This deletes the file from disk and cannot be undone.",
        newFileHint: "Path relative to the project root, for example sections/related-work.tex",
        renameTitle: "Rename file",
        from: "Current path",
        to: "New path",
        addFolderHint: "Register any folder that holds a LaTeX project. The main .tex file is detected automatically.",
        cloneHint: "Clones the Overleaf git project with your token, then registers it here.",
        syncHint: "Pull or push the project through its git remote.",
        needsToken: "A personal token is required for a private Overleaf project.",
        error: "Error",
        fileChanged: "Reloaded from disk",
        closeDirty: "This file has unsaved changes. Close it anyway?",
        switchDirty: "There are unsaved changes. Switch project anyway?",
        noPdfTooling: "pdflatex was not found. Install TeX Live or MacTeX, then compile again.",
        compileHint: "Ctrl/⌘ + Enter",
        filesTruncated: "File list truncated — folder is very large.",
        overleafBadge: "Overleaf",
        gitBadge: "Git",
        notGitRepo: "This project is not a git repository yet.",
        cloned: "Cloned {name}",
        created: "Created {name}",
        added: "Added {name}",
        removed: "Removed from the list",
        savedToast: "Saved {name}",
        copyPath: "Copy path",
        emptyFolder: "This folder has no .tex file yet.",
        terminal: "Terminal",
        terminalHint: "Show the LaTeX/BibTeX commands and their live output",
        terminalEmpty: "Press Compile to watch the LaTeX and BibTeX commands run here.",
        clear: "Clear",
        upToDate: "up to date",
        problemsHint: "Errors and warnings from the last compile",
        errBadge: "error",
        warnBadge: "warning",
        badboxBadge: "box",
        bibBadge: "bibtex",
        cachedBuild: "No source changes since the last build",
        stageSaving: "saving files",
        shortcutsHint: "Ctrl/⌘+Space: complete · Ctrl/⌘+`: terminal",
        browse: "Browse…",
        useFolder: "Use this folder",
        up: "Up",
        home: "Home",
        papersFolder: "Papers",
        noSubfolders: "No subfolders here.",
        loading: "Loading…",
        registered: "In Paper Studio",
        missingTitle: "Project folder is missing",
        missingBody: "This project is still registered, but its folder no longer exists on disk. Locate it again, or remove the registration — files are never deleted by Paper Studio.",
        locate: "Locate folder…",
        locateTitle: "Locate the project folder",
        projectMissingBadge: "missing",
        retry: "Retry",
        highlightSettings: "Highlight colors",
        syntaxColors: "Syntax colors",
        colorCommand: "Commands (\\section, \\begin)",
        colorEnvironment: "Environment names",
        colorMath: "Math",
        colorComment: "Comments",
        colorBrace: "Braces",
        environmentShading: "Environment background",
        enableShading: "Shade environment blocks",
        colorFigure: "Figure",
        colorMathEnv: "Equation / align",
        colorTable: "Table",
        colorTheorem: "Theorem",
        colorCode: "Code",
        cursorLine: "Cursor line",
        enableCursorLine: "Box the cursor line",
        colorCursorLine: "Cursor line color",
        resetDefaults: "Reset",
        pdfLocateHint: "Drag to select text, then Go to editor (double-click selects a word)",
        goToEditor: "Go to editor",
        goToEditorHint: "Jump to the source at the selection's first word (SyncTeX), then match the selected text nearby; a plain text search is only the fallback.",
        copyText: "Copy",
        cut: "Cut",
        paste: "Paste",
        clipboardDenied: "Clipboard access was denied — use the keyboard shortcut instead.",
        copied: "Copied selection",
        copyFailed: "Could not copy the selection",
        bold: "Bold",
        italic: "Italic",
        underline: "Underline",
        spelling: "Spelling",
        spellcheck: "Check spelling",
        spellLanguage: "Dictionary",
        shortcuts: "Shortcuts",
        shortcutSave: "Save",
        shortcutBold: "Bold",
        shortcutItalic: "Italic",
        shortcutUnderline: "Underline",
        shortcutUndo: "Undo",
        shortcutRedo: "Redo",
        keysHint: "Click a field, then press the key combination.",
        gitTab: "Git",
        fetch: "Fetch",
        fetchHint: "Fetch — download new commits from the remote without touching your files",
        pullHint: "Pull — fetch, then merge or rebase the remote branch into yours",
        pushHint: "Push — upload your commits to the remote",
        newBranch: "New branch",
        nuke: "Reset to origin",
        sshKey: "SSH key",
        cleanTree: "Working tree clean",
        showDiff: "Show diff",
        hideDiff: "Hide diff",
        noChanges: "No changes",
        nukeHeading: "Reset to origin",
        nukeTitle: "Are you sure to clear and re-pull from SOURCE?",
        nukeBody: "Every local change — tracked and untracked (except .paper-studio) — will be discarded, and the branch will be reset to its upstream. This cannot be undone.",
        nukeConfirm: "Yes, scratch all local changes and re-pull",
        nukeCancel: "No, stay on local changes",
        nukeHint: "Discard every local change and reset to origin",
        branchTitle: "Create a branch",
        branch: "Branch",
        upstream: "Upstream",
        lastCommit: "Last commit",
        details: "Details",
        changes: "Changes",
        changed: "changed",
        inSync: "in sync",
        toPush: "to push",
        toPull: "to pull",
        switchBranch: "Switch branch",
        fetchVsPull: "Fetch only downloads new commits. Pull downloads and merges them.",
        lastGitOutput: "Last git output",
        filesChanged: "files",
        branchName: "Branch name",
        pdfReload: "Reload the PDF from disk",
        pdfReloaded: "PDF reloaded",
        pdfMissing: "The compiled PDF is gone; compile again.",
        pdfMissingTitle: "PDF not found",
        pdfMissingBody: "The compiled PDF was deleted or has not been built yet. Compile to recreate it.",
        locateFailed: "No matching source found at that point.",
      },
    };

    const CSS = `
.ps-root{position:relative;display:flex;flex-direction:column;height:100%;min-height:0;overflow:hidden;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.ps-root *{box-sizing:border-box}
.ps-head{flex:none;display:flex;align-items:center;gap:6px;min-height:48px;padding:8px 10px;padding-top:calc(8px + var(--dsh-frame-top-clearance,0px));border-bottom:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base)}
.ps-brand{display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:13.5px;padding:0 6px 0 2px;white-space:nowrap}
.ps-brand svg{width:18px;height:18px;color:var(--dsw-alias-brand-primary);flex:none}
.ps-select{height:28px;max-width:220px;min-width:96px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:.5px solid var(--dsw-alias-border-l2);border-radius:7px;padding:0 6px;font:inherit;font-size:12.5px;outline:none}
.ps-select:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.ps-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:28px;padding:0 9px;border:.5px solid transparent;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12.5px;cursor:pointer;white-space:nowrap;user-select:none}
.ps-btn:hover:not(:disabled){background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
.ps-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.ps-btn:disabled{opacity:.5;cursor:default}
.ps-btn.icon{width:28px;padding:0}
.ps-btn.active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.ps-btn.primary{background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-onbrand,#fff);padding:0 12px;font-weight:500}
.ps-btn.primary:hover:not(:disabled){filter:brightness(1.07);background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-onbrand,#fff)}
.ps-btn.danger{color:var(--dsw-alias-state-error-primary)}
.ps-btn.danger:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);color:var(--dsw-alias-state-error-primary)}
.ps-btn svg{width:14px;height:14px;flex:none}
.ps-compile-group{display:inline-flex;position:relative;align-items:center}
.ps-compile-caret{padding:0 4px;min-width:20px;margin-left:1px;border-left:.5px solid color-mix(in srgb,var(--dsw-alias-label-onbrand,#fff) 35%,transparent);border-radius:0 7px 7px 0}
.ps-compile-group .ps-btn.primary:first-child{border-radius:7px 0 0 7px}
.ps-compile-menu{position:absolute;top:calc(100% + 5px);right:0;z-index:60;min-width:250px;background:var(--dsw-alias-bg-layer-2);border:.5px solid var(--dsw-alias-border-l1);border-radius:9px;box-shadow:0 12px 32px rgba(0,0,0,.32);padding:5px}
.ps-compile-menu .ps-btn{width:100%;height:auto;min-height:30px;padding:6px 8px;justify-content:flex-start;color:var(--dsw-alias-label-primary);background:transparent}
.ps-compile-menu .ps-btn:hover:not(:disabled){background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
.ps-compile-menu-text{display:flex;flex-direction:column;align-items:flex-start;gap:1px;text-align:left}
.ps-compile-menu-title{font-size:12px;font-weight:500}
.ps-compile-menu-hint{font-size:10.5px;color:var(--dsw-alias-label-secondary);font-weight:400}
.ps-spacer{flex:1;min-width:4px}
.ps-status{display:inline-flex;align-items:center;gap:5px;color:var(--dsw-alias-label-secondary);font-size:12px;white-space:nowrap;padding:0 4px;max-width:250px;overflow:hidden;text-overflow:ellipsis}
.ps-status.ok{color:var(--dsw-alias-state-success-primary)}
.ps-status.err{color:var(--dsw-alias-state-error-primary)}
.ps-status .ps-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex:none}
.ps-toggle{display:inline-flex;align-items:center;gap:5px;color:var(--dsw-alias-label-secondary);font-size:12px;cursor:pointer;white-space:nowrap;padding:0 4px;user-select:none}
.ps-toggle input{accent-color:var(--dsw-alias-brand-primary);margin:0}
.ps-main{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.ps-body{flex:1;min-height:0;display:grid;overflow:hidden}
.ps-pane{display:flex;flex-direction:column;min-width:0;min-height:0;overflow:hidden;background:var(--dsw-alias-bg-base)}
.ps-explorer{background:var(--dsw-alias-bg-layer-1);border-right:.5px solid var(--dsw-alias-border-l1)}
.ps-pdf{border-left:.5px solid var(--dsw-alias-border-l1)}
.ps-pane-head{flex:none;display:flex;align-items:center;gap:2px;height:34px;padding:0 6px 0 10px;border-bottom:.5px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.ps-pane-title{font-size:10.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-pane-head .ps-btn{height:24px;width:24px;border-radius:5px}
.ps-pane-head .ps-btn svg{width:13px;height:13px}
.ps-tree{flex:1;min-height:0;overflow:auto;padding:4px 4px 20px}
.ps-row{display:flex;align-items:center;gap:6px;width:100%;height:24px;padding:0 6px;border:0;border-radius:5px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12.5px;text-align:left;cursor:pointer;white-space:nowrap;overflow:hidden}
.ps-row:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.ps-row.active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-weight:500}
.ps-row .ps-chev{width:12px;height:12px;flex:none;color:var(--dsw-alias-label-secondary);transition:transform .12s ease}
.ps-row .ps-chev.open{transform:rotate(90deg)}
.ps-row .ps-name{overflow:hidden;text-overflow:ellipsis;min-width:0}
.ps-row .ps-row-actions{margin-left:auto;display:none;gap:2px}
.ps-row:hover .ps-row-actions{display:inline-flex}
.ps-row-actions button{width:20px;height:20px;border:0;border-radius:4px;background:transparent;color:inherit;cursor:pointer;padding:0;display:inline-flex;align-items:center;justify-content:center}
.ps-row-actions button:hover{background:var(--dsw-alias-bg-base)}
.ps-row-actions svg{width:11px;height:11px}
.ps-chip{font:600 8px/1 ${MONO};letter-spacing:.04em;min-width:22px;padding:3px 3px;border-radius:3px;background:color-mix(in srgb,currentColor 12%,transparent);color:var(--dsw-alias-label-secondary);text-align:center;flex:none}
.ps-chip.tex{color:var(--dsw-alias-brand-primary)}
.ps-chip.bib{color:var(--dsw-alias-state-success-primary)}
.ps-chip.pdf{color:var(--dsw-alias-state-error-primary)}
.ps-chip.img{color:var(--dsw-alias-state-warn-primary)}
.ps-explorer-foot{flex:none;border-top:.5px solid var(--dsw-alias-border-l1);padding:5px 8px;display:flex;align-items:center;gap:6px;font-size:11px;color:var(--dsw-alias-label-secondary)}
.ps-explorer-foot .ps-path{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:rtl;text-align:left}
.ps-explorer-foot .ps-btn{height:22px;padding:0 6px;font-size:11px;border-radius:5px}
.ps-editor{flex:1;display:flex;flex-direction:column;min-width:0;min-height:0}
.ps-tabs{flex:none;display:flex;align-items:stretch;height:34px;overflow-x:auto;overflow-y:hidden;border-bottom:.5px solid var(--dsw-alias-border-l1);scrollbar-width:none}
.ps-tabs::-webkit-scrollbar{display:none}
.ps-tab{display:inline-flex;align-items:center;gap:6px;padding:0 6px 0 11px;border:0;border-right:.5px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12.5px;cursor:pointer;white-space:nowrap;flex:none;max-width:220px}
.ps-tab:hover{background:var(--dsw-alias-bg-layer-1)}
.ps-tab.active{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
.ps-tab .ps-tab-name{overflow:hidden;text-overflow:ellipsis}
.ps-tab .ps-dirty{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-warn-primary);flex:none}
.ps-tab .ps-tab-close{width:18px;height:18px;border:0;border-radius:4px;background:transparent;color:inherit;cursor:pointer;padding:0;display:inline-flex;align-items:center;justify-content:center;opacity:.65}
.ps-tab .ps-tab-close:hover{background:var(--dsw-alias-bg-layer-2);opacity:1}
.ps-tab-close svg{width:10px;height:10px}
.ps-code-wrap{flex:1;display:flex;min-height:0;overflow:hidden;position:relative}
.ps-code-area{flex:1;min-width:0;position:relative;display:flex;overflow:hidden}
.ps-gutter{flex:none;min-width:44px;overflow:hidden;padding:8px 6px 8px 10px;text-align:right;font:13px/20px ${MONO};color:var(--dsw-alias-label-secondary);user-select:none;border-right:.5px solid var(--dsw-alias-border-l1);opacity:.75}
.ps-gutter-inner{will-change:transform}
.ps-code{flex:1;min-width:0;border:0;outline:0;resize:none;background:transparent;font:13px/20px ${MONO};padding:8px 18px 8px 48px;tab-size:2;white-space:pre;overflow:auto;position:relative;z-index:1;overscroll-behavior:contain;overflow-anchor:none}
.ps-root textarea.ps-code.wrap{white-space:pre-wrap!important;overflow-wrap:anywhere!important;word-break:break-word!important;overflow-x:hidden!important;overflow-y:scroll}
.ps-highlight.wrap{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;width:var(--ps-pre-width,100%);box-sizing:border-box}
.ps-root textarea.ps-code{color:transparent!important;-webkit-text-fill-color:transparent!important;caret-color:var(--dsw-alias-label-primary)!important;background:transparent!important}
.ps-highlight{position:absolute;inset:0;z-index:0;margin:0;padding:8px 18px 8px 48px;font:13px/20px ${MONO};tab-size:2;white-space:pre;overflow:hidden;pointer-events:none;color:var(--dsw-alias-label-primary);background:transparent}
.ps-hl-inner{position:relative;min-height:100%}
.ps-hl-inner.virtual{height:0;min-height:0}
.ps-hl-inner.virtual .ps-hl-line{position:absolute;left:-48px;right:-18px;top:0;margin:0;padding:0 18px 0 48px;min-height:20px}
.ps-match-layer{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}
.ps-match-box{position:absolute;box-sizing:border-box;border-radius:2px;border:.5px solid var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,transparent);box-shadow:0 0 0 .5px color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,transparent)}
.ps-match-box.unmatched{border-color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 20%,transparent)}
.ps-root pre.ps-highlight{color:var(--dsw-alias-label-primary)!important;background:transparent!important}
.ps-code::-webkit-scrollbar,.ps-pdf-scroll::-webkit-scrollbar,.ps-tree::-webkit-scrollbar,.ps-git::-webkit-scrollbar{width:11px;height:11px}
.ps-code::-webkit-scrollbar-thumb,.ps-pdf-scroll::-webkit-scrollbar-thumb,.ps-tree::-webkit-scrollbar-thumb,.ps-git::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--dsw-alias-label-secondary) 42%,transparent);border-radius:6px;border:2px solid transparent;background-clip:content-box}
.ps-code::-webkit-scrollbar-thumb:hover,.ps-pdf-scroll::-webkit-scrollbar-thumb:hover,.ps-tree::-webkit-scrollbar-thumb:hover,.ps-git::-webkit-scrollbar-thumb:hover{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 65%,transparent);background-clip:content-box;border-width:1px}
.ps-code::-webkit-scrollbar-track,.ps-pdf-scroll::-webkit-scrollbar-track,.ps-tree::-webkit-scrollbar-track,.ps-git::-webkit-scrollbar-track{background:transparent}
.ps-hl-cmd{color:var(--ps-hl-command,#8b5cf6)}
.ps-hl-env{color:var(--ps-hl-env,#d97706)}
.ps-hl-math{color:var(--ps-hl-math,#059669)}
.ps-hl-comment{color:var(--ps-hl-comment,#94a3b8);font-style:italic}
.ps-hl-brace{color:var(--ps-hl-brace,#94a3b8)}
.ps-hl-line{position:relative;min-height:20px;line-height:20px;margin:0 -18px 0 -48px;padding:0 18px 0 48px;border-radius:3px}
.ps-hl-line::before{content:attr(data-line);position:absolute;left:8px;top:0;width:32px;text-align:right;font:13px/20px ${MONO};color:var(--dsw-alias-label-secondary);opacity:.7;pointer-events:none}
.ps-hl-line[data-bg="figure"]{background:var(--ps-bg-figure)}
.ps-hl-line[data-bg="math"]{background:var(--ps-bg-math)}
.ps-hl-line[data-bg="table"]{background:var(--ps-bg-table)}
.ps-hl-line[data-bg="theorem"]{background:var(--ps-bg-theorem)}
.ps-hl-line[data-bg="code"]{background:var(--ps-bg-code)}
.ps-hl-line.current{outline:1px solid var(--ps-current-line);outline-offset:-1px}
.ps-hl-line[data-diff="add"]::after,.ps-hl-line[data-diff="mod"]::after{content:"";position:absolute;left:43px;top:1px;bottom:1px;width:3px;border-radius:2px;pointer-events:none}
.ps-hl-line[data-diff="add"]::after{background:var(--ps-diff-add,#2ea043)}
.ps-hl-line[data-diff="mod"]::after{background:var(--ps-diff-mod,#3b82f6)}
.ps-hl-line[data-diff="del"]::after{content:"";position:absolute;left:40px;top:-1px;width:7px;height:5px;background:var(--ps-diff-del,#e5484d);clip-path:polygon(0 0,100% 0,50% 100%);pointer-events:none}
.ps-hl-misspell{text-decoration:underline wavy #e5484d;text-decoration-skip-ink:none}
.ps-block-caret{position:absolute;z-index:2;pointer-events:none;box-sizing:border-box;border-radius:2px;border:1px solid color-mix(in srgb,var(--ps-hl-command,#8b5cf6) 75%,transparent);background:color-mix(in srgb,var(--ps-hl-command,#8b5cf6) 16%,transparent)}
.ps-root textarea.ps-code.vim-normal{caret-color:transparent!important}
.ps-nuke-warn{display:flex;flex-direction:column;gap:9px;padding:4px 0 2px}
.ps-nuke-title{margin:0;font-size:19px;font-weight:700;line-height:1.3;color:var(--dsw-alias-state-error-primary)}
.ps-nuke-target{font:11.5px/1.5 ${MONO};color:var(--dsw-alias-label-secondary)}
.ps-nuke-body{margin:0;font-size:12.5px;line-height:1.6;color:var(--dsw-alias-label-primary)}
.ps-btn.danger-solid{background:var(--dsw-alias-state-error-primary);color:#fff;font-weight:600;padding:0 12px}
.ps-nuke-confirm{white-space:normal;height:auto;min-height:30px;max-width:330px;padding:6px 10px;line-height:1.25;text-align:center}
.ps-btn.danger-solid:hover:not(:disabled){background:var(--dsw-alias-state-error-primary);filter:brightness(1.08);color:#fff}
.ps-boom{position:absolute;inset:0;z-index:80;pointer-events:none;overflow:hidden}
.ps-boom-flash{position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,rgb(251 146 60 / 35%),transparent 55%);animation:ps-boom-flash 560ms ease-out forwards}
.ps-boom-ring{position:absolute;left:50%;top:45%;width:70px;height:70px;margin:-35px 0 0 -35px;border-radius:50%;border:3px solid rgb(251 146 60 / 90%);animation:ps-boom-ring 760ms ease-out forwards}
.ps-boom-particle{position:absolute;left:50%;top:45%;border-radius:50%;opacity:0;animation:ps-boom-fly 900ms cubic-bezier(.2,.6,.3,1) forwards}
.ps-boom-text{position:absolute;left:50%;top:45%;transform:translate(-50%,-50%);font-size:58px;line-height:1;filter:drop-shadow(0 0 18px rgb(251 146 60 / 85%));animation:ps-boom-text 1.5s cubic-bezier(.3,.7,.4,1) forwards}
@keyframes ps-boom-flash{0%{opacity:0}16%{opacity:1}100%{opacity:0}}
@keyframes ps-boom-ring{0%{transform:scale(.2);opacity:1}100%{transform:scale(7);opacity:0}}
@keyframes ps-boom-fly{0%{transform:translate(0,0) scale(.4);opacity:1}75%{opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(.95);opacity:0}}
@keyframes ps-boom-text{
0%{transform:translate(-50%,-50%) scale(.15) rotate(-160deg);opacity:0}
18%{transform:translate(-50%,-50%) scale(1.5) rotate(14deg);opacity:1}
38%{transform:translate(-50%,-50%) scale(.92) rotate(-9deg)}
58%{transform:translate(-50%,-50%) scale(1.24) rotate(7deg)}
78%{transform:translate(-50%,-50%) scale(1) rotate(-3deg);opacity:1}
100%{transform:translate(-50%,-50%) scale(1.65) rotate(16deg);opacity:0}
}
.ps-ctx{position:fixed;z-index:60;min-width:190px;padding:4px;border-radius:8px;background:var(--dsw-alias-bg-overlay);border:.5px solid var(--dsw-alias-border-l2);box-shadow:0 10px 26px rgba(0,0,0,.28)}
.ps-ctx-item{display:flex;align-items:center;gap:8px;width:100%;padding:5px 8px;border:0;border-radius:5px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;text-align:left;cursor:pointer}
.ps-ctx-item:hover{background:var(--dsw-alias-bg-layer-2)}
.ps-ctx-item kbd{margin-left:auto;font:10px/1 ${MONO};color:var(--dsw-alias-label-secondary)}
.ps-ctx-item:disabled{opacity:.45;cursor:default}
.ps-ctx-item:disabled:hover{background:transparent}
.ps-ctx-sep{height:1px;margin:4px 2px;background:var(--dsw-alias-border-l1)}
.ps-key-row{display:flex;align-items:center;gap:9px;font-size:12px}
.ps-key-row .ps-key-input{flex:1;min-width:0;font:11px/1.4 ${MONO};text-align:center}
.ps-code::selection{background:color-mix(in srgb,#94a3b8 34%,transparent);color:transparent}
.ps-code::-moz-selection{background:color-mix(in srgb,#94a3b8 34%,transparent);color:transparent}
.ps-code-foot{flex:none;display:flex;align-items:center;gap:12px;height:26px;padding:0 10px;border-top:.5px solid var(--dsw-alias-border-l1);font-size:11px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden}
.ps-code-foot .ps-grow{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.ps-banner{flex:none;display:flex;align-items:center;gap:8px;padding:7px 10px;background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 13%,transparent);border-bottom:.5px solid var(--dsw-alias-border-l1);font-size:12px;color:var(--dsw-alias-label-primary)}
.ps-banner .ps-banner-text{flex:1;min-width:0;white-space:normal}
.ps-banner .ps-btn{height:24px;font-size:11.5px}
.ps-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:28px;text-align:center;color:var(--dsw-alias-label-secondary);min-height:0}
.ps-empty .ps-empty-icon{color:var(--dsw-alias-label-secondary);opacity:.55}
.ps-empty .ps-empty-icon svg{width:40px;height:40px}
.ps-empty h2{margin:0;font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary)}
.ps-empty p{margin:0;max-width:360px;font-size:12.5px;line-height:1.6}
.ps-empty .ps-empty-actions{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:4px}
.ps-pdf-scroll{flex:1;min-height:0;overflow:auto;background:var(--dsw-alias-bg-layer-1);padding:12px;overscroll-behavior:contain}
.ps-pages{width:var(--ps-zoom,100%);min-width:280px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.ps-page-box{position:relative;width:100%;line-height:0}
.ps-page{width:100%;display:block;background:#fff;border-radius:2px;box-shadow:0 1px 5px rgba(0,0,0,.2)}
.ps-page-placeholder{aspect-ratio:612 / 792;box-shadow:none;background:var(--dsw-alias-bg-layer-2)}
.ps-text-layer{position:absolute;inset:0;overflow:visible;z-index:1;line-height:0;cursor:text;user-select:text;-webkit-user-select:text}
.ps-text-layer span{position:absolute;color:transparent;background:transparent;white-space:pre;overflow:hidden;line-height:1;cursor:text}
.ps-text-layer span::selection{background:rgba(96,165,250,.38);color:transparent}
.ps-text-layer span::-moz-selection{background:rgba(96,165,250,.38);color:transparent}
.ps-page-bar{position:absolute;z-index:6;display:flex;gap:4px;padding:3px;border-radius:8px;background:var(--dsw-alias-bg-overlay);border:.5px solid var(--dsw-alias-border-l2);box-shadow:0 6px 18px rgba(0,0,0,.25);transform:translate(-50%,8px)}
.ps-page-bar .ps-btn{height:24px;font-size:11.5px;padding:0 8px}
.ps-frame{flex:1;width:100%;border:0;background:#fff;min-height:0}
.ps-pdf-foot{flex:none;display:flex;align-items:center;gap:8px;height:26px;padding:0 10px;border-top:.5px solid var(--dsw-alias-border-l1);font-size:11px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.ps-zoom{display:inline-flex;align-items:center;gap:3px}
.ps-zoom select{height:20px;background:transparent;border:.5px solid var(--dsw-alias-border-l2);border-radius:5px;color:var(--dsw-alias-label-primary);font:inherit;font-size:11px;outline:none;padding:0 2px}
.ps-drawer{flex:none;display:flex;flex-direction:column;height:196px;border-top:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}
.ps-drawer-head{flex:none;display:flex;align-items:center;gap:2px;height:30px;padding:0 6px 0 6px;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.ps-drawer-tab{height:23px;padding:0 9px;border:0;border-radius:5px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11.5px;cursor:pointer}
.ps-drawer-tab.active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.ps-prefs-tabs{display:flex;gap:2px;padding-bottom:6px;margin-bottom:2px;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.ps-prefs-subtabs{display:flex;gap:2px;padding:2px 0 4px}
.ps-diag{font:9.5px/1.3 ${MONO};color:var(--dsw-alias-label-secondary);opacity:.8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:52%}
.ps-build-tag{font:9.5px/1 ${MONO};color:var(--dsw-alias-label-secondary);opacity:.55;padding-left:4px}
.ps-build{margin-top:8px;padding-top:6px;border-top:.5px solid var(--dsw-alias-border-l1);font:10px/1.4 ${MONO};color:var(--dsw-alias-label-secondary);opacity:.7;text-align:right}
.ps-exline{flex:none;display:flex;align-items:center;height:24px;padding:0 10px;border-top:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);font:12px/1 ${MONO};color:var(--dsw-alias-label-primary);white-space:pre}
.ps-vim{font:600 9.5px/1 ${MONO};letter-spacing:.06em;padding:2px 4px;border-radius:3px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary)}
.ps-drawer-tab .ps-count{display:inline-block;margin-left:5px;padding:1px 5px;border-radius:8px;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 16%,transparent);color:var(--dsw-alias-state-error-primary);font-size:10px}
.ps-problems{flex:1;min-height:0;overflow:auto;padding:4px 8px 12px}
.ps-problem{display:flex;gap:8px;align-items:flex-start;width:100%;padding:5px 6px;border:0;border-radius:5px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11.5px;text-align:left;cursor:pointer}
.ps-problem:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.ps-problem .ps-problem-loc{flex:none;font-family:${MONO};font-size:10.5px;color:var(--dsw-alias-label-secondary);opacity:.85;padding-top:1px}
.ps-problem .ps-problem-msg{flex:1;min-width:0;white-space:pre-wrap;overflow-wrap:anywhere}
.ps-problem.err{color:var(--dsw-alias-state-error-primary)}
.ps-log{flex:1;min-height:0;overflow:auto;margin:0;padding:8px 12px 16px;font:11.5px/17px ${MONO};white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-secondary)}
.ps-backdrop{position:absolute;inset:0;z-index:40;display:flex;align-items:flex-start;justify-content:center;padding:56px 16px 24px;overflow:auto;background:color-mix(in srgb,#000 34%,transparent)}
.ps-modal{width:min(540px,100%);display:flex;flex-direction:column;max-height:calc(100% - 24px);background:var(--dsw-alias-bg-overlay);border:.5px solid var(--dsw-alias-border-l2);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.ps-modal-head{flex:none;display:flex;align-items:center;gap:8px;padding:14px 14px 8px 18px}
.ps-modal-title{flex:1;margin:0;font-size:15px;font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-modal-body{display:flex;flex-direction:column;gap:12px;padding:6px 18px 12px;overflow:auto}
.ps-modal-foot{flex:none;display:flex;justify-content:flex-end;gap:8px;padding:10px 18px 16px;flex-wrap:wrap}
.ps-modal-foot .ps-btn{height:30px}
.ps-field{display:flex;flex-direction:column;gap:5px;min-width:0}
.ps-label{font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.ps-input,.ps-textarea{width:100%;min-width:0;background:var(--dsw-alias-bg-base);border:.5px solid var(--dsw-alias-border-l2);border-radius:8px;color:var(--dsw-alias-label-primary);font:inherit;font-size:12.5px;padding:7px 9px;outline:none}
.ps-input:focus,.ps-textarea:focus{border-color:var(--dsw-alias-brand-primary)}
.ps-hint{font-size:11px;line-height:1.5;color:var(--dsw-alias-label-secondary);opacity:.9}
.ps-error{font-size:11.5px;color:var(--dsw-alias-state-error-primary);white-space:pre-wrap}
.ps-output{margin:0;max-height:180px;overflow:auto;padding:8px 10px;border:.5px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);font:11px/16px ${MONO};white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-secondary)}
.ps-git{flex:1;min-height:0;overflow:auto;padding:6px 8px 18px;display:flex;flex-direction:column;gap:7px}
.ps-agents-sep{border:0;border-top:.5px solid var(--dsw-alias-border-l1);margin:6px 0}
.ps-agent-pick-list{display:flex;flex-direction:column;gap:2px;max-height:46vh;overflow:auto}
.ps-agent-pick-head{font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);margin:4px 0 2px}
.ps-agent-pick{display:flex;flex-direction:column;align-items:flex-start;gap:1px;border:0;background:transparent;border-radius:6px;padding:6px 8px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer}
.ps-agent-pick:hover{background:var(--dsw-alias-bg-layer-1)}
.ps-agent-pick-name{font-size:12px}
.ps-agent-pick-desc{font-size:10.5px;color:var(--dsw-alias-label-secondary)}
.ps-agent-sep{border:0;border-top:.5px solid var(--dsw-alias-border-l1);margin:6px 0;width:100%}
.ps-diff-pop{position:absolute;z-index:8;min-width:280px;min-height:140px;max-width:80%;max-height:80%;display:flex;flex-direction:column;background:var(--dsw-alias-bg-layer-2);border:.5px solid var(--dsw-alias-border-l1);border-radius:9px;box-shadow:0 16px 40px rgba(0,0,0,.35);overflow:hidden}
.ps-diff-pop-head{display:flex;align-items:center;gap:6px;padding:5px 7px;border-bottom:.5px solid var(--dsw-alias-border-l1);font-size:11px;cursor:move;user-select:none}
.ps-diff-resize{position:absolute;right:2px;bottom:2px;width:13px;height:13px;cursor:nwse-resize;background:linear-gradient(135deg,transparent 45%,var(--dsw-alias-label-secondary) 45%,var(--dsw-alias-label-secondary) 55%,transparent 55%,transparent 70%,var(--dsw-alias-label-secondary) 70%,var(--dsw-alias-label-secondary) 80%,transparent 80%);opacity:.7}
.ps-diff-pop-head span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-diff-pop-body{overflow:auto;padding:4px 6px 6px}
.ps-diff-hunk{margin:4px 0}
.ps-diff-hunk-head{display:flex;align-items:center;gap:4px;font:9.5px/1.3 ${MONO};color:var(--dsw-alias-label-secondary)}
.ps-diff-hunk-head span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-diff-line{padding:0 4px;white-space:pre-wrap;overflow-wrap:anywhere;font:10.5px/1.45 ${MONO}}
.ps-diff-line.add{background:color-mix(in srgb,#22c55e 24%,transparent)}
.ps-diff-line.del{background:color-mix(in srgb,#ef4444 22%,transparent)}
.ps-diff-line.ctx{color:var(--dsw-alias-label-secondary)}
.ps-hl-line.ps-diff-target{background:color-mix(in srgb,#ef4444 16%,transparent);box-shadow:inset 2px 0 0 #ef4444}
.ps-btn.keep{background:color-mix(in srgb,#22c55e 20%,transparent);color:#16a34a;border-color:color-mix(in srgb,#22c55e 40%,transparent)}
.ps-btn.keep:hover:not(:disabled){background:color-mix(in srgb,#22c55e 30%,transparent);color:#15803d}
.ps-chat-pick-row{display:flex;align-items:center;gap:4px}
.ps-chat-pick-main{flex:1;min-width:0}
.ps-chat-new{display:flex;align-items:center;gap:5px}
.ps-chat-new .ps-select{flex:1;min-width:0}
.ps-chat-pick-main .ps-agent-pick-name b{font-weight:700}
.ps-chat-pick-row .ps-agent-pick{flex:1;min-width:0}
.ps-chat-prompt{color:var(--dsw-alias-label-secondary)}
.ps-memory-area{width:100%;min-height:220px;max-height:50vh;resize:vertical;background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;padding:8px;font:10.5px/1.5 ${MONO};color:inherit;box-sizing:border-box}
.ps-prompt-body{max-height:55vh;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;font:10.5px/1.5 ${MONO};background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;padding:8px;margin:0}
.ps-chat-delete{color:var(--dsw-alias-state-error-primary)}
.ps-chat-delete:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 14%,transparent);color:var(--dsw-alias-state-error-primary)}
.ps-math{display:inline-block;vertical-align:middle}
.ps-math-display{display:block;margin:4px 0;overflow-x:auto;text-align:center}
.ps-math math{font-size:1.03em}
.ps-chat-think{border-left:2px solid var(--dsw-alias-border-l1);padding-left:6px;margin:2px 0 4px}
.ps-chat-think-head{display:flex;align-items:center;gap:4px;width:100%;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font-size:10.5px;cursor:pointer;text-align:left;padding:0}
.ps-chat-think-head svg{width:10px !important;height:10px !important;flex:none}
.ps-chat-think-last{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:.8;margin-left:4px}
.ps-chat-think-body{font:10.5px/1.5 ${MONO};white-space:pre-wrap;overflow-wrap:anywhere;max-height:220px;overflow:auto;color:var(--dsw-alias-label-secondary);margin:3px 0 0}
.ps-chat-file{font:10.5px/1.4 ${MONO};color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l1);border-radius:6px;padding:3px 6px;align-self:flex-start}
.ps-chat-choice{border:.5px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-1);padding:6px 8px;margin-top:4px;display:flex;flex-direction:column;gap:4px}
.ps-chat-choice-head{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--dsw-alias-label-secondary)}
.ps-chat-choice-option{display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--dsw-alias-label-primary)}
.ps-chat-choice-text{display:flex;flex-direction:column;gap:1px}
.ps-chat-choice-desc{font-size:10.5px;font-weight:400;color:var(--dsw-alias-label-secondary)}
.ps-chat-choice-input{flex:1;min-width:0;font-size:11px;padding:3px 6px}
.ps-chat-choice .ps-btn{align-self:flex-start;margin-top:2px}
.ps-chat-changes{border-top:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);padding:5px 8px;display:flex;flex-direction:column;gap:4px;max-height:32%;overflow:auto}
.ps-chat-changes-head{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--dsw-alias-label-secondary)}
.ps-chat-changes-list{display:flex;flex-direction:column;gap:2px}
.ps-chat-change{display:flex;align-items:center;gap:5px}
.ps-chat-change-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:10px/1.4 ${MONO};color:var(--dsw-alias-label-secondary)}
.ps-chat-changes-actions{display:flex;gap:4px;justify-content:flex-end}
.ps-chat-suggestion{border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;padding:5px 7px;margin-top:4px;background:var(--dsw-alias-bg-layer-1)}
.ps-chat-suggestion-head{font-size:10px;color:var(--dsw-alias-label-secondary);margin-bottom:3px}
.ps-chat-suggestion-diff{font:10px/1.45 ${MONO};max-height:150px;overflow:auto;border-radius:4px}
.ps-chat-suggestion-actions{display:flex;gap:4px;margin-top:5px}
.ps-chat{display:flex;flex-direction:column;min-height:0;flex:1}
.ps-chat-bar{display:flex;align-items:center;gap:4px;padding:4px 8px;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.ps-chat-agent{font-size:11.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:38%}
.ps-chat-bar .ps-select{flex:1;min-width:0;font-size:11px}
.ps-chat-log{flex:1;min-height:0;overflow:auto;padding:8px;display:flex;flex-direction:column;gap:8px}
.ps-chat-context{border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;background:var(--dsw-alias-bg-layer-1);padding:5px 7px}
.ps-chat-context-head{font:9.5px/1.3 ${MONO};color:var(--dsw-alias-label-secondary)}
.ps-chat-context-text{font-size:11px;color:var(--dsw-alias-label-secondary);white-space:pre-wrap;max-height:80px;overflow:hidden;margin-top:2px}
.ps-chat-msg{display:flex;flex-direction:column;gap:2px}
.ps-chat-who{font-size:9.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--dsw-alias-label-secondary)}
.ps-chat-text{font-size:12px;line-height:1.5;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary)}
.ps-chat-text p{margin:0 0 6px}
.ps-chat-text p:last-child{margin-bottom:0}
.ps-chat-text .ps-md-h1,.ps-chat-text .ps-md-h2,.ps-chat-text .ps-md-h3{font-weight:650;margin:8px 0 4px;line-height:1.3}
.ps-chat-text .ps-md-h1{font-size:15px}
.ps-chat-text .ps-md-h2{font-size:13.5px}
.ps-chat-text .ps-md-h3{font-size:12.5px}
.ps-chat-text .ps-md-h4,.ps-chat-text .ps-md-h5,.ps-chat-text .ps-md-h6{font-weight:650;font-size:12px;margin:6px 0 3px}
.ps-chat-text .ps-md-list{margin:2px 0 6px;padding-left:18px}
.ps-chat-text .ps-md-list li{margin:1px 0}
.ps-chat-text .ps-md-quote{border-left:2px solid var(--dsw-alias-border-l1);padding-left:7px;margin:4px 0;color:var(--dsw-alias-label-secondary)}
.ps-chat-text .ps-md-hr{border:0;border-top:.5px solid var(--dsw-alias-border-l1);margin:7px 0}
.ps-chat-text .ps-md-code{font:10.5px/1.4 ${MONO};background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l1);border-radius:3px;padding:0 3px}
.ps-chat-text .ps-chat-code{font:10.5px/1.45 ${MONO};background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l1);border-radius:6px;padding:6px 7px;margin:4px 0;overflow:auto;white-space:pre-wrap}
.ps-chat-text a{color:var(--dsw-alias-brand-primary);text-decoration:underline}
.ps-chat-msg.user .ps-chat-text{background:var(--dsw-alias-bg-layer-2);border-radius:7px;padding:5px 7px}
.ps-chat-thinking{opacity:.7;font-style:italic}
.ps-chat-compose{display:flex;gap:4px;padding:6px 8px;border-top:.5px solid var(--dsw-alias-border-l1);align-items:flex-end}
.ps-chat-input{flex:1;min-height:46px;max-height:140px;resize:vertical;font:12px/1.45 inherit;padding:6px 7px;border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
.ps-agents-tools{display:flex;gap:4px}
.ps-agents-path{font:9.5px/1.4 ${MONO};color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l1);border-radius:6px;padding:4px 6px;user-select:text;overflow-wrap:anywhere}
.ps-agents-bases{border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;padding:5px 7px;display:flex;flex-direction:column;gap:2px;max-height:120px;overflow:auto}
.ps-agents-bases-head{font-size:10px;color:var(--dsw-alias-label-secondary)}
.ps-agents-bases .ps-check-row{font-size:11px;padding:1px 0}
.ps-agents{display:grid;grid-template-columns:minmax(0,0.85fr) minmax(0,1.4fr);gap:8px;min-height:0;flex:1}
.ps-agents-list{display:flex;flex-direction:column;gap:2px;min-height:0;overflow:auto;border-right:.5px solid var(--dsw-alias-border-l1);padding-right:6px}
.ps-agents-head{display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--dsw-alias-label-secondary);margin-bottom:4px}
.ps-agents-head span{flex:1}
.ps-agents-item{display:flex;align-items:center;gap:6px;border:0;background:transparent;border-radius:6px;padding:5px 6px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;font-size:11.5px}
.ps-agents-item:hover{background:var(--dsw-alias-bg-layer-1)}
.ps-agents-item.active{background:var(--dsw-alias-bg-layer-2)}
.ps-agents-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-agents-scope{flex:none;font-size:9px;text-transform:uppercase;letter-spacing:.04em;padding:1px 4px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary)}
.ps-agents-scope.project{color:var(--dsw-alias-brand-primary)}
.ps-agents-scope.builtin{color:var(--dsw-alias-state-warn-primary)}
.ps-agents-edit{display:flex;flex-direction:column;gap:6px;min-height:0}
.ps-agents-meta{font:10px/1.3 ${MONO};color:var(--dsw-alias-label-secondary)}
.ps-agents-md{flex:1;min-height:220px;resize:vertical;font:11.5px/1.5 ${MONO};padding:8px;border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);tab-size:2}
.ps-agents-actions{display:flex;gap:4px}
.ps-git-card{background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l1);border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:6px}
.ps-git-branchline{display:flex;align-items:center;gap:6px;font-size:12px}
.ps-git-upstream{margin-left:auto;font:10.5px/1.2 ${MONO};color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:55%}
.ps-git-pills{display:flex;flex-wrap:wrap;gap:4px}
.ps-pill{display:inline-flex;align-items:center;gap:3px;padding:1px 6px;border-radius:9px;font-size:10px;line-height:1.5;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);white-space:nowrap}
.ps-pill.ok{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,transparent)}
.ps-pill.warn{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 14%,transparent)}
.ps-pill.push{color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent)}
.ps-git-actions{display:grid;grid-template-columns:1fr 1fr;gap:4px}
.ps-git-actions .ps-btn{height:27px;font-size:11.5px;justify-content:center;padding:0 6px}
.ps-git-actions .ps-btn.wide{grid-column:1 / -1}
.ps-git-hint{font-size:10.5px;line-height:1.45;color:var(--dsw-alias-label-secondary)}
.ps-git-section-head{display:flex;align-items:center;justify-content:space-between;font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--dsw-alias-label-secondary)}
.ps-git-count{font:600 10px/1 ${MONO};padding:1px 5px;border-radius:8px;background:var(--dsw-alias-bg-layer-2)}
.ps-git-empty{display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--dsw-alias-label-secondary);padding:2px 0}
.ps-git-empty svg{width:13px;height:13px;color:var(--dsw-alias-state-success-primary)}
.ps-git-details{border:.5px solid var(--dsw-alias-border-l1);border-radius:8px;padding:6px 8px;background:var(--dsw-alias-bg-layer-1)}
.ps-git-details summary{cursor:pointer;font-size:11px;color:var(--dsw-alias-label-secondary);list-style:none}
.ps-git-details summary::-webkit-details-marker{display:none}
.ps-git-details summary::before{content:"▸ ";color:var(--dsw-alias-label-secondary)}
.ps-git-details[open] summary::before{content:"▾ "}
.ps-git-detail{display:flex;gap:8px;align-items:baseline;font-size:10.5px;margin-top:5px;min-width:0}
.ps-git-detail span{flex:none;color:var(--dsw-alias-label-secondary)}
.ps-git-detail code{font:10.5px/1.4 ${MONO};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-git-branchselect{display:flex;align-items:center;gap:6px;margin-top:6px;font-size:10.5px;color:var(--dsw-alias-label-secondary)}
.ps-git-branchselect .ps-select{flex:1;min-width:0;font-size:11px}
.ps-git-diff-head{display:flex;align-items:center;gap:6px;justify-content:space-between}
.ps-git-stats{font-size:10.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.ps-git-stats .plus{color:var(--dsw-alias-state-success-primary)}
.ps-git-stats .minus{color:var(--dsw-alias-state-error-primary)}
.ps-git-head{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:12px}
.ps-git-branch{font:600 11.5px/1 ${MONO};padding:2px 6px;border-radius:4px;background:var(--dsw-alias-bg-layer-2)}
.ps-git-muted{color:var(--dsw-alias-label-secondary);font-size:11px}
.ps-git-actions{display:flex;flex-wrap:wrap;gap:4px}
.ps-git-actions .ps-btn{height:24px;font-size:11.5px;padding:0 7px}
.ps-git-meta{display:flex;gap:6px;align-items:center;font-size:10.5px;color:var(--dsw-alias-label-secondary);overflow:hidden}
.ps-git-meta code{font:10.5px/1.4 ${MONO};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-git-files{display:flex;flex-direction:column;gap:1px;border-top:.5px solid var(--dsw-alias-border-l1);padding-top:5px}
.ps-git-file{display:flex;align-items:center;gap:7px;width:100%;padding:2px 4px;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:11.5px;text-align:left;cursor:pointer}
.ps-git-file:hover{background:var(--dsw-alias-bg-layer-2)}
.ps-git-status{font:600 9px/1 ${MONO};width:16px;text-align:center;color:var(--dsw-alias-state-warn-primary)}
.ps-git-status.new{color:var(--dsw-alias-state-success-primary)}
.ps-git-status.del{color:var(--dsw-alias-state-error-primary)}
.ps-git-status.untracked{color:var(--dsw-alias-label-secondary)}
.ps-git-status.ren{color:var(--dsw-alias-brand-primary)}
.ps-git-path{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:rtl}
.ps-git-diff{max-height:340px;overflow:auto;margin:4px 0 0;padding:6px 8px;border:.5px solid var(--dsw-alias-border-l1);border-radius:6px;background:var(--dsw-alias-bg-base);font:10.5px/15px ${MONO};white-space:pre}
.ps-git-diff .add{color:var(--dsw-alias-state-success-primary)}
.ps-git-diff .del{color:var(--dsw-alias-state-error-primary)}
.ps-git-diff .hunk{color:var(--dsw-alias-brand-primary)}
.ps-toast{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);z-index:50;display:flex;align-items:center;gap:8px;max-width:min(520px,80%);padding:8px 12px;border-radius:9px;background:var(--dsw-alias-bg-overlay);border:.5px solid var(--dsw-alias-border-l2);box-shadow:0 8px 24px rgba(0,0,0,.22);font-size:12px;color:var(--dsw-alias-label-primary)}
.ps-toast.err{color:var(--dsw-alias-state-error-primary)}
.ps-spin{animation:ps-spin .9s linear infinite;transform-origin:50% 50%}
@keyframes ps-spin{to{transform:rotate(360deg)}}
.ps-dock{flex:none;display:flex;flex-direction:column;border-top:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);min-height:0}
.ps-dock-head{flex:none;display:flex;align-items:center;gap:2px;height:30px;padding:0 6px;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.ps-dock-head .ps-stage{font-size:11px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:44%}
.ps-split{position:relative;cursor:col-resize;background:transparent;z-index:5;touch-action:none}
.ps-split::after{content:"";position:absolute;inset:0 2px;border-radius:2px;background:transparent;transition:background .12s ease,inset .12s ease}
.ps-split:hover::after,.ps-split.dragging::after{inset:0 3px;background:var(--dsw-alias-brand-primary)}
.ps-split-h{flex:none;height:9px;cursor:row-resize;position:relative;z-index:6;touch-action:none}
.ps-split-h::after{content:"";position:absolute;inset:3px 0;border-radius:2px;background:transparent;transition:background .12s ease,inset .12s ease}
.ps-split-h:hover::after{inset:2px 0;background:var(--dsw-alias-brand-primary)}
body.ps-resizing{cursor:col-resize;user-select:none}
body.ps-resizing *{cursor:inherit!important}
.ps-term{flex:1;min-height:0;overflow:auto;margin:0;padding:6px 10px 14px;font:11.5px/16.5px ${MONO};color:var(--dsw-alias-label-secondary);white-space:pre-wrap;overflow-wrap:anywhere}
.ps-term-line{white-space:pre-wrap}
.ps-term-line.cmd{color:var(--dsw-alias-brand-primary);font-weight:500}
.ps-term-line.stage{color:var(--dsw-alias-label-primary);font-weight:600;margin-top:4px}
.ps-term-line.err{color:var(--dsw-alias-state-error-primary)}
.ps-term-empty{padding:14px 6px;font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.ps-problem .ps-sev{flex:none;font:600 9px/1 ${MONO};letter-spacing:.04em;text-transform:uppercase;padding:3px 5px;border-radius:4px;background:color-mix(in srgb,currentColor 14%,transparent);margin-top:1px}
.ps-problem.warn{color:var(--dsw-alias-state-warn-primary)}
.ps-problem.badbox{color:var(--dsw-alias-label-secondary)}
.ps-drawer-tab .ps-count.warn{background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 16%,transparent);color:var(--dsw-alias-state-warn-primary)}
.ps-ac{position:fixed;z-index:30;min-width:240px;max-width:min(440px,86%);max-height:212px;overflow:auto;background:var(--dsw-alias-bg-overlay);border:.5px solid var(--dsw-alias-border-l2);border-radius:8px;box-shadow:0 10px 28px rgba(0,0,0,.26);padding:4px}
.ps-ac-item{display:flex;align-items:center;gap:8px;width:100%;padding:4px 7px;border:0;border-radius:5px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;text-align:left;cursor:pointer;white-space:nowrap}
.ps-ac-item.active{background:var(--dsw-alias-bg-layer-2)}
.ps-ac-item .ps-ac-label{font-family:${MONO};font-size:12px;overflow:hidden;text-overflow:ellipsis}
.ps-ac-item .ps-ac-detail{margin-left:auto;font-size:10.5px;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;max-width:52%;padding-left:8px}
.ps-path-row{display:flex;align-items:center;gap:6px}
.ps-path-row .ps-input{flex:1;min-width:0}
.ps-browser{margin-top:2px;border:.5px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);overflow:hidden}
.ps-browser-head{display:flex;align-items:center;gap:4px;padding:4px 6px;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.ps-browser-path{flex:1;min-width:0;font:11px/1.4 ${MONO};color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:rtl;text-align:left}
.ps-browser-list{max-height:158px;overflow:auto;padding:3px}
.ps-browser-row{display:flex;align-items:center;gap:6px;width:100%;padding:3px 6px;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;text-align:left;cursor:pointer;white-space:nowrap}
.ps-browser-row:hover{background:var(--dsw-alias-bg-layer-2)}
.ps-browser-row svg{width:13px;height:13px;flex:none;color:var(--dsw-alias-label-secondary)}
.ps-browser-row .ps-browser-name{overflow:hidden;text-overflow:ellipsis}
.ps-browser-row .ps-browser-tag{margin-left:auto;font-size:10px;color:var(--dsw-alias-label-secondary);padding-left:8px}
.ps-browser-foot{display:flex;align-items:center;gap:6px;padding:4px 6px;border-top:.5px solid var(--dsw-alias-border-l1)}
.ps-browser-empty{padding:10px 8px;font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.ps-color-group{display:flex;flex-direction:column;gap:5px}
.ps-color-group h3{margin:8px 0 2px;font-size:10.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--dsw-alias-label-secondary)}
.ps-color-row{display:flex;align-items:center;gap:9px;font-size:12px}
.ps-color-row input[type=color]{width:34px;height:22px;padding:0;border:.5px solid var(--dsw-alias-border-l2);border-radius:5px;background:transparent;cursor:pointer}
.ps-color-label{flex:1;min-width:0}
.ps-color-value{font:11px/1 ${MONO};color:var(--dsw-alias-label-secondary)}
.ps-check-row{display:flex;align-items:center;gap:8px;font-size:12px;cursor:pointer}
.ps-field-row{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;padding:3px 0}
.ps-field-row .ps-select{min-width:84px}
.ps-git-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.ps-badge{display:inline-flex;align-items:center;gap:4px;padding:1px 6px;border-radius:9px;border:.5px solid var(--dsw-alias-border-l2);font-size:10.5px;color:var(--dsw-alias-label-secondary)}
@media (max-width: 1080px){.ps-hide-narrow{display:none}}
`;

    // -- icons -------------------------------------------------------------
    const svg = (children, extra) => h("svg", {
      viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7,
      strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", ...extra,
    }, children);
    const Icon = {
      logo: () => svg([
        h("path", { key: 1, d: "M6 3.5h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1z" }),
        h("path", { key: 2, d: "M14 3.5v4h4" }),
        h("path", { key: 3, d: "M9 12h6M9 15.5h6" }),
        h("path", { key: 4, d: "M9 8.5h2" }),
      ]),
      chevron: (extra) => svg([h("path", { key: 1, d: "M9 6l6 6-6 6" })], extra),
      folder: (extra) => svg([h("path", { key: 1, d: "M3.5 7.5a2 2 0 0 1 2-2h3l1.7 2h8.3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" })], extra),
      file: (extra) => svg([
        h("path", { key: 1, d: "M13.5 3.5H7a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" }),
        h("path", { key: 2, d: "M13.5 3.5V8H18" }),
      ], extra),
      plus: (extra) => svg([h("path", { key: 1, d: "M12 5v14M5 12h14" })], extra),
      refresh: (extra) => svg([
        h("path", { key: 1, d: "M20 11a8 8 0 1 0-2.3 6.4" }),
        h("path", { key: 2, d: "M20 5v6h-6" }),
      ], extra),
      play: (extra) => svg([h("path", { key: 1, d: "M8 5.5l11 6.5-11 6.5z" })], extra),
      pdf: (extra) => svg([
        h("path", { key: 1, d: "M13.5 3.5H7a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" }),
        h("path", { key: 2, d: "M9 13.5h1.5a1.5 1.5 0 0 1 0 3H9v2" }),
        h("path", { key: 3, d: "M14 13.5v5h1.2a2.5 2.5 0 0 0 0-5z" }),
      ], extra),
      gear: (extra) => svg([
        h("circle", { key: 1, cx: 12, cy: 12, r: 3 }),
        h("path", { key: 2, d: "M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" }),
      ], extra),
      close: (extra) => svg([h("path", { key: 1, d: "M6 6l12 12M18 6L6 18" })], extra),
      external: (extra) => svg([
        h("path", { key: 1, d: "M14 4h6v6" }),
        h("path", { key: 2, d: "M20 4l-9 9" }),
        h("path", { key: 3, d: "M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" }),
      ], extra),
      git: (extra) => svg([
        h("circle", { key: 1, cx: 7, cy: 6, r: 2.2 }),
        h("circle", { key: 2, cx: 7, cy: 18, r: 2.2 }),
        h("circle", { key: 3, cx: 17, cy: 8, r: 2.2 }),
        h("path", { key: 4, d: "M7 8.2v7.6M17 10.2c0 3.2-3.2 4.8-6.4 5.6" }),
      ], extra),
      pencil: (extra) => svg([
        h("path", { key: 1, d: "M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z" }),
        h("path", { key: 2, d: "M14 6.5l3.5 3.5" }),
      ], extra),
      trash: (extra) => svg([
        h("path", { key: 1, d: "M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" }),
        h("path", { key: 2, d: "M6.5 7l.8 12a1 1 0 0 0 1 .9h7.4a1 1 0 0 0 1-.9L17.5 7" }),
        h("path", { key: 3, d: "M10.5 11v5M13.5 11v5" }),
      ], extra),
      check: (extra) => svg([h("path", { key: 1, d: "M4.5 12.5l5 5 10-11" })], extra),
      alert: (extra) => svg([
        h("path", { key: 1, d: "M12 4l9 16H3z" }),
        h("path", { key: 2, d: "M12 10v4M12 17v.5" }),
      ], extra),
      panels: (extra) => svg([
        h("rect", { key: 1, x: 3.5, y: 4.5, width: 17, height: 15, rx: 2 }),
        h("path", { key: 2, d: "M9.5 4.5v15" }),
      ], extra),
      filePdf: (extra) => svg([
        h("path", { key: 1, d: "M13.5 3.5H7a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" }),
        h("path", { key: 2, d: "M13.5 3.5V8H18" }),
      ], extra),
      palette: (extra) => svg([
        h("path", { key: 1, d: "M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.7 1.8-1.7h1.3a4.6 4.6 0 0 0 4.6-4.6c0-3.7-3.8-6.6-8.5-6.6z" }),
        h("circle", { key: 2, cx: 8, cy: 10.4, r: 1.1 }),
        h("circle", { key: 3, cx: 12, cy: 7.6, r: 1.1 }),
        h("circle", { key: 4, cx: 15.8, cy: 10.2, r: 1.1 }),
      ], extra),
      fetch: (extra) => svg([
        h("path", { key: 1, d: "M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17.2 9.6 3.7 3.7 0 0 1 17 18h-1" }),
        h("path", { key: 2, d: "M12 11.5v7" }),
        h("path", { key: 3, d: "M9.2 15.5L12 18.3l2.8-2.8" }),
      ], extra),
      pull: (extra) => svg([
        h("path", { key: 1, d: "M12 4v10" }),
        h("path", { key: 2, d: "M8.2 10.2L12 14l3.8-3.8" }),
        h("path", { key: 3, d: "M4.5 19.5h15" }),
      ], extra),
      push: (extra) => svg([
        h("path", { key: 1, d: "M12 19.5V9" }),
        h("path", { key: 2, d: "M8.2 12.8L12 9l3.8 3.8" }),
        h("path", { key: 3, d: "M4.5 4.5h15" }),
      ], extra),
      bomb: (extra) => svg([
        h("path", { key: 1, d: "M12 9.4L6.4 3.2h11.2z", fill: "currentColor", stroke: "none" }),
        h("path", { key: 2, d: "M12 9.4L6.4 3.2h11.2z", fill: "currentColor", stroke: "none", transform: "rotate(120 12 12)" }),
        h("path", { key: 3, d: "M12 9.4L6.4 3.2h11.2z", fill: "currentColor", stroke: "none", transform: "rotate(240 12 12)" }),
        h("circle", { key: 4, cx: 12, cy: 12, r: 2.6, fill: "currentColor", stroke: "none" }),
      ], extra),
      save: (extra) => svg([
        h("path", { key: 1, d: "M5 4.5h11l3 3v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1z" }),
        h("path", { key: 2, d: "M8 4.5v5h7v-5" }),
        h("path", { key: 3, d: "M8 14.5h8v6H8z" }),
      ], extra),
      terminal: (extra) => svg([
        h("rect", { key: 1, x: 3.5, y: 4.5, width: 17, height: 15, rx: 2 }),
        h("path", { key: 2, d: "M7.5 9.5l2.5 2.5-2.5 2.5" }),
        h("path", { key: 3, d: "M12.5 15h4" }),
      ], extra),
    };

    // -- helpers -----------------------------------------------------------
    function fmt(template, vars) {
      return String(template).replace(/\{(\w+)\}/gu, (match, key) => (vars && Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match));
    }

    function route() {
      return (window.__DSH_PAPER_STUDIO__ && window.__DSH_PAPER_STUDIO__.route) || "/paper-studio/api";
    }

    function token() {
      return (window.__DSH_PAPER_STUDIO__ && window.__DSH_PAPER_STUDIO__.token) || "";
    }

    function apiUrl(action, params) {
      const url = new URL(`${route()}/${action}`, window.location.origin);
      url.searchParams.set("t", token());
      for (const [key, value] of Object.entries(params || {})) {
        if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
      }
      return url.toString();
    }

    async function request(action, options) {
      const { method = "GET", query, body } = options || {};
      const url = new URL(`${route()}/${action}`, window.location.origin);
      if (query) {
        for (const [key, value] of Object.entries(query)) {
          if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
        }
      }
      const headers = { "x-paper-token": token() };
      if (body !== undefined) headers["content-type"] = "application/json";
      const response = await fetch(url, {
        method,
        headers,
        credentials: "same-origin",
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(payload.error || `${response.status} ${response.statusText}`);
        error.status = response.status;
        error.payload = payload;
        throw error;
      }
      return payload;
    }

    const SYNTAX_KEY = "dsh.paper-studio.syntax";
    const DEFAULT_SYNTAX = {
      command: "#8b5cf6",
      environment: "#d97706",
      math: "#059669",
      comment: "#94a3b8",
      brace: "#94a3b8",
      bgFigure: "#3b82f6",
      bgMath: "#10b981",
      bgTable: "#f59e0b",
      bgTheorem: "#8b5cf6",
      bgCode: "#6b7280",
      backgrounds: true,
      currentLine: true,
      currentLineColor: "#8b5cf6",
      diffGutter: "git",
      spellcheck: false,
      spellLang: "en_US",
      wrap: false,
      autoCompile: false,
      compileOnSave: true,
      autosave: true,
      autosaveDelay: 850,
      thinking: "last",
      diagnostics: false,
      vim: false,
      keys: {
        save: "mod+s",
        bold: "mod+b",
        italic: "mod+i",
        underline: "mod+u",
        undo: "mod+z",
        redo: "mod+shift+z",
      },
    };

    /** Manual saves compile when enabled; autosaves use the autoCompile toggle. */
    function shouldCompileAfterSave({ manual, compileOnSave, autoCompile }) {
      return manual ? Boolean(compileOnSave) : Boolean(autoCompile);
    }

    function agentMarkdownTemplate() {
      return "---\nname: New agent\ndescription: What this agent is for\nmodel: \nreadFiles: ask\nweb: ask\n---\n\nYou are a careful academic writing assistant. Be concise, quote the relevant text, and propose concrete rewrites.\n";
    }

    function slugifyAgent(name) {
      return String(name ?? "").toLowerCase().normalize("NFKD")
        .replace(/[^a-z0-9]+/gu, "-").replace(/^-+|-+$/gu, "").slice(0, 64) || "agent";
    }

    function readSyntax() {
      try {
        const raw = window.localStorage.getItem(SYNTAX_KEY);
        if (!raw) return { ...DEFAULT_SYNTAX };
        const stored = JSON.parse(raw);
        return { ...DEFAULT_SYNTAX, ...stored, keys: { ...DEFAULT_SYNTAX.keys, ...(stored.keys || {}) } };
      } catch {
        return { ...DEFAULT_SYNTAX };
      }
    }
    function writeSyntax(value) {
      try {
        window.localStorage.setItem(SYNTAX_KEY, JSON.stringify(value));
      } catch {
        // Preferences are best-effort; the editor still works without storage.
      }
    }
    function tint(hex, alpha) {
      const raw = String(hex || "").replace(/^#/u, "");
      const full = raw.length === 3 ? raw.split("").map((part) => part + part).join("") : raw;
      if (!/^[0-9a-f]{6}$/iu.test(full)) return `rgba(139, 92, 246, ${alpha})`;
      const red = Number.parseInt(full.slice(0, 2), 16);
      const green = Number.parseInt(full.slice(2, 4), 16);
      const blue = Number.parseInt(full.slice(4, 6), 16);
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
    function syntaxVariables(syntax) {
      return {
        "--ps-hl-command": syntax.command,
        "--ps-hl-env": syntax.environment,
        "--ps-hl-math": syntax.math,
        "--ps-hl-comment": syntax.comment,
        "--ps-hl-brace": syntax.brace,
        "--ps-bg-figure": tint(syntax.bgFigure, 0.12),
        "--ps-bg-math": tint(syntax.bgMath, 0.12),
        "--ps-bg-table": tint(syntax.bgTable, 0.12),
        "--ps-bg-theorem": tint(syntax.bgTheorem, 0.12),
        "--ps-bg-code": tint(syntax.bgCode, 0.14),
        "--ps-current-line": tint(syntax.currentLineColor, 0.85),
      };
    }

    /** "mod+shift+z" from a keyboard event, or null for a bare modifier press. */
    function bindingFromEvent(event) {
      const key = String(event.key || "").toLowerCase();
      if (["control", "meta", "shift", "alt"].includes(key)) return null;
      const parts = [];
      if (event.ctrlKey || event.metaKey) parts.push("mod");
      if (event.altKey) parts.push("alt");
      if (event.shiftKey) parts.push("shift");
      parts.push(key === " " ? "space" : key);
      return parts.join("+");
    }

    function matchesBinding(event, binding) {
      if (!binding) return false;
      const parts = String(binding).toLowerCase().split("+");
      const key = parts[parts.length - 1];
      const wantsMod = parts.includes("mod");
      const wantsShift = parts.includes("shift");
      const wantsAlt = parts.includes("alt");
      if (Boolean(event.ctrlKey || event.metaKey) !== wantsMod) return false;
      if (Boolean(event.altKey) !== wantsAlt) return false;
      if (Boolean(event.shiftKey) !== wantsShift) return false;
      return String(event.key || "").toLowerCase() === key;
    }

    const UI_KEY = "dsh.paper-studio.ui";
    function readUi() {
      try {
        const raw = window.localStorage.getItem(UI_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    }
    function writeUi(value) {
      try {
        window.localStorage.setItem(UI_KEY, JSON.stringify(value));
      } catch {
        // Storage can be unavailable in restricted contexts; the registry is on the host.
      }
    }

    function dirnameOf(path) {
      const index = path.lastIndexOf("/");
      return index === -1 ? "" : path.slice(0, index);
    }
    function basenameOf(path) {
      const index = path.lastIndexOf("/");
      return index === -1 ? path : path.slice(index + 1);
    }
    function extOf(name) {
      const index = name.lastIndexOf(".");
      return index <= 0 ? "" : name.slice(index + 1).toLowerCase();
    }
    const CHIPS = { tex: "TEX", bib: "BIB", cls: "CLS", sty: "STY", pdf: "PDF", png: "IMG", jpg: "IMG", jpeg: "IMG", gif: "IMG", svg: "IMG", eps: "EPS", md: "MD", txt: "TXT", json: "JSON", yaml: "YML", yml: "YML", py: "PY", csv: "CSV", sh: "SH", "": "FILE" };
    function chipOf(name) {
      const ext = extOf(name);
      const label = CHIPS[ext] ?? ext.slice(0, 4).toUpperCase();
      const group = ["tex"].includes(ext) ? "tex" : ["bib"].includes(ext) ? "bib" : ["pdf"].includes(ext) ? "pdf" : ["png", "jpg", "jpeg", "gif", "svg", "eps"].includes(ext) ? "img" : "";
      return { label, group };
    }
    function formatDuration(ms) {
      if (!Number.isFinite(ms) || ms <= 0) return "—";
      return ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(1)} s`;
    }
    function timeLabel(date) {
      try {
        return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      } catch {
        return "";
      }
    }

    // -- presentational pieces ---------------------------------------------
    function PanelIcon(props) {
      const size = props && props.size ? props.size : 18;
      return h("span", { style: { display: "inline-flex", width: size, height: size } }, h(Icon.logo, { width: size, height: size }));
    }

    function Modal(props) {
      const { title, onClose, children, footer } = props;
      const bodyRef = useRef(null);
      useEffect(() => {
        const first = bodyRef.current && bodyRef.current.querySelector("input, textarea, select, button");
        if (first && typeof first.focus === "function") first.focus();
      }, []);
      return h("div", {
        className: "ps-backdrop",
        onMouseDown: (event) => { if (event.target === event.currentTarget) onClose(); },
      },
      h("div", { className: "ps-modal", role: "dialog", "aria-modal": "true", "aria-label": title },
        h("div", { className: "ps-modal-head" },
          h("h2", { className: "ps-modal-title" }, title),
          h("button", { className: "ps-btn icon", type: "button", onClick: onClose, "aria-label": "close" }, h(Icon.close))),
        h("div", { className: "ps-modal-body", ref: bodyRef }, children),
        footer ? h("div", { className: "ps-modal-foot" }, footer) : null));
    }

    function EmptyState(props) {
      return h("div", { className: "ps-empty" },
        h("div", { className: "ps-empty-icon" }, h(props.icon || Icon.file)),
        h("h2", null, props.title),
        props.body ? h("p", null, props.body) : null,
        props.children ? h("div", { className: "ps-empty-actions" }, props.children) : null);
    }

    // -- editor helpers ----------------------------------------------------

    const MAX_HIGHLIGHT_CHARS = 300_000;

    function escapeHtml(text) {
      return String(text).replace(/[&<>"]/gu, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character]));
    }

    /** Environment families that get their own background band. */
    const ENV_CATEGORIES = new Map();
    for (const [category, names] of Object.entries({
      figure: ["figure", "figure*", "subfigure", "wrapfigure", "sidewaysfigure"],
      math: ["equation", "equation*", "align", "align*", "alignat", "alignat*", "gather", "gather*", "multline", "multline*", "eqnarray", "eqnarray*", "displaymath", "math", "split", "cases"],
      table: ["table", "table*", "tabular", "tabularx", "longtable", "supertabular"],
      theorem: ["theorem", "lemma", "proof", "definition", "corollary", "proposition", "remark", "example"],
      code: ["verbatim", "verbatim*", "lstlisting", "minted"],
    })) {
      for (const name of names) ENV_CATEGORIES.set(name, category);
    }

    function envCategory(name) {
      return ENV_CATEGORIES.get(String(name || "").trim()) || null;
    }

    /**
     * Line-oriented LaTeX highlighter. Returns one entry per source line so the
     * editor can paint a background band for the environment and a box around
     * the cursor line; each entry carries ready HTML for the tokens.
     */
    const HIGHLIGHT_CACHE = new Map();
    const HIGHLIGHT_CACHE_LIMIT = 20_000;

    function highlightLines(source, misspelled) {
      const text = String(source ?? "");
      if (text.length > MAX_HIGHLIGHT_CHARS) {
        // Very large files stay plain so typing never waits for the tokenizer.
        return text.split("\n").map((line) => ({ html: escapeHtml(line), bg: null }));
      }
      const lines = text.split("\n");
      const stack = [];
      let mathBlock = false;
      const result = [];
      for (const line of lines) {
        const stateKey = `${stack.join(">")}|${mathBlock ? 1 : 0}`;
        const cacheKey = (!misspelled || misspelled.size === 0) ? `${stateKey}\u0000${line}` : null;
        const cached = cacheKey ? HIGHLIGHT_CACHE.get(cacheKey) : null;
        if (cached) {
          result.push({ html: cached.html, bg: cached.bg });
          stack.length = 0;
          stack.push(...cached.stack);
          mathBlock = cached.math;
          continue;
        }
        let html = "";
        let index = 0;
        let category = stack.length > 0 ? envCategory(stack[stack.length - 1]) : null;
        if (!category && mathBlock) category = "math";
        let popAtEnd = false;
        const emit = (text, cls) => {
          if (!text) return;
          html += cls ? `<span class="${cls}">${escapeHtml(text)}</span>` : escapeHtml(text);
        };
        const emitPlain = (text) => {
          if (!text) return;
          if (!misspelled || misspelled.size === 0) {
            emit(text);
            return;
          }
          // Only plain prose is spell-checked; commands, math and comments are not.
          for (const part of text.split(/([\p{L}][\p{L}'\u2019-]*)/gu)) {
            if (part.length === 0) continue;
            if (/^\p{L}/u.test(part) && misspelled.has(part.toLowerCase())) emit(part, "ps-hl-misspell");
            else emit(part);
          }
        };
        while (index < line.length) {
          const character = line[index];
          if (character === "%") {
            emit(line.slice(index), "ps-hl-comment");
            index = line.length;
            continue;
          }
          if (character === "$") {
            const double = line[index + 1] === "$";
            const close = double ? "$$" : "$";
            let stop = line.indexOf(close, index + close.length);
            while (stop !== -1 && line[stop - 1] === "\\") stop = line.indexOf(close, stop + 1);
            if (stop === -1) {
              emit(line.slice(index), "ps-hl-math");
              if (double) mathBlock = !mathBlock;
              index = line.length;
              continue;
            }
            emit(line.slice(index, stop + close.length), "ps-hl-math");
            index = stop + close.length;
            continue;
          }
          if (character === "\\") {
            const next = line[index + 1];
            if (next === "[" || next === "(") {
              const close = next === "[" ? "\\]" : "\\)";
              const stop = line.indexOf(close, index + 2);
              if (stop === -1) {
                emit(line.slice(index), "ps-hl-math");
                mathBlock = true;
                index = line.length;
                continue;
              }
              emit(line.slice(index, stop + close.length), "ps-hl-math");
              index = stop + close.length;
              continue;
            }
            if (mathBlock && (next === "]" || next === ")")) {
              emit(line.slice(index, index + 2), "ps-hl-math");
              mathBlock = false;
              index += 2;
              continue;
            }
            const match = /^\\(?:[a-zA-Z@]+\*?|.)/u.exec(line.slice(index));
            const token = match ? match[0] : "\\";
            emit(token, "ps-hl-cmd");
            if (token === "\\begin" || token === "\\end") {
              const rest = line.slice(index + token.length);
              const envMatch = /^\s*(?:\[[^\]]*\]\s*)?\{([^{}]+)\}/u.exec(rest);
              if (envMatch) {
                const whole = envMatch[0];
                const bracePos = whole.indexOf("{");
                emit(whole.slice(0, bracePos), null);
                emit("{", "ps-hl-brace");
                emit(envMatch[1], "ps-hl-env");
                emit("}", "ps-hl-brace");
                index += token.length + whole.length;
                if (token === "\\begin") {
                  stack.push(envMatch[1]);
                  if (!category) category = envCategory(envMatch[1]);
                } else {
                  popAtEnd = true;
                }
                continue;
              }
            }
            index += token.length;
            continue;
          }
          if (character === "{" || character === "}") {
            emit(character, "ps-hl-brace");
            index += 1;
            continue;
          }
          let stop = index + 1;
          while (stop < line.length && "\\$%{}".indexOf(line[stop]) === -1) stop += 1;
          emitPlain(line.slice(index, stop));
          index = stop;
        }
        if (mathBlock && !category) category = "math";
        if (popAtEnd) stack.pop();
        result.push({ html, bg: category });
        if (cacheKey) {
          HIGHLIGHT_CACHE.set(cacheKey, { html, bg: category, stack: stack.slice(), math: mathBlock });
          if (HIGHLIGHT_CACHE.size > HIGHLIGHT_CACHE_LIMIT) HIGHLIGHT_CACHE.delete(HIGHLIGHT_CACHE.keys().next().value);
        }
      }
      return result;
    }

    /** Flat HTML variant, kept for tests and simple rendering. */
    function highlightLatex(source, misspelled) {
      return highlightLines(source, misspelled).map((line) => line.html).join("\n");
    }

    const COMPLETION_COMMANDS = [
      "documentclass", "usepackage", "RequirePackage", "begin", "end", "section", "subsection", "subsubsection",
      "paragraph", "chapter", "part", "title", "author", "date", "thanks", "maketitle", "abstract", "tableofcontents",
      "label", "ref", "eqref", "autoref", "cref", "Cref", "pageref", "nameref", "cite", "citep", "citet", "citealp",
      "citeauthor", "citeyear", "parencite", "textcite", "autocite", "footnote", "emph", "textbf", "textit", "texttt",
      "textsc", "textsuperscript", "textsubscript", "underline", "url", "href", "includegraphics", "caption", "item",
      "centering", "raggedright", "noindent", "par", "newpage", "clearpage", "vspace", "hspace", "hfill", "vfill",
      "quad", "qquad", "frac", "dfrac", "tfrac", "sqrt", "sum", "prod", "int", "partial", "nabla", "times", "cdot",
      "leq", "geq", "neq", "approx", "infty", "alpha", "beta", "gamma", "delta", "epsilon", "theta", "lambda", "mu",
      "pi", "sigma", "tau", "phi", "omega", "Gamma", "Delta", "Theta", "Lambda", "Sigma", "Phi", "Omega",
      "hline", "toprule", "midrule", "bottomrule", "multicolumn", "multirow", "bibliography", "bibliographystyle",
      "input", "include", "includeonly", "graphicspath", "setlength", "renewcommand", "newcommand", "def",
      "textbf", "mathcal", "mathbb", "mathrm", "mathbf", "text", "operatorname", "left", "right", "nonumber",
      "notag", "tag", "intertext", "shortintertext", "displaystyle", "limits", "overset", "underset",
    ];
    const COMPLETION_ENVIRONMENTS = [
      "document", "abstract", "equation", "equation*", "align", "align*", "gather", "gather*", "multline",
      "multline*", "split", "cases", "matrix", "pmatrix", "bmatrix", "vmatrix", "itemize", "enumerate",
      "description", "figure", "figure*", "table", "table*", "tabular", "tabularx", "center", "flushleft",
      "flushright", "verbatim", "quote", "quotation", "minipage", "theorem", "lemma", "proposition",
      "corollary", "definition", "proof", "remark", "example", "algorithm", "algorithmic", "lstlisting",
      "minted", "tikzpicture", "axis",
    ];
    const COMPLETION_PACKAGES = [
      "amsmath", "amssymb", "amsthm", "mathtools", "graphicx", "booktabs", "geometry", "hyperref", "microtype",
      "natbib", "biblatex", "cite", "xcolor", "tikz", "pgfplots", "siunitx", "cleveref", "subcaption",
      "multirow", "longtable", "algorithm", "algorithmicx", "algpseudocode", "listings", "minted", "setspace",
      "caption", "float", "enumitem", "fontenc", "inputenc", "babel", "csquotes", "url", "mathrsfs", "physics",
      "parskip", "tocloft", "titlesec", "fancyhdr", "xspace", "lmodern", "textcomp", "array", "tabularx",
    ];

    /** Argument shapes for common commands: `{}` required, `[]{}` optional + required. */
    const COMMAND_ARGUMENTS = {
      section: "{}", subsection: "{}", subsubsection: "{}", paragraph: "{}", chapter: "{}", part: "{}",
      label: "{}", ref: "{}", eqref: "{}", autoref: "{}", cref: "{}", pageref: "{}", nameref: "{}",
      cite: "{}", citep: "{}", citet: "{}", parencite: "{}", textcite: "{}", autocite: "{}",
      usepackage: "{}", documentclass: "{}", input: "{}", include: "{}", bibliography: "{}",
      footnote: "{}", emph: "{}", textbf: "{}", textit: "{}", texttt: "{}", textsc: "{}", url: "{}", href: "{}",
      caption: "{}", title: "{}", author: "{}", date: "{}", begin: "{}", end: "{}",
      includegraphics: "[]{}",
    };

    /** Whole-block snippets; `<>` marks where the caret lands. */
    const ENV_SNIPPETS = {
      figure: "\\begin{figure}\n  \\centering\n  \\includegraphics[width=0.5\\linewidth]{<>}\n  \\caption{Caption}\n  \\label{fig:placeholder}\n\\end{figure}",
      table: "\\begin{table}\n  \\centering\n  \\begin{tabular}{cc}\n    <> & \\\\\n  \\end{tabular}\n  \\caption{Caption}\n  \\label{tab:placeholder}\n\\end{table}",
      itemize: "\\begin{itemize}\n  \\item <>\n\\end{itemize}",
      enumerate: "\\begin{enumerate}\n  \\item <>\n\\end{enumerate}",
      equation: "\\begin{equation}\n  <>\n  \\label{eq:placeholder}\n\\end{equation}",
      align: "\\begin{align}\n  <> &= \n\\end{align}",
      theorem: "\\begin{theorem}\n  <>\n\\end{theorem}",
      proof: "\\begin{proof}\n  <>\n\\end{proof}",
      abstract: "\\begin{abstract}\n  <>\n\\end{abstract}",
      tikzpicture: "\\begin{tikzpicture}\n  <>\n\\end{tikzpicture}",
    };

    function environmentSnippet(name) {
      const raw = ENV_SNIPPETS[name];
      if (!raw) return null;
      const caret = raw.indexOf("<>");
      return { text: raw.replace("<>", ""), caret: caret >= 0 ? caret : 0 };
    }

    const CITE_COMMANDS = /^(?:cite|citep|citet|citealp|citeauthor|citeyear|parencite|textcite|autocite|footcite|nocite)\*?$/u;
    const REF_COMMANDS = /^(?:ref|eqref|autoref|cref|Cref|pageref|nameref|labelcref|vref)$/u;

    const BRACKET_PAIRS = { "{": "}", "[": "]", "(": ")" };
    const BRACKET_OPEN = new Set(Object.keys(BRACKET_PAIRS));
    const BRACKET_CLOSE = new Set(Object.values(BRACKET_PAIRS));

    function bracketEscaped(text, index) {
      let count = 0;
      for (let cursor = index - 1; cursor >= 0 && text[cursor] === "\\"; cursor -= 1) count += 1;
      return count % 2 === 1;
    }

    /** Bracket pair around the caret, preferring the character just before it. */
    function bracketMatch(text, position) {
      if (typeof text !== "string" || text.length === 0) return null;
      const at = Math.max(0, Math.min(text.length, Number(position) || 0));
      const isBracket = (index) => index >= 0 && index < text.length
        && (BRACKET_OPEN.has(text[index]) || BRACKET_CLOSE.has(text[index]))
        && !bracketEscaped(text, index);
      let index = -1;
      if (at > 0 && isBracket(at - 1)) index = at - 1;
      else if (isBracket(at)) index = at;
      if (index < 0) return null;
      const char = text[index];
      const open = BRACKET_OPEN.has(char);
      const target = open ? BRACKET_PAIRS[char] : Object.keys(BRACKET_PAIRS).find((key) => BRACKET_PAIRS[key] === char);
      const step = open ? 1 : -1;
      let depth = 0;
      let steps = 0;
      for (let cursor = index; cursor >= 0 && cursor < text.length; cursor += step) {
        if (++steps > 4000) return null;
        if (bracketEscaped(text, cursor)) continue;
        if (text[cursor] === char) depth += 1;
        else if (text[cursor] === target) {
          depth -= 1;
          if (depth === 0) return open ? { open: index, close: cursor } : { open: cursor, close: index };
        }
      }
      return { open: open ? index : -1, close: open ? -1 : index };
    }

    const VIM_WORD = /[\p{L}\p{N}_]/u;

    function vimCharClass(character) {
      if (character === "\n" || /\s/u.test(character)) return "space";
      return VIM_WORD.test(character) ? "word" : "punct";
    }

    function vimWordRange(text, position) {
      if (text.length === 0) return null;
      let index = Math.min(Math.max(0, position), text.length - 1);
      if (/\s/u.test(text[index]) && index > 0 && !/\s/u.test(text[index - 1])) index -= 1;
      if (text[index] === "\n") {
        if (index > 0 && text[index - 1] !== "\n") index -= 1;
        else if (index + 1 < text.length && text[index + 1] !== "\n") index += 1;
        else return null;
      }
      const kind = vimCharClass(text[index]);
      let start = index;
      let end = index;
      if (kind === "space") {
        while (start > 0 && text[start - 1] !== "\n" && /\s/u.test(text[start - 1])) start -= 1;
        while (end + 1 < text.length && /\s/u.test(text[end + 1])) end += 1;
        return { start, end: end + 1 };
      }
      while (start > 0 && text[start - 1] !== "\n" && vimCharClass(text[start - 1]) === kind) start -= 1;
      while (end + 1 < text.length && text[end + 1] !== "\n" && vimCharClass(text[end + 1]) === kind) end += 1;
      return { start, end: end + 1 };
    }

    function vimEnclosing(text, position, open, close) {
      const limit = Math.min(Math.max(0, position), text.length - 1);
      let depth = 0;
      for (let index = limit; index >= 0; index -= 1) {
        if (bracketEscaped(text, index)) continue;
        if (text[index] === close) depth += 1;
        else if (text[index] === open) {
          if (depth === 0) {
            const pair = bracketMatch(text, index);
            return pair && pair.close >= 0 ? { start: index, end: pair.close + 1 } : null;
          }
          depth -= 1;
        }
      }
      return null;
    }

    function vimQuotes(text, position, quote) {
      const limit = Math.min(Math.max(0, position), text.length - 1);
      let start = -1;
      for (let index = limit; index >= 0 && text[index] !== "\n"; index -= 1) {
        if (text[index] === quote && !bracketEscaped(text, index)) { start = index; break; }
      }
      if (start < 0) return null;
      for (let index = start + 1; index < text.length && text[index] !== "\n"; index += 1) {
        if (text[index] === quote && !bracketEscaped(text, index)) return { start, end: index + 1 };
      }
      return null;
    }

    /** Vim text object: `iw`, `aw`, `i(`, `a{`, `i"`, … */
    function vimTextObject(text, position, around, object) {
      let range = null;
      if (object === "w" || object === "W") {
        range = vimWordRange(text, position);
        if (!range) return null;
        if (!around) return range;
        let start = range.start;
        let end = range.end;
        while (end < text.length && /[ \t]/u.test(text[end])) end += 1;
        if (end === range.end) {
          while (start > 0 && /[ \t]/u.test(text[start - 1])) start -= 1;
        }
        return { start, end };
      }
      const closers = { "(": ")", ")": ")", b: ")", "[": "]", "]": "]", "{": "}", "}": "}", B: "}" };
      if (closers[object]) {
        const close = closers[object];
        const open = close === ")" ? "(" : close === "]" ? "[" : "{";
        range = vimEnclosing(text, position, open, close);
      } else if (object === '"' || object === "'" || object === "`") {
        range = vimQuotes(text, position, object);
      }
      if (!range) return null;
      if (around) return range;
      return { start: range.start + 1, end: Math.max(range.start + 1, range.end - 1) };
    }

    let monoMetric = null;
    function measureMono(font) {
      if (monoMetric && monoMetric.font === font) return monoMetric.width;
      let width = 7.8;
      try {
        const context = document.createElement("canvas").getContext("2d");
        context.font = font;
        const measured = context.measureText("MMMMMMMMMMMMMMMMMMMM").width / 20;
        if (measured > 0) width = measured;
      } catch {
        // No canvas: the monospace fallback above is close enough for anchoring.
      }
      monoMetric = { font, width };
      return width;
    }

    /**
     * Content-relative caret geometry, measured with a hidden mirror so wrapped
     * lines and tabs are exact. Returned coordinates exclude scroll offsets.
     */
    function caretCoordinates(textarea, position, wrap) {
      if (!textarea || !textarea.isConnected) return { left: 0, top: 0, width: 8, height: 20 };
      const style = window.getComputedStyle(textarea);
      const mirror = document.createElement("div");
      for (const property of [
        "fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "lineHeight",
        "textTransform", "textIndent", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
        "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
      ]) {
        mirror.style[property] = style[property];
      }
      mirror.style.position = "fixed";
      mirror.style.visibility = "hidden";
      mirror.style.top = "0";
      mirror.style.left = "-10000px";
      mirror.style.boxSizing = "border-box";
      mirror.style.width = `${textarea.clientWidth}px`;
      mirror.style.whiteSpace = wrap ? "pre-wrap" : "pre";
      mirror.style.overflowWrap = wrap ? "anywhere" : "normal";
      mirror.style.tabSize = "2";
      mirror.style.pointerEvents = "none";
      mirror.textContent = textarea.value.slice(0, Math.max(0, Math.min(position, textarea.value.length)));
      const marker = document.createElement("span");
      marker.textContent = "\u200b";
      mirror.appendChild(marker);
      // Appending to <body> keeps the mirror out of the editor's scroll box, so
      // measuring cannot trigger scroll anchoring or layout shifts.
      document.body.appendChild(mirror);
      const left = marker.offsetLeft;
      const top = marker.offsetTop;
      mirror.remove();
      const height = Number.parseFloat(style.lineHeight) || 20;
      const width = measureMono(style.font || `${style.fontSize} ${style.fontFamily}`);
      return { left, top, width, height };
    }

    /** Popup anchor in the code wrapper's coordinates, from the caret's line/column. */
    function caretPoint(textarea, position) {
      const before = textarea.value.slice(0, position);
      const line = before.split("\n").length - 1;
      const column = position - before.lastIndexOf("\n") - 1;
      const style = window.getComputedStyle(textarea);
      const lineHeight = Number.parseFloat(style.lineHeight) || 20;
      const padTop = Number.parseFloat(style.paddingTop) || 8;
      const padLeft = Number.parseFloat(style.paddingLeft) || 10;
      const font = style.font || `${style.fontSize} ${style.fontFamily}`;
      return {
        x: padLeft + column * measureMono(font) - textarea.scrollLeft,
        y: padTop + (line + 1) * lineHeight - textarea.scrollTop,
      };
    }

    /** What is being completed at `position`, if anything. */
    function completionContext(text, position) {
      const before = text.slice(0, position);
      const brace = /\\([a-zA-Z@]+\*?)\s*(?:\[[^\]]*\]\s*)?\{([^{}]*)$/u.exec(before);
      if (brace) {
        const command = brace[1];
        const query = brace[2];
        const start = position - query.length;
        if (CITE_COMMANDS.test(command)) {
          const lastComma = query.lastIndexOf(",");
          const segment = query.slice(lastComma + 1);
          const leading = segment.length - segment.replace(/^\s+/u, "").length;
          return { kind: "citation", query: segment.trim(), start: position - segment.length + leading, end: position };
        }
        if (REF_COMMANDS.test(command)) return { kind: "label", query, start, end: position };
        if (command === "begin" || command === "end") return { kind: "environment", query, start, end: position };
        if (command === "usepackage" || command === "documentclass" || command === "RequirePackage") return { kind: "package", query, start, end: position };
        if (command === "includegraphics") return { kind: "image", query, start, end: position };
        if (command === "input" || command === "include" || command === "subfile") return { kind: "file", query, start, end: position };
        if (command === "bibliography") return { kind: "bibfile", query, start, end: position };
        return null;
      }
      const command = /\\([a-zA-Z@]*)$/u.exec(before);
      if (command) return { kind: "command", query: command[1], start: position - command[1].length, end: position };
      // Files are offered only inside \includegraphics{…} (image), \input{…},
      // \bibliography{…} or an \end/\begin environment name — never in prose.
      return null;
    }

    function completionItems(kind, query, symbols) {
      const needle = String(query).toLowerCase();
      const rank = (value) => {
        const lower = String(value).toLowerCase();
        if (needle.length === 0) return 1;
        if (lower.startsWith(needle)) return 0;
        if (lower.includes(needle)) return 2;
        return -1;
      };
      const pack = (entries, detailOf) => entries
        .map((entry) => ({ entry, rank: rank(entry.key ?? entry) }))
        .filter((item) => item.rank >= 0)
        .sort((left, right) => left.rank - right.rank || String(left.entry.key ?? left.entry).localeCompare(String(right.entry.key ?? right.entry)))
        .slice(0, 60)
        .map(({ entry }) => (typeof entry === "string"
          ? { label: entry, insert: entry, detail: detailOf ? detailOf(entry) : "" }
          : { label: entry.key, insert: entry.key, detail: detailOf ? detailOf(entry) : "" }));
      if (kind === "command") {
        const seen = new Set();
        const merged = [];
        for (const name of COMPLETION_COMMANDS) {
          if (seen.has(name)) continue;
          seen.add(name);
          merged.push({ name, arity: 0, builtin: true });
        }
        for (const entry of (symbols.commands || [])) {
          if (seen.has(entry.name)) continue;
          seen.add(entry.name);
          merged.push({ name: entry.name, arity: entry.arity || 0, builtin: false, file: entry.file });
        }
        return merged
          .map((entry) => ({ entry, rank: rank(entry.name) }))
          .filter((item) => item.rank >= 0)
          .sort((left, right) => left.rank - right.rank || left.entry.name.localeCompare(right.entry.name))
          .slice(0, 60)
          .map(({ entry }) => {
            const signature = COMMAND_ARGUMENTS[entry.name] ?? (entry.arity > 0 ? "{}".repeat(entry.arity) : "");
            const inside = signature.startsWith("[") ? signature.indexOf("{") + 1 : 1;
            return {
              label: `\\${entry.name}`,
              insert: entry.name,
              suffix: signature,
              caret: signature ? entry.name.length + inside : entry.name.length,
              detail: entry.builtin ? "command" : `\\${entry.name} · ${entry.file}`,
            };
          });
      }
      if (kind === "environment") {
        const seen = new Set();
        const merged = [];
        for (const name of COMPLETION_ENVIRONMENTS) {
          if (seen.has(name)) continue;
          seen.add(name);
          merged.push({ name, builtin: true });
        }
        for (const entry of (symbols.environments || [])) {
          if (seen.has(entry.name)) continue;
          seen.add(entry.name);
          merged.push({ name: entry.name, builtin: false, file: entry.file });
        }
        return merged
          .map((entry) => ({ entry, rank: rank(entry.name) }))
          .filter((item) => item.rank >= 0)
          .sort((left, right) => left.rank - right.rank || left.entry.name.localeCompare(right.entry.name))
          .slice(0, 60)
          .map(({ entry }) => ({
            label: entry.name,
            insert: entry.name,
            template: environmentSnippet(entry.name),
            detail: entry.builtin ? "environment" : `\\${entry.name} · ${entry.file}`,
          }));
      }
      if (kind === "package") return pack(COMPLETION_PACKAGES, () => "package");
      if (kind === "label") return pack(symbols.labels || [], (entry) => `${entry.file}${entry.line ? `:${entry.line}` : ""}`);
      if (kind === "citation") {
        const entries = symbols.citations || [];
        const starts = [];
        const contains = [];
        for (const entry of entries) {
          const key = String(entry.key || "").toLowerCase();
          if (needle.length === 0 || key.startsWith(needle)) starts.push(entry);
          else if (key.includes(needle) || String(entry.title || "").toLowerCase().includes(needle)) contains.push(entry);
          if (starts.length >= 60 && contains.length >= 60) break;
        }
        if (starts.length === 0 && contains.length === 0) return [];
        const detail = (entry) => [entry.year, entry.title].filter(Boolean).join(" · ").slice(0, 70);
        return [...starts, ...contains].slice(0, 60).map((entry) => ({ label: entry.key, insert: entry.key, detail: detail(entry) }));
      }
      if (kind === "image") return pack((symbols.files || []).filter((file) => /\.(?:png|jpe?g|pdf|eps|svg)$/iu.test(file)), () => "image");
      if (kind === "bibfile") return pack((symbols.files || []).filter((file) => /\.bib$/iu.test(file)), () => "bib");
      if (kind === "file") return pack((symbols.files || []).filter((file) => /\.tex$/iu.test(file)), () => "tex");
      return [];
    }

    function EditorPane(props) {
      const {
        t, tabs, activePath, tab, cursor, compile, status, onSelectTab, onCloseTab,
        onEdit, editorRef, gutterInnerRef, editorApiRef, onScroll, onCursor, onInsertText,
        onReloadDisk, onKeepMine, symbols, syntax, misspelled, onSave, onUndo, onRedo, notify, onToggleWrap, onDiscuss, onAddChatContext, chatEnabled, changes, onKeepChange, onDiscardChange, onCloseReview,
      } = props;
      const theme = syntax || DEFAULT_SYNTAX;
      const keys = theme.keys || DEFAULT_SYNTAX.keys;
      const wrapRef = useRef(null);
      const areaRef = useRef(null);
      const highlightRef = useRef(null);
      const highlightInnerRef = useRef(null);
      const matchLayerRef = useRef(null);
      const caretMemory = useRef(0);
      const scrollMemoryRef = useRef({ top: 0, scrollHeight: 0, clientHeight: 0, width: 0 });
      const [completion, setCompletion] = useState(null);
      const lineCount = useMemo(() => (tab ? tab.content.split("\n").length : 0), [tab ? tab.content : ""]);
      const lines = useMemo(
        () => (tab ? highlightLines(tab.content, misspelled) : []),
        [tab ? tab.content : "", misspelled],
      );
      const currentLine = cursor && cursor.line ? cursor.line - 1 : -1;
      const [diffText, setDiffText] = useState(tab ? tab.content : "");
      const [viewport, setViewport] = useState({ top: 0, height: 640 });
      useEffect(() => {
        if (tab) setDiffText(tab.content);
        else setDiffText("");
      }, [tab ? tab.path : null, tab ? tab.saved : null]);
      const diffMap = useMemo(() => {
        if (!tab) return new Map();
        const mode = theme.diffGutter || "git";
        if (mode === "off") return new Map();
        if (tab.base === undefined || tab.base === null) return new Map();
        return diffLineKinds(tab.base, diffText);
      }, [diffText, tab ? tab.base : undefined, tab ? tab.saved : "", theme.diffGutter]);
      const diffTargets = useMemo(() => {
        const targets = new Set();
        for (const change of changes || []) {
          const match = /^@@ -(\d+)(?:,(\d+))?/u.exec(change.hunk.header || "");
          if (!match) continue;
          const start = Number(match[1]);
          const count = match[2] === undefined ? 1 : Number(match[2]);
          for (let line = 0; line < count; line += 1) targets.add(start + line);
        }
        return targets;
      }, [changes]);

      const lineElsRef = useRef([]);
      const initialMarkupRef = useRef(null);
      if (initialMarkupRef.current === null) {
        initialMarkupRef.current = lines.map((line, index) => {
          const bg = theme.backgrounds && line.bg ? ` data-bg="${line.bg}"` : "";
          const current = theme.currentLine && index === currentLine ? " current" : "";
          const target = diffTargets.has(index + 1) ? " ps-diff-target" : "";
          const diff = diffMap.get(index);
          return `<div class="ps-hl-line${current}${target}"${bg}${diff ? ` data-diff="${diff}"` : ""} data-line="${index + 1}">${line.html}</div>`;
        }).join("");
      }
      const lineRangeRef = useRef("");
      const lineStart = theme.wrap ? 0 : Math.max(0, Math.floor(viewport.top / 20) - 20);
      const lineEnd = theme.wrap ? lines.length : Math.min(lines.length, Math.ceil((viewport.top + viewport.height) / 20) + 20);
      const styleVars = useMemo(() => syntaxVariables(theme), [theme]);

      const closeCompletion = useCallback(() => setCompletion(null), []);

      const openCompletion = useCallback((mode, valueOverride, positionOverride) => {
        const textarea = editorRef.current;
        if (!textarea) return;
        const value = valueOverride === undefined ? textarea.value : valueOverride;
        const position = positionOverride === undefined ? textarea.selectionStart : positionOverride;
        const context = completionContext(value, position);
        if (!context) {
          setCompletion(null);
          return;
        }
        if (mode !== "force" && context.kind === "command" && context.query.length === 0) {
          setCompletion(null);
          return;
        }
        const items = completionItems(context.kind, context.query, symbols || {});
        if (items.length === 0) {
          setCompletion(null);
          return;
        }
        const rect = textarea.getBoundingClientRect();
        let left;
        let top;
        if (theme.wrap) {
          const point = caretCoordinates(textarea, context.start, true);
          left = rect.left + point.left - textarea.scrollLeft;
          top = rect.top + point.top - textarea.scrollTop + point.height + 4;
        } else {
          const point = caretPoint(textarea, context.start);
          left = rect.left + point.x;
          top = rect.top + point.y + 4;
        }
        left = Math.max(8, Math.min(left, window.innerWidth - 300));
        const maxHeight = Math.max(90, Math.min(220, window.innerHeight - top - 12));
        setCompletion({ context, items, index: 0, left, top, maxHeight });
      }, [editorRef, symbols]);

      const acceptCompletion = useCallback((item) => {
        const textarea = editorRef.current;
        if (!textarea || !completion || !tab) return;
        const { context } = completion;
        const value = textarea.value;
        let next;
        let caret;

        if (context.kind === "environment" && item.template) {
          // Replace the whole `\begin{fig` token with the snippet.
          const before = value.slice(0, context.start);
          const start = Math.max(before.lastIndexOf("\\begin{"), before.lastIndexOf("\\end{"));
          const from = start >= 0 ? start : context.start;
          let to = context.end;
          if (value[to] === "}") to += 1;
          next = value.slice(0, from) + item.template.text + value.slice(to);
          caret = from + item.template.caret;
        } else if (context.kind === "command") {
          const hasBrace = value[context.end] === "{";
          const suffix = hasBrace ? "" : (item.suffix || "");
          const insert = item.insert + suffix;
          next = value.slice(0, context.start) + insert + value.slice(context.end);
          caret = context.start + (hasBrace ? item.insert.length : (item.caret ?? insert.length));
        } else {
          const needsBrace = ["citation", "label", "package", "image", "file", "bibfile"].includes(context.kind);
          const insert = `${item.insert}${needsBrace && value[context.end] !== "}" ? "}" : ""}`;
          next = value.slice(0, context.start) + insert + value.slice(context.end);
          caret = context.start + insert.length;
        }
        onEdit(tab.path, next, caret);
        setCompletion(null);
        requestAnimationFrame(() => {
          textarea.focus();
          textarea.setSelectionRange(caret, caret);
          onCursor({ currentTarget: textarea });
        });
      }, [completion, editorRef, onCursor, onEdit, tab]);

      const wrapSelection = useCallback((before, after) => {
        const textarea = editorRef.current;
        if (!textarea || !tab) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        const selected = value.slice(start, end);
        const wrapped = value.slice(Math.max(0, start - before.length), start) === before
          && value.slice(end, end + after.length) === after;
        const next = wrapped
          ? value.slice(0, start - before.length) + selected + value.slice(end + after.length)
          : value.slice(0, start) + before + selected + after + value.slice(end);
        const caretStart = wrapped ? start - before.length : start + before.length;
        const caretEnd = wrapped ? end - before.length : end + before.length;
        onEdit(tab.path, next, caretEnd);
        requestAnimationFrame(() => {
          textarea.focus();
          textarea.setSelectionRange(caretStart, caretEnd);
          onCursor({ currentTarget: textarea });
        });
      }, [editorRef, onCursor, onEdit, tab]);

      const [vimMode, setVimMode] = useState(theme.vim ? "normal" : "insert");
      const [vimVisualType, setVimVisualType] = useState("char");
      const [exLine, setExLine] = useState(null);
      const [caretBox, setCaretBox] = useState(null);
      const [, setVimCursorTick] = useState(0);
      const [diagnostics, setDiagnostics] = useState("");
      const [matches, setMatches] = useState([]);
      const [diffPop, setDiffPop] = useState(null);
      const [diffSize, setDiffSize] = useState(() => {
        try {
          const saved = JSON.parse(window.localStorage.getItem("ps-diff-size") || "null");
          if (saved && Number.isFinite(saved.width) && Number.isFinite(saved.height)) return saved;
        } catch { /* storage disabled */ }
        return { width: 440, height: 240 };
      });
      const diffPopRef = useRef(null);
      const diffMovedRef = useRef(false);
      const blockRef = useRef(null);
      const vimAnchor = useRef(0);
      const vimCursor = useRef(0);
      const vimRegister = useRef("");
      const vimPending = useRef("");

      useEffect(() => {
        setVimMode(theme.vim ? "normal" : "insert");
        setExLine(null);
      }, [theme.vim]);

      const textValue = useCallback(() => (editorRef.current ? editorRef.current.value : ""), [editorRef]);

      const setCaret = useCallback((position) => {
        const textarea = editorRef.current;
        if (!textarea) return;
        const target = Math.max(0, Math.min(textarea.value.length, position));
        caretMemory.current = target;
        textarea.focus();
        textarea.setSelectionRange(target, target);
        onCursor({ currentTarget: textarea });
      }, [editorRef, onCursor]);

      const lineBounds = useCallback((position) => {
        const value = textValue();
        const start = value.lastIndexOf("\n", Math.max(0, position - 1)) + 1;
        const end = value.indexOf("\n", position);
        return { start, end: end === -1 ? value.length : end };
      }, [textValue]);

      const lineColOf = useCallback((position) => {
        const before = textValue().slice(0, position);
        return { line: before.split("\n").length - 1, col: position - before.lastIndexOf("\n") - 1 };
      }, [textValue]);

      const positionAt = useCallback((line, col) => {
        const lines = textValue().split("\n");
        let position = 0;
        for (let index = 0; index < line && index < lines.length; index += 1) position += lines[index].length + 1;
        const target = lines[line] ?? "";
        return position + Math.min(Math.max(0, col), target.length);
      }, [textValue]);

      const moveTo = useCallback((position) => {
        const textarea = editorRef.current;
        if (!textarea) return;
        const target = Math.max(0, Math.min(textarea.value.length, position));
        if (vimMode === "visual") {
          vimCursor.current = target;
          textarea.focus();
          textarea.setSelectionRange(Math.min(vimAnchor.current, target), Math.max(vimAnchor.current, target));
          onCursor({ currentTarget: textarea });
          setVimCursorTick((value) => value + 1);
          return;
        }
        setCaret(target);
      }, [onCursor, setCaret, vimMode]);

      const applyVim = useCallback((next, caret) => {
        if (!tab) return;
        onEdit(tab.path, next, caret);
        requestAnimationFrame(() => setCaret(caret));
      }, [onEdit, setCaret, tab]);

      const applyVimOperator = useCallback((operator, from, to) => {
        const textarea = editorRef.current;
        if (!textarea) return;
        const value = textarea.value;
        const start = Math.max(0, Math.min(from, to));
        const end = Math.min(value.length, Math.max(from, to));
        vimRegister.current = value.slice(start, end);
        if (operator === "y") { setCaret(start); return; }
        applyVim(value.slice(0, start) + value.slice(end), start);
        if (operator === "c") setVimMode("insert");
      }, [applyVim, setCaret]);

      const deleteRange = useCallback((from, to) => {
        const value = textValue();
        const start = Math.max(0, Math.min(from, to));
        const end = Math.min(value.length, Math.max(from, to));
        if (end <= start) return;
        applyVim(value.slice(0, start) + value.slice(end), start);
      }, [applyVim, textValue]);

      const insertAt = useCallback((position, text) => {
        const value = textValue();
        const target = Math.max(0, Math.min(value.length, position));
        applyVim(value.slice(0, target) + text + value.slice(target), target + text.length);
      }, [applyVim, textValue]);

      const nextWordStart = useCallback((position) => {
        const value = textValue();
        let index = position;
        while (index < value.length && !/\s/u.test(value[index])) index += 1;
        while (index < value.length && /\s/u.test(value[index])) index += 1;
        return index;
      }, [textValue]);

      const prevWordStart = useCallback((position) => {
        const value = textValue();
        let index = Math.max(0, position - 1);
        while (index > 0 && /\s/u.test(value[index])) index -= 1;
        while (index > 0 && !/\s/u.test(value[index - 1])) index -= 1;
        return index;
      }, [textValue]);

      const wordEnd = useCallback((position) => {
        const value = textValue();
        if (value.length === 0) return 0;
        let index = Math.min(value.length - 1, position + 1);
        while (index < value.length - 1 && /\s/u.test(value[index])) index += 1;
        while (index < value.length - 1 && !/\s/u.test(value[index + 1])) index += 1;
        return index;
      }, [textValue]);

      const executeEx = useCallback((line) => {
        const command = line.trim();
        const textarea = editorRef.current;
        if (!textarea || !tab || command.length === 0) return;
        const value = textValue();
        const position = textarea.selectionStart;
        if (command === "w" || command === "wq") {
          if (onSave) onSave(tab.path);
          return;
        }
        if (command === "q") return;
        if (/^\d+$/u.test(command)) {
          setCaret(positionAt(Number(command) - 1, 0));
          return;
        }
        const substitution = /^(%?)s\/(.+?)\/(.*?)\/([a-z]*)$/u.exec(command);
        if (!substitution) {
          if (notify) notify(`Unknown command: ${command}`, "err");
          return;
        }
        const [, scope, pattern, replacement, flags] = substitution;
        try {
          const regex = new RegExp(pattern, flags.includes("i") ? "gi" : "g");
          if (scope === "%") {
            applyVim(value.replace(regex, replacement), position);
          } else {
            const { start, end } = lineBounds(position);
            const nextLine = value.slice(start, end).replace(regex, replacement);
            applyVim(value.slice(0, start) + nextLine + value.slice(end), start);
          }
        } catch (error) {
          if (notify) notify(error.message, "err");
        }
      }, [applyVim, lineBounds, notify, onSave, positionAt, setCaret, tab, textValue]);

      const handleExKey = useCallback((event) => {
        event.preventDefault();
        if (event.key === "Enter") {
          const line = exLine || "";
          setExLine(null);
          executeEx(line);
          return;
        }
        if (event.key === "Escape") {
          setExLine(null);
          setVimMode("normal");
          return;
        }
        if (event.key === "Backspace") {
          setExLine((current) => (current || "").slice(0, -1));
          return;
        }
        if (event.key.length === 1) setExLine((current) => (current || "") + event.key);
      }, [exLine, executeEx]);

      const handleVimKey = useCallback((event) => {
        const textarea = editorRef.current;
        if (!textarea || !tab || event.target !== textarea) return;
        const keysNow = theme.keys || DEFAULT_SYNTAX.keys;
        if (event.ctrlKey || event.metaKey) {
          if (event.shiftKey && ["c", "x", "v"].includes(event.key.toLowerCase())) return;
          if (event.key === "v" && !event.shiftKey) {
            event.preventDefault();
            const start = textarea.selectionStart;
            vimAnchor.current = start;
            vimCursor.current = start;
            setVimVisualType("block");
            setVimMode("visual");
            return;
          }
          // Plain copy/cut must not modify the buffer in normal/visual mode.
          if (!event.shiftKey && ["c", "x"].includes(event.key.toLowerCase())) {
            event.preventDefault();
            if (theme.diagnostics) {
              const warning = `warning, vim bindings, ctrl-${event.key.toLowerCase()} not allowed in normal mode`;
              console.warn(warning);
              if (notify) notify(warning, "err");
            }
            return;
          }
          if (matchesBinding(event, keysNow.undo)) {
            event.preventDefault();
            if (onUndo) onUndo(tab.path);
            return;
          }
          if (matchesBinding(event, keysNow.redo) || matchesBinding(event, "mod+y")) {
            event.preventDefault();
            if (onRedo) onRedo(tab.path);
          }
          return;
        }
        const navigation = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"];
        let key = event.key;
        if (navigation.includes(key)) {
          if (vimMode !== "visual") return;
          // In visual mode arrows must extend the selection, not collapse it.
          key = { ArrowLeft: "h", ArrowRight: "l", ArrowUp: "k", ArrowDown: "j", Home: "0", End: "$" }[key] ?? "";
          if (!key) return;
        }
        event.preventDefault();
        const value = textarea.value;
        const position = vimMode === "visual" ? vimCursor.current : textarea.selectionStart;
        const { line, col } = lineColOf(position);

        if (vimMode === "visual") {
          const visualRange = () => {
            const anchor = vimAnchor.current;
            const first = Math.min(anchor, position);
            const last = Math.max(anchor, position);
            if (vimVisualType === "line") {
              const from = lineBounds(first);
              const to = lineBounds(last);
              return { start: from.start, end: to.end < value.length ? to.end + 1 : to.end };
            }
            if (vimVisualType === "block") {
              const a = lineColOf(first);
              const b = lineColOf(last);
              return {
                block: true,
                lineFrom: Math.min(a.line, b.line),
                lineTo: Math.max(a.line, b.line),
                colFrom: Math.min(a.col, b.col),
                colTo: Math.max(a.col, b.col),
              };
            }
            return { start: first, end: Math.min(value.length, last + 1) };
          };
          const finishVisual = (operator) => {
            const range = visualRange();
            if (range.block) {
              const rows = value.split("\n");
              const removed = [];
              for (let line = range.lineFrom; line <= range.lineTo; line += 1) {
                const text = rows[line] ?? "";
                const from = Math.min(range.colFrom, text.length);
                const to = Math.min(range.colTo + 1, text.length);
                removed.push(text.slice(from, to));
                rows[line] = text.slice(0, from) + text.slice(to);
              }
              const caret = positionAt(range.lineFrom, range.colFrom);
              vimRegister.current = removed.join("\n");
              if (operator === "y") { setCaret(caret); setVimMode("normal"); return; }
              applyVim(rows.join("\n"), caret);
              setVimMode(operator === "c" ? "insert" : "normal");
              return;
            }
            vimRegister.current = value.slice(range.start, range.end);
            if (operator === "y") { setCaret(range.start); setVimMode("normal"); return; }
            applyVimOperator(operator, range.start, range.end);
            setVimMode(operator === "c" ? "insert" : "normal");
          };
          if (key === "d" || key === "x") { finishVisual("d"); return; }
          if (key === "y") { finishVisual("y"); return; }
          if (key === "c") { finishVisual("c"); return; }
          if (key === "v" || key === "V") { setVimMode("normal"); return; }
          if (key === "Escape") { setVimMode("normal"); return; }
        }

        if (vimPending.current === "g") {
          vimPending.current = "";
          if (key === "g") moveTo(0);
          return;
        }
        const pending = vimPending.current;
        vimPending.current = "";
        if (pending === "d" || pending === "y" || pending === "c") {
          if (key === "i" || key === "a") {
            vimPending.current = pending + key;
            return;
          }
          if (key === pending) {
            const { start, end } = lineBounds(position);
            if (pending === "c") {
              vimRegister.current = value.slice(start, end);
              applyVim(value.slice(0, start) + value.slice(end), start);
              setVimMode("insert");
            } else if (pending === "d") {
              const removeEnd = end < value.length ? end + 1 : end;
              vimRegister.current = value.slice(start, end);
              const next = value.slice(0, start) + value.slice(removeEnd);
              applyVim(next, Math.min(start, next.length));
            } else {
              vimRegister.current = value.slice(start, end);
            }
            return;
          }
          let from = position;
          let to = position;
          if (key === "w") to = pending === "c" ? Math.min(value.length, wordEnd(position) + 1) : nextWordStart(position);
          else if (key === "e") to = Math.min(value.length, wordEnd(position) + 1);
          else if (key === "b") from = prevWordStart(position);
          else if (key === "$") to = lineBounds(position).end;
          else if (key === "0") from = lineBounds(position).start;
          else if (key === "h") from = Math.max(0, position - 1);
          else if (key === "l") to = Math.min(value.length, position + 1);
          else if (key === "j") to = positionAt(line + 1, col);
          else if (key === "k") to = positionAt(Math.max(0, line - 1), col);
          else if (key === "G") to = value.length;
          else return;
          applyVimOperator(pending, from, to);
          return;
        }
        if (pending === "di" || pending === "da" || pending === "yi" || pending === "ya" || pending === "ci" || pending === "ca") {
          const around = pending[1] === "a";
          const operator = pending[0];
          const range = vimTextObject(value, position, around, key);
          if (range) applyVimOperator(operator, range.start, range.end);
          return;
        }

        switch (key) {
          case "h": moveTo(Math.max(0, position - 1)); return;
          case "l": moveTo(Math.min(value.length, position + 1)); return;
          case "j": moveTo(positionAt(line + 1, col)); return;
          case "k": moveTo(positionAt(Math.max(0, line - 1), col)); return;
          case "w": moveTo(nextWordStart(position)); return;
          case "b": moveTo(prevWordStart(position)); return;
          case "e": moveTo(wordEnd(position)); return;
          case "0": moveTo(lineBounds(position).start); return;
          case "$": moveTo(lineBounds(position).end); return;
          case "g": vimPending.current = "g"; return;
          case "G": moveTo(positionAt(value.split("\n").length - 1, 0)); return;
          case "i": setVimMode("insert"); return;
          case "a": moveTo(Math.min(value.length, position + 1)); setVimMode("insert"); return;
          case "A": moveTo(lineBounds(position).end); setVimMode("insert"); return;
          case "I": moveTo(lineBounds(position).start); setVimMode("insert"); return;
          case "o": insertAt(lineBounds(position).end, "\n"); setVimMode("insert"); return;
          case "O": insertAt(lineBounds(position).start, "\n"); setVimMode("insert"); return;
          case "x": deleteRange(position, Math.min(value.length, position + 1)); return;
          case "d": vimPending.current = "d"; return;
          case "y": vimPending.current = "y"; return;
          case "c": vimPending.current = "c"; return;
          case "p": insertAt(Math.min(value.length, position + 1), vimRegister.current); return;
          case "P": insertAt(position, vimRegister.current); return;
          case "u": if (onUndo) onUndo(tab.path); return;
          case "v": vimAnchor.current = position; vimCursor.current = position; setVimVisualType("char"); setVimMode("visual"); return;
          case "V": {
            const bounds = lineBounds(position);
            vimAnchor.current = bounds.start;
            vimCursor.current = bounds.end;
            setVimVisualType("line");
            setVimMode("visual");
            return;
          }
          case ":": setExLine(""); return;
          case "Escape": setVimMode("normal"); return;
          default: return;
        }
      }, [applyVim, deleteRange, insertAt, lineBounds, lineColOf, moveTo, nextWordStart, notify, onRedo, onUndo, positionAt, prevWordStart, setCaret, tab, theme.diagnostics, theme.keys, vimMode, wordEnd]);

      // Pin the layer to the textarea's exact content box, scrollbar included, so
      // both wrap at identical widths and line positions never drift apart.
      const applyWrapWidth = useCallback(() => {
        const textarea = editorRef.current;
        const wrap = wrapRef.current;
        if (!textarea || !wrap) return;
        wrap.style.setProperty("--ps-pre-width", `${textarea.clientWidth}px`);
      }, [editorRef]);

      useLayoutEffectSafe(() => {
        if (!theme.wrap) return;
        applyWrapWidth();
      }, [theme.wrap, applyWrapWidth, activePath, tab ? tab.path : ""]);

      useLayoutEffectSafe(() => {
        if (!theme.vim || vimMode === "insert") {
          setCaretBox(null);
          return;
        }
        const textarea = editorRef.current;
        if (!textarea) {
          setCaretBox(null);
          return;
        }
        const active = vimMode === "visual" ? vimCursor.current : textarea.selectionStart;
        const before = String(textarea.value).slice(0, active);
        const lineNumber = before.split("\n").length;
        const column = active - before.lastIndexOf("\n") - 1;
        const style = window.getComputedStyle(textarea);
        const padTop = Number.parseFloat(style.paddingTop) || 8;
        const padLeft = Number.parseFloat(style.paddingLeft) || 48;
        const lineHeight = Number.parseFloat(style.lineHeight) || 20;
        const charWidth = measureMono(style.font || `${style.fontSize} ${style.fontFamily}`);
        const inner = highlightInnerRef.current;
        const lineEl = inner ? inner.querySelector(`[data-line="${lineNumber}"]`) : null;
        if (lineEl) {
          const walker = document.createTreeWalker(lineEl, NodeFilter.SHOW_TEXT);
          let node = walker.nextNode();
          let offset = column;
          while (node && offset > node.data.length) {
            offset -= node.data.length;
            node = walker.nextNode();
          }
          const rect = document.createRange();
          if (node) {
            rect.setStart(node, Math.max(0, Math.min(node.data.length, offset)));
            rect.setEnd(node, Math.max(0, Math.min(node.data.length, offset + 1)));
          } else {
            rect.selectNodeContents(lineEl);
          }
          const lineRect = lineEl.getBoundingClientRect();
          const box = rect.getBoundingClientRect();
          setCaretBox({
            left: padLeft + lineEl.offsetLeft + (box.width || box.height ? box.left - lineRect.left : 0),
            top: padTop + lineEl.offsetTop + (box.width || box.height ? box.top - lineRect.top : 0),
            width: Math.max(charWidth, box.width || 0),
            height: box.height || lineHeight,
          });
          return;
        }
        if (theme.wrap) {
          setCaretBox(caretCoordinates(textarea, active, true));
          return;
        }
        const point = caretPoint(textarea, active);
        setCaretBox({
          left: point.x + textarea.scrollLeft,
          top: point.y + textarea.scrollTop - lineHeight,
          width: charWidth,
          height: lineHeight,
        });
      }, [theme.vim, theme.wrap, vimMode, cursor.line, cursor.col, activePath, tab ? tab.content : "", vimAnchor.current, vimCursor.current]);

      useEffect(() => {
        const wrap = wrapRef.current;
        const textarea = editorRef.current;
        if (!wrap || !textarea) return undefined;
        const onWheel = (event) => {
          if (event.target === textarea) return;
          const before = textarea.scrollTop;
          textarea.scrollTop += event.deltaY;
          if (textarea.scrollTop === before) return;
          event.preventDefault();
          onScroll({ currentTarget: textarea });
          if (highlightInnerRef.current) highlightInnerRef.current.style.top = `${-textarea.scrollTop}px`;
          if (matchLayerRef.current) matchLayerRef.current.style.top = `${-textarea.scrollTop}px`;
          if (blockRef.current) blockRef.current.style.transform = `translate(0, ${-textarea.scrollTop}px)`;
        };
        wrap.addEventListener("wheel", onWheel, { passive: false });
        return () => wrap.removeEventListener("wheel", onWheel);
      }, [onScroll]);

      const syncHighlight = useCallback(() => {
        const textarea = editorRef.current;
        const inner = highlightInnerRef.current;
        if (!textarea || !inner) return;
        // Offset with layout properties: transforms on this layer were not
        // repainting in practice, while top/left force a reflow and a repaint.
        inner.style.top = `${-textarea.scrollTop}px`;
        inner.style.left = `${-textarea.scrollLeft}px`;
        const layer = matchLayerRef.current;
        if (layer) {
          layer.style.top = `${-textarea.scrollTop}px`;
          layer.style.left = `${-textarea.scrollLeft}px`;
        }
      }, [editorRef]);

      useEffect(() => {
        const textarea = editorRef.current;
        if (!textarea) return undefined;
        let frame = 0;
        const measure = () => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            setViewport({ top: textarea.scrollTop, height: textarea.clientHeight });
          });
        };
        const remember = () => {
          scrollMemoryRef.current = {
            top: textarea.scrollTop,
            scrollHeight: textarea.scrollHeight,
            clientHeight: textarea.clientHeight,
            width: textarea.clientWidth,
          };
        };
        const onNativeScroll = () => { syncHighlight(); measure(); remember(); };
        textarea.addEventListener("scroll", onNativeScroll, { passive: true });
        measure();
        return () => {
          if (frame) cancelAnimationFrame(frame);
          textarea.removeEventListener("scroll", onNativeScroll);
        };
      }, [syncHighlight, theme.wrap, tab ? tab.path : ""]);

      useEffect(() => {
        const textarea = editorRef.current;
        if (!textarea || typeof ResizeObserver === "undefined") return undefined;
        const observer = new ResizeObserver(() => {
          const previous = scrollMemoryRef.current;
          if (previous.width > 0 && previous.width !== textarea.clientWidth) {
            const fraction = previous.top / Math.max(1, previous.scrollHeight - previous.clientHeight);
            requestAnimationFrame(() => {
              textarea.scrollTop = fraction * Math.max(0, textarea.scrollHeight - textarea.clientHeight);
              syncHighlight();
              scrollMemoryRef.current = {
                top: textarea.scrollTop,
                scrollHeight: textarea.scrollHeight,
                clientHeight: textarea.clientHeight,
                width: textarea.clientWidth,
              };
            });
          } else {
            scrollMemoryRef.current = {
              top: textarea.scrollTop,
              scrollHeight: textarea.scrollHeight,
              clientHeight: textarea.clientHeight,
              width: textarea.clientWidth,
            };
          }
        });
        observer.observe(textarea);
        return () => observer.disconnect();
      }, [syncHighlight, theme.wrap, tab ? tab.path : ""]);

      useLayoutEffectSafe(() => {
        const inner = highlightInnerRef.current;
        if (!inner) return;
        const rangeKey = `${lineStart}:${lineEnd}`;
        let els = lineElsRef.current;
        if (lineRangeRef.current !== rangeKey || els.length !== lineEnd - lineStart) {
          inner.textContent = "";
          const fragment = document.createDocumentFragment();
          els = [];
          for (let index = lineStart; index < lineEnd; index += 1) {
            const element = document.createElement("div");
            element.className = "ps-hl-line";
            element.dataset.line = String(index + 1);
            fragment.appendChild(element);
            els.push(element);
          }
          inner.appendChild(fragment);
          inner.classList.toggle("virtual", !theme.wrap);
          if (theme.wrap) {
            inner.style.paddingTop = `${lineStart * 20}px`;
            inner.style.paddingBottom = `${(lines.length - lineEnd) * 20}px`;
          } else {
            inner.style.paddingTop = "0";
            inner.style.paddingBottom = "0";
            for (let index = lineStart; index < lineEnd; index += 1) els[index - lineStart].style.top = `${index * 20}px`;
          }
          lineElsRef.current = els;
          lineRangeRef.current = rangeKey;
        }
        for (let index = lineStart; index < lineEnd; index += 1) {
          const line = lines[index];
          const element = els[index - lineStart];
          if (!line || !element) continue;
          if (element.__psHtml !== line.html) {
            element.innerHTML = line.html;
            element.__psHtml = line.html;
          }
          const bg = theme.backgrounds && line.bg ? line.bg : null;
          if (bg) {
            if (element.dataset.bg !== bg) element.dataset.bg = bg;
          } else if (element.hasAttribute("data-bg")) {
            element.removeAttribute("data-bg");
          }
          const isCurrent = Boolean(theme.currentLine && index === currentLine);
          if (element.__psCurrent !== isCurrent) {
            element.classList.toggle("current", isCurrent);
            element.__psCurrent = isCurrent;
          }
          const isTarget = diffTargets.has(index + 1);
          if (element.__psTarget !== isTarget) {
            element.classList.toggle("ps-diff-target", isTarget);
            element.__psTarget = isTarget;
          }
          const diff = diffMap.get(index) || null;
          if (element.__psDiff !== diff) {
            if (diff) element.dataset.diff = diff;
            else if (element.hasAttribute("data-diff")) element.removeAttribute("data-diff");
            element.__psDiff = diff;
          }
        }
      }, [lines, lineStart, lineEnd, currentLine, theme.backgrounds, theme.currentLine, diffTargets, diffMap]);

      useLayoutEffectSafe(() => { syncHighlight(); }, [activePath, syncHighlight, theme.wrap]);

      useLayoutEffectSafe(() => {
        const timer = setTimeout(() => {
        const textarea = editorRef.current;
        if (!textarea || !tab) { setMatches((previous) => (previous.length > 0 ? [] : previous)); return; }
        const pair = bracketMatch(tab.content, textarea.selectionStart);
        if (!pair) { setMatches((previous) => (previous.length > 0 ? [] : previous)); return; }
        const boxes = [];
        const inner = highlightInnerRef.current;
        for (const index of [pair.open, pair.close]) {
          if (index < 0) continue;
          const point = caretCoordinates(textarea, index, theme.wrap);
          const lineIndex = tab.content.slice(0, index).split("\n").length;
          const lineEl = inner ? inner.querySelector(`[data-line="${lineIndex}"]`) : null;
          let top = point.top;
          if (lineEl) {
            const padTop = Number.parseFloat(window.getComputedStyle(textarea).paddingTop) || 8;
            const lineTop = padTop + lineEl.offsetTop;
            const lineBottom = lineTop + lineEl.offsetHeight;
            top = theme.wrap
              ? Math.max(lineTop, Math.min(Math.max(lineTop, lineBottom - point.height), point.top))
              : lineTop;
          }
          boxes.push({
            left: point.left, top, width: Math.max(5, point.width), height: point.height,
            unmatched: pair.open < 0 || pair.close < 0,
          });
        }
        setMatches(boxes);
        }, 70);
        return () => clearTimeout(timer);
      }, [cursor.line, cursor.col, tab ? tab.content : "", theme.wrap]);

      useLayoutEffectSafe(() => {
        if (!theme.diagnostics) return;
        const textarea = editorRef.current;
        const pre = highlightRef.current;
        if (!textarea || !pre) return;
        const style = window.getComputedStyle(pre);
        const inner = pre.firstElementChild;
        setDiagnostics([
          `build ${CLIENT_BUILD.slice(11, 16)}`,
          `cw ${textarea.clientWidth}`,
          `sw ${textarea.scrollWidth}`,
          `pw ${Math.round(pre.getBoundingClientRect().width)}`,
          `ws ${style.whiteSpace}`,
          `st ${textarea.scrollTop}`,
          `top ${inner ? inner.style.top || "0" : "?"}`,
          `sh ${textarea.scrollHeight}`,
          `ch ${textarea.clientHeight}`,
        ].join(" · "));
      }, [theme.diagnostics, lines, cursor.line, cursor.col, tab ? tab.content : "", theme.wrap]);

      // A wrap toggle remounts the textarea (to apply wrapping), so restore the
      // caret, then measure and sync before the browser paints.
      useLayoutEffectSafe(() => {
        const textarea = editorRef.current;
        if (!textarea) return undefined;
        textarea.scrollLeft = 0;
        const position = Math.min(caretMemory.current, textarea.value.length);
        textarea.focus();
        textarea.setSelectionRange(position, position);
        if (theme.wrap) {
          applyWrapWidth();
          const point = caretCoordinates(textarea, position, true);
          if (point.top < textarea.scrollTop || point.top + point.height > textarea.scrollTop + textarea.clientHeight) {
            textarea.scrollTop = Math.max(0, point.top - Math.round(textarea.clientHeight / 3));
          }
        }
        syncHighlight();
        onCursor({ currentTarget: textarea });
        if (typeof ResizeObserver === "undefined") return undefined;
        const area = areaRef.current;
        if (!area) return undefined;
        const observer = new ResizeObserver(() => {
          if (theme.wrap) applyWrapWidth();
          syncHighlight();
        });
        observer.observe(area);
        observer.observe(textarea);
        return () => observer.disconnect();
      }, [theme.wrap, syncHighlight, onCursor, applyWrapWidth, activePath, tab ? tab.path : ""]);

      const firstVisibleLine = useCallback(() => {
        const textarea = editorRef.current;
        if (!textarea) return 1;
        const inner = highlightInnerRef.current;
        if (theme.wrap && inner) {
          const scroll = textarea.scrollTop;
          for (const element of inner.children) {
            if (element.offsetTop + element.offsetHeight > scroll) return Number(element.dataset.line) || 1;
          }
          return 1;
        }
        return Math.max(1, Math.floor(textarea.scrollTop / 20) + 1);
      }, [theme.wrap]);

      const revealLineTop = useCallback((lineNumber) => {
        const textarea = editorRef.current;
        if (!textarea) return false;
        const lines = String(textarea.value).split("\n");
        const index = Math.max(0, Math.min(lines.length - 1, (Number(lineNumber) || 1) - 1));
        let offset = 0;
        for (let position = 0; position < index; position += 1) offset += lines[position].length + 1;
        const point = caretCoordinates(textarea, offset, theme.wrap);
        textarea.scrollTop = Math.max(0, point.top - 4);
        syncHighlight();
        return true;
      }, [editorRef, syncHighlight, theme.wrap]);

      const revealLine = useCallback((lineNumber) => {
        const textarea = editorRef.current;
        if (!textarea) return false;
        const lines = String(textarea.value).split("\n");
        const index = Math.max(0, Math.min(lines.length - 1, (Number(lineNumber) || 1) - 1));
        let offset = 0;
        for (let position = 0; position < index; position += 1) offset += lines[position].length + 1;
        const point = caretCoordinates(textarea, offset, theme.wrap);
        const viewHeight = textarea.clientHeight;
        textarea.scrollTop = Math.max(0, point.top - Math.max(24, (viewHeight - point.height) / 2));
        if (!theme.wrap) {
          textarea.scrollLeft = Math.max(0, point.left - Math.max(24, textarea.clientWidth / 3));
        }
        syncHighlight();
        return true;
      }, [editorRef, syncHighlight, theme.wrap]);

      useEffect(() => {
        if (!editorApiRef) return undefined;
        editorApiRef.current = { revealLine, firstVisibleLine, revealLineTop };
        return () => {
          if (editorApiRef.current && editorApiRef.current.revealLine === revealLine) editorApiRef.current = null;
        };
      }, [editorApiRef, revealLine, tab ? tab.path : ""]);

      const placeDiffPopup = useCallback(() => {
        const textarea = editorRef.current;
        if (!textarea || !changes || changes.length === 0) { setDiffPop(null); return; }
        if (diffMovedRef.current) return;
        const hunk = changes[0].hunk;
        const match = hunk ? /^@@ -(\d+)/u.exec(hunk.header || "") : null;
        const line = match ? Number(match[1]) : 1;
        const rows = textarea.value.split("\n");
        let offset = 0;
        for (let index = 0; index < Math.min(line - 1, rows.length); index += 1) offset += rows[index].length + 1;
        const point = caretCoordinates(textarea, Math.min(offset, textarea.value.length), theme.wrap);
        const wrap = wrapRef.current;
        const height = wrap ? wrap.clientHeight : 400;
        setDiffPop({
          top: Math.max(6, Math.min(point.top - textarea.scrollTop, height - 140)),
          left: 52,
        });
      }, [changes, editorRef, theme.wrap]);

      useEffect(() => { diffPopRef.current = placeDiffPopup; }, [placeDiffPopup]);
      useLayoutEffectSafe(() => { placeDiffPopup(); }, [placeDiffPopup, activePath]);

      const handleScroll = useCallback((event) => {
        onScroll(event);
        syncHighlight();
        if (diffPopRef.current) diffPopRef.current();
        setCompletion(null);
      }, [onScroll, syncHighlight]);

      const handleChange = useCallback((event) => {
        const value = event.target.value;
        const position = event.target.selectionStart;
        caretMemory.current = position;
        onEdit(tab.path, value, position);
        onCursor({ currentTarget: event.target });
        requestAnimationFrame(() => openCompletion(undefined, value, position));
      }, [onEdit, openCompletion, tab]);

      const handleClipboardShortcut = useCallback((event) => {
        const mod = event.ctrlKey || event.metaKey;
        const key = event.key;
        // Terminal-style aliases (Linux/X11): Ctrl+Shift+C/X/V and the classic
        // Insert/Delete combinations. Plain Ctrl+C/V/X stays native.
        const copy = (mod && event.shiftKey && (key === "C" || key === "c")) || (mod && key === "Insert");
        const cut = (mod && event.shiftKey && (key === "X" || key === "x")) || (event.shiftKey && key === "Delete");
        const paste = (mod && event.shiftKey && (key === "V" || key === "v")) || (event.shiftKey && key === "Insert");
        if (!copy && !cut && !paste) return false;
        const insertMode = !theme.vim || vimMode === "insert";
        if (!insertMode) {
          event.preventDefault();
          if (theme.diagnostics) {
            const combo = paste ? "ctrl-v" : cut ? "ctrl-x" : "ctrl-c";
            const warning = `warning, vim bindings, ${combo} not allowed in normal mode`;
            console.warn(warning);
            if (notify) notify(warning, "err");
          }
          return true;
        }
        event.preventDefault();
        const textarea = editorRef.current;
        if (!textarea || !tab) return true;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value.slice(start, end);
        if (copy) {
          if (!text) return true;
          void navigator.clipboard.writeText(text)
            .then(() => { if (notify) notify(t("copied")); })
            .catch(() => { if (notify) notify(t("clipboardDenied"), "err"); });
          return true;
        }
        if (cut) {
          if (!text) return true;
          void navigator.clipboard.writeText(text)
            .then(() => {
              onEdit(tab.path, textarea.value.slice(0, start) + textarea.value.slice(end), start);
              requestAnimationFrame(() => setCaret(start));
            })
            .catch(() => { if (notify) notify(t("clipboardDenied"), "err"); });
          return true;
        }
        void navigator.clipboard.readText()
          .then((clip) => {
            if (!clip) return;
            const next = textarea.value.slice(0, start) + clip + textarea.value.slice(end);
            onEdit(tab.path, next, start + clip.length);
            requestAnimationFrame(() => setCaret(start + clip.length));
          })
          .catch(() => { if (notify) notify(t("clipboardDenied"), "err"); });
        return true;
      }, [notify, onEdit, setCaret, t, tab, theme.diagnostics, theme.vim, vimMode]);

      const handleKeyDown = useCallback((event) => {
        if (event.defaultPrevented) return;
        if (event.target !== editorRef.current) return;
        if (handleClipboardShortcut(event)) return;
        if (theme.vim) {
          if (exLine !== null) {
            handleExKey(event);
            return;
          }
          if (vimMode !== "insert") {
            handleVimKey(event);
            return;
          }
          if (event.key === "Escape") {
            event.preventDefault();
            setVimMode("normal");
            return;
          }
        }
        if (matchesBinding(event, keys.undo)) {
          event.preventDefault();
          if (onUndo && tab) onUndo(tab.path);
          return;
        }
        if (matchesBinding(event, keys.redo) || matchesBinding(event, "mod+y")) {
          event.preventDefault();
          if (onRedo && tab) onRedo(tab.path);
          return;
        }
        if (matchesBinding(event, keys.bold)) {
          event.preventDefault();
          wrapSelection("\\textbf{", "}");
          return;
        }
        if (matchesBinding(event, keys.italic)) {
          event.preventDefault();
          wrapSelection("\\textit{", "}");
          return;
        }
        if (matchesBinding(event, keys.underline)) {
          event.preventDefault();
          wrapSelection("\\underline{", "}");
          return;
        }
        if (matchesBinding(event, keys.save)) {
          event.preventDefault();
          if (onSave && tab) onSave(tab.path);
          return;
        }
        if (completion) {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setCompletion((current) => (current ? { ...current, index: (current.index + 1) % current.items.length } : current));
            return;
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setCompletion((current) => (current ? { ...current, index: (current.index - 1 + current.items.length) % current.items.length } : current));
            return;
          }
          if (event.key === "Tab" && !event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
            acceptCompletion(completion.items[completion.index]);
            return;
          }
          if (event.key === "Enter" && !event.ctrlKey && !event.metaKey && !event.altKey) {
            // Enter inserts a newline; only Tab (or a click) accepts a suggestion.
            setCompletion(null);
          }
          if (event.key === "Escape") {
            event.preventDefault();
            setCompletion(null);
            return;
          }
        }
        if ((event.ctrlKey || event.metaKey) && event.key === " ") {
          event.preventDefault();
          openCompletion("force");
          return;
        }
        if (event.key === "Tab" && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
          onInsertText("  ");
        }
        if (event.key === "Escape") setCompletion(null);
      }, [acceptCompletion, completion, exLine, handleClipboardShortcut, handleExKey, handleVimKey, keys, onInsertText, onRedo, onSave, onUndo, openCompletion, tab, theme.vim, vimMode, wrapSelection]);

      const copySelection = useCallback(async () => {
        const textarea = editorRef.current;
        if (!textarea) return;
        const text = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);
        setMenu(null);
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          if (notify) notify(t("copied"));
        } catch {
          if (notify) notify(t("clipboardDenied"), "err");
        }
      }, [notify, t]);

      const cutSelection = useCallback(async () => {
        const textarea = editorRef.current;
        if (!textarea || !tab) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value.slice(start, end);
        setMenu(null);
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          if (notify) notify(t("clipboardDenied"), "err");
          return;
        }
        onEdit(tab.path, textarea.value.slice(0, start) + textarea.value.slice(end), start);
        requestAnimationFrame(() => setCaret(start));
      }, [notify, onEdit, setCaret, t, tab]);

      const pasteFromClipboard = useCallback(async () => {
        const textarea = editorRef.current;
        if (!textarea || !tab) return;
        setMenu(null);
        try {
          const text = await navigator.clipboard.readText();
          if (!text) return;
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const next = textarea.value.slice(0, start) + text + textarea.value.slice(end);
          onEdit(tab.path, next, start + text.length);
          requestAnimationFrame(() => setCaret(start + text.length));
        } catch {
          if (notify) notify(t("clipboardDenied"), "err");
        }
      }, [notify, onEdit, setCaret, t, tab]);

      const [menu, setMenu] = useState(null);
      useEffect(() => {
        if (!menu) return undefined;
        const close = () => setMenu(null);
        const onKey = (event) => { if (event.key === "Escape") setMenu(null); };
        window.addEventListener("mousedown", close);
        window.addEventListener("keydown", onKey, true);
        window.addEventListener("scroll", close, true);
        return () => {
          window.removeEventListener("mousedown", close);
          window.removeEventListener("keydown", onKey, true);
          window.removeEventListener("scroll", close, true);
        };
      }, [menu]);

      return h("section", { className: "ps-pane ps-editor", "aria-label": t("editor") },
        h("div", { className: "ps-tabs", role: "tablist" },
          tabs.length === 0 ? h("div", { className: "ps-status", style: { padding: "0 10px" } }, t("editor")) : null,
          tabs.map((item) => h("div", {
            key: item.path,
            className: `ps-tab${item.path === activePath ? " active" : ""}`,
            role: "tab",
            "aria-selected": item.path === activePath,
            title: item.path,
            onMouseDown: (event) => { if (event.button === 1) { event.preventDefault(); onCloseTab(item.path); } },
            onClick: () => onSelectTab(item.path),
          },
          item.dirty ? h("span", { className: "ps-dirty", "aria-label": t("unsaved") }) : null,
          h("span", { className: "ps-tab-name" }, basenameOf(item.path)),
          h("button", {
            className: "ps-tab-close", type: "button", "aria-label": t("close"),
            onClick: (event) => { event.stopPropagation(); onCloseTab(item.path); },
          }, h(Icon.close)))),
          h("div", { className: "ps-spacer" })),
        tab ? (tab.conflict ? h("div", { className: "ps-banner" },
          h("span", { className: "ps-banner-text" }, `${t("conflictTitle")} — ${t("conflictBody")}`),
          h("button", { className: "ps-btn", type: "button", onClick: () => onReloadDisk(tab.path) }, t("reloadDisk")),
          h("button", { className: "ps-btn", type: "button", onClick: () => onKeepMine(tab.path) }, t("keepMine"))) : null) : null,
        tab ? h("div", { className: "ps-code-wrap", ref: wrapRef, style: styleVars },
          h("div", { className: "ps-code-area", ref: areaRef },
          h("pre", {
            className: `ps-highlight${theme.wrap ? " wrap" : ""}`,
            ref: highlightRef,
            "aria-hidden": "true",
          }, h("div", { className: "ps-match-layer", ref: matchLayerRef, "aria-hidden": "true" },
            matches.map((box, index) => h("span", {
              key: index,
              className: `ps-match-box${box.unmatched ? " unmatched" : ""}`,
              style: { left: `${box.left}px`, top: `${box.top}px`, width: `${box.width}px`, height: `${box.height}px` },
            }))),
          h("div", {
            className: "ps-hl-inner",
            ref: highlightInnerRef,
            dangerouslySetInnerHTML: { __html: initialMarkupRef.current },
          })),
          h("textarea", {
            key: `code-${theme.wrap ? "wrap" : "nowrap"}`,
            ref: editorRef,
            className: `ps-code${theme.wrap ? " wrap" : ""}${theme.vim && vimMode !== "insert" ? " vim-normal" : ""}`,
            value: tab.content,
            spellCheck: false,
            wrap: theme.wrap ? "soft" : "off",
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            "aria-label": tab.path,
            onChange: handleChange,
            onScroll: handleScroll,
            onSelect: (event) => { caretMemory.current = event.currentTarget.selectionStart; onCursor(event); },
            onClick: (event) => { caretMemory.current = event.currentTarget.selectionStart; onCursor(event); },
            onKeyDown: handleKeyDown,
            onContextMenu: (event) => {
              event.preventDefault();
              const target = event.currentTarget;
              const margin = 8;
              const width = 210;
              const height = 320;
              setMenu({
                x: Math.max(margin, Math.min(event.clientX, window.innerWidth - width - margin)),
                y: Math.max(margin, Math.min(event.clientY, window.innerHeight - height - margin)),
                selected: target.selectionStart !== target.selectionEnd,
              });
            },
            onBlur: closeCompletion,
          }),
          changes && changes.length > 0 ? h("div", {
            className: "ps-diff-pop",
            style: {
              top: `${diffPop ? diffPop.top : 8}px`,
              left: `${diffPop ? diffPop.left : 52}px`,
              width: `${diffSize.width}px`,
              height: `${diffSize.height}px`,
            },
          },
            h("div", {
              className: "ps-diff-pop-head",
              onPointerDown: (event) => {
                if (event.target.closest("button")) return;
                event.preventDefault();
                const startX = event.clientX;
                const startY = event.clientY;
                diffMovedRef.current = true;
                const startTop = diffPop ? diffPop.top : 8;
                const startLeft = diffPop ? diffPop.left : 52;
                const move = (moveEvent) => setDiffPop({
                  top: Math.max(0, startTop + moveEvent.clientY - startY),
                  left: Math.max(0, startLeft + moveEvent.clientX - startX),
                });
                const stop = () => {
                  window.removeEventListener("pointermove", move);
                  window.removeEventListener("pointerup", stop);
                };
                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", stop);
              },
            },
              h("span", null, `${changes.length} ${t("suggestedEdit")}`),
              h("button", {
                className: "ps-btn icon", type: "button", title: t("close"),
                onClick: () => { diffMovedRef.current = false; if (onCloseReview) onCloseReview(); },
              }, h(Icon.close))),
            h("div", { className: "ps-diff-pop-body" },
              changes.map((change) => h("div", { className: "ps-diff-hunk", key: change.id },
                h("div", { className: "ps-diff-hunk-head" },
                  h("span", null, `${change.file ? `${change.file} · ` : ""}${change.hunk.header || ""}`),
                  h("button", { className: "ps-btn keep", type: "button", onClick: () => onKeepChange && onKeepChange(change) }, t("keep")),
                  h("button", { className: "ps-btn danger", type: "button", onClick: () => onDiscardChange && onDiscardChange(change.id) }, t("discard"))),
                change.hunk.lines.slice(0, 120).map((line, lineIndex) => h("div", {
                  key: lineIndex,
                  className: `ps-diff-line ${line.type === "+" ? "add" : line.type === "-" ? "del" : "ctx"}`,
                }, line.text || " "))))),
            h("div", {
              className: "ps-diff-resize",
              title: "Resize",
              onPointerDown: (event) => {
                event.preventDefault();
                event.stopPropagation();
                const startX = event.clientX;
                const startY = event.clientY;
                let latest = diffSize;
                const move = (moveEvent) => {
                  latest = {
                    width: Math.max(280, Math.min(900, diffSize.width + moveEvent.clientX - startX)),
                    height: Math.max(140, Math.min(700, diffSize.height + moveEvent.clientY - startY)),
                  };
                  setDiffSize(latest);
                };
                const stop = () => {
                  window.removeEventListener("pointermove", move);
                  window.removeEventListener("pointerup", stop);
                  try { window.localStorage.setItem("ps-diff-size", JSON.stringify(latest)); } catch { /* storage disabled */ }
                };
                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", stop);
              },
            })) : null,
          theme.vim && vimMode !== "insert" && caretBox
            ? h("div", {
              className: "ps-block-caret",
              ref: blockRef,
              style: {
                left: caretBox.left,
                top: caretBox.top,
                width: caretBox.width,
                height: caretBox.height,
                transform: `translate(${-(editorRef.current ? editorRef.current.scrollLeft : 0)}px, ${-(editorRef.current ? editorRef.current.scrollTop : 0)}px)`,
              },
            })
            : null,
          completion ? h("div", {
            className: "ps-ac",
            role: "listbox",
            style: { left: completion.left, top: completion.top, maxHeight: completion.maxHeight },
            onMouseDown: (event) => event.preventDefault(),
          }, completion.items.map((item, index) => h("button", {
            key: `${item.insert}:${index}`,
            type: "button",
            role: "option",
            "aria-selected": index === completion.index,
            className: `ps-ac-item${index === completion.index ? " active" : ""}`,
            onMouseEnter: () => setCompletion((current) => (current ? { ...current, index } : current)),
            onClick: () => acceptCompletion(item),
          },
          h("span", { className: "ps-ac-label" }, item.label),
          item.detail ? h("span", { className: "ps-ac-detail" }, item.detail) : null))) : null)) : h(EmptyState, {
          icon: Icon.file,
          title: t("noFileTitle"),
          body: t("noFileBody"),
        }),
        tab && exLine !== null ? h("div", { className: "ps-exline" }, `:${exLine}`) : null,
        tab ? h("div", { className: "ps-code-foot" },
          h("span", { className: "ps-grow", title: tab.path }, tab.path),
          theme.vim ? h("span", { className: "ps-vim" },
            vimMode !== "visual"
              ? vimMode.toUpperCase()
              : vimVisualType === "line" ? "V-LINE" : vimVisualType === "block" ? "V-BLOCK" : "VISUAL") : null,
          h("button", {
            className: `ps-btn${theme.wrap ? " active" : ""}`, type: "button",
            title: t("wrapLines"), "aria-pressed": Boolean(theme.wrap),
            onClick: () => { if (onToggleWrap) onToggleWrap(); },
          }, t("wrapShort")),
          h("span", { className: "ps-build-tag", title: `client ${CLIENT_BUILD}` }, `b${CLIENT_BUILD.slice(11, 16)}`),
          theme.diagnostics ? h("span", { className: "ps-diag" }, diagnostics) : null,
          h("span", null, fmt(t("lineCol"), cursor)),
          h("span", null, fmt(t("lines"), { count: lineCount })),
          h("button", {
            className: "ps-btn icon", type: "button", title: `${t("save")} (${keys.save})`,
            "aria-label": t("save"), onClick: () => { if (onSave) onSave(tab.path); },
          }, h(Icon.save)),
          h("span", { className: compile && !compile.ok ? "ps-status err" : "ps-status" },
            status.kind === "saving" || tab.saving ? t("saving") : tab.dirty ? t("unsaved") : t("saved"))) : null,
        menu ? h("div", {
          className: "ps-ctx",
          style: { left: menu.x, top: menu.y },
          onMouseDown: (event) => event.stopPropagation(),
        },
        h("button", { className: "ps-ctx-item", type: "button", disabled: !menu.selected, onClick: () => { void cutSelection(); } },
          t("cut"), h("kbd", null, "Ctrl/⌘ X")),
        h("button", { className: "ps-ctx-item", type: "button", disabled: !menu.selected, onClick: copySelection },
          t("copyText"), h("kbd", null, "Ctrl/⌘ C")),
        h("button", { className: "ps-ctx-item", type: "button", onClick: () => { void pasteFromClipboard(); } },
          t("paste"), h("kbd", null, "Ctrl/⌘ V")),
        h("div", { className: "ps-ctx-sep", key: "sep" }),
        h("button", { className: "ps-ctx-item", type: "button", onClick: () => { wrapSelection("\\textbf{", "}"); setMenu(null); } },
          t("bold"), h("kbd", null, keys.bold)),
        h("button", { className: "ps-ctx-item", type: "button", onClick: () => { wrapSelection("\\textit{", "}"); setMenu(null); } },
          t("italic"), h("kbd", null, keys.italic)),
        h("button", { className: "ps-ctx-item", type: "button", onClick: () => { wrapSelection("\\underline{", "}"); setMenu(null); } },
          t("underline"), h("kbd", null, keys.underline)),
        h("div", { className: "ps-ctx-sep", key: "sep2" }),
        h("button", {
          className: "ps-ctx-item", type: "button", disabled: !chatEnabled,
          onClick: () => {
            setMenu(null);
            const textarea = editorRef.current;
            const value = textarea ? textarea.value : "";
            const start = textarea ? textarea.selectionStart : 0;
            const end = textarea ? textarea.selectionEnd : 0;
            const before = value.slice(0, start);
            if (onAddChatContext) onAddChatContext({
              file: tab ? tab.path : "",
              text: value.slice(start, end),
              startLine: before.split("\n").length,
              endLine: value.slice(0, end).split("\n").length,
            });
          },
        }, t("addToChat")),
        h("button", {
          className: "ps-ctx-item", type: "button",
          onClick: () => {
            setMenu(null);
            const textarea = editorRef.current;
            const value = textarea ? textarea.value : "";
            const start = textarea ? textarea.selectionStart : 0;
            const end = textarea ? textarea.selectionEnd : 0;
            const before = value.slice(0, start);
            if (onDiscuss) onDiscuss({
              file: tab ? tab.path : "",
              text: value.slice(start, end),
              startLine: before.split("\n").length,
              endLine: value.slice(0, end).split("\n").length,
            });
          },
        }, t("discussWithAgent"))) : null);
    }

    function Dock(props) {
      const {
        t, tab, onTab, onClose, compile, terminal, stage, elapsed, compiling,
        onClear, height, onResize, onOpenProblem,
      } = props;
      const termRef = useRef(null);
      const lines = useMemo(() => {
        const out = [];
        for (const entry of terminal) {
          const parts = String(entry.text).split(/\r?\n/u);
          parts.forEach((part, index) => {
            if (part.length === 0 && index === parts.length - 1) return;
            out.push({ kind: entry.kind, text: part });
          });
        }
        return out.slice(-4000);
      }, [terminal]);
      useEffect(() => {
        const node = termRef.current;
        if (node) node.scrollTop = node.scrollHeight;
      }, [lines, tab]);

      const errors = (compile && compile.errors) || [];
      const warnings = (compile && compile.warningsList) || [];
      const severity = (kind) => (kind === "error" ? ["err", t("errBadge")] : kind === "badbox" ? ["badbox", t("badboxBadge")] : kind === "bibtex" ? ["warn", t("bibBadge")] : ["warn", t("warnBadge")]);
      const problems = [
        ...errors.map((problem) => ({ ...problem, kind: "error" })),
        ...warnings.map((problem) => ({ ...problem, kind: problem.kind || "warning" })),
      ];

      return h("div", { className: "ps-dock", style: { height } },
        h("div", {
          className: "ps-split-h", role: "separator", "aria-orientation": "horizontal",
          title: t("terminalHint"), onPointerDown: onResize,
        }),
        h("div", { className: "ps-dock-head" },
          h("button", { className: `ps-drawer-tab${tab === "problems" ? " active" : ""}`, type: "button", onClick: () => onTab("problems") },
            t("problems"),
            problems.length > 0 ? h("span", { className: `ps-count${errors.length === 0 ? " warn" : ""}` }, problems.length) : null),
          h("button", { className: `ps-drawer-tab${tab === "terminal" ? " active" : ""}`, type: "button", onClick: () => onTab("terminal") }, t("terminal")),
          h("div", { className: "ps-spacer" }),
          compiling ? h("span", { className: "ps-stage" }, `${stage || t("compiling")}${elapsed ? ` · ${elapsed}s` : ""}`) : null,
          !compiling && compile ? h("span", { className: "ps-status", style: { fontSize: 11 } }, compile.cached ? t("upToDate") : formatDuration(compile.durationMs)) : null,
          tab === "terminal" ? h("button", { className: "ps-btn", type: "button", onClick: onClear }, t("clear")) : null,
          h("button", { className: "ps-btn icon", type: "button", onClick: onClose, "aria-label": t("close") }, h(Icon.close))),
        tab === "problems"
          ? h("div", { className: "ps-problems" },
            compile
              ? (problems.length === 0
                ? h("div", { className: "ps-status", style: { padding: "10px 6px" } }, t("noProblems"))
                : problems.map((problem, index) => {
                  const [cls, badge] = severity(problem.kind);
                  return h("button", {
                    key: `${problem.file}:${problem.line}:${index}`,
                    className: `ps-problem ${cls}`,
                    type: "button",
                    title: problem.message,
                    onClick: () => onOpenProblem(problem),
                  },
                  h("span", { className: "ps-sev" }, badge),
                  h("span", { className: "ps-problem-loc" }, `${problem.file ? `${problem.file}${problem.line ? `:${problem.line}` : ""}` : "log"}`),
                  h("span", { className: "ps-problem-msg" }, problem.message));
                }))
              : h("div", { className: "ps-status", style: { padding: "10px 6px" } }, t("problemsHint")))
          : h("pre", { className: "ps-term", ref: termRef },
            lines.length === 0
              ? h("span", { className: "ps-term-empty" }, t("terminalEmpty"))
              : lines.map((line, index) => h("div", { key: index, className: `ps-term-line${line.kind ? ` ${line.kind}` : ""}` }, line.text.length > 0 ? line.text : " "))));
    }

    function FolderPicker(props) {
      const { t, start, onPick, onClose } = props;
      const [state, setState] = useState({ path: "", parent: null, home: "", papers: "", entries: [], loading: true, error: "" });
      const load = useCallback(async (target) => {
        setState((current) => ({ ...current, loading: true, error: "" }));
        try {
          const data = await request("fs/list", { query: { path: target || undefined } });
          setState({
            path: data.path,
            parent: data.parent,
            home: data.home,
            papers: data.papers,
            entries: data.entries || [],
            loading: false,
            error: "",
          });
        } catch (error) {
          setState((current) => ({ ...current, loading: false, error: error.message }));
        }
      }, []);
      useEffect(() => { void load(start); }, [load, start]);
      const go = (target) => { if (target) void load(target); };
      return h("div", { className: "ps-browser" },
        h("div", { className: "ps-browser-head" },
          h("button", { className: "ps-btn icon", type: "button", title: t("up"), "aria-label": t("up"), disabled: !state.parent, onClick: () => go(state.parent) }, "\u2191"),
          h("span", { className: "ps-browser-path", title: state.path }, state.path || "\u2026"),
          h("button", { className: "ps-btn", type: "button", onClick: () => go(state.home) }, t("home")),
          h("button", { className: "ps-btn", type: "button", onClick: () => go(state.papers) }, t("papersFolder"))),
        h("div", { className: "ps-browser-list" },
          state.loading
            ? h("div", { className: "ps-browser-empty" }, t("loading"))
            : state.error
              ? h("div", { className: "ps-browser-empty" }, state.error)
              : state.entries.length === 0
                ? h("div", { className: "ps-browser-empty" }, t("noSubfolders"))
                : state.entries.map((entry) => h("button", {
                  key: entry.path,
                  className: "ps-browser-row",
                  type: "button",
                  title: entry.path,
                  onClick: () => go(entry.path),
                },
                h(Icon.folder),
                h("span", { className: "ps-browser-name" }, entry.name),
                entry.registered ? h("span", { className: "ps-browser-tag" }, t("registered")) : null))),
        h("div", { className: "ps-browser-foot" },
          h("button", {
            className: "ps-btn primary", type: "button",
            disabled: state.loading || Boolean(state.error),
            onClick: () => onPick(state.path),
          }, t("useFolder")),
          h("button", { className: "ps-btn", type: "button", onClick: onClose }, t("cancel"))));
    }

    function Explosion(props) {
      const { nonce, onDone } = props;
      const particles = useMemo(() => {
        if (!nonce) return [];
        const colors = ["#f97316", "#ef4444", "#facc15", "#fb923c", "#e879f9", "#38bdf8"];
        const list = [];
        for (let index = 0; index < 46; index += 1) {
          const angle = (Math.PI * 2 * index) / 46 + Math.random() * 0.3;
          const distance = 80 + Math.random() * 240;
          list.push({
            key: `${nonce}-${index}`,
            dx: `${Math.round(Math.cos(angle) * distance)}px`,
            dy: `${Math.round(Math.sin(angle) * distance)}px`,
            size: `${Math.round(4 + Math.random() * 7)}px`,
            color: colors[index % colors.length],
            delay: `${Math.round(Math.random() * 70)}ms`,
          });
        }
        return list;
      }, [nonce]);
      useEffect(() => {
        if (!nonce) return undefined;
        const timer = setTimeout(onDone, 1600);
        return () => clearTimeout(timer);
      }, [nonce, onDone]);
      if (!nonce) return null;
      return h("div", { className: "ps-boom", "aria-hidden": "true" },
        h("div", { className: "ps-boom-flash", key: "flash" }),
        h("div", { className: "ps-boom-ring", key: "ring" }),
        particles.map((particle) => h("span", {
          key: particle.key,
          className: "ps-boom-particle",
          style: {
            "--dx": particle.dx,
            "--dy": particle.dy,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            animationDelay: particle.delay,
          },
        })),
        h("div", { className: "ps-boom-text", key: "text" }, "\u{1F4A5}"));
    }

    const gitStatusClass = (status) => {
      if (status.includes("?")) return "untracked";
      if (status.includes("D")) return "del";
      if (status.includes("A")) return "new";
      if (status.includes("R")) return "ren";
      return "mod";
    };

    function GitView(props) {
      const { t, info, diff, diffOpen, busy, onAction, onNewBranch, onNuke, onSwitch, onRefresh, onOpenFile, onToggleDiff } = props;
      const data = info.data;
      const stats = useMemo(() => {
        let add = 0;
        let del = 0;
        let files = 0;
        for (const line of String(diff || "").split("\n")) {
          if (line.startsWith("diff --git")) files += 1;
          else if (line.startsWith("+") && !line.startsWith("+++")) add += 1;
          else if (line.startsWith("-") && !line.startsWith("---")) del += 1;
        }
        return { add, del, files };
      }, [diff]);

      if (info.error) {
        return h("div", { className: "ps-git" },
          h("div", { className: "ps-git-card" }, h("div", { className: "ps-git-hint" }, info.error)));
      }
      if (!data) {
        return h("div", { className: "ps-git" },
          h("div", { className: "ps-git-card" }, h("div", { className: "ps-git-hint" }, t("loading"))));
      }
      if (!data.repo) {
        return h("div", { className: "ps-git" },
          h("div", { className: "ps-git-card" },
            h("div", { className: "ps-git-hint" }, t("notGitRepo")),
            h("button", { className: "ps-btn primary", type: "button", onClick: () => onAction("init") }, t("initializeGit"))),
          h("button", { className: "ps-btn icon", type: "button", title: t("refresh"), onClick: onRefresh }, h(Icon.refresh)));
      }

      const files = data.files || [];
      const branches = data.branches || [];
      const ahead = data.ahead || 0;
      const behind = data.behind || 0;
      const lines = String(diff || "").split("\n");
      const capped = lines.slice(0, 2500);
      const disabled = Boolean(busy);

      return h("div", { className: "ps-git" },
        h("div", { className: "ps-git-card" },
          h("div", { className: "ps-git-branchline" },
            h("code", { className: "ps-git-branch" }, data.branch || "?"),
            data.upstream ? h("span", { className: "ps-git-upstream", title: data.upstream }, data.upstream) : null,
            h("button", { className: "ps-btn icon", type: "button", title: t("refresh"), onClick: onRefresh }, h(Icon.refresh))),
          h("div", { className: "ps-git-pills" },
            ahead > 0 ? h("span", { className: "ps-pill push" }, `\u2191 ${ahead} ${t("toPush")}`) : null,
            behind > 0 ? h("span", { className: "ps-pill pull" }, `\u2193 ${behind} ${t("toPull")}`) : null,
            ahead === 0 && behind === 0 ? h("span", { className: "ps-pill ok" }, t("inSync")) : null,
            files.length > 0
              ? h("span", { className: "ps-pill warn" }, `${files.length} ${t("changed")}`)
              : h("span", { className: "ps-pill ok" }, t("cleanTree")))),

        h("div", { className: "ps-git-actions" },
          h("button", { className: "ps-btn primary", type: "button", disabled, title: t("pullHint"), onClick: () => onAction("pull") }, h(Icon.pull), busy === "pull" ? "\u2026" : t("pull")),
          h("button", { className: "ps-btn", type: "button", disabled, title: t("pushHint"), onClick: () => onAction("push") }, h(Icon.push), busy === "push" ? "\u2026" : t("push")),
          h("button", { className: "ps-btn", type: "button", disabled, title: t("fetchHint"), onClick: () => onAction("fetch") }, h(Icon.fetch), busy === "fetch" ? "\u2026" : t("fetch")),
          h("button", { className: "ps-btn", type: "button", disabled, onClick: onNewBranch }, h(Icon.plus), t("newBranch")),
          h("button", { className: "ps-btn danger wide", type: "button", disabled, title: t("nukeHint"), onClick: onNuke }, h(Icon.bomb), t("nuke"))),
        h("div", { className: "ps-git-hint" }, t("fetchVsPull")),

        h("div", { className: "ps-git-card" },
          h("div", { className: "ps-git-section-head" },
            h("span", null, t("changes")),
            h("span", { className: "ps-git-count" }, String(files.length))),
          files.length === 0
            ? h("div", { className: "ps-git-empty" }, h(Icon.check), t("cleanTree"))
            : h("div", { className: "ps-git-files" }, files.map((file) => h("button", {
              key: file.path,
              className: "ps-git-file",
              type: "button",
              title: file.path,
              onClick: () => onOpenFile(file.path),
            },
            h("span", { className: `ps-git-status ${gitStatusClass(file.status || "")}` }, (file.status || "?").slice(0, 2)),
            h("span", { className: "ps-git-path" }, file.path))))),

        h("details", { className: "ps-git-details" },
          h("summary", null, t("details")),
          h("div", { className: "ps-git-detail" }, h("span", null, t("sshKey")), h("code", { title: data.sshKey || "" }, data.sshKey || "\u2014")),
          h("div", { className: "ps-git-detail" }, h("span", null, t("upstream")), h("code", { title: data.upstream || "" }, data.upstream || "\u2014")),
          h("div", { className: "ps-git-detail" }, h("span", null, t("lastCommit")), h("code", { title: data.lastCommit || "" }, data.lastCommit || "\u2014")),
          h("label", { className: "ps-git-branchselect" }, t("switchBranch"),
            h("select", { className: "ps-select", value: data.branch || "", onChange: (event) => onSwitch(event.target.value) },
              branches.map((branch) => h("option", { key: branch, value: branch }, branch))))),

        h("div", { className: "ps-git-diff-head" },
          h("button", { className: "ps-btn", type: "button", onClick: onToggleDiff }, diffOpen ? t("hideDiff") : t("showDiff")),
          stats.files > 0
            ? h("span", { className: "ps-git-stats" },
              `${stats.files} ${t("filesChanged")} \u00b7 `,
              h("span", { className: "plus" }, `+${stats.add}`), " ",
              h("span", { className: "minus" }, `\u2212${stats.del}`))
            : null),
        diffOpen
          ? h("pre", { className: "ps-git-diff" },
            capped.map((line, index) => h("div", {
              key: index,
              className: line.startsWith("+++") || line.startsWith("---")
                ? ""
                : line.startsWith("+") ? "add" : line.startsWith("-") ? "del" : line.startsWith("@@") ? "hunk" : "",
            }, line.length > 0 ? line : " ")),
            lines.length > capped.length ? h("div", null, `\u2026 ${lines.length - capped.length} more lines`) : null)
          : null);
    }

    const pageWordCache = new Map();

    /**
     * One rendered PDF page with a selectable word layer built from the PDF's own
     * word boxes. Dragging selects words, double-click selects one, and the bar
     * can send the selection back to the editor.
     */
    /**
     * Reading order for a page. A two-column body would otherwise interleave
     * lines from both columns when the selection is dragged downwards.
     */
    function orderPageWords(list, width, height) {
      if (!list || list.length === 0 || !width) return list || [];
      const mid = width / 2;
      const gapLimit = Math.max(10, width * 0.02);
      const tolerance = 3;
      const sorted = [...list].sort((left, right) => (left.yMin - right.yMin) || (left.xMin - right.xMin));
      const lines = [];
      for (const word of sorted) {
        const line = lines[lines.length - 1];
        if (line && Math.abs(word.yMin - line.yMin) <= tolerance) {
          line.words.push(word);
          line.yMin = Math.min(line.yMin, word.yMin);
        } else {
          lines.push({ yMin: word.yMin, words: [word] });
        }
      }
      const output = [];
      let pending = [];
      const flush = () => {
        if (pending.length === 0) return;
        const byY = (left, right) => (left.yMin - right.yMin) || (left.xMin - right.xMin);
        const leftWords = pending.filter((entry) => entry.side === "left").flatMap((entry) => entry.words);
        const rightWords = pending.filter((entry) => entry.side === "right").flatMap((entry) => entry.words);
        leftWords.sort(byY);
        rightWords.sort(byY);
        output.push(...leftWords, ...rightWords);
        pending = [];
      };
      for (const line of lines) {
        const words = line.words.sort((left, right) => left.xMin - right.xMin);
        // A genuine column gutter is a large gap that straddles the middle.
        let split = -1;
        for (let index = 0; index < words.length - 1; index += 1) {
          const gap = words[index + 1].xMin - words[index].xMax;
          const straddles = words[index].xMax <= mid + 1 && words[index + 1].xMin >= mid - 1;
          if (straddles && gap > gapLimit) { split = index; break; }
        }
        if (split >= 0) {
          pending.push({ side: "left", words: words.slice(0, split + 1) });
          pending.push({ side: "right", words: words.slice(split + 1) });
        } else if (words[0].xMin < mid - 1 && words[words.length - 1].xMax > mid + 1) {
          // One continuous run across the middle: a full-width band (figure*,
          // table*, title), which must not be split into columns.
          flush();
          output.push(...words);
        } else {
          const center = (words[0].xMin + words[words.length - 1].xMax) / 2;
          pending.push({ side: center < mid ? "left" : "right", words });
        }
      }
      flush();
      return output;
    }

    const PageTextLayer = React.memo(function PageTextLayer({ words, layerRef }) {
      const spans = useMemo(() => {
        if (!words || !words.width || !words.height || words.words.length === 0) return [];
        return orderPageWords(words.words, words.width, words.height)
          .map((word, index) => ({ word, index }));
      }, [words]);
      return h("div", { className: "ps-text-layer", ref: layerRef },
        spans.map(({ word, index }) => h("span", {
          key: index,
          "data-x": (word.xMin + word.xMax) / 2,
          "data-y": (word.yMin + word.yMax) / 2,
          style: {
            left: `${(word.xMin / words.width) * 100}%`,
            top: `${(word.yMin / words.height) * 100}%`,
            width: `${((word.xMax - word.xMin) / words.width) * 100}%`,
            height: `${((word.yMax - word.yMin) / words.height) * 100}%`,
            fontSize: `${((word.yMax - word.yMin) / words.height).toFixed(5)}em`,
          },
        }, word.text)));
    });

    const PdfPage = React.memo(function PdfPage(props) {
      const { t, project, page, rev, url, eager, onGoTo, notify, onMissing, textLayer } = props;
      const boxRef = useRef(null);
      const layerRef = useRef(null);
      const [words, setWords] = useState(null);
      const [selection, setSelection] = useState(null);
      const [busy, setBusy] = useState(false);
      const [nearViewport, setNearViewport] = useState(Boolean(eager));

      useEffect(() => {
        const box = boxRef.current;
        if (!box) return undefined;
        const pane = box.closest(".ps-pdf-scroll");
        if (!pane) return undefined;
        const onWheel = (event) => {
          if (event.ctrlKey) return;
          const before = pane.scrollTop;
          pane.scrollTop += event.deltaY;
          if (event.deltaX !== 0) pane.scrollLeft += event.deltaX;
          if (pane.scrollTop !== before || event.deltaX !== 0) event.preventDefault();
        };
        box.addEventListener("wheel", onWheel, { passive: false });
        return () => box.removeEventListener("wheel", onWheel);
      }, []);

      useEffect(() => {
        const box = boxRef.current;
        if (!box || typeof IntersectionObserver === "undefined") { setNearViewport(true); return undefined; }
        const pane = box.closest(".ps-pdf-scroll");
        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) setNearViewport(entry.isIntersecting);
        }, { root: pane || null, rootMargin: "1200px" });
        observer.observe(box);
        return () => observer.disconnect();
      }, []);

      const loadWords = useCallback(async () => {
        if (words) return words;
        const key = `${project}:${rev}:${page}`;
        if (!pageWordCache.has(key)) {
          const promise = request("page/words", { query: { project, page, rev } });
          pageWordCache.set(key, promise.catch((error) => {
            pageWordCache.delete(key);
            throw error;
          }));
        }
        const data = await pageWordCache.get(key);
        setWords(data);
        return data;
      }, [page, project, rev, words]);

      // Fetch word boxes when the page approaches the viewport, not all at once.
      useEffect(() => {
        if (words) return undefined;
        const box = boxRef.current;
        if (!box) return undefined;
        let cancelled = false;
        const load = () => {
          loadWords().catch((error) => { if (!cancelled) notify(error.message, "err"); });
        };
        if (typeof IntersectionObserver === "undefined") {
          load();
          return () => { cancelled = true; };
        }
        const observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            load();
          }
        }, { rootMargin: "600px" });
        observer.observe(box);
        return () => {
          cancelled = true;
          observer.disconnect();
        };
      }, [loadWords, notify, words]);

      // The layer is sized in pixels; spans use em, so zoom just rescales them.
      useEffect(() => {
        const box = boxRef.current;
        const layer = layerRef.current;
        if (!box || !layer) return undefined;
        const resize = () => {
          layer.style.fontSize = `${box.getBoundingClientRect().height}px`;
        };
        resize();
        if (typeof ResizeObserver === "undefined") return undefined;
        const observer = new ResizeObserver(resize);
        observer.observe(box);
        return () => observer.disconnect();
      }, [words]);

      // Follow the browser's native selection; no custom drag/selection model.
      useEffect(() => {
        const onSelectionChange = () => {
          const live = window.getSelection();
          if (!live || live.rangeCount === 0 || live.isCollapsed) {
            setSelection(null);
            return;
          }
          const range = live.getRangeAt(0);
          const layer = layerRef.current;
          const box = boxRef.current;
          if (!layer || !box || !layer.contains(range.commonAncestorContainer)) {
            setSelection(null);
            return;
          }
          const parts = [...range.cloneContents().querySelectorAll("span")]
            .map((node) => node.textContent)
            .filter(Boolean);
          const text = (parts.length > 0 ? parts.join(" ") : live.toString()).replace(/\s+/gu, " ").trim();
          if (text.length === 0) {
            setSelection(null);
            return;
          }
          const anchor = range.startContainer.nodeType === 3 ? range.startContainer.parentElement : range.startContainer;
          const span = anchor && anchor.closest ? anchor.closest("span[data-x]") : null;
          const rect = range.getBoundingClientRect();
          const boxRect = box.getBoundingClientRect();
          setSelection({
            text,
            x: span ? Number(span.dataset.x) : (words ? words.width / 2 : 0),
            y: span ? Number(span.dataset.y) : (words ? words.height / 2 : 0),
            left: rect.left - boxRect.left + rect.width / 2,
            top: rect.bottom - boxRect.top + 6,
          });
        };
        document.addEventListener("selectionchange", onSelectionChange);
        return () => document.removeEventListener("selectionchange", onSelectionChange);
      }, [words]);

      const goToEditor = useCallback(async () => {
        if (!selection || busy) return;
        setBusy(true);
        try {
          await onGoTo({ page, x: selection.x, y: selection.y, text: selection.text });
        } finally {
          setBusy(false);
        }
      }, [busy, onGoTo, page, selection]);

      const copyText = useCallback(async () => {
        if (!selection) return;
        try {
          await navigator.clipboard.writeText(selection.text);
          notify(t("copied"));
        } catch {
          notify(t("copyFailed"), "err");
        }
      }, [notify, selection, t]);

      return h("div", { className: "ps-page-box", ref: boxRef },
        nearViewport ? h("img", {
          className: "ps-page",
          src: url,
          alt: `page ${page}`,
          loading: eager ? "eager" : "lazy",
          draggable: false,
          onError: () => { if (onMissing) onMissing(); },
        }) : h("div", { className: "ps-page ps-page-placeholder", "aria-hidden": "true" }),
        words && nearViewport && textLayer && words.words.length > 0
          ? h(PageTextLayer, { words, layerRef })
          : null,
        selection
          ? h("div", {
            className: "ps-page-bar",
            style: { left: selection.left, top: selection.top },
            onMouseDown: (event) => {
              event.preventDefault();
              event.stopPropagation();
            },
          },
          h("button", { className: "ps-btn primary", type: "button", disabled: busy, title: t("goToEditorHint"), onClick: goToEditor }, busy ? "…" : t("goToEditor")),
          h("button", { className: "ps-btn", type: "button", onClick: copyText }, t("copyText")))
          : null);
    });

    // -- main component ----------------------------------------------------
    function parseDiffSuggestions(text) {
      const suggestions = [];
      const blocks = /```(?:diff|patch)\s*\n([\s\S]*?)```/giu;
      let match;
      while ((match = blocks.exec(String(text || "")))) {
        const body = match[1].endsWith("\n") ? match[1].slice(0, -1) : match[1];
        const lines = body.split("\n");
        let file = "";
        const hunks = [];
        let hunk = null;
        for (const line of lines) {
          if (line.startsWith("+++ ") || line.startsWith("--- ")) {
            const candidate = line.slice(4).replace(/^[ab]\//u, "").trim();
            if (line.startsWith("+++ ") && candidate && candidate !== "/dev/null") file = candidate;
            continue;
          }
          if (line.startsWith("@@")) {
            hunk = { header: line, lines: [] };
            hunks.push(hunk);
            continue;
          }
          if (!hunk) continue;
          if (line.startsWith("+")) hunk.lines.push({ type: "+", text: line.slice(1) });
          else if (line.startsWith("-")) hunk.lines.push({ type: "-", text: line.slice(1) });
          else hunk.lines.push({ type: " ", text: line.slice(1) });
        }
        if (hunks.length > 0) suggestions.push({ file, hunks });
      }
      return suggestions;
    }

    function stripDiffBlocks(text) {
      return String(text || "").replace(/```(?:diff|patch)\s*\n[\s\S]*?```/giu, "").trim();
    }

    function diffChangeKey(file, hunk) {
      const text = `${file || ""}|${hunk.header || ""}|${hunk.lines.map((line) => `${line.type}${line.text}`).join("\n")}`;
      let hash = 5381;
      for (let index = 0; index < text.length; index += 1) hash = ((hash * 33) ^ text.charCodeAt(index)) >>> 0;
      return `c${hash.toString(36)}`;
    }

    function collectChanges(messages) {
      const changes = [];
      (Array.isArray(messages) ? messages : []).forEach((message, messageIndex) => {
        if (message.role !== "assistant") return;
        parseDiffSuggestions(message.content).forEach((suggestion, suggestionIndex) => {
          suggestion.hunks.forEach((hunk, hunkIndex) => {
            changes.push({
              id: diffChangeKey(suggestion.file, hunk),
              file: suggestion.file || "",
              hunk,
            });
          });
        });
      });
      return changes;
    }

    function applySuggestion(content, suggestion) {
      const lines = String(content || "").split("\n");
      const hunks = [...suggestion.hunks].sort((left, right) => {
        const startOf = (hunk) => {
          const match = /^@@ -(\d+)/u.exec(hunk.header || "");
          return match ? Number(match[1]) : 0;
        };
        return startOf(right) - startOf(left);
      });
      for (const hunk of hunks) {
        const oldLines = hunk.lines.filter((line) => line.type !== "+").map((line) => line.text);
        const newLines = hunk.lines.filter((line) => line.type !== "-").map((line) => line.text);
        const match = /^@@ -(\d+)(?:,(\d+))?/u.exec(hunk.header || "");
        const declared = match ? Number(match[1]) - 1 : -1;
        const count = match && match[2] !== undefined ? Number(match[2]) : oldLines.length;
        const same = (index) => lines.slice(index, index + count)
          .every((line, offset) => String(line ?? "").trimEnd() === String(oldLines[offset] ?? "").trimEnd());
        let at = -1;
        if (declared >= 0 && declared + count <= lines.length && same(declared)) at = declared;
        if (at < 0 && declared >= 0) {
          for (let delta = 1; delta <= 8 && at < 0; delta += 1) {
            for (const candidate of [declared - delta, declared + delta]) {
              if (candidate >= 0 && candidate + count <= lines.length && same(candidate)) { at = candidate; break; }
            }
          }
        }
        if (at < 0) {
          // Last resort: locate the removed/context block by text.
          const before = oldLines.join("\n");
          if (before) {
            const index = lines.join("\n").indexOf(before);
            if (index >= 0) {
              const prefix = lines.join("\n").slice(0, index);
              at = prefix.split("\n").length - 1;
            }
          }
        }
        if (at < 0) return null;
        lines.splice(at, count, ...newLines);
      }
      return lines.join("\n");
    }

    function parseChoiceBlocks(text) {
      const blocks = [];
      const pattern = /```choices?\s*\n([\s\S]*?)```/giu;
      let match;
      let index = 0;
      while ((match = pattern.exec(String(text || "")))) {
        const body = match[1].endsWith("\n") ? match[1].slice(0, -1) : match[1];
        const options = body.split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const clean = line.replace(/^(?:\d+[.)]|[-*])\s*/u, "");
            const [label, ...rest] = clean.split(/\s+[—–]\s+/u);
            return { label: label.trim(), description: rest.join(" — ").trim() };
          })
          .filter((option) => option.label.length > 0);
        if (options.length > 0) blocks.push({ id: index, options });
        index += 1;
      }
      return blocks;
    }

    function stripMemoryBlocks(text) {
      return String(text || "").replace(/```memory\s*\n[\s\S]*?```/giu, "");
    }

    function stripWebBlocks(text) {
      return String(text || "").replace(/```web\s*\n[\s\S]*?```/giu, "");
    }

    function stripReadBlocks(text) {
      return String(text || "").replace(/```read\s*\n[^\n]+\n```/giu, "");
    }

    function stripChoiceBlocks(text) {
      return String(text || "").replace(/```choices?\s*\n[\s\S]*?```/giu, "");
    }

    function ChoiceCard({ t, options, onChoose }) {
      const [selected, setSelected] = useState(0);
      const [custom, setCustom] = useState("");
      const hasCustom = custom.trim().length > 0;
      const value = hasCustom ? custom.trim() : (options[selected] ? options[selected].label : "");
      return h("div", { className: "ps-chat-choice" },
        h("div", { className: "ps-chat-choice-head" }, t("chooseOption")),
        options.map((option, index) => h("label", { className: "ps-chat-choice-option", key: index },
          h("input", {
            type: "radio", checked: selected === index && !hasCustom,
            onChange: () => { setSelected(index); setCustom(""); },
          }),
          h("span", { className: "ps-chat-choice-text" },
            h("b", null, option.label),
            option.description ? h("span", { className: "ps-chat-choice-desc" }, option.description) : null))),
        h("label", { className: "ps-chat-choice-option" },
          h("input", { type: "radio", checked: hasCustom, onChange: () => {} }),
          h("input", {
            className: "ps-input ps-chat-choice-input", value: custom,
            placeholder: t("otherOption"),
            onChange: (event) => setCustom(event.target.value),
          })),
        h("button", {
          className: "ps-btn primary", type: "button", disabled: !value,
          onClick: () => onChoose(value),
        }, t("choose")));
    }

    let katexPromise = null;
    function loadKatex() {
      if (!katexPromise) katexPromise = import(apiUrl("asset", { name: "katex.js" })).catch(() => null);
      return katexPromise;
    }

    function myersOps(a, b, maxD) {
      const n = a.length;
      const m = b.length;
      const max = n + m;
      if (max === 0) return [];
      const offset = max + 1;
      const v = new Int32Array(2 * max + 3);
      const trace = [];
      const limit = Math.min(max, maxD);
      for (let d = 0; d <= limit; d += 1) {
        trace.push(v.slice());
        for (let k = -d; k <= d; k += 2) {
          let x;
          if (k === -d || (k !== d && v[offset + k - 1] < v[offset + k + 1])) x = v[offset + k + 1];
          else x = v[offset + k - 1] + 1;
          let y = x - k;
          while (x < n && y < m && a[x] === b[y]) { x += 1; y += 1; }
          v[offset + k] = x;
          if (x >= n && y >= m) {
            const ops = [];
            let bx = n;
            let by = m;
            for (let depth = d; depth >= 0; depth -= 1) {
              const row = trace[depth];
              const kk = bx - by;
              let prevK;
              if (kk === -depth || (kk !== depth && row[offset + kk - 1] < row[offset + kk + 1])) prevK = kk + 1;
              else prevK = kk - 1;
              const prevX = depth === 0 ? 0 : row[offset + prevK];
              const prevY = prevX - prevK;
              while (bx > prevX && by > prevY) { ops.push({ kind: "eq" }); bx -= 1; by -= 1; }
              if (depth === 0) break;
              if (bx === prevX) { by -= 1; ops.push({ kind: "ins", index: by }); }
              else { bx -= 1; ops.push({ kind: "del" }); }
            }
            return ops.reverse();
          }
        }
      }
      return null;
    }

    function diffLineKinds(base, current) {
      const a = String(base ?? "").replace(/\r\n/gu, "\n").split("\n");
      const b = String(current ?? "").replace(/\r\n/gu, "\n").split("\n");
      const kinds = new Map();
      let start = 0;
      while (start < a.length && start < b.length && a[start] === b[start]) start += 1;
      let endA = a.length;
      let endB = b.length;
      while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) { endA -= 1; endB -= 1; }
      const A = a.slice(start, endA);
      const B = b.slice(start, endB);
      const n = A.length;
      const m = B.length;
      if (n === 0 && m === 0) return kinds;
      if (m === 0) {
        const target = Math.min(start, b.length - 1);
        if (target >= 0) kinds.set(target, "del");
        return kinds;
      }
      if (n === 0) {
        for (let j = 0; j < m; j += 1) kinds.set(start + j, "add");
        return kinds;
      }
      const ops = myersOps(A, B, 4000);
      if (!ops) return kinds;
      let currentIndex = 0;
      let k = 0;
      while (k < ops.length) {
        if (ops[k].kind === "eq") { currentIndex += 1; k += 1; continue; }
        let deletes = 0;
        const inserts = [];
        while (k < ops.length && ops[k].kind !== "eq") {
          if (ops[k].kind === "del") deletes += 1;
          else inserts.push(start + ops[k].index);
          k += 1;
        }
        const paired = Math.min(deletes, inserts.length);
        for (let p = 0; p < paired; p += 1) kinds.set(inserts[p], "mod");
        for (let p = paired; p < inserts.length; p += 1) kinds.set(inserts[p], "add");
        for (let p = 0; p < deletes - paired; p += 1) {
          const target = Math.min(start + currentIndex + inserts.length, start + m - 1);
          if (target >= start && !kinds.has(target)) kinds.set(target, "del");
        }
        currentIndex += inserts.length;
      }
      return kinds;
    }

    function splitMath(text) {
      const source = String(text || "");
      const parts = [];
      const pattern = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+?\$)/gu;
      let last = 0;
      let match;
      while ((match = pattern.exec(source))) {
        if (match.index > last) parts.push({ math: false, text: source.slice(last, match.index) });
        const raw = match[0];
        const display = raw.startsWith("$$") || raw.startsWith("\\[");
        const body = raw.startsWith("$$") ? raw.slice(2, -2)
          : raw.startsWith("\\[") ? raw.slice(2, -2)
            : raw.startsWith("\\(") ? raw.slice(2, -2)
              : raw.slice(1, -1);
        parts.push({ math: true, display, text: body });
        last = match.index + raw.length;
      }
      if (last < source.length) parts.push({ math: false, text: source.slice(last) });
      return parts;
    }

    function mathNode(part, katex, key) {
      const props = {
        key,
        className: `ps-math${part.display ? " ps-math-display" : ""}`,
      };
      if (katex && katex.katex) {
        props.dangerouslySetInnerHTML = {
          __html: katex.katex.renderToString(part.text, { displayMode: part.display, throwOnError: false, output: "mathml" }),
        };
      } else {
        props.children = part.display ? `$$${part.text}$$` : `$${part.text}$`;
      }
      return h("span", props);
    }

    function renderInline(text, katex, keyPrefix) {
      const nodes = [];
      const pattern = /(`[^`\n]+`|\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|\*[^*\n]+\*|_[^_\n]+_)/gu;
      let last = 0;
      let match;
      let index = 0;
      const push = (node) => nodes.push(h(React.Fragment, { key: `${keyPrefix}-${index++}` }, node));
      while ((match = pattern.exec(String(text || "")))) {
        if (match.index > last) push(String(text).slice(last, match.index));
        const raw = match[0];
        if (raw.startsWith("`")) {
          push(h("code", { className: "ps-md-code" }, raw.slice(1, -1)));
        } else if (raw.startsWith("$$") || raw.startsWith("$")) {
          const display = raw.startsWith("$$");
          push(mathNode({ math: true, display, text: display ? raw.slice(2, -2) : raw.slice(1, -1) }, katex, `${keyPrefix}-m-${index}`));
        } else if (raw.startsWith("[")) {
          const link = /^\[([^\]]+)\]\(([^)]+)\)$/u.exec(raw);
          const href = link && /^(https?:\/\/|mailto:|\/|#)/iu.test(link[2]) ? link[2] : null;
          push(href
            ? h("a", { href, target: "_blank", rel: "noreferrer noopener" }, link[1])
            : raw);
        } else if (raw.startsWith("**") || raw.startsWith("__")) {
          push(h("strong", null, renderInline(raw.slice(2, -2), katex, `${keyPrefix}-b-${index}`)));
        } else if (raw.startsWith("~~")) {
          push(h("del", null, renderInline(raw.slice(2, -2), katex, `${keyPrefix}-s-${index}`)));
        } else {
          push(h("em", null, renderInline(raw.slice(1, -1), katex, `${keyPrefix}-i-${index}`)));
        }
        last = match.index + raw.length;
      }
      if (last < String(text || "").length) push(String(text).slice(last));
      return nodes;
    }

    function renderMarkdown(text, katex) {
      const lines = String(text || "").replace(/\r\n/gu, "\n").split("\n");
      const blocks = [];
      let i = 0;
      let blockIndex = 0;
      const push = (node) => blocks.push(h(React.Fragment, { key: `md-${blockIndex++}` }, node));
      while (i < lines.length) {
        const line = lines[i];
        if (/^\s*$/u.test(line)) { i += 1; continue; }
        const fence = /^```\s*([\w-]*)\s*$/u.exec(line);
        if (fence) {
          const code = [];
          i += 1;
          while (i < lines.length && !/^```\s*$/u.test(lines[i])) { code.push(lines[i]); i += 1; }
          i += 1;
          push(h("pre", { className: "ps-chat-code" }, h("code", { className: fence[1] ? `language-${fence[1]}` : undefined }, code.join("\n"))));
          continue;
        }
        const heading = /^(#{1,6})\s+(.*)$/u.exec(line);
        if (heading) {
          push(h(`h${heading[1].length}`, { className: `ps-md-h${heading[1].length}` }, renderInline(heading[2], katex, `md-${blockIndex}`)));
          i += 1;
          continue;
        }
        if (/^(---|\*\*\*|___)\s*$/u.test(line)) {
          push(h("hr", { className: "ps-md-hr" }));
          i += 1;
          continue;
        }
        if (/^>\s?/u.test(line)) {
          const quote = [];
          while (i < lines.length && /^>\s?/u.test(lines[i])) { quote.push(lines[i].replace(/^>\s?/u, "")); i += 1; }
          push(h("blockquote", { className: "ps-md-quote" }, renderInline(quote.join(" "), katex, `md-${blockIndex}`)));
          continue;
        }
        const unordered = /^\s*[-*+]\s+(.*)$/u.exec(line);
        const ordered = /^\s*\d+[.)]\s+(.*)$/u.exec(line);
        if (unordered || ordered) {
          const items = [];
          const matcher = unordered ? /^\s*[-*+]\s+(.*)$/u : /^\s*\d+[.)]\s+(.*)$/u;
          while (i < lines.length) {
            const item = matcher.exec(lines[i]);
            if (!item) break;
            items.push(h("li", { key: `li-${blockIndex}-${items.length}` }, renderInline(item[1], katex, `md-${blockIndex}-${items.length}`)));
            i += 1;
          }
          push(h(unordered ? "ul" : "ol", { className: "ps-md-list" }, items));
          continue;
        }
        const paragraph = [line];
        i += 1;
        while (i < lines.length && !/^\s*$/u.test(lines[i]) && !/^```/u.test(lines[i]) && !/^#{1,6}\s+/u.test(lines[i])
          && !/^>\s?/u.test(lines[i]) && !/^\s*[-*+]\s+/u.test(lines[i]) && !/^\s*\d+[.)]\s+/u.test(lines[i])
          && !/^(---|\*\*\*|___)\s*$/u.test(lines[i])) {
          paragraph.push(lines[i]);
          i += 1;
        }
        push(h("p", null, renderInline(paragraph.join(" "), katex, `md-${blockIndex}`)));
      }
      return blocks;
    }

    function RichText({ text }) {
      const [katex, setKatex] = useState(null);
      useEffect(() => {
        let alive = true;
        loadKatex().then((module) => { if (alive) setKatex(module || null); });
        return () => { alive = false; };
      }, []);
      const content = useMemo(() => renderMarkdown(text, katex), [text, katex]);
      return h("div", { className: "ps-chat-text" }, content);
    }

    function lastThinkingStep(text) {
      const clean = String(text || "").replace(/\s+/gu, " ").trim();
      if (!clean) return "";
      const sentences = clean.split(/(?<=[.!?])\s+/u);
      const tail = sentences.slice(-2).join(" ");
      return (tail || clean).slice(-280);
    }

    function ThinkingBlock({ t, text, mode }) {
      const [open, setOpen] = useState(mode === "full");
      useEffect(() => { setOpen(mode === "full"); }, [mode]);
      if (!text || mode === "off") return null;
      const last = lastThinkingStep(text);
      return h("div", { className: "ps-chat-think" },
        h("button", {
          className: "ps-chat-think-head", type: "button",
          title: open ? t("hideThinking") : t("showThinking"),
          onClick: () => setOpen((value) => !value),
        },
        h(Icon.chevron, { className: `ps-chev${open ? " open" : ""}` }),
        h("span", null, t("thinking")),
        open ? null : h("span", { className: "ps-chat-think-last" }, last)),
        open ? h("pre", { className: "ps-chat-think-body" }, text) : null);
    }

    function ChatPane(props) {
      const {
        t, agent, chat, chats, input, onInput, onSend, onStop, busy, stream,
        onSelectChat, onNewChat, onClose, changes, onKeepChange, onDiscardChange, onKeepAll, onDiscardAll,
        resolvedChoices, onChoose, onDeleteChat, onShowPrompt, onShowMemory, streamReasoning, thinkingMode,
      } = props;
      const logRef = useRef(null);
      useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
      }, [chat && chat.messages ? chat.messages.length : 0, stream, busy]);
      const messages = chat && Array.isArray(chat.messages) ? chat.messages : [];
      return h("div", { className: "ps-chat" },
        h("div", { className: "ps-chat-bar" },
          h("span", { className: "ps-chat-agent", title: agent.name }, agent.name),
          h("select", {
            className: "ps-select", value: chat ? chat.id : "", title: t("chatHistory"),
            onChange: (event) => onSelectChat(event.target.value),
          }, chats.map((item) => h("option", { key: item.id, value: item.id }, `${item.title || t("newChat")}${item.messages ? ` · ${item.messages}` : ""}`))),
          h("button", { className: "ps-btn icon", type: "button", title: t("newChat"), onClick: onNewChat }, h(Icon.plus)),
          h("button", { className: "ps-btn icon ps-chat-prompt", type: "button", title: t("memoryTitle"), onClick: () => onShowMemory && onShowMemory() }, "🧠"),
          h("button", { className: "ps-btn icon ps-chat-prompt", type: "button", title: t("viewPrompt"), onClick: () => onShowPrompt && onShowPrompt() }, "ℹ"),
          h("button", { className: "ps-btn icon ps-chat-delete", type: "button", title: t("deleteChat"), onClick: () => onDeleteChat && onDeleteChat() }, "🗑"),
          h("button", { className: "ps-btn icon", type: "button", title: t("close"), onClick: onClose }, h(Icon.close))),
        h("div", { className: "ps-chat-log", ref: logRef },
          chat && chat.context && chat.context.text ? h("div", { className: "ps-chat-context" },
            h("div", { className: "ps-chat-context-head" },
              `${chat.context.file || ""}${chat.context.startLine ? `:${chat.context.startLine}${chat.context.endLine && chat.context.endLine !== chat.context.startLine ? `-${chat.context.endLine}` : ""}` : ""}`),
            h("div", { className: "ps-chat-context-text" }, chat.context.text.slice(0, 500))) : null,
          messages.map((message, index) => {
            const choices = message.role === "assistant" ? parseChoiceBlocks(message.content) : [];
            const text = message.role === "assistant"
              ? stripMemoryBlocks(stripWebBlocks(stripReadBlocks(stripChoiceBlocks(stripDiffBlocks(message.content)))))
              : (message.kind === "file" ? "" : message.content);
            return h("div", { key: index, className: `ps-chat-msg ${message.role === "user" ? "user" : "assistant"}` },
              h("div", { className: "ps-chat-who" }, message.role === "user" ? t("you") : agent.name),
              message.role === "assistant" && message.reasoning
                ? h(ThinkingBlock, { t, text: message.reasoning, mode: thinkingMode || "last" })
                : null,
              message.kind === "file"
                ? h("div", { className: "ps-chat-file" }, `\u{1F4C4} ${message.path || ""}`)
                : message.kind === "web"
                  ? h("div", { className: "ps-chat-file" }, `\u{1F310} ${message.query || ""}`)
                  : (text ? h(RichText, { text }) : null),
              choices
                .filter((block) => !(resolvedChoices || new Set()).has(`${index}:${block.id}`))
                .map((block) => h(ChoiceCard, {
                  key: block.id, t, options: block.options,
                  onChoose: (value) => onChoose && onChoose(`${index}:${block.id}`, value),
                })));
          }),
          streamReasoning ? h("div", { className: "ps-chat-msg assistant" },
            h("div", { className: "ps-chat-who" }, agent.name),
            h(ThinkingBlock, { t, text: streamReasoning, mode: thinkingMode || "last" })) : null,
          stream ? h("div", { className: "ps-chat-msg assistant" },
            h("div", { className: "ps-chat-who" }, agent.name),
            h(RichText, { text: stream })) : null,
          busy && !stream ? h("div", { className: "ps-chat-msg assistant" },
            h("div", { className: "ps-chat-who" }, agent.name),
            h("div", { className: "ps-chat-text ps-chat-thinking" }, t("thinking"))) : null,
          messages.length === 0 && !stream && !busy
            ? h("div", { className: "ps-hint", style: { padding: "10px 8px" } }, t("chatStartHint"))
            : null),
        changes && changes.length > 0 ? h("div", { className: "ps-chat-changes" },
          h("div", { className: "ps-chat-changes-head" }, `${changes.length} pending`),
          h("div", { className: "ps-chat-changes-list" },
            changes.map((change) => h("div", { className: "ps-chat-change", key: change.id },
              h("span", { className: "ps-chat-change-label", title: change.hunk.header || "" },
                `${change.file ? `${change.file} · ` : ""}${change.hunk.header || ""}`),
              h("button", { className: "ps-btn keep", type: "button", onClick: () => onKeepChange && onKeepChange(change) }, t("keep")),
              h("button", { className: "ps-btn danger", type: "button", onClick: () => onDiscardChange && onDiscardChange(change.id) }, t("discard"))))),
          h("div", { className: "ps-chat-changes-actions" },
            h("button", { className: "ps-btn keep", type: "button", onClick: () => onKeepAll && onKeepAll() }, t("keepAll")),
            h("button", { className: "ps-btn danger", type: "button", onClick: () => onDiscardAll && onDiscardAll() }, t("discardAll")))) : null,
        h("div", { className: "ps-chat-compose" },
          h("textarea", {
            className: "ps-chat-input", value: input, placeholder: t("chatPlaceholder"),
            onChange: (event) => onInput(event.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); onSend(); }
            },
          }),
          busy
            ? h("button", { className: "ps-btn danger", type: "button", onClick: onStop }, t("stop"))
            : h("button", { className: "ps-btn primary", type: "button", disabled: !String(input).trim(), onClick: onSend }, t("send"))));
    }

    function Studio(props) {
      const t = useMemo(() => props.t || ((key) => key), [props.t]);
      const panelInfo = props.panelInfo;
      const panelSnapshot = panelInfo
        ? React.useSyncExternalStore(
          (listener) => panelInfo.subscribe(listener),
          () => panelInfo.getSnapshot(),
        )
        : null;
      const panelActive = !panelInfo || (panelSnapshot && panelSnapshot.activePanelId === PANEL_ID);

      const [catalog, setCatalog] = useState({ projects: [], lastProjectId: null, newProjectRoot: "", tooling: null, dataDir: "" });
      const [project, setProject] = useState(null);
      const [tree, setTree] = useState([]);
      const [treeInfo, setTreeInfo] = useState({ truncated: false });
      const [tabs, setTabs] = useState([]);
      const [active, setActive] = useState(null);
      const [cursor, setCursor] = useState({ line: 1, col: 1 });
      const [expanded, setExpanded] = useState(() => new Set(["sections"]));
      const [explorerOpen, setExplorerOpen] = useState(() => readUi().explorer !== false);
      const [pdfOpen, setPdfOpen] = useState(() => readUi().pdf !== false);
      const togglePdfOpen = useCallback(() => {
        const api = editorApiRef.current;
        const first = api && api.firstVisibleLine ? api.firstVisibleLine() : null;
        setPdfOpen((value) => !value);
        if (first) {
          requestAnimationFrame(() => requestAnimationFrame(() => {
            const current = editorApiRef.current;
            if (current && current.revealLineTop) current.revealLineTop(first);
          }));
        }
      }, []);

      const [zoom, setZoom] = useState(() => Number(readUi().zoom) || 100);
      const [pdf, setPdf] = useState({ rev: null, pages: 0, mode: "none" });
      const [compile, setCompile] = useState(null);
      const [compiling, setCompiling] = useState(false);
      const [dock, setDock] = useState(() => {
        const value = readUi().dock;
        return value === "terminal" || value === "problems" ? value : null;
      });
      const [dockHeight, setDockHeight] = useState(() => Number(readUi().dockHeight) || 196);
      const [compileMenu, setCompileMenu] = useState(false);
      const [explorerWidth, setExplorerWidth] = useState(() => Number(readUi().explorerWidth) || 238);
      const [pdfPct, setPdfPct] = useState(() => Number(readUi().pdfPct) || 44);
      const [terminal, setTerminal] = useState([]);
      const [stage, setStage] = useState("");
      const [elapsed, setElapsed] = useState(0);
      const [symbols, setSymbols] = useState({ labels: [], citations: [], files: [] });
      const [misspelled, setMisspelled] = useState(() => new Set());
      const [missing, setMissing] = useState(null);
      const [explorerTab, setExplorerTab] = useState(() => (readUi().explorerTab === "git" ? "git" : "files"));
      const [gitInfo, setGitInfo] = useState({ data: null, error: "" });
      const [gitDiff, setGitDiff] = useState("");
      const [gitDiffOpen, setGitDiffOpen] = useState(false);
      const [gitBusy, setGitBusy] = useState("");
      const [boom, setBoom] = useState(0);
      const [syntax, setSyntax] = useState(() => readSyntax());
      const [agents, setAgents] = useState(null);
      const [agentEdit, setAgentEdit] = useState(null);
      const [agentBusy, setAgentBusy] = useState(false);
      const [agentBases, setAgentBases] = useState(new Set());
      const agentFileRef = useRef(null);
      const [rightTab, setRightTab] = useState("pdf");
      const [pdfTextLayer, setPdfTextLayer] = useState(true);
      const pdfTextLayerRef = useRef(true);
      useEffect(() => { pdfTextLayerRef.current = pdfTextLayer; }, [pdfTextLayer]);
      const onPdfMissing = useCallback(() => setPdf({ rev: null, pages: 0, mode: "missing" }), []);
      const [chatAgent, setChatAgent] = useState(null);
      const [chat, setChat] = useState(null);
      const [chatList, setChatList] = useState([]);
      const [chatInput, setChatInput] = useState("");
      const [chatBusy, setChatBusy] = useState(false);
      const [chatStream, setChatStream] = useState("");
      const [chatReasoning, setChatReasoning] = useState("");
      const [changes, setChanges] = useState([]);
      const [reviewHidden, setReviewHidden] = useState(false);
      const [resolvedChoices, setResolvedChoices] = useState(new Set());
      const [allChats, setAllChats] = useState(null);
      const resolvedRef = useRef(new Set());
      const resolvedKey = useCallback((chatId) => `ps-chat-resolved:${projectIdRef.current || ""}:${chat && chat.agentId ? chat.agentId : ""}:${chatId || ""}`, [chat]);
      const chatSourceRef = useRef(null);
      const chatJobRef = useRef("");
      const onEditRef = useRef(null);
      const scheduleAutosaveRef = useRef(null);
      const [status, setStatus] = useState({ kind: "idle" });
      const [dialog, setDialog] = useState(null);
      const [busy, setBusy] = useState(false);
      const [dialogError, setDialogError] = useState("");
      const [gitState, setGitState] = useState({ status: null, output: "", busy: false });
      const [toast, setToast] = useState(null);

      const tabsRef = useRef(tabs);
      const projectIdRef = useRef(null);
      const projectRef = useRef(null);
      const activeRef = useRef(null);
      const editorRef = useRef(null);
      const gutterInnerRef = useRef(null);
      const editorApiRef = useRef(null);
      const saveTimers = useRef(new Map());
      const saveChains = useRef(new Map());
      const mtimeByPath = useRef({});
      const scrollByPath = useRef({});
      const pendingLine = useRef(null);
      const autoCompileRef = useRef(Boolean(syntax.autoCompile));
      const compileOnSaveRef = useRef(syntax.compileOnSave !== false);
      const autosaveRef = useRef({ enabled: syntax.autosave !== false, delay: Math.max(200, Number(syntax.autosaveDelay) || 850) });
      const compileTimer = useRef(null);
      const toastTimer = useRef(null);
      const compilingRef = useRef(false);
      const bodyRef = useRef(null);
      const jobSourceRef = useRef(null);
      const compileStartedRef = useRef(0);
      const catalogRef = useRef({ projects: [] });
      const historyRef = useRef(new Map());
      const spellTimer = useRef(null);

      useEffect(() => { tabsRef.current = tabs; }, [tabs]);
      useEffect(() => { projectIdRef.current = project ? project.id : null; projectRef.current = project; }, [project]);
      useEffect(() => { activeRef.current = active; }, [active]);
      useEffect(() => { autoCompileRef.current = Boolean(syntax.autoCompile); }, [syntax.autoCompile]);
      useEffect(() => { compileOnSaveRef.current = syntax.compileOnSave !== false; }, [syntax.compileOnSave]);
      useEffect(() => {
        autosaveRef.current = { enabled: syntax.autosave !== false, delay: Math.max(200, Number(syntax.autosaveDelay) || 850) };
      }, [syntax.autosave, syntax.autosaveDelay]);
      useEffect(() => {
        if (syntax.autosave !== false) return;
        for (const timer of saveTimers.current.values()) clearTimeout(timer);
        saveTimers.current.clear();
      }, [syntax.autosave]);
      useEffect(() => { catalogRef.current = catalog; }, [catalog]);

      useEffect(() => {
        const tab = tabs.find((item) => item.path === active) || null;
        clearTimeout(spellTimer.current);
        if (!syntax.spellcheck || !tab || !/\.tex$/iu.test(tab.path)) {
          setMisspelled((current) => (current.size === 0 ? current : new Set()));
          return undefined;
        }
        const text = tab.content;
        const projectId = projectIdRef.current;
        spellTimer.current = setTimeout(() => {
          request("spell", { method: "POST", body: { text, lang: syntax.spellLang } })
            .then((result) => {
              if (projectIdRef.current !== projectId) return;
              setMisspelled(new Set(result.words || []));
            })
            .catch(() => setMisspelled(new Set()));
        }, 900);
        return () => clearTimeout(spellTimer.current);
      }, [active, tabs, syntax.spellcheck, syntax.spellLang]);

      useEffect(() => {
        if (!compiling) return undefined;
        const timer = window.setInterval(() => {
          setElapsed(Math.round((Date.now() - compileStartedRef.current) / 1000));
        }, 250);
        return () => window.clearInterval(timer);
      }, [compiling]);

      const notify = useCallback((message, kind) => {
        setToast({ message, kind: kind || "" });
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 4200);
      }, []);

      const refreshCatalog = useCallback(async () => {
        const next = await request("info");
        setCatalog(next);
        setProject((current) => (current ? next.projects.find((item) => item.id === current.id) ?? current : current));
        return next;
      }, []);

      const refreshTree = useCallback(async (id) => {
        const target = id || projectIdRef.current;
        if (!target) return;
        const data = await request("tree", { query: { project: target } });
        setTree(data.entries || []);
        setTreeInfo({ truncated: Boolean(data.truncated) });
      }, []);

      const jumpToLine = useCallback((path, line, column, endLine, endColumn) => {
        const tab = tabsRef.current.find((item) => item.path === path);
        if (!tab || !line) return;
        const lines = tab.content.split("\n");
        const index = Math.max(0, Math.min(lines.length - 1, line - 1));
        const offset = lines.slice(0, index).reduce((sum, text) => sum + text.length + 1, 0);
        const startColumn = column === undefined || column === null ? 0 : Math.max(0, Math.min(lines[index].length, column));
        const endIndex = Math.max(index, Math.min(lines.length - 1, (Number(endLine) || Number(line)) - 1));
        const endColumnValue = endColumn === undefined || endColumn === null
          ? lines[endIndex].length
          : Math.max(0, Math.min(lines[endIndex].length, endColumn));
        const endOffset = lines.slice(0, endIndex).reduce((sum, text) => sum + text.length + 1, 0) + endColumnValue;
        setCursor({ line: index + 1, col: startColumn + 1 });
        // Let React commit the tab, then override the browser's own
        // "reveal the selection" scroll with a centered position.
        requestAnimationFrame(() => {
          const textarea = editorRef.current;
          if (!textarea) return;
          textarea.focus();
          const selectionStart = offset + startColumn;
          const selectionEnd = Math.max(selectionStart, endOffset);
          textarea.setSelectionRange(selectionStart, selectionEnd);
          if (editorApiRef.current) editorApiRef.current.revealLine(index + 1);
          // The browser may scroll to reveal the new selection on the next
          // frame; re-apply the centered position once more.
          requestAnimationFrame(() => {
            if (editorApiRef.current) editorApiRef.current.revealLine(index + 1);
          });
        });
      }, []);

      const refreshBaseline = useCallback((path) => {
        const id = projectIdRef.current;
        if (!id || !path) return;
        request("git/file", { query: { project: id, path } })
          .then((result) => {
            setTabs((list) => list.map((item) => (item.path === path ? { ...item, base: result.tracked ? result.content : null } : item)));
          })
          .catch(() => {});
      }, []);

      const openFile = useCallback(async (path, line, selection) => {
        const id = projectIdRef.current;
        if (!id || !path) return;
        const existing = tabsRef.current.find((item) => item.path === path);
        if (existing) {
          const alreadyActive = activeRef.current === path;
          setActive(path);
          activeRef.current = path;
          if (line) {
            if (alreadyActive) jumpToLine(path, line, selection && selection.column, selection && selection.endLine, selection && selection.endColumn);
            else pendingLine.current = { path, line, ...(selection || {}) };
          }
          void refreshBaseline(path);
          return;
        }
        try {
          const file = await request("file", { query: { project: id, path } });
          const tab = { path, content: file.content, saved: file.content, mtime: file.mtime, dirty: false, saving: false, conflict: null };
          mtimeByPath.current[path] = file.mtime;
          setTabs((list) => [...list.filter((item) => item.path !== path), tab]);
          setActive(path);
          activeRef.current = path;
          if (line) pendingLine.current = { path, line, ...(selection || {}) };
          void refreshBaseline(path);
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify]);

      const openProject = useCallback(async (id, options) => {
        const restoreTabs = Boolean(options && options.restoreTabs);
        try {
          // Drop debounced saves from the previous project before switching state.
          for (const timer of saveTimers.current.values()) clearTimeout(timer);
          saveTimers.current.clear();
          saveChains.current.clear();
          setStatus({ kind: "loading" });
          setMissing(null);
          setGitInfo({ data: null, error: "" });
          setGitDiff("");
          setGitDiffOpen(false);
          setTabs([]);
          tabsRef.current = [];
          setActive(null);
          activeRef.current = null;
          setCompile(null);
          setTerminal([]);
          setPdf({ rev: null, pages: 0, mode: "none" });
          setExpanded(new Set(["sections"]));
          const data = await request("tree", { query: { project: id } });
          setTree(data.entries || []);
          setTreeInfo({ truncated: Boolean(data.truncated) });
          setProject(data.project);
          projectIdRef.current = id;
          projectRef.current = data.project;
          await request("project/select", { method: "POST", body: { project: id } }).catch(() => {});
          const ui = readUi();
          const stored = restoreTabs && ui.projectId === id && Array.isArray(ui.tabs) ? ui.tabs.filter((item) => typeof item === "string").slice(0, 8) : [];
          const paths = stored.length > 0 ? stored : (data.project.mainFile ? [data.project.mainFile] : []);
          const loaded = [];
          for (const path of paths) {
            try {
              const file = await request("file", { query: { project: id, path } });
              mtimeByPath.current[path] = file.mtime;
              loaded.push({ path, content: file.content, saved: file.content, mtime: file.mtime, dirty: false, saving: false, conflict: null });
            } catch {
              // Missing or binary file: skip it.
            }
          }
          setTabs(loaded);
          for (const item of loaded) void refreshBaseline(item.path);
          tabsRef.current = loaded;
          const preferred = restoreTabs && ui.active && loaded.some((item) => item.path === ui.active) ? ui.active : loaded[0] ? loaded[0].path : null;
          setActive(preferred);
          activeRef.current = preferred;
          request("pdf-info", { query: { project: id } }).then((info) => {
            if (projectIdRef.current !== id) return;
            if (info && info.exists) setPdf({ rev: info.rev, pages: info.pages, mode: paneMode(info.pages) });
          }).catch(() => {});
          request("symbols", { query: { project: id } }).then((data) => {
            if (projectIdRef.current !== id) return;
            setSymbols({ labels: data.labels || [], citations: data.citations || [], files: data.files || [] });
          }).catch(() => {});
          setStatus({ kind: "idle" });
        } catch (error) {
          if (error.status === 410 || error.status === 404) {
            // Registered project whose folder is gone: keep it selectable and show
            // a recovery view instead of leaving the panel in a broken state.
            const entry = catalogRef.current.projects.find((item) => item.id === id);
            setMissing({ id, name: entry ? entry.name : "Project", path: entry ? entry.path : "", message: error.message });
            setProject(entry ? { ...entry, exists: false } : null);
            projectIdRef.current = id;
            projectRef.current = entry || null;
            setTabs([]);
            tabsRef.current = [];
            setActive(null);
            activeRef.current = null;
            setTree([]);
            setCompile(null);
            setPdf({ rev: null, pages: 0, mode: "none" });
            setStatus({ kind: "idle" });
            return;
          }
          setStatus({ kind: "error", message: error.message });
          notify(error.message, "err");
        }
      }, [notify]);

      const clearBoom = useCallback(() => setBoom(0), []);

      const refreshGit = useCallback(async (options) => {
        const id = projectIdRef.current;
        if (!id) return;
        try {
          const data = await request("git/info", { query: { project: id } });
          if (projectIdRef.current !== id) return;
          setGitInfo({ data, error: "" });
          if (options && options.diff && data.repo) {
            const diff = await request("git/diff", { query: { project: id } });
            if (projectIdRef.current === id) setGitDiff(diff.patch || "");
          }
        } catch (error) {
          setGitInfo({ data: null, error: error.message });
        }
      }, []);

      const refreshAgents = useCallback(async () => {
        const id = projectIdRef.current;
        try {
          const result = await request("agents", { query: id ? { project: id } : {} });
          setAgents(Array.isArray(result.agents) ? result.agents : []);
        } catch (error) {
          setAgents([]);
          notify(error.message, "err");
        }
      }, [notify]);

      const openCommonAgent = useCallback(async () => {
        try {
          const data = await request("agent/common");
          setAgentEdit({ id: "_common", scope: "common", markdown: data.markdown || "" });
          setAgentBases(new Set());
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify]);

      const openAgent = useCallback(async (agent) => {
        const id = projectIdRef.current;
        try {
          const data = await request("agent", { query: { ...(id ? { project: id } : {}), id: agent.id, scope: agent.scope } });
          setAgentEdit({ id: agent.id, scope: agent.scope, markdown: data.markdown });
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify]);

      const mergeAgentBases = useCallback(async () => {
        if (!agentEdit || agentEdit.id || agentBases.size === 0) return;
        setAgentBusy(true);
        try {
          const id = projectIdRef.current;
          const parts = [];
          for (const agent of agents || []) {
            if (!agentBases.has(`${agent.scope}:${agent.id}`)) continue;
            const data = await request("agent", { query: { ...(id ? { project: id } : {}), id: agent.id, scope: agent.scope } });
            const body = String(data.markdown || "").replace(/^---[\s\S]*?---\r?\n?/u, "").trim();
            parts.push(`\n\n## From ${agent.name}\n\n${body}`);
          }
          const front = /^---[\s\S]*?---\r?\n?/u.exec(agentEdit.markdown)?.[0] || "";
          const own = agentEdit.markdown.replace(/^---[\s\S]*?---\r?\n?/u, "").trim();
          setAgentEdit({ ...agentEdit, markdown: `${front}\n${parts.join("")}\n\n${own}\n` });
          setAgentBases(new Set());
        } catch (error) {
          notify(error.message, "err");
        } finally {
          setAgentBusy(false);
        }
      }, [agentBases, agentEdit, agents, notify]);

      const exportAgentsToFile = useCallback(async () => {
        const id = projectIdRef.current;
        try {
          const data = await request("agents/export", { query: id ? { project: id } : {} });
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "paper-studio-agents.json";
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify]);

      const importAgentsFromFile = useCallback(async (event) => {
        const file = event.target.files && event.target.files[0];
        event.target.value = "";
        if (!file) return;
        try {
          const parsed = JSON.parse(await file.text());
          const list = Array.isArray(parsed) ? parsed : parsed.agents;
          const id = projectIdRef.current;
          const result = await request("agents/import", { method: "POST", body: {
            ...(id ? { project: id } : {}), agents: list,
          } });
          await refreshAgents();
          notify(`${t("agentsImported")}: ${result.imported}`);
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify, refreshAgents, t]);

      const renameAgent = useCallback(async () => {
        if (!agentEdit || !agentEdit.id || agentEdit.scope === "common" || agentEdit.scope === "builtin") return;
        const match = /^name:\s*(.+)$/mu.exec(agentEdit.markdown);
        const current = match ? match[1].trim() : agentEdit.id;
        const name = window.prompt(t("agentRenamePrompt"), current);
        if (!name || !name.trim()) return;
        try {
          const id = projectIdRef.current;
          const result = await request("agent/rename", { method: "POST", body: {
            ...(id ? { project: id } : {}), id: agentEdit.id, scope: agentEdit.scope, name: name.trim(),
          } });
          setAgentEdit({ id: result.id, scope: result.scope, markdown: result.markdown });
          await refreshAgents();
          notify(t("agentSaved"));
        } catch (error) {
          notify(error.message, "err");
        }
      }, [agentEdit, notify, refreshAgents, t]);

      const saveAgent = useCallback(async () => {
        if (!agentEdit) return;
        setAgentBusy(true);
        try {
          if (agentEdit.scope === "common") {
            await request("agent/common", { method: "POST", body: { markdown: agentEdit.markdown } });
            notify(t("agentSaved"));
            return;
          }
          const id = projectIdRef.current;
          const name = /^\s*name:\s*(.+)$/mu.exec(agentEdit.markdown);
          let agentId = agentEdit.id;
          if (!agentId) {
            const base = slugifyAgent(name ? name[1].trim() : "agent");
            agentId = base;
            let suffix = 2;
            while ((agents || []).some((agent) => agent.scope === agentEdit.scope && agent.id === agentId)) {
              agentId = `${base}-${suffix}`;
              suffix += 1;
            }
          }
          const result = await request("agent/save", { method: "POST", body: {
            ...(id ? { project: id } : {}), id: agentId, scope: agentEdit.scope, markdown: agentEdit.markdown,
          } });
          setAgentEdit({ id: result.id, scope: result.scope, markdown: agentEdit.markdown });
          await refreshAgents();
          notify(t("agentSaved"));
        } catch (error) {
          notify(error.message, "err");
        } finally {
          setAgentBusy(false);
        }
      }, [agentEdit, agents, notify, refreshAgents, t]);

      const removeAgent = useCallback(async () => {
        if (!agentEdit || !agentEdit.id || agentEdit.scope === "builtin") return;
        if (!window.confirm(t("agentDeleteConfirm"))) return;
        setAgentBusy(true);
        try {
          const id = projectIdRef.current;
          await request("agent/delete", { method: "POST", body: { ...(id ? { project: id } : {}), id: agentEdit.id, scope: agentEdit.scope } });
          setAgentEdit(null);
          await refreshAgents();
          notify(t("agentDeleted"));
        } catch (error) {
          notify(error.message, "err");
        } finally {
          setAgentBusy(false);
        }
      }, [agentEdit, notify, refreshAgents, t]);

      const refreshAllChats = useCallback(async () => {
        const id = projectIdRef.current;
        if (!id) { setAllChats([]); return; }
        try {
          const result = await request("chats/all", { query: { project: id } });
          setAllChats(Array.isArray(result.chats) ? result.chats : []);
          return;
        } catch {
          // Fall through: an older host may not have chats/all yet.
        }
        try {
          const agentList = (await request("agents", { query: { project: id } })).agents || [];
          const lists = await Promise.all(agentList.map((agent) => request("chats", { query: { project: id, agent: agent.id } })
            .then((result) => (result.chats || []).map((chat) => ({
              ...chat, agentId: agent.id, agentName: agent.name, agentScope: agent.scope,
            })))
            .catch(() => [])));
          const merged = lists.flat().sort((left, right) => String(right.updatedAt).localeCompare(String(left.updatedAt)));
          setAllChats(merged);
        } catch {
          setAllChats([]);
        }
      }, []);

      const refreshChats = useCallback(async (agent) => {
        const id = projectIdRef.current;
        if (!id || !agent) return;
        try {
          const result = await request("chats", { query: { project: id, agent: agent.id } });
          setChatList(Array.isArray(result.chats) ? result.chats : []);
        } catch (error) {
          setChatList([]);
        }
      }, []);

      const startChat = useCallback(async (agent, context) => {
        const id = projectIdRef.current;
        if (!id || !agent) return;
        try {
          const result = await request("chat/create", { method: "POST", body: {
            project: id, agentId: agent.id, agentScope: agent.scope, context: context || null,
          } });
          setChatAgent(agent);
          resolvedRef.current = new Set();
          setResolvedChoices(new Set());
          setChanges([]);
          setChat({ id: result.chat.id, title: result.chat.title, updatedAt: result.chat.updatedAt, context: context || null, messages: [] });
          setChatInput("");
          setChatStream("");
          setChatReasoning("");
          setChatBusy(false);
          setRightTab("chat");
          setPdfOpen(true);
          setDialog(null);
          await refreshChats(agent);
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify, refreshChats]);

      const addChatContext = useCallback(async (context) => {
        const id = projectIdRef.current;
        if (!id || !chat || !chatAgent || !context || !context.text) return;
        try {
          const result = await request("chat/context", { method: "POST", body: {
            project: id, agentId: chatAgent.id, chatId: chat.id, context,
          } });
          setChat(result.chat);
          notify(t("contextAdded"));
        } catch (error) {
          notify(error.message, "err");
        }
      }, [chat, chatAgent, notify, t]);

      const reviewSuggestion = useCallback((value) => {
        setSuggestion(value);
        if (value && value.file) void openFile(value.file);
      }, [openFile]);

      const discardSuggestion = useCallback(() => setSuggestion(null), []);

      const applyChanges = useCallback((list, tag) => {
        const byFile = new Map();
        for (const change of list) {
          if (!change || !change.hunk) continue;
          const file = change.file || "";
          if (!byFile.has(file)) byFile.set(file, []);
          byFile.get(file).push(change.hunk);
        }
        let applied = 0;
        for (const [file, hunks] of byFile) {
          const tab = file
            ? tabsRef.current.find((item) => item.path === file)
            : tabsRef.current.find((item) => item.path === activeRef.current);
          if (!tab) {
            if (file) void openFile(file);
            notify(t("suggestionNoFile"), "err");
            continue;
          }
          let content = tab.content;
          let local = 0;
          for (const hunk of hunks) {
            const next = applySuggestion(content, { hunks: [hunk] });
            if (next !== null) { content = next; local += 1; }
          }
          if (local === 0) {
            notify(t("suggestionMismatch"), "err");
            continue;
          }
          if (tag) {
            const history = historyRef.current.get(tab.path) || { past: [], future: [], at: 0, word: false };
            history.past.push({ content: tab.content, caret: 0, ...tag });
            if (history.past.length > 200) history.past.shift();
            history.future = [];
            history.at = 0;
            history.word = false;
            setTabs((items) => items.map((item) => (item.path === tab.path ? { ...item, content, dirty: content !== item.saved } : item)));
            if (scheduleAutosaveRef.current) scheduleAutosaveRef.current(tab.path);
          } else if (onEditRef.current) {
            onEditRef.current(tab.path, content, 0);
          }
          applied += local;
        }
        return applied;
      }, [notify, openFile, t]);

      const resolveChange = useCallback((change) => {
        resolvedRef.current.add(change.id);
        try { if (chat) localStorage.setItem(resolvedKey(chat.id), JSON.stringify([...resolvedRef.current])); } catch { /* storage disabled */ }
        setChanges((list) => list.filter((entry) => entry.id !== change.id));
      }, [chat, resolvedKey]);

      const keepChange = useCallback((change) => {
        if (applyChanges([change], { keep: change }) === 0) return;
        resolveChange(change);
        notify(t("suggestionApplied"));
      }, [applyChanges, notify, resolveChange, t]);

      const discardChange = useCallback((id) => {
        const change = changes.find((entry) => entry.id === id);
        if (change) resolveChange(change);
        else setChanges((list) => list.filter((entry) => entry.id !== id));
      }, [changes, resolveChange]);

      const keepAllChanges = useCallback(() => {
        const applied = [];
        for (const change of changes) {
          if (applyChanges([change], { keep: change }) > 0) applied.push(change.id);
        }
        if (applied.length === 0) return;
        for (const id of applied) resolvedRef.current.add(id);
        try { if (chat) localStorage.setItem(resolvedKey(chat.id), JSON.stringify([...resolvedRef.current])); } catch { /* storage disabled */ }
        setChanges((list) => list.filter((change) => !applied.includes(change.id)));
      }, [applyChanges, changes, chat, resolvedKey]);

      const discardAllChanges = useCallback(() => {
        for (const change of changes) resolvedRef.current.add(change.id);
        try { if (chat) localStorage.setItem(resolvedKey(chat.id), JSON.stringify([...resolvedRef.current])); } catch { /* storage disabled */ }
        setChanges([]);
      }, [changes, chat, resolvedKey]);

      const loadResolved = useCallback((chatId) => {
        try {
          return new Set(JSON.parse(localStorage.getItem(resolvedKey(chatId)) || "[]"));
        } catch {
          return new Set();
        }
      }, [resolvedKey]);

      const openChatMemory = useCallback(() => {
        if (!chat) return;
        setDialog({
          kind: "memory", draft: chat.memory || "", chatId: chat.id,
          agentId: chatAgent ? chatAgent.id : chat.agentId, agentName: chatAgent ? chatAgent.name : "",
        });
      }, [chat, chatAgent]);

      const openPrompt = useCallback(async (agentId, chatId, agentName, chatTitle) => {
        const id = projectIdRef.current;
        if (!id || !agentId || !chatId) return;
        try {
          const data = await request("chat", { query: { project: id, agent: agentId, chat: chatId } });
          setDialog({ kind: "prompt", prompt: data.systemPrompt || "", agentName, title: chatTitle });
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify]);

      const openChatPicker = useCallback(async (agent, context) => {
        setDialog({ kind: "chatPick", agent, context, chats: null });
        const id = projectIdRef.current;
        if (!id) {
          setDialog({ kind: "chatPick", agent, context, chats: [] });
          return;
        }
        try {
          const result = await request("chats", { query: { project: id, agent: agent.id } });
          setDialog((current) => (current && current.kind === "chatPick" && current.agent && current.agent.id === agent.id
            ? { ...current, chats: Array.isArray(result.chats) ? result.chats : [] }
            : current));
        } catch {
          setDialog((current) => (current && current.kind === "chatPick" ? { ...current, chats: [] } : current));
        }
      }, []);

      const openExistingChat = useCallback(async (agent, chatId) => {
        const id = projectIdRef.current;
        if (!id || !agent) return;
        try {
          const data = await request("chat", { query: { project: id, agent: agent.id, chat: chatId } });
          setChatAgent(agent);
          setChat(data);
          setChatInput("");
          setChatStream("");
          setChatBusy(false);
          setRightTab("chat");
          setPdfOpen(true);
          setDialog(null);
          await refreshChats(agent);
        } catch (error) {
          notify(error.message, "err");
        }
      }, [loadResolved, notify, refreshChats]);

      const selectChat = useCallback(async (chatId) => {
        const id = projectIdRef.current;
        if (!id || !chatAgent || !chatId) return;
        try {
          const data = await request("chat", { query: { project: id, agent: chatAgent.id, chat: chatId } });
          resolvedRef.current = loadResolved(data.id);
          setResolvedChoices(loadResolvedChoices(data.id));
          setChanges(collectChanges(data.messages).filter((change) => !resolvedRef.current.has(change.id)));
          setReviewHidden(false);
          setChat(data);
          setChatStream("");
          setChatReasoning("");
          setChatBusy(false);
        } catch (error) {
          notify(error.message, "err");
        }
      }, [chatAgent, notify]);

      const stopChat = useCallback(async () => {
        const id = projectIdRef.current;
        if (!id || !chatJobRef.current) return;
        try {
          await request("chat/stop", { method: "POST", body: { project: id, job: chatJobRef.current } });
        } catch {
          // The stream may already be gone.
        }
      }, []);

      const sendChat = useCallback(async (override) => {
        const id = projectIdRef.current;
        const message = String(typeof override === "string" ? override : chatInput).trim();
        if (!id || !chat || !chatAgent || !message || chatBusy) return;
        if (typeof override !== "string") setChatInput("");
        setChatBusy(true);
        setChatStream("");
        setChatReasoning("");
        setChat((current) => (current ? { ...current, messages: [...(current.messages || []), { role: "user", content: message, at: new Date().toISOString() }] } : current));
        try {
          const started = await request("chat/send", { method: "POST", body: {
            project: id, agentId: chatAgent.id, agentScope: chatAgent.scope, chatId: chat.id, message,
          } });
          chatJobRef.current = started.jobId;
          if (chatSourceRef.current) chatSourceRef.current.close();
          const source = new EventSource(apiUrl("chat/events", { job: started.jobId }));
          chatSourceRef.current = source;
          let acc = "";
          let reasoningAcc = "";
          let finished = false;
          const finish = () => { finished = true; source.close(); chatSourceRef.current = null; chatJobRef.current = ""; setChatBusy(false); };
          source.onmessage = (event) => {
            let data;
            try { data = JSON.parse(event.data); } catch { return; }
            if (data.type === "delta") {
              acc += data.text;
              setChatStream(acc);
            } else if (data.type === "reasoning") {
              reasoningAcc += data.text;
              setChatReasoning(reasoningAcc);
            } else if (data.type === "done") {
              finish();
              setChat((current) => (current ? {
                ...current,
                title: data.chat ? data.chat.title : current.title,
                updatedAt: data.chat ? data.chat.updatedAt : current.updatedAt,
                messages: acc ? [...(current.messages || []), {
                  role: "assistant", content: acc,
                  ...(reasoningAcc ? { reasoning: reasoningAcc.slice(0, 20000) } : {}),
                  at: new Date().toISOString(),
                }] : current.messages,
              } : current));
              setChatStream("");
              setChatReasoning("");
              void refreshChats(chatAgent);
              const fresh = collectChanges([{ role: "assistant", content: acc }])
                .filter((change) => !resolvedRef.current.has(change.id));
              if (fresh.length > 0) {
                setChanges((list) => [...list, ...fresh]);
                setReviewHidden(false);
                if (fresh[0].file) void openFile(fresh[0].file);
              }
            } else if (data.type === "memory") {
              notify(t("memoryUpdated"));
            } else if (data.type === "summary") {
              notify(t("chatSummarized"));
            } else if (data.type === "error" || data.type === "aborted") {
              finish();
              setChat((current) => (current && acc ? {
                ...current,
                messages: [...(current.messages || []), {
                  role: "assistant", content: acc,
                  ...(reasoningAcc ? { reasoning: reasoningAcc.slice(0, 20000) } : {}),
                  at: new Date().toISOString(),
                }],
              } : current));
              setChatStream("");
              setChatReasoning("");
              if (data.type === "error" && data.message) notify(data.message, "err");
            }
          };
          source.onerror = () => {
            if (finished) return;
            finish();
            if (acc) {
              setChat((current) => (current ? {
                ...current,
                messages: [...(current.messages || []), {
                  role: "assistant", content: acc,
                  ...(reasoningAcc ? { reasoning: reasoningAcc.slice(0, 20000) } : {}),
                  at: new Date().toISOString(),
                }],
              } : current));
            }
            setChatStream("");
            setChatReasoning("");
          };
        } catch (error) {
          setChatBusy(false);
          notify(error.message, "err");
        }
      }, [chat, chatAgent, chatBusy, chatInput, notify, openFile, refreshChats]);

      const resolvedChoiceKey = useCallback((chatId) => `ps-chat-choices:${projectIdRef.current || ""}:${chat && chat.agentId ? chat.agentId : ""}:${chatId || ""}`, [chat]);

      const loadResolvedChoices = useCallback((chatId) => {
        try {
          return new Set(JSON.parse(localStorage.getItem(resolvedChoiceKey(chatId)) || "[]"));
        } catch {
          return new Set();
        }
      }, [resolvedChoiceKey]);

      const chooseOption = useCallback((choiceId, text) => {
        if (!text) return;
        setResolvedChoices((current) => {
          const next = new Set(current);
          next.add(choiceId);
          try { if (chat) localStorage.setItem(resolvedChoiceKey(chat.id), JSON.stringify([...next])); } catch { /* storage disabled */ }
          return next;
        });
        void sendChat(`Option chosen: ${text}`);
      }, [chat, resolvedChoiceKey, sendChat]);

      const deleteChatFromPicker = useCallback(async (agent, chatId) => {
        const id = projectIdRef.current;
        if (!id || !agent || !chatId) return;
        if (!window.confirm(t("chatDeleteConfirm"))) return;
        try {
          await request("chat/delete", { method: "POST", body: { project: id, agentId: agent.id, chatId } });
          setAllChats((list) => (Array.isArray(list) ? list.filter((entry) => entry.id !== chatId) : list));
          setDialog((current) => (current && current.kind === "chatPick"
            ? { ...current, chats: (current.chats || []).filter((entry) => entry.id !== chatId) }
            : current));
          if (chat && chat.id === chatId) {
            setChat(null);
            setChatAgent(null);
            setChanges([]);
            setResolvedChoices(new Set());
            setChatStream("");
            setChatBusy(false);
            setRightTab("pdf");
          }
          notify(t("chatDeleted"));
        } catch (error) {
          notify(error.message, "err");
        }
      }, [chat, notify, t]);

      const deleteCurrentChat = useCallback(async () => {
        const id = projectIdRef.current;
        if (!id || !chat || !chatAgent) return;
        if (!window.confirm(t("chatDeleteConfirm"))) return;
        try {
          await request("chat/delete", { method: "POST", body: { project: id, agentId: chatAgent.id, chatId: chat.id } });
          const result = await request("chats", { query: { project: id, agent: chatAgent.id } });
          const list = Array.isArray(result.chats) ? result.chats : [];
          setChatList(list);
          if (list.length > 0) {
            void selectChat(list[0].id);
          } else {
            const context = chat.context || null;
            setChat(null);
            setChanges([]);
            setResolvedChoices(new Set());
            void startChat(chatAgent, context);
          }
          notify(t("chatDeleted"));
        } catch (error) {
          notify(error.message, "err");
        }
      }, [chat, chatAgent, notify, selectChat, startChat, t]);

      const runGitAction = useCallback(async (action, extra) => {
        const id = projectIdRef.current;
        if (!id) return;
        setGitBusy(action);
        try {
          const result = await request("git", { method: "POST", body: { project: id, action, ...(extra || {}) } });
          if (result && result.ok === false) {
            notify((result.output || "").slice(0, 400) || t("error"), "err");
            await refreshGit({ diff: gitDiffOpen });
            return false;
          }
          notify(action);
          await refreshGit({ diff: gitDiffOpen });
          if (["pull", "nuke", "switch", "create"].includes(action)) {
            await refreshCatalog();
            await openProject(id, { restoreTabs: true });
            await refreshGit({ diff: false });
          }
          return true;
        } catch (error) {
          notify(error.message, "err");
          return false;
        } finally {
          setGitBusy("");
        }
      }, [gitDiffOpen, notify, openProject, refreshCatalog, refreshGit, t]);

      useEffect(() => {
        if (explorerTab !== "git" || !project) return;
        void refreshGit({ diff: gitDiffOpen });
      }, [explorerTab, project, gitDiffOpen, refreshGit]);

      useEffect(() => {
        if (!dialog) return;
        if (dialog.kind === "agents") {
          void refreshAgents();
          void refreshAllChats();
        } else if (dialog.kind === "prefs" && dialog.tab === "agents") {
          void refreshAgents();
        }
      }, [dialog && dialog.kind, dialog && dialog.tab, refreshAgents, refreshAllChats]);

      // Load the registry and restore the last project.
      useEffect(() => {
        let cancelled = false;
        (async () => {
          try {
            const next = await request("info");
            if (cancelled) return;
            setCatalog(next);
            const ui = readUi();
            const preferred = next.projects.find((item) => item.id === ui.projectId) ? ui.projectId : (next.lastProjectId ?? (next.projects[0] ? next.projects[0].id : null));
            if (preferred) await openProject(preferred, { restoreTabs: true });
          } catch (error) {
            if (!cancelled) setStatus({ kind: "error", message: error.message });
          }
        })();
        return () => { cancelled = true; };
      }, [openProject]);

      // Persist light UI state.
      useEffect(() => {
        const timer = setTimeout(() => {
          writeUi({
            projectId: projectIdRef.current,
            tabs: tabs.map((item) => item.path),
            active,
            explorer: explorerOpen,
            pdf: pdfOpen,
            zoom,
            dock,
            dockHeight,
            explorerWidth,
            pdfPct,
            explorerTab,
          });
        }, 300);
        return () => clearTimeout(timer);
      }, [tabs, active, explorerOpen, pdfOpen, zoom, dock, dockHeight, explorerWidth, pdfPct, explorerTab]);

      // Cursor refresh when switching files.
      useEffect(() => {
        setCursor({ line: 1, col: 1 });
        const textarea = editorRef.current;
        if (!textarea) return;
        const saved = scrollByPath.current[active] || 0;
        textarea.scrollTop = saved;
        if (gutterInnerRef.current) gutterInnerRef.current.style.transform = `translateY(${-saved}px)`;
      }, [active]);

      useEffect(() => {
        const pending = pendingLine.current;
        if (!pending || pending.path !== active) return;
        jumpToLine(pending.path, pending.line, pending.column, pending.endLine, pending.endColumn);
        pendingLine.current = null;
      }, [active, tabs, jumpToLine]);

      const doSave = useCallback(async (path, options) => {
        const id = projectIdRef.current;
        const tab = tabsRef.current.find((item) => item.path === path);
        if (!id || !tab) return null;
        const expected = mtimeByPath.current[path] ?? tab.mtime;
        setTabs((list) => list.map((item) => (item.path === path ? { ...item, saving: true } : item)));
        try {
          const result = await request("file/save", { method: "POST", body: { project: id, path, content: tab.content, expectedMtime: expected, force: Boolean(options && options.force) } });
          if (result.conflict) {
            setTabs((list) => list.map((item) => (item.path === path ? { ...item, saving: false, conflict: { content: result.content, mtime: result.mtime } } : item)));
            return null;
          }
          mtimeByPath.current[path] = result.mtime;
          setTabs((list) => list.map((item) => {
            if (item.path !== path) return item;
            const unchanged = item.content === tab.content;
            return { ...item, saving: false, mtime: result.mtime, saved: tab.content, dirty: unchanged ? false : item.dirty, conflict: null };
          }));
          setStatus({ kind: "saved", at: Date.now() });
          const manual = Boolean(options && options.manual);
          if (shouldCompileAfterSave({ manual, compileOnSave: compileOnSaveRef.current, autoCompile: autoCompileRef.current })) {
            clearTimeout(compileTimer.current);
            compileTimer.current = setTimeout(() => { void runCompileRef.current(); }, manual ? 120 : 900);
          }
          return result;
        } catch (error) {
          setTabs((list) => list.map((item) => (item.path === path ? { ...item, saving: false, error: error.message } : item)));
          notify(error.message, "err");
          return null;
        }
      }, [notify]);

      const saveTab = useCallback((path, options) => {
        const previous = saveChains.current.get(path) || Promise.resolve();
        const next = previous.catch(() => {}).then(() => doSave(path, options));
        saveChains.current.set(path, next);
        return next;
      }, [doSave]);

      const saveAll = useCallback(async (options) => {
        const dirty = tabsRef.current.filter((item) => item.dirty && !item.conflict);
        await Promise.all(dirty.map((item) => saveTab(item.path, options)));
      }, [saveTab]);

      const scheduleAutosave = useCallback((path) => {
        clearTimeout(saveTimers.current.get(path));
        saveTimers.current.delete(path);
        const autosave = autosaveRef.current;
        if (!autosave.enabled) return;
        saveTimers.current.set(path, setTimeout(() => {
          saveTimers.current.delete(path);
          void saveTab(path);
        }, autosave.delay));
      }, [saveTab]);

      scheduleAutosaveRef.current = scheduleAutosave;

      const refreshSymbols = useCallback(async () => {
        const id = projectIdRef.current;
        if (!id) return;
        try {
          const data = await request("symbols", { query: { project: id } });
          if (projectIdRef.current !== id) return;
          setSymbols({ labels: data.labels || [], citations: data.citations || [], files: data.files || [] });
        } catch {
          // Completion is an enhancement; failing to index must not disturb editing.
        }
      }, []);

      const appendTerminal = useCallback((entry) => {
        setTerminal((lines) => (lines.length > 3000 ? [...lines.slice(-3000), entry] : [...lines, entry]));
      }, []);

      const applyCompileResult = useCallback((result) => {
        compilingRef.current = false;
        setCompiling(false);
        setStage("");
        setElapsed(0);
        setCompile(result);
        if (result.ok) {
          setPdf({ rev: result.rev, pages: result.pages, mode: paneMode(result.pages) });
          setStatus({ kind: "ok", at: Date.now() });
          notify(result.cached
            ? t("cachedBuild")
            : fmt(t("compileOk"), { pages: result.pages, time: formatDuration(result.durationMs) }));
          if (result.warningsList && result.warningsList.length > 0) setDock("problems");
        } else {
          setDock("problems");
          setStatus({ kind: "error", message: fmt(t("compileFailedWith"), { count: (result.errors || []).length }) });
          notify(t("compileFailed"), "err");
        }
        void refreshTree();
        void refreshSymbols();
      }, [notify, refreshSymbols, refreshTree, t]);

      const runCompile = useCallback(async (options) => {
        const id = projectIdRef.current;
        if (!id || compilingRef.current) return;
        const force = Boolean(options && options.force);
        compilingRef.current = true;
        setCompiling(true);
        setStatus({ kind: "compiling" });
        setTerminal([]);
        setStage(t("stageSaving"));
        setElapsed(0);
        compileStartedRef.current = Date.now();
        try {
          await saveAll({ manual: false });
          const started = await request("compile/start", { method: "POST", body: { project: id, force } });
          if (jobSourceRef.current) jobSourceRef.current.close();
          const source = new EventSource(apiUrl("compile/events", { job: started.jobId }));
          jobSourceRef.current = source;
          let finished = false;
          const settle = (result) => {
            if (finished) return;
            finished = true;
            source.close();
            if (jobSourceRef.current === source) jobSourceRef.current = null;
            applyCompileResult(result);
          };
          const fail = (message) => {
            if (finished) return;
            finished = true;
            source.close();
            if (jobSourceRef.current === source) jobSourceRef.current = null;
            compilingRef.current = false;
            setCompiling(false);
            appendTerminal({ kind: "err", text: message });
            setCompile({ ok: false, errors: [], warningsList: [], log: message });
            setDock("problems");
            setStatus({ kind: "error", message });
            notify(message, "err");
          };
          source.onmessage = (message) => {
            let event;
            try { event = JSON.parse(message.data); } catch { return; }
            if (event.type === "command") {
              appendTerminal({ kind: "cmd", text: `$ ${event.argv.join(" ")}` });
              if (event.stage) setStage(event.stage);
            } else if (event.type === "out") {
              appendTerminal({ kind: event.channel === "stderr" ? "err" : "out", text: event.text });
            } else if (event.type === "stage") {
              if (event.label) setStage(event.label);
              appendTerminal({ kind: "stage", text: `\u25b8 ${event.label}${event.detail ? ` \u2014 ${event.detail}` : ""}` });
            } else if (event.type === "finish") {
              settle(event.result);
            } else if (event.type === "error") {
              fail(event.message);
            }
          };
          source.onerror = () => {
            if (finished) return;
            // The stream drops when the host restarts mid-compile; fall back to the
            // plain request so the panel still ends in a consistent state.
            finished = true;
            source.close();
            jobSourceRef.current = null;
            request("compile", { method: "POST", body: { project: id, force } })
              .then(applyCompileResult)
              .catch((error) => fail(error.message));
          };
        } catch (error) {
          // A page that reloaded before the host restart sees a host without the
          // streaming route; fall back to the synchronous compile instead of failing.
          if (error && (error.status === 404 || error.status === 405)) {
            try {
              const result = await request("compile", { method: "POST", body: { project: id, force } });
              appendTerminal({ kind: "stage", text: "host does not stream compiles; used the synchronous route" });
              applyCompileResult(result);
              return;
            } catch (fallbackError) {
              error = fallbackError;
            }
          }
          compilingRef.current = false;
          setCompiling(false);
          setStatus({ kind: "error", message: error.message });
          setCompile({ ok: false, log: String(error.message), errors: [], warningsList: [] });
          setDock("problems");
          notify(error.message, "err");
        }
      }, [appendTerminal, applyCompileResult, notify, saveAll, t]);

      const runCompileRef = useRef(runCompile);
      useEffect(() => { runCompileRef.current = runCompile; }, [runCompile]);

      // Global shortcuts while the panel is the selected main panel.
      useEffect(() => {
        if (!panelActive) return undefined;
        const onKeyDown = (event) => {
          // While a dialog is open, keys belong to it (including binding capture).
          if (dialog) return;
          const target = event.target;
          const tag = target && target.tagName;
          const typing = tag === "INPUT" || tag === "SELECT" || target?.isContentEditable
            || (tag === "TEXTAREA" && target !== editorRef.current);
          // Inputs, dialogs and rename fields keep their own keys; the editor
          // handles its own shortcuts (except Ctrl/Cmd+Enter for compile).
          if (typing) return;
          const keys = syntax.keys || DEFAULT_SYNTAX.keys;
          if (matchesBinding(event, keys.save)) {
            event.preventDefault();
            if (activeRef.current) void saveTab(activeRef.current);
            return;
          }
          const mod = event.metaKey || event.ctrlKey;
          if (!mod) return;
          if (event.key === "Enter") {
            event.preventDefault();
            void runCompileRef.current();
          } else if (event.key === "`") {
            event.preventDefault();
            setDock((current) => (current === "terminal" ? null : "terminal"));
          }
        };
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown, true);
      }, [dialog, panelActive, saveTab, syntax.keys]);

      // Escape closes the topmost dialog.
      useEffect(() => {
        if (!compileMenu) return undefined;
        const close = () => setCompileMenu(false);
        const onKey = (event) => { if (event.key === "Escape") setCompileMenu(false); };
        window.addEventListener("mousedown", close);
        window.addEventListener("keydown", onKey, true);
        return () => {
          window.removeEventListener("mousedown", close);
          window.removeEventListener("keydown", onKey, true);
        };
      }, [compileMenu]);

      useEffect(() => {
        if (!dialog) return undefined;
        const onKeyDown = (event) => {
          if (event.key !== "Escape") return;
          if (dialog.kind === "prefs" && dialog.original) setSyntax(dialog.original);
          setDialog(null);
          setDialogError("");
        };
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown, true);
      }, [dialog]);

      useEffect(() => () => {
        if (chatSourceRef.current) chatSourceRef.current.close();
      }, []);

      useEffect(() => () => {
        clearTimeout(toastTimer.current);
        clearTimeout(compileTimer.current);
        for (const timer of saveTimers.current.values()) clearTimeout(timer);
        if (jobSourceRef.current) jobSourceRef.current.close();
      }, []);

      const onEdit = useCallback((path, content, caret) => {
        if (pdfTextLayerRef.current) setPdfTextLayer(false);
        const current = tabsRef.current.find((item) => item.path === path);
        if (current && current.content !== content) {
          const now = Date.now();
          let history = historyRef.current.get(path);
          if (!history) {
            history = { past: [], future: [], at: 0, word: false };
            historyRef.current.set(path, history);
          }
          const previous = current.content;
          const insertion = typeof caret === "number" && content.length === previous.length + 1;
          const wordChar = insertion && /[\p{L}\p{N}]/u.test(content[caret - 1] || "");
          // Consecutive letters within 600 ms collapse into one undo step, so
          // Ctrl+Z removes a word rather than a character.
          const coalesce = history.at > 0 && now - history.at < 600 && wordChar && history.word;
          if (!coalesce) {
            history.past.push({ content: previous, caret: typeof caret === "number" ? Math.max(0, caret - (insertion ? 1 : 0)) : 0 });
            if (history.past.length > 200) history.past.shift();
            history.future = [];
          }
          history.at = now;
          history.word = Boolean(wordChar);
        }
        setTabs((list) => list.map((item) => (item.path === path ? { ...item, content, dirty: content !== item.saved } : item)));
        scheduleAutosave(path);
      }, [saveTab, scheduleAutosave]);

      useEffect(() => { onEditRef.current = onEdit; }, [onEdit]);

      const restoreCaret = useCallback((path, caret) => {
        requestAnimationFrame(() => {
          const textarea = editorRef.current;
          const tab = tabsRef.current.find((item) => item.path === path);
          if (!textarea || !tab) return;
          const position = Math.max(0, Math.min(tab.content.length, caret || 0));
          textarea.focus();
          textarea.setSelectionRange(position, position);
          if (activeRef.current === path) {
            const before = tab.content.slice(0, position);
            setCursor({ line: before.split("\n").length, col: position - before.lastIndexOf("\n") });
          }
        });
      }, []);

      const undo = useCallback((path) => {
        const history = historyRef.current.get(path);
        const tab = tabsRef.current.find((item) => item.path === path);
        if (!history || !tab || history.past.length === 0) return;
        const snapshot = history.past.pop();
        history.future.push({ content: tab.content, caret: 0, ...(snapshot.keep ? { keep: snapshot.keep } : {}) });
        history.at = 0;
        history.word = false;
        setTabs((list) => list.map((item) => (item.path === path ? { ...item, content: snapshot.content, dirty: snapshot.content !== item.saved } : item)));
        scheduleAutosave(path);
        if (snapshot.keep) {
          const change = snapshot.keep;
          resolvedRef.current.delete(change.id);
          try { if (chat) localStorage.setItem(resolvedKey(chat.id), JSON.stringify([...resolvedRef.current])); } catch { /* storage disabled */ }
          setChanges((list) => (list.some((entry) => entry.id === change.id) ? list : [change, ...list]));
          setReviewHidden(false);
        }
        restoreCaret(path, snapshot.caret);
      }, [chat, resolvedKey, restoreCaret, saveTab, scheduleAutosave]);

      const redo = useCallback((path) => {
        const history = historyRef.current.get(path);
        const tab = tabsRef.current.find((item) => item.path === path);
        if (!history || !tab || history.future.length === 0) return;
        const snapshot = history.future.pop();
        history.past.push({ content: tab.content, caret: 0 });
        history.at = 0;
        history.word = false;
        setTabs((list) => list.map((item) => (item.path === path ? { ...item, content: snapshot.content, dirty: snapshot.content !== item.saved } : item)));
        scheduleAutosave(path);
        if (snapshot.keep) {
          const change = snapshot.keep;
          resolvedRef.current.add(change.id);
          try { if (chat) localStorage.setItem(resolvedKey(chat.id), JSON.stringify([...resolvedRef.current])); } catch { /* storage disabled */ }
          setChanges((list) => list.filter((entry) => entry.id !== change.id));
        }
        restoreCaret(path, snapshot.caret);
      }, [chat, resolvedKey, restoreCaret, saveTab, scheduleAutosave]);

      const closeTab = useCallback((path) => {
        const tab = tabsRef.current.find((item) => item.path === path);
        if (tab && tab.dirty && !window.confirm(t("closeDirty"))) return;
        clearTimeout(saveTimers.current.get(path));
        saveTimers.current.delete(path);
        setTabs((list) => {
          const next = list.filter((item) => item.path !== path);
          if (activeRef.current === path) {
            const replacement = next[next.length - 1] ? next[next.length - 1].path : null;
            setActive(replacement);
            activeRef.current = replacement;
          }
          return next;
        });
      }, [t]);

      const onCursor = useCallback((event) => {
        const textarea = event.currentTarget || event.target;
        if (!textarea) return;
        const position = typeof textarea.selectionStart === "number" ? textarea.selectionStart : 0;
        const before = String(textarea.value || "").slice(0, position);
        const index = before.lastIndexOf("\n");
        setCursor({ line: before.split("\n").length, col: position - index });
      }, []);

      const onScroll = useCallback((event) => {
        const textarea = event.currentTarget;
        if (activeRef.current) scrollByPath.current[activeRef.current] = textarea.scrollTop;
      }, []);

      const insertText = useCallback((text) => {
        const textarea = editorRef.current;
        const path = activeRef.current;
        if (!textarea || !path) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const next = textarea.value.slice(0, start) + text + textarea.value.slice(end);
        onEdit(path, next, start + text.length);
        requestAnimationFrame(() => {
          textarea.selectionStart = start + text.length;
          textarea.selectionEnd = start + text.length;
          onCursor({ currentTarget: textarea });
        });
      }, [onCursor, onEdit]);

      const locateSelection = useCallback(async ({ page, x, y, text }) => {
        const id = projectIdRef.current;
        if (!id) return;
        try {
          const result = await request("pdf/locate", {
            method: "POST",
            body: { project: id, page, x, y, text, current: activeRef.current || undefined },
          });
          if (result && result.file) {
            await openFile(result.file, result.line, { column: result.column, endLine: result.endLine, endColumn: result.endColumn });
            notify(`${result.file}:${result.line}`);
          } else {
            notify((result && result.reason) || t("locateFailed"), "err");
          }
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify, openFile, t]);

      const reloadDisk = useCallback(async (path) => {
        const id = projectIdRef.current;
        if (!id) return;
        try {
          const file = await request("file", { query: { project: id, path } });
          mtimeByPath.current[path] = file.mtime;
          setTabs((list) => list.map((item) => (item.path === path ? { ...item, content: file.content, saved: file.content, mtime: file.mtime, dirty: false, conflict: null } : item)));
          notify(t("fileChanged"));
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify, t]);

      const keepMine = useCallback((path) => {
        setTabs((list) => list.map((item) => (item.path === path ? { ...item, conflict: null } : item)));
        void saveTab(path, { force: true });
      }, [saveTab]);

      const switchProject = useCallback(async (id) => {
        if (!id || id === projectIdRef.current) return;
        if (tabsRef.current.some((item) => item.dirty) && !window.confirm(t("switchDirty"))) {
          return;
        }
        await openProject(id, { restoreTabs: false });
      }, [openProject, t]);

      const openDialog = useCallback((kind, extra) => {
        setDialogError("");
        setDialog({ kind, ...(extra || {}) });
      }, []);

      const runGit = useCallback(async (action, targetProject) => {
        const id = (targetProject && targetProject.id) || projectIdRef.current;
        if (!id) return;
        setGitState((state) => ({ ...state, busy: true }));
        try {
          const result = await request("git", { method: "POST", body: { project: id, action } });
          void refreshBaseline(activeRef.current);
          setGitState((state) => ({ ...state, busy: false, status: result, output: result.output || state.output }));
          if (action !== "status") notify(result.ok ? `${action} ok` : `${action} failed`, result.ok ? "" : "err");
          await refreshCatalog();
        } catch (error) {
          setGitState((state) => ({ ...state, busy: false, output: error.message }));
          notify(error.message, "err");
        }
      }, [notify, refreshBaseline, refreshCatalog]);

      const submitDialog = useCallback(async () => {
        if (!dialog) return;
        setBusy(true);
        setDialogError("");
        try {
          const id = projectIdRef.current;
          if (dialog.kind === "newProject") {
            const result = await request("project/create", { method: "POST", body: {
              name: dialog.name || "", path: dialog.path || undefined, template: dialog.template || "article",
            } });
            setDialog(null);
            await refreshCatalog();
            await openProject(result.project.id, { restoreTabs: false });
            notify(fmt(t("created"), { name: result.project.name }));
          } else if (dialog.kind === "addProject") {
            const result = await request("project/add", { method: "POST", body: { path: dialog.path || "", name: dialog.name || undefined } });
            setDialog(null);
            await refreshCatalog();
            await openProject(result.project.id, { restoreTabs: false });
            notify(fmt(t("added"), { name: result.project.name }));
          } else if (dialog.kind === "clone") {
            const result = await request("git", { method: "POST", body: {
              action: "clone", url: dialog.url || "", token: dialog.token || undefined,
              name: dialog.name || undefined, path: dialog.path || undefined,
            } });
            setDialog(null);
            await refreshCatalog();
            await openProject(result.project.id, { restoreTabs: false });
            notify(fmt(t("cloned"), { name: result.project.name }));
          } else if (dialog.kind === "prefs" && (dialog.tab || "editor") === "project") {
            await request("project/update", { method: "POST", body: {
              project: dialog.projectId,
              name: dialog.name,
              mainFile: dialog.mainFile,
              overleaf: dialog.remote === "" && !dialog.token ? null : { remote: dialog.remote || "", token: dialog.token || undefined },
            } });
            setDialog(null);
            await refreshCatalog();
            await refreshTree();
            notify(t("saved"));
          } else if (dialog.kind === "nuke") {
            setDialog(null);
            const reset = await runGitAction("nuke");
            if (reset) setBoom(Date.now());
          } else if (dialog.kind === "branch") {
            const name = String(dialog.name || "").trim();
            if (name.length === 0) throw new Error(t("branchName"));
            setDialog(null);
            await runGitAction("create", { branch: name });
          } else if (dialog.kind === "locate") {
            await request("project/update", { method: "POST", body: { project: dialog.projectId, path: dialog.path || "" } });
            setDialog(null);
            setMissing(null);
            await refreshCatalog();
            await openProject(dialog.projectId, { restoreTabs: false });
            notify(t("saved"));
          } else if (dialog.kind === "newFile" || dialog.kind === "newFolder") {
            await request("file/create", { method: "POST", body: { project: id, path: dialog.path || "", kind: dialog.kind === "newFolder" ? "dir" : "file" } });
            setDialog(null);
            await refreshTree();
            if (dialog.kind === "newFile") await openFile(dialog.path);
          } else if (dialog.kind === "rename") {
            await request("file/rename", { method: "POST", body: { project: id, from: dialog.from, to: dialog.to } });
            setDialog(null);
            await refreshTree();
            setTabs((list) => list.filter((item) => item.path !== dialog.from));
            await openFile(dialog.to);
          } else if (dialog.kind === "delete") {
            await request("file/delete", { method: "POST", body: { project: id, path: dialog.path } });
            setDialog(null);
            await refreshTree();
            closeTab(dialog.path);
          } else if (dialog.kind === "removeProject") {
            await request("project/remove", { method: "POST", body: { project: dialog.projectId } });
            setDialog(null);
            const next = await refreshCatalog();
            setMissing(null);
            setProject(null);
            projectIdRef.current = null;
            setTree([]);
            setTabs([]);
            setActive(null);
            notify(t("removed"));
            const remaining = next.projects[0];
            if (remaining) await openProject(remaining.id, { restoreTabs: false });
          }
        } catch (error) {
          setDialogError(error.message);
        } finally {
          setBusy(false);
        }
      }, [closeTab, dialog, notify, openFile, openProject, refreshCatalog, refreshTree, runGitAction, t]);

      const toggleExpanded = useCallback((path) => {
        setExpanded((current) => {
          const next = new Set(current);
          if (next.has(path)) next.delete(path);
          else next.add(path);
          return next;
        });
      }, []);

      const visibleEntries = useMemo(() => {
        const isVisible = (parent) => {
          let cursorPath = parent;
          while (cursorPath) {
            if (!expanded.has(cursorPath)) return false;
            cursorPath = dirnameOf(cursorPath);
          }
          return true;
        };
        return tree.filter((entry) => isVisible(dirnameOf(entry.path)));
      }, [tree, expanded]);

      const currentTab = active ? tabs.find((item) => item.path === active) ?? null : null;
      const activeTabDirty = tabs.some((item) => item.dirty);
      const hasDirty = tabs.some((item) => item.dirty && !item.saving);
      const statusView = (() => {
        if (compiling) return { kind: "", text: t("compiling"), spin: true };
        if (status.kind === "error") return { kind: "err", text: status.message || t("error") };
        if (compile && !compile.ok) {
          const count = (compile.errors || []).length + (compile.warningsList || []).length;
          return { kind: "err", text: fmt(t("compileFailedWith"), { count }) };
        }
        if (compile && compile.ok) return { kind: "ok", text: fmt(t("compileOkShort"), { pages: compile.pages }) };
        if (activeTabDirty) return { kind: "", text: t("unsaved") };
        if (status.kind === "saved") return { kind: "ok", text: t("saved") };
        return { kind: "", text: t("saved") };
      })();

      const pageUrl = (page) => apiUrl("page", { project: project ? project.id : "", page, rev: pdf.rev });
      const pdfUrl = () => apiUrl("pdf", { project: project ? project.id : "" });

      const renderDialog = () => {
        if (!dialog) return null;
        const field = (label, key, options) => {
          const opts = options || {};
          return h("label", { className: "ps-field", key: key },
            h("span", { className: "ps-label" }, label),
            opts.multiline
              ? h("textarea", {
                className: "ps-textarea", rows: opts.rows || 3, value: dialog[key] ?? "", placeholder: opts.placeholder || "",
                onChange: (event) => setDialog({ ...dialog, [key]: event.target.value }),
              })
              : h("input", {
                className: "ps-input", type: opts.type || "text", value: dialog[key] ?? "", placeholder: opts.placeholder || "",
                onChange: (event) => setDialog({ ...dialog, [key]: event.target.value }),
                autoComplete: "off", spellCheck: false,
              }),
            opts.hint ? h("span", { className: "ps-hint" }, opts.hint) : null);
        };
        const slug = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-+|-+$/gu, "").slice(0, 60);
        const pickFolder = (chosen) => {
          if (dialog.kind === "newProject" || dialog.kind === "clone") {
            const base = slug(dialog.name) || (dialog.kind === "clone" ? "overleaf-paper" : "new-paper");
            setDialog({ ...dialog, path: `${chosen}/${base}`, picking: null });
          } else {
            setDialog({ ...dialog, path: chosen, picking: null });
          }
        };
        const pathField = (label, key, options) => {
          const opts = options || {};
          return h("div", { className: "ps-field", key },
            h("span", { className: "ps-label" }, label),
            h("div", { className: "ps-path-row" },
              h("input", {
                className: "ps-input", type: "text", value: dialog[key] ?? "", placeholder: opts.placeholder || "",
                onChange: (event) => setDialog({ ...dialog, [key]: event.target.value }),
                autoComplete: "off", spellCheck: false,
              }),
              h("button", {
                className: "ps-btn", type: "button",
                "aria-expanded": dialog.picking === key ? "true" : "false",
                onClick: () => setDialog({ ...dialog, picking: dialog.picking === key ? null : key }),
              }, t("browse"))),
            opts.hint ? h("span", { className: "ps-hint" }, opts.hint) : null,
            dialog.picking === key
              ? h(FolderPicker, {
                t,
                start: dialog[key] || catalog.newProjectRoot || "",
                onPick: pickFolder,
                onClose: () => setDialog({ ...dialog, picking: null }),
              })
              : null);
        };
        const footer = (submitLabel, extra) => h(React.Fragment, null,
          extra || null,
          h("button", { className: "ps-btn", type: "button", onClick: () => setDialog(null) }, t("cancel")),
          h("button", { className: "ps-btn primary", type: "button", disabled: busy, onClick: submitDialog }, busy ? t("saving") : submitLabel));
        let title = "";
        let body = null;
        let actions = null;

        if (dialog.kind === "newProject") {
          title = t("newPaper");
          body = [
            field(t("title"), "name", { placeholder: "Ising model paper" }),
            pathField(t("path"), "path", { placeholder: catalog.newProjectRoot ? `${catalog.newProjectRoot}/ising-model-paper` : "~/Documents/Papers/…", hint: t("pathHint") }),
            h("label", { className: "ps-field", key: "template" },
              h("span", { className: "ps-label" }, t("template")),
              h("select", { className: "ps-select", style: { maxWidth: "100%" }, value: dialog.template || "article", onChange: (event) => setDialog({ ...dialog, template: event.target.value }) },
                h("option", { value: "article" }, t("starter")),
                h("option", { value: "none" }, t("emptyTemplate")))),
          ];
          actions = footer(t("create"));
        } else if (dialog.kind === "addProject") {
          title = t("addFolder");
          body = [
            pathField(t("path"), "path", { placeholder: "/home/me/papers/existing-paper", hint: t("addFolderHint") }),
            field(t("nameOptional"), "name", { placeholder: "" }),
          ];
          actions = footer(t("add"));
        } else if (dialog.kind === "clone") {
          title = t("cloneOverleaf");
          body = [
            field("Overleaf URL", "url", { placeholder: "https://www.overleaf.com/project/…", hint: t("remoteHint") }),
            field(t("token"), "token", { type: "password", hint: t("tokenHint") }),
            field(t("nameOptional"), "name", { placeholder: "My paper" }),
            pathField(t("path"), "path", { placeholder: "~/Documents/Papers/my-paper", hint: t("pathHint") }),
            h("span", { className: "ps-hint", key: "clone-hint" }, t("cloneHint")),
          ];
          actions = footer(t("clone"));
        } else if (dialog.kind === "agents") {
          title = t("discussWithAgent");
          const general = (agents || []).filter((agent) => agent.scope !== "project");
          const local = (agents || []).filter((agent) => agent.scope === "project");
          const agentOptions = agents || [];
          const selectedKey = dialog.agentKey || (agentOptions[0] ? `${agentOptions[0].scope}:${agentOptions[0].id}` : "");
          const selectedAgent = agentOptions.find((agent) => `${agent.scope}:${agent.id}` === selectedKey) || null;
          const chatRow = (chat) => h("div", { className: "ps-chat-pick-row", key: chat.id },
            h("button", {
              className: "ps-agent-pick ps-chat-pick-main", type: "button",
              onClick: () => { void openExistingChat({ id: chat.agentId, name: chat.agentName || chat.agentId, scope: chat.agentScope }, chat.id); },
            },
            h("span", { className: "ps-agent-pick-name" },
              h("b", null, chat.agentName || chat.agentId),
              ` · ${chat.title || t("newChat")}`),
            h("span", { className: "ps-agent-pick-desc" },
              `${chat.messages || 0} · ${chat.updatedAt ? new Date(chat.updatedAt).toLocaleString() : ""}`)),
            h("button", {
              className: "ps-btn icon ps-chat-prompt", type: "button", title: t("viewPrompt"),
              onClick: () => { void openPrompt(chat.agentId, chat.id, chat.agentName, chat.title); },
            }, "ℹ"),
            h("button", {
              className: "ps-btn icon ps-chat-delete", type: "button", title: t("deleteChat"),
              onClick: () => { void deleteChatFromPicker({ id: chat.agentId, name: chat.agentName, scope: chat.agentScope }, chat.id); },
            }, "🗑"));
          body = [
            h("div", { className: "ps-chat-new", key: "new" },
              h("select", {
                className: "ps-select", value: selectedKey, disabled: !agents || agentOptions.length === 0,
                onChange: (event) => setDialog({ ...dialog, agentKey: event.target.value }),
              },
              general.length > 0 ? h("optgroup", { label: t("agentsGeneral") }, general.map((agent) => h("option", { key: `${agent.scope}:${agent.id}`, value: `${agent.scope}:${agent.id}` }, agent.name))) : null,
              local.length > 0 ? h("optgroup", { label: t("agentsProject") }, local.map((agent) => h("option", { key: `${agent.scope}:${agent.id}`, value: `${agent.scope}:${agent.id}` }, agent.name))) : null),
              h("button", {
                className: "ps-btn primary", type: "button", disabled: !selectedAgent,
                onClick: () => { if (selectedAgent) void startChat(selectedAgent, dialog.context); },
              }, t("startNewChat"))),
            h("div", { className: "ps-agent-pick-head", key: "old" }, t("oldChats")),
            allChats === null
              ? h("div", { className: "ps-hint", key: "loading" }, t("loading"))
              : allChats.length === 0
                ? h("div", { className: "ps-hint", key: "none" }, t("noChats"))
                : h("div", { className: "ps-agent-pick-list", key: "chats" }, allChats.map(chatRow)),
            h("div", { className: "ps-hint", key: "hint" }, t("discussHint")),
          ];
          actions = h(React.Fragment, null,
            h("button", { className: "ps-btn", type: "button", onClick: () => setDialog(null) }, t("cancel")));
        } else if (dialog.kind === "memory") {
          title = t("memoryTitle");
          body = [
            h("div", { className: "ps-hint", key: "hint" }, `${dialog.agentName || ""} · ${t("memoryHint")}`),
            h("textarea", {
              className: "ps-memory-area", key: "area", spellCheck: false,
              value: dialog.draft,
              onChange: (event) => setDialog({ ...dialog, draft: event.target.value }),
            }),
          ];
          actions = h(React.Fragment, null,
            h("button", {
              className: "ps-btn primary", type: "button",
              onClick: async () => {
                try {
                  await request("chat/memory", { method: "POST", body: {
                    project: projectIdRef.current, agentId: dialog.agentId, chatId: dialog.chatId, markdown: dialog.draft,
                  } });
                  setChat((current) => (current && current.id === dialog.chatId ? { ...current, memory: dialog.draft.trim() } : current));
                  notify(t("memorySaved"));
                  setDialog(null);
                } catch (error) {
                  notify(error.message, "err");
                }
              },
            }, t("save")),
            h("button", { className: "ps-btn", type: "button", onClick: () => setDialog(null) }, t("cancel")));
        } else if (dialog.kind === "prompt") {
          title = t("promptTitle");
          body = [
            h("div", { className: "ps-hint", key: "meta" }, `${dialog.agentName || ""} · ${dialog.title || ""}`),
            dialog.prompt
              ? h("pre", { className: "ps-prompt-body", key: "body" }, dialog.prompt)
              : h("div", { className: "ps-hint", key: "empty" }, t("promptEmpty")),
          ];
          actions = h(React.Fragment, null,
            h("button", { className: "ps-btn", type: "button", onClick: () => setDialog(null) }, t("close")));
        } else if (dialog.kind === "chatPick") {
          title = dialog.agent ? dialog.agent.name : t("chatTab");
          const chats = dialog.chats;
          body = [
            h("div", { className: "ps-hint", key: "hint" }, t("chatPickHint")),
            h("button", {
              className: "ps-btn primary", type: "button", key: "new",
              onClick: () => { void startChat(dialog.agent, dialog.context); },
            }, h(Icon.plus), t("newChat")),
            chats === null
              ? h("div", { className: "ps-hint", key: "loading" }, t("loading"))
              : chats.length === 0
                ? h("div", { className: "ps-hint", key: "none" }, t("noPreviousChats"))
                : h("div", { className: "ps-agent-pick-list", key: "list" },
                  chats.map((entry) => h("div", { className: "ps-chat-pick-row", key: entry.id },
                    h("button", {
                      className: "ps-agent-pick", type: "button",
                      onClick: () => { void openExistingChat(dialog.agent, entry.id); },
                    },
                    h("span", { className: "ps-agent-pick-name" }, entry.title || t("newChat")),
                    h("span", { className: "ps-agent-pick-desc" },
                      `${entry.messages || 0} · ${entry.updatedAt ? new Date(entry.updatedAt).toLocaleString() : ""}`)),
                    h("button", {
                      className: "ps-btn icon ps-chat-delete", type: "button",
                      title: t("deleteChat"),
                      onClick: () => { void deleteChatFromPicker(dialog.agent, entry.id); },
                    }, "🗑")))),
            h("button", {
              className: "ps-btn", type: "button", key: "back",
              onClick: () => setDialog({ kind: "agents", context: dialog.context }),
            }, t("back")),
          ];
          actions = h(React.Fragment, null,
            h("button", { className: "ps-btn", type: "button", onClick: () => setDialog(null) }, t("cancel")));
        } else if (dialog.kind === "prefs") {
          title = t("settingsTitle");
          const tab = dialog.tab === "project" ? "project" : dialog.tab === "agents" ? "agents" : "editor";
          const current = catalog.projects.find((item) => item.id === dialog.projectId) || project || {};
          const draft = dialog.draft || syntax;
          const updateDraft = (patch) => {
            const next = { ...dialog.draft, ...patch };
            setDialog({ ...dialog, draft: next });
            setSyntax(next);
          };
          const color = (label, key) => h("label", { className: "ps-color-row", key },
            h("input", {
              type: "color",
              value: draft[key] || "#000000",
              onChange: (event) => updateDraft({ [key]: event.target.value }),
            }),
            h("span", { className: "ps-color-label" }, label),
            h("code", { className: "ps-color-value" }, String(draft[key] || "")));
          const toggle = (label, key) => h("label", { className: "ps-check-row", key },
            h("input", {
              type: "checkbox",
              checked: Boolean(draft[key]),
              onChange: (event) => updateDraft({ [key]: event.target.checked }),
            }),
            h("span", null, label));
          const tabs = h("div", { className: "ps-prefs-tabs", key: "tabs" },
            h("button", {
              className: `ps-drawer-tab${tab === "editor" ? " active" : ""}`,
              type: "button", onClick: () => setDialog({ ...dialog, tab: "editor" }),
            }, t("editorSettings")),
            dialog.projectId ? h("button", {
              className: `ps-drawer-tab${tab === "project" ? " active" : ""}`,
              type: "button", onClick: () => setDialog({ ...dialog, tab: "project" }),
            }, t("projectSettings")) : null,
            h("button", {
              className: `ps-drawer-tab${tab === "agents" ? " active" : ""}`,
              type: "button", onClick: () => setDialog({ ...dialog, tab: "agents" }),
            }, t("agentsTab")));
          const section = dialog.section || "appearance";
          const editingBody = [
            h("div", { className: "ps-color-group", key: "layout" },
              h("h3", null, t("editing")),
              toggle(t("wrapLines"), "wrap"),
              toggle(t("autosave"), "autosave"),
              h("label", { className: "ps-field-row", key: "autosaveDelay" },
                h("span", null, t("autosaveDelay")),
                h("select", {
                  className: "ps-select", value: String(draft.autosaveDelay ?? 850), disabled: draft.autosave === false,
                  onChange: (event) => updateDraft({ autosaveDelay: Number(event.target.value) }),
                }, [
                  [500, "0.5 s"], [1000, "1 s"], [2000, "2 s"], [5000, "5 s"], [10000, "10 s"],
                ].map(([value, label]) => h("option", { key: value, value: String(value) }, label)))),
              toggle(t("compileOnSave"), "compileOnSave"),
              h("label", { className: "ps-field-row", key: "thinking" },
                h("span", null, t("thinkingMode")),
                h("select", {
                  className: "ps-select", value: draft.thinking || "last",
                  onChange: (event) => updateDraft({ thinking: event.target.value }),
                },
                h("option", { value: "off" }, t("thinkingOff")),
                h("option", { value: "last" }, t("thinkingLast")),
                h("option", { value: "full" }, t("thinkingFull")))),
              toggle(t("autoCompile"), "autoCompile"),
              toggle(t("diagnostics"), "diagnostics")),
          ];
          const appearanceBody = [
            h("div", { className: "ps-color-group", key: "tokens" },
              h("h3", null, t("syntaxColors")),
              color(t("colorCommand"), "command"),
              color(t("colorEnvironment"), "environment"),
              color(t("colorMath"), "math"),
              color(t("colorComment"), "comment"),
              color(t("colorBrace"), "brace")),
            h("div", { className: "ps-color-group", key: "backgrounds" },
              h("h3", null, t("environmentShading")),
              toggle(t("enableShading"), "backgrounds"),
              color(t("colorFigure"), "bgFigure"),
              color(t("colorMathEnv"), "bgMath"),
              color(t("colorTable"), "bgTable"),
              color(t("colorTheorem"), "bgTheorem"),
              color(t("colorCode"), "bgCode")),
            h("div", { className: "ps-color-group", key: "diff" },
              h("h3", null, t("diffGutter")),
              h("label", { className: "ps-color-row" },
                h("span", { className: "ps-color-label" }, t("diffGutter")),
                h("select", {
                  className: "ps-select", value: draft.diffGutter === "off" ? "off" : "git",
                  onChange: (event) => updateDraft({ diffGutter: event.target.value }),
                },
                h("option", { value: "off" }, t("diffOff")),
                h("option", { value: "git" }, t("diffGit"))))),
            h("div", { className: "ps-color-group", key: "cursor" },
              h("h3", null, t("cursorLine")),
              toggle(t("enableCursorLine"), "currentLine"),
              color(t("colorCursorLine"), "currentLineColor")),
          ];
          const spellingBody = [
            h("div", { className: "ps-color-group", key: "spelling" },
              h("h3", null, t("spelling")),
              toggle(t("spellcheck"), "spellcheck"),
              h("label", { className: "ps-color-row" },
                h("span", { className: "ps-color-label" }, t("spellLanguage")),
                h("select", {
                  className: "ps-select",
                  value: draft.spellLang || "en_US",
                  onChange: (event) => updateDraft({ spellLang: event.target.value }),
                },
                h("option", { value: "en_US" }, "English (US)"),
                h("option", { value: "en_GB" }, "English (UK)")))),
          ];
          const shortcutsBody = [
            h("div", { className: "ps-color-group", key: "vim" },
              h("h3", null, t("vim")),
              toggle(t("vimBindings"), "vim")),
            h("div", { className: "ps-color-group", key: "keys" },
              h("h3", null, t("shortcuts")),
              h("span", { className: "ps-hint" }, t("keysHint")),
              ["save", "bold", "italic", "underline", "undo", "redo"].map((name) => h("label", { className: "ps-key-row", key: name },
                h("span", { className: "ps-color-label" }, t(`shortcut${name.charAt(0).toUpperCase()}${name.slice(1)}`)),
                h("input", {
                  className: "ps-input ps-key-input",
                  readOnly: true,
                  value: draft.keys[name],
                  onKeyDown: (event) => {
                    event.preventDefault();
                    const binding = bindingFromEvent(event);
                    if (!binding) return;
                    const keys = { ...draft.keys, [name]: binding };
                    setDialog({ ...dialog, draft: { ...draft, keys } });
                    setSyntax({ ...syntax, keys });
                  },
                })))),
          ];
          const sections = tab === "editor" ? h("div", { className: "ps-prefs-subtabs", key: "sections" },
            ["appearance", "editing", "spelling", "shortcuts"].map((name) => h("button", {
              key: name,
              className: `ps-drawer-tab${section === name ? " active" : ""}`,
              type: "button",
              onClick: () => setDialog({ ...dialog, section: name }),
            }, t(name)))) : null;
          const projectBody = [
            field(t("title"), "name", {}),
            field(t("mainFile"), "mainFile", { placeholder: "main.tex", hint: t("mainFileHint") }),
            field(t("remote"), "remote", { placeholder: "https://git.overleaf.com/…", hint: t("remoteHint") }),
            field(t("token"), "token", { type: "password", placeholder: current.overleaf && current.overleaf.hasToken ? t("tokenSaved") : "", hint: t("tokenHint") }),
            h("div", { className: "ps-git-row", key: "git" },
              h("button", { className: "ps-btn", type: "button", onClick: () => runGit("status") }, h(Icon.fetch), t("status")),
              h("button", { className: "ps-btn", type: "button", onClick: () => runGit("pull") }, h(Icon.pull), t("pull")),
              h("button", { className: "ps-btn", type: "button", onClick: () => runGit("push") }, h(Icon.push), t("push")),
              h("button", { className: "ps-btn", type: "button", onClick: () => runGit("init") }, t("initializeGit"))),
            gitState.output ? h("details", { className: "ps-git-details", key: "output" },
              h("summary", null, t("lastGitOutput")),
              h("pre", { className: "ps-output", style: { maxHeight: 140, overflow: "auto" } }, gitState.output)) : null,
            h("button", {
              className: "ps-btn danger", key: "remove", type: "button",
              onClick: () => openDialog("removeProject", { projectId: dialog.projectId }),
            }, t("removeProject")),
          ];
          const activeBody = section === "spelling"
            ? spellingBody
            : section === "shortcuts"
              ? shortcutsBody
              : section === "editing"
                ? editingBody
                : appearanceBody;
          const agentsBody = h("div", { className: "ps-agents", key: "agents" },
            h("div", { className: "ps-agents-list" },
              h("div", { className: "ps-agents-head" },
                h("span", null, t("agentsGeneral")),
                h("button", {
                  className: "ps-btn icon", type: "button", title: t("agentNewGlobal"),
                  onClick: () => setAgentEdit({ id: "", scope: "global", markdown: agentMarkdownTemplate() }),
                }, h(Icon.plus))),
              h("button", {
                className: "ps-agents-item", type: "button",
                onClick: () => { void openCommonAgent(); },
              },
              h("span", { className: "ps-agents-name" }, t("commonPrompt")),
              h("span", { className: "ps-agents-scope builtin" }, t("scopeCommon"))),
              agents === null
                ? h("div", { className: "ps-hint" }, t("loading"))
                : (agents || []).filter((agent) => agent.scope !== "project").map((agent) => h("button", {
                  key: `${agent.scope}:${agent.id}`,
                  className: `ps-agents-item${agentEdit && agentEdit.id === agent.id && agentEdit.scope === agent.scope ? " active" : ""}`,
                  type: "button",
                  title: agent.description || agent.name,
                  onClick: () => { void openAgent(agent); },
                },
                h("span", { className: "ps-agents-name" }, agent.name),
                h("span", { className: `ps-agents-scope ${agent.scope}` },
                  agent.scope === "builtin" ? t("scopeBuiltin") : t("scopeGlobal")))),
              h("hr", { className: "ps-agents-sep" }),
              h("div", { className: "ps-agents-head" },
                h("span", null, t("agentsProject")),
                project ? h("button", {
                  className: "ps-btn icon", type: "button", title: t("agentNewProject"),
                  onClick: () => setAgentEdit({ id: "", scope: "project", markdown: agentMarkdownTemplate() }),
                }, h(Icon.plus)) : null),
              !project
                ? h("div", { className: "ps-hint" }, t("agentNoProject"))
                : (agents || []).filter((agent) => agent.scope === "project").length === 0
                  ? h("div", { className: "ps-hint" }, t("agentNone"))
                  : (agents || []).filter((agent) => agent.scope === "project").map((agent) => h("button", {
                    key: `${agent.scope}:${agent.id}`,
                    className: `ps-agents-item${agentEdit && agentEdit.id === agent.id && agentEdit.scope === agent.scope ? " active" : ""}`,
                    type: "button",
                    title: agent.description || agent.name,
                    onClick: () => { void openAgent(agent); },
                  },
                  h("span", { className: "ps-agents-name" }, agent.name),
                  h("span", { className: "ps-agents-scope project" }, t("scopeProject"))))),
            h("div", { className: "ps-agents-edit" },
              h("div", { className: "ps-agents-path" },
                h("div", null, `${t("scopeGlobal")}: ~/.dsh/paper-studio/agents/`),
                project ? h("div", null, `${t("scopeProject")}: ${project.path}/agents/`) : null),
              h("div", { className: "ps-agents-tools" },
                h("button", { className: "ps-btn", type: "button", onClick: () => { void exportAgentsToFile(); } }, t("exportAgents")),
                h("button", { className: "ps-btn", type: "button", onClick: () => { if (agentFileRef.current) agentFileRef.current.click(); } }, t("importAgents")),
                h("input", {
                  type: "file", accept: ".json,application/json", ref: agentFileRef,
                  style: { display: "none" },
                  onChange: (event) => { void importAgentsFromFile(event); },
                })),
              !agentEdit
                ? h("div", { className: "ps-hint" }, t("agentSelectHint"))
                : h(React.Fragment, null,
                  h("div", { className: "ps-agents-meta" },
                    `${agentEdit.scope === "common" ? t("scopeCommon") : agentEdit.scope === "project" ? t("scopeProject") : t("scopeGlobal")}${agentEdit.id ? ` · ${agentEdit.id}` : ""}`),
                  !agentEdit.id ? h("div", { className: "ps-agents-bases" },
                    h("div", { className: "ps-agents-bases-head" }, t("agentBaseHint")),
                    (agents || []).filter((agent) => agent.scope !== "builtin").map((agent) => h("label", { className: "ps-check-row", key: `${agent.scope}:${agent.id}` },
                      h("input", {
                        type: "checkbox",
                        checked: agentBases.has(`${agent.scope}:${agent.id}`),
                        onChange: (event) => {
                          setAgentBases((current) => {
                            const next = new Set(current);
                            const key = `${agent.scope}:${agent.id}`;
                            if (event.target.checked) next.add(key); else next.delete(key);
                            return next;
                          });
                        },
                      }),
                      h("span", null, `${agent.name} (${agent.scope})`))),
                    h("button", { className: "ps-btn", type: "button", disabled: agentBases.size === 0 || agentBusy, onClick: () => { void mergeAgentBases(); } }, t("agentBaseMerge"))) : null,
                  h("textarea", {
                    className: "ps-agents-md", spellCheck: false,
                    value: agentEdit.markdown,
                    onChange: (event) => setAgentEdit({ ...agentEdit, markdown: event.target.value }),
                  }),
                  h("div", { className: "ps-agents-actions" },
                    h("button", { className: "ps-btn primary", type: "button", disabled: agentBusy, onClick: () => { void saveAgent(); } }, t("agentSave")),
                    agentEdit.id && agentEdit.scope !== "builtin" && agentEdit.scope !== "common"
                      ? h("button", { className: "ps-btn", type: "button", disabled: agentBusy, onClick: () => { void renameAgent(); } }, t("agentRename"))
                      : null,
                    agentEdit.id && agentEdit.scope !== "builtin" && agentEdit.scope !== "common"
                      ? h("button", { className: "ps-btn danger", type: "button", disabled: agentBusy, onClick: () => { void removeAgent(); } }, t("agentDelete"))
                      : null,
                    h("button", {
                      className: "ps-btn", type: "button",
                      onClick: () => setAgentEdit({ id: "", scope: project ? "project" : "global", markdown: agentMarkdownTemplate() }),
                    }, t("agentNew"))))));
          body = [tabs, ...(tab === "project" ? projectBody : tab === "agents" ? [agentsBody] : [sections, ...activeBody]),
            h("div", { className: "ps-build", key: "build" }, `build ${CLIENT_BUILD}`)];
          actions = tab === "project"
            ? footer(t("apply"))
            : h(React.Fragment, null,
              h("button", {
                className: "ps-btn", type: "button",
                onClick: () => {
                  const next = { ...DEFAULT_SYNTAX };
                  setDialog({ ...dialog, draft: next });
                  setSyntax(next);
                },
              }, t("resetDefaults")),
              h("button", {
                className: "ps-btn", type: "button",
                onClick: () => { setSyntax(dialog.original); setDialog(null); },
              }, t("cancel")),
              h("button", {
                className: "ps-btn primary", type: "button",
                onClick: () => { writeSyntax(syntax); setDialog(null); notify(t("saved")); },
              }, t("save")));
        } else if (dialog.kind === "nuke") {
          title = t("nukeHeading");
          body = [h("div", { className: "ps-nuke-warn", key: "nuke" },
            h("h3", { className: "ps-nuke-title" }, t("nukeTitle")),
            dialog.target ? h("code", { className: "ps-nuke-target" }, dialog.target) : null,
            h("p", { className: "ps-nuke-body" }, t("nukeBody")))];
          actions = h(React.Fragment, null,
            h("button", { className: "ps-btn", type: "button", onClick: () => setDialog(null) }, t("nukeCancel")),
            h("button", {
              className: "ps-btn danger-solid ps-nuke-confirm", type: "button", disabled: busy,
              onClick: submitDialog,
            }, t("nukeConfirm")));
        } else if (dialog.kind === "branch") {
          title = t("branchTitle");
          body = [field(t("branchName"), "name", { placeholder: "feature/new-section" })];
          actions = footer(t("create"));
        } else if (dialog.kind === "locate") {
          title = t("locateTitle");
          body = [pathField(t("path"), "path", { placeholder: "~/Documents/Papers/my-paper", hint: t("addFolderHint") })];
          actions = footer(t("locate"));
        } else if (dialog.kind === "newFile" || dialog.kind === "newFolder") {
          title = dialog.kind === "newFile" ? t("newFile") : t("newFolder");
          body = [field(t("path"), "path", { placeholder: dialog.kind === "newFile" ? "sections/related-work.tex" : "figures", hint: t("newFileHint") })];
          actions = footer(t("create"));
        } else if (dialog.kind === "rename") {
          title = t("renameTitle");
          body = [field(t("from"), "from", {}), field(t("to"), "to", {})];
          actions = footer(t("rename"));
        } else if (dialog.kind === "delete") {
          title = t("deleteTitle");
          body = [h("p", { key: "p", className: "ps-hint" }, `${dialog.path} — ${t("deleteBody")}`)];
          actions = footer(t("delete"));
        } else if (dialog.kind === "removeProject") {
          title = t("removeTitle");
          body = [h("p", { key: "p", className: "ps-hint" }, t("removeBody"))];
          actions = footer(t("removeProject"));
        }
        return h(Modal, {
          title,
          onClose: () => {
            if (dialog.kind === "prefs" && dialog.original) setSyntax(dialog.original);
            setDialog(null);
          },
        },
          body,
          dialogError ? h("span", { className: "ps-error" }, dialogError) : null,
          actions);
      };

      const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

      const startResize = useCallback((kind) => (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        event.preventDefault();
        const startX = event.clientX;
        const startY = event.clientY;
        const initial = kind === "explorer" ? explorerWidth : kind === "pdf" ? pdfPct : dockHeight;
        const width = bodyRef.current ? bodyRef.current.getBoundingClientRect().width : window.innerWidth;
        const move = (moveEvent) => {
          if (kind === "explorer") setExplorerWidth(clamp(initial + moveEvent.clientX - startX, 180, 460));
          else if (kind === "pdf") setPdfPct(clamp(initial - ((moveEvent.clientX - startX) / Math.max(360, width)) * 100, 22, 70));
          else setDockHeight(clamp(initial - (moveEvent.clientY - startY), 96, 520));
        };
        const up = () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          document.body.classList.remove("ps-resizing");
        };
        document.body.classList.add("ps-resizing");
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
      }, [dockHeight, explorerWidth, pdfPct]);

      const showExplorer = Boolean(project) && explorerOpen;
      const showPdf = Boolean(project) && pdfOpen;
      const columns = [];
      if (showExplorer) columns.push(`${explorerWidth}px`, "9px");
      columns.push("minmax(0, 1fr)");
      if (showPdf) columns.push("9px", `${pdfPct}%`);

      const problemCount = compile ? ((compile.errors || []).length + (compile.warningsList || []).length) : 0;
      const canRenderPages = () => {
        const tooling = catalogRef.current && catalogRef.current.tooling;
        return !tooling || tooling.pdftoppm !== false;
      };
      const paneMode = (pages) => (pages > 0 ? (canRenderPages() ? "pages" : "iframe") : "none");

      const refreshPdf = useCallback(async () => {
        const id = projectIdRef.current;
        if (!id) return;
        try {
          const info = await request("pdf-info", { query: { project: id } });
          if (info && info.exists) {
            setPdf({ rev: info.rev, pages: info.pages, mode: paneMode(info.pages) });
            notify(t("pdfReloaded"));
          } else {
            setPdf({ rev: null, pages: 0, mode: "missing" });
            notify(t("pdfMissing"), "err");
          }
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify, t]);

      return h("div", { className: "ps-root" },
        h("header", { className: "ps-head" },
          h("div", { className: "ps-brand" }, h(Icon.logo), t("brand")),
          catalog.projects.length > 0 ? h("select", {
            className: "ps-select",
            value: project ? project.id : "",
            onChange: (event) => { void switchProject(event.target.value); },
            title: t("chooseProject"),
          },
          !project ? h("option", { value: "" }, t("chooseProject")) : null,
          catalog.projects.map((item) => h("option", { key: item.id, value: item.id },
            item.exists === false ? `${item.name} — ${t("projectMissingBadge")}` : item.name))) : null,
          h("button", { className: "ps-btn", type: "button", onClick: () => openDialog("newProject"), title: t("newPaper") },
            h(Icon.plus), h("span", { className: "ps-hide-narrow" }, t("newPaper"))),
          h("button", { className: "ps-btn", type: "button", onClick: () => openDialog("addProject"), title: t("addFolder") },
            h(Icon.folder), h("span", { className: "ps-hide-narrow" }, t("addFolder"))),
          h("button", { className: "ps-btn", type: "button", onClick: () => openDialog("clone"), title: t("cloneOverleaf") },
            h(Icon.git), h("span", { className: "ps-hide-narrow" }, t("cloneOverleaf"))),
          project ? h("button", {
            className: "ps-btn icon", type: "button", title: t("settings"), "aria-label": t("settings"),
            onClick: () => openDialog("prefs", {
              tab: "editor",
              draft: syntax,
              original: syntax,
              projectId: project.id,
              name: project.name,
              mainFile: project.mainFile || "",
              remote: project.overleaf ? project.overleaf.remote : "",
              token: "",
            }),
          }, h(Icon.gear)) : null,
          h("div", { className: "ps-spacer" }),
          h("button", {
            className: "ps-btn", type: "button", disabled: !hasDirty,
            title: `${t("save")} — ${t("saveHint")}`,
            onClick: () => { void saveAll({ manual: true }); },
          }, h(Icon.save), h("span", { className: "ps-hide-narrow" }, t("save"))),
          h("span", { className: `ps-status ${statusView.kind}` },
            statusView.spin ? h(Icon.refresh, { className: "ps-spin" }) : h("span", { className: "ps-dot" }),
            statusView.text),
          h("button", {
            className: `ps-btn icon${explorerOpen ? " active" : ""}`, type: "button", title: t("files"), "aria-label": t("files"),
            "aria-pressed": explorerOpen, onClick: () => setExplorerOpen((value) => !value),
          }, h(Icon.panels)),
          h("button", {
            className: `ps-btn icon${pdfOpen ? " active" : ""}`, type: "button", title: t("pdf"), "aria-label": t("pdf"),
            "aria-pressed": pdfOpen, onClick: togglePdfOpen,
          }, h(Icon.pdf)),
          h("button", {
            className: `ps-btn${dock ? " active" : ""}`, type: "button", disabled: !project,
            title: `${t("output")} — ${t("terminalHint")}`,
            "aria-pressed": Boolean(dock),
            onClick: () => setDock((current) => (current ? null : (problemCount > 0 ? "problems" : "terminal"))),
          }, h(Icon.terminal), h("span", { className: "ps-hide-narrow" }, t("output")),
            problemCount > 0 ? h("span", { className: "ps-badge", style: { padding: "0 5px", fontSize: 10 } }, problemCount) : null),
          h("div", { className: "ps-compile-group", onMouseDown: (event) => event.stopPropagation() },
            h("button", {
              className: "ps-btn primary", type: "button", onClick: () => { void runCompile(); },
              disabled: compiling || !project, title: `${t("compile")} (${t("compileHint")})`,
            }, compiling ? h(Icon.refresh, { className: "ps-spin" }) : h(Icon.play), compiling ? t("compiling") : t("compile")),
            h("button", {
              className: "ps-btn primary ps-compile-caret", type: "button",
              disabled: compiling || !project, title: t("compileOptions"), "aria-label": t("compileOptions"),
              "aria-expanded": compileMenu,
              onClick: () => setCompileMenu((value) => !value),
            }, h(Icon.chevron)),
            compileMenu ? h("div", { className: "ps-compile-menu" },
              h("button", {
                className: "ps-btn", type: "button", disabled: compiling || !project,
                onClick: () => { setCompileMenu(false); void runCompile({ force: true }); },
              }, h(Icon.refresh),
              h("span", { className: "ps-compile-menu-text" },
                h("span", { className: "ps-compile-menu-title" }, t("fullRecompile")),
                h("span", { className: "ps-compile-menu-hint" }, t("fullRecompileHint"))))) : null)),

        h("div", { className: "ps-main" },
          h("div", { className: "ps-body", ref: bodyRef, style: { gridTemplateColumns: columns.join(" ") } },
          showExplorer ? h("section", { className: "ps-pane ps-explorer", "aria-label": t("files") },
            h("div", { className: "ps-pane-head" },
              h("button", {
                className: `ps-drawer-tab${explorerTab === "files" ? " active" : ""}`,
                type: "button", onClick: () => setExplorerTab("files"),
              }, t("files")),
              h("button", {
                className: `ps-drawer-tab${explorerTab === "git" ? " active" : ""}`,
                type: "button", onClick: () => setExplorerTab("git"),
              }, t("gitTab")),
              h("div", { className: "ps-spacer" }),
              explorerTab === "files" ? h(React.Fragment, null,
                h("button", { className: "ps-btn icon", type: "button", title: t("newFile"), "aria-label": t("newFile"), onClick: () => openDialog("newFile", { path: "" }) }, h(Icon.plus)),
                h("button", { className: "ps-btn icon", type: "button", title: t("newFolder"), "aria-label": t("newFolder"), onClick: () => openDialog("newFolder", { path: "" }) }, h(Icon.folder)),
                h("button", { className: "ps-btn icon", type: "button", title: t("refresh"), "aria-label": t("refresh"), onClick: () => { void refreshTree(); } }, h(Icon.refresh)))
                : h("button", { className: "ps-btn icon", type: "button", title: t("refresh"), "aria-label": t("refresh"), onClick: () => { void refreshGit({ diff: gitDiffOpen }); } }, h(Icon.refresh))),
            explorerTab === "git" ? h(GitView, {
              t,
              info: gitInfo,
              diff: gitDiff,
              diffOpen: gitDiffOpen,
              busy: gitBusy,
              onAction: (action) => { void runGitAction(action); },
              onNewBranch: () => openDialog("branch", { name: "" }),
              onNuke: () => openDialog("nuke", {
                target: gitInfo.data
                  ? `${gitInfo.data.branch || "?"} \u2192 ${gitInfo.data.upstream || `origin/${gitInfo.data.branch || "?"}`}`
                  : "",
              }),
              onSwitch: (branch) => { if (branch) void runGitAction("switch", { branch }); },
              onRefresh: () => { void refreshGit({ diff: gitDiffOpen }); },
              onOpenFile: (path) => { void openFile(path); },
              onToggleDiff: () => setGitDiffOpen((current) => !current),
            }) : h("div", { className: "ps-tree", role: "tree" },
              visibleEntries.length === 0
                ? h("div", { className: "ps-hint", style: { padding: "10px 8px" } }, project.mainFile ? "" : t("emptyFolder"))
                : visibleEntries.map((entry) => {
                  const depth = entry.path.includes("/") ? entry.path.split("/").length - 1 : 0;
                  const isOpen = expanded.has(entry.path);
                  const chip = chipOf(entry.name);
                  return h("div", {
                    key: entry.path,
                    className: `ps-row${entry.path === active ? " active" : ""}`,
                    role: "treeitem",
                    "aria-expanded": entry.dir ? isOpen : undefined,
                    style: { paddingLeft: 6 + depth * 12 },
                    title: entry.path,
                    onClick: () => {
                      if (entry.dir) toggleExpanded(entry.path);
                      else if (["pdf"].includes(extOf(entry.name))) window.open(apiUrl("raw", { project: project.id, path: entry.path }), "_blank", "noopener");
                      else void openFile(entry.path);
                    },
                    onDoubleClick: () => { if (entry.dir) toggleExpanded(entry.path); },
                  },
                  entry.dir
                    ? h(Icon.chevron, { className: `ps-chev${isOpen ? " open" : ""}` })
                    : h("span", { className: `ps-chip ${chip.group}` }, chip.label),
                  h("span", { className: "ps-name" }, entry.name));
                })),
            h("div", { className: "ps-explorer-foot" },
              h("span", { className: "ps-path", title: project.path }, project.path),
              h("button", {
                className: "ps-btn", type: "button", title: t("sync"),
                onClick: () => {
                  openDialog("prefs", {
                    tab: "project",
                    draft: syntax,
                    original: syntax,
                    projectId: project.id,
                    name: project.name,
                    mainFile: project.mainFile || "",
                    remote: project.overleaf ? project.overleaf.remote : "",
                    token: "",
                  });
                  void runGit("status");
                },
              }, project.overleaf ? t("overleafBadge") : t("gitBadge")))) : null,

          showExplorer ? h("div", {
            className: "ps-split", role: "separator", "aria-orientation": "vertical", title: t("files"),
            onPointerDown: startResize("explorer"), onDoubleClick: () => setExplorerWidth(238),
          }) : null,

          h(EditorPane, {
            t, tabs, activePath: active, tab: currentTab, cursor, compile, status,
            onSelectTab: (path) => { setActive(path); activeRef.current = path; },
            onCloseTab: closeTab,
            onEdit,
            onCompile: runCompile,
            editorRef, gutterInnerRef, editorApiRef,
            onScroll, onCursor,
            onInsertText: insertText,
            onReloadDisk: reloadDisk,
            onKeepMine: keepMine,
            symbols,
            syntax,
            misspelled,
            onSave: (path) => { void saveTab(path, { manual: true }); },
            onDiscuss: (context) => setDialog({ kind: "agents", context }),
            onAddChatContext: (context) => { void addChatContext(context); },
            chatEnabled: Boolean(chat && chatAgent),
            changes: reviewHidden ? [] : changes,
            onKeepChange: keepChange,
            onDiscardChange: discardChange,
            onCloseReview: () => setReviewHidden(true),
            onUndo: undo,
            onRedo: redo,
            notify,
            onToggleWrap: () => {
              const next = { ...syntax, wrap: !syntax.wrap };
              setSyntax(next);
              writeSyntax(next);
            },
          }),

          showPdf ? h("div", {
            className: "ps-split", role: "separator", "aria-orientation": "vertical", title: t("pdf"),
            onPointerDown: startResize("pdf"), onDoubleClick: () => setPdfPct(44),
          }) : null,

          showPdf ? h("section", { className: "ps-pane ps-pdf", "aria-label": t("pdf") },
            h("div", { className: "ps-pane-head" },
              h("button", {
                className: `ps-drawer-tab${rightTab === "pdf" ? " active" : ""}`, type: "button",
                onClick: () => setRightTab("pdf"),
              }, t("pdf")),
              chatAgent ? h("button", {
                className: `ps-drawer-tab${rightTab === "chat" ? " active" : ""}`, type: "button",
                onClick: () => setRightTab("chat"),
              }, t("chatTab")) : null,
              h("div", { className: "ps-spacer" }),
              h("button", { className: "ps-btn icon", type: "button", title: t("pdfReload"), "aria-label": t("pdfReload"), onClick: () => { void refreshPdf(); }, disabled: rightTab === "chat" }, h(Icon.refresh)),
              h("button", { className: "ps-btn icon", type: "button", title: t("openInNewTab"), "aria-label": t("openInNewTab"), disabled: !pdf.rev, onClick: () => window.open(pdfUrl(), "_blank", "noopener") }, h(Icon.external)),
              h("button", { className: "ps-btn icon", type: "button", title: t("close"), "aria-label": t("close"), onClick: () => setPdfOpen(false) }, h(Icon.close))),
            rightTab === "chat" && chatAgent
              ? h(ChatPane, {
                t,
                agent: chatAgent,
                chat,
                chats: chatList,
                input: chatInput,
                onInput: setChatInput,
                onSend: () => { void sendChat(); },
                onStop: () => { void stopChat(); },
                busy: chatBusy,
                stream: chatStream,
                onSelectChat: (chatId) => { void selectChat(chatId); },
                onNewChat: () => { void startChat(chatAgent, chat && chat.context ? chat.context : null); },
                onClose: () => { setChatAgent(null); setChat(null); setRightTab("pdf"); },
                changes,
                onKeepChange: keepChange,
                onDiscardChange: discardChange,
                onKeepAll: keepAllChanges,
                onDiscardAll: discardAllChanges,
                resolvedChoices,
                onChoose: chooseOption,
                onDeleteChat: () => { void deleteCurrentChat(); },
                onShowPrompt: () => { void openPrompt(chatAgent.id, chat.id, chatAgent.name, chat.title); },
                onShowMemory: openChatMemory,
                streamReasoning: chatReasoning,
                thinkingMode: syntax.thinking || "last",
              })
              : pdf.mode === "pages"
              ? h("div", {
                className: "ps-pdf-scroll",
                onPointerEnter: () => setPdfTextLayer(true),
                onPointerDown: (event) => {
                  if (pdfTextLayerRef.current) return;
                  if (flushSync) flushSync(() => setPdfTextLayer(true));
                  else {
                    event.preventDefault();
                    setPdfTextLayer(true);
                  }
                },
                onFocus: () => setPdfTextLayer(true),
              },
                h("div", { className: "ps-pages", style: { "--ps-zoom": `${zoom}%` } },
                  Array.from({ length: pdf.pages }, (unused, index) => h(PdfPage, {
                    key: `${pdf.rev}-${index + 1}`,
                    t,
                    project: project.id,
                    page: index + 1,
                    rev: pdf.rev,
                    url: pageUrl(index + 1),
                    eager: index < 2,
                    onGoTo: locateSelection,
                    notify,
                    onMissing: onPdfMissing,
                    textLayer: pdfTextLayer,
                  }))))
              : pdf.mode === "missing"
                ? h(EmptyState, {
                  icon: Icon.filePdf,
                  title: t("pdfMissingTitle"),
                  body: t("pdfMissingBody"),
                  children: h("button", { className: "ps-btn primary", type: "button", disabled: compiling || !project, onClick: () => { void runCompile(); } }, h(Icon.play), t("compile")),
                })
                : pdf.mode === "iframe"
                ? h("iframe", { className: "ps-frame", src: pdfUrl(), title: t("pdf") })
                : h(EmptyState, {
                  icon: Icon.filePdf,
                  title: t("noPdfTitle"),
                  body: catalog.tooling && catalog.tooling.pdflatex === false ? t("noPdfTooling") : t("noPdfBody"),
                  children: h("button", { className: "ps-btn primary", type: "button", disabled: compiling || !project, onClick: () => { void runCompile(); } }, h(Icon.play), t("compile")),
                }),
            rightTab === "chat" && chatAgent ? null : h("div", { className: "ps-pdf-foot" },
              h("span", null, pdf.pages > 0 ? `${pdf.pages} p.` : ""),
              h("div", { className: "ps-spacer" }),
              h("label", { className: "ps-zoom" }, t("zoom"),
                h("select", { value: zoom, onChange: (event) => setZoom(Number(event.target.value)) },
                  [75, 100, 125, 150, 200].map((value) => h("option", { key: value, value }, `${value}%`)))))) : null),

          dock && !missing ? h(Dock, {
            t, tab: dock, onTab: setDock, onClose: () => setDock(null),
            compile, terminal, stage, elapsed, compiling,
            onClear: () => setTerminal([]),
            height: dockHeight,
            onResize: startResize("dock"),
            onOpenProblem: (problem) => { if (problem.file) void openFile(problem.file, problem.line); },
          }) : null),

        missing
          ? h("div", { className: "ps-empty", role: "alert", style: { position: "absolute", inset: "48px 0 0", background: "var(--dsw-alias-bg-base)", paddingTop: "calc(48px + var(--dsh-frame-top-clearance,0px))" } },
            h("div", { className: "ps-empty-icon" }, h(Icon.alert)),
            h("h2", null, t("missingTitle")),
            h("p", { style: { fontFamily: MONO, fontSize: 11.5, wordBreak: "break-all" } }, missing.path),
            h("p", null, t("missingBody")),
            h("div", { className: "ps-empty-actions" },
              h("button", { className: "ps-btn primary", type: "button", onClick: () => openDialog("locate", { projectId: missing.id, path: "" }) }, h(Icon.folder), t("locate")),
              h("button", { className: "ps-btn", type: "button", onClick: () => openDialog("removeProject", { projectId: missing.id }) }, t("removeProject")),
              h("button", { className: "ps-btn", type: "button", onClick: () => { void openProject(missing.id, { restoreTabs: false }); } }, t("retry")))) : null,

        !project && !missing
          ? h("div", { className: "ps-empty", style: { position: "absolute", inset: "48px 0 0", background: "var(--dsw-alias-bg-base)", paddingTop: "calc(48px + var(--dsh-frame-top-clearance,0px))" } },
            h("div", { className: "ps-empty-icon" }, h(Icon.logo)),
            h("h2", null, t("noProjectTitle")),
            h("p", null, t("noProjectBody")),
            h("div", { className: "ps-empty-actions" },
              h("button", { className: "ps-btn primary", type: "button", onClick: () => openDialog("newProject") }, h(Icon.plus), t("newPaper")),
              h("button", { className: "ps-btn", type: "button", onClick: () => openDialog("addProject") }, h(Icon.folder), t("addFolder")),
              h("button", { className: "ps-btn", type: "button", onClick: () => openDialog("clone") }, h(Icon.git), t("cloneOverleaf")))) : null,

        treeInfo.truncated ? h("div", { className: "ps-banner" }, h("span", { className: "ps-banner-text" }, t("filesTruncated"))) : null,

        renderDialog(),
        toast ? h("div", { className: `ps-toast${toast.kind === "err" ? " err" : ""}`, role: "status" }, toast.message) : null,
        h(Explosion, { nonce: boom, onDone: clearBoom }));
    }

    // -- plugin ------------------------------------------------------------
    return {
      inject: ["slots", "locale", "layout"],
      /** Pure helpers exercised by test/client.test.mjs (no browser needed). */
      __internals: { Studio, EditorPane, Dock, FolderPicker, PdfPage, GitView, Explosion, ChatPane, parseDiffSuggestions, applySuggestion, stripDiffBlocks, collectChanges, diffChangeKey, parseChoiceBlocks, stripChoiceBlocks, splitMath, diffLineKinds, highlightLatex, highlightLines, completionContext, completionItems, escapeHtml, DEFAULT_SYNTAX, syntaxVariables, bindingFromEvent, matchesBinding, orderPageWords, environmentSnippet, bracketMatch, vimTextObject, shouldCompileAfterSave },
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement("style");
          style.setAttribute("data-paper-studio", "");
          style.textContent = CSS;
          document.head.append(style);
          return () => style.remove();
        }, "paper-studio: styles");

        ctx.effect(() => ctx.locale.register(NS, { en: DICT.en }), "paper-studio: dictionaries");

        ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
          name: "sidebar.panellist",
          id: PANEL_ID,
          order: 4,
          label: () => ctx.locale.bind(NS)("brand"),
          locale: NS,
        }, PanelIcon));

        ctx.slots.inject("main", () => ctx.slots.register({
          name: "main",
          key: PANEL_ID,
          locale: NS,
          inject: () => ({ panelInfo: ctx.layout.panelInfo }),
        }, Studio));
      },
    };
  },
});
