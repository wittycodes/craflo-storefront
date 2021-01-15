"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextblockModule = void 0;
const textblockViewModelBinder_1 = require("../textblockViewModelBinder");
const textblockViewModel_1 = require("./textblockViewModel");
const textblockModelBinder_1 = require("../textblockModelBinder");
const bindingHandlers_htmlEditor_1 = require("../../ko/bindingHandlers/bindingHandlers.htmlEditor");
const inlineModelBinder_1 = require("../../text/modelBinders/inlineModelBinder");
const blockModelBinder_1 = require("../../text/modelBinders/blockModelBinder");
const listModelBinder_1 = require("../../text/modelBinders/listModelBinder");
class TextblockModule {
    register(injector) {
        injector.bind("textblock", textblockViewModel_1.TextblockViewModel);
        injector.bindToCollection("modelBinders", inlineModelBinder_1.InlineModelBinder);
        injector.bindToCollection("modelBinders", blockModelBinder_1.BlockModelBinder);
        injector.bindToCollection("modelBinders", listModelBinder_1.ListModelBinder);
        injector.bindToCollection("modelBinders", textblockModelBinder_1.TextblockModelBinder);
        injector.bindToCollection("viewModelBinders", textblockViewModelBinder_1.TextblockViewModelBinder);
        injector.bindToCollection("autostart", bindingHandlers_htmlEditor_1.HtmlEditorBindingHandler);
    }
}
exports.TextblockModule = TextblockModule;
//# sourceMappingURL=textblock.module.js.map