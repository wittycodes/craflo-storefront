"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlayerModule = void 0;
const videoPlayer_1 = require("./ko/videoPlayer");
const videoPlayerModelBinder_1 = require("./videoPlayerModelBinder");
const videoPlayerViewModelBinder_1 = require("./ko/videoPlayerViewModelBinder");
class VideoPlayerModule {
    register(injector) {
        injector.bind("videoPlayer", videoPlayer_1.VideoPlayer);
        injector.bindToCollection("modelBinders", videoPlayerModelBinder_1.VideoPlayerModelBinder);
        injector.bindToCollection("viewModelBinders", videoPlayerViewModelBinder_1.VideoPlayerViewModelBinder);
    }
}
exports.VideoPlayerModule = VideoPlayerModule;
//# sourceMappingURL=videoPlayer.publish.module.js.map