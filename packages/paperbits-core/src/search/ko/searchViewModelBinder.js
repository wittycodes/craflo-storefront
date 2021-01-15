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
exports.SearchViewModelBinder = void 0;
const searchViewModel_1 = require("./searchViewModel");
const searchModel_1 = require("../searchModel");
class SearchViewModelBinder {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new searchViewModel_1.SearchViewModel();
                const binding = {
                    name: "search",
                    displayName: "Search website",
                    readonly: bindingContext ? bindingContext.readonly : false,
                    model: model,
                    flow: "block",
                    draggable: true,
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
        return model instanceof searchModel_1.SearchModel;
    }
}
exports.SearchViewModelBinder = SearchViewModelBinder;
//# sourceMappingURL=searchViewModelBinder.js.map