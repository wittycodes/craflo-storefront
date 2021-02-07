"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DominoHtmlDocumentProvider = void 0;
const domino = require("domino");
class DominoHtmlDocumentProvider {
    createDocument(html) {
        const window = domino.createWindow(html);
        global.window = window;
        global.document = window.document;
        global.navigator = window.navigator;
        return window.document;
    }
}
exports.DominoHtmlDocumentProvider = DominoHtmlDocumentProvider;
//# sourceMappingURL=dominoHtmlDocumentProvider.js.map