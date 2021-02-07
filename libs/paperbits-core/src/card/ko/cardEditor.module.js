"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardEditorModule = void 0;
const cardEditor_1 = require("./cardEditor");
const cardHandlers_1 = require("../cardHandlers");
class CardEditorModule {
    register(injector) {
        injector.bind("cardEditor", cardEditor_1.CardEditor);
        const styleGroup = {
            key: "card",
            name: "components_card",
            groupName: "Cards",
            selectorTemplate: undefined,
            styleTemplate: `<div class="no-pointer-events" data-bind="stylePreview: variation.key" style="width: 340px"><h1>Card</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p></div>`
        };
        injector.bindInstanceToCollection("styleGroups", styleGroup);
        injector.bindToCollection("widgetHandlers", cardHandlers_1.CardHandlers, "cardHandler");
    }
}
exports.CardEditorModule = CardEditorModule;
//# sourceMappingURL=cardEditor.module.js.map