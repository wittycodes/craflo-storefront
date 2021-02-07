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
exports.MediaItem = exports.defaultURL = exports.defaultFileName = void 0;
const ko = require("knockout");
const MediaUtils = require("@paperbits/common/media/mediaUtils");
const permalinks_1 = require("@paperbits/common/permalinks");
exports.defaultFileName = "media.svg";
exports.defaultURL = "https://cdn.paperbits.io/images/logo.svg";
class MediaItem {
    constructor(mediaContract) {
        this.key = mediaContract.key;
        this.blobKey = mediaContract.blobKey;
        this.fileName = ko.observable(mediaContract.fileName);
        this.description = ko.observable(mediaContract.description);
        this.keywords = ko.observable(mediaContract.keywords);
        this.permalink = ko.observable(mediaContract.permalink);
        this.contentType = ko.observable(mediaContract.mimeType);
        this.thumbnailUrl = ko.observable();
        this.downloadUrl = ko.observable(mediaContract.downloadUrl);
        this.getThumbnail(mediaContract);
    }
    getThumbnail(mediaContract) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = mediaContract.mimeType) === null || _a === void 0 ? void 0 : _a.startsWith("video")) {
                const dataUrl = yield MediaUtils.getVideoThumbnailAsDataUrlFromUrl(mediaContract.downloadUrl);
                this.thumbnailUrl(dataUrl);
            }
            else if ((_b = mediaContract.mimeType) === null || _b === void 0 ? void 0 : _b.startsWith("image")) {
                this.thumbnailUrl(mediaContract.downloadUrl);
            }
            else {
                this.thumbnailUrl(null);
            }
        });
    }
    isDefaultFileName() {
        return this.fileName() === exports.defaultFileName;
    }
    isDefaultUrl() {
        return this.downloadUrl() === exports.defaultURL;
    }
    updateDefault(newName) {
        this.fileName(newName);
        this.permalink(this.permalink().replace(exports.defaultFileName, newName));
        this.thumbnailUrl(this.downloadUrl());
    }
    toMedia() {
        return {
            key: this.key,
            blobKey: this.blobKey,
            fileName: this.fileName(),
            description: this.description(),
            keywords: this.keywords(),
            mimeType: this.contentType(),
            downloadUrl: this.downloadUrl(),
            permalink: this.permalink()
        };
    }
    getHyperlink() {
        const hyperlinkModel = new permalinks_1.HyperlinkModel();
        hyperlinkModel.title = this.fileName();
        hyperlinkModel.targetKey = this.key;
        hyperlinkModel.href = this.permalink();
        return hyperlinkModel;
    }
}
exports.MediaItem = MediaItem;
//# sourceMappingURL=mediaItem.js.map