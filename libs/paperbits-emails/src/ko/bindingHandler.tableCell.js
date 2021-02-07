"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
ko.bindingHandlers["tableCell"] = {
    init: function (element, valueAccessor) {
        var config = ko.unwrap(valueAccessor());
        var horizontalAlign = config.horizontalAlign;
        var verticalAlign = config.verticalAlign;
        var size = config.size();
        var width = size * 100 / 12;
        ko.applyBindingsToNode(element, { attr: { width: width + "%", align: horizontalAlign, valign: verticalAlign } }, null);
    }
};
