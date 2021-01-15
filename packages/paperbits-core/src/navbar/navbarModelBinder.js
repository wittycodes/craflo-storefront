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
exports.NavbarModelBinder = void 0;
const navigation_1 = require("@paperbits/common/navigation");
const navbarModel_1 = require("./navbarModel");
class NavbarModelBinder {
    constructor(mediaPermalinkResolver, navigationService, permalinkResolver, router) {
        this.mediaPermalinkResolver = mediaPermalinkResolver;
        this.navigationService = navigationService;
        this.permalinkResolver = permalinkResolver;
        this.router = router;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contract) {
                throw new Error(`Parameter "contract" not specified.`);
            }
            const navbarModel = new navbarModel_1.NavbarModel();
            const navigationItemContract = yield this.navigationService.getNavigationItem(contract.rootKey);
            if (navigationItemContract) {
                const navbarItemModel = yield this.navigationItemToNavbarItemModel(navigationItemContract, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.locale);
                navbarModel.root = navbarItemModel;
            }
            navbarModel.rootKey = contract.rootKey;
            navbarModel.pictureSourceKey = contract.pictureSourceKey;
            if (contract.pictureSourceKey) {
                navbarModel.pictureSourceKey = contract.pictureSourceKey;
                navbarModel.pictureSourceUrl = yield this.mediaPermalinkResolver.getUrlByTargetKey(contract.pictureSourceKey);
                navbarModel.pictureWidth = contract.pictureWidth;
                navbarModel.pictureHeight = contract.pictureHeight;
                if (!navbarModel.pictureSourceUrl) {
                    console.warn(`Unable to set navbar branding. Media with source key ${contract.pictureSourceKey} not found.`);
                }
            }
            navbarModel.styles = contract.styles || { appearance: "components/navbar/default" };
            return navbarModel;
        });
    }
    canHandleContract(contract) {
        return contract.type === "navbar";
    }
    canHandleModel(model) {
        return model instanceof navbarModel_1.NavbarModel;
    }
    navigationItemToNavbarItemModel(contract, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contract) {
                throw new Error(`Parameter "contract" not specified.`);
            }
            const navigationItem = new navigation_1.NavigationItemModel();
            navigationItem.label = contract.label;
            if (contract.navigationItems) {
                const tasks = [];
                contract.navigationItems.forEach(child => {
                    tasks.push(this.navigationItemToNavbarItemModel(child, locale));
                });
                const results = yield Promise.all(tasks);
                results.forEach(child => {
                    navigationItem.nodes.push(child);
                });
            }
            else if (contract.targetKey) {
                const targetUrl = yield this.permalinkResolver.getUrlByTargetKey(contract.targetKey, locale);
                navigationItem.targetUrl = targetUrl;
            }
            else {
                console.warn(`Navigation item "${navigationItem.label}" has no permalink assigned to it.`);
            }
            navigationItem.isActive = navigationItem.targetUrl === this.router.getPath();
            return navigationItem;
        });
    }
    modelToContract(navbarModel) {
        const navbarContract = {
            type: "navbar",
            rootKey: navbarModel.rootKey,
            pictureSourceKey: navbarModel.pictureSourceKey,
            pictureWidth: navbarModel.pictureWidth,
            pictureHeight: navbarModel.pictureHeight,
            styles: navbarModel.styles
        };
        return navbarContract;
    }
}
exports.NavbarModelBinder = NavbarModelBinder;
//# sourceMappingURL=navbarModelBinder.js.map