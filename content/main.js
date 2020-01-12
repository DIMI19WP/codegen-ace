const editorElement = document.createElement('textarea');
const editorStyle = document.createElement('style');
editorStyle.append(
    document.createTextNode(`
@import url("//cdn.jsdelivr.net/gh/wan2land/d2coding/d2coding-ligature-full.css");

.ace_editor {
    height: 200px;
    display: none;
}`)
);
const rawEditor = document.getElementById('source');
document.querySelector('#language+br').after(editorElement);
document.body.append(editorStyle);
const editor = ace.edit(editorElement);
editor.setTheme('ace/theme/monokai');
editor.getSession().setMode('ace/mode/c_cpp');
editor.getSession().on('change', () => (rawEditor.value = editor.getValue()));
editor.setOptions({
    fontFamily: 'D2Coding ligature',
    fontSize: '18px'
});
editor.setValue(`#include <stdio.h>
int main() {

}`);
document.addEventListener('keyup', ({ key, ctrlKey }) => {
    if (key === 'F9') document.querySelector('#Submit').click();
});
const loop = setInterval(() => {
    const toggle = document.getElementById('edit_area_toggle_checkbox_source');
    if (!toggle) return;
    let isLegacyEditor = true;
    const aceEditor = document.getElementsByClassName('ace_editor')[0];
    const legacyEditor = document.getElementById('frame_source');
    clearInterval(loop);
    toggle.addEventListener('click', e => {
        isLegacyEditor = !isLegacyEditor;
        rawEditor.style.display = 'none';
        if (isLegacyEditor) {
            legacyEditor.style.display = 'block';
            aceEditor.style.display = 'none';
            return;
        }
        legacyEditor.style.display = 'none';
        aceEditor.style.display = 'block';
    });
}, 100);
