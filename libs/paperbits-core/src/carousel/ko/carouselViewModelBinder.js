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
exports.CarouselViewModelBinder = void 0;
const carousel_1 = require("./carousel");
const carouselModel_1 = require("../carouselModel");
const placeholderViewModel_1 = require("../../placeholder/ko/placeholderViewModel");
const carouselHandlers_1 = require("../carouselHandlers");
const carouselItemViewModel_1 = require("./carouselItemViewModel");
const carouselItemHandlers_1 = require("../carouselItemHandlers");
class CarouselViewModelBinder {
    constructor(viewModelBinderSelector, eventManager, styleCompiler) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
    }
    itemModelToViewModel(model, index, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new carouselItemViewModel_1.CarouselItemViewModel();
            }
            const viewModels = [];
            for (const widgetModel of model.widgets) {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                const widgetViewModel = yield widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);
                viewModels.push(widgetViewModel);
            }
            if (viewModels.length === 0) {
                viewModels.push(new placeholderViewModel_1.PlaceholderViewModel(`Slide ${index + 1}`));
            }
            viewModel.widgets(viewModels);
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            const binding = {
                name: "carousel-item",
                displayName: `Slide ${index + 1}`,
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                flow: "flex",
                editor: "carousel-item-editor",
                handler: carouselItemHandlers_1.CarouselItemHandlers,
                applyChanges: (changes) => __awaiter(this, void 0, void 0, function* () {
                    yield this.itemModelToViewModel(model, index, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            viewModel["widgetBinding"] = binding;
            return viewModel;
        });
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new carousel_1.CarouselViewModel();
            }
            const carouselItemViewModels = [];
            for (const [index, carouselItemModel] of model.carouselItems.entries()) {
                const carouselItemViewModel = yield this.itemModelToViewModel(carouselItemModel, index, null, bindingContext);
                carouselItemViewModels.push(carouselItemViewModel);
            }
            if (carouselItemViewModels.length === 0) {
                carouselItemViewModels.push(new placeholderViewModel_1.PlaceholderViewModel("Carousel"));
            }
            viewModel.carouselItems(carouselItemViewModels);
            viewModel.activeItemIndex(null);
            viewModel.activeItemIndex(0);
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            const binding = {
                name: "carousel",
                displayName: "Carousel",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                flow: "block",
                editor: "carousel-editor",
                handler: carouselHandlers_1.CarouselHandlers,
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
        return model instanceof carouselModel_1.CarouselModel;
    }
}
exports.CarouselViewModelBinder = CarouselViewModelBinder;
//# sourceMappingURL=carouselViewModelBinder.js.map