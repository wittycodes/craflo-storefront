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
exports.PermalinkResolver = void 0;
const hyperlinkModel_1 = require("./hyperlinkModel");
class PermalinkResolver {
    constructor(permalinkResolvers) {
        this.permalinkResolvers = permalinkResolvers;
    }
    canHandleTarget(targetKey) {
        if (!targetKey) {
            throw new Error(`Parameter "targetKey" not specified.`);
        }
        return this.permalinkResolvers.some(x => x.canHandleTarget(targetKey));
    }
    getUrlByTargetKey(targetKey, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!targetKey) {
                throw new Error(`Parameter "targetKey" not specified.`);
            }
            let targetUrl = null;
            const permalinkResolver = this.permalinkResolvers.find(x => x.canHandleTarget(targetKey));
            if (!permalinkResolver) {
                console.warn(`Could not find permalink resolver for target key ${targetKey}.`);
                return targetKey;
            }
            try {
                targetUrl = yield permalinkResolver.getUrlByTargetKey(targetKey, locale);
            }
            catch (error) {
                console.warn(`Unable to resolve permalink. ${error.stack || error.message}`);
            }
            return targetUrl;
        });
    }
    getHyperlinkFromContract(hyperlinkContract, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            let hyperlinkModel;
            if (!hyperlinkContract.targetKey) {
                return this.getEmptyHyperlink();
            }
            const permalinkResolver = this.permalinkResolvers.find(x => x.canHandleTarget(hyperlinkContract.targetKey));
            if (!permalinkResolver) {
                console.warn(`Could not find permalink resolver for target key "${hyperlinkContract.targetKey}"`);
                return this.getEmptyHyperlink();
            }
            hyperlinkModel = yield permalinkResolver.getHyperlinkFromContract(hyperlinkContract, locale);
            if (hyperlinkModel) {
                return hyperlinkModel;
            }
            return this.getEmptyHyperlink();
        });
    }
    getHyperlinkByTargetKey(targetKey, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            const permalinkResolver = this.permalinkResolvers.find(x => x.canHandleTarget(targetKey));
            if (!permalinkResolver) {
                console.warn(`Could not find permalink resolver for content item with key "${targetKey}".`);
                return this.getEmptyHyperlink();
            }
            const hyperlink = yield permalinkResolver.getHyperlinkByTargetKey(targetKey, locale);
            return hyperlink || this.getEmptyHyperlink();
        });
    }
    getContentByPermalink(permalink, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const permalinkResolver of this.permalinkResolvers) {
                if (!permalinkResolver.getContentByPermalink) {
                    continue;
                }
                const contentItem = yield (permalinkResolver === null || permalinkResolver === void 0 ? void 0 : permalinkResolver.getContentByPermalink(permalink, locale));
                if (contentItem) {
                    return contentItem;
                }
            }
            return null;
        });
    }
    getContentItemByPermalink(permalink, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const permalinkResolver of this.permalinkResolvers) {
                if (!permalinkResolver.getContentItemByPermalink) {
                    continue;
                }
                const contentItem = yield (permalinkResolver === null || permalinkResolver === void 0 ? void 0 : permalinkResolver.getContentItemByPermalink(permalink, locale));
                if (contentItem) {
                    return contentItem;
                }
            }
            return null;
        });
    }
    getEmptyHyperlink() {
        const hyperlinkModel = new hyperlinkModel_1.HyperlinkModel();
        hyperlinkModel.title = "Unset link";
        hyperlinkModel.target = "_self";
        hyperlinkModel.targetKey = null;
        hyperlinkModel.href = "#";
        hyperlinkModel.anchor = null;
        hyperlinkModel.anchorName = null;
        return hyperlinkModel;
    }
}
exports.PermalinkResolver = PermalinkResolver;
//# sourceMappingURL=permalinkResolver.js.map