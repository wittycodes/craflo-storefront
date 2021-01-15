"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordInputDesignModule = void 0;
var passwordInputEditor_1 = require("./ko/passwordInputEditor");
var passwordInputHandlers_1 = require("./passwordInputHandlers");
var PasswordInputDesignModule = (function () {
    function PasswordInputDesignModule() {
    }
    PasswordInputDesignModule.prototype.register = function (injector) {
        injector.bind("passwordInputEditor", passwordInputEditor_1.PasswordInputEditor);
        injector.bindToCollection("widgetHandlers", passwordInputHandlers_1.PasswordInputHandlers, "passwordInputHandler");
    };
    return PasswordInputDesignModule;
}());
exports.PasswordInputDesignModule = PasswordInputDesignModule;
