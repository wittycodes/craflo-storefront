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
exports.DividerModelBinder = void 0;
const dividerModel_1 = require("./dividerModel");
class DividerModelBinder {
    canHandleContract(contract) {
        return contract.type === "divider";
    }
    canHandleModel(model) {
        return model instanceof dividerModel_1.DividerModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new dividerModel_1.DividerModel();
            model.styles = contract.styles || { appearance: "components/divider/default" };
            return model;
        });
    }
    modelToContract(model) {
        const dividerConfig = {
            type: "divider",
            styles: model.styles
        };
        return dividerConfig;
    }
}
exports.DividerModelBinder = DividerModelBinder;
//# sourceMappingURL=dividerModelBinder.js.map