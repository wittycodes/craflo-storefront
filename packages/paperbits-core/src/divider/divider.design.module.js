"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DividerDesignModule = void 0;
const dividerEditor_1 = require("./ko/dividerEditor");
const dividerHandlers_1 = require("./dividerHandlers");
const ko_1 = require("./ko");
const dividerModelBinder_1 = require("./dividerModelBinder");
class DividerDesignModule {
    register(injector) {
        injector.bind("dividerEditor", dividerEditor_1.DividerEditor);
        injector.bindToCollection("widgetHandlers", dividerHandlers_1.DividerHandlers, "dividerHandler");
        injector.bind("divider", ko_1.Divider);
        injector.bindToCollection("modelBinders", dividerModelBinder_1.DividerModelBinder);
        injector.bindToCollection("viewModelBinders", ko_1.DividerViewModelBinder);
    }
}
exports.DividerDesignModule = DividerDesignModule;
//# sourceMappingURL=divider.design.module.js.map