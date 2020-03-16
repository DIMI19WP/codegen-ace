import { Editor } from './types';
import { querySelector } from './utils';

// returns true if current language is selected to C/C++, else false
const isCurrentLangC = (): boolean => {
    const languageElement = querySelector<HTMLSelectElement>('#language');

    // parseInt is way faster then toString
    return [0, 1].includes(parseInt(languageElement.value));
};

// minify current code
export const onRunMinify = (editor: Editor) => {
    if (!isCurrentLangC()) {
        alert('현재는 C/C++만 지원합니다.');
        return;
    }

    const currentLines = editor.getValue().split('\n').map((line) => {
        // minify code like `for(i = 1; i<=5; i++) {` to `for(i=1;i<=5;i++){`
        return line
            .replace(/([ \t]+(?=[,;=(){}]))|(?<=([,;=(){}]))[ \t]/g, '')
            .trim();
    });

    // split current lines of code
    const getSplitCode = (lines: string[]) => {
        return lines.reduce(
            (result: [string[], string[]], line: string) => {
                // check for preprocessors
                line.startsWith('#')
                    ? result[0].push(line)
                    : result[1].push(line);
                return result;
            },
            [[], []],
        );
    };

    const [preprocessors, otherCode] = getSplitCode(currentLines);
    const result = `${preprocessors.join('\n')}\n${otherCode.join('')}`;
    editor.setValue(result);
};
