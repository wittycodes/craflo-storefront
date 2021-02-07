"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubePlayerPublishModule = void 0;
const youtubeModelBinder_1 = require("./youtubeModelBinder");
const youtubePlayer_1 = require("./ko/youtubePlayer");
const youtubePlayerViewModelBinder_1 = require("./ko/youtubePlayerViewModelBinder");
class YoutubePlayerPublishModule {
    register(injector) {
        injector.bind("youtubePlayer", youtubePlayer_1.YoutubePlayerViewModel);
        injector.bindToCollection("modelBinders", youtubeModelBinder_1.YoutubeModelBinder);
        injector.bindToCollection("viewModelBinders", youtubePlayerViewModelBinder_1.YoutubePlayerViewModelBinder);
    }
}
exports.YoutubePlayerPublishModule = YoutubePlayerPublishModule;
//# sourceMappingURL=youtubePlayer.publish.module.js.map