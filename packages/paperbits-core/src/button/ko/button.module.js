"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonModule = void 0;
const buttonViewModel_1 = require("./buttonViewModel");
const buttonModelBinder_1 = require("../buttonModelBinder");
const buttonViewModelBinder_1 = require("./buttonViewModelBinder");
class ButtonModule {
    register(injector) {
        injector.bind("button", buttonViewModel_1.Button);
        injector.bindToCollection("modelBinders", buttonModelBinder_1.ButtonModelBinder);
        injector.bindToCollection("viewModelBinders", buttonViewModelBinder_1.ButtonViewModelBinder);
    }
}
exports.ButtonModule = ButtonModule;
//# sourceMappingURL=button.module.js.map