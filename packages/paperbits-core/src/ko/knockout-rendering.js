"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = void 0;
const domino = require("domino");
function createDocument(html) {
    global.window = domino.createWindow(html);
    global.document = window.document;
    global.navigator = window.navigator;
    return window.document;
}
exports.createDocument = createDocument;
//# sourceMappingURL=knockout-rendering.js.map