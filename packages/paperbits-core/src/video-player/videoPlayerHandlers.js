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
exports.VideoPlayerHandlers = void 0;
const MediaUtils = require("@paperbits/common/media/mediaUtils");
const videoPlayerModel_1 = require("./videoPlayerModel");
class VideoPlayerHandlers {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    matches(filename) {
        if (filename && ![".webm", ".mp4", ".m4v", ".ogg", ".ogv", ".ogx", ".ogm"].some(e => filename.endsWith(e))) {
            return false;
        }
        return true;
    }
    getWidgetOrderFromSourceUrlOrFile(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let sourceUrl;
            if (!source) {
                sourceUrl = null;
            }
            else if (source instanceof File || source.constructor["name"] === "File") {
                sourceUrl = yield MediaUtils.getVideoThumbnailAsDataUrl(source);
            }
            else {
                sourceUrl = source;
            }
            const widgetOrder = {
                name: "video-player",
                displayName: "Video player",
                category: "Media",
                iconClass: "paperbits-action-74",
                requires: ["html", "js"],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    return new videoPlayerModel_1.VideoPlayerModel();
                })
            };
            return widgetOrder;
        });
    }
    getWidgetOrderByConfig(sourceUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getWidgetOrderFromSourceUrlOrFile(sourceUrl);
        });
    }
    getWidgetOrderByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getWidgetOrderByConfig(url);
        });
    }
    getContentDescriptorFromMedia(media) {
        if (!this.matches(media.fileName)) {
            return null;
        }
        const getWidgetOrderFunction = () => __awaiter(this, void 0, void 0, function* () {
            const mediaContract = yield this.mediaService.getMediaByKey(media.key);
            return yield this.getWidgetOrderFromSourceUrlOrFile(mediaContract.permalink);
        });
        return {
            title: "Video recording",
            iconUrl: VideoPlayerHandlers.DefaultThumbnailUri,
            description: media.description,
            getWidgetOrder: getWidgetOrderFunction
        };
    }
    getContentDescriptorFromDataTransfer(dataTransfer) {
        if (!this.matches(dataTransfer.name)) {
            return null;
        }
        const source = dataTransfer.source;
        const getThumbnailPromise = () => __awaiter(this, void 0, void 0, function* () {
            if (dataTransfer.source instanceof File || dataTransfer.source.constructor["name"] === "File") {
                return yield MediaUtils.getVideoThumbnailAsDataUrl(source);
            }
            return dataTransfer.source;
        });
        const descriptor = {
            title: "Video recording",
            description: dataTransfer.name,
            getWidgetOrder: () => __awaiter(this, void 0, void 0, function* () {
                return yield this.getWidgetOrderByUrl(source);
            }),
            iconUrl: VideoPlayerHandlers.DefaultThumbnailUri,
            getPreviewUrl: getThumbnailPromise,
            getThumbnailUrl: getThumbnailPromise,
            uploadables: [source]
        };
        return descriptor;
    }
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getWidgetOrderByConfig(null);
        });
    }
}
exports.VideoPlayerHandlers = VideoPlayerHandlers;
VideoPlayerHandlers.DefaultThumbnailUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQ4cHgiIGhlaWdodD0iNDhweCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48ZyAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC41LCAwLjUpIj4KPHJlY3QgeD0iMiIgeT0iNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDQ0NDQ0IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+Cjxwb2x5Z29uIGRhdGEtY29sb3I9ImNvbG9yLTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQ0NDQ0NCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iJiMxMDsmIzk7MTcsMTQgMzMsMjQgMTcsMzQgIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+CjwvZz48L3N2Zz4=";
//# sourceMappingURL=videoPlayerHandlers.js.map