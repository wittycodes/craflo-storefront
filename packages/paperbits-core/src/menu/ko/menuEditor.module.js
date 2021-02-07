"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuEditorModule = void 0;
const styleGuideSnippet_html_1 = require("./styleGuideSnippet.html");
const menuEditor_1 = require("./menuEditor");
const menuHandlers_1 = require("../menuHandlers");
class MenuEditorModule {
    register(injector) {
        injector.bind("menuEditor", menuEditor_1.MenuEditor);
        injector.bindToCollection("widgetHandlers", menuHandlers_1.MenuHandlers, "menuHandler");
        const styleGroup = {
            key: "menu",
            name: "components_menu",
            groupName: "Menus",
            selectorTemplate: null,
            styleTemplate: styleGuideSnippet_html_1.default
        };
        injector.bindInstanceToCollection("styleGroups", styleGroup);
    }
}
exports.MenuEditorModule = MenuEditorModule;
//# sourceMappingURL=menuEditor.module.js.map