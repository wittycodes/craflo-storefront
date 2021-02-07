"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsPublishModule = void 0;
var emailPublisher_1 = require("./publishing/emailPublisher");
var EmailsPublishModule = (function () {
    function EmailsPublishModule() {
    }
    EmailsPublishModule.prototype.register = function (injector) {
        injector.bindToCollection("publishers", emailPublisher_1.EmailPublisher);
    };
    return EmailsPublishModule;
}());
exports.EmailsPublishModule = EmailsPublishModule;
