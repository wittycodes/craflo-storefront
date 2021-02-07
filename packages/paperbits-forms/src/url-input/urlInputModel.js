"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlInputModel = void 0;
var UrlInputModel = (function () {
    function UrlInputModel() {
        this.label = "URL input";
        this.name = "url";
        this.value = "";
        this.placeholder = "e.g. https://www.example.com";
        this.styles = { appearance: "components/formControl/default" };
    }
    return UrlInputModel;
}());
exports.UrlInputModel = UrlInputModel;
