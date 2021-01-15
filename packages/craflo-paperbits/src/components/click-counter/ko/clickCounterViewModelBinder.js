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
exports.ClickCounterViewModelBinder = void 0;
const clickCounterViewModel_1 = require("./clickCounterViewModel");
const clickCounterModel_1 = require("../clickCounterModel");
class ClickCounterViewModelBinder {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new clickCounterViewModel_1.ClickCounterViewModel();
            }
            viewModel.runtimeConfig(JSON.stringify({ initialCount: model.initialCount }));
            const binding = {
                name: "click-counter",
                displayName: "Click counter",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                editor: "click-counter-editor",
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
        return model instanceof clickCounterModel_1.ClickCounterModel;
    }
}
exports.ClickCounterViewModelBinder = ClickCounterViewModelBinder;
