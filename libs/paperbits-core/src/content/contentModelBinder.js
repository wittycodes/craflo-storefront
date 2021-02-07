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
exports.ContentModelBinder = void 0;
const contentModel_1 = require("./contentModel");
const placeholder_1 = require("@paperbits/common/widgets/placeholder");
class ContentModelBinder {
    constructor(modelBinderSelector) {
        this.modelBinderSelector = modelBinderSelector;
    }
    getChildModels(nodes, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelPromises = nodes.map((contract) => {
                const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                return modelBinder.contractToModel(contract, bindingContext);
            });
            return yield Promise.all(modelPromises);
        });
    }
    getChildContracts(models) {
        const nodes = [];
        models.forEach(model => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(model);
            nodes.push(modelBinder.modelToContract(model));
        });
        return nodes;
    }
    canHandleContract(contract) {
        return contract.type === "page";
    }
    canHandleModel(model) {
        return model instanceof contentModel_1.ContentModel;
    }
    contractToModel(contentContract, bindingContext) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const contentModel = new contentModel_1.ContentModel();
            contentModel.type = contentContract.type;
            const templateValue = (_b = (_a = bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.template) === null || _a === void 0 ? void 0 : _a[contentContract.type]) === null || _b === void 0 ? void 0 : _b.value;
            if (templateValue) {
                contentContract = templateValue;
            }
            if (contentContract.nodes) {
                contentModel.widgets = yield this.getChildModels(contentContract.nodes, bindingContext);
            }
            else {
                contentModel.widgets = [new placeholder_1.PlaceholderModel("Content")];
            }
            return contentModel;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "page"
        };
        return contract;
    }
}
exports.ContentModelBinder = ContentModelBinder;
//# sourceMappingURL=contentModelBinder.js.map