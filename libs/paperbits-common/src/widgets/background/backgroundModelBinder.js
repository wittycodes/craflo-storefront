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
exports.BackgroundModelBinder = void 0;
const backgroundModel_1 = require("./backgroundModel");
class BackgroundModelBinder {
    constructor(mediaPermalinkResolver) {
        this.mediaPermalinkResolver = mediaPermalinkResolver;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new backgroundModel_1.BackgroundModel();
            if (contract.color) {
                model.colorKey = contract.color;
            }
            if (contract.size) {
                model.size = contract.size;
            }
            if (contract.position) {
                model.position = contract.position;
            }
            if (contract.picture && contract.picture.sourceKey) {
                model.sourceType = "picture";
                model.sourceKey = contract.picture.sourceKey;
                model.sourceUrl = yield this.mediaPermalinkResolver.getUrlByTargetKey(contract.picture.sourceKey);
            }
            return model;
        });
    }
}
exports.BackgroundModelBinder = BackgroundModelBinder;
//# sourceMappingURL=backgroundModelBinder.js.map