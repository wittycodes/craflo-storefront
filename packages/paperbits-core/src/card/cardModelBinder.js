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
exports.CardModelBinder = void 0;
const Utils = require("@paperbits/common/utils");
const cardModel_1 = require("./cardModel");
class CardModelBinder {
    constructor(modelBinderSelector) {
        this.modelBinderSelector = modelBinderSelector;
        this.contractToModel = this.contractToModel.bind(this);
    }
    canHandleContract(contract) {
        return contract.type === "card";
    }
    canHandleModel(model) {
        return model instanceof cardModel_1.CardModel;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new cardModel_1.CardModel();
            if (contract.alignment) {
                contract.alignment = Utils.optimizeBreakpoints(contract.alignment);
                model.alignment = contract.alignment;
            }
            model.overflowX = contract.overflowX;
            model.overflowY = contract.overflowY;
            model.styles = contract.styles;
            if (!contract.nodes) {
                contract.nodes = [];
            }
            const modelPromises = contract.nodes.map((contract) => __awaiter(this, void 0, void 0, function* () {
                const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                return modelBinder.contractToModel(contract, bindingContext);
            }));
            model.widgets = yield Promise.all(modelPromises);
            return model;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "card",
            styles: model.styles,
            nodes: []
        };
        contract.alignment = model.alignment;
        contract.overflowX = model.overflowX;
        contract.overflowY = model.overflowY;
        model.widgets.forEach(widgetModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(widgetModel);
            contract.nodes.push(modelBinder.modelToContract(widgetModel));
        });
        return contract;
    }
}
exports.CardModelBinder = CardModelBinder;
//# sourceMappingURL=cardModelBinder.js.map