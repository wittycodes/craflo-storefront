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
exports.MenuModelBinder = void 0;
const navigation_1 = require("@paperbits/common/navigation");
const user_1 = require("@paperbits/common/user");
const anchorUtils_1 = require("../text/anchorUtils");
const menuModel_1 = require("./menuModel");
class MenuModelBinder {
    constructor(permalinkResolver, navigationService, localeService) {
        this.permalinkResolver = permalinkResolver;
        this.navigationService = navigationService;
        this.localeService = localeService;
    }
    canHandleContract(contract) {
        return contract.type === "menu";
    }
    canHandleModel(model) {
        return model instanceof menuModel_1.MenuModel;
    }
    getLanguageNavigationMenu(bindingContext, layout) {
        return __awaiter(this, void 0, void 0, function* () {
            const locales = yield this.localeService.getLocales();
            const defaultLocale = yield this.localeService.getDefaultLocale();
            const requestedLocaleCode = (bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.locale) || defaultLocale;
            const requestedLocale = locales.find(x => x.code === requestedLocaleCode);
            const languageNavItems = [];
            for (const locale of locales) {
                const targetUrl = (bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.contentItemKey) ? yield this.permalinkResolver.getUrlByTargetKey(bindingContext.contentItemKey, locale.code)
                    : "/";
                let isActive = false;
                if (locale.code === requestedLocale.code) {
                    if (layout === "horizontal") {
                        continue;
                    }
                    isActive = true;
                }
                const languageNavItem = new navigation_1.NavigationItemModel();
                languageNavItem.label = locale.displayName;
                languageNavItem.targetUrl = targetUrl;
                languageNavItem.isActive = isActive;
                languageNavItems.push(languageNavItem);
            }
            let topLevelChildren;
            switch (layout) {
                case "horizontal":
                    topLevelChildren = [{
                            label: requestedLocale === null || requestedLocale === void 0 ? void 0 : requestedLocale.displayName,
                            nodes: languageNavItems
                        }];
                    break;
                case "vertical":
                    topLevelChildren = languageNavItems;
                    break;
                default:
                    throw new Error(`Unsupported menu widget layout: ${layout}`);
            }
            const topLevelNavItem = new navigation_1.NavigationItemModel();
            topLevelNavItem.label = "Languages";
            topLevelNavItem.nodes = topLevelChildren;
            return topLevelNavItem;
        });
    }
    processNavigationItem(locale, contract, permalink, minHeading, maxHeading, level = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const navitemModel = new navigation_1.NavigationItemModel();
            navitemModel.label = contract.label;
            if (contract.navigationItems) {
                const tasks = [];
                contract.navigationItems.forEach(child => {
                    tasks.push(this.processNavigationItem(locale, child, permalink, minHeading, maxHeading, level + 1));
                });
                const results = yield Promise.all(tasks);
                results.forEach(child => {
                    navitemModel.nodes.push(child);
                });
            }
            if (!contract.targetKey) {
                return navitemModel;
            }
            const targetUrl = yield this.permalinkResolver.getUrlByTargetKey(contract.targetKey, locale);
            navitemModel.targetUrl = targetUrl;
            navitemModel.targetWindow = contract.targetWindow;
            if (targetUrl === permalink) {
                navitemModel.isActive = true;
            }
            if (level > 0 && minHeading && maxHeading && navitemModel.targetUrl === permalink) {
                const localNavItems = yield this.processAnchorItems(permalink, locale, minHeading, maxHeading);
                navitemModel.nodes.push(...localNavItems);
            }
            return navitemModel;
        });
    }
    processAnchorItems(permalink, locale, minHeading, maxHeading) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield this.permalinkResolver.getContentByPermalink(permalink, locale);
            if (!content) {
                return [];
            }
            const children = anchorUtils_1.AnchorUtils.getHeadingNodes(content, minHeading, maxHeading);
            if (children.length === 0) {
                return [];
            }
            return children.map((item) => {
                var _a, _b;
                const itemModel = new navigation_1.NavigationItemModel();
                itemModel.label = item.nodes[0].text;
                itemModel.targetUrl = `#${item.identifier || ((_a = item.attrs) === null || _a === void 0 ? void 0 : _a.id) || ((_b = item.attrs) === null || _b === void 0 ? void 0 : _b.key)}`;
                return itemModel;
            });
        });
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contract) {
                throw new Error(`Parameter "contract" not specified.`);
            }
            const menuModel = new menuModel_1.MenuModel();
            menuModel.minHeading = contract.minHeading;
            menuModel.maxHeading = contract.maxHeading;
            menuModel.items = [];
            menuModel.layout = contract.layout;
            menuModel.roles = contract.roles || [user_1.BuiltInRoles.everyone.key];
            menuModel.styles = contract.styles || { appearance: "components/menu/default" };
            const currentPageUrl = bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.navigationPath;
            if (contract.navigationItemKey) {
                let root;
                if (contract.navigationItemKey === "@locales") {
                    root = yield this.getLanguageNavigationMenu(bindingContext, menuModel.layout);
                }
                else {
                    const rootNavigationItem = yield this.navigationService.getNavigationItem(contract.navigationItemKey);
                    if (rootNavigationItem) {
                        root = yield this.processNavigationItem(bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.locale, rootNavigationItem, currentPageUrl, menuModel.minHeading, menuModel.maxHeading);
                    }
                }
                if (root) {
                    menuModel.items = root.nodes;
                    menuModel.navigationItem = root;
                    menuModel.navigationItem.key = contract.navigationItemKey;
                }
            }
            if (menuModel.items.length === 0 && menuModel.minHeading && menuModel.maxHeading) {
                const localNavItems = yield this.processAnchorItems(currentPageUrl, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.locale, menuModel.minHeading, menuModel.maxHeading);
                menuModel.items.push(...localNavItems);
            }
            return menuModel;
        });
    }
    modelToContract(model) {
        var _a;
        const roles = model.roles
            && model.roles.length === 1
            && model.roles[0] === user_1.BuiltInRoles.everyone.key
            ? null
            : model.roles;
        const contract = {
            type: "menu",
            minHeading: model.minHeading,
            maxHeading: model.maxHeading,
            navigationItemKey: (_a = model.navigationItem) === null || _a === void 0 ? void 0 : _a.key,
            layout: model.layout,
            styles: model.styles,
            roles: roles
        };
        return contract;
    }
}
exports.MenuModelBinder = MenuModelBinder;
//# sourceMappingURL=menuModelBinder.js.map