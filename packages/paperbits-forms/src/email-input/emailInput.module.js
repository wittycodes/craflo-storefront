"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailInputModule = void 0;
var emailInput_1 = require("./ko/emailInput");
var emailInputModelBinder_1 = require("./emailInputModelBinder");
var emailInputViewModelBinder_1 = require("./ko/emailInputViewModelBinder");
var EmailInputModule = (function () {
    function EmailInputModule() {
    }
    EmailInputModule.prototype.register = function (injector) {
        injector.bind("emailInput", emailInput_1.EmailInput);
        injector.bindToCollection("modelBinders", emailInputModelBinder_1.EmailInputModelBinder);
        injector.bindToCollection("viewModelBinders", emailInputViewModelBinder_1.EmailInputViewModelBinder);
    };
    return EmailInputModule;
}());
exports.EmailInputModule = EmailInputModule;
