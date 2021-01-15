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
exports.NavigationModelBinder = void 0;
const navigation_1 = require("@paperbits/common/navigation");
class NavigationModelBinder {
    constructor(permalinkResolver, router) {
        this.permalinkResolver = permalinkResolver;
        this.router = router;
    }
    canHandleContract(contract) {
        return contract.type === "navitem";
    }
    canHandleModel(model) {
        return model instanceof navigation_1.NavigationItemModel;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contract) {
                throw new Error(`Parameter "contract" not specified.`);
            }
            const model = new navigation_1.NavigationItemModel();
            model.label = contract.label;
            model.key = contract.key;
            model.targetKey = contract.targetKey;
            model.isActive = model.targetUrl === this.router.getPath();
            if (contract.navigationItems) {
                const tasks = [];
                contract.navigationItems.forEach(child => {
                    tasks.push(this.contractToModel(child));
                });
                const results = yield Promise.all(tasks);
                results.forEach(child => {
                    model.nodes.push(child);
                });
            }
            else if (contract.targetKey) {
                const targetUrl = yield this.permalinkResolver.getUrlByTargetKey(contract.targetKey, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.locale);
                model.targetUrl = targetUrl;
            }
            else {
                console.warn(`Navigation item "${model.label}" has no permalink assigned to it.`);
            }
            return model;
        });
    }
    modelToContract(model) {
        const navigationItem = {
            key: model.key,
            label: model.label,
            targetKey: model.targetKey,
            targetWindow: model.targetWindow,
            navigationItems: model.nodes.map(x => this.modelToContract(x))
        };
        return navigationItem;
    }
}
exports.NavigationModelBinder = NavigationModelBinder;
//# sourceMappingURL=navigationModelBinder.js.map