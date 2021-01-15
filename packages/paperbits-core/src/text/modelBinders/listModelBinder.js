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
exports.ListModelBinder = void 0;
const listModel_1 = require("@paperbits/common/text/models/listModel");
class ListModelBinder {
    constructor(modelBinderSelector, styleCompiler) {
        this.modelBinderSelector = modelBinderSelector;
        this.styleCompiler = styleCompiler;
        this.listTypes = ["ordered-list", "bulleted-list"];
    }
    canHandleContract(contract) {
        return this.listTypes.includes(contract.type);
    }
    canHandleModel(model) {
        return this.listTypes.includes(model.type);
    }
    contractToModel(contract, bindingContext) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const model = new listModel_1.ListModel(contract.type);
            const localStyles = contract.styles || ((_a = contract.attrs) === null || _a === void 0 ? void 0 : _a.styles);
            let className;
            if (localStyles) {
                className = yield this.styleCompiler.getClassNamesForLocalStylesAsync(localStyles);
            }
            model.attrs = {
                styles: localStyles,
                className: className
            };
            if (contract.nodes && contract.nodes.length > 0) {
                const modelPromises = contract.nodes.map((contract) => __awaiter(this, void 0, void 0, function* () {
                    const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                    return yield modelBinder.contractToModel(contract, bindingContext);
                }));
                model.nodes = yield Promise.all(modelPromises);
            }
            return model;
        });
    }
    modelToContract(model) {
        var _a;
        const contract = {
            nodes: [],
            type: model.type,
            styles: (_a = model.attrs) === null || _a === void 0 ? void 0 : _a.styles
        };
        if (model.nodes && model.nodes.length > 0) {
            model.nodes.forEach(contentItem => {
                const modelBinder = this.modelBinderSelector.getModelBinderByModel(contentItem);
                contract.nodes.push(modelBinder.modelToContract(contentItem));
            });
        }
        return contract;
    }
}
exports.ListModelBinder = ListModelBinder;
//# sourceMappingURL=listModelBinder.js.map