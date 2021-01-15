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
exports.CollapsiblePanelViewModelBinder = void 0;
const collapsiblePanelViewModel_1 = require("./collapsiblePanelViewModel");
const collapsiblePanelModel_1 = require("../collapsiblePanelModel");
const ko_1 = require("../../placeholder/ko");
const __1 = require("..");
class CollapsiblePanelViewModelBinder {
    constructor(viewModelBinderSelector, eventManager, styleCompiler) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new collapsiblePanelViewModel_1.CollapsiblePanel();
            }
            const widgetViewModels = [];
            for (const widgetModel of model.widgets) {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                const widgetViewModel = yield widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);
                widgetViewModels.push(widgetViewModel);
            }
            if (widgetViewModels.length === 0) {
                widgetViewModels.push(new ko_1.PlaceholderViewModel("Collapsible panel content"));
            }
            if (model.styles) {
                const styleModel = yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager);
                viewModel.styles(styleModel);
            }
            viewModel.widgets(widgetViewModels);
            viewModel["widgetBinding"] = {
                displayName: "Collapsible panel",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                flow: "inline",
                editor: "collapsible-panel-editor",
                handler: __1.CollapsiblePanelHandlers,
                applyChanges: (changes) => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof collapsiblePanelModel_1.CollapsiblePanelModel;
    }
}
exports.CollapsiblePanelViewModelBinder = CollapsiblePanelViewModelBinder;
//# sourceMappingURL=collapsiblePanelViewModelBinder.js.map