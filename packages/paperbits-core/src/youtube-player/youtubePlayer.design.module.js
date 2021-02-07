"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubePlayerDesignModule = void 0;
const youtubePlayerEditor_1 = require("./ko/youtubePlayerEditor");
const youtubeHandlers_1 = require("./youtubeHandlers");
class YoutubePlayerDesignModule {
    register(injector) {
        injector.bind("youtubeEditor", youtubePlayerEditor_1.YoutubePlayerEditor);
        injector.bindToCollection("widgetHandlers", youtubeHandlers_1.YoutubeHandlers, "youtubeHandler");
        injector.bindToCollection("dropHandlers", youtubeHandlers_1.YoutubeHandlers, "youtubeHandler");
    }
}
exports.YoutubePlayerDesignModule = YoutubePlayerDesignModule;
//# sourceMappingURL=youtubePlayer.design.module.js.map