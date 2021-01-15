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
exports.GridModelBinder = void 0;
const gridModel_1 = require("./gridModel");
class GridModelBinder {
    constructor(modelBinderSelector) {
        this.modelBinderSelector = modelBinderSelector;
    }
    canHandleContract(contract) {
        return contract.type === "grid";
    }
    canHandleModel(model) {
        return model instanceof gridModel_1.GridModel;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new gridModel_1.GridModel();
            contract.nodes = contract.nodes || [];
            model.styles = contract.styles;
            const modelPromises = contract.nodes.map((contract) => __awaiter(this, void 0, void 0, function* () {
                const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                return yield modelBinder.contractToModel(contract, bindingContext);
            }));
            model.widgets = yield Promise.all(modelPromises);
            return model;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "grid",
            nodes: [],
            styles: model.styles
        };
        model.widgets.forEach(widgetModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(widgetModel);
            contract.nodes.push(modelBinder.modelToContract(widgetModel));
        });
        return contract;
    }
}
exports.GridModelBinder = GridModelBinder;
//# sourceMappingURL=gridModelBinder.js.map