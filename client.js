window.__ModuleLoader__.load({
  id: "@local/paper-studio",
  factory(require) {
    const React = require("react");
    const h = React.createElement;
    const { useCallback, useEffect, useMemo, useRef, useState } = React;

    const PANEL_ID = "paper-studio";
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
        settings: "Project settings",
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
.ps-btn.primary:hover:not(:disabled){filter:brightness(1.07);background:var(--dsw-alias-brand-primary)}
.ps-btn.danger{color:var(--dsw-alias-state-error-primary)}
.ps-btn.danger:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);color:var(--dsw-alias-state-error-primary)}
.ps-btn svg{width:14px;height:14px;flex:none}
.ps-spacer{flex:1;min-width:4px}
.ps-status{display:inline-flex;align-items:center;gap:5px;color:var(--dsw-alias-label-secondary);font-size:12px;white-space:nowrap;padding:0 4px;max-width:250px;overflow:hidden;text-overflow:ellipsis}
.ps-status.ok{color:var(--dsw-alias-state-success-primary)}
.ps-status.err{color:var(--dsw-alias-state-error-primary)}
.ps-status .ps-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex:none}
.ps-toggle{display:inline-flex;align-items:center;gap:5px;color:var(--dsw-alias-label-secondary);font-size:12px;cursor:pointer;white-space:nowrap;padding:0 4px;user-select:none}
.ps-toggle input{accent-color:var(--dsw-alias-brand-primary);margin:0}
.ps-main{flex:1;min-height:0;display:grid;overflow:hidden}
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
.ps-gutter{flex:none;min-width:44px;overflow:hidden;padding:8px 6px 8px 10px;text-align:right;font:13px/20px ${MONO};color:var(--dsw-alias-label-secondary);user-select:none;border-right:.5px solid var(--dsw-alias-border-l1);opacity:.75}
.ps-gutter-inner{will-change:transform}
.ps-code{flex:1;min-width:0;border:0;outline:0;resize:none;background:transparent;color:var(--dsw-alias-label-primary);font:13px/20px ${MONO};padding:8px 18px 8px 10px;tab-size:2;white-space:pre;overflow:auto}
.ps-code::selection{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 30%,transparent)}
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
.ps-pdf-scroll{flex:1;min-height:0;overflow:auto;background:var(--dsw-alias-bg-layer-1);padding:12px}
.ps-pages{width:var(--ps-zoom,100%);min-width:280px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.ps-page{width:100%;display:block;background:#fff;border-radius:2px;box-shadow:0 1px 5px rgba(0,0,0,.2)}
.ps-frame{flex:1;width:100%;border:0;background:#fff;min-height:0}
.ps-pdf-foot{flex:none;display:flex;align-items:center;gap:8px;height:26px;padding:0 10px;border-top:.5px solid var(--dsw-alias-border-l1);font-size:11px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.ps-zoom{display:inline-flex;align-items:center;gap:3px}
.ps-zoom select{height:20px;background:transparent;border:.5px solid var(--dsw-alias-border-l2);border-radius:5px;color:var(--dsw-alias-label-primary);font:inherit;font-size:11px;outline:none;padding:0 2px}
.ps-drawer{flex:none;display:flex;flex-direction:column;height:196px;border-top:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}
.ps-drawer-head{flex:none;display:flex;align-items:center;gap:2px;height:30px;padding:0 6px 0 6px;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.ps-drawer-tab{height:23px;padding:0 9px;border:0;border-radius:5px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11.5px;cursor:pointer}
.ps-drawer-tab.active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
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
.ps-modal-foot{flex:none;display:flex;justify-content:flex-end;gap:8px;padding:10px 18px 16px}
.ps-modal-foot .ps-btn{height:30px}
.ps-field{display:flex;flex-direction:column;gap:5px;min-width:0}
.ps-label{font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.ps-input,.ps-textarea{width:100%;min-width:0;background:var(--dsw-alias-bg-base);border:.5px solid var(--dsw-alias-border-l2);border-radius:8px;color:var(--dsw-alias-label-primary);font:inherit;font-size:12.5px;padding:7px 9px;outline:none}
.ps-input:focus,.ps-textarea:focus{border-color:var(--dsw-alias-brand-primary)}
.ps-hint{font-size:11px;line-height:1.5;color:var(--dsw-alias-label-secondary);opacity:.9}
.ps-error{font-size:11.5px;color:var(--dsw-alias-state-error-primary);white-space:pre-wrap}
.ps-output{margin:0;max-height:180px;overflow:auto;padding:8px 10px;border:.5px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);font:11px/16px ${MONO};white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-secondary)}
.ps-toast{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);z-index:50;display:flex;align-items:center;gap:8px;max-width:min(520px,80%);padding:8px 12px;border-radius:9px;background:var(--dsw-alias-bg-overlay);border:.5px solid var(--dsw-alias-border-l2);box-shadow:0 8px 24px rgba(0,0,0,.22);font-size:12px;color:var(--dsw-alias-label-primary)}
.ps-toast.err{color:var(--dsw-alias-state-error-primary)}
.ps-spin{animation:ps-spin .9s linear infinite;transform-origin:50% 50%}
@keyframes ps-spin{to{transform:rotate(360deg)}}
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

    function EditorPane(props) {
      const {
        t, tabs, activePath, tab, cursor, compile, autoCompile, status, onSelectTab, onCloseTab,
        onEdit, onCompile, onSave, editorRef, gutterInnerRef, onScroll, onCursor, onInsertText,
        onReloadDisk, onKeepMine, saving, showDrawer, drawerTab, onDrawerTab, onCloseDrawer,
      } = props;
      const lineCount = useMemo(() => (tab ? tab.content.split("\n").length : 0), [tab ? tab.content : ""]);
      const numbers = useMemo(() => {
        const list = new Array(lineCount);
        for (let index = 0; index < lineCount; index += 1) list[index] = index + 1;
        return list;
      }, [lineCount]);
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
        tab ? h("div", { className: "ps-code-wrap" },
          h("div", { className: "ps-gutter", ref: null },
            h("div", { className: "ps-gutter-inner", ref: gutterInnerRef },
              numbers.map((number) => h("div", { key: number }, number)))),
          h("textarea", {
            ref: editorRef,
            className: "ps-code",
            value: tab.content,
            spellCheck: false,
            wrap: "off",
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            "aria-label": tab.path,
            onChange: (event) => onEdit(tab.path, event.target.value),
            onScroll,
            onSelect: onCursor,
            onClick: onCursor,
            onKeyDown: (event) => {
              if (event.key === "Tab" && !event.ctrlKey && !event.metaKey && !event.altKey) {
                event.preventDefault();
                onInsertText("  ");
              }
            },
          })) : h(EmptyState, {
          icon: Icon.file,
          title: t("noFileTitle"),
          body: t("noFileBody"),
        }),
        tab ? h("div", { className: "ps-code-foot" },
          h("span", { className: "ps-grow", title: tab.path }, tab.path),
          h("span", null, fmt(t("lineCol"), cursor)),
          h("span", null, fmt(t("lines"), { count: lineCount })),
          h("span", { className: compile && !compile.ok ? "ps-status err" : "ps-status" },
            status.kind === "saving" || tab.saving ? t("saving") : tab.dirty ? t("unsaved") : t("saved"))) : null,
        showDrawer ? h("div", { className: "ps-drawer" },
          h("div", { className: "ps-drawer-head" },
            h("button", { className: `ps-drawer-tab${drawerTab === "problems" ? " active" : ""}`, type: "button", onClick: () => onDrawerTab("problems") },
              t("problems"),
              compile && compile.errors && compile.errors.length > 0 ? h("span", { className: "ps-count" }, compile.errors.length) : null),
            h("button", { className: `ps-drawer-tab${drawerTab === "log" ? " active" : ""}`, type: "button", onClick: () => onDrawerTab("log") }, t("log")),
            h("div", { className: "ps-spacer" }),
            compile ? h("span", { className: "ps-status", style: { fontSize: 11 } }, compile.ok ? `${t("saved")} · ${formatDuration(compile.durationMs)}` : t("compileFailed")) : null,
            h("button", { className: "ps-btn icon", type: "button", onClick: onCloseDrawer, "aria-label": t("close") }, h(Icon.close))),
          drawerTab === "problems"
            ? h("div", { className: "ps-problems" },
              compile && compile.errors && compile.errors.length > 0
                ? compile.errors.map((problem, index) => h("button", {
                  key: `${problem.file}:${problem.line}:${index}`,
                  className: "ps-problem err",
                  type: "button",
                  title: problem.message,
                  onClick: () => props.onOpenProblem(problem),
                },
                h("span", { className: "ps-problem-loc" }, `${problem.file}${problem.line ? `:${problem.line}` : ""}`),
                h("span", { className: "ps-problem-msg" }, problem.message)))
                : h("div", { className: "ps-status", style: { padding: "10px 6px" } }, t("noProblems")))
            : h("pre", { className: "ps-log" }, compile && compile.log ? compile.log : "")) : null);
    }

    // -- main component ----------------------------------------------------
    function Studio(props) {
      const t = props.t || ((key) => key);
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
      const [autoCompile, setAutoCompile] = useState(() => Boolean(readUi().autoCompile));
      const [zoom, setZoom] = useState(() => Number(readUi().zoom) || 100);
      const [pdf, setPdf] = useState({ rev: null, pages: 0, mode: "none" });
      const [compile, setCompile] = useState(null);
      const [compiling, setCompiling] = useState(false);
      const [drawerOpen, setDrawerOpen] = useState(false);
      const [drawerTab, setDrawerTab] = useState("problems");
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
      const saveTimers = useRef(new Map());
      const saveChains = useRef(new Map());
      const mtimeByPath = useRef({});
      const scrollByPath = useRef({});
      const pendingLine = useRef(null);
      const autoCompileRef = useRef(autoCompile);
      const compileTimer = useRef(null);
      const toastTimer = useRef(null);
      const compilingRef = useRef(false);

      useEffect(() => { tabsRef.current = tabs; }, [tabs]);
      useEffect(() => { projectIdRef.current = project ? project.id : null; projectRef.current = project; }, [project]);
      useEffect(() => { activeRef.current = active; }, [active]);
      useEffect(() => { autoCompileRef.current = autoCompile; }, [autoCompile]);

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

      const jumpToLine = useCallback((path, line) => {
        const textarea = editorRef.current;
        const tab = tabsRef.current.find((item) => item.path === path);
        if (!textarea || !tab || !line) return;
        const lines = tab.content.split("\n");
        const index = Math.max(0, Math.min(lines.length - 1, line - 1));
        const offset = lines.slice(0, index).reduce((sum, text) => sum + text.length + 1, 0);
        textarea.focus();
        textarea.setSelectionRange(offset, offset + lines[index].length);
        textarea.scrollTop = Math.max(0, index * 20 - 60);
        if (gutterInnerRef.current) gutterInnerRef.current.style.transform = `translateY(${-textarea.scrollTop}px)`;
        setCursor({ line: index + 1, col: 1 });
      }, []);

      const openFile = useCallback(async (path, line) => {
        const id = projectIdRef.current;
        if (!id || !path) return;
        const existing = tabsRef.current.find((item) => item.path === path);
        if (existing) {
          const alreadyActive = activeRef.current === path;
          setActive(path);
          activeRef.current = path;
          if (line) {
            if (alreadyActive) jumpToLine(path, line);
            else pendingLine.current = { path, line };
          }
          return;
        }
        try {
          const file = await request("file", { query: { project: id, path } });
          const tab = { path, content: file.content, saved: file.content, mtime: file.mtime, dirty: false, saving: false, conflict: null };
          mtimeByPath.current[path] = file.mtime;
          setTabs((list) => [...list.filter((item) => item.path !== path), tab]);
          setActive(path);
          activeRef.current = path;
          if (line) pendingLine.current = { path, line };
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
          setTabs([]);
          tabsRef.current = [];
          setActive(null);
          activeRef.current = null;
          setCompile(null);
          setDrawerOpen(false);
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
          tabsRef.current = loaded;
          const preferred = restoreTabs && ui.active && loaded.some((item) => item.path === ui.active) ? ui.active : loaded[0] ? loaded[0].path : null;
          setActive(preferred);
          activeRef.current = preferred;
          request("pdf-info", { query: { project: id } }).then((info) => {
            if (projectIdRef.current !== id) return;
            if (info && info.exists) setPdf({ rev: info.rev, pages: info.renderedPages, mode: info.renderedPages > 0 ? "pages" : "iframe" });
          }).catch(() => {});
          setStatus({ kind: "idle" });
          setDrawerOpen(false);
        } catch (error) {
          setStatus({ kind: "error", message: error.message });
          notify(error.message, "err");
        }
      }, [notify]);

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
            autoCompile,
            zoom,
          });
        }, 300);
        return () => clearTimeout(timer);
      }, [tabs, active, explorerOpen, pdfOpen, autoCompile, zoom]);

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
        jumpToLine(pending.path, pending.line);
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
          if (autoCompileRef.current) {
            clearTimeout(compileTimer.current);
            compileTimer.current = setTimeout(() => { void runCompileRef.current(); }, 900);
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

      const runCompile = useCallback(async () => {
        const id = projectIdRef.current;
        if (!id || compilingRef.current) return;
        compilingRef.current = true;
        setCompiling(true);
        setStatus({ kind: "compiling" });
        try {
          const dirty = tabsRef.current.filter((item) => item.dirty && !item.conflict);
          await Promise.all(dirty.map((item) => saveTab(item.path)));
          const result = await request("compile", { method: "POST", body: { project: id } });
          setCompile(result);
          if (result.ok) {
            setPdf({ rev: result.rev, pages: result.renderedPages, mode: result.renderedPages > 0 ? "pages" : "iframe" });
            setDrawerOpen(false);
            setStatus({ kind: "ok", at: Date.now() });
            notify(fmt(t("compileOk"), { pages: result.pages, time: formatDuration(result.durationMs) }));
          } else {
            setDrawerOpen(true);
            setDrawerTab("problems");
            setStatus({ kind: "error", message: fmt(t("compileFailedWith"), { count: result.errors.length }) });
            notify(t("compileFailed"), "err");
          }
          void refreshTree();
        } catch (error) {
          setStatus({ kind: "error", message: error.message });
          setCompile({ ok: false, log: String(error.message), errors: [] });
          setDrawerOpen(true);
          setDrawerTab("log");
          notify(error.message, "err");
        } finally {
          compilingRef.current = false;
          setCompiling(false);
        }
      }, [notify, refreshTree, saveTab, t]);

      const runCompileRef = useRef(runCompile);
      useEffect(() => { runCompileRef.current = runCompile; }, [runCompile]);

      // Global shortcuts while the panel is the selected main panel.
      useEffect(() => {
        if (!panelActive) return undefined;
        const onKeyDown = (event) => {
          const mod = event.metaKey || event.ctrlKey;
          if (!mod) return;
          if (event.key === "s" || event.key === "S") {
            event.preventDefault();
            if (activeRef.current) void saveTab(activeRef.current);
          } else if (event.key === "Enter") {
            event.preventDefault();
            void runCompileRef.current();
          }
        };
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown, true);
      }, [panelActive, saveTab]);

      // Escape closes the topmost dialog.
      useEffect(() => {
        if (!dialog) return undefined;
        const onKeyDown = (event) => { if (event.key === "Escape") { setDialog(null); setDialogError(""); } };
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown, true);
      }, [dialog]);

      useEffect(() => () => {
        clearTimeout(toastTimer.current);
        clearTimeout(compileTimer.current);
        for (const timer of saveTimers.current.values()) clearTimeout(timer);
      }, []);

      const onEdit = useCallback((path, content) => {
        setTabs((list) => list.map((item) => (item.path === path ? { ...item, content, dirty: content !== item.saved } : item)));
        clearTimeout(saveTimers.current.get(path));
        saveTimers.current.set(path, setTimeout(() => {
          saveTimers.current.delete(path);
          void saveTab(path);
        }, 850));
      }, [saveTab]);

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
        if (gutterInnerRef.current) gutterInnerRef.current.style.transform = `translateY(${-textarea.scrollTop}px)`;
      }, []);

      const insertText = useCallback((text) => {
        const textarea = editorRef.current;
        const path = activeRef.current;
        if (!textarea || !path) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const next = textarea.value.slice(0, start) + text + textarea.value.slice(end);
        onEdit(path, next);
        requestAnimationFrame(() => {
          textarea.selectionStart = start + text.length;
          textarea.selectionEnd = start + text.length;
          onCursor({ currentTarget: textarea });
        });
      }, [onCursor, onEdit]);

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
          setGitState((state) => ({ ...state, busy: false, status: result, output: result.output || state.output }));
          if (action !== "status") notify(result.ok ? `${action} ok` : `${action} failed`, result.ok ? "" : "err");
          await refreshCatalog();
        } catch (error) {
          setGitState((state) => ({ ...state, busy: false, output: error.message }));
          notify(error.message, "err");
        }
      }, [notify, refreshCatalog]);

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
          } else if (dialog.kind === "settings") {
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
      }, [closeTab, dialog, notify, openFile, openProject, refreshCatalog, refreshTree, t]);

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
      const statusView = (() => {
        if (compiling) return { kind: "", text: t("compiling"), spin: true };
        if (status.kind === "error") return { kind: "err", text: status.message || t("error") };
        if (compile && !compile.ok) return { kind: "err", text: fmt(t("compileFailedWith"), { count: compile.errors ? compile.errors.length : 0 }) };
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
            field(t("path"), "path", { placeholder: catalog.newProjectRoot ? `${catalog.newProjectRoot}/ising-model-paper` : "~/Documents/Papers/…", hint: t("pathHint") }),
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
            field(t("path"), "path", { placeholder: "/home/me/papers/existing-paper", hint: t("addFolderHint") }),
            field(t("nameOptional"), "name", { placeholder: "" }),
          ];
          actions = footer(t("add"));
        } else if (dialog.kind === "clone") {
          title = t("cloneOverleaf");
          body = [
            field("Overleaf URL", "url", { placeholder: "https://www.overleaf.com/project/…", hint: t("remoteHint") }),
            field(t("token"), "token", { type: "password", hint: t("tokenHint") }),
            field(t("nameOptional"), "name", { placeholder: "My paper" }),
            field(t("path"), "path", { placeholder: "~/Documents/Papers/my-paper", hint: t("pathHint") }),
            h("span", { className: "ps-hint", key: "clone-hint" }, t("cloneHint")),
          ];
          actions = footer(t("clone"));
        } else if (dialog.kind === "settings") {
          title = t("settings");
          const current = catalog.projects.find((item) => item.id === dialog.projectId) || project || {};
          body = [
            field(t("title"), "name", {}),
            field(t("mainFile"), "mainFile", { placeholder: "main.tex", hint: t("mainFileHint") }),
            field(t("remote"), "remote", { placeholder: "https://git.overleaf.com/…", hint: t("remoteHint") }),
            field(t("token"), "token", { type: "password", placeholder: current.overleaf && current.overleaf.hasToken ? t("tokenSaved") : "", hint: t("tokenHint") }),
            h("div", { className: "ps-git-row", key: "git" },
              h("button", { className: "ps-btn", type: "button", onClick: () => runGit("status") }, t("status")),
              h("button", { className: "ps-btn", type: "button", onClick: () => runGit("pull") }, t("pull")),
              h("button", { className: "ps-btn", type: "button", onClick: () => runGit("push") }, t("push")),
              h("button", { className: "ps-btn", type: "button", onClick: () => runGit("init") }, t("initializeGit"))),
            gitState.output ? h("pre", { className: "ps-output", key: "output" }, gitState.output) : null,
            h("button", {
              className: "ps-btn danger", key: "remove", type: "button",
              onClick: () => openDialog("removeProject", { projectId: dialog.projectId }),
            }, t("removeProject")),
          ];
          actions = footer(t("apply"));
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
        return h(Modal, { title, onClose: () => setDialog(null) },
          body,
          dialogError ? h("span", { className: "ps-error" }, dialogError) : null,
          actions);
      };

      const maxWidthStyle = {
        gridTemplateColumns: `${explorerOpen ? "238px" : "0px"} minmax(0, 1fr) ${pdfOpen ? "44%" : "0px"}`,
      };

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
          catalog.projects.map((item) => h("option", { key: item.id, value: item.id }, item.name))) : null,
          h("button", { className: "ps-btn", type: "button", onClick: () => openDialog("newProject"), title: t("newPaper") },
            h(Icon.plus), h("span", { className: "ps-hide-narrow" }, t("newPaper"))),
          h("button", { className: "ps-btn", type: "button", onClick: () => openDialog("addProject"), title: t("addFolder") },
            h(Icon.folder), h("span", { className: "ps-hide-narrow" }, t("addFolder"))),
          h("button", { className: "ps-btn", type: "button", onClick: () => openDialog("clone"), title: t("cloneOverleaf") },
            h(Icon.git), h("span", { className: "ps-hide-narrow" }, t("cloneOverleaf"))),
          project ? h("button", {
            className: "ps-btn icon", type: "button", title: t("settings"), "aria-label": t("settings"),
            onClick: () => openDialog("settings", {
              projectId: project.id,
              name: project.name,
              mainFile: project.mainFile || "",
              remote: project.overleaf ? project.overleaf.remote : "",
              token: "",
            }),
          }, h(Icon.gear)) : null,
          h("div", { className: "ps-spacer" }),
          h("span", { className: `ps-status ${statusView.kind}` },
            statusView.spin ? h(Icon.refresh, { className: "ps-spin" }) : h("span", { className: "ps-dot" }),
            statusView.text),
          h("label", { className: "ps-toggle", title: t("autoCompile") },
            h("input", { type: "checkbox", checked: autoCompile, onChange: (event) => setAutoCompile(event.target.checked) }),
            h("span", { className: "ps-hide-narrow" }, t("autoCompile"))),
          h("button", {
            className: `ps-btn icon${explorerOpen ? " active" : ""}`, type: "button", title: t("files"), "aria-label": t("files"),
            "aria-pressed": explorerOpen, onClick: () => setExplorerOpen((value) => !value),
          }, h(Icon.panels)),
          h("button", {
            className: `ps-btn icon${pdfOpen ? " active" : ""}`, type: "button", title: t("pdf"), "aria-label": t("pdf"),
            "aria-pressed": pdfOpen, onClick: () => setPdfOpen((value) => !value),
          }, h(Icon.pdf)),
          h("button", {
            className: "ps-btn primary", type: "button", onClick: () => { void runCompile(); },
            disabled: compiling || !project, title: `${t("compile")} (${t("compileHint")})`,
          }, compiling ? h(Icon.refresh, { className: "ps-spin" }) : h(Icon.play), compiling ? t("compiling") : t("compile"))),

        h("div", { className: "ps-main", style: maxWidthStyle },
          project && explorerOpen ? h("section", { className: "ps-pane ps-explorer", "aria-label": t("files") },
            h("div", { className: "ps-pane-head" },
              h("span", { className: "ps-pane-title" }, t("files")),
              h("button", { className: "ps-btn icon", type: "button", title: t("newFile"), "aria-label": t("newFile"), onClick: () => openDialog("newFile", { path: "" }) }, h(Icon.plus)),
              h("button", { className: "ps-btn icon", type: "button", title: t("newFolder"), "aria-label": t("newFolder"), onClick: () => openDialog("newFolder", { path: "" }) }, h(Icon.folder)),
              h("button", { className: "ps-btn icon", type: "button", title: t("refresh"), "aria-label": t("refresh"), onClick: () => { void refreshTree(); } }, h(Icon.refresh))),
            h("div", { className: "ps-tree", role: "tree" },
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
                onClick: () => { openDialog("settings", { projectId: project.id, name: project.name, mainFile: project.mainFile || "", remote: project.overleaf ? project.overleaf.remote : "", token: "" }); void runGit("status"); },
              }, project.overleaf ? t("overleafBadge") : t("gitBadge")))) : null,

          h(EditorPane, {
            t, tabs, activePath: active, tab: currentTab, cursor, compile, autoCompile, status,
            onSelectTab: (path) => { setActive(path); activeRef.current = path; },
            onCloseTab: closeTab,
            onEdit,
            onCompile: runCompile,
            onSave: (path) => { void saveTab(path); },
            editorRef, gutterInnerRef,
            onScroll, onCursor,
            onInsertText: insertText,
            onReloadDisk: reloadDisk,
            onKeepMine: keepMine,
            saving: false,
            showDrawer: drawerOpen,
            drawerTab,
            onDrawerTab: setDrawerTab,
            onCloseDrawer: () => setDrawerOpen(false),
            onOpenProblem: (problem) => { void openFile(problem.file, problem.line); },
          }),

          project && pdfOpen ? h("section", { className: "ps-pane ps-pdf", "aria-label": t("pdf") },
            h("div", { className: "ps-pane-head" },
              h("span", { className: "ps-pane-title" }, t("pdf")),
              h("button", { className: "ps-btn icon", type: "button", title: t("openInNewTab"), "aria-label": t("openInNewTab"), disabled: !pdf.rev, onClick: () => window.open(pdfUrl(), "_blank", "noopener") }, h(Icon.external)),
              h("button", { className: "ps-btn icon", type: "button", title: t("close"), "aria-label": t("close"), onClick: () => setPdfOpen(false) }, h(Icon.close))),
            pdf.mode === "pages"
              ? h("div", { className: "ps-pdf-scroll" },
                h("div", { className: "ps-pages", style: { "--ps-zoom": `${zoom}%` } },
                  Array.from({ length: pdf.pages }, (unused, index) => h("img", {
                    key: `${pdf.rev}-${index + 1}`,
                    className: "ps-page",
                    src: pageUrl(index + 1),
                    alt: `page ${index + 1}`,
                    loading: index < 2 ? "eager" : "lazy",
                    draggable: false,
                  }))))
              : pdf.mode === "iframe"
                ? h("iframe", { className: "ps-frame", src: pdfUrl(), title: t("pdf") })
                : h(EmptyState, {
                  icon: Icon.filePdf,
                  title: t("noPdfTitle"),
                  body: catalog.tooling && catalog.tooling.pdflatex === false ? t("noPdfTooling") : t("noPdfBody"),
                  children: h("button", { className: "ps-btn primary", type: "button", disabled: compiling || !project, onClick: () => { void runCompile(); } }, h(Icon.play), t("compile")),
                }),
            h("div", { className: "ps-pdf-foot" },
              h("span", null, pdf.pages > 0 ? `${pdf.pages} p.` : ""),
              h("div", { className: "ps-spacer" }),
              h("label", { className: "ps-zoom" }, t("zoom"),
                h("select", { value: zoom, onChange: (event) => setZoom(Number(event.target.value)) },
                  [75, 100, 125, 150, 200].map((value) => h("option", { key: value, value }, `${value}%`)))))) : null),

        !project
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
        toast ? h("div", { className: `ps-toast${toast.kind === "err" ? " err" : ""}`, role: "status" }, toast.message) : null);
    }

    // -- plugin ------------------------------------------------------------
    return {
      inject: ["slots", "locale", "layout"],
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
