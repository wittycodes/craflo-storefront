"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapDesignModule = void 0;
const mapEditor_1 = require("./mapEditor");
const mapHandlers_1 = require("../mapHandlers");
const mapViewModel_1 = require("./mapViewModel");
const mapModelBinder_1 = require("../mapModelBinder");
const mapViewModelBinder_1 = require("./mapViewModelBinder");
class MapDesignModule {
    register(injector) {
        injector.bind("mapEditor", mapEditor_1.MapEditor);
        injector.bind("map", mapViewModel_1.MapViewModel);
        injector.bindToCollection("modelBinders", mapModelBinder_1.MapModelBinder);
        injector.bindToCollection("viewModelBinders", mapViewModelBinder_1.MapViewModelBinder);
        injector.bindToCollection("widgetHandlers", mapHandlers_1.MapHandlers, "mapHandler");
        injector.bindToCollection("dropHandlers", mapHandlers_1.MapHandlers, "mapHandler");
    }
}
exports.MapDesignModule = MapDesignModule;
//# sourceMappingURL=map.design.module.js.map