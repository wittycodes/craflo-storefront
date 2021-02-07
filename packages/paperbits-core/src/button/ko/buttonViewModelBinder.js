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
exports.ButtonViewModelBinder = void 0;
const buttonViewModel_1 = require("./buttonViewModel");
const Utils = require("@paperbits/common/utils");
const buttonModel_1 = require("../buttonModel");
class ButtonViewModelBinder {
    constructor(eventManager, styleCompiler) {
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new buttonViewModel_1.Button();
            }
            viewModel.label(model.label);
            viewModel.hyperlink(model.hyperlink);
            viewModel.roles(model.roles);
            if (model.iconKey) {
                const segments = model.iconKey.split("/");
                const name = segments[1];
                viewModel.icon(`icon icon-${Utils.camelCaseToKebabCase(name.replace("/", "-"))}`);
            }
            else {
                viewModel.icon(null);
            }
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            viewModel["widgetBinding"] = {
                displayName: "Button",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                flow: "inline",
                editor: "button-editor",
                applyChanges: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof buttonModel_1.ButtonModel;
    }
}
exports.ButtonViewModelBinder = ButtonViewModelBinder;
//# sourceMappingURL=buttonViewModelBinder.js.map