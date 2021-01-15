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
exports.ClickCounterModelBinder = void 0;
const clickCounterModel_1 = require("./clickCounterModel");
class ClickCounterModelBinder {
    canHandleContract(contract) {
        return contract.type === "click-counter";
    }
    canHandleModel(model) {
        return model instanceof clickCounterModel_1.ClickCounterModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new clickCounterModel_1.ClickCounterModel();
            model.initialCount = contract.initialCount;
            return model;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "click-counter",
            initialCount: model.initialCount
        };
        return contract;
    }
}
exports.ClickCounterModelBinder = ClickCounterModelBinder;
