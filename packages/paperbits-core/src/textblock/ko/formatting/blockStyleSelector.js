"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockStyleSelector = void 0;
const blockStyleSelector_html_1 = require("./blockStyleSelector.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let BlockStyleSelector = class BlockStyleSelector {
    constructor(htmlEditorProvider) {
        this.htmlEditorProvider = htmlEditorProvider;
    }
    resetToNormal() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleParagraph();
    }
    toggleH1() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleH1();
    }
    toggleH2() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleH2();
    }
    toggleH3() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleH3();
    }
    toggleH4() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleH4();
    }
    toggleH5() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleH5();
    }
    toggleH6() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleH6();
    }
    toggleQuote() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleQuote();
    }
    toggleFormatted() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleFormatted();
    }
};
BlockStyleSelector = __decorate([
    decorators_1.Component({
        selector: "block-style-selector",
        template: blockStyleSelector_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], BlockStyleSelector);
exports.BlockStyleSelector = BlockStyleSelector;
//# sourceMappingURL=blockStyleSelector.js.map