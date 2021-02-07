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
exports.NavigationService = void 0;
const navigationItemsPath = "navigationItems";
class NavigationService {
    constructor(objectStorage) {
        this.objectStorage = objectStorage;
    }
    find(items, key) {
        for (const item of items) {
            if (item.key === key) {
                return item;
            }
            else if (item.navigationItems) {
                const child = this.find(item.navigationItems, key);
                if (child) {
                    return child;
                }
            }
        }
    }
    getNavigationItem(navigationItemKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.getNavigationItems();
            return this.find(items, navigationItemKey);
        });
    }
    getNavigationItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.objectStorage.getObject(navigationItemsPath);
            return result ? Object.values(result) : [];
        });
    }
    updateNavigation(navigationItems) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.objectStorage.updateObject(`${navigationItemsPath}`, navigationItems);
        });
    }
}
exports.NavigationService = NavigationService;
//# sourceMappingURL=navigationService.js.map