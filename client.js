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
    const CLIENT_BUILD = "2026-11-09T05:45";
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
        editorEngine: "Editor engine",
        engineTextarea: "Textarea (legacy)",
        engineCodeMirror: "CodeMirror",
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
        brainTitle: "Memory & thinking",
        thinkingEffort: "Thinking effort",
        effortDefault: "Model default",
        effortOff: "Off",
        effortLow: "Low",
        effortHigh: "High",
        effortMax: "Max",
        memoryHint: "Only this conversation: never summarized, not inherited by new chats. One note per line.",
        memorySaved: "Memory saved",
        memoryUpdated: "Agent memory updated",
        agentRenamePrompt: "New agent name",
        commonPrompt: "Common prompt (all agents)",
        scopeCommon: "common",
        agentBaseHint: "Optionally start from existing agents, then edit the merged prompt.",
        agentBaseMerge: "Merge selected",
        addToChat: "Pin to current chat",
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
        reviewDiff: "Review diff",
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
        staged: "Staged",
        unstaged: "Unstaged",
        stage: "Stage",
        unstage: "Unstage",
        stageAll: "Stage all",
        unstageAll: "Unstage all",
        commit: "Commit",
        commitMessage: "Commit message",
        commitHint: "Write a message, stage files, then commit.",
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
        imagePreview: "Image preview",
        copyPath: "Copy path",
        pathCopied: "Path copied",
        openImageInNewTab: "Open image in new tab",
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
.ps-cm-wrap{flex:1;min-width:0;min-height:0;position:relative;display:flex;overflow:hidden}
.ps-cm-wrap .cm-editor{flex:1;height:100%;min-width:0}
.ps-cm-wrap .cm-vim-panel{font:11px/1.4 ${MONO};padding:2px 8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);border-top:.5px solid var(--dsw-alias-border-l1)}
.ps-cm-wrap .cm-selectionBackground{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 26%,transparent)}
.ps-cm-wrap .cm-focused .cm-selectionBackground{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 32%,transparent)}
.ps-cm-menu{position:fixed;z-index:90;min-width:200px;padding:4px;border-radius:8px;background:var(--dsw-alias-bg-overlay);border:.5px solid var(--dsw-alias-border-l2);box-shadow:0 10px 26px rgba(0,0,0,.28)}
.ps-cm-wrap .cm-list-env,.ps-cm-wrap .cm-list-env span{color:var(--dsw-alias-label-primary)!important}
.ps-cm-wrap .cm-item-text,.ps-cm-wrap .cm-item-text span{color:var(--dsw-alias-label-primary)!important}
.ps-cm-wrap .cm-misspell{text-decoration:underline wavy #e5484d;text-decoration-skip-ink:none}
.ps-cm-wrap .cm-activeLine{outline:1px solid var(--ps-current-line, #8b5cf6);outline-offset:-1px}
.ps-math-preview{position:fixed;z-index:60;max-width:420px;max-height:230px;overflow:auto;pointer-events:none;padding:10px 14px;border-radius:8px;background:var(--dsw-alias-bg-elevated,#fff);border:.5px solid var(--dsw-alias-border-l1,#ddd);box-shadow:0 8px 24px rgba(0,0,0,.16);font-size:15px}
.ps-math-preview-body{white-space:nowrap}
.ps-cm-wrap .cm-line.cm-review-target{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#e5484d) 13%,transparent)}
.ps-cm-wrap .cm-line.cm-band-figure{background:var(--ps-bg-figure,rgba(59,130,246,.12))}
.ps-cm-wrap .cm-line.cm-band-math{background:var(--ps-bg-math,rgba(245,158,11,.14))}
.ps-cm-wrap .cm-line.cm-diff-add{box-shadow:inset 3px 0 0 var(--ps-diff-add,#2ea043)}
.ps-cm-wrap .cm-line.cm-diff-mod{box-shadow:inset 3px 0 0 var(--ps-diff-mod,#3b82f6)}
.ps-cm-wrap .cm-line.cm-diff-del{box-shadow:none}
.cm-diff-arrow-gutter{width:14px}
.cm-diff-arrow{color:var(--ps-diff-del,#e5484d);font-size:10px;line-height:1;display:block}
.ps-diff-body{flex:1;min-height:0;overflow:auto;padding:5px 9px;font-size:12px}
.ps-cm-stale{color:var(--dsw-alias-state-error-primary);font-size:11px;padding:2px 0}
.ps-cm-diff-change{border-bottom:.5px solid var(--dsw-alias-border-l1);padding:5px 0;display:flex;flex-direction:column;min-height:0}
.ps-diff-edit-add{width:100%;box-sizing:border-box;min-height:58px;resize:vertical;margin:3px 0;padding:5px 7px;border:.5px solid var(--ps-diff-add,#2ea043);border-radius:5px;background:color-mix(in srgb,var(--ps-diff-add,#2ea043) 8%,transparent);color:var(--dsw-alias-label-primary);font:11px/1.5 ${MONO}}
.ps-cm-diff-actions{display:flex;gap:4px;padding:3px 0 2px}
.ps-diff-lines{flex:1;min-height:80px;overflow:auto;margin:3px 0;font:11px/1.5 ${MONO};background:var(--dsw-alias-bg-layer-1);border-radius:5px;padding:4px}
.ps-cm-status{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary);font-size:12px;background:var(--dsw-alias-bg-base)}
.ps-cm-status.error{color:var(--dsw-alias-state-error-primary)}
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
.ps-text-layer span.ps-word-selected{background:rgba(96,165,250,.42);color:transparent}
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
.ps-diff-line.add{background:color-mix(in srgb,#22c55e 10%,transparent)}
.ps-diff-line.del{background:color-mix(in srgb,#ef4444 9%,transparent)}
.ps-diff-word-add{background:color-mix(in srgb,#22c55e 46%,transparent);border-radius:2px;box-shadow:0 0 0 1px color-mix(in srgb,#22c55e 45%,transparent)}
.ps-diff-word-del{background:color-mix(in srgb,#ef4444 44%,transparent);border-radius:2px;box-shadow:0 0 0 1px color-mix(in srgb,#ef4444 42%,transparent)}
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
.ps-context-total{padding:6px 8px;border-radius:6px;background:var(--dsw-alias-bg-layer-1);font-size:11px}
.ps-context-layer{display:flex;align-items:center;justify-content:space-between;padding:3px 4px;border-bottom:.5px solid var(--dsw-alias-border-l1);font-size:11.5px}
.ps-context-layer code{font:10.5px/1.4 ${MONO};color:var(--dsw-alias-label-secondary)}
.ps-context-pins{display:flex;flex-direction:column;gap:2px;padding:4px 0}
.ps-context-pin{display:flex;align-items:center;justify-content:space-between;padding:3px 5px;border-radius:5px;background:var(--dsw-alias-bg-layer-1);font:10.5px/1.4 ${MONO}}
.ps-context-actions{display:flex;justify-content:flex-end;padding-top:4px}
.ps-spinner{display:inline-block;width:11px;height:11px;border:1.5px solid color-mix(in srgb,var(--dsw-alias-brand-primary) 35%,transparent);border-top-color:var(--dsw-alias-brand-primary);border-radius:50%;animation:ps-spin .75s linear infinite;vertical-align:-1px}
.ps-context-bar{display:flex;align-items:center;gap:6px;padding:4px 9px;border-top:.5px solid var(--dsw-alias-border-l1);font:9.5px/1.2 ${MONO};color:var(--dsw-alias-label-secondary);flex:none}
.ps-context-bar-label{white-space:nowrap}
.ps-context-bar-track{flex:1;height:4px;border-radius:2px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
.ps-context-bar-fill{height:100%;border-radius:2px;background:var(--dsw-alias-brand-primary);transition:width .25s ease}
.ps-context-bar-pct{width:30px;text-align:right;white-space:nowrap}
.ps-chat-tokens{flex:none;font:9.5px/1.2 ${MONO};color:var(--dsw-alias-label-secondary)}
.ps-lit-card{border:1.5px solid #1e3a8a;border-radius:7px;padding:6px 8px;background:#ffffff;color:#111827;display:flex;flex-direction:column;gap:3px;min-width:0;overflow-wrap:anywhere}
.ps-lit-title{font-size:12px;font-weight:650;color:#1e3a8a;text-decoration:none}
.ps-lit-meta{font-size:10.5px;color:#374151}
.ps-lit-links{display:flex;align-items:center;gap:8px;font:10px/1.3 ${MONO}}
.ps-lit-links a{color:#1e3a8a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-lit-links .ps-btn{margin-left:auto;height:22px;font-size:10px}
.ps-lit-abstract{font-size:10.5px;color:#374151;white-space:normal;overflow-wrap:anywhere;word-break:break-word}
.ps-lit-abstract[open]{display:block;max-height:none;overflow:visible}
.ps-lit-abstract div{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;max-height:none;overflow:visible}
.ps-lit-nodoi{color:#6b7280;font-style:italic}
.ps-lit-abstract summary{cursor:pointer}
.ps-chat-pins{display:flex;flex-direction:column;gap:3px;max-height:130px;overflow:auto;padding:4px 8px 0;flex:none}
.ps-chat-pin{position:relative;border:.5px solid var(--dsw-alias-brand-primary);border-radius:7px;background:var(--dsw-alias-bg-layer-1);padding:5px 24px 5px 7px}
.ps-chat-pin .ps-btn{position:absolute;right:2px;top:2px}
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
.ps-compile-approval{margin:6px 8px 0;padding:7px 9px;border:1px solid #b45309;border-radius:7px;background:color-mix(in srgb,#f59e0b 10%,transparent)}
.ps-compile-approval-title{font-size:11.5px;font-weight:650}
.ps-compile-approval-reason{font-size:11px;color:var(--dsw-alias-label-secondary);margin:2px 0 6px}
.ps-compile-approval-actions{display:flex;gap:4px;flex-wrap:wrap}
.ps-chat-queue{display:flex;flex-direction:column;gap:3px;padding:4px 8px 0;max-height:120px;overflow:auto}
.ps-chat-queue-item{display:flex;align-items:center;gap:6px;padding:3px 6px;border-radius:5px;background:var(--dsw-alias-bg-layer-1);font-size:11px}
.ps-chat-queue-kind{flex:none;font-size:9px;text-transform:uppercase;letter-spacing:.04em;color:var(--dsw-alias-brand-primary);border:.5px solid currentColor;border-radius:999px;padding:0 4px}
.ps-chat-queue-text{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-chat-resize{height:7px;margin:0 8px;cursor:ns-resize;border-top:1px solid var(--dsw-alias-border-l1);position:relative;flex:0 0 auto}
.ps-chat-resize:hover{border-top-color:var(--dsw-alias-brand-primary)}
.ps-chat-compose{display:flex;gap:4px;padding:6px 8px;border-top:.5px solid var(--dsw-alias-border-l1);align-items:flex-end}
.ps-chat-input{flex:1;min-height:46px;max-height:60vh;resize:none;overflow:auto;font:12px/1.45 inherit;padding:6px 7px;border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
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
.ps-outline{flex:none;overflow:auto;border-top:.5px solid var(--dsw-alias-border-l1);padding:4px 6px;order:3}
.ps-outline-resizer{flex:none;height:6px;cursor:ns-resize;border-top:1px solid var(--dsw-alias-border-l1);order:2;margin:0 4px}
.ps-outline-resizer:hover{border-top-color:var(--dsw-alias-brand-primary)}
.ps-tree{order:1;flex:1}
.ps-outline-head{display:flex;align-items:center;gap:6px}
.ps-outline-head .ps-btn{font-weight:600;padding:2px 4px}
.ps-outline-toggle{display:flex;align-items:center;gap:3px;font-size:10.5px;color:var(--dsw-alias-label-secondary)}
.ps-outline-list{display:flex;flex-direction:column;padding:3px 0 4px}
.ps-outline-item{display:flex;align-items:baseline;gap:6px;width:100%;text-align:left;border:0;background:transparent;color:var(--dsw-alias-label-primary);padding:2px 4px;border-radius:4px;font:11.5px/1.35 inherit;cursor:pointer}
.ps-outline-item:hover{background:var(--dsw-alias-bg-layer-2)}
.ps-outline-kind{flex:none;min-width:28px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:10.5px}
.ps-outline-item.section .ps-outline-kind,.ps-outline-item.chapter .ps-outline-kind{color:var(--dsw-alias-brand-primary);font-weight:600}
.ps-outline-item.chapter .ps-outline-text{font-weight:700}
.ps-outline-item.section .ps-outline-text{font-weight:600}
.ps-outline-item.subsection{padding-left:12px}
.ps-outline-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-tree-menu{position:fixed;z-index:110;min-width:180px;padding:4px;border-radius:8px;background:var(--dsw-alias-bg-overlay);border:.5px solid var(--dsw-alias-border-l2);box-shadow:0 10px 26px rgba(0,0,0,.28)}
.ps-path-bar{flex:none;display:flex;align-items:center;gap:5px;padding:3px 6px;border-bottom:.5px solid var(--dsw-alias-border-l1);font-size:10.5px;color:var(--dsw-alias-label-secondary)}
.ps-path-bar code{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:10.5px/1.4 ${MONO}}
.ps-image-path{display:flex;align-items:center;gap:8px;max-width:100%;font-size:11px}
.ps-image-path code{flex:1;min-width:0;overflow:auto;white-space:nowrap;font:10.5px/1.4 ${MONO}}
.ps-image-view{display:block;max-width:100%;max-height:62vh;margin:10px auto 0;object-fit:contain;border-radius:6px;background:var(--dsw-alias-bg-layer-1)}
.ps-git-review-backdrop{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;padding:4vh 3vw;background:rgba(0,0,0,.42)}
.ps-git-review{width:min(980px,94vw);height:82vh;display:flex;flex-direction:column;overflow:hidden;border-radius:10px;background:var(--dsw-alias-bg-base);border:.5px solid var(--dsw-alias-border-l2);box-shadow:0 24px 70px rgba(0,0,0,.4)}
.ps-git-review-head{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:.5px solid var(--dsw-alias-border-l1);font-weight:600}
.ps-git-review-body{flex:1;min-height:0;overflow:auto;padding:8px 12px 24px}
.ps-git-review-file{margin:8px 0 16px}
.ps-git-review-file-head{position:sticky;top:0;z-index:1;padding:5px 6px;background:var(--dsw-alias-bg-base);font:600 12px/1.3 ${MONO};border-bottom:.5px solid var(--dsw-alias-border-l1)}
.ps-git-review-hunk{border:.5px solid var(--dsw-alias-border-l1);border-radius:6px;margin:6px 0;overflow:hidden}
.ps-git-review-hunk-head{padding:3px 6px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:11px/1.4 ${MONO}}
.ps-git-review .ps-diff-line{font:12px/1.55 ${MONO};padding:1px 6px}
.ps-git-commit-msg{width:100%;box-sizing:border-box;resize:vertical;min-height:54px;font:12px/1.45 inherit;padding:6px 8px;border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
.ps-git-commit-row{display:flex;align-items:center;gap:8px;margin:6px 0}
.ps-git-commit-row .ps-btn{margin-left:auto}
.ps-git-files-head{display:flex;align-items:center;gap:5px;padding:4px 0}
.ps-git-file-row{display:flex;align-items:center;gap:3px;border-radius:5px;padding:1px 2px}
.ps-git-file-row.staged{background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#2ea043) 13%,transparent);box-shadow:inset 2px 0 0 var(--dsw-alias-state-success-primary,#2ea043)}
.ps-git-staged-badge{flex:none;font-size:9px;line-height:1.4;padding:0 5px;border-radius:999px;color:var(--dsw-alias-state-success-primary,#2ea043);border:.5px solid currentColor}
.ps-git-file-row .ps-git-file{flex:1;min-width:0}
.ps-git-file-actions{display:flex;gap:2px}
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
      chat: (extra) => svg([
        h("path", { key: 1, d: "M4 5.5h16v11H9l-5 4z" }),
        h("path", { key: 2, d: "M8 9.5h8M8 13h5" }),
      ], extra),
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
      bgMath: "#f59e0b",
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
      engine: "codemirror",
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
        // The old default equation colour was green; move it to amber.
        if (stored.bgMath === "#10b981") stored.bgMath = "#f59e0b";
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
    const DRAFT_PREFIX = "dsh.paper-studio.draft";
    const CONTEXT_BUDGET_CHARS = 1_000_000;

    function draftKey(projectId, path) {
      return `${DRAFT_PREFIX}:${projectId || ""}:${path || ""}`;
    }
    function readDraft(projectId, path) {
      try {
        const raw = localStorage.getItem(draftKey(projectId, path));
        const value = raw ? JSON.parse(raw) : null;
        return value && typeof value.content === "string" ? value : null;
      } catch {
        return null;
      }
    }
    function writeDraft(projectId, path, content, mtime) {
      try { localStorage.setItem(draftKey(projectId, path), JSON.stringify({ content, at: Date.now(), mtime: mtime ?? null })); } catch { /* storage disabled */ }
    }
    function clearDraft(projectId, path) {
      try { localStorage.removeItem(draftKey(projectId, path)); } catch { /* storage disabled */ }
    }
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
      const mountedAt = useRef(Date.now());
      useEffect(() => {
        const first = bodyRef.current && bodyRef.current.querySelector("input, textarea, select, button");
        if (first && typeof first.focus === "function") first.focus();
      }, []);
      return h("div", {
        className: "ps-backdrop",
        onMouseDown: (event) => {
          if (Date.now() - mountedAt.current < 250) return;
          if (event.target === event.currentTarget) onClose();
        },
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
    const REF_COMMANDS = /^(?:ref|eqref|autoref|cref|Cref|pageref|nameref|labelcref|vref|pref)$/u;

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
    const MATH_COMMANDS = (() => {
      const list = {};
      const add = (names, arity = 0) => { for (const name of names) list[name] = arity; };
      add("alpha beta gamma delta epsilon varepsilon zeta eta theta vartheta iota kappa lambda mu nu xi omicron pi varpi rho varrho sigma varsigma tau upsilon phi varphi chi psi omega Gamma Delta Theta Lambda Xi Pi Sigma Upsilon Phi Psi Omega".split(" "));
      add("simeq approx approxeq neq ne leq geq leqslant geqslant ll gg equiv sim cong propto in notin ni subset subseteq supset supseteq cup cap setminus emptyset varnothing forall exists nexists mid parallel perp".split(" "));
      add("times cdot div pm mp ast star circ bullet oplus ominus otimes oslash odot sum prod coprod int iint iiint oint bigcup bigcap lim inf sup max min det gcd log ln exp sin cos tan cot sec csc arcsin arccos arctan sinh cosh tanh".split(" "));
      add("to rightarrow leftarrow leftrightarrow Rightarrow Leftarrow Leftrightarrow mapsto implies iff uparrow downarrow ldots cdots vdots ddots dots partial nabla infty prime hbar ell Re Im aleph wp angle triangle square blacksquare checkmark therefore because qed langle rangle lceil rceil lfloor rfloor vert Vert".split(" "));
      add(["frac", "dfrac", "tfrac"].flat(), 2);
      add(["sqrt", "mathcal", "mathbf", "mathrm", "mathit", "mathsf", "mathtt", "mathbb", "mathfrak", "text", "operatorname", "overline", "underline", "overbrace", "underbrace"].flat(), 1);
      add(["overset", "underset", "stackrel", "binom"].flat(), 2);
      add("left right big Big bigl bigr".split(" "));
      return list;
    })();

    const PACKAGE_MATH_COMMANDS = {
      amsmath: { dfrac: 2, tfrac: 2, binom: 2, overset: 2, underset: 2, substack: 1, tag: 1, boxed: 1, text: 1, operatorname: 1, DeclareMathOperator: 2, xrightarrow: 1, xleftarrow: 1 },
      amssymb: { mathbb: 1, mathfrak: 1, leqslant: 0, geqslant: 0, nleqslant: 0, ngeqslant: 0, checkmark: 0, therefore: 0, because: 0, varnothing: 0, nexists: 0, blacksquare: 0 },
      physics: { qty: 1, dv: 2, pdv: 2, abs: 1, norm: 1, bra: 1, ket: 1, braket: 1, expval: 1, mel: 2, comm: 2, anticom: 2, grad: 0, div: 0, curl: 0, laplacian: 0, vector: 1, vb: 1, va: 1, tr: 0, Tr: 0, order: 1, matrixel: 3 },
      siunitx: { SI: 2, si: 1, num: 1, unit: 1, ang: 1, qty: 1, complexnum: 1, complexqty: 1 },
      mathtools: { coloneqq: 0, mathclap: 1, mathllap: 1, mathrlap: 1, prescript: 2, DeclarePairedDelimiter: 3 },
      bm: { bm: 1 },
      mhchem: { ce: 1, pu: 1 },
    };

    /** Whether the caret is inside inline or display math. */
    function inMathContext(text, position) {
      const before = String(text || "").slice(0, position);
      let depth = 0;
      for (const match of before.matchAll(/\\(begin|end)\{(equation\*?|align\*?|alignat\*?|gather\*?|multline\*?|eqnarray\*?|displaymath|math|split|cases)\}/gu)) {
        depth += match[1] === "begin" ? 1 : -1;
      }
      if (depth > 0) return true;
      let dollars = 0;
      let paren = 0;
      let bracket = 0;
      for (let index = 0; index < before.length; index += 1) {
        const character = before[index];
        if (character === "\\") {
          const next = before[index + 1];
          if (next === "(") { paren += 1; index += 1; }
          else if (next === ")") { paren = Math.max(0, paren - 1); index += 1; }
          else if (next === "[") { bracket += 1; index += 1; }
          else if (next === "]") { bracket = Math.max(0, bracket - 1); index += 1; }
          else index += 1;
          continue;
        }
        if (character === "$") {
          if (before[index + 1] === "$") { index += 1; }
          dollars = dollars ? 0 : 1;
        }
      }
      return dollars > 0 || paren > 0 || bracket > 0;
    }

    function usepackagePackages(text) {
      const packages = new Set();
      for (const match of String(text || "").matchAll(/\\(?:usepackage|RequirePackage)(?:\[[^\]]*\])?\{([^}]+)\}/gu)) {
        for (const name of match[1].split(",")) if (name.trim()) packages.add(name.trim());
      }
      return [...packages];
    }

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

    function completionItems(kind, query, symbols, options = {}) {
      const needle = String(query).toLowerCase();
      const math = Boolean(options.math);
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
        if (math) {
          for (const [name, arity] of Object.entries(MATH_COMMANDS)) {
            if (seen.has(name)) continue;
            seen.add(name);
            merged.push({ name, arity, builtin: true, math: true });
          }
          const packages = new Set([...(symbols.packages || []), ...(options.packages || [])]);
          for (const packageName of packages) {
            for (const [name, arity] of Object.entries(PACKAGE_MATH_COMMANDS[packageName] || {})) {
              if (seen.has(name)) continue;
              seen.add(name);
              merged.push({ name, arity, builtin: true, math: true, package: packageName });
            }
          }
        }
        for (const name of COMPLETION_COMMANDS) {
          if (seen.has(name)) continue;
          seen.add(name);
          merged.push({ name, arity: 0, builtin: true });
        }
        for (const entry of (symbols.commands || [])) {
          if (seen.has(entry.name)) continue;
          seen.add(entry.name);
          merged.push({ name: entry.name, arity: entry.arity || 0, builtin: false, file: entry.file, math });
        }
        return merged
          .map((entry) => ({ entry, rank: rank(entry.name) }))
          .filter((item) => item.rank >= 0)
          .sort((left, right) => left.rank - right.rank || Number(Boolean(right.entry.math)) - Number(Boolean(left.entry.math)) || left.entry.name.localeCompare(right.entry.name))
          .slice(0, 60)
          .map(({ entry }) => {
            const signature = COMMAND_ARGUMENTS[entry.name] ?? (entry.arity > 0 ? "{}".repeat(entry.arity) : "");
            const inside = signature.startsWith("[") ? signature.indexOf("{") + 1 : 1;
            return {
              label: `\\${entry.name}`,
              insert: entry.name,
              suffix: signature,
              caret: signature ? entry.name.length + inside : entry.name.length,
              detail: entry.math ? (entry.package ? `math · ${entry.package}` : "math command") : (entry.builtin ? "command" : `\\${entry.name} · ${entry.file}`),
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


    const MATH_ENV = /^(?:equation|align)\*?$/u;

    /** The math expression around a caret, for the equation preview. */
    function equationAtCursor(content, lineNumber, column) {
      const text = String(content || "");
      if (!text) return null;
      const lines = text.split("\n");
      const lineIndex = Math.max(0, Math.min(lines.length - 1, (Number(lineNumber) || 1) - 1));
      const lineStart = lines.slice(0, lineIndex).reduce((total, line) => total + line.length + 1, 0);
      const offset = lineStart + Math.max(0, Math.min(lines[lineIndex].length, (Number(column) || 1) - 1));
      const before = text.slice(0, offset);
      let environment = null;
      let beginAt = -1;
      for (const match of before.matchAll(/\\begin\{([^}]+)\}/gu)) {
        if (MATH_ENV.test(match[1])) { environment = match[1]; beginAt = match.index; }
      }
      if (environment && beginAt >= 0) {
        const lastEnd = before.lastIndexOf("\\end{" + environment + "}");
        if (beginAt > lastEnd) {
          const prefix = "\\begin{" + environment + "}";
          const inside = text.slice(beginAt + prefix.length);
          const end = inside.search(new RegExp("\\\\end\\{" + environment.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&") + "\\}"));
          let body = (end >= 0 ? inside.slice(0, end) : inside.split("\n").slice(0, 40).join("\n")).replace(/\\label\{[^}]*\}/gu, "").trim();
          if (!body) return null;
          const startLine = text.slice(0, beginAt).split("\n").length;
          const endLine = startLine + Math.max(1, body.split("\n").length);
          if (/^align\*?$/u.test(environment) && /&/u.test(body)) body = "\\begin{aligned}" + body + "\\end{aligned}";
          return { text: body, display: true, startLine, endLine };
        }
      }
      const line = lines[lineIndex];
      const dollars = [];
      for (let index = 0; index < line.length; index += 1) {
        if (line[index] !== "$") continue;
        if (index > 0 && line[index - 1] === "\\") continue;
        if (line[index + 1] === "$") { dollars.push({ at: index, width: 2 }); index += 1; }
        else dollars.push({ at: index, width: 1 });
      }
      for (let index = 0; index + 1 < dollars.length; index += 1) {
        const open = dollars[index];
        const close = dollars[index + 1];
        if (open.width !== 1 || close.width !== 1) continue;
        const innerStart = lineStart + open.at + 1;
        const innerEnd = lineStart + close.at;
        if (offset < innerStart || offset > innerEnd) continue;
        const raw = line.slice(open.at + 1, close.at);
        if (!raw.trim() || /^\s|\s$/u.test(raw)) continue;
        return { text: raw.trim(), display: false };
      }
      const openParen = before.lastIndexOf("\\(");
      if (openParen >= 0 && openParen > before.lastIndexOf("\\)")) {
        const rest = text.slice(openParen + 2);
        const end = rest.indexOf("\\)");
        const body = (end >= 0 ? rest.slice(0, end) : rest.split("\n").slice(0, 40).join("\n")).trim();
        if (body) return { text: body, display: false };
      }
      return null;
    }

    let codeMirrorPromise = null;

    function loadCodeMirror() {
      if (!codeMirrorPromise) codeMirrorPromise = import(apiUrl("asset", { name: "codemirror.js" })).catch((error) => { console.error("[paper-studio] CodeMirror load failed", error); return null; });
      return codeMirrorPromise;
    }

    function CodeMirrorPane(props) {
      const {
        t, tabs, activePath, tab, cursor, compile, status, onSelectTab, onCloseTab,
        onEdit, onCompile, editorApiRef, syntax, onSave, onToggleWrap, notify, symbols,
        onDiscuss, onAddChatContext, chatEnabled, changes, onKeepChange, onDiscardChange, onCloseReview, misspelled, onRetryChange,
        onScroll, getScroll, onUndo, onRedo, initialCaret, onUpdateChange,
      } = props;
      const theme = syntax || DEFAULT_SYNTAX;
      const hostRef = useRef(null);
      const viewRef = useRef(null);
      const liveRef = useRef({});
      const [module, setModule] = useState(null);
      const [error, setError] = useState("");
      const [cmMenu, setCmMenu] = useState(null);
      const moduleRef = useRef(null);
      const [diffBox, setDiffBox] = useState(null);
      const [mathPreview, setMathPreview] = useState(null);
      const [katex, setKatex] = useState(null);
      const anchorLineRef = useRef(null);
      const tintEffectRef = useRef(null);
      const firstChangeLineRef = useRef(null);
      const lastContentRef = useRef("");
      const suppressEditRef = useRef(false);
      liveRef.current = { ...props, theme };
      const formatSelection = (view, command) => {
        const selection = view.state.selection.main;
        if (selection.empty) {
          const insert = `${command}{}`;
          const caret = selection.from + command.length + 1;
          view.dispatch({ changes: { from: selection.from, insert }, selection: { anchor: caret }, scrollIntoView: true });
        } else {
          const text = view.state.sliceDoc(selection.from, selection.to);
          const insert = `${command}{${text}}`;
          view.dispatch({ changes: { from: selection.from, to: selection.to, insert }, selection: { anchor: selection.from + insert.length }, scrollIntoView: true });
        }
      };

      useEffect(() => {
        if (!tab) { setMathPreview(null); return; }
        const found = equationAtCursor(tab.content, cursor ? cursor.line : 1, cursor ? cursor.col : 1);
        if (!found) { setMathPreview(null); return; }
        const view = viewRef.current;
        if (!view) { setMathPreview(null); return; }
        const lineNumber = Math.max(1, Math.min(view.state.doc.lines, cursor ? cursor.line : 1));
        const anchorStart = Math.max(1, Math.min(view.state.doc.lines, found.display && found.startLine ? found.startLine : lineNumber));
        const anchorEnd = Math.max(anchorStart, Math.min(view.state.doc.lines, found.display && found.endLine ? found.endLine : anchorStart));
        const startLine = view.state.doc.line(anchorStart);
        const endLine = view.state.doc.line(anchorEnd);
        const startCoords = view.coordsAtPos(startLine.from) || view.coordsAtPos(view.state.doc.line(lineNumber).from);
        const endCoords = view.coordsAtPos(endLine.to);
        if (!startCoords) { setMathPreview(null); return; }
        const height = 230;
        let top = startCoords.top - height - 8;
        if (top < 8) top = (endCoords ? endCoords.bottom : startCoords.bottom) + 8;
        if (top + height > (window.innerHeight || 800) - 8) top = Math.max(8, (endCoords ? endCoords.top : startCoords.top) - height - 8);
        setMathPreview({
          text: found.text,
          display: found.display,
          top,
          left: Math.max(8, Math.min(startCoords.left, (window.innerWidth || 1200) - 420)),
        });
        if (!katex) loadKatex().then((loaded) => { if (loaded) setKatex(loaded); });
      }, [tab ? tab.content : "", cursor ? cursor.line : 0, cursor ? cursor.col : 0, katex]);

      useEffect(() => {
        const view = viewRef.current;
        const effect = tintEffectRef.current;
        if (view && effect) view.dispatch({ effects: effect.of(null) });
      }, [changes ? changes.length : 0]);

      useEffect(() => {
        if (changes && changes.length > 0) {
          const first = changes[0];
          let lineNumber = null;
          const view = viewRef.current;
          if (view && first.search !== undefined) {
            const range = findSearchRange(view.state.doc.toString(), first.search);
            if (range) lineNumber = view.state.doc.lineAt(range.from).number;
          }
          if (lineNumber === null) {
            const match = /^@@ -(\d+)/u.exec(first.hunk ? first.hunk.header || "" : "");
            lineNumber = match ? Number(match[1]) : (view ? view.state.doc.lineAt(view.state.selection.main.head).number : 1);
          }
          firstChangeLineRef.current = lineNumber;
        }
        if (!changes || changes.length === 0) { setDiffBox(null); return; }
        setDiffBox((current) => {
          if (current) return current;
          const view = viewRef.current;
          let left = Math.max(10, (window.innerWidth || 1200) - 470);
          let top = 110;
          const change = changes[0];
          const match = change && change.hunk ? /^@@ -(\d+)/u.exec(change.hunk.header || "") : null;
          if (view && match) {
            const line = view.state.doc.line(Math.max(1, Math.min(view.state.doc.lines, Number(match[1]))));
            const coords = view.coordsAtPos(line.from);
            if (coords) {
              left = Math.max(10, Math.min(coords.left, (window.innerWidth || 1200) - 450));
              top = Math.max(10, Math.min(coords.top, (window.innerHeight || 800) - 320));
            }
          }
          return { left, top, width: 430, height: 300 };
        });
      }, [changes ? changes.length : 0]);

      useEffect(() => {
        const view = viewRef.current;
        if (!view || !tab) return;
        if (changes && changes.length === 0 && firstChangeLineRef.current && lastContentRef.current !== tab.content) {
          const line = view.state.doc.line(Math.max(1, Math.min(view.state.doc.lines, firstChangeLineRef.current)));
          const EditorViewClass = moduleRef.current ? moduleRef.current.EditorView : null;
          requestAnimationFrame(() => { if (EditorViewClass) view.dispatch({ effects: EditorViewClass.scrollIntoView(line.from, { y: "center" }) }); });
        }
      }, [changes ? changes.length : 0]);

      useEffect(() => {
        if (!cmMenu) return undefined;
        const close = () => setCmMenu(null);
        window.addEventListener("pointerdown", close);
        return () => window.removeEventListener("pointerdown", close);
      }, [cmMenu]);

      useEffect(() => {
        let alive = true;
        loadCodeMirror().then((loaded) => {
          if (!alive) return;
          if (!loaded) setError("Could not load the CodeMirror bundle.");
          else setModule(loaded);
        });
        return () => { alive = false; };
      }, []);

      useEffect(() => {
        if (!module || !hostRef.current || !tab) return undefined;
        const {
          EditorState, EditorView, lineNumbers, highlightActiveLine, highlightActiveLineGutter,
          drawSelection, dropCursor, history, keymap, defaultKeymap, historyKeymap, indentWithTab,
          syntaxHighlighting, defaultHighlightStyle, StreamLanguage, stex, vim, Vim,
          Decoration, ViewPlugin, RangeSetBuilder, StateEffect, HighlightStyle, tags, Compartment,
          bracketMatching, autocompletion, completionKeymap, closeBrackets, gutter, GutterMarker,
        } = module;
        let cursorTimer = 0;
        let pendingCursor = null;
        const completionSource = (context) => {
          const position = context.pos;
          const text = context.state.doc.toString();
          const pluginContext = completionContext(text, position);
          if (!pluginContext) return null;
          const live = liveRef.current;
          const items = completionItems(pluginContext.kind, pluginContext.query, live.symbols || {}, {
            math: pluginContext.kind === "command" && inMathContext(text, position),
            packages: usepackagePackages(text),
          });
          if (!items.length) return null;
          const braces = ["citation", "label", "package", "image", "file", "bibfile"].includes(pluginContext.kind);
          return {
            from: pluginContext.start,
            to: pluginContext.end,
            options: items.map((item) => ({
              label: pluginContext.kind === "command" ? item.insert : item.label,
              detail: item.detail,
              apply: (view, completion, from, to) => {
                let insert = item.insert;
                let caret = from + insert.length;
                if (item.template && item.template.text) {
                  insert = item.template.text;
                  caret = from + item.template.caret;
                } else if (item.suffix && view.state.sliceDoc(to, to + 1) !== "{") {
                  insert += item.suffix;
                  caret = from + (item.caret ?? insert.length);
                } else if (braces && view.state.sliceDoc(to, to + 1) !== "}") {
                  insert += "}";
                  caret += 1;
                }
                view.dispatch({ changes: { from, to, insert }, selection: { anchor: caret } });
              },
            })),
          };
        };
        const latexHighlight = HighlightStyle.define([
          // Legacy stex mode emits "tag" for commands, which maps to tagName.
          { tag: tags.tagName, color: "var(--ps-hl-command, #8b5cf6)" },
          { tag: tags.keyword, color: "var(--ps-hl-math, #059669)" },
          { tag: tags.controlKeyword, color: "var(--ps-hl-command, #8b5cf6)" },
          { tag: tags.atom, color: "var(--ps-hl-env, #d97706)" },
          { tag: tags.variableName, color: "var(--ps-hl-command, #8b5cf6)" },
          { tag: tags.comment, color: "var(--ps-hl-comment, #94a3b8)", fontStyle: "italic" },
          { tag: tags.bracket, color: "var(--ps-hl-brace, #94a3b8)" },
          { tag: tags.number, color: "var(--ps-hl-math, #059669)" },
          { tag: tags.string, color: "var(--ps-hl-math, #059669)" },
          { tag: tags.operator, color: "var(--ps-hl-brace, #94a3b8)" },
          { tag: tags.meta, color: "var(--ps-hl-env, #d97706)" },
          { tag: tags.processingInstruction, color: "var(--ps-hl-command, #8b5cf6)" },
          { tag: tags.invalid, color: "var(--dsw-alias-state-error-primary, #e5484d)" },
        ]);
        const diffPlugin = ViewPlugin.fromClass(class {
          constructor(view) { this.decorations = buildDiff(view); }
          update(update) {
            if (update.docChanged || update.viewportChanged) this.decorations = buildDiff(update.view);
          }
        }, { decorations: (value) => value.decorations });
        const buildDiff = (view) => {
          const live = liveRef.current;
          const base = live.tab && (live.tab.base !== undefined && live.tab.base !== null ? live.tab.base : live.tab.saved);
          const builder = new RangeSetBuilder();
          if (base === undefined || base === null) return builder.finish();
          const kinds = diffLineKinds(base, view.state.doc.toString());
          for (const range of view.visibleRanges) {
            let position = range.from;
            while (position <= range.to) {
              const line = view.state.doc.lineAt(position);
              const kind = kinds.get(line.number - 1);
              if (kind) builder.add(line.from, line.from, Decoration.line({ class: `cm-diff-${kind}` }));
              if (line.to >= view.state.doc.length) break;
              position = line.to + 1;
            }
          }
          return builder.finish();
        };
        const bandCategory = (environment) => {
          if (/^figure\*?$/u.test(environment)) return "figure";
          if (/^(?:equation|align|alignat|gather|multline|eqnarray|displaymath|math|split|cases)\*?$/u.test(environment)) return "math";
          return null;
        };
        const buildBands = (view) => {
          const builder = new RangeSetBuilder();
          if (!liveRef.current.theme.backgrounds) return builder.finish();
          const document = view.state.doc;
          const stack = [];
          const topCategory = () => {
            for (let index = stack.length - 1; index >= 0; index -= 1) {
              const category = bandCategory(stack[index]);
              if (category) return category;
            }
            return null;
          };
          for (let number = 1; number <= document.lines; number += 1) {
            const line = document.line(number);
            const before = topCategory();
            for (const match of line.text.matchAll(/\\(begin|end)\{([^}]+)\}/gu)) {
              if (match[1] === "begin") stack.push(match[2]);
              else {
                const at = stack.lastIndexOf(match[2]);
                if (at !== -1) stack.length = at;
              }
            }
            const after = topCategory();
            const category = before || after;
            if (category) builder.add(line.from, line.from, Decoration.line({ class: `cm-band-${category}` }));
          }
          return builder.finish();
        };
        const bandPlugin = ViewPlugin.fromClass(class {
          constructor(view) { this.decorations = buildBands(view); }
          update(update) { if (update.docChanged) this.decorations = buildBands(update.view); }
        }, { decorations: (value) => value.decorations });
        const buildSpell = (view) => {
          const words = liveRef.current.misspelled;
          const builder = new RangeSetBuilder();
          if (!words || words.size === 0) return builder.finish();
          for (const range of view.visibleRanges) {
            let position = range.from;
            while (position <= range.to) {
              const line = view.state.doc.lineAt(position);
              for (const match of line.text.matchAll(/[\p{L}][\p{L}'\u2019-]*/gu)) {
                if (!words.has(match[0].toLowerCase())) continue;
                builder.add(line.from + match.index, line.from + match.index + match[0].length, Decoration.mark({ class: "cm-misspell" }));
              }
              if (line.to >= view.state.doc.length) break;
              position = line.to + 1;
            }
          }
          return builder.finish();
        };
        const spellPlugin = ViewPlugin.fromClass(class {
          constructor(view) { this.decorations = buildSpell(view); }
          update(update) { if (update.docChanged || update.viewportChanged) this.decorations = buildSpell(update.view); }
        }, { decorations: (value) => value.decorations });
        const normalArrows = EditorView.domEventHandlers({
          keydown: (event, view) => {
            const modifier = event.metaKey || event.ctrlKey;
            if (modifier && !event.altKey && !event.shiftKey && ["i", "I", "b", "B"].includes(event.key) && !view.dom.querySelector(".cm-fat-cursor")) {
              event.preventDefault();
              formatSelection(view, event.key.toLowerCase() === "b" ? "\\textbf" : "\\textit");
              return true;
            }
            if (modifier && !event.altKey && ["z", "Z", "y", "Y"].includes(event.key)) {
              event.preventDefault();
              const live = liveRef.current;
              const redo = event.key.toLowerCase() === "y" || event.shiftKey;
              if (redo) { if (live.onRedo && live.tab) live.onRedo(live.tab.path); }
              else if (live.onUndo && live.tab) live.onUndo(live.tab.path);
              return true;
            }
            if (!modifier && !event.altKey && view.dom.querySelector(".cm-fat-cursor") && (event.key === "u" || event.key === "r")) {
              event.preventDefault();
              const live = liveRef.current;
              if (event.key === "r") { if (live.onRedo && live.tab) live.onRedo(live.tab.path); }
              else if (live.onUndo && live.tab) live.onUndo(live.tab.path);
              return true;
            }
            if (modifier || event.altKey) return false;
            if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return false;
            if (!view.dom.querySelector(".cm-fat-cursor")) return false;
            event.preventDefault();
            if (hostRef.current) hostRef.current.__cmDirectArrows = (hostRef.current.__cmDirectArrows || 0) + 1;
            const selection = view.state.selection.main;
            const line = view.state.doc.lineAt(selection.head);
            let target = selection.head;
            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
              const targetNumber = Math.max(1, Math.min(view.state.doc.lines, line.number + (event.key === "ArrowUp" ? -1 : 1)));
              const targetLine = view.state.doc.line(targetNumber);
              target = targetLine.from + Math.min(selection.head - line.from, targetLine.length);
            } else {
              target = Math.max(0, Math.min(view.state.doc.length, selection.head + (event.key === "ArrowLeft" ? -1 : 1)));
            }
            view.dispatch({
              selection: { anchor: selection.empty ? target : selection.anchor, head: target },
              effects: EditorView.scrollIntoView(target, { y: "nearest" }),
            });
            return true;
          },
        });
        const buildListEnv = (view) => {
          const builder = new RangeSetBuilder();
          for (const range of view.visibleRanges) {
            let position = range.from;
            while (position <= range.to) {
              const line = view.state.doc.lineAt(position);
              for (const match of line.text.matchAll(/\\(?:begin|end)\{((?:itemize|enumerate))\}/gu)) {
                const start = line.from + match.index + match[0].indexOf("{") + 1;
                builder.add(start, start + match[1].length, Decoration.mark({ class: "cm-list-env" }));
              }
              if (line.to >= view.state.doc.length) break;
              position = line.to + 1;
            }
          }
          return builder.finish();
        };
        const buildItemText = (view) => {
          const builder = new RangeSetBuilder();
          let inList = false;
          for (const range of view.visibleRanges) {
            let position = range.from;
            while (position <= range.to) {
              const line = view.state.doc.lineAt(position);
              if (/\\begin\{(?:itemize|enumerate)\}/u.test(line.text)) inList = true;
              if (inList) {
                const item = /\\item\b/u.exec(line.text);
                let start = item ? item.index + item[0].length : 0;
                const optional = /^\s*\[[^\]]*\]/u.exec(line.text.slice(start));
                if (optional) start += optional[0].length;
                const specials = [...line.text.matchAll(/\\(?:[A-Za-z@]+\*?|.)|(?:\$\$?[\s\S]*?\$\$?|\\\([\s\S]*?\\\))/gu)];
                let cursor = start;
                for (const match of specials) {
                  if (match.index > cursor) builder.add(line.from + cursor, line.from + match.index, Decoration.mark({ class: "cm-item-text" }));
                  cursor = match.index + match[0].length;
                }
                if (cursor < line.text.length) builder.add(line.from + cursor, line.from + line.text.length, Decoration.mark({ class: "cm-item-text" }));
              }
              if (/\\end\{(?:itemize|enumerate)\}/u.test(line.text)) inList = false;
              if (line.to >= view.state.doc.length) break;
              position = line.to + 1;
            }
          }
          return builder.finish();
        };
        const itemTextPlugin = ViewPlugin.fromClass(class {
          constructor(view) { this.decorations = buildItemText(view); }
          update(update) { if (update.docChanged || update.viewportChanged) this.decorations = buildItemText(update.view); }
        }, { decorations: (value) => value.decorations });

        const listEnvPlugin = ViewPlugin.fromClass(class {
          constructor(view) { this.decorations = buildListEnv(view); }
          update(update) { if (update.docChanged || update.viewportChanged) this.decorations = buildListEnv(update.view); }
        }, { decorations: (value) => value.decorations });

        const tintEffect = StateEffect.define();
        tintEffectRef.current = tintEffect;
        const buildTint = (view) => {
          const builder = new RangeSetBuilder();
          for (const change of liveRef.current.changes || []) {
            if (change.search !== undefined) {
              const range = findSearchRange(view.state.doc.toString(), change.search);
              if (!range) continue;
              const first = view.state.doc.lineAt(range.from).number;
              const last = view.state.doc.lineAt(range.to).number;
              for (let number = first; number <= last; number += 1) {
                const line = view.state.doc.line(number);
                builder.add(line.from, line.from, Decoration.line({ class: "cm-review-target" }));
              }
              continue;
            }
            const match = change.hunk ? /^@@ -(\d+)(?:,(\d+))?/u.exec(change.hunk.header || "") : null;
            if (!match) continue;
            const from = Math.max(1, Number(match[1]));
            const count = match[2] === undefined ? 1 : Number(match[2]);
            for (let offset = 0; offset < Math.max(1, count); offset += 1) {
              const number = from + offset;
              if (number > view.state.doc.lines) break;
              const line = view.state.doc.line(number);
              builder.add(line.from, line.from, Decoration.line({ class: "cm-review-target" }));
            }
          }
          return builder.finish();
        };
        const tintPlugin = ViewPlugin.fromClass(class {
          constructor(view) { this.decorations = buildTint(view); }
          update(update) {
            if (update.docChanged || update.viewportChanged || update.transactions.some((tr) => tr.effects.some((effect) => effect.is(tintEffect)))) {
              this.decorations = buildTint(update.view);
            }
          }
        }, { decorations: (value) => value.decorations });
        class DiffArrowMarker extends GutterMarker {
          toDOM() {
            const arrow = document.createElement("span");
            arrow.className = "cm-diff-arrow";
            arrow.textContent = "▶";
            return arrow;
          }
        }
        const diffArrowMarker = new DiffArrowMarker();
        let diffArrowDoc = null;
        let diffArrowBase;
        let diffArrowKinds = null;
        const diffArrowGutter = gutter({
          class: "cm-diff-arrow-gutter",
          lineMarker(view, line) {
            const base = liveRef.current.tab && (liveRef.current.tab.base !== undefined && liveRef.current.tab.base !== null ? liveRef.current.tab.base : liveRef.current.tab.saved);
            if (base === undefined || base === null) return null;
            if (diffArrowDoc !== view.state.doc || diffArrowBase !== base) {
              diffArrowDoc = view.state.doc;
              diffArrowBase = base;
              diffArrowKinds = diffLineKinds(base, view.state.doc.toString());
            }
            const number = view.state.doc.lineAt(line.from).number;
            const kind = diffArrowKinds && diffArrowKinds.get(number - 1);
            return kind === "del" ? new DiffArrowMarker() : null;
          },
        });
        const extensions = [diffArrowGutter, normalArrows];
        if (theme.vim) extensions.push(vim());
        extensions.push(
          lineNumbers(),
          drawSelection(),
          dropCursor(),
          history(),
          bracketMatching(),
          EditorView.domEventHandlers({
            contextmenu: (event, view) => {
              event.preventDefault();
              const selection = view.state.selection.main;
              const text = view.state.sliceDoc(selection.from, selection.to) || view.state.doc.lineAt(selection.from).text;
              if (!text.trim()) return true;
              setCmMenu({
                x: event.clientX, y: event.clientY, text, view,
                startLine: view.state.doc.lineAt(selection.from).number,
                endLine: view.state.doc.lineAt(selection.to).number,
              });
              return true;
            },
          }),
          syntaxHighlighting(latexHighlight),
          listEnvPlugin,
          itemTextPlugin,
          EditorState.tabSize.of(2),
          keymap.of([
            { key: "Mod-s", preventDefault: true, run: () => { const live = liveRef.current; if (live.onSave && live.tab) live.onSave(live.tab.path); return true; } },
            { key: "Mod-Enter", preventDefault: true, run: () => { const live = liveRef.current; if (live.onCompile) live.onCompile(); return true; } },
            ...defaultKeymap,
            ...historyKeymap,
            ...completionKeymap,
            indentWithTab,
          ]),
          StreamLanguage.define(stex),
          EditorView.updateListener.of((update) => {
            const live = liveRef.current;
            if (!live.tab) return;
            if (update.docChanged && !suppressEditRef.current) live.onEdit(live.tab.path, update.state.doc.toString(), update.state.selection.main.head);
            if (update.viewportChanged && live.onScroll) {
              live.onScroll({ currentTarget: { scrollTop: update.view.scrollDOM.scrollTop } });
            }
            if (update.selectionSet || update.docChanged) {
              const head = update.state.selection.main.head;
              pendingCursor = {
                path: live.tab.path,
                selectionStart: head,
                selectionEnd: update.state.selection.main.to,
                value: update.state.doc.toString(),
                focus: () => update.view.focus(),
              };
              if (!cursorTimer) {
                cursorTimer = setTimeout(() => {
                  cursorTimer = 0;
                  const current = liveRef.current;
                  if (pendingCursor && current.onCursor) current.onCursor({ currentTarget: pendingCursor });
                  pendingCursor = null;
                }, 90);
              }
            }
          }),
          EditorView.theme({
            "&": { height: "100%", fontSize: "13px", backgroundColor: "transparent", color: "var(--dsw-alias-label-primary)" },
            ".cm-scroller": { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", lineHeight: "20px", overflow: "auto" },
            ".cm-content": { caretColor: "var(--dsw-alias-label-primary)", padding: "8px 0" },
            ".cm-line": { padding: "0 18px 0 6px" },
            ".cm-gutters": { backgroundColor: "transparent", color: "var(--dsw-alias-label-secondary)", borderRight: "0.5px solid var(--dsw-alias-border-l1)" },
            ".cm-activeLine": { backgroundColor: "color-mix(in srgb, var(--dsw-alias-brand-primary) 7%, transparent)" },
            ".cm-activeLineGutter": { backgroundColor: "color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, transparent)" },
          }),
        );
        if (theme.currentLine) extensions.push(highlightActiveLineGutter(), highlightActiveLine());
        if (theme.wrap) extensions.push(EditorView.lineWrapping);
        const heavyCompartment = new Compartment();
        extensions.push(heavyCompartment.of([]));
        const heavy = [
          bandPlugin,
          tintPlugin,
          spellPlugin,
          autocompletion({ override: [completionSource], activateOnTyping: true, closeOnBlur: true }),
        ];
        if (theme.diffGutter !== "off") heavy.push(diffPlugin);
        moduleRef.current = module;
        const view = new EditorView({
          state: EditorState.create({ doc: tab.content, extensions }),
          parent: hostRef.current,
        });
        viewRef.current = view;
        hostRef.current.__cmView = view;
        hostRef.current.__cmVim = typeof vim;
        const lineBlock = (lineNumber) => {
          const number = Math.max(1, Math.min(view.state.doc.lines, Number(lineNumber) || 1));
          return view.state.doc.line(number);
        };
        editorApiRef.current = {
          __cm: view,
          revealLine: (lineNumber) => {
            const line = lineBlock(lineNumber);
            view.dispatch({ selection: { anchor: line.from }, effects: EditorView.scrollIntoView(line.from, { y: "center" }) });
            view.focus();
            return true;
          },
          scrollToLine: (lineNumber) => {
            const line = lineBlock(lineNumber);
            view.dispatch({ effects: EditorView.scrollIntoView(line.from, { y: "center" }) });
            return true;
          },
          revealLineTop: (lineNumber) => {
            const line = lineBlock(lineNumber);
            view.dispatch({ effects: EditorView.scrollIntoView(line.from, { y: "start" }) });
            return true;
          },
          firstVisibleLine: () => {
            const block = view.lineBlockAtHeight(view.scrollDOM.scrollTop);
            return view.state.doc.lineAt(block.from).number;
          },
          selection: () => ({ start: view.state.selection.main.from, end: view.state.selection.main.to }),
          selectRange: (start, end) => {
            const length = view.state.doc.length;
            const from = Math.max(0, Math.min(length, start));
            const to = Math.max(from, Math.min(length, end));
            view.dispatch({ selection: { anchor: from, head: to } });
            view.focus();
          },
          selectRangeSilent: (start, end) => {
            const length = view.state.doc.length;
            const from = Math.max(0, Math.min(length, start));
            const to = Math.max(from, Math.min(length, end));
            view.dispatch({ selection: { anchor: from, head: to } });
          },
          focus: () => view.focus(),
        };
        const initial = Math.max(0, Math.min(view.state.doc.length, Number(initialCaret) || 0));
        if (initial > 0) {
          view.dispatch({ selection: { anchor: initial }, effects: EditorView.scrollIntoView(initial, { y: "center" }) });
        }
        view.focus();
        if (theme.vim && Vim && Vim.defineEx) {
          try {
            const save = () => { const live = liveRef.current; if (live.onSave && live.tab) live.onSave(live.tab.path); };
            Vim.defineEx("write", "w", save);
            Vim.defineEx("wq", "wq", save);
          } catch { /* Vim API differences */ }
        }
        const schedule = window.requestIdleCallback || ((callback) => setTimeout(callback, 40));
        const idleId = schedule(() => {
          if (viewRef.current === view) view.dispatch({ effects: heavyCompartment.reconfigure(heavy) });
        });
        const savedScroll = getScroll ? getScroll(tab.path) : 0;
        if (savedScroll) {
          requestAnimationFrame(() => { if (viewRef.current === view) view.scrollDOM.scrollTop = savedScroll; });
        }
        return () => {
          if (cursorTimer) clearTimeout(cursorTimer);
          if (window.cancelIdleCallback && typeof idleId === "number") window.cancelIdleCallback(idleId);
          if (editorApiRef.current && editorApiRef.current.__cm === view) editorApiRef.current = null;
          view.destroy();
          viewRef.current = null;
        };
      }, [module, tab ? tab.path : "", theme.vim, theme.wrap, theme.currentLine, theme.backgrounds, theme.diffGutter, editorApiRef]);

      useEffect(() => {
        const view = viewRef.current;
        if (!view || !tab) return;
        const current = view.state.doc.toString();
        if (current === tab.content) return;
        const block = view.lineBlockAtHeight(view.scrollDOM.scrollTop);
        const topLine = view.state.doc.lineAt(block.from).number;
        const anchor = anchorLineRef.current;
        suppressEditRef.current = true;
        view.dispatch({ changes: { from: 0, to: current.length, insert: tab.content } });
        suppressEditRef.current = false;
        const lineNumber = Math.max(1, Math.min(view.state.doc.lines, anchor || topLine));
        const line = view.state.doc.line(lineNumber);
        const EditorViewClass = moduleRef.current ? moduleRef.current.EditorView : null;
        if (EditorViewClass) view.dispatch({ effects: EditorViewClass.scrollIntoView(line.from, { y: anchor ? "center" : "start" }) });
        anchorLineRef.current = null;
        lastContentRef.current = tab.content;
      }, [tab ? tab.content : ""]);

      const lineCount = tab ? tab.content.split("\n").length : 0;
      const tabBar = h("div", { className: "ps-tabs", role: "tablist" }, tabs.map((item) => h("div", {
        key: item.path, role: "tab", title: item.path,
        className: `ps-tab${activePath === item.path ? " active" : ""}`,
        "aria-selected": activePath === item.path,
        onClick: () => onSelectTab(item.path),
      },
      h("span", { className: "ps-tab-name" }, item.path.split("/").pop()),
      item.dirty ? h("span", { className: "ps-dirty" }) : null,
      h("button", {
        className: "ps-tab-close", type: "button", "aria-label": "close",
        onClick: (event) => { event.stopPropagation(); onCloseTab(item.path); },
      }, h(Icon.close)))), h("div", { className: "ps-spacer" }));

      return h("section", { className: "ps-pane ps-editor", "aria-label": "editor", style: syntaxVariables(theme) },
        tabBar,
        h("div", { className: "ps-code-wrap" },
          h("div", { className: "ps-cm-wrap", ref: hostRef }),
          !module && !error ? h("div", { className: "ps-cm-status" }, "Loading CodeMirror…") : null,
          error ? h("div", { className: "ps-cm-status error" }, error) : null),
        mathPreview && katex && katex.katex ? h("div", {
          className: "ps-math-preview",
          style: { left: `${mathPreview.left}px`, top: `${mathPreview.top}px` },
        }, h("div", {
          className: "ps-math-preview-body",
          dangerouslySetInnerHTML: { __html: katex.katex.renderToString(mathPreview.text, { displayMode: mathPreview.display, throwOnError: false, output: "mathml" }) },
        })) : null,
        h("div", { className: "ps-code-foot" },
          h("span", { className: "ps-grow", title: tab ? tab.path : "" }, tab ? tab.path : t("noTab")),
          h("button", { className: "ps-btn", type: "button", onClick: onToggleWrap, title: t("wrapLines"), "aria-pressed": theme.wrap }, theme.wrap ? t("wrapShort") : t("wrapLinesShort")),
          h("span", { className: "ps-build-tag", title: `client ${CLIENT_BUILD}` }, `b${CLIENT_BUILD.slice(11, 16)}`),
          theme.vim ? h("span", { className: "ps-vim" }, "CM Vim") : null,
          h("span", null, `${cursor.line}:${cursor.col}`),
          h("span", null, `${lineCount} ${t("linesShort")}`),
          h("button", { className: "ps-btn icon", type: "button", title: t("save"), "aria-label": t("save"), onClick: () => { if (tab) onSave(tab.path); } }, h(Icon.save)),
          h("span", { className: "ps-status" }, status && status.kind === "saved" ? t("saved") : "")),
        cmMenu ? h("div", {
          className: "ps-cm-menu",
          style: {
            left: Math.max(6, Math.min(cmMenu.x, (window.innerWidth || 1200) - 230)),
            top: Math.max(6, Math.min(cmMenu.y, (window.innerHeight || 800) - 120)),
          },
          onPointerDown: (event) => event.stopPropagation(),
        },
        cmMenu.text.trim() ? h("button", {
          className: "ps-ctx-item", type: "button",
          onClick: () => { formatSelection(cmMenu.view, "\\textbf"); setCmMenu(null); },
        }, "Bold") : null,
        cmMenu.text.trim() ? h("button", {
          className: "ps-ctx-item", type: "button",
          onClick: () => { formatSelection(cmMenu.view, "\\textit"); setCmMenu(null); },
        }, "Italic") : null,
        cmMenu.text.trim() ? h("div", { className: "ps-ctx-sep" }) : null,
        h("button", {
          className: "ps-ctx-item", type: "button",
          onClick: () => { cmMenu.view.focus(); void navigator.clipboard.writeText(cmMenu.text); setCmMenu(null); },
        }, "Copy"),
        h("button", {
          className: "ps-ctx-item", type: "button",
          onClick: () => {
            void navigator.clipboard.writeText(cmMenu.text);
            const view = cmMenu.view;
            const selection = view.state.selection.main;
            if (!selection.empty) view.dispatch({ changes: { from: selection.from, to: selection.to } });
            setCmMenu(null);
          },
        }, "Cut"),
        h("button", {
          className: "ps-ctx-item", type: "button",
          onClick: () => {
            const view = cmMenu.view;
            void navigator.clipboard.readText().then((text) => { view.dispatch(view.replaceSelection(text)); view.focus(); });
            setCmMenu(null);
          },
        }, "Paste"),
        h("div", { className: "ps-ctx-sep" }),
        h("button", {
          className: "ps-ctx-item", type: "button",
          onClick: () => {
            const menu = cmMenu;
            setCmMenu(null);
            if (onDiscuss && tab) {
              requestAnimationFrame(() => onDiscuss({ text: menu.text, file: tab.path, startLine: menu.startLine, endLine: menu.endLine }));
            }
          },
        }, "Discuss with agent…"),
        chatEnabled ? h("button", {
          className: "ps-ctx-item", type: "button",
          onClick: () => {
            const menu = cmMenu;
            setCmMenu(null);
            if (onAddChatContext && tab) {
              requestAnimationFrame(() => onAddChatContext({ text: menu.text, file: tab.path, startLine: menu.startLine, endLine: menu.endLine }));
            }
          },
        }, "Pin to current chat") : null) : null,
        changes && changes.length > 0 && diffBox ? h("div", {
          className: "ps-diff-pop",
          style: {
            position: "fixed", left: `${diffBox.left}px`, top: `${diffBox.top}px`,
            width: `${diffBox.width}px`, height: `${diffBox.height}px`, fontSize: "12px",
          },
        },
        h("div", {
          className: "ps-diff-pop-head",
          onPointerDown: (event) => {
            if (event.target.closest("button")) return;
            event.preventDefault();
            const startX = event.clientX;
            const startY = event.clientY;
            const origin = { ...diffBox };
            const move = (moveEvent) => setDiffBox({
              ...origin,
              left: Math.max(0, origin.left + moveEvent.clientX - startX),
              top: Math.max(0, origin.top + moveEvent.clientY - startY),
            });
            const stop = () => {
              window.removeEventListener("pointermove", move);
              window.removeEventListener("pointerup", stop);
            };
            window.addEventListener("pointermove", move);
            window.addEventListener("pointerup", stop);
          },
        },
        h("span", null, `${changes.length} suggested change${changes.length === 1 ? "" : "s"}`),
        h("span", { className: "ps-grow" }),
        h("button", {
          className: "ps-btn", type: "button", title: "Re-read and adapt this diff to the current file",
          onClick: () => { if (onRetryChange) onRetryChange(changes[0]); },
        }, "Retry"),
        h("button", {
          className: "ps-btn icon", type: "button", title: t("close"),
          onClick: () => { if (onCloseReview) onCloseReview(); },
        }, h(Icon.close))),
        h("div", { className: "ps-diff-body" },
          changes.map((change) => {
            const targetTab = change.file ? (tabs || []).find((item) => item.path === change.file) : tab;
            const stale = Boolean(targetTab && (change.search !== undefined
              ? findSearchRange(targetTab.content, change.search) === null
              : applySuggestion(targetTab.content, { hunks: [change.hunk] }) === null));
            return h("div", { className: "ps-cm-diff-change", key: change.id },
              h("div", { className: "ps-diff-file" }, change.file || ""),
              stale ? h("div", { className: "ps-cm-stale" }, "Diff no longer matches this file — use Repropose.") : null,
              h("pre", { className: "ps-diff-lines" },
                (() => {
                  const entries = pairHunkLines((change.hunk ? change.hunk.lines : []).slice(0, 80));
                  const row = (line, segments, key) => h("div", {
                    key,
                    className: `ps-diff-line ${line.type === "+" ? "add" : line.type === "-" ? "del" : "ctx"}`,
                  }, segments
                    ? segments.map((segment, index) => segment.changed
                      ? h("span", { key: index, className: `ps-diff-word-${line.type === "+" ? "add" : "del"}` }, segment.text)
                      : segment.text)
                    : (line.text || " "));
                  const output = [];
                  entries.forEach((entry, index) => {
                    if (entry.kind === "pair") {
                      const diff = inlineWordDiff(entry.oldLine.text, entry.newLine.text);
                      output.push(row(entry.oldLine, diff.old, `o${index}`));
                      output.push(row(entry.newLine, diff.new, `n${index}`));
                    } else {
                      output.push(row(entry.line, null, `l${index}`));
                    }
                  });
                  return output;
                })()),
              (() => {
                const added = change.hunk ? change.hunk.lines.filter((line) => line.type === "+").map((line) => line.text) : [];
                if (added.length === 0) return null;
                return h("textarea", {
                  className: "ps-diff-edit-add", value: added.join("\n"), spellCheck: false,
                  placeholder: "Edit the added lines…",
                  onChange: (event) => {
                    const nextLines = event.target.value.split("\n");
                    if (change.search !== undefined) {
                      onUpdateChange(change.id, { replace: event.target.value, hunk: searchHunk(change.search, event.target.value) });
                    } else {
                      const lines = [];
                      let used = 0;
                      for (const line of change.hunk.lines) {
                        if (line.type !== "+") { lines.push(line); continue; }
                        if (used < nextLines.length) lines.push({ ...line, text: nextLines[used++] });
                      }
                      while (used < nextLines.length) lines.push({ type: "+", text: nextLines[used++] });
                      onUpdateChange(change.id, { hunk: { ...change.hunk, lines } });
                    }
                  },
                });
              })(),
              h("div", { className: "ps-cm-diff-actions" },
                h("button", {
                  className: "ps-btn primary", type: "button", disabled: stale,
                  onClick: () => {
                    const view = viewRef.current;
                    let lineNumber = null;
                    if (view && change.search !== undefined) {
                      const range = findSearchRange(view.state.doc.toString(), change.search);
                      if (range) lineNumber = view.state.doc.lineAt(range.from).number;
                    }
                    if (lineNumber === null) {
                      const match = /^@@ -(\d+)/u.exec(change.hunk ? change.hunk.header || "" : "");
                      lineNumber = match ? Number(match[1]) : (view ? view.state.doc.lineAt(view.state.selection.main.head).number : 1);
                    }
                    anchorLineRef.current = lineNumber;
                    onKeepChange(change);
                  },
                }, t("keep")),
                h("button", { className: "ps-btn", type: "button", onClick: () => onDiscardChange(change.id) }, t("discard"))));
          })),
        h("div", {
          className: "ps-diff-resize",
          onPointerDown: (event) => {
            event.preventDefault();
            event.stopPropagation();
            const startX = event.clientX;
            const startY = event.clientY;
            const origin = { ...diffBox };
            const move = (moveEvent) => setDiffBox({
              ...origin,
              width: Math.max(280, Math.min(900, origin.width + moveEvent.clientX - startX)),
              height: Math.max(140, Math.min(700, origin.height + moveEvent.clientY - startY)),
            });
            const stop = () => {
              window.removeEventListener("pointermove", move);
              window.removeEventListener("pointerup", stop);
            };
            window.addEventListener("pointermove", move);
            window.addEventListener("pointerup", stop);
          },
        })) : null);
    }

    function normalizeSymbols(data) {
      return {
        labels: data.labels || [],
        citations: data.citations || [],
        files: data.files || [],
        commands: data.commands || [],
        environments: data.environments || [],
        packages: data.packages || [],
      };
    }

    function EditorPane(props) {
      return h(CodeMirrorPane, props);
    }

    function Dock(props) {
      const {
        t, tab, onTab, onClose, compile, terminal, stage, elapsed, compiling,
        onClear, height, onResize, onOpenProblem, gitLog, onClearGit,
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
      const gitLines = useMemo(() => (gitLog || []).slice(-2000), [gitLog]);
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
          h("button", { className: `ps-drawer-tab${tab === "git" ? " active" : ""}`, type: "button", onClick: () => onTab("git") }, t("gitTab")),
          h("div", { className: "ps-spacer" }),
          compiling ? h("span", { className: "ps-stage" }, `${stage || t("compiling")}${elapsed ? ` · ${elapsed}s` : ""}`) : null,
          !compiling && compile ? h("span", { className: "ps-status", style: { fontSize: 11 } }, compile.cached ? t("upToDate") : formatDuration(compile.durationMs)) : null,
          tab === "terminal" ? h("button", { className: "ps-btn", type: "button", onClick: onClear }, t("clear")) : null,
          tab === "git" ? h("button", { className: "ps-btn", type: "button", onClick: onClearGit }, t("clear")) : null,
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
          : tab === "git"
            ? h("pre", { className: "ps-term", ref: termRef },
              gitLines.length === 0
                ? h("span", { className: "ps-term-empty" }, "No Git commands yet")
                : gitLines.map((line, index) => h("div", { key: index, className: `ps-term-line${line.kind ? ` ${line.kind}` : ""}` }, line.text.length > 0 ? line.text : " ")))
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
      const { t, info, diff, diffOpen, busy, onAction, onNewBranch, onNuke, onSwitch, onRefresh, onOpenFile, onToggleDiff, onCommit, onOpenDiff } = props;
      const [message, setMessage] = useState("");
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

      const files = (data.files || []).map((file) => {
        const raw = String(file.status || "");
        const staged = file.staged !== undefined ? file.staged : raw.length > 1 && raw[0] !== " " && raw[0] !== "?";
        const unstaged = file.unstaged !== undefined ? file.unstaged : !staged;
        return { ...file, staged, unstaged };
      });
      files.sort((left, right) => Number(Boolean(right.staged)) - Number(Boolean(left.staged)));
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
          h("button", { className: "ps-btn", type: "button", disabled, title: t("refresh"), onClick: onRefresh }, h(Icon.refresh), t("refresh")),
          h("button", { className: "ps-btn", type: "button", disabled, onClick: onNewBranch }, h(Icon.plus), t("newBranch")),
          h("button", { className: "ps-btn danger wide", type: "button", disabled, title: t("nukeHint"), onClick: onNuke }, h(Icon.bomb), t("nuke"))),
        h("div", { className: "ps-git-hint" }, t("fetchVsPull")),

        h("div", { className: "ps-git-card" },
          h("div", { className: "ps-git-section-head" },
            h("span", null, t("changes")),
            h("span", { className: "ps-git-count" }, String(files.length))),
          h("textarea", {
            className: "ps-git-commit-msg", value: message, placeholder: t("commitMessage"),
            rows: 2, onChange: (event) => setMessage(event.target.value),
          }),
          h("div", { className: "ps-git-commit-row" },
            h("span", { className: "ps-git-hint" }, t("commitHint")),
            h("button", {
              className: "ps-btn primary", type: "button",
              disabled: Boolean(busy) || !message.trim() || !files.some((file) => file.staged),
              onClick: () => { if (onCommit) void onCommit(message).then((ok) => { if (ok) setMessage(""); }); },
            }, busy === "commit" ? "…" : t("commit"))),
          files.length === 0
            ? h("div", { className: "ps-git-empty" }, h(Icon.check), t("cleanTree"))
            : h(React.Fragment, null,
              h("div", { className: "ps-git-files-head" },
                h("span", null, t("changed")),
                h("button", { className: "ps-btn", type: "button", disabled: Boolean(busy), onClick: () => onAction("stageAll") }, t("stageAll")),
                h("button", { className: "ps-btn", type: "button", disabled: Boolean(busy), onClick: () => onAction("unstageAll") }, t("unstageAll"))),
              h("div", { className: "ps-git-files" }, files.map((file) => h("div", {
                key: file.path,
                className: `ps-git-file-row${file.staged ? " staged" : ""}`,
              },
              h("button", {
                className: "ps-git-file", type: "button", title: file.path,
                onClick: () => onOpenFile(file.path),
              },
              h("span", { className: `ps-git-status ${gitStatusClass(file.status || "")}` }, (file.status || "?").slice(0, 2)),
              h("span", { className: "ps-git-path" }, file.path),
              file.staged ? h("span", { className: "ps-git-staged-badge" }, t("staged")) : null),
              h("span", { className: "ps-git-file-actions" },
                file.unstaged ? h("button", {
                  className: "ps-btn icon", type: "button", title: t("stage"), "aria-label": t("stage"),
                  disabled: Boolean(busy), onClick: () => onAction("stage", { file: file.path }),
                }, "+") : null,
                file.staged ? h("button", {
                  className: "ps-btn icon", type: "button", title: t("unstage"), "aria-label": t("unstage"),
                  disabled: Boolean(busy), onClick: () => onAction("unstage", { file: file.path }),
                }, "−") : null)))))),


        h("details", { className: "ps-git-details" },
          h("summary", null, t("details")),
          h("div", { className: "ps-git-detail" }, h("span", null, t("sshKey")), h("code", { title: data.sshKey || "" }, data.sshKey || "\u2014")),
          h("div", { className: "ps-git-detail" }, h("span", null, t("upstream")), h("code", { title: data.upstream || "" }, data.upstream || "\u2014")),
          h("div", { className: "ps-git-detail" }, h("span", null, t("lastCommit")), h("code", { title: data.lastCommit || "" }, data.lastCommit || "\u2014")),
          h("label", { className: "ps-git-branchselect" }, t("switchBranch"),
            h("select", { className: "ps-select", value: data.branch || "", onChange: (event) => onSwitch(event.target.value) },
              branches.map((branch) => h("option", { key: branch, value: branch }, branch))))),

        h("div", { className: "ps-git-diff-head" },
          h("button", { className: "ps-btn primary", type: "button", onClick: onOpenDiff }, t("reviewDiff")),
          stats.files > 0
            ? h("span", { className: "ps-git-stats" },
              `${stats.files} ${t("filesChanged")} \u00b7 `,
              h("span", { className: "plus" }, `+${stats.add}`), " ",
              h("span", { className: "minus" }, `\u2212${stats.del}`))
            : null));
    }

    /** Parse a raw `git diff` patch into files/hunks for the review overlay. */
    function parseGitPatch(patch) {
      const files = [];
      let file = null;
      let hunk = null;
      for (const line of String(patch || "").split("\n")) {
        if (line.startsWith("diff --git ")) {
          const match = / b\/(.+)$/u.exec(line);
          file = { path: match ? match[1] : "", hunks: [] };
          files.push(file);
          hunk = null;
          continue;
        }
        if (!file) continue;
        if (line.startsWith("+++ ")) {
          const path = line.slice(4).replace(/^b\//u, "").trim();
          if (path && path !== "/dev/null") file.path = path;
          continue;
        }
        if (line.startsWith("@@")) {
          hunk = { header: line, lines: [] };
          file.hunks.push(hunk);
          continue;
        }
        if (!hunk || line.startsWith("--- ")) continue;
        if (line.startsWith("+")) hunk.lines.push({ type: "+", text: line.slice(1) });
        else if (line.startsWith("-")) hunk.lines.push({ type: "-", text: line.slice(1) });
        else if (line.startsWith(" ")) hunk.lines.push({ type: " ", text: line.slice(1) });
        else if (line === "") hunk.lines.push({ type: " ", text: "" });
      }
      return files.filter((entry) => entry.hunks.length > 0);
    }

    function GitDiffPopup({ t, patch, onClose }) {
      const files = useMemo(() => parseGitPatch(patch), [patch]);
      useEffect(() => {
        const onKey = (event) => { if (event.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
      }, [onClose]);
      const renderHunk = (hunk) => {
        const output = [];
        pairHunkLines(hunk.lines).forEach((entry, index) => {
          const row = (line, segments, key) => h("div", {
            key,
            className: `ps-diff-line ${line.type === "+" ? "add" : line.type === "-" ? "del" : "ctx"}`,
          }, segments
            ? segments.map((segment, at) => segment.changed
              ? h("span", { key: at, className: `ps-diff-word-${line.type === "+" ? "add" : "del"}` }, segment.text)
              : segment.text)
            : (line.text || " "));
          if (entry.kind === "pair") {
            const diff = inlineWordDiff(entry.oldLine.text, entry.newLine.text);
            output.push(row(entry.oldLine, diff.old, `o${index}`));
            output.push(row(entry.newLine, diff.new, `n${index}`));
          } else output.push(row(entry.line, null, `l${index}`));
        });
        return output;
      };
      return h("div", { className: "ps-git-review-backdrop", onClick: onClose },
        h("div", { className: "ps-git-review", onClick: (event) => event.stopPropagation() },
          h("div", { className: "ps-git-review-head" },
            h("span", null, t("reviewDiff")),
            h("span", { className: "ps-git-count" }, `${files.length} files`),
            h("span", { className: "ps-grow" }),
            h("button", { className: "ps-btn icon", type: "button", title: t("close"), onClick: onClose }, h(Icon.close))),
          h("div", { className: "ps-git-review-body" },
            files.length === 0 ? h("div", { className: "ps-git-empty" }, h(Icon.check), t("cleanTree")) : null,
            files.map((file) => h("section", { className: "ps-git-review-file", key: file.path || "file" },
              h("div", { className: "ps-git-review-file-head" }, file.path),
              file.hunks.map((hunk, hunkIndex) => h("div", { className: "ps-git-review-hunk", key: hunkIndex },
                h("div", { className: "ps-git-review-hunk-head" }, hunk.header),
                renderHunk(hunk))))))));
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

    const PageTextLayer = React.memo(function PageTextLayer({ words, layerRef, selected }) {
      const spans = useMemo(() => {
        if (!words || !words.width || !words.height || words.words.length === 0) return [];
        return orderPageWords(words.words, words.width, words.height)
          .map((word, index) => ({ word, index }));
      }, [words]);
      return h("div", { className: "ps-text-layer", ref: layerRef },
        spans.map(({ word, index }) => h("span", {
          key: index,
          className: selected && selected.has(index) ? "ps-word-selected" : undefined,
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
      const [selectedWords, setSelectedWords] = useState(null);
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

      // Fetch the word layer as soon as the page mounts. Waiting for an
      // intersection can race a click, leaving the selection anchored to the
      // image with no visible trail.
      useEffect(() => {
        if (words) return undefined;
        let cancelled = false;
        loadWords().catch((error) => { if (!cancelled) notify(error.message, "err"); });
        return () => { cancelled = true; };
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
            setSelectedWords(null);
            return;
          }
          const range = live.getRangeAt(0);
          const layer = layerRef.current;
          const box = boxRef.current;
          if (!layer || !box || !layer.contains(range.commonAncestorContainer)) {
            setSelection(null);
            setSelectedWords(null);
            return;
          }
          const highlighted = new Set();
          [...layer.querySelectorAll("span")].forEach((node, index) => {
            if (live.containsNode(node, true)) highlighted.add(index);
          });
          setSelectedWords(highlighted.size > 0 ? highlighted : null);
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

      return h("div", { className: "ps-page-box", ref: boxRef, "data-page": page },
        nearViewport ? h("img", {
          className: "ps-page",
          src: url,
          alt: `page ${page}`,
          loading: eager ? "eager" : "lazy",
          draggable: false,
          onError: () => { if (onMissing) onMissing(); },
        }) : h("div", { className: "ps-page ps-page-placeholder", "aria-hidden": "true" }),
        words && nearViewport && textLayer && words.words.length > 0
          ? h(PageTextLayer, { words, layerRef, selected: selectedWords })
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

    // Aider-style search/replace blocks are text-anchored, so they survive
    // line-number drift and unrelated edits. Unified diffs remain supported
    // for old chats.
    function parseEditSuggestions(text) {
      const suggestions = [];
      const blocks = /```(?:edit|aider)\s*\n([\s\S]*?)```/giu;
      let match;
      while ((match = blocks.exec(String(text || "")))) {
        const body = match[1];
        const lines = body.split("\n");
        let file = "";
        for (const line of lines) {
          if (line.startsWith("<<<<<<<")) break;
          const candidate = line.trim().replace(/^[*]{3}\s*(?:Update|Add|Delete) File:\s*/u, "");
          if (candidate && !candidate.startsWith("#")) file = candidate;
        }
        let index = 0;
        while (index < lines.length) {
          if (!lines[index].startsWith("<<<<<<<")) { index += 1; continue; }
          const search = [];
          index += 1;
          while (index < lines.length && !lines[index].startsWith("=======")) { search.push(lines[index]); index += 1; }
          if (index >= lines.length) break;
          index += 1;
          const replace = [];
          while (index < lines.length && !lines[index].startsWith(">>>>>>>")) { replace.push(lines[index]); index += 1; }
          if (index < lines.length) index += 1;
          const from = search.join("\n");
          const to = replace.join("\n");
          if (!from.trim()) continue;
          const hunk = {
            header: "@@ search @@",
            lines: [
              ...from.split("\n").map((lineText) => ({ type: "-", text: lineText })),
              ...to.split("\n").map((lineText) => ({ type: "+", text: lineText })),
            ],
          };
          suggestions.push({ file: file || "", search: from, replace: to, hunks: [hunk] });
        }
      }
      return suggestions;
    }

    function searchHunk(search, replace) {
      return {
        header: "@@ search @@",
        lines: [
          ...String(search || "").split("\n").map((text) => ({ type: "-", text })),
          ...String(replace || "").split("\n").map((text) => ({ type: "+", text })),
        ],
      };
    }

    function normalizeLine(value) {
      return String(value || "").replace(/[ \t]+$/u, "");
    }

    /** Locate a search block exactly, then ignoring trailing whitespace, then fuzzily. */
    function findSearchRange(content, search) {
      const text = String(content || "").replace(/\r\n/gu, "\n");
      const needle = String(search || "").replace(/\r\n/gu, "\n");
      if (!needle) return null;
      const exact = text.indexOf(needle);
      if (exact >= 0) return { from: exact, to: exact + needle.length, exact: true };
      const lines = text.split("\n");
      const needleLines = needle.split("\n").map(normalizeLine);
      const trimmed = (line) => normalizeLine(line);
      for (let start = 0; start + needleLines.length <= lines.length; start += 1) {
        if (!needleLines.every((line, offset) => trimmed(lines[start + offset]) === line)) continue;
        const prefix = lines.slice(0, start).join("\n");
        const from = prefix.length ? prefix.length + 1 : 0;
        return { from, to: from + lines.slice(start, start + needleLines.length).join("\n").length, exact: false };
      }
      const tokenize = (line) => new Set(normalizeLine(line).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(" ").filter(Boolean));
      const similarity = (left, right) => {
        const a = tokenize(left);
        const b = tokenize(right);
        if (!a.size || !b.size) return 0;
        let common = 0;
        for (const token of a) if (b.has(token)) common += 1;
        return (2 * common) / (a.size + b.size);
      };
      let best = { score: 0, start: -1 };
      for (let start = 0; start + needleLines.length <= lines.length; start += 1) {
        let score = 0;
        for (let offset = 0; offset < needleLines.length; offset += 1) score += similarity(needleLines[offset], lines[start + offset]);
        score /= needleLines.length;
        if (score > best.score) best = { score, start };
      }
      if (best.start < 0 || best.score < 0.7) return null;
      const prefix = lines.slice(0, best.start).join("\n");
      const from = prefix.length ? prefix.length + 1 : 0;
      return { from, to: from + lines.slice(best.start, best.start + needleLines.length).join("\n").length, exact: false };
    }

    function applySearchReplace(content, search, replace) {
      const range = findSearchRange(content, search);
      if (!range) return null;
      return String(content).slice(0, range.from) + String(replace || "") + String(content).slice(range.to);
    }

    function lineNumberAt(content, offset) {
      return String(content || "").slice(0, Math.max(0, offset)).split("\n").length;
    }

    function stripCardBlocks(text) {
      return String(text || "")
        .replace(/```literature_card\s*\n[\s\S]*?```/giu, "")
        .replace(/```cards?\s*\n[\s\S]*?```/giu, "");
    }

    function stripDiffBlocks(text) {
      return String(text || "")
        .replace(/```(?:edit|aider)\s*\n[\s\S]*?```/giu, "")
        .replace(/```(?:diff|patch)\s*\n[\s\S]*?```/giu, "")
        .trim();
    }

    function diffChangeKey(file, hunk) {
      const text = `${file || ""}|${hunk.header || ""}|${hunk.lines.map((line) => `${line.type}${line.text}`).join("\n")}`;
      let hash = 5381;
      for (let index = 0; index < text.length; index += 1) hash = ((hash * 33) ^ text.charCodeAt(index)) >>> 0;
      return `c${hash.toString(36)}`;
    }

    function changeFingerprint(change) {
      if (!change) return "";
      if (change.search !== undefined) return `${change.file || ""}|s|${change.search}|${change.replace}`;
      return `${change.file || ""}|d|${(change.hunk && change.hunk.lines ? change.hunk.lines : []).map((line) => `${line.type}${line.text}`).join("\n")}`;
    }

    function changeAlreadyApplied(change, content) {
      if (!change || !content) return false;
      if (change.search !== undefined) {
        if (findSearchRange(content, change.search)) return false;
        if (!String(change.replace || "").trim()) return true;
        return String(content).includes(change.replace);
      }
      if (!change.hunk) return false;
      const added = change.hunk.lines.filter((line) => line.type === "+").map((line) => line.text).join("\n");
      if (added && String(content).includes(added)) return true;
      const old = change.hunk.lines.filter((line) => line.type !== "+").map((line) => line.text).join("\n");
      return Boolean(old) && !String(content).includes(old) && applySuggestion(content, { hunks: [change.hunk] }) === null;
    }

    function sameChange(left, right) {
      if (!left || !right || left.file !== right.file) return false;
      if (left.search !== undefined || right.search !== undefined) {
        return left.search === right.search && left.replace === right.replace;
      }
      if (!left.hunk || !right.hunk) return false;
      const body = (hunk) => hunk.lines.map((line) => `${line.type}${line.text}`).join("\n");
      return body(left.hunk) === body(right.hunk);
    }

    function collectChanges(messages) {
      const changes = [];
      const add = (change) => {
        if (change.search !== undefined && change.search === change.replace) return;
        if (change.hunk && change.hunk.lines && !change.hunk.lines.some((line) => line.type !== " ")) return;
        const existing = changes.findIndex((entry) => sameChange(entry, change));
        if (existing >= 0) changes.splice(existing, 1);
        changes.push(change);
      };
      (Array.isArray(messages) ? messages : []).forEach((message) => {
        if (message.role !== "assistant") return;
        parseEditSuggestions(message.content).forEach((suggestion) => {
          suggestion.hunks.forEach((hunk) => {
            add({
              id: diffChangeKey(suggestion.file, hunk),
              file: suggestion.file || "",
              hunk,
              search: suggestion.search,
              replace: suggestion.replace,
            });
          });
        });
        parseDiffSuggestions(message.content).forEach((suggestion) => {
          suggestion.hunks.forEach((hunk) => {
            add({
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

    /** Section/equation/figure outline for the open LaTeX file. */
    function buildOutline(content) {
      const lines = String(content || "").split("\n");
      const outline = [];
      const counters = [0, 0, 0, 0];
      let equationNumber = 0;
      let figureNumber = 0;
      const plain = (value) => String(value || "").replace(/\\[a-zA-Z@]+\*?(?:\[[^\]]*\])?\{([^}]*)\}/gu, "$1").replace(/[{}]/gu, "").trim();
      const readBraced = (line, start) => {
        let depth = 0;
        let text = "";
        for (let index = start; index < line.length; index += 1) {
          const character = line[index];
          if (character === "{") { depth += 1; if (depth === 1) continue; }
          if (character === "}") { depth -= 1; if (depth === 0) return text; }
          text += character;
        }
        return text;
      };
      const sectionPattern = /\\(chapter|section|subsection|subsubsection)(\*?)\s*\{/gu;
      const mathPattern = /\\begin\{(equation|align|gather|multline|eqnarray|alignat)(\*?)\}/u;
      const floatPattern = /\\begin\{(figure|table)(\*?)\}/u;
      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index];
        if (!line || line.trimStart().startsWith("%")) continue;
        for (const match of line.matchAll(sectionPattern)) {
          const level = ["chapter", "section", "subsection", "subsubsection"].indexOf(match[1]);
          const starred = match[2] === "*";
          if (!starred) {
            counters[level] += 1;
            for (let lower = level + 1; lower < counters.length; lower += 1) counters[lower] = 0;
          }
          const start = match.index + match[0].length;
          const title = plain(readBraced(line, start));
          const number = starred ? "" : counters.slice(0, level + 1).filter((value) => value > 0).join(".");
          outline.push({ kind: level === 0 ? "chapter" : level === 1 ? "section" : "subsection", line: index + 1, number, text: title });
        }
        const math = mathPattern.exec(line);
        if (math) {
          const starred = math[2] === "*";
          if (!starred) equationNumber += 1;
          let snippet = "";
          let label = "";
          for (let cursor = index; cursor < Math.min(lines.length, index + 40); cursor += 1) {
            if (cursor > index && lines[cursor].includes("\\end{" + math[1])) break;
            if (!snippet && cursor > index && lines[cursor].trim() && !lines[cursor].trim().startsWith("\\label")) snippet = lines[cursor].trim().slice(0, 90);
            const found = /\\label\{([^}]+)\}/u.exec(lines[cursor]);
            if (found) label = found[1];
          }
          outline.push({ kind: "equation", line: index + 1, number: starred ? "" : String(equationNumber), text: label || snippet || math[1] });
        }
        const float = floatPattern.exec(line);
        if (float) {
          const starred = float[2] === "*";
          if (!starred) figureNumber += 1;
          let caption = "";
          let label = "";
          for (let cursor = index; cursor < Math.min(lines.length, index + 80); cursor += 1) {
            if (cursor > index && lines[cursor].includes("\\end{" + float[1])) break;
            const found = /\\label\{([^}]+)\}/u.exec(lines[cursor]);
            if (found) label = found[1];
            const captionMatch = /\\caption(?:\[[^\]]*\])?\s*\{/u.exec(lines[cursor]);
            if (captionMatch) caption = plain(readBraced(lines[cursor], captionMatch.index + captionMatch[0].length));
          }
          outline.push({ kind: float[1], line: index + 1, number: starred ? "" : String(figureNumber), text: label || caption || float[1] });
        }
      }
      return outline.sort((left, right) => left.line - right.line);
    }

    /** Token-level diff for paired removed/added lines. */
    function inlineWordDiff(oldText, newText) {
      const tokenize = (value) => String(value || "").match(/\s+|[^\s]+/gu) || [];
      const a = tokenize(oldText);
      const b = tokenize(newText);
      if (a.length > 400 || b.length > 400) {
        return {
          old: [{ text: String(oldText || ""), changed: true }],
          new: [{ text: String(newText || ""), changed: true }],
        };
      }
      const dp = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
      for (let i = a.length - 1; i >= 0; i -= 1) {
        for (let j = b.length - 1; j >= 0; j -= 1) {
          dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
        }
      }
      const oldSegments = [];
      const newSegments = [];
      const push = (list, text, changed) => {
        if (!text) return;
        if (/^\s+$/u.test(text)) {
          list.push({ text, changed: false });
          return;
        }
        const last = list[list.length - 1];
        if (last && last.changed === changed && !/^\s+$/u.test(last.text)) last.text += text;
        else list.push({ text, changed });
      };
      let i = 0;
      let j = 0;
      while (i < a.length && j < b.length) {
        if (a[i] === b[j]) { push(oldSegments, a[i], false); push(newSegments, b[j], false); i += 1; j += 1; }
        else if (dp[i + 1][j] >= dp[i][j + 1]) { push(oldSegments, a[i], true); i += 1; }
        else { push(newSegments, b[j], true); j += 1; }
      }
      while (i < a.length) { push(oldSegments, a[i], true); i += 1; }
      while (j < b.length) { push(newSegments, b[j], true); j += 1; }
      return { old: oldSegments, new: newSegments };
    }

    /** Pair runs of removed/added lines so review rows can show word-level changes. */
    function pairHunkLines(lines) {
      const output = [];
      let index = 0;
      while (index < lines.length) {
        if (lines[index].type !== "-") { output.push({ kind: "line", line: lines[index] }); index += 1; continue; }
        const removed = [];
        const added = [];
        while (index < lines.length && lines[index].type === "-") { removed.push(lines[index]); index += 1; }
        while (index < lines.length && lines[index].type === "+") { added.push(lines[index]); index += 1; }
        const count = Math.max(removed.length, added.length);
        for (let offset = 0; offset < count; offset += 1) {
          if (removed[offset] && added[offset]) output.push({ kind: "pair", oldLine: removed[offset], newLine: added[offset] });
          else if (removed[offset]) output.push({ kind: "line", line: removed[offset] });
          else output.push({ kind: "line", line: added[offset] });
        }
      }
      return output;
    }

    /** Rewrite a hunk header so the same suggestion applies to the current buffer. */
    function rebaseHunk(content, hunk) {
      if (!hunk) return null;
      const text = String(content || "");
      const lines = text.split("\n");
      const match = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@(.*)$/u.exec(hunk.header || "");
      const oldEntries = hunk.lines.filter((line) => line.type !== "+");
      const oldLines = oldEntries.map((line) => line.text);
      const newLines = hunk.lines.filter((line) => line.type !== "-").map((line) => line.text);
      const declared = match ? Number(match[1]) - 1 : -1;
      const count = match && match[2] !== undefined ? Number(match[2]) : oldLines.length;
      const newCount = match && match[4] !== undefined ? Number(match[4]) : newLines.length;
      if (count === 0) {
        const at = Math.max(0, Math.min(lines.length, declared));
        return { ...hunk, header: `@@ -${at + 1},0 +${at + 1},${newCount} @@${match ? match[5] : ""}` };
      }
      const normalize = (value) => String(value || "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
      const similarity = (left, right) => {
        const a = normalize(left);
        const b = normalize(right);
        if (!a || !b) return a === b ? 1 : 0;
        if (a === b) return 1;
        if (a.startsWith(b) || b.startsWith(a)) return 0.85;
        const at = new Set(a.split(" ").filter(Boolean));
        const bt = new Set(b.split(" ").filter(Boolean));
        let common = 0;
        for (const token of at) if (bt.has(token)) common += 1;
        return (2 * common) / Math.max(1, at.size + bt.size);
      };
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
      // The hunk may have moved far, or its removed lines may have been edited.
      // Search the whole file for the unchanged context lines first.
      const contextLines = oldEntries.filter((line) => line.type === " ").map((line) => line.text);
      if (at < 0 && contextLines.length > 0) {
        const joined = lines.join("\n");
        const needle = contextLines.join("\n");
        const index = joined.indexOf(needle);
        if (index >= 0) {
          const prefix = joined.slice(0, index).split("\n").length - 1;
          const beforeCount = oldEntries.findIndex((line) => line.type === " ");
          at = Math.max(0, prefix - Math.max(0, beforeCount));
        }
      }
      if (at < 0) {
        // Similarity search over every possible start, weighting unchanged
        // context lines more than removed lines.
        let best = { score: 0, start: -1 };
        const span = oldEntries.length;
        for (let candidate = 0; candidate + span <= lines.length; candidate += 1) {
          let score = 0;
          let total = 0;
          for (let offset = 0; offset < span; offset += 1) {
            const weight = oldEntries[offset].type === " " ? 3 : 1;
            total += weight;
            score += weight * similarity(oldEntries[offset].text, lines[candidate + offset]);
          }
          const normalized = total > 0 ? score / total : 0;
          const distance = declared >= 0 ? Math.abs(candidate - declared) : 0;
          if (normalized > best.score + 0.02 || (Math.abs(normalized - best.score) <= 0.02 && distance < Math.abs(best.start - declared))) {
            best = { score: normalized, start: candidate };
          }
        }
        if (best.start >= 0 && best.score >= 0.55) at = best.start;
      }
      if (at < 0) {
        if (declared < 0) return null;
        at = Math.max(0, Math.min(lines.length - 1, declared));
      }
      const currentOld = lines.slice(at, at + oldLines.length);
      if (currentOld.length === 0) return null;
      let oldIndex = 0;
      const mapped = hunk.lines.map((line) => {
        if (line.type === "+") return line;
        const next = currentOld[oldIndex];
        oldIndex += 1;
        return next === undefined ? line : { ...line, text: next };
      });
      const adaptedCount = Math.max(1, currentOld.length);
      return {
        ...hunk,
        header: `@@ -${at + 1},${adaptedCount} +${at + 1},${newCount} @@${match ? match[5] : ""}`,
        lines: mapped,
      };
    }

    function parseChoiceBlocks(text) {
      const blocks = [];
      const pattern = /```choices?\s*\n([\s\S]*?)```/giu;
      let match;
      let index = 0;
      while ((match = pattern.exec(String(text || "")))) {
        const body = match[1].endsWith("\n") ? match[1].slice(0, -1) : match[1];
        const lines = body.split("\n");
        const marker = /^\s*(?:(\d+)[.)]|([A-Za-z])[.)]|option\s+([A-Za-z0-9]+)\s*[:.)-]|[-*\u2022])\s*(.*)$/iu;
        const hasMarker = lines.some((line) => marker.test(line));
        const groups = [];
        let current = null;
        for (const raw of lines) {
          const line = raw.trimEnd();
          const found = hasMarker ? marker.exec(line) : null;
          if (found) {
            if (current && current.length > 0) groups.push(current);
            current = [(found[4] || "").trim()];
            continue;
          }
          if (!hasMarker && line.trim() === "") {
            if (current && current.length > 0) groups.push(current);
            current = null;
            continue;
          }
          if (line.trim() === "" && hasMarker) {
            if (current && current.length > 0) current.push("");
            continue;
          }
          if (!current) current = [line.trim()];
          else current.push(line.trim());
        }
        if (current && current.length > 0) groups.push(current);
        const options = groups
          .map((group) => group.join("\n").replace(/\n{2,}/gu, "\n").trim())
          .filter(Boolean)
          .map((clean) => {
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
      return String(text || "")
        .replace(/```read\s*\n[^\n]+\n```/giu, "")
        .replace(/```grep\s*\n[\s\S]*?```/giu, "");
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
        queued, onQueue, onSteer, onRemoveQueued, onShowContext, onUnpin, onSteerQueued,
        compileApproval, onCompileDecision, onRenameChat,
      } = props;
      const logRef = useRef(null);
      const [inputHeight, setInputHeight] = useState(() => {
        try { return Math.max(46, Math.min(600, Number(localStorage.getItem("dsh.paper-studio.chat-height")) || 92)); } catch { return 92; }
      });
      const startResize = (event) => {
        event.preventDefault();
        const startY = event.clientY;
        const startHeight = inputHeight;
        let latest = startHeight;
        const move = (moveEvent) => {
          latest = Math.max(46, Math.min((window.innerHeight || 800) * 0.6, startHeight + startY - moveEvent.clientY));
          setInputHeight(latest);
        };
        const stop = () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", stop);
          try { localStorage.setItem("dsh.paper-studio.chat-height", String(latest)); } catch { /* storage disabled */ }
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", stop);
      };
      useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
      }, [chat && chat.messages ? chat.messages.length : 0, stream, busy]);
      const messages = chat && Array.isArray(chat.messages) ? chat.messages : [];
      const recentMessages = chat && Number(chat.summaryCount) > 0 ? messages.slice(Number(chat.summaryCount)) : messages;
      const contextChars = (chat ? String(chat.systemPrompt || "").length + String(chat.memory || "").length + String(chat.summary || "").length + String(chat.context && chat.context.text || "").length + (chat.pins || []).reduce((total, pin) => total + String(pin.text || "").length, 0) : 0)
        + (chat && Array.isArray(chat.literature) ? chat.literature.reduce((total, item) => total + String(item.title || "").length + String(item.abstract || "").length, 0) : 0)
        + recentMessages.reduce((total, message) => total + String(message.content || "").length, 0) + String(input || "").length;
      const usedTokens = Math.ceil(contextChars / 4);
      const maxTokens = Math.ceil(CONTEXT_BUDGET_CHARS / 4);
      const contextPct = Math.max(0, Math.min(100, Math.round((contextChars / CONTEXT_BUDGET_CHARS) * 100)));
      let assistantOrdinal = -1;
      const assistantOrdinals = messages.map((message) => (message.role === "assistant" ? ++assistantOrdinal : null));
      const renderLiteratureCard = (item, key) => h("div", { className: "ps-lit-card", key },
        h("a", { className: "ps-lit-title", href: item.url || (item.doi ? `https://doi.org/${item.doi}` : "#"), target: "_blank", rel: "noopener noreferrer" }, item.title || "Untitled"),
        h("div", { className: "ps-lit-meta" }, `${(item.authors || []).slice(0, 4).join(", ")}${(item.authors || []).length > 4 ? " et al." : ""} · ${item.year || "—"} · ${item.venue || ""}`),
        h("div", { className: "ps-lit-links" },
          item.doi ? h("a", { href: `https://doi.org/${item.doi}`, target: "_blank", rel: "noopener noreferrer" }, item.doi) : h("span", { className: "ps-lit-nodoi" }, "DOI not found"),
          item.doi ? h("button", { className: "ps-btn", type: "button", title: "Copy DOI", onClick: () => { void navigator.clipboard.writeText(item.doi); } }, "Copy DOI") : null),
        item.abstract ? h("details", { className: "ps-lit-abstract" }, h("summary", null, "Abstract"), h("div", null, item.abstract)) : null);
      return h("div", { className: "ps-chat" },
        h("div", { className: "ps-chat-bar" },
          h("span", { className: "ps-chat-agent", title: agent.name }, agent.name),
          h("select", {
            className: "ps-select", value: chat ? chat.id : "", title: t("chatHistory"),
            onChange: (event) => onSelectChat(event.target.value),
          }, chats.map((item) => h("option", { key: item.id, value: item.id }, `${item.title || t("newChat")}${item.messages ? ` · ${item.messages}` : ""}`))),
          h("button", { className: "ps-btn icon", type: "button", title: "Rename chat", "aria-label": "Rename chat", onClick: () => onRenameChat && onRenameChat() }, "✎"),
          busy ? h("span", { className: "ps-spinner", title: "Working" }) : null,
          h("button", { className: "ps-btn icon", type: "button", title: t("newChat"), onClick: onNewChat }, h(Icon.plus)),
          h("button", {
            className: "ps-btn icon ps-chat-prompt", type: "button",
            title: "Context inspector",
            onClick: () => onShowContext && onShowContext(),
          }, "◧"),
          h("button", {
            className: "ps-btn icon ps-chat-prompt", type: "button",
            title: `${t("brainTitle")}${chat && chat.reasoningEffort ? ` · ${chat.reasoningEffort}` : ""}`,
            onClick: () => onShowMemory && onShowMemory(),
          }, "🧠"),
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
              ? stripMemoryBlocks(stripWebBlocks(stripReadBlocks(stripChoiceBlocks(stripCardBlocks(stripDiffBlocks(message.content))))))
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
                })),
              (chat && Array.isArray(chat.literature) ? chat.literature.filter((item) => item.assistantIndex === assistantOrdinals[index]) : [])
                .map((item, cardIndex) => renderLiteratureCard(item, `lit-${index}-${cardIndex}`)));
          }),
          streamReasoning ? h("div", { className: "ps-chat-msg assistant" },
            h("div", { className: "ps-chat-who" }, agent.name),
            h(ThinkingBlock, { t, text: streamReasoning, mode: thinkingMode || "last" })) : null,
          stream ? h("div", { className: "ps-chat-msg assistant" },
            h("div", { className: "ps-chat-who" }, agent.name),
            h(RichText, { text: stream })) : null,
          busy && !stream ? h("div", { className: "ps-chat-msg assistant" },
            h("div", { className: "ps-chat-who" }, agent.name),
            h("div", { className: "ps-chat-text ps-chat-thinking" }, h("span", { className: "ps-spinner" }), " ", t("thinking"))) : null,
          busy && stream ? h("div", { className: "ps-chat-msg assistant" },
            h("div", { className: "ps-chat-text ps-chat-thinking" }, h("span", { className: "ps-spinner" }), " Working…")) : null,
          (chat && Array.isArray(chat.literature) ? chat.literature.filter((item) => item.assistantIndex === undefined && item.messageIndex === undefined) : [])
            .map((item, index) => renderLiteratureCard(item, `legacy-${index}`)),
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
            h("button", { className: "ps-btn keep", type: "button", onClick: () => onKeepAll && onKeepAll() }, "Keep all"),
            h("button", { className: "ps-btn danger", type: "button", onClick: () => onDiscardAll && onDiscardAll() }, "Discard all"))) : null,
        compileApproval ? h("div", { className: "ps-compile-approval" },
          h("div", { className: "ps-compile-approval-title" }, "The agent wants to compile"),
          h("div", { className: "ps-compile-approval-reason" }, compileApproval.reason || "Check the current document"),
          h("div", { className: "ps-compile-approval-actions" },
            h("button", { className: "ps-btn primary", type: "button", onClick: () => onCompileDecision("allow") }, "Allow once"),
            h("button", { className: "ps-btn", type: "button", onClick: () => onCompileDecision("allow-session") }, "Always allow this chat"),
            h("button", { className: "ps-btn danger", type: "button", onClick: () => onCompileDecision("deny") }, "Deny"))) : null,
        queued && queued.length > 0 ? h("div", { className: "ps-chat-queue" },
          queued.map((item) => h("div", { className: "ps-chat-queue-item", key: item.id },
            h("span", { className: "ps-chat-queue-kind" }, item.steer ? "steer" : "queued"),
            h("span", { className: "ps-chat-queue-text", title: item.text }, item.text),
            h("button", { className: "ps-btn", type: "button", onClick: () => onSteerQueued && onSteerQueued(item.id) }, "Steer"),
            h("button", { className: "ps-btn icon", type: "button", title: "Remove", onClick: () => onRemoveQueued && onRemoveQueued(item.id) }, "×")))) : null,
        (chat && Array.isArray(chat.pins) && chat.pins.length > 0) ? h("div", { className: "ps-chat-pins" },
          (chat && Array.isArray(chat.pins) ? chat.pins : []).map((pin, index) => h("div", { className: "ps-chat-pin", key: `${pin.path}-${index}` },
            h("div", { className: "ps-chat-context-head" }, `Pinned ${pin.path || ""}${pin.startLine ? `:${pin.startLine}${pin.endLine && pin.endLine !== pin.startLine ? `-${pin.endLine}` : ""}` : ""}`),
            h("div", { className: "ps-chat-context-text" }, String(pin.text || "").slice(0, 240)),
            h("button", { className: "ps-btn icon", type: "button", title: "Unpin", onClick: () => onUnpin && onUnpin(index) }, "×"))),) : null,
        h("div", {
          className: "ps-chat-resize", title: "Drag to resize the message box",
          onPointerDown: startResize,
        }),
        h("div", { className: "ps-context-bar", title: `${contextChars.toLocaleString()} characters of ${CONTEXT_BUDGET_CHARS.toLocaleString()} budget` },
          h("span", { className: "ps-context-bar-label" }, `Context ~${usedTokens.toLocaleString()} / ${maxTokens.toLocaleString()} tok`),
          h("div", { className: "ps-context-bar-track" },
            h("div", { className: "ps-context-bar-fill", style: { width: `${contextPct}%` } })),
          h("span", { className: "ps-context-bar-pct" }, `${contextPct}%`)),
        h("div", { className: "ps-chat-compose" },
          h("textarea", {
            className: "ps-chat-input", value: input, placeholder: t("chatPlaceholder"),
            style: { height: `${inputHeight}px` },
            onChange: (event) => onInput(event.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                if (busy) { if (String(input).trim()) onQueue(String(input)); }
                else onSend();
              }
            },
          }),
          busy ? h(React.Fragment, null,
            h("button", { className: "ps-btn danger", type: "button", onClick: onStop }, t("stop")),
            h("button", { className: "ps-btn", type: "button", disabled: !String(input).trim(), onClick: () => onQueue(String(input)) }, "Queue"),
            h("button", { className: "ps-btn primary", type: "button", disabled: !String(input).trim(), title: "Stop the current answer and send this instead", onClick: () => onSteer(String(input)) }, "Steer"))
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
      const draftTimers = useRef(new Map());
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
      const [gitLog, setGitLog] = useState([]);
      const [stage, setStage] = useState("");
      const [elapsed, setElapsed] = useState(0);
      const [symbols, setSymbols] = useState({ labels: [], citations: [], files: [] });
      const [misspelled, setMisspelled] = useState(() => new Set());
      const [missing, setMissing] = useState(null);
      const [explorerTab, setExplorerTab] = useState(() => (readUi().explorerTab === "git" ? "git" : "files"));
      const [treeMenu, setTreeMenu] = useState(null);
      const [outlineOpen, setOutlineOpen] = useState(() => readUi().outlineOpen !== false);
      const [outlineMath, setOutlineMath] = useState(() => Boolean(readUi().outlineMath));
      const [outlineFloats, setOutlineFloats] = useState(() => Boolean(readUi().outlineFloats));
      const [outlineHeight, setOutlineHeight] = useState(() => Math.max(80, Number(readUi().outlineHeight) || 180));
      useEffect(() => {
        if (!treeMenu) return undefined;
        const close = () => setTreeMenu(null);
        window.addEventListener("pointerdown", close);
        return () => window.removeEventListener("pointerdown", close);
      }, [treeMenu]);

      const startOutlineResize = (event) => {
        event.preventDefault();
        const startY = event.clientY;
        const startHeight = outlineHeight;
        let latest = startHeight;
        const move = (moveEvent) => {
          latest = Math.max(72, Math.min((window.innerHeight || 800) * 0.6, startHeight + startY - moveEvent.clientY));
          setOutlineHeight(latest);
        };
        const stop = () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", stop);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", stop);
      };
      const [gitInfo, setGitInfo] = useState({ data: null, error: "" });
      const [gitDiff, setGitDiff] = useState("");
      const [gitDiffOpen, setGitDiffOpen] = useState(false);
      const [gitReview, setGitReview] = useState(false);
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
      const [chatQueue, setChatQueue] = useState([]);
      const [compileApproval, setCompileApproval] = useState(null);
      const [chatStream, setChatStream] = useState("");
      const [chatReasoning, setChatReasoning] = useState("");
      const [changes, setChanges] = useState([]);
      const [reviewHidden, setReviewHidden] = useState(false);
      const [resolvedChoices, setResolvedChoices] = useState(new Set());
      const [allChats, setAllChats] = useState(null);
      const resolvedRef = useRef(new Set());
      const resolvedContentRef = useRef(new Set());
      const resolvedKey = useCallback((chatId, agentId) => `ps-chat-resolved:${projectIdRef.current || ""}:${agentId || (chat && chat.agentId) || (chatAgent && chatAgent.id) || ""}:${chatId || ""}`, [chat, chatAgent]);
      const resolvedContentKey = useCallback((chatId, agentId) => `${resolvedKey(chatId, agentId)}:content`, [resolvedKey]);
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
      const cursorByPath = useRef(readUi().cursors || {});
      const pdfScrollRef = useRef(null);
      const pdfPagesRef = useRef(readUi().pdfPages || {});
      const pdfPageRef = useRef(1);
      const [pdfPage, setPdfPage] = useState(1);
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
        // Let React commit the tab (and CodeMirror mount), then select.
        const attempt = (tries) => {
          const api = editorApiRef.current;
          if (api && api.__cm && api.selectRange) {
            api.selectRange(offset + startColumn, Math.max(offset + startColumn, endOffset));
            if (api.scrollToLine) api.scrollToLine(index + 1);
            return;
          }
          const textarea = editorRef.current;
          if (textarea) {
            textarea.focus();
            const selectionStart = offset + startColumn;
            const selectionEnd = Math.max(selectionStart, endOffset);
            textarea.setSelectionRange(selectionStart, selectionEnd);
            if (editorApiRef.current) editorApiRef.current.revealLine(index + 1);
            requestAnimationFrame(() => {
              if (editorApiRef.current) editorApiRef.current.revealLine(index + 1);
            });
            return;
          }
          if (tries < 30) requestAnimationFrame(() => attempt(tries + 1));
        };
        requestAnimationFrame(() => attempt(0));
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

      const copyPath = useCallback(async (value) => {
        try {
          await navigator.clipboard.writeText(value);
          notify(t("pathCopied"));
        } catch {
          notify(t("copyFailed"), "err");
        }
      }, [notify, t]);

      const openFile = useCallback(async (path, line, selection) => {
        const id = projectIdRef.current;
        if (!id || !path) return;
        if (/\.(?:png|jpe?g|gif|svg|webp|bmp)$/iu.test(path)) { setDialog({ kind: "image", path }); return; }
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
          const draft = readDraft(id, path);
          const diskChanged = draft && draft.mtime && file.mtime > draft.mtime + 5;
          if (diskChanged) clearDraft(id, path);
          const recovered = draft && !diskChanged && draft.content !== file.content ? draft.content : null;
          const tab = { path, content: recovered ?? file.content, saved: file.content, mtime: file.mtime, dirty: Boolean(recovered), saving: false, conflict: null };
          if (recovered) notify("Recovered unsaved changes from a previous session.");
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
            setSymbols(normalizeSymbols(data));
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
          // Rebase the editor's Git decoration against the new HEAD, including after commits.
          for (const tab of tabsRef.current) void refreshBaseline(tab.path);
          if (options && options.diff && data.repo) {
            const diff = await request("git/diff", { query: { project: id } });
            if (projectIdRef.current === id) setGitDiff(diff.patch || "");
          }
        } catch (error) {
          setGitInfo({ data: null, error: error.message });
        }
      }, [refreshBaseline]);

      const openGitReview = useCallback(async () => {
        setGitReview(true);
        await refreshGit({ diff: true });
      }, [refreshGit]);

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

      const savePinsFor = useCallback(async (targetChat, targetAgent, pins) => {
        const id = projectIdRef.current;
        if (!id || !targetChat || !targetAgent) return [];
        const result = await request("chat/pins", { method: "POST", body: {
          project: id, agentId: targetAgent.id, chatId: targetChat.id, pins,
        } });
        setChat((current) => (current && current.id === targetChat.id ? { ...current, pins: result.pins } : current));
        return result.pins || [];
      }, [chat]);

      const pinContext = useCallback(async (context, targetChat, targetAgent) => {
        if (!context || !context.text) return;
        const current = targetChat || chat;
        const agent = targetAgent || chatAgent;
        if (!current || !agent) return;
        const pins = [...(current.pins || [])];
        if (!pins.some((pin) => pin.path === context.file && pin.startLine === context.startLine && pin.endLine === context.endLine)) {
          pins.push({ path: context.file || "", startLine: context.startLine, endLine: context.endLine, text: String(context.text).slice(0, 8000) });
        }
        await savePinsFor(current, agent, pins);
      }, [chat, chatAgent, savePinsFor]);

      const removePin = useCallback(async (index) => {
        if (!chat || !chatAgent) return;
        const pins = (chat.pins || []).filter((unused, at) => at !== index);
        await savePinsFor(chat, chatAgent, pins);
      }, [chat, chatAgent, savePinsFor]);

      const pinCurrentFile = useCallback(async () => {
        const tab = tabsRef.current.find((item) => item.path === activeRef.current);
        if (!chat || !chatAgent || !tab) return;
        const pins = [...(chat.pins || [])];
        const endLine = tab.content.split("\n").length;
        if (!pins.some((pin) => pin.path === tab.path && pin.startLine === 1 && pin.endLine === endLine)) {
          pins.push({ path: tab.path, startLine: 1, endLine, text: tab.content.slice(0, 8000) });
        }
        await savePinsFor(chat, chatAgent, pins);
        notify(t("contextAdded"));
      }, [chat, chatAgent, notify, savePinsFor, t]);

      const pinPath = useCallback(async (path) => {
        if (!chat || !chatAgent) {
          notify("Open a chat first, then pin this file.", "err");
          return;
        }
        try {
          const pins = [...(chat.pins || [])];
          if (/\.(?:png|jpe?g|gif|svg|webp|bmp|pdf)$/iu.test(path)) {
            if (!pins.some((pin) => pin.path === path)) {
              pins.push({ path, text: `Image/PDF file ${path}. Use a read block to inspect it.` });
            }
          } else {
            const file = await request("file", { query: { project: projectIdRef.current, path } });
            const endLine = String(file.content || "").split("\n").length;
            if (!pins.some((pin) => pin.path === path && pin.startLine === 1 && pin.endLine === endLine)) {
              pins.push({ path, startLine: 1, endLine, text: String(file.content || "").slice(0, 8000) });
            }
          }
          await savePinsFor(chat, chatAgent, pins);
          notify(t("contextAdded"));
        } catch (error) {
          notify(error.message, "err");
        }
      }, [chat, chatAgent, notify, savePinsFor, t]);

      const startChat = useCallback(async (agent, context) => {
        const id = projectIdRef.current;
        if (!id || !agent) return;
        try {
          const result = await request("chat/create", { method: "POST", body: {
            project: id, agentId: agent.id, agentScope: agent.scope, context: null,
          } });
          setChatAgent(agent);
          resolvedRef.current = new Set();
          resolvedContentRef.current = new Set();
          setResolvedChoices(new Set());
          setChanges([]);
          let pins = [];
          if (context && context.text) {
            const saved = await request("chat/pins", { method: "POST", body: {
              project: id, agentId: agent.id, chatId: result.chat.id,
              pins: [{ path: context.file || "", startLine: context.startLine, endLine: context.endLine, text: String(context.text).slice(0, 8000) }],
            } });
            pins = saved.pins || [];
          }
          setChat({ id: result.chat.id, title: result.chat.title, updatedAt: result.chat.updatedAt, context: null, pins, reasoningEffort: result.chat.reasoningEffort || "low", messages: [] });
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
        try {
          await pinContext(context);
          notify(t("contextAdded"));
        } catch (error) {
          notify(error.message, "err");
        }
      }, [notify, pinContext, t]);

      const reviewSuggestion = useCallback((value) => {
        setSuggestion(value);
        if (value && value.file) void openFile(value.file);
      }, [openFile]);

      const discardSuggestion = useCallback(() => setSuggestion(null), []);

      const applyChanges = useCallback(async (list, tag) => {
        const byFile = new Map();
        for (const change of list) {
          if (!change || (!change.hunk && change.search === undefined)) continue;
          const file = change.file || "";
          if (!byFile.has(file)) byFile.set(file, []);
          byFile.get(file).push(change);
        }
        const appliedIds = new Set();
        for (const [file, entries] of byFile) {
          const tab = file
            ? tabsRef.current.find((item) => item.path === file)
            : tabsRef.current.find((item) => item.path === activeRef.current);
          if (!tab) {
            if (!file) {
              notify(t("suggestionNoFile"), "err");
              continue;
            }
            try {
              const data = await request("file", { query: { project: projectIdRef.current, path: file } });
              let content = data.content;
              let local = 0;
              for (const change of entries) {
                const next = change.search !== undefined
                  ? applySearchReplace(content, change.search, change.replace)
                  : applySuggestion(content, { hunks: [change.hunk] });
                if (next !== null) { content = next; local += 1; appliedIds.add(change.id); }
              }
              if (local === 0) {
                notify(t("suggestionMismatch"), "err");
                continue;
              }
              const saved = await request("file/save", { method: "POST", body: { project: projectIdRef.current, path: file, content, expectedMtime: data.mtime } });
              if (saved && saved.conflict) {
                notify(t("fileChanged"), "err");
                continue;
              }
              await openFile(file);
              notify(t("suggestionApplied"));
            } catch (error) {
              notify(error.message, "err");
            }
            continue;
          }
          let content = tab.content;
          let local = 0;
          for (const change of entries) {
            const next = change.search !== undefined
              ? applySearchReplace(content, change.search, change.replace)
              : applySuggestion(content, { hunks: [change.hunk] });
            if (next !== null) { content = next; local += 1; appliedIds.add(change.id); }
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
        }
        return appliedIds;
      }, [notify, openFile, request, t]);

      const persistResolved = useCallback(() => {
        if (!chat) return;
        try {
          localStorage.setItem(resolvedKey(chat.id), JSON.stringify([...resolvedRef.current]));
          localStorage.setItem(resolvedContentKey(chat.id), JSON.stringify([...resolvedContentRef.current]));
        } catch { /* storage disabled */ }
      }, [chat, resolvedKey, resolvedContentKey]);

      const rememberResolved = useCallback((change) => {
        resolvedRef.current.add(change.id);
        resolvedContentRef.current.add(changeFingerprint(change));
        for (const entry of changes) {
          if (!sameChange(entry, change)) continue;
          resolvedRef.current.add(entry.id);
          resolvedContentRef.current.add(changeFingerprint(entry));
        }
        persistResolved();
      }, [changes, persistResolved]);

      const hideAlreadyApplied = useCallback((list) => list.filter((change) => {
        const target = change.file
          ? tabsRef.current.find((item) => item.path === change.file)
          : tabsRef.current.find((item) => item.path === activeRef.current);
        return !(target && changeAlreadyApplied(change, target.content));
      }), []);

      const resolveChange = useCallback((change) => {
        const ids = new Set([change.id]);
        for (const entry of changes) if (sameChange(entry, change)) ids.add(entry.id);
        rememberResolved(change);
        setChanges((list) => list.filter((entry) => !ids.has(entry.id)));
      }, [changes, rememberResolved]);

      const decisionRef = useRef(() => {});
      const decisionQueueRef = useRef([]);
      const decisionTimerRef = useRef(null);
      const chatBusyRef = useRef(false);

      const updateChange = useCallback((id, patch) => {
        setChanges((list) => list.map((entry) => (entry.id === id ? { ...entry, ...patch, edited: true } : entry)));
      }, []);

      const keepChange = useCallback(async (change) => {
        const applied = await applyChanges([change], { keep: change });
        if (!applied.has(change.id)) return;
        decisionRef.current(change.edited ? "modified" : "kept", change);
        resolveChange(change);
        notify(t("suggestionApplied"));
      }, [applyChanges, notify, resolveChange, t]);

      const discardChange = useCallback((id) => {
        const change = changes.find((entry) => entry.id === id);
        if (change) decisionRef.current("discarded", change);
        if (change) resolveChange(change);
        else setChanges((list) => list.filter((entry) => entry.id !== id));
      }, [changes, resolveChange]);

      const retryChange = useCallback(async (change) => {
        const path = (change && change.file) || activeRef.current;
        const target = path
          ? tabsRef.current.find((item) => item.path === path)
          : tabsRef.current.find((item) => item.path === activeRef.current);
        // Re-read the live buffer at click time. The React tab snapshot can lag
        // behind a keystroke, which is exactly how a retry ends up adapting to
        // text the user has already changed.
        const live = editorApiRef.current && editorApiRef.current.__cm;
        let content = null;
        if (live && path === activeRef.current) content = live.state.doc.toString();
        else if (target) content = target.content;
        if (content === null && path) {
          try {
            const file = await request("file", { query: { project: projectIdRef.current, path } });
            content = file && file.content !== undefined ? file.content : null;
          } catch { /* report below */ }
        }
        if (content === null) {
          notify("Open the file before retrying this diff.", "err");
          return;
        }
        let hunk;
        let updated;
        if (change.search !== undefined) {
          const range = findSearchRange(content, change.search);
          if (!range) {
            notify("Still could not find that passage in the current file.", "err");
            return;
          }
          const search = content.slice(range.from, range.to);
          hunk = searchHunk(search, change.replace);
          updated = { ...change, search, hunk };
        } else {
          hunk = rebaseHunk(content, change.hunk);
          if (!hunk) {
            notify("Still could not adapt this diff to the current file.", "err");
            return;
          }
          updated = { ...change, hunk };
        }
        setChanges((list) => list.map((entry) => (entry.id === change.id ? updated : entry)));
        notify("Suggestion adapted to the current file.");
      }, [notify]);

      const keepAllChanges = useCallback(async () => {
        if (changes.length === 0) return;
        const applied = await applyChanges(changes, { keep: changes[0] });
        if (applied.size === 0) return;
        const landed = changes.filter((change) => applied.has(change.id));
        for (const change of landed) {
          decisionRef.current(change.edited ? "modified" : "kept", change);
          rememberResolved(change);
        }
        setChanges((list) => list.filter((change) => !applied.has(change.id)));
      }, [applyChanges, changes, rememberResolved]);

      const discardAllChanges = useCallback(() => {
        for (const change of changes) {
          decisionRef.current("discarded", change);
          rememberResolved(change);
        }
        setChanges([]);
      }, [changes, rememberResolved]);

      const loadResolved = useCallback((chatId, agentId) => {
        try {
          return new Set(JSON.parse(localStorage.getItem(resolvedKey(chatId, agentId)) || "[]"));
        } catch {
          return new Set();
        }
      }, [resolvedKey]);

      const loadResolvedContent = useCallback((chatId, agentId) => {
        try {
          return new Set(JSON.parse(localStorage.getItem(resolvedContentKey(chatId, agentId)) || "[]"));
        } catch {
          return new Set();
        }
      }, [resolvedContentKey]);

      const openChatMemory = useCallback(() => {
        if (!chat) return;
        setDialog({
          kind: "memory", draft: chat.memory || "", effort: chat.reasoningEffort || "default",
          chatId: chat.id,
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

      const openExistingChat = useCallback(async (agent, chatId, options = {}) => {
        const id = projectIdRef.current;
        if (!id || !agent) return;
        try {
          const data = await request("chat", { query: { project: id, agent: agent.id, chat: chatId } });
          if (Array.isArray(data.literature)) {
            const assistantCount = Array.isArray(data.messages) ? data.messages.filter((message) => message.role === "assistant").length : 0;
            data.literature = data.literature.map((item) => (item.assistantIndex === undefined ? { ...item, assistantIndex: Math.max(0, assistantCount - 1) } : item));
          }
          resolvedRef.current = loadResolved(data.id, agent.id);
          resolvedContentRef.current = loadResolvedContent(data.id, agent.id);
          setResolvedChoices(loadResolvedChoices(data.id));
          setChanges(hideAlreadyApplied(collectChanges(data.messages).filter((change) => !resolvedRef.current.has(change.id) && !resolvedContentRef.current.has(changeFingerprint(change)))));
          setReviewHidden(false);
          setChatAgent(agent);
          setChat(data);
          setChatInput("");
          setChatStream("");
          setChatBusy(false);
          setRightTab("chat");
          setPdfOpen(true);
          if (!options.background) setDialog(null);
          await refreshChats(agent);
        } catch (error) {
          notify(error.message, "err");
        }
      }, [loadResolved, notify, refreshChats]);

      const restoredChatFor = useRef(null);
      useEffect(() => {
        const id = project ? project.id : null;
        if (!id || !agents || agents.length === 0) return;
        if (dialog) return;
        if (restoredChatFor.current === id) return;
        restoredChatFor.current = id;
        if (chatAgent) return;
        const ui = readUi();
        if (!ui.chatAgentId || !ui.chatId) return;
        const agent = agents.find((item) => item.id === ui.chatAgentId && item.scope === ui.chatAgentScope);
        if (agent) void openExistingChat(agent, ui.chatId, { background: true });
      }, [project ? project.id : null, agents, chatAgent, dialog, openExistingChat]);

      const selectChat = useCallback(async (chatId) => {
        const id = projectIdRef.current;
        if (!id || !chatAgent || !chatId) return;
        try {
          const data = await request("chat", { query: { project: id, agent: chatAgent.id, chat: chatId } });
          if (Array.isArray(data.literature)) {
            const assistantCount = Array.isArray(data.messages) ? data.messages.filter((message) => message.role === "assistant").length : 0;
            data.literature = data.literature.map((item) => (item.assistantIndex === undefined ? { ...item, assistantIndex: Math.max(0, assistantCount - 1) } : item));
          }
          resolvedRef.current = loadResolved(data.id, chatAgent.id);
          resolvedContentRef.current = loadResolvedContent(data.id, chatAgent.id);
          setResolvedChoices(loadResolvedChoices(data.id));
          setChanges(hideAlreadyApplied(collectChanges(data.messages).filter((change) => !resolvedRef.current.has(change.id) && !resolvedContentRef.current.has(changeFingerprint(change)))));
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
          let context = null;
          const api = editorApiRef.current;
          const activeTab = tabsRef.current.find((item) => item.path === activeRef.current);
          if (api && api.selection && activeTab) {
            const range = api.selection();
            if (range && range.end > range.start) {
              const before = activeTab.content.slice(0, range.start);
              const selected = activeTab.content.slice(range.start, range.end);
              const endBefore = activeTab.content.slice(0, range.end);
              context = {
                file: activeTab.path,
                startLine: before.split("\n").length,
                endLine: endBefore.split("\n").length,
                text: selected,
              };
            }
          }
          const started = await request("chat/send", { method: "POST", body: {
            project: id, agentId: chatAgent.id, agentScope: chatAgent.scope, chatId: chat.id, message, context,
          } });
          chatJobRef.current = started.jobId;
          setChat((current) => (current && Array.isArray(current.pins) && current.pins.length > 0 ? { ...current, pins: [] } : current));
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
            } else if (data.type === "literature-search" || data.type === "file" || data.type === "web" || data.type === "grep") {
              setChatBusy(true);
            } else if (data.type === "literature" && Array.isArray(data.items)) {
              setChat((current) => {
                if (!current) return current;
                const existing = Array.isArray(current.literature) ? current.literature : [];
                const merged = [...existing, ...data.items].filter((item, index, list) => list.findIndex((other) => (other.doi || other.title) === (item.doi || item.title) && other.assistantIndex === item.assistantIndex) === index);
                return { ...current, literature: merged.slice(-50) };
              });
            } else if (data.type === "compile") {
              if (data.ok) notify(data.cached ? t("cachedBuild") : t("compileOk"), "ok");
              else notify(t("compileFailed"), "err");
              void refreshPdf();
            } else if (data.type === "compile-approval") {
              setCompileApproval({ requestId: data.requestId, reason: data.reason });
            } else if (data.type === "compile-denied") {
              notify("Compile request denied.");
            } else if (data.type === "done") {
              setCompileApproval(null);
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
                setChanges((list) => [...list, ...hideAlreadyApplied(fresh)]);
                setReviewHidden(false);
                if (fresh[0].file) void openFile(fresh[0].file);
              }
            } else if (data.type === "memory") {
              notify(t("memoryUpdated"));
            } else if (data.type === "summary") {
              setChat((current) => (current ? { ...current, summary: data.summary || current.summary, summaryCount: Number(data.summaryCount) || current.summaryCount } : current));
              notify(t("chatSummarized"));
            } else if (data.type === "error" || data.type === "aborted") {
              setCompileApproval(null);
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

      const queueChat = useCallback((text, steer = false) => {
        const value = String(text || "").trim();
        if (!value || !chat || !chatAgent) return;
        setChatInput("");
        if (!chatBusy) { void sendChat(value); return; }
        const item = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, text: value, steer };
        setChatQueue((list) => steer ? [item, ...list] : [...list, item]);
        if (steer) void stopChat();
      }, [chat, chatAgent, chatBusy, sendChat, stopChat]);

      const removeQueued = useCallback((id) => setChatQueue((list) => list.filter((item) => item.id !== id)), []);
      const decideCompile = useCallback(async (decision) => {
        const approval = compileApproval;
        if (!approval || !chatJobRef.current) return;
        try {
          await request("chat/compile-approval", { method: "POST", body: {
            jobId: chatJobRef.current, requestId: approval.requestId, decision,
          } });
          setCompileApproval(null);
        } catch (error) {
          notify(error.message, "err");
        }
      }, [compileApproval, notify]);

      const steerQueued = useCallback((id) => {
        setChatQueue((list) => {
          const item = list.find((entry) => entry.id === id);
          if (!item) return list;
          return [{ ...item, steer: true }, ...list.filter((entry) => entry.id !== id)];
        });
        void stopChat();
      }, [stopChat]);

      useEffect(() => {
        if (chatBusy || !chat || !chatAgent || chatQueue.length === 0) return;
        const next = chatQueue.find((item) => item.steer) || chatQueue[0];
        setChatQueue((list) => list.filter((item) => item.id !== next.id));
        void sendChat(next.text);
      }, [chatBusy, chat, chatAgent, chatQueue, sendChat]);

      useEffect(() => { setChatQueue([]); setCompileApproval(null); }, [chat ? chat.id : null]);

      chatBusyRef.current = chatBusy;
      const queueDecision = useCallback((kind, change) => {
        if (!chat || !chatAgent) return;
        let line = "";
        let snippet = "";
        if (change && change.search !== undefined) {
          snippet = String(change.search).split("\n").find((text) => text.trim()) || "";
          const tab = tabsRef.current.find((item) => item.path === (change.file || activeRef.current));
          const range = tab ? findSearchRange(tab.content, change.search) : null;
          if (range) line = `:${lineNumberAt(tab.content, range.from)}`;
        } else if (change && change.hunk) {
          snippet = (change.hunk.lines || []).filter((part) => part.type !== " ").map((part) => part.text).find((text) => String(text).trim()) || "";
          const match = /^@@ -([0-9]+)/u.exec(change.hunk.header || "");
          if (match) line = `:${match[1]}`;
        }
        const quote = snippet.replace(/\s+/gu, " ").trim().slice(0, 70);
        const label = `${change && change.file ? change.file : "current file"}${line}${quote ? ` · “${quote}${snippet.length > 70 ? "…" : ""}”` : ""}`;
        decisionQueueRef.current.push({ kind, label });
        if (decisionTimerRef.current) clearTimeout(decisionTimerRef.current);
        const flush = () => {
          if (!chat || !chatAgent) { decisionQueueRef.current = []; return; }
          if (chatBusyRef.current) {
            decisionTimerRef.current = setTimeout(flush, 1200);
            return;
          }
          const items = decisionQueueRef.current.splice(0);
          if (items.length === 0) return;
          const groups = {};
          for (const item of items) {
            if (!groups[item.kind]) groups[item.kind] = [];
            if (item.label && !groups[item.kind].includes(item.label)) groups[item.kind].push(item.label);
          }
          const lines = Object.entries(groups).map(([group, labels]) => `${group}: ${labels.join("; ")}`);
          void sendChat(`Decision summary — ${lines.join(" | ")}. Acknowledge briefly in one sentence; do not propose new edits.`);
        };
        decisionTimerRef.current = setTimeout(flush, 1200);
      }, [chat, chatAgent, sendChat]);
      decisionRef.current = queueDecision;

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

      const renameCurrentChat = useCallback(async () => {
        if (!chat || !chatAgent) return;
        const title = window.prompt("Rename chat", chat.title || "");
        if (title === null) return;
        const next = title.replace(/\s+/gu, " ").trim().slice(0, 120);
        if (!next || next === chat.title) return;
        try {
          await request("chat/rename", { method: "POST", body: {
            project: projectIdRef.current, agentId: chatAgent.id, agentScope: chatAgent.scope, chatId: chat.id, title: next,
          } });
          setChat((current) => (current ? { ...current, title: next } : current));
          await refreshChats(chatAgent);
        } catch (error) {
          notify(error.message, "err");
        }
      }, [chat, chatAgent, notify, refreshChats]);

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

      const appendGitLog = useCallback((entry) => {
        setGitLog((lines) => (lines.length > 2000 ? [...lines.slice(-2000), entry] : [...lines, entry]));
      }, []);

      const runGitAction = useCallback(async (action, extra) => {
        const id = projectIdRef.current;
        if (!id) return;
        const command = `git ${action}${extra && extra.file ? ` ${extra.file}` : ""}${extra && extra.message ? ` -m "${String(extra.message).replace(/"/gu, '\\"')}"` : ""}`;
        appendGitLog({ kind: "cmd", text: `$ ${command}` });
        setGitBusy(action);
        try {
          const result = await request("git", { method: "POST", body: { project: id, action, ...(extra || {}) } });
          const output = String(result && result.output ? result.output : "").trim();
          if (output) for (const line of output.split(/\r?\n/u)) appendGitLog({ kind: result && result.ok === false ? "err" : "out", text: line });
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
          appendGitLog({ kind: "err", text: error.message });
          notify(error.message, "err");
          return false;
        } finally {
          setGitBusy("");
        }
      }, [appendGitLog, gitDiffOpen, notify, openProject, refreshCatalog, refreshGit, t]);

      useEffect(() => {
        if (explorerTab !== "git" || !project) return;
        void refreshGit({ diff: gitDiffOpen });
      }, [explorerTab, project, gitDiffOpen, refreshGit]);

      useEffect(() => {
        if (!project) return undefined;
        const refresh = () => { if (!document.hidden) void refreshGit({ diff: gitDiffOpen }); };
        const timer = setInterval(refresh, 30_000);
        window.addEventListener("focus", refresh);
        return () => {
          clearInterval(timer);
          window.removeEventListener("focus", refresh);
        };
      }, [project, gitDiffOpen, refreshGit]);

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

      useEffect(() => {
        const id = project ? project.id : null;
        if (!id) return;
        const page = Number(pdfPagesRef.current[id]) || 1;
        pdfPageRef.current = page;
        setPdfPage(page);
      }, [project ? project.id : null]);

      useEffect(() => {
        if (!pdfOpen || !project || rightTab !== "pdf" || pdf.mode !== "pages") return;
        const scroll = pdfScrollRef.current;
        if (!scroll) return;
        const page = Math.max(1, Math.min(pdf.pages, pdfPageRef.current));
        requestAnimationFrame(() => {
          const target = scroll.querySelector(`[data-page="${page}"]`);
          if (target) scroll.scrollTop = target.offsetTop;
        });
      }, [pdfOpen, project ? project.id : null, rightTab, pdf.mode, pdf.rev, pdf.pages]);

      // Persist unsaved buffers so a Harness panel remount cannot lose them.
      useEffect(() => {
        const id = projectIdRef.current;
        for (const tab of tabs) {
          const key = draftKey(id, tab.path);
          clearTimeout(draftTimers.current.get(key));
          if (!tab.dirty) {
            clearDraft(id, tab.path);
            draftTimers.current.delete(key);
            continue;
          }
          draftTimers.current.set(key, setTimeout(() => {
            writeDraft(id, tab.path, tab.content, tab.mtime);
            draftTimers.current.delete(key);
          }, 250));
        }
      }, [tabs]);

      useEffect(() => () => {
        const id = projectIdRef.current;
        for (const tab of tabsRef.current) if (tab.dirty) writeDraft(id, tab.path, tab.content, tab.mtime);
      }, []);

      useEffect(() => {
        const flush = () => {
          const id = projectIdRef.current;
          for (const tab of tabsRef.current) if (tab.dirty) writeDraft(id, tab.path, tab.content, tab.mtime);
        };
        window.addEventListener("beforeunload", flush);
        return () => window.removeEventListener("beforeunload", flush);
      }, []);

      // Persist light UI state.
      useEffect(() => {
        const timer = setTimeout(() => {
          const id = projectIdRef.current;
          const restored = Boolean(id) && restoredChatFor.current === id;
          const saved = readUi();
          writeUi({
            projectId: id,
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
            cursors: cursorByPath.current,
            // Do not blank the saved chat before the async restore has had a
            // chance to read it (this used to erase it after every reload).
            chatAgentId: restored || chatAgent ? (chatAgent ? chatAgent.id : "") : (saved.chatAgentId || ""),
            chatAgentScope: restored || chatAgent ? (chatAgent ? chatAgent.scope : "") : (saved.chatAgentScope || ""),
            chatId: restored || chatAgent ? (chat ? chat.id : "") : (saved.chatId || ""),
            rightTab: restored ? rightTab : (saved.rightTab || rightTab),
            pdfPages: pdfPagesRef.current,
            outlineOpen, outlineMath, outlineFloats, outlineHeight,
          });
        }, 300);
        return () => clearTimeout(timer);
      }, [tabs, active, explorerOpen, pdfOpen, zoom, dock, dockHeight, explorerWidth, pdfPct, explorerTab, cursor, chatAgent, chat, rightTab, pdfPage, outlineOpen, outlineMath, outlineFloats, outlineHeight]);

      // Cursor refresh when switching files.
      useEffect(() => {
        const tab = tabsRef.current.find((item) => item.path === active);
        const caret = cursorByPath.current[active] || 0;
        const content = tab ? tab.content : "";
        const position = Math.max(0, Math.min(content.length, caret));
        const before = content.slice(0, position);
        setCursor({ line: before.split("\n").length, col: position - before.lastIndexOf("\n") });
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
          const current = tabsRef.current.find((item) => item.path === path);
          if (!current || current.content === tab.content) clearDraft(id, path);
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
          setSymbols(normalizeSymbols(data));
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
          const tab = tabsRef.current.find((item) => item.path === path);
          if (!tab) return;
          const position = Math.max(0, Math.min(tab.content.length, caret || 0));
          const api = editorApiRef.current;
          if (api && api.selectRangeSilent) api.selectRangeSilent(position, position);
          else if (api && api.selectRange) api.selectRange(position, position);
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
          resolvedContentRef.current.delete(changeFingerprint(change));
          persistResolved();
          setChanges((list) => (list.some((entry) => entry.id === change.id) ? list : [change, ...list]));
          setReviewHidden(false);
        }
        restoreCaret(path, snapshot.caret);
      }, [persistResolved, restoreCaret, saveTab, scheduleAutosave]);

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
          rememberResolved(change);
          setChanges((list) => list.filter((entry) => entry.id !== change.id));
        }
        restoreCaret(path, snapshot.caret);
      }, [rememberResolved, restoreCaret, saveTab, scheduleAutosave]);

      const closeTab = useCallback((path) => {
        const tab = tabsRef.current.find((item) => item.path === path);
        if (tab && tab.dirty && !window.confirm(t("closeDirty"))) return;
        clearTimeout(saveTimers.current.get(path));
        saveTimers.current.delete(path);
        clearDraft(projectIdRef.current, path);
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
        const path = textarea.path || activeRef.current;
        if (path) cursorByPath.current[path] = position;
        const before = String(textarea.value || "").slice(0, position);
        const index = before.lastIndexOf("\n");
        setCursor({ line: before.split("\n").length, col: position - index });
      }, []);

      const onScroll = useCallback((event) => {
        const textarea = event.currentTarget;
        if (activeRef.current) scrollByPath.current[activeRef.current] = textarea.scrollTop;
      }, []);
      const getScroll = useCallback((path) => scrollByPath.current[path] || 0, []);

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
          clearDraft(id, path);
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
      const outline = useMemo(
        () => currentTab && /\.tex$/iu.test(currentTab.path) ? buildOutline(currentTab.content) : [],
        [currentTab ? currentTab.path : "", currentTab ? currentTab.content : ""],
      );
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
          title = t("brainTitle");
          body = [
            h("div", { className: "ps-hint", key: "hint" }, `${dialog.agentName || ""} · ${t("memoryHint")}`),
            h("label", { className: "ps-field-row", key: "effort" },
              h("span", null, t("thinkingEffort")),
              h("select", {
                className: "ps-select", value: dialog.effort || "default",
                onChange: (event) => setDialog({ ...dialog, effort: event.target.value }),
              },
              h("option", { value: "default" }, t("effortDefault")),
              h("option", { value: "off" }, t("effortOff")),
              h("option", { value: "low" }, t("effortLow")),
              h("option", { value: "high" }, t("effortHigh")),
              h("option", { value: "max" }, t("effortMax")))),
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
                  await request("chat/thinking", { method: "POST", body: {
                    project: projectIdRef.current, agentId: dialog.agentId, chatId: dialog.chatId,
                    effort: dialog.effort === "default" ? "" : dialog.effort,
                  } });
                  setChat((current) => (current && current.id === dialog.chatId
                    ? { ...current, memory: dialog.draft.trim(), ...(dialog.effort && dialog.effort !== "default" ? { reasoningEffort: dialog.effort } : { reasoningEffort: undefined }) }
                    : current));
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
        } else if (dialog.kind === "context") {
          const pins = chat && Array.isArray(chat.pins) ? chat.pins : [];
          const systemChars = chat ? String(chat.systemPrompt || "").length : 0;
          const memoryChars = chat ? String(chat.memory || "").length : 0;
          const summaryChars = chat ? String(chat.summary || "").length : 0;
          const selectionChars = chat && chat.context ? String(chat.context.text || "").length : 0;
          const pinChars = pins.reduce((total, pin) => total + String(pin.text || "").length, 0);
          const messageChars = chat && Array.isArray(chat.messages) ? chat.messages.reduce((total, message) => total + String(message.content || "").length, 0) : 0;
          const totalChars = systemChars + memoryChars + summaryChars + selectionChars + pinChars + messageChars;
          const budget = CONTEXT_BUDGET_CHARS;
          title = "Context";
          body = [
            h("div", { className: "ps-context-total", key: "total" },
              h("b", null, `${totalChars.toLocaleString()} chars`),
              ` · ~${Math.ceil(totalChars / 4).toLocaleString()} tokens · ${Math.round(totalChars / budget * 100)}% of ${budget.toLocaleString()} budget`),
            h("div", { className: "ps-context-layer", key: "system" }, h("span", null, "System prompt"), h("code", null, `${systemChars.toLocaleString()}`)),
            h("div", { className: "ps-context-layer", key: "memory" }, h("span", null, "Memory"), h("code", null, `${memoryChars.toLocaleString()}`)),
            h("div", { className: "ps-context-layer", key: "summary" }, h("span", null, "Conversation summary"), h("code", null, `${summaryChars.toLocaleString()}`)),
            h("div", { className: "ps-context-layer", key: "selection" }, h("span", null, "Legacy selection"), h("code", null, `${selectionChars.toLocaleString()}`)),
            h("div", { className: "ps-context-layer", key: "messages" }, h("span", null, "Messages"), h("code", null, `${messageChars.toLocaleString()}`)),
            h("div", { className: "ps-context-layer", key: "pins" }, h("span", null, `Pins (${pins.length})`), h("code", null, `${pinChars.toLocaleString()}`)),
            h("div", { className: "ps-context-layer", key: "literature" }, h("span", null, `Literature (${chat && Array.isArray(chat.literature) ? chat.literature.length : 0})`), h("code", null, `${chat && Array.isArray(chat.literature) ? chat.literature.reduce((total, item) => total + String(item.title || "").length + String(item.abstract || "").length, 0).toLocaleString() : "0"}`)),
            pins.length > 0 ? h("div", { className: "ps-context-pins", key: "pin-list" }, pins.map((pin, index) => h("div", { className: "ps-context-pin", key: index },
              h("span", null, `${pin.path || ""}${pin.startLine ? `:${pin.startLine}${pin.endLine && pin.endLine !== pin.startLine ? `-${pin.endLine}` : ""}` : ""}`),
              h("button", { className: "ps-btn icon", type: "button", title: "Unpin", onClick: () => { void removePin(index); } }, "×")))) : h("div", { className: "ps-hint", key: "no-pins" }, "No pinned context."),
            h("div", { className: "ps-context-actions", key: "pin-current" },
              h("button", { className: "ps-btn", type: "button", onClick: () => { void pinCurrentFile(); } }, "Pin current file")),
          ];
          actions = h("button", { className: "ps-btn", type: "button", onClick: () => setDialog(null) }, t("close"));
        } else if (dialog.kind === "image") {
          title = t("imagePreview");
          body = [
            h("div", { className: "ps-image-path", key: "path" },
              h("code", { title: `${project.path}/${dialog.path}` }, `${project.path}/${dialog.path}`),
              h("button", { className: "ps-btn", type: "button", onClick: () => { void copyPath(`${project.path}/${dialog.path}`); } }, t("copyPath"))),
            h("img", {
              className: "ps-image-view", key: "image", alt: dialog.path,
              src: apiUrl("raw", { project: project.id, path: dialog.path }),
            }),
          ];
          actions = h(React.Fragment, null,
            h("button", { className: "ps-btn", type: "button", onClick: () => window.open(apiUrl("raw", { project: project.id, path: dialog.path }), "_blank", "noopener") }, t("openImageInNewTab")),
            h("button", { className: "ps-btn", type: "button", onClick: () => setDialog(null) }, t("close")));
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
            className: `ps-btn${chatAgent ? " active" : ""}`, type: "button", title: t("chatTab"),
            onClick: () => {
              if (chatAgent) { setPdfOpen(true); setRightTab("chat"); }
              else setDialog({ kind: "agents", context: null });
            },
          }, h(Icon.chat), h("span", { className: "ps-hide-narrow" }, t("chatTab"))) : null,
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
            project ? h("div", { className: "ps-path-bar" },
              h("code", { title: project.path }, project.path),
              h("button", { className: "ps-btn icon", type: "button", title: t("copyPath"), "aria-label": t("copyPath"), onClick: () => { void copyPath(project.path); } }, "⧉")) : null,
            explorerTab === "files" && currentTab && /\.tex$/iu.test(currentTab.path) && outline.length > 0 ? h("div", { className: "ps-outline", style: { height: `${outlineHeight}px` } },
              h("div", { className: "ps-outline-head" },
                h("button", {
                  className: "ps-btn", type: "button",
                  onClick: () => setOutlineOpen((value) => !value),
                }, outlineOpen ? "▾ Outline" : "▸ Outline"),
                h("label", { className: "ps-outline-toggle" },
                  h("input", { type: "checkbox", checked: outlineMath, onChange: (event) => setOutlineMath(event.target.checked) }), "Eqs"),
                h("label", { className: "ps-outline-toggle" },
                  h("input", { type: "checkbox", checked: outlineFloats, onChange: (event) => setOutlineFloats(event.target.checked) }), "Figs")),
              outlineOpen ? h("div", { className: "ps-outline-list" },
                outline
                  .filter((entry) => ["chapter", "section", "subsection"].includes(entry.kind)
                    || (entry.kind === "equation" && outlineMath)
                    || (["figure", "table"].includes(entry.kind) && outlineFloats))
                  .slice(0, 300)
                  .map((entry, index) => h("button", {
                    key: `${entry.kind}-${entry.line}-${index}`,
                    className: `ps-outline-item ${entry.kind}`,
                    type: "button",
                    title: `Line ${entry.line}`,
                    onClick: () => jumpToLine(currentTab.path, entry.line),
                  },
                  h("span", { className: "ps-outline-kind" },
                    entry.kind === "equation" ? `(${entry.number || "—"})`
                      : entry.kind === "table" ? `Tab ${entry.number || "—"}`
                        : entry.kind === "figure" ? `Fig ${entry.number || "—"}`
                          : entry.number || ""),
                  h("span", { className: "ps-outline-text" }, entry.text)))) : null) : null,
            explorerTab === "files" && currentTab && /\.tex$/iu.test(currentTab.path) && outline.length > 0
              ? h("div", { className: "ps-outline-resizer", title: "Drag to resize the outline", onPointerDown: startOutlineResize })
              : null,
            explorerTab === "git" ? h(GitView, {
              t,
              info: gitInfo,
              diff: gitDiff,
              diffOpen: gitDiffOpen,
              busy: gitBusy,
              onAction: (action, extra) => { void runGitAction(action, extra); },
              onCommit: (message) => runGitAction("commit", { message }),
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
              onOpenDiff: () => { void openGitReview(); },
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
                    onContextMenu: (event) => {
                      event.preventDefault();
                      setTreeMenu({ x: event.clientX, y: event.clientY, path: entry.path, dir: entry.dir });
                    },
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
            onScroll, getScroll, onCursor, initialCaret: cursorByPath.current[active] || 0,
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
            onRetryChange: retryChange,
            onUpdateChange: updateChange,
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
                onClose: () => { setChatAgent(null); setChat(null); setChanges([]); setRightTab("pdf"); },
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
                queued: chatQueue,
                onQueue: (text) => queueChat(text, false),
                onSteer: (text) => queueChat(text, true),
                onRemoveQueued: removeQueued,
                onShowContext: () => setDialog({ kind: "context" }),
                onRenameChat: renameCurrentChat,
                onUnpin: (index) => { void removePin(index); },
                onSteerQueued: steerQueued,
                compileApproval,
                onCompileDecision: decideCompile,
              })
              : pdf.mode === "pages"
              ? h("div", {
                className: "ps-pdf-scroll",
                ref: pdfScrollRef,
                onScroll: (event) => {
                  const scroll = event.currentTarget;
                  const top = scroll.getBoundingClientRect().top + 8;
                  let page = 1;
                  for (const box of scroll.querySelectorAll("[data-page]")) {
                    if (box.getBoundingClientRect().top <= top) page = Number(box.dataset.page) || page;
                    else break;
                  }
                  pdfPageRef.current = page;
                  if (project) pdfPagesRef.current[project.id] = page;
                  if (page !== pdfPage) setPdfPage(page);
                },
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
            gitLog, onClearGit: () => setGitLog([]),
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

        treeMenu ? h("div", {
          className: "ps-tree-menu",
          style: { left: Math.max(6, Math.min(treeMenu.x, (window.innerWidth || 1200) - 210)), top: Math.max(6, Math.min(treeMenu.y, (window.innerHeight || 800) - 120)) },
          onPointerDown: (event) => event.stopPropagation(),
        },
        h("button", { className: "ps-ctx-item", type: "button", onClick: () => { void copyPath(`${project.path}/${treeMenu.path}`); setTreeMenu(null); } }, "Copy path"),
        !treeMenu.dir ? h("button", { className: "ps-ctx-item", type: "button", onClick: () => { void pinPath(treeMenu.path); setTreeMenu(null); } }, "Pin to chat") : null) : null,
        gitReview ? h(GitDiffPopup, { t, patch: gitDiff, onClose: () => setGitReview(false) }) : null,
        renderDialog(),
        toast ? h("div", { className: `ps-toast${toast.kind === "err" ? " err" : ""}`, role: "status" }, toast.message) : null,
        h(Explosion, { nonce: boom, onDone: clearBoom }));
    }

    // -- plugin ------------------------------------------------------------
    return {
      inject: ["slots", "locale", "layout"],
      /** Pure helpers exercised by test/client.test.mjs (no browser needed). */
      __internals: { CSS, Studio, GitDiffPopup, EditorPane, Dock, FolderPicker, PdfPage, GitView, Explosion, ChatPane, parseDiffSuggestions, applySuggestion, stripDiffBlocks, collectChanges, diffChangeKey, parseChoiceBlocks, stripChoiceBlocks, splitMath, diffLineKinds, normalizeSymbols, rebaseHunk, equationAtCursor, buildOutline, inMathContext, usepackagePackages, changeFingerprint, changeAlreadyApplied, inlineWordDiff, pairHunkLines, parseEditSuggestions, findSearchRange, applySearchReplace, searchHunk, highlightLatex, highlightLines, completionContext, completionItems, escapeHtml, DEFAULT_SYNTAX, syntaxVariables, bindingFromEvent, matchesBinding, orderPageWords, environmentSnippet, bracketMatch, vimTextObject, shouldCompileAfterSave },
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
