"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoModule = void 0;
const ko = require("knockout");
require("./bindingHandlers/bindingHandlers.columnSizeCfg");
require("./bindingHandlers/bindingHandlers.component");
require("./bindingHandlers/bindingHandlers.highlight");
require("./bindingHandlers/bindingHandlers.splitter");
require("./bindingHandlers/bindingHandlers.resourcePicker");
require("./bindingHandlers/bindingHandlers.hyperlink");
require("./bindingHandlers/bindingHandlers.surface");
require("./bindingHandlers/bindingHandlers.gridCommand");
require("./bindingHandlers/bindingHandlers.align");
require("./bindingHandlers/bindingHandlers.focus");
require("./bindingHandlers/bindingHandlers.size");
require("./bindingHandlers/bindingHandlers.validationMessageToggle");
require("./bindingHandlers/bindingHandlers.tooltip");
require("./bindingHandlers/bindingHandlers.collapse");
require("./bindingHandlers/bindingHandlers.stickTo");
require("./bindingHandlers/bindingHandlers.scrollable");
require("./bindingHandlers/bindingHandlers.secured");
require("./bindingHandlers/bindingHandlers.slider");
require("./bindingHandlers/bindingHandlers.angle");
require("./bindingHandlers/bindingHandlers.confirm");
require("./bindingHandlers/bindingHandlers.gridCell");
require("./bindingExtenders/bindingExtenders.max");
require("./bindingHandlers/bindingHandlers.selectable");
class KoModule {
    register(injector) {
        ko.virtualElements.allowedBindings["widget"] = true;
        ko.virtualElements.allowedBindings["layoutrow"] = true;
        ko.virtualElements.allowedBindings["component"] = true;
    }
}
exports.KoModule = KoModule;
//# sourceMappingURL=ko.module.js.map