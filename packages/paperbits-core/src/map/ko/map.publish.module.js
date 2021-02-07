"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPublishModule = void 0;
require("./bindingHandlers.googlemap");
const mapViewModel_1 = require("./mapViewModel");
const mapModelBinder_1 = require("../mapModelBinder");
const mapViewModelBinder_1 = require("./mapViewModelBinder");
class MapPublishModule {
    register(injector) {
        injector.bind("map", mapViewModel_1.MapViewModel);
        injector.bindToCollection("modelBinders", mapModelBinder_1.MapModelBinder);
        injector.bindToCollection("viewModelBinders", mapViewModelBinder_1.MapViewModelBinder);
    }
}
exports.MapPublishModule = MapPublishModule;
//# sourceMappingURL=map.publish.module.js.map