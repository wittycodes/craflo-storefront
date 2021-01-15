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
exports.MediaPermalinkResolver = void 0;
const permalinks_1 = require("../permalinks");
class MediaPermalinkResolver {
    constructor(mediaService) {
        this.mediaService = mediaService;
        this.mediaPath = "uploads/";
    }
    canHandleTarget(targetKey) {
        return targetKey.startsWith("uploads/");
    }
    getUrlByTargetKey(mediaKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mediaKey) {
                throw new Error(`Parameter "mediaKey" not specified.`);
            }
            try {
                const media = yield this.mediaService.getMediaByKey(mediaKey);
                if (!media) {
                    console.warn(`Could not find permalink by key ${mediaKey}.`);
                    return null;
                }
                return media.permalink;
            }
            catch (error) {
                console.warn(`Could not fetch permalink by key ${mediaKey}.`);
                return null;
            }
        });
    }
    getHyperlink(mediaContract, hyperlinkContract) {
        return __awaiter(this, void 0, void 0, function* () {
            const hyperlinkModel = new permalinks_1.HyperlinkModel();
            hyperlinkModel.targetKey = mediaContract.key;
            hyperlinkModel.href = mediaContract.permalink;
            hyperlinkModel.title = mediaContract.fileName || mediaContract.permalink;
            if (hyperlinkContract) {
                hyperlinkModel.target = hyperlinkContract.target;
                hyperlinkModel.anchor = hyperlinkContract.anchor;
                hyperlinkModel.anchorName = hyperlinkContract.anchorName;
            }
            return hyperlinkModel;
        });
    }
    getHyperlinkByTargetKey(targetKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!targetKey.startsWith(this.mediaPath)) {
                return null;
            }
            const mediaContract = yield this.mediaService.getMediaByKey(targetKey);
            if (!mediaContract) {
                console.warn(`Could create hyperlink for target with key ${targetKey}.`);
                return null;
            }
            const hyperlink = yield this.getHyperlink(mediaContract);
            return hyperlink;
        });
    }
    getContentItemByPermalink(permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                throw new Error(`Parameter "permalink" not specified.`);
            }
            const mediaContract = yield this.mediaService.getMediaByPermalink(permalink);
            return mediaContract;
        });
    }
    getHyperlinkFromContract(hyperlinkContract, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hyperlinkContract.targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!hyperlinkContract.targetKey.startsWith(this.mediaPath)) {
                return null;
            }
            let hyperlinkModel;
            if (hyperlinkContract.targetKey) {
                const mediaContract = yield this.mediaService.getMediaByKey(hyperlinkContract.targetKey);
                if (mediaContract) {
                    return this.getHyperlink(mediaContract, hyperlinkContract);
                }
            }
            hyperlinkModel = new permalinks_1.HyperlinkModel();
            hyperlinkModel.title = "Unset link";
            hyperlinkModel.target = hyperlinkContract.target;
            hyperlinkModel.targetKey = hyperlinkContract.targetKey;
            hyperlinkModel.href = "#";
            hyperlinkModel.anchor = hyperlinkContract.anchor;
            hyperlinkModel.anchorName = hyperlinkContract.anchorName;
            return hyperlinkModel;
        });
    }
}
exports.MediaPermalinkResolver = MediaPermalinkResolver;
//# sourceMappingURL=mediaPermalinkResolver.publish.js.map