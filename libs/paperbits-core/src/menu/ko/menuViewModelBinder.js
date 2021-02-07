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
exports.MenuViewModelBinder = void 0;
const menuViewModel_1 = require("./menuViewModel");
const menuModel_1 = require("../menuModel");
const menuItemViewModel_1 = require("./menuItemViewModel");
const navigation_1 = require("@paperbits/common/navigation");
class MenuViewModelBinder {
    constructor(eventManager, menuModelBinder, styleCompiler) {
        this.eventManager = eventManager;
        this.menuModelBinder = menuModelBinder;
        this.styleCompiler = styleCompiler;
    }
    menuItemModelToViewModel(navitem, level = 0) {
        level++;
        const viewModel = new menuItemViewModel_1.MenuItemViewModel();
        viewModel.label(navitem.label);
        viewModel.targetUrl(navitem.targetUrl);
        viewModel.targetWindow(navitem.targetWindow);
        viewModel.isActive(navitem.isActive);
        viewModel.level(level);
        if (navitem.nodes) {
            viewModel.nodes(navitem.nodes.map(x => this.menuItemModelToViewModel(x, level)));
        }
        return viewModel;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new menuViewModel_1.MenuViewModel();
            }
            const menuItems = model.items.map(menuItem => this.menuItemModelToViewModel(menuItem));
            viewModel.nodes(menuItems);
            viewModel.layout(model.layout);
            viewModel.roles(model.roles);
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            const onUpdate = (updatedRootModel) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (updatedRootModel.key === ((_a = model.navigationItem) === null || _a === void 0 ? void 0 : _a.key)) {
                    const menuItems = updatedRootModel.nodes.map(menuItem => this.menuItemModelToViewModel(menuItem));
                    viewModel.nodes(menuItems);
                }
            });
            const binding = {
                name: "menu",
                displayName: "Menu",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                flow: "inline",
                draggable: true,
                editor: "menu-editor",
                applyChanges: (updates) => __awaiter(this, void 0, void 0, function* () {
                    var _b;
                    const contract = {
                        type: "menu",
                        navigationItemKey: (_b = updates.navigationItem) === null || _b === void 0 ? void 0 : _b.key,
                        layout: updates.layout,
                        roles: updates.roles,
                        minHeading: updates.minHeading,
                        maxHeading: updates.maxHeading,
                        styles: updates.styles
                    };
                    const model1 = yield this.menuModelBinder.contractToModel(contract, bindingContext);
                    model.navigationItem = model1.navigationItem;
                    model.items = model1.items;
                    model.layout = model1.layout;
                    model.roles = model1.roles;
                    model.minHeading = model1.minHeading;
                    model.maxHeading = model1.maxHeading;
                    model.styles = model1.styles;
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
            viewModel["widgetBinding"] = binding;
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof menuModel_1.MenuModel;
    }
}
exports.MenuViewModelBinder = MenuViewModelBinder;
//# sourceMappingURL=menuViewModelBinder.js.map