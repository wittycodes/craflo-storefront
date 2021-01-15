"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailItem = exports.AnchorItem = void 0;
var ko = require("knockout");
var AnchorItem = (function () {
    function AnchorItem() {
        this.hasFocus = ko.observable(false);
    }
    return AnchorItem;
}());
exports.AnchorItem = AnchorItem;
var EmailItem = (function () {
    function EmailItem(email) {
        this.contentKey = email.contentKey;
        this.key = email.key;
        this.permalinkUrl = ko.observable();
        this.title = ko.observable(email.title);
        this.description = ko.observable(email.description);
        this.anchors = [];
    }
    EmailItem.prototype.toContract = function () {
        return {
            key: this.key,
            title: this.title(),
            description: this.description(),
            contentKey: this.contentKey
        };
    };
    return EmailItem;
}());
exports.EmailItem = EmailItem;
