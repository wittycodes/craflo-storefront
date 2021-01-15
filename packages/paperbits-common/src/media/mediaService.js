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
exports.MediaService = void 0;
const Utils = require("../utils");
const Constants = require("./constants");
const persistence_1 = require("../persistence");
class MediaService {
    constructor(objectStorage, blobStorage) {
        this.objectStorage = objectStorage;
        this.blobStorage = blobStorage;
    }
    getMediaByPermalink(permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                throw new Error(`Parameter "permalink" not specified.`);
            }
            const query = persistence_1.Query
                .from()
                .where("permalink", persistence_1.Operator.equals, permalink);
            const pageOfObjects = yield this.objectStorage.searchObjects(Constants.mediaRoot, query);
            const result = pageOfObjects.value;
            const uploads = Object.values(result);
            return uploads.length > 0 ? uploads[0] : null;
        });
    }
    getMediaByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key) {
                throw new Error(`Parameter "key" not specified.`);
            }
            const media = yield this.objectStorage.getObject(key);
            if (!media) {
                console.warn(`Media with key ${key} not found.`);
                return null;
            }
            if (media.blobKey) {
                const downloadUrl = yield this.getDownloadUrlFromBlobKey(media.blobKey);
                media.downloadUrl = downloadUrl || media.downloadUrl;
            }
            return media;
        });
    }
    getDownloadUrlFromBlobKey(blobKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.blobStorage.getDownloadUrl(blobKey);
            }
            catch (error) {
            }
            return undefined;
        });
    }
    convertPage(pageOfMedia) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const media of pageOfMedia.value) {
                if (!media.blobKey) {
                    continue;
                }
                media.downloadUrl = yield this.getDownloadUrlFromBlobKey(media.blobKey);
            }
            const resultPage = {
                value: pageOfMedia.value,
                takeNext: () => __awaiter(this, void 0, void 0, function* () {
                    const nextPage = yield pageOfMedia.takeNext();
                    return this.convertPage(nextPage);
                })
            };
            if (!pageOfMedia.takeNext) {
                resultPage.takeNext = null;
            }
            return resultPage;
        });
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query) {
                throw new Error(`Parameter "query" not specified.`);
            }
            try {
                const pageOfResults = yield this.objectStorage.searchObjects(Constants.mediaRoot, query);
                const pageOfMedia = this.convertPage(pageOfResults);
                return pageOfMedia;
            }
            catch (error) {
                throw new Error(`Unable to search media: ${error.stack || error.message}`);
            }
        });
    }
    deleteMedia(media) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!media) {
                throw new Error(`Parameter "media" not specified.`);
            }
            try {
                yield this.objectStorage.deleteObject(media.key);
                yield this.blobStorage.deleteBlob(media.blobKey);
            }
            catch (error) {
                console.warn(error);
            }
        });
    }
    createMedia(name, content, mimeType) {
        const blobKey = Utils.guid();
        const mediaKey = `${Constants.mediaRoot}/${blobKey}`;
        const media = {
            key: mediaKey,
            fileName: name,
            blobKey: blobKey,
            description: "",
            keywords: "",
            permalink: `/content/${name}`,
            mimeType: mimeType
        };
        return this.uploadContent(content, media);
    }
    createMediaUrl(name, downloadUrl, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            const blobKey = Utils.guid();
            const mediaKey = `${Constants.mediaRoot}/${blobKey}`;
            const media = {
                key: mediaKey,
                fileName: name,
                blobKey: undefined,
                downloadUrl: downloadUrl,
                description: "",
                keywords: "",
                permalink: `/content/${name}`,
                mimeType: mimeType
            };
            yield this.updateMedia(media);
            return media;
        });
    }
    uploadContent(content, media) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.blobStorage.uploadBlob(media.blobKey, content, media.mimeType);
            yield this.objectStorage.updateObject(media.key, media);
            media.downloadUrl = yield this.blobStorage.getDownloadUrl(media.blobKey);
            return media;
        });
    }
    updateMedia(media) {
        if (!media) {
            throw new Error(`Parameter "media" not specified.`);
        }
        return this.objectStorage.updateObject(media.key, media);
    }
    updateMediaContent(media, content) {
        if (!media) {
            throw new Error(`Parameter "media" not specified.`);
        }
        if (!content) {
            throw new Error(`Parameter "content" not specified.`);
        }
        return this.uploadContent(content, media);
    }
}
exports.MediaService = MediaService;
//# sourceMappingURL=mediaService.js.map