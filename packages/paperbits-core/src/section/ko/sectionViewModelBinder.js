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
exports.SectionViewModelBinder = void 0;
const sectionViewModel_1 = require("./sectionViewModel");
const sectionModel_1 = require("../sectionModel");
const placeholderViewModel_1 = require("../../placeholder/ko/placeholderViewModel");
const sectionHandlers_1 = require("../sectionHandlers");
class SectionViewModelBinder {
    constructor(viewModelBinderSelector, eventManager, styleCompiler) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new sectionViewModel_1.SectionViewModel();
            }
            const viewModels = [];
            for (const widgetModel of model.widgets) {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                const widgetViewModel = yield widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);
                viewModels.push(widgetViewModel);
            }
            if (viewModels.length === 0) {
                viewModels.push(new placeholderViewModel_1.PlaceholderViewModel("Section"));
            }
            viewModel.widgets(viewModels);
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            const binding = {
                name: "section",
                displayName: "Section",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                flow: "flex",
                editor: "layout-section-editor",
                handler: sectionHandlers_1.SectionHandlers,
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
        return model instanceof sectionModel_1.SectionModel;
    }
}
exports.SectionViewModelBinder = SectionViewModelBinder;
//# sourceMappingURL=sectionViewModelBinder.js.map