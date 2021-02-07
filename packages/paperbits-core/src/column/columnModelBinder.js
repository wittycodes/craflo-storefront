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
exports.ColumnModelBinder = void 0;
const Utils = require("@paperbits/common/utils");
const columnModel_1 = require("./columnModel");
class ColumnModelBinder {
    constructor(modelBinderSelector) {
        this.modelBinderSelector = modelBinderSelector;
        this.contractToModel = this.contractToModel.bind(this);
    }
    canHandleContract(contract) {
        return contract.type === "layout-column";
    }
    canHandleModel(model) {
        return model instanceof columnModel_1.ColumnModel;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const columnModel = new columnModel_1.ColumnModel();
            if (contract.size) {
                contract.size = Utils.optimizeBreakpoints(contract.size);
                columnModel.size = contract.size;
            }
            if (contract.alignment) {
                contract.alignment = Utils.optimizeBreakpoints(contract.alignment);
                columnModel.alignment = contract.alignment;
            }
            if (contract.offset) {
                contract.offset = Utils.optimizeBreakpoints(contract.offset);
                columnModel.offset = contract.offset;
            }
            if (contract.order) {
                contract.order = Utils.optimizeBreakpoints(contract.order);
                columnModel.order = contract.order;
            }
            columnModel.overflowX = contract.overflowX;
            columnModel.overflowY = contract.overflowY;
            if (!contract.nodes) {
                contract.nodes = [];
            }
            const modelPromises = contract.nodes.map((contract) => __awaiter(this, void 0, void 0, function* () {
                const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                return modelBinder.contractToModel(contract, bindingContext);
            }));
            columnModel.widgets = yield Promise.all(modelPromises);
            return columnModel;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "layout-column",
            nodes: []
        };
        contract.size = model.size;
        contract.alignment = model.alignment;
        contract.offset = model.offset;
        contract.order = model.order;
        contract.overflowX = model.overflowX;
        contract.overflowY = model.overflowY;
        model.widgets.forEach(widgetModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(widgetModel);
            contract.nodes.push(modelBinder.modelToContract(widgetModel));
        });
        return contract;
    }
}
exports.ColumnModelBinder = ColumnModelBinder;
//# sourceMappingURL=columnModelBinder.js.map