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
exports.YoutubeHandlers = void 0;
const youtubePlayerModel_1 = require("./youtubePlayerModel");
class YoutubeHandlers {
    getWidgetOrderByConfig(youtubeClipId) {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "youtube-player",
                displayName: "Youtube player",
                category: "Media",
                iconClass: "paperbits-player-48",
                requires: ["html", "js"],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    const youtubePlayerModel = new youtubePlayerModel_1.YoutubePlayerModel();
                    youtubePlayerModel.videoId = youtubeClipId;
                    return youtubePlayerModel;
                })
            };
            return widgetOrder;
        });
    }
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getWidgetOrderByConfig();
        });
    }
    getContentDescriptorFromDataTransfer(dataTransfer) {
        const videoId = this.getVideoId(dataTransfer);
        if (!videoId) {
            return undefined;
        }
        const getThumbnailPromise = () => Promise.resolve(`https://img.youtube.com/vi/${videoId}/0.jpg`);
        const descriptor = {
            title: "Youtube player",
            description: "",
            getWidgetOrder: () => this.getWidgetOrderByConfig(videoId),
            getPreviewUrl: getThumbnailPromise,
            getThumbnailUrl: getThumbnailPromise
        };
        return descriptor;
    }
    getVideoId(dataTransfer) {
        const source = dataTransfer.source;
        if (source && typeof source === "string") {
            const lower = source.toLowerCase();
            if (lower.startsWith("https://www.youtube.com") || lower.startsWith("http://www.youtube.com")) {
                const videoId = new RegExp("[?&](?:v=)(.*?)(?:$|&)").exec(source);
                return videoId ? videoId[1] : undefined;
            }
        }
        return undefined;
    }
}
exports.YoutubeHandlers = YoutubeHandlers;
//# sourceMappingURL=youtubeHandlers.js.map