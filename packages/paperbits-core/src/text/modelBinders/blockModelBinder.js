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
exports.BlockModelBinder = void 0;
const Utils = require("@paperbits/common/utils");
const blockModel_1 = require("@paperbits/common/text/models/blockModel");
class BlockModelBinder {
    constructor(modelBinderSelector, styleCompiler) {
        this.modelBinderSelector = modelBinderSelector;
        this.styleCompiler = styleCompiler;
        this.blockTypes = ["paragraph", "list-item", "break", "formatted", "quote", "heading1", "heading2", "heading3", "heading4", "heading5", "heading6"];
    }
    isHeading(type) {
        return /^heading\d$/gm.test(type);
    }
    canHandleContract(contract) {
        return this.blockTypes.includes(contract.type);
    }
    canHandleModel(model) {
        return this.blockTypes.includes(model["type"]);
    }
    contractToModel(contract, bindingContext) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const model = new blockModel_1.BlockModel(contract.type);
            let identifier = contract.identifier || ((_a = contract.attrs) === null || _a === void 0 ? void 0 : _a.id) || ((_b = contract.attrs) === null || _b === void 0 ? void 0 : _b.key);
            const localStyles = contract.styles || ((_c = contract.attrs) === null || _c === void 0 ? void 0 : _c.styles);
            let className;
            if (localStyles) {
                className = yield this.styleCompiler.getClassNamesForLocalStylesAsync(localStyles);
            }
            if (!identifier && this.isHeading(contract.type)) {
                identifier = Utils.identifier();
            }
            model.attrs = {
                id: identifier,
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
        var _a, _b;
        const contract = {
            type: model.type,
            styles: (_a = model.attrs) === null || _a === void 0 ? void 0 : _a.styles,
            identifier: (_b = model.attrs) === null || _b === void 0 ? void 0 : _b.id
        };
        if (!contract.identifier && this.isHeading(contract.type)) {
            contract.identifier = Utils.identifier();
        }
        if (model.nodes && model.nodes.length > 0) {
            contract.nodes = [];
            model.nodes.forEach(contentItem => {
                const modelBinder = this.modelBinderSelector.getModelBinderByModel(contentItem);
                contract.nodes.push(modelBinder.modelToContract(contentItem));
            });
        }
        return contract;
    }
}
exports.BlockModelBinder = BlockModelBinder;
//# sourceMappingURL=blockModelBinder.js.map