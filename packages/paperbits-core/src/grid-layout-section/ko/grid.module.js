"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridModule = void 0;
const gridViewModel_1 = require("./gridViewModel");
const gridModelBinder_1 = require("../gridModelBinder");
const gridViewModelBinder_1 = require("./gridViewModelBinder");
class GridModule {
    register(injector) {
        injector.bind("gridViewModel", gridViewModel_1.GridViewModel);
        injector.bindToCollection("modelBinders", gridModelBinder_1.GridModelBinder, "gridModelBinder");
        injector.bindToCollection("viewModelBinders", gridViewModelBinder_1.GridViewModelBinder, "gridViewModelBinder");
    }
}
exports.GridModule = GridModule;
//# sourceMappingURL=grid.module.js.map