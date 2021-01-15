"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutDesignModule = void 0;
const ko_1 = require("../../workshops/layout/ko");
class LayoutDesignModule {
    register(injector) {
        injector.bindModule(new ko_1.LayoutWorkshopModule());
    }
}
exports.LayoutDesignModule = LayoutDesignModule;
//# sourceMappingURL=layout.design.module.js.map