"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridEditorModule = void 0;
const gridLayoutSelector_1 = require("./gridLayoutSelector");
class GridEditorModule {
    register(injector) {
        injector.bind("gridLayoutSelector", gridLayoutSelector_1.GridLayoutSelector);
    }
}
exports.GridEditorModule = GridEditorModule;
//# sourceMappingURL=gridEditor.module.js.map