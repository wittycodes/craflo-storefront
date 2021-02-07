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
exports.CardViewModelBinder = void 0;
const cardViewModel_1 = require("./cardViewModel");
const cardModel_1 = require("../cardModel");
const placeholderViewModel_1 = require("../../placeholder/ko/placeholderViewModel");
const cardHandlers_1 = require("../cardHandlers");
class CardViewModelBinder {
    constructor(viewModelBinderSelector, eventManager, styleCompiler) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new cardViewModel_1.CardViewModel();
            }
            const widgetViewModels = [];
            for (const widgetModel of model.widgets) {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                const widgetViewModel = yield widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);
                widgetViewModels.push(widgetViewModel);
            }
            if (widgetViewModels.length === 0) {
                widgetViewModels.push(new placeholderViewModel_1.PlaceholderViewModel("Card"));
            }
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            viewModel.widgets(widgetViewModels);
            if (!viewModel["widgetBinding"]) {
                const binding = {
                    name: "card",
                    displayName: "Card",
                    readonly: bindingContext ? bindingContext.readonly : false,
                    flow: "block",
                    model: model,
                    draggable: true,
                    editor: "card-editor",
                    handler: cardHandlers_1.CardHandlers,
                    applyChanges: (changes) => __awaiter(this, void 0, void 0, function* () {
                        yield this.modelToViewModel(model, viewModel, bindingContext);
                        this.eventManager.dispatchEvent("onContentUpdate");
                    })
                };
                viewModel["widgetBinding"] = binding;
            }
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof cardModel_1.CardModel;
    }
}
exports.CardViewModelBinder = CardViewModelBinder;
//# sourceMappingURL=cardViewModelBinder.js.map