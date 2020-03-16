import { Ace, EditorOptions, Editor } from './types';

export default (
    element: HTMLTextAreaElement,
    syncElement: HTMLTextAreaElement,
    config: EditorOptions
): Editor => {
    const ace: Ace = (window as any).ace;
    const editor = ace.edit(element);

    ace.require('ace/ext/language_tools');
    editor.setTheme(`ace/theme/${config.theme}`);
    editor.getSession().setMode('ace/mode/c_cpp');
    editor
        .getSession()
        .on('change', () => (syncElement.value = editor.getValue()));
    editor.setOptions(config);
    return editor;
};
