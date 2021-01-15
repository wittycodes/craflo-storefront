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
exports.InlineModelBinder = void 0;
const models_1 = require("@paperbits/common/text/models");
class InlineModelBinder {
    constructor(styleCompiler, permalinkResolver) {
        this.styleCompiler = styleCompiler;
        this.permalinkResolver = permalinkResolver;
    }
    canHandleContract(contract) {
        return contract.type === "text";
    }
    canHandleModel(model) {
        return model.type === "text";
    }
    contractToModel(contract, bindingContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new models_1.InlineModel();
            model.text = contract.text;
            if (contract.marks && contract.marks.length > 0) {
                const modelPromises = contract.marks.map((markContract) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const markModel = new models_1.MarkModel(markContract.type);
                    switch (markContract.type) {
                        case "hyperlink":
                            const target = markContract["target"];
                            const targetKey = (_a = markContract.attrs) === null || _a === void 0 ? void 0 : _a.targetKey;
                            const anchor = markContract["anchor"];
                            const anchorName = (_b = markContract.attrs) === null || _b === void 0 ? void 0 : _b.anchorName;
                            const download = (targetKey === null || targetKey === void 0 ? void 0 : targetKey.startsWith("uploads/")) ? "" : undefined;
                            const href = targetKey
                                ? yield this.permalinkResolver.getUrlByTargetKey(targetKey, bindingContent === null || bindingContent === void 0 ? void 0 : bindingContent.locale)
                                : null;
                            markModel.attrs = {
                                href: href || "#",
                                target: target,
                                targetKey: targetKey,
                                anchor: anchor,
                                anchorName: anchorName,
                                download: download
                            };
                            break;
                        case "color":
                            const colorModel = markContract.attrs;
                            if (colorModel === null || colorModel === void 0 ? void 0 : colorModel.colorKey) {
                                const colorClass = this.styleCompiler.getClassNameByColorKey(colorModel.colorKey);
                                markModel.attrs = {
                                    colorKey: colorModel.colorKey,
                                    colorClass: colorClass
                                };
                            }
                            break;
                    }
                    return markModel;
                }));
                model.marks = yield Promise.all(modelPromises);
            }
            return model;
        });
    }
    modelToContract(inlineModel) {
        const textContract = {
            type: "text",
            text: inlineModel.text
        };
        if (inlineModel.marks && inlineModel.marks.length > 0) {
            textContract.marks = inlineModel.marks.map(markModel => {
                const contract = { type: markModel.type };
                if (markModel.type === "hyperlink") {
                    const model = markModel.attrs;
                    contract.attrs = {
                        anchor: model["anchor"],
                        anchorName: model["anchorName"],
                        target: model["target"],
                        targetKey: model["targetKey"]
                    };
                }
                else {
                    if (markModel.type === "color") {
                        const model = markModel.attrs;
                        if (model && model.colorKey) {
                            contract.attrs = {
                                colorKey: model.colorKey
                            };
                        }
                    }
                }
                return contract;
            });
        }
        return textContract;
    }
}
exports.InlineModelBinder = InlineModelBinder;
//# sourceMappingURL=inlineModelBinder.js.map