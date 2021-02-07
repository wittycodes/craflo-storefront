"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapViewModelBinder = void 0;
const mapViewModel_1 = require("./mapViewModel");
const mapModel_1 = require("../mapModel");
const defaultApiKey = "AIzaSyC7eT_xRPt3EjX3GuzSvlaZzJmlyFxvFFs";
class MapViewModelBinder {
    constructor(eventManager, styleCompiler, settingsProvider) {
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
        this.settingsProvider = settingsProvider;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new mapViewModel_1.MapViewModel();
            }
            const settings = yield this.settingsProvider.getSetting("integration/googleMaps");
            const apiKey = (settings === null || settings === void 0 ? void 0 : settings.apiKey) || defaultApiKey;
            viewModel.runtimeConfig(JSON.stringify({
                caption: model.caption,
                location: model.location,
                zoom: model.zoom,
                mapType: model.mapType,
                apiKey: apiKey
            }));
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            viewModel["widgetBinding"] = {
                displayName: "Map",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                flow: "inline",
                draggable: true,
                editor: "paperbits-map-editor",
                applyChanges: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof mapModel_1.MapModel;
    }
}
exports.MapViewModelBinder = MapViewModelBinder;
//# sourceMappingURL=mapViewModelBinder.js.map