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
exports.PictureModelBinder = void 0;
const pictureModel_1 = require("./pictureModel");
class PictureModelBinder {
    constructor(permalinkResolver) {
        this.permalinkResolver = permalinkResolver;
    }
    canHandleContract(contract) {
        return contract.type === "picture";
    }
    canHandleModel(model) {
        return model instanceof pictureModel_1.PictureModel;
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new pictureModel_1.PictureModel();
            model.caption = contract.caption;
            model.width = contract.width;
            model.height = contract.height;
            model.styles = contract.styles || { appearance: "components/picture/default" };
            model.sourceKey = contract.sourceKey;
            if (contract.hyperlink) {
                try {
                    model.hyperlink = yield this.permalinkResolver.getHyperlinkByTargetKey(contract.hyperlink.targetKey, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.locale);
                }
                catch (error) {
                    console.log(error);
                }
            }
            return model;
        });
    }
    modelToContract(pictureModel) {
        const pictureContract = {
            type: "picture",
            caption: pictureModel.caption,
            width: pictureModel.width,
            height: pictureModel.height,
            styles: pictureModel.styles
        };
        if (pictureModel.sourceKey) {
            pictureContract.sourceKey = pictureModel.sourceKey;
        }
        if (pictureModel.hyperlink) {
            pictureContract.hyperlink = {
                target: pictureModel.hyperlink.target,
                targetKey: pictureModel.hyperlink.targetKey
            };
        }
        return pictureContract;
    }
}
exports.PictureModelBinder = PictureModelBinder;
//# sourceMappingURL=pictureModelBinder.js.map