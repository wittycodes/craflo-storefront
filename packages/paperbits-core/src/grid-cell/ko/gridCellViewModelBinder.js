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
exports.GridCellViewModelBinder = void 0;
const gridCellViewModel_1 = require("./gridCellViewModel");
const gridCellModel_1 = require("../gridCellModel");
const placeholderViewModel_1 = require("../../placeholder/ko/placeholderViewModel");
const gridCellHandlers_1 = require("../gridCellHandlers");
class GridCellViewModelBinder {
    constructor(viewModelBinderSelector, eventManager, styleCompiler) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new gridCellViewModel_1.GridCellViewModel();
            }
            const widgetViewModels = [];
            for (const widgetModel of model.widgets) {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                if (widgetViewModelBinder.createWidgetBinding) {
                    const binding = yield widgetViewModelBinder.createWidgetBinding(widgetModel, bindingContext);
                    widgetViewModels.push(binding);
                }
                else {
                    const widgetViewModel = yield widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);
                    widgetViewModels.push(widgetViewModel);
                }
            }
            if (widgetViewModels.length === 0) {
                widgetViewModels.push(new placeholderViewModel_1.PlaceholderViewModel(model.role));
            }
            if (model.styles) {
                const styleModel = yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager);
                viewModel.styles(styleModel);
            }
            viewModel.role(model.role);
            viewModel.widgets(widgetViewModels);
            const displayName = model.role.charAt(0).toUpperCase() + model.role.slice(1);
            const binding = {
                name: "grid-cell",
                displayName: displayName,
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: false,
                editor: "grid-cell-editor",
                handler: gridCellHandlers_1.GridCellHandlers,
                applyChanges: (changes) => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            viewModel["widgetBinding"] = binding;
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof gridCellModel_1.GridCellModel;
    }
}
exports.GridCellViewModelBinder = GridCellViewModelBinder;
//# sourceMappingURL=gridCellViewModelBinder.js.map