"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlayerDesignModule = void 0;
const styleGuideCard_html_1 = require("./ko/styleGuideCard.html");
const videoPlayerEditor_1 = require("./ko/videoPlayerEditor");
const videoPlayerHandlers_1 = require("./videoPlayerHandlers");
class VideoPlayerDesignModule {
    register(injector) {
        injector.bind("videoPlayerEditor", videoPlayerEditor_1.VideoPlayerEditor);
        const styleGroup = {
            key: "videoPlayer",
            name: "components_videoPlayer",
            groupName: "Video Player",
            selectorTemplate: undefined,
            styleTemplate: styleGuideCard_html_1.default
        };
        injector.bindInstanceToCollection("styleGroups", styleGroup);
        injector.bindToCollection("widgetHandlers", videoPlayerHandlers_1.VideoPlayerHandlers, "videoHandler");
        injector.bindToCollection("dropHandlers", videoPlayerHandlers_1.VideoPlayerHandlers, "videoHandler");
    }
}
exports.VideoPlayerDesignModule = VideoPlayerDesignModule;
//# sourceMappingURL=videoPlayer.design.module.js.map