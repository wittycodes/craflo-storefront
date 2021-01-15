"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextblockEditorModule = void 0;
const textblockHandlers_1 = require("../textblockHandlers");
const blockStyleSelector_1 = require("./formatting/blockStyleSelector");
const formattingTools_1 = require("./formatting/formattingTools");
const hyperlinkEditor_1 = require("./hyperlink/hyperlinkEditor");
const textblockEditor_1 = require("./textblockEditor");
const textStyleSelector_1 = require("./formatting/textStyleSelector");
class TextblockEditorModule {
    register(injector) {
        injector.bindToCollection("widgetHandlers", textblockHandlers_1.TextblockHandlers, "textblockHandler");
        injector.bind("formattingTools", formattingTools_1.FormattingTools);
        injector.bind("hyperlinkEditor", hyperlinkEditor_1.HyperlinkEditor);
        injector.bind("textblockEditor", textblockEditor_1.TextblockEditor);
        injector.bind("blockStyleSelector", blockStyleSelector_1.BlockStyleSelector);
        injector.bind("textStyleSelector", textStyleSelector_1.TextStyleSelector);
    }
}
exports.TextblockEditorModule = TextblockEditorModule;
//# sourceMappingURL=textblockEditor.module.js.map