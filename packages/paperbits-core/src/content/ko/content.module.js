"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModule = void 0;
const contentViewModel_1 = require("./contentViewModel");
const contentModelBinder_1 = require("../contentModelBinder");
const contentViewModelBinder_1 = require("./contentViewModelBinder");
class ContentModule {
    register(injector) {
        injector.bind("contentWidget", contentViewModel_1.ContentViewModel);
        injector.bindToCollection("modelBinders", contentModelBinder_1.ContentModelBinder, "contentModelBinder");
        injector.bindToCollection("viewModelBinders", contentViewModelBinder_1.ContentViewModelBinder, "contentViewModelBinder");
    }
}
exports.ContentModule = ContentModule;
//# sourceMappingURL=content.module.js.map