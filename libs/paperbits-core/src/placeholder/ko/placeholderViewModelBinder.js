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
exports.PlaceholderViewModelBinder = void 0;
const placeholder_1 = require("@paperbits/common/widgets/placeholder");
const placeholderViewModel_1 = require("./placeholderViewModel");
class PlaceholderViewModelBinder {
    modelToViewModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return new placeholderViewModel_1.PlaceholderViewModel(model.message);
        });
    }
    canHandleModel(model) {
        return model instanceof placeholder_1.PlaceholderModel;
    }
}
exports.PlaceholderViewModelBinder = PlaceholderViewModelBinder;
//# sourceMappingURL=placeholderViewModelBinder.js.map