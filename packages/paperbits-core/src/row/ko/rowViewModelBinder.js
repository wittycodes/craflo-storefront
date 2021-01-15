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
exports.RowViewModelBinder = void 0;
const rowViewModel_1 = require("./rowViewModel");
const rowModel_1 = require("../rowModel");
const placeholderViewModel_1 = require("../../placeholder/ko/placeholderViewModel");
const rowHandlers_1 = require("../rowHandlers");
class RowViewModelBinder {
    constructor(viewModelBinderSelector, eventManager) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.eventManager = eventManager;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new rowViewModel_1.RowViewModel();
            }
            const viewModels = [];
            for (const widgetModel of model.widgets) {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                const widgetViewModel = yield widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);
                viewModels.push(widgetViewModel);
            }
            if (viewModels.length === 0) {
                viewModels.push(new placeholderViewModel_1.PlaceholderViewModel("Row"));
            }
            viewModel.widgets(viewModels);
            viewModel.alignSm(model.alignSm);
            viewModel.alignMd(model.alignMd);
            viewModel.alignLg(model.alignLg);
            viewModel.justifySm(model.justifySm);
            viewModel.justifyMd(model.justifyMd);
            viewModel.justifyLg(model.justifyLg);
            const binding = {
                name: "row",
                displayName: "Row",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: false,
                handler: rowHandlers_1.RowHandlers,
                applyChanges: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            viewModel["widgetBinding"] = binding;
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof rowModel_1.RowModel;
    }
}
exports.RowViewModelBinder = RowViewModelBinder;
//# sourceMappingURL=rowViewModelBinder.js.map