"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlEditorProvider = void 0;
class HtmlEditorProvider {
    constructor(eventManager) {
        this.getCurrentHtmlEditor = this.getCurrentHtmlEditor.bind(this);
        this.setCurrentHtmlEditor = this.setCurrentHtmlEditor.bind(this);
        eventManager.addEventListener("htmlEditorChanged", this.setCurrentHtmlEditor);
    }
    setCurrentHtmlEditor(htmlEditor) {
        this.htmlEditor = htmlEditor;
    }
    getCurrentHtmlEditor() {
        return this.htmlEditor;
    }
}
exports.HtmlEditorProvider = HtmlEditorProvider;
//# sourceMappingURL=htmlEditorProvider.js.map