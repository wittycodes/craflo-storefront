"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCellModule = void 0;
const gridCellViewModel_1 = require("./gridCellViewModel");
const gridCellModelBinder_1 = require("../gridCellModelBinder");
const gridCellViewModelBinder_1 = require("./gridCellViewModelBinder");
class GridCellModule {
    register(injector) {
        injector.bind("gridCell", gridCellViewModel_1.GridCellViewModel);
        injector.bindToCollection("modelBinders", gridCellModelBinder_1.GridCellModelBinder, "gridCellModelBinder");
        injector.bindToCollection("viewModelBinders", gridCellViewModelBinder_1.GridCellViewModelBinder);
    }
}
exports.GridCellModule = GridCellModule;
//# sourceMappingURL=gridCell.module.js.map