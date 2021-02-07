"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntercomPublishModule = void 0;
var publishing_1 = require("./publishing");
var IntercomPublishModule = (function () {
    function IntercomPublishModule() {
    }
    IntercomPublishModule.prototype.register = function (injector) {
        injector.bindToCollection("htmlPagePublisherPlugins", publishing_1.IntercomHtmlPagePublisherPlugin);
    };
    return IntercomPublishModule;
}());
exports.IntercomPublishModule = IntercomPublishModule;
