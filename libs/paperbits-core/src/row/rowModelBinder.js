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
exports.RowModelBinder = void 0;
const rowModel_1 = require("./rowModel");
class RowModelBinder {
    constructor(modelBinderSelector) {
        this.modelBinderSelector = modelBinderSelector;
        this.contractToModel = this.contractToModel.bind(this);
    }
    canHandleContract(contract) {
        return contract.type === "layout-row";
    }
    canHandleModel(model) {
        return model instanceof rowModel_1.RowModel;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const rowModel = new rowModel_1.RowModel();
            if (contract.align) {
                if (contract.align.sm) {
                    rowModel.alignSm = contract.align.sm;
                }
                if (contract.align.md) {
                    rowModel.alignMd = contract.align.md;
                }
                if (contract.align.lg) {
                    rowModel.alignLg = contract.align.lg;
                }
            }
            if (contract.justify) {
                if (contract.justify.sm) {
                    rowModel.justifySm = contract.justify.sm;
                }
                if (contract.justify.md) {
                    rowModel.justifyMd = contract.justify.md;
                }
                if (contract.justify.lg) {
                    rowModel.justifyLg = contract.justify.lg;
                }
            }
            if (!contract.nodes) {
                contract.nodes = [];
            }
            const modelPromises = contract.nodes.map((contract) => __awaiter(this, void 0, void 0, function* () {
                const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                return yield modelBinder.contractToModel(contract, bindingContext);
            }));
            rowModel.widgets = yield Promise.all(modelPromises);
            return rowModel;
        });
    }
    modelToContract(rowModel) {
        const rowConfig = {
            type: "layout-row",
            nodes: []
        };
        rowConfig.align = {};
        rowConfig.align.sm = rowModel.alignSm;
        rowConfig.align.md = rowModel.alignMd;
        rowConfig.align.lg = rowModel.alignLg;
        rowConfig.justify = {};
        rowConfig.justify.sm = rowModel.justifySm;
        rowConfig.justify.md = rowModel.justifyMd;
        rowConfig.justify.lg = rowModel.justifyLg;
        rowModel.widgets.forEach(widgetModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(widgetModel);
            rowConfig.nodes.push(modelBinder.modelToContract(widgetModel));
        });
        return rowConfig;
    }
}
exports.RowModelBinder = RowModelBinder;
//# sourceMappingURL=rowModelBinder.js.map