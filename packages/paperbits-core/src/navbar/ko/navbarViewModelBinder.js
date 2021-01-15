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
exports.NavbarViewModelBinder = void 0;
const navbarViewModel_1 = require("./navbarViewModel");
const navbarItemViewModel_1 = require("./navbarItemViewModel");
const navigation_1 = require("@paperbits/common/navigation");
const navbarModel_1 = require("../navbarModel");
class NavbarViewModelBinder {
    constructor(eventManager, navbarModelBinder, styleCompiler) {
        this.eventManager = eventManager;
        this.navbarModelBinder = navbarModelBinder;
        this.styleCompiler = styleCompiler;
    }
    navbarItemModelToNavbarItemViewModel(navbarItemModel) {
        const label = navbarItemModel.label;
        const navbarItemViewModel = new navbarItemViewModel_1.NavbarItemViewModel(label);
        if (navbarItemModel.nodes.length > 0) {
            const results = navbarItemModel.nodes.map(childNode => this.navbarItemModelToNavbarItemViewModel(childNode));
            results.forEach(child => {
                navbarItemViewModel.nodes.push(child);
            });
        }
        else {
            navbarItemViewModel.url(navbarItemModel.targetUrl);
            navbarItemViewModel.isActive(navbarItemModel.isActive);
        }
        return navbarItemViewModel;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let onUpdate;
            if (!viewModel) {
                viewModel = new navbarViewModel_1.NavbarViewModel();
                onUpdate = (updatedRootModel) => __awaiter(this, void 0, void 0, function* () {
                    if (updatedRootModel.key === model.rootKey) {
                        viewModel.navigationRoot(this.navbarItemModelToNavbarItemViewModel(updatedRootModel));
                    }
                });
            }
            if (model.root) {
                const navigationRoot = this.navbarItemModelToNavbarItemViewModel(model.root);
                viewModel.navigationRoot(navigationRoot);
            }
            viewModel.pictureSourceUrl(model.pictureSourceUrl);
            viewModel.pictureWidth(model.pictureWidth);
            viewModel.pictureHeight(model.pictureHeight);
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            viewModel["widgetBinding"] = {
                displayName: "Navigation bar",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                flow: "inline",
                draggable: true,
                applyChanges: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                }),
                onCreate: () => {
                    this.eventManager.addEventListener(navigation_1.NavigationEvents.onNavigationItemUpdate, onUpdate);
                },
                onDispose: () => {
                    this.eventManager.removeEventListener(navigation_1.NavigationEvents.onNavigationItemUpdate, onUpdate);
                }
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof navbarModel_1.NavbarModel;
    }
}
exports.NavbarViewModelBinder = NavbarViewModelBinder;
//# sourceMappingURL=navbarViewModelBinder.js.map