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
exports.TextblockModelBinder = void 0;
const textblockModel_1 = require("./textblockModel");
class TextblockModelBinder {
    constructor(modelBinderSelector) {
        this.modelBinderSelector = modelBinderSelector;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = [];
            if (contract.nodes && contract.nodes.length > 0) {
                const modelPromises = contract.nodes.map((contract) => __awaiter(this, void 0, void 0, function* () {
                    const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                    return yield modelBinder.contractToModel(contract, bindingContext);
                }));
                content = yield Promise.all(modelPromises);
            }
            return new textblockModel_1.TextblockModel(content);
        });
    }
    canHandleContract(contract) {
        return contract.type === "text-block";
    }
    canHandleModel(model) {
        return model instanceof textblockModel_1.TextblockModel;
    }
    modelToContract(model) {
        let state;
        const isArray = Array.isArray(model.state);
        if (isArray) {
            const contentItems = model.state;
            if (contentItems && contentItems.length > 0) {
                state = contentItems.map(contentItem => {
                    const modelBinder = this.modelBinderSelector.getModelBinderByModel(contentItem);
                    return modelBinder.modelToContract(contentItem);
                });
            }
        }
        const contract = {
            type: "text-block",
            nodes: state
        };
        return contract;
    }
}
exports.TextblockModelBinder = TextblockModelBinder;
//# sourceMappingURL=textblockModelBinder.js.map