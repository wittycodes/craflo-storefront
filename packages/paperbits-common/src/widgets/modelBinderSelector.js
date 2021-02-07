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
exports.ModelBinderSelector = exports.PlaceholderModelBinder = void 0;
const placeholder_1 = require("./placeholder");
class PlaceholderModelBinder {
    constructor(message) {
        this.message = message;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            return new placeholder_1.PlaceholderModel(`Could not find model binder for widget type "${contract.type}".`);
        });
    }
    modelToContract(model) {
        return { type: "placeholder" };
    }
    canHandleModel(model) {
        return model instanceof placeholder_1.PlaceholderModel;
    }
    canHandleContract(contract) {
        throw new Error("Not implemented");
    }
}
exports.PlaceholderModelBinder = PlaceholderModelBinder;
class ModelBinderSelector {
    constructor(modelBinders) {
        this.modelBinders = modelBinders;
    }
    getModelBinderByContract(contract) {
        const modelBinder = this.modelBinders.find(x => x && x.canHandleContract ? x.canHandleContract(contract) : false);
        if (!modelBinder) {
            return (new PlaceholderModelBinder());
        }
        return modelBinder;
    }
    getModelBinderByModel(model) {
        const modelBinder = this.modelBinders.find(x => x.canHandleModel(model));
        if (!modelBinder) {
            return new PlaceholderModelBinder();
        }
        return modelBinder;
    }
}
exports.ModelBinderSelector = ModelBinderSelector;
//# sourceMappingURL=modelBinderSelector.js.map