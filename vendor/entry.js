// Bundled for the browser by `npm run build:editor`; served at /paper-studio/api/asset.
export { EditorState, Compartment, RangeSetBuilder, StateEffect } from "@codemirror/state";
export {
  EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter,
  drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightSpecialChars,
  Decoration, ViewPlugin, gutter, GutterMarker,
} from "@codemirror/view";
export {
  defaultHighlightStyle, syntaxHighlighting, StreamLanguage, indentOnInput,
  bracketMatching, foldGutter, foldKeymap, HighlightStyle,
} from "@codemirror/language";
export { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
export { search, searchKeymap, highlightSelectionMatches } from "@codemirror/search";
export { tags } from "@lezer/highlight";
export { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
export { vim, Vim } from "@replit/codemirror-vim";
export { stex } from "@codemirror/legacy-modes/mode/stex";
