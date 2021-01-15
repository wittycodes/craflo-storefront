"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonEditorModule = void 0;
const buttonEditor_1 = require("./buttonEditor");
const buttonHandlers_1 = require("../buttonHandlers");
class ButtonEditorModule {
    register(injector) {
        injector.bind("buttonEditor", buttonEditor_1.ButtonEditor);
        injector.bindToCollection("widgetHandlers", buttonHandlers_1.ButtonHandlers, "buttonHandler");
        const styleGroup = {
            key: "button",
            name: "components_button",
            groupName: "Buttons",
            selectorTemplate: `<a href="#" data-bind="css: classNames" style="display: inline-block">Button</a>`,
            styleTemplate: `<a href="#" data-bind="stylePreview: variation.key" style="display: inline-block">Button</button>`
        };
        injector.bindInstanceToCollection("styleGroups", styleGroup);
    }
}
exports.ButtonEditorModule = ButtonEditorModule;
//# sourceMappingURL=buttonEditor.module.js.map