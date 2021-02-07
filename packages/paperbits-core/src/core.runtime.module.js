"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreRuntimeModule = void 0;
const carousel_runtime_module_1 = require("./carousel/carousel.runtime.module");
const map_1 = require("./map");
const search_runtime_module_1 = require("./search/search.runtime.module");
class CoreRuntimeModule {
    register(injector) {
        injector.bindModule(new carousel_runtime_module_1.CarouselRuntimelModule());
        injector.bindModule(new map_1.MapRuntimeModule());
        injector.bindModule(new search_runtime_module_1.SearchRuntimeModule());
    }
}
exports.CoreRuntimeModule = CoreRuntimeModule;
//# sourceMappingURL=core.runtime.module.js.map