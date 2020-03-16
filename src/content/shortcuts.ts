import { onRunMinify } from './minify';
import { Editor } from './types';
import { addKeyboardShortcut, querySelector } from './utils';

export const submitWith = (trigger: string) => {
    addKeyboardShortcut(
        trigger,
        querySelector<HTMLInputElement>('#Submit').click,
    );
};

export const minifyWith = (trigger: string, editor: Editor) => {
    addKeyboardShortcut(
        trigger,
        () => onRunMinify(editor),
    );
};
