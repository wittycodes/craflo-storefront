"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickCounterModule = void 0;
const clickCounterViewModel_1 = require("./clickCounterViewModel");
const clickCounterModelBinder_1 = require("../clickCounterModelBinder");
const clickCounterViewModelBinder_1 = require("./clickCounterViewModelBinder");
class ClickCounterModule {
    register(injector) {
        injector.bind("clickCounter", clickCounterViewModel_1.ClickCounterViewModel);
        injector.bindToCollection("modelBinders", clickCounterModelBinder_1.ClickCounterModelBinder);
        injector.bindToCollection("viewModelBinders", clickCounterViewModelBinder_1.ClickCounterViewModelBinder);
    }
}
exports.ClickCounterModule = ClickCounterModule;
