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
exports.SectionModelBinder = void 0;
const sectionModel_1 = require("./sectionModel");
class SectionModelBinder {
    constructor(modelBinderSelector) {
        this.modelBinderSelector = modelBinderSelector;
    }
    canHandleContract(contract) {
        return contract.type === "layout-section";
    }
    canHandleModel(model) {
        return model instanceof sectionModel_1.SectionModel;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new sectionModel_1.SectionModel();
            contract.nodes = contract.nodes || [];
            model.styles = contract.styles || {};
            const modelPromises = contract.nodes.map((contract) => __awaiter(this, void 0, void 0, function* () {
                const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                return yield modelBinder.contractToModel(contract, bindingContext);
            }));
            model.widgets = yield Promise.all(modelPromises);
            return model;
        });
    }
    modelToContract(sectionModel) {
        const sectionContract = {
            type: "layout-section",
            styles: sectionModel.styles,
            nodes: []
        };
        sectionModel.widgets.forEach(widgetModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(widgetModel);
            sectionContract.nodes.push(modelBinder.modelToContract(widgetModel));
        });
        return sectionContract;
    }
}
exports.SectionModelBinder = SectionModelBinder;
//# sourceMappingURL=sectionModelBinder.js.map