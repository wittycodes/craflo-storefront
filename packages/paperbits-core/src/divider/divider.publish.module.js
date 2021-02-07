"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DividerPublishModule = void 0;
const dividerViewModel_1 = require("./ko/dividerViewModel");
const dividerModelBinder_1 = require("./dividerModelBinder");
const dividerViewModelBinder_1 = require("./ko/dividerViewModelBinder");
class DividerPublishModule {
    register(injector) {
        injector.bind("divider", dividerViewModel_1.Divider);
        injector.bindToCollection("modelBinders", dividerModelBinder_1.DividerModelBinder);
        injector.bindToCollection("viewModelBinders", dividerViewModelBinder_1.DividerViewModelBinder);
    }
}
exports.DividerPublishModule = DividerPublishModule;
//# sourceMappingURL=divider.publish.module.js.map