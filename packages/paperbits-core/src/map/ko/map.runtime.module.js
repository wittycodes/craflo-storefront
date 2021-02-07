"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapRuntimeModule = void 0;
const map_runtime_1 = require("./runtime/map-runtime");
const bindingHandlers_googlemap_1 = require("./bindingHandlers.googlemap");
class MapRuntimeModule {
    register(injector) {
        injector.bind("mapRuntime", map_runtime_1.MapRuntime);
        injector.bindToCollection("autostart", bindingHandlers_googlemap_1.GooglmapsBindingHandler);
    }
}
exports.MapRuntimeModule = MapRuntimeModule;
//# sourceMappingURL=map.runtime.module.js.map