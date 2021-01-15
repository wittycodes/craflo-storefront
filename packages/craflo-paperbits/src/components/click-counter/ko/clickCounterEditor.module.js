"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickCounterEditorModule = void 0;
const clickCounter_module_1 = require("./clickCounter.module");
const clickCounterEditor_1 = require("./clickCounterEditor");
const clickCounterHandlers_1 = require("../clickCounterHandlers");
class ClickCounterEditorModule {
    register(injector) {
        injector.bindModule(new clickCounter_module_1.ClickCounterModule());
        injector.bind("clickCounterEditor", clickCounterEditor_1.ClickCounterEditor);
        injector.bindToCollection("widgetHandlers", clickCounterHandlers_1.ClickCounterHandlers);
    }
}
exports.ClickCounterEditorModule = ClickCounterEditorModule;
