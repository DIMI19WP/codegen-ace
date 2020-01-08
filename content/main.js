const editorElement = document.createElement("textarea");
const editorStyle = document.createElement("style");
editorStyle.append(
    document.createTextNode(`.ace_editor {
    height: 200px;
  }
  iframe#frame_source {
    display: none !important;
  }`)
);

const sourceElement = document.getElementById("source");
sourceElement.after(editorElement);
document.body.append(editorStyle);
const editor = ace.edit(editorElement);
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/c_cpp");
editor
    .getSession()
    .on("change", () => (sourceElement.value = editor.getValue()));
editor.setOptions({
    fontFamily: "D2Coding ligature",
    fontSize: "18px"
});
editor.setValue(`#include <stdio.h>
int main() {

}`);
document.addEventListener("keyup", ({ key, ctrlKey }) => {
    if (key === "F9") document.querySelector("#Submit").click();
});
const loop = setInterval(() => {
    const toggle = document.getElementById("edit_area_toggle_checkbox_source");
    if (!toggle) return;
    clearInterval(loop);
    toggle.addEventListener(
        "click",
        () => (sourceElement.style.display = "none")
    );
}, 100);
