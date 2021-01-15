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
exports.SearchModelBinder = void 0;
const searchModel_1 = require("./searchModel");
class SearchModelBinder {
    constructor() {
        this.contractToModel = this.contractToModel.bind(this);
    }
    canHandleContract(contract) {
        return contract.type === "search";
    }
    canHandleModel(model) {
        return model instanceof searchModel_1.SearchModel;
    }
    contractToModel(searchContract) {
        return __awaiter(this, void 0, void 0, function* () {
            return new searchModel_1.SearchModel();
        });
    }
    modelToContract(searchModel) {
        const searchConfig = {
            type: "search"
        };
        return searchConfig;
    }
}
exports.SearchModelBinder = SearchModelBinder;
//# sourceMappingURL=searchModelBinder.js.map