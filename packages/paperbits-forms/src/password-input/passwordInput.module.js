"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordInputModule = void 0;
var passwordInput_1 = require("./ko/passwordInput");
var passwordInputModelBinder_1 = require("./passwordInputModelBinder");
var passwordInputViewModelBinder_1 = require("./ko/passwordInputViewModelBinder");
var PasswordInputModule = (function () {
    function PasswordInputModule() {
    }
    PasswordInputModule.prototype.register = function (injector) {
        injector.bind("passwordInput", passwordInput_1.PasswordInput);
        injector.bindToCollection("modelBinders", passwordInputModelBinder_1.PasswordInputModelBinder);
        injector.bindToCollection("viewModelBinders", passwordInputViewModelBinder_1.PasswordInputViewModelBinder);
    };
    return PasswordInputModule;
}());
exports.PasswordInputModule = PasswordInputModule;
