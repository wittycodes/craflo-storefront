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
exports.TableOfContentsModelBinder = void 0;
const navigation_1 = require("@paperbits/common/navigation");
const tableOfContentsModel_1 = require("./tableOfContentsModel");
class TableOfContentsModelBinder {
    constructor(permalinkResolver, navigationService) {
        this.permalinkResolver = permalinkResolver;
        this.navigationService = navigationService;
    }
    canHandleContract(contract) {
        return contract.type === "table-of-contents";
    }
    canHandleModel(model) {
        return model instanceof tableOfContentsModel_1.TableOfContentsModel;
    }
    processNavigationItem(navigationItem, permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            const navbarItemModel = new navigation_1.NavigationItemModel();
            navbarItemModel.label = navigationItem.label;
            if (navigationItem.targetKey) {
                const targetUrl = yield this.permalinkResolver.getUrlByTargetKey(navigationItem.targetKey);
                navbarItemModel.targetUrl = targetUrl;
                if (targetUrl === permalink) {
                    navbarItemModel.isActive = true;
                }
            }
            return navbarItemModel;
        });
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contract) {
                throw new Error(`Parameter "contract" not specified.`);
            }
            const tableOfContentsModel = new tableOfContentsModel_1.TableOfContentsModel();
            tableOfContentsModel.navigationItemKey = contract.navigationItemKey;
            tableOfContentsModel.minHeading = contract.minHeading || 1;
            tableOfContentsModel.maxHeading = contract.maxHeading || 1;
            tableOfContentsModel.items = [];
            if (contract.navigationItemKey) {
                const currentPageUrl = bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.navigationPath;
                const assignedNavigationItem = yield this.navigationService.getNavigationItem(contract.navigationItemKey);
                tableOfContentsModel.title = tableOfContentsModel.title || assignedNavigationItem.label;
                if (assignedNavigationItem && assignedNavigationItem.navigationItems) {
                    const promises = assignedNavigationItem.navigationItems.map((navigationItem) => __awaiter(this, void 0, void 0, function* () {
                        return yield this.processNavigationItem(navigationItem, currentPageUrl);
                    }));
                    const results = yield Promise.all(promises);
                    tableOfContentsModel.items = results;
                }
            }
            return tableOfContentsModel;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "table-of-contents",
            minHeading: model.minHeading,
            maxHeading: model.maxHeading,
            navigationItemKey: model.navigationItemKey
        };
        return contract;
    }
}
exports.TableOfContentsModelBinder = TableOfContentsModelBinder;
//# sourceMappingURL=tableOfContentsModelBinder.js.map