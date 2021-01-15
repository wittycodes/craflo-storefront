"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockWorkshopModule = void 0;
const blockSelector_1 = require("./blockSelector");
const addBlockDialog_1 = require("./addBlockDialog");
const widgetContainer_1 = require("./widgetContainer");
class BlockWorkshopModule {
    register(injector) {
        injector.bind("widgetContainer", widgetContainer_1.WidgetContainer);
        injector.bind("blockSelector", blockSelector_1.BlockSelector);
        injector.bind("addBlockDialog", addBlockDialog_1.AddBlockDialog);
    }
}
exports.BlockWorkshopModule = BlockWorkshopModule;
//# sourceMappingURL=block.module.js.map