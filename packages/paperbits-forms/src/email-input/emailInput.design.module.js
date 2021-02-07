"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailInputDesignModule = void 0;
var emailInputEditor_1 = require("./ko/emailInputEditor");
var emailInputHandlers_1 = require("./emailInputHandlers");
var EmailInputDesignModule = (function () {
    function EmailInputDesignModule() {
    }
    EmailInputDesignModule.prototype.register = function (injector) {
        injector.bind("emailInputEditor", emailInputEditor_1.EmailInputEditor);
        injector.bindToCollection("widgetHandlers", emailInputHandlers_1.EmailInputHandlers, "emailInputHandler");
    };
    return EmailInputDesignModule;
}());
exports.EmailInputDesignModule = EmailInputDesignModule;
