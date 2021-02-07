"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleTagManagerPublishModule = void 0;
var publishing_1 = require("./publishing");
var GoogleTagManagerPublishModule = (function () {
    function GoogleTagManagerPublishModule() {
    }
    GoogleTagManagerPublishModule.prototype.register = function (injector) {
        injector.bindToCollection("htmlPagePublisherPlugins", publishing_1.GoogleTagManagerHtmlPagePublisherPlugin);
    };
    return GoogleTagManagerPublishModule;
}());
exports.GoogleTagManagerPublishModule = GoogleTagManagerPublishModule;
