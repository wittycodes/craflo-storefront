"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsiblePanelModule = void 0;
const collapsiblePanelViewModel_1 = require("./collapsiblePanelViewModel");
const collapsiblePanelModelBinder_1 = require("../collapsiblePanelModelBinder");
const collapsiblePanelViewModelBinder_1 = require("./collapsiblePanelViewModelBinder");
class CollapsiblePanelModule {
    register(injector) {
        injector.bind("collapsiblePanel", collapsiblePanelViewModel_1.CollapsiblePanel);
        injector.bindToCollection("modelBinders", collapsiblePanelModelBinder_1.CollapsiblePanelModelBinder);
        injector.bindToCollection("viewModelBinders", collapsiblePanelViewModelBinder_1.CollapsiblePanelViewModelBinder);
    }
}
exports.CollapsiblePanelModule = CollapsiblePanelModule;
//# sourceMappingURL=collapsiblePanel.module.js.map