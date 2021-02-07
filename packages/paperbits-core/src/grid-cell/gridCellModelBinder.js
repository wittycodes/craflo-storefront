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
exports.GridCellModelBinder = void 0;
const gridCellModel_1 = require("./gridCellModel");
const content_1 = require("../content");
class GridCellModelBinder extends content_1.ContentModelBinder {
    constructor(modelBinderSelector) {
        super(modelBinderSelector);
        this.modelBinderSelector = modelBinderSelector;
    }
    canHandleContract(contract) {
        return contract.type === "grid-cell";
    }
    canHandleModel(model) {
        return model instanceof gridCellModel_1.GridCellModel;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const gridCellModel = new gridCellModel_1.GridCellModel();
            if (contract.styles) {
                gridCellModel.styles = contract.styles;
            }
            gridCellModel.role = contract.role;
            if (!contract.nodes) {
                contract.nodes = [];
            }
            gridCellModel.widgets = yield this.getChildModels(contract.nodes, bindingContext);
            return gridCellModel;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "grid-cell",
            nodes: [],
            role: model.role,
            styles: model.styles
        };
        model.widgets.forEach(widgetModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(widgetModel);
            contract.nodes.push(modelBinder.modelToContract(widgetModel));
        });
        return contract;
    }
}
exports.GridCellModelBinder = GridCellModelBinder;
//# sourceMappingURL=gridCellModelBinder.js.map