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
class MediaPermalinkResolver {
    constructor(mediaService, blobStorage) {
        this.mediaService = mediaService;
        this.blobStorage = blobStorage;
    }
    canHandleTarget(targetKey) {
        return targetKey.startsWith("uploads/");
    }
    getUrlByTargetKey(mediaKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mediaKey) {
                throw new Error(`Parameter "mediaKey" not specified.`);
            }
            const media = yield this.mediaService.getMediaByKey(mediaKey);
            if (!media) {
                return null;
            }
            let mediaUrl = null;
            if (media.blobKey) {
                mediaUrl = yield this.blobStorage.getDownloadUrl(media.blobKey);
            }
            if (mediaUrl) {
                return mediaUrl;
            }
            if (media.downloadUrl) {
                mediaUrl = media.downloadUrl;
            }
            return mediaUrl;
        });
    }
}
exports.MediaPermalinkResolver = MediaPermalinkResolver;
//# sourceMappingURL=mediaPermalinkResolver.design.js.map