const editorElement = document.createElement('textarea')
const editorStyle = document.createElement('style')
editorStyle.append(
    document.createTextNode(`
@import url("//cdn.jsdelivr.net/gh/wan2land/d2coding/d2coding-ligature-full.css");

.ace_editor {
    height: 404px;
    width: 816px;
    display: none;
}
#editor_alert {
    font-size: 1.8drem;
}`)
)
const rawEditor = document.getElementById('source')
const br = document.querySelector('#language+br')
br.after(editorElement)
const editorAlert = document.createElement('p')
editorAlert.id = 'editor_alert'
editorAlert.appendChild(document.createTextNode('ace 에디터를 사용하시려면 꼭 아래의 Toggle editor 버튼을 해제해주세요!'))
br.after(editorAlert)
document.body.append(editorStyle)
const editor = ace.edit(editorElement)
editor.setTheme('ace/theme/monokai')
editor.getSession().setMode('ace/mode/c_cpp')
editor.getSession().on('change', () => (rawEditor.value = editor.getValue()))
editor.setOptions({
    fontFamily: "'D2Coding ligature', D2Coding, monospace",
    fontSize: '18px'
})
editor.setValue(`#include <stdio.h>
int main() {

}`)
document.addEventListener('keyup', ({ key, ctrlKey }) => {
    if (key === 'F9') document.querySelector('#Submit').click()
})
const loop = setInterval(() => {
    const toggle = document.getElementById('edit_area_toggle_checkbox_source')
    if (!toggle) return
    let isLegacyEditor = true
    const aceEditor = document.getElementsByClassName('ace_editor')[0]
    const legacyEditor = document.getElementById('frame_source')
    clearInterval(loop)
    toggle.addEventListener('click', e => {
        isLegacyEditor = !isLegacyEditor
        rawEditor.style.display = 'none'
        if (isLegacyEditor) {
            legacyEditor.style.display = 'block'
            aceEditor.style.display = 'none'
            return
        }
        legacyEditor.style.display = 'none'
        aceEditor.style.display = 'block'
    })
}, 100)
