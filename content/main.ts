import { createElement, id, querySelector } from './utils';
import constants from './constants';
import createEditor from './createEditor';
import { submitWith, minifyWith } from './shortcuts';
import getProblemInformation from './getProblemInformation';
import { Storage } from './types';

declare const chrome: any;

chrome.storage.sync.get(
    'codegen-ace',
    ({ 'codegen-ace': _config }: Storage) => {
        const config = (() => {
            try {
                return JSON.parse(_config);
            } catch (_) {
                return {
                    enable: true,
                    theme: 'ace/theme/monokai',
                    'font-family': '',
                    'font-size': 18,
                    custom: ''
                };
            }
        })();
        if (!config.enable) return;

        document.body.classList.add('ace');
        // declaring basic elements from exist DOM
        const rawEditor = id<HTMLTextAreaElement>('source');
        const br = querySelector<HTMLBRElement>('#language+br');

        // setting ace editor
        const editorElement = createElement('textarea');
        br.after(editorElement);

        const {
            'font-size': fontSize,
            theme,
            'font-family': fontFamily,
            custom,
            'editor-width': width,
            'editor-height': height,
            autoinject
        } = config;
        console.log(config);
        const editor = createEditor(editorElement, rawEditor, {
            fontFamily: constants.supportFonts,
            fontSize: '18px',
            enableSnippets: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            ...{
                fontFamily,
                fontSize: `${fontSize}px`,
                theme
            },
            ...(custom && JSON.parse(custom))
        });

        // append custom style
        const customStyles = document.createElement('style');
        customStyles.appendChild(
            document.createTextNode(`
            .ace .ace_editor {
                height: ${height}px;
                width: ${width}px;
            }
            `)
        );
        document.body.append(customStyles);

        // display problem information
        getProblemInformation().then(info => {
            if(!info) return
            br.after(document.createTextNode(info))
        })

        const off = setInterval(() => {
            if (!(id('frame_source') && id('source'))) return;
            clearInterval(off);

            id<HTMLInputElement>(constants.id.toggleButton).click();
            const beforeValue = id<HTMLTextAreaElement>('source').value;
            if (beforeValue) {
                editor.setValue(beforeValue);
            } else if (autoinject) {
                editor.setValue(constants.INIT_STRING);
            }
        }, 1000);

        minifyWith('F8', editor);
    }
);

// Auto Enable Ace editor

// set submit shortcut
submitWith('F9');

// get problem information from before page
