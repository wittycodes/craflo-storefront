"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnModule = void 0;
const columnViewModel_1 = require("./columnViewModel");
const columnModelBinder_1 = require("../columnModelBinder");
const columnViewModelBinder_1 = require("./columnViewModelBinder");
class ColumnModule {
    register(injector) {
        injector.bind("column", columnViewModel_1.ColumnViewModel);
        injector.bindToCollection("modelBinders", columnModelBinder_1.ColumnModelBinder);
        injector.bindToCollection("viewModelBinders", columnViewModelBinder_1.ColumnViewModelBinder);
    }
}
exports.ColumnModule = ColumnModule;
//# sourceMappingURL=column.module.js.map