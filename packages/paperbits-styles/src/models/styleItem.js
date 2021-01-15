"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleItem = void 0;
var ko = require("knockout");
var StyleItem = (function () {
    function StyleItem(contract, stylesConfig, stylesType) {
        this.key = contract.key;
        this.displayName = contract.displayName;
        this.category = contract.category;
        this.hasFocus = ko.observable();
        this.stylesConfig = stylesConfig;
        this.stylesType = stylesType;
    }
    return StyleItem;
}());
exports.StyleItem = StyleItem;
