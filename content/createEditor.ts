import { Ace, EditorOptions, Editor } from "./types";

export default (element: HTMLTextAreaElement, syncElement: HTMLTextAreaElement, config: EditorOptions): Editor => {
    const editor = ((window as any).ace as Ace).edit(element);
    (window as any).ace.require('ace/ext/language_tools');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/c_cpp');
    editor
        .getSession()
        .on('change', () => (syncElement.value = editor.getValue()));
    editor.setOptions(config);
    return editor
};
