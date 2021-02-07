"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
ko.bindingHandlers["itemTemplate"] = {
    init: function (element, valueAccessor) {
        var template = valueAccessor();
        element.innerHTML = template;
    }
};
