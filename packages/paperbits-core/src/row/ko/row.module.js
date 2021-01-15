"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowModule = void 0;
const rowViewModel_1 = require("./rowViewModel");
const rowModelBinder_1 = require("../rowModelBinder");
const rowViewModelBinder_1 = require("./rowViewModelBinder");
class RowModule {
    register(injector) {
        injector.bind("row", rowViewModel_1.RowViewModel);
        injector.bindToCollection("modelBinders", rowModelBinder_1.RowModelBinder);
        injector.bindToCollection("viewModelBinders", rowViewModelBinder_1.RowViewModelBinder);
    }
}
exports.RowModule = RowModule;
//# sourceMappingURL=row.module.js.map