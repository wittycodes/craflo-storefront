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
exports.UrlPermalinkResolver = void 0;
const permalinks_1 = require("../permalinks");
class UrlPermalinkResolver {
    constructor(urlService) {
        this.urlService = urlService;
    }
    canHandleTarget(targetKey) {
        return targetKey.startsWith("urls/");
    }
    getUrlByTargetKey(targetKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!targetKey.startsWith("urls/")) {
                return null;
            }
            try {
                const contentItem = yield this.urlService.getUrlByKey(targetKey);
                if (!contentItem) {
                    console.warn(`Could not find permalink by key ${targetKey}.`);
                    return null;
                }
                return contentItem.permalink;
            }
            catch (error) {
                return null;
            }
        });
    }
    getHyperlink(urlContract, target = "_self") {
        return __awaiter(this, void 0, void 0, function* () {
            const hyperlinkModel = new permalinks_1.HyperlinkModel();
            hyperlinkModel.targetKey = urlContract.key;
            hyperlinkModel.href = urlContract.permalink;
            hyperlinkModel.title = urlContract.title || urlContract.permalink;
            hyperlinkModel.target = target;
            return hyperlinkModel;
        });
    }
    getHyperlinkFromContract(hyperlinkContract, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hyperlinkContract.targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!hyperlinkContract.targetKey.startsWith("urls/")) {
                return null;
            }
            let hyperlinkModel;
            if (hyperlinkContract.targetKey) {
                const urlContract = yield this.urlService.getUrlByKey(hyperlinkContract.targetKey, locale);
                if (urlContract) {
                    return this.getHyperlink(urlContract, hyperlinkContract.target);
                }
            }
            hyperlinkModel = new permalinks_1.HyperlinkModel();
            hyperlinkModel.title = "Unset link";
            hyperlinkModel.target = hyperlinkContract.target;
            hyperlinkModel.targetKey = hyperlinkContract.targetKey;
            hyperlinkModel.href = "#";
            hyperlinkModel.anchor = hyperlinkContract.anchor;
            return hyperlinkModel;
        });
    }
    getHyperlinkByTargetKey(targetKey, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!targetKey.startsWith("urls/")) {
                return null;
            }
            const contentItem = yield this.urlService.getUrlByKey(targetKey, locale);
            if (!contentItem) {
                return null;
            }
            const hyperlink = yield this.getHyperlink(contentItem);
            return hyperlink;
        });
    }
}
exports.UrlPermalinkResolver = UrlPermalinkResolver;
//# sourceMappingURL=urlPermalinkResolver.js.map