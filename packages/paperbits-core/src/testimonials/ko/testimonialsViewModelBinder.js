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
exports.TestimonialsViewModelBinder = void 0;
const testimonialsViewModel_1 = require("./testimonialsViewModel");
const testimonialsModel_1 = require("../testimonialsModel");
class TestimonialsViewModelBinder {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new testimonialsViewModel_1.TestimonialsViewModel();
            }
            viewModel.textContent(model.textContent);
            viewModel.allStarsCount(model.allStarsCount);
            viewModel.starsCount(model.starsCount);
            viewModel.author(model.author);
            viewModel.authorTitle(model.authorTitle);
            viewModel["widgetBinding"] = {
                displayName: "Testimonials",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                flow: "block",
                draggable: true,
                editor: "testimonials-editor",
                applyChanges: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof testimonialsModel_1.TestimonialsModel;
    }
}
exports.TestimonialsViewModelBinder = TestimonialsViewModelBinder;
//# sourceMappingURL=testimonialsViewModelBinder.js.map