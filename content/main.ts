import { createElement, id, querySelector } from './utils';
import constants from './constants';
import createEditor from './createEditor';
import submitWith from './addKeyShortcut';
import getProblemInformation from './getProblemInformation';

chrome.storage.sync.get('codegen-ace', ({ 'codegen-ace': _config }) => {
    const config = JSON.parse(_config);
    if (!config.enable) return;

    document.body.classList.add('ace')
    // declaring basic elements from exist DOM
    const rawEditor = id<HTMLTextAreaElement>('source');
    const br = querySelector<HTMLBRElement>('#language+br');

    // setting ace editor
    const editorElement = createElement('textarea');
    br.after(editorElement);

    const {'font-size': fontSize, theme, 'font-family': fontFamily, custom} = config
    console.log({
        fontFamily: constants.supportFonts,
        fontSize:  '18px',
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        ...({
            fontFamily,
            fontSize: `${fontSize}px`,
            theme,
        }),
        ...(config.custom),
    })
    const editor = createEditor(editorElement, rawEditor, {
        fontFamily: constants.supportFonts,
        fontSize:  '18px',
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        ...({
            fontFamily,
            fontSize: `${fontSize}px`,
            theme,
        }),
        ...(config.custom),
    });

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
});

// Auto Enable Ace editor

//set submit shortcut
submitWith('F9');

// get problem information from before page
console.log(getProblemInformation(), 'djdjdjdj');
