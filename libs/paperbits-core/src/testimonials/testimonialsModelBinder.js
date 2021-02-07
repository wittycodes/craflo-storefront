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
exports.TestimonialsModelBinder = void 0;
const _1 = require(".");
class TestimonialsModelBinder {
    constructor() {
        this.contractToModel = this.contractToModel.bind(this);
    }
    canHandleContract(contract) {
        return contract.type === "testimonials";
    }
    canHandleModel(model) {
        return model instanceof _1.TestimonialsModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new _1.TestimonialsModel();
            model.textContent = contract.textContent;
            model.allStarsCount = contract.allStarsCount || 0;
            model.starsCount = contract.starsCount || 0;
            model.author = contract.author;
            model.authorTitle = contract.authorTitle;
            return model;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "testimonials",
            textContent: model.textContent,
            starsCount: model.starsCount,
            allStarsCount: model.allStarsCount,
            author: model.author,
            authorTitle: model.authorTitle
        };
        return contract;
    }
}
exports.TestimonialsModelBinder = TestimonialsModelBinder;
//# sourceMappingURL=testimonialsModelBinder.js.map