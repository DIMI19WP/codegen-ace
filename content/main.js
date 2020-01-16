const createElement = tagName => document.createElement(tagName)
const id = _id => document.getElementById(_id)
const querySelector = query => document.querySelector(query)

const ids = {
    toggleButton: 'edit_area_toggle_checkbox_source'
}

const constants = {
    INIT_STRING: `#include <stdio.h>
int main() {
    
}`
}

// creating textarea
const rawEditor = id('source')
const br = querySelector('#language+br')
const editorElement = createElement('textarea')
br.after(editorElement)

// setting ace editor
const editor = ace.edit(editorElement)
editor.setTheme('ace/theme/monokai')
editor.getSession().setMode('ace/mode/c_cpp')
editor.getSession().on('change', () => (rawEditor.value = editor.getValue()))
editor.setOptions({
    fontFamily: "'D2Coding ligature', D2Coding, monospace",
    fontSize: '18px'
})

// setting keyshortcut
document.addEventListener('keyup', ({ key }) => {
    if (key === 'F9') querySelector('#Submit').click()
})

// Auto Enable Ace editor
const off = setInterval(() => {
    if (!(id('frame_source') && id('source'))) return
    clearInterval(off)

    id(ids.toggleButton).click()
    const beforeValue = id('source').value
    if (beforeValue) {
        editor.setValue(beforeValue)
    } else {
        editor.setValue(constants.INIT_STRING)
    }
}, 1000)
