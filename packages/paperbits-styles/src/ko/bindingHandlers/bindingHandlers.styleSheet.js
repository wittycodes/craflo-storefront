"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylesheetBindingHandler = void 0;
var ko = require("knockout");
var jssCompiler_1 = require("../../jssCompiler");
var StylesheetBindingHandler = (function () {
    function StylesheetBindingHandler(eventManager) {
        var _this = this;
        this.eventManager = eventManager;
        var compiler = new jssCompiler_1.JssCompiler();
        ko.bindingHandlers["styleSheet"] = {
            init: function (element) {
                var applyStyleSheet = function (styleSheet) {
                    var css = compiler.compile(styleSheet);
                    var nodes = Array.prototype.slice.call(element.childNodes);
                    var stylesTextNode = nodes.find(function (x) { return x["key"] === styleSheet.key; });
                    if (!stylesTextNode) {
                        stylesTextNode = document.createTextNode(css);
                        stylesTextNode["key"] = styleSheet.key;
                        element.appendChild(stylesTextNode);
                    }
                    stylesTextNode.textContent = css;
                };
                var removeStyleSheet = function (key) {
                    if (!key) {
                        return;
                    }
                    var nodes = Array.prototype.slice.call(element.childNodes);
                    var node = nodes.find(function (x) { return x["key"] === key; });
                    if (node) {
                        element.removeChild(node);
                    }
                };
                _this.eventManager.addEventListener("onStyleChange", applyStyleSheet);
                _this.eventManager.addEventListener("onStyleRemove", removeStyleSheet);
            }
        };
    }
    return StylesheetBindingHandler;
}());
exports.StylesheetBindingHandler = StylesheetBindingHandler;
