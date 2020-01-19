import { createElement, id, querySelector } from './utils';
import constants from './constants';
import createEditor from './createEditor';
import submitWith from './addKeyShortcut';

// declaring basic elements from exist DOM
const rawEditor = id<HTMLTextAreaElement>('source');
const br = querySelector<HTMLBRElement>('#language+br');

// setting ace editor
const editorElement = createElement('textarea');
br.after(editorElement);
const editor = createEditor(editorElement, rawEditor, {
    fontFamily: constants.supportFonts,
    fontSize: '18px',
    enableSnippets: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});

// Auto Enable Ace editor
const off = setInterval(() => {
    if (!(id('frame_source') && id('source'))) return;
    clearInterval(off);

    id<HTMLInputElement>(constants.id.toggleButton).click();
    const beforeValue = id<HTMLTextAreaElement>('source').value;
    if (beforeValue) {
        editor.setValue(beforeValue);
    } else {
        editor.setValue(constants.INIT_STRING);
    }
}, 1000);

//set submit shortcut
submitWith('F9');
