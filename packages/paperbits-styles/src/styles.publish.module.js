"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylePublishModule = void 0;
var styleService_1 = require("./styleService");
var defaultStyleCompiler_1 = require("./defaultStyleCompiler");
var bindingHandlers_styled_1 = require("./ko/bindingHandlers/bindingHandlers.styled");
var openType_1 = require("./openType");
var fontPermalinkResolver_publish_1 = require("./fonts/fontPermalinkResolver.publish");
var fontPublisher_1 = require("./fonts/fontPublisher");
var StylePublishModule = (function () {
    function StylePublishModule() {
    }
    StylePublishModule.prototype.register = function (injector) {
        injector.bindSingleton("styleService", styleService_1.StyleService);
        injector.bindSingleton("styleCompiler", defaultStyleCompiler_1.DefaultStyleCompiler);
        injector.bindToCollection("autostart", bindingHandlers_styled_1.StyledBindingHandler);
        injector.bindSingleton("fontManager", openType_1.FontManager);
        injector.bindToCollection("permalinkResolvers", fontPermalinkResolver_publish_1.FontPermalinkResolver, "fontPermalinkResolver");
        injector.bindToCollection("publishers", fontPublisher_1.FontPublisher);
    };
    return StylePublishModule;
}());
exports.StylePublishModule = StylePublishModule;
