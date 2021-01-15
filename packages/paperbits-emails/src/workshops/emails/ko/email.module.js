"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailWorkshopModule = void 0;
var emails_1 = require("./emails");
var emailDetails_1 = require("./emailDetails");
var emailSelector_1 = require("./emailSelector");
var EmailWorkshopModule = (function () {
    function EmailWorkshopModule() {
    }
    EmailWorkshopModule.prototype.register = function (injector) {
        injector.bind("emailsWorkshop", emails_1.EmailsWorkshop);
        injector.bind("emailDetailsWorkshop", emailDetails_1.EmailDetailsWorkshop);
        injector.bind("emailSelector", emailSelector_1.EmailSelector);
    };
    return EmailWorkshopModule;
}());
exports.EmailWorkshopModule = EmailWorkshopModule;
