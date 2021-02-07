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
exports.TextblockViewModelBinder = void 0;
const textblockViewModel_1 = require("./ko/textblockViewModel");
const textblockModel_1 = require("./textblockModel");
class TextblockViewModelBinder {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new textblockViewModel_1.TextblockViewModel();
            }
            viewModel.state(model.state);
            const widgetBinding = {
                name: "text-block",
                displayName: "Text",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                flow: "block",
                editor: "html-editor",
                editorResize: "horizontally",
                applyChanges: (changes) => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            viewModel["widgetBinding"] = widgetBinding;
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof textblockModel_1.TextblockModel;
    }
}
exports.TextblockViewModelBinder = TextblockViewModelBinder;
//# sourceMappingURL=textblockViewModelBinder.js.map