"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleFont = void 0;
var Utils = require("@paperbits/common/utils");
var ko = require("knockout");
var styles_1 = require("@paperbits/common/styles");
var GoogleFont = (function () {
    function GoogleFont(contract) {
        this.loadPreview = this.loadPreview.bind(this);
        this.identifier = Utils.identifier();
        this.preview = ko.observable();
        this.displayName = contract.family;
        this.family = contract.family;
        this.files = contract.files;
        this.variants = contract.variants;
        this.version = contract.version;
        this.category = contract.category;
        this.lastModified = contract.lastModified;
    }
    GoogleFont.prototype.loadPreview = function () {
        if (this.preview()) {
            return;
        }
        var fileName = this.files["regular"] || this.files["400"] || this.files[this.variants[0]];
        var fontFace = new styles_1.FontFace();
        fontFace.fontFamily = this.family;
        fontFace.src = fileName.replace("http://", "https://");
        fontFace.fontStyle = "normal";
        fontFace.fontWeight = "normal";
        var styleSheet = new styles_1.StyleSheet();
        styleSheet.fontFaces.push(fontFace);
        this.preview(styleSheet);
    };
    GoogleFont.prototype.toContract = function () {
        var _this = this;
        var fontContract = {
            key: "fonts/" + this.identifier,
            family: this.family,
            displayName: this.family,
            category: this.category,
            version: this.version,
            lastModified: this.lastModified,
            variants: this.variants.map(function (variantName) {
                var regex = /(\d*)(\w*)/gm;
                var matches = regex.exec(variantName);
                var fontWeight = +matches[1] || 400;
                var fontStyle = (matches[2] === "regular" ? "normal" : matches[2]) || "normal";
                var fontFile = _this.files[variantName];
                var fontVariant = {
                    weight: fontWeight,
                    style: fontStyle,
                    permalink: fontFile.replace("http://", "https://")
                };
                return fontVariant;
            })
        };
        return fontContract;
    };
    return GoogleFont;
}());
exports.GoogleFont = GoogleFont;
