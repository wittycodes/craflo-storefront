"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailInputModel = void 0;
var EmailInputModel = (function () {
    function EmailInputModel() {
        this.label = "Email input";
        this.name = "email";
        this.value = "";
        this.placeholder = "e.g. john.doe@contoso.com";
        this.styles = { appearance: "components/formControl/default" };
    }
    return EmailInputModel;
}());
exports.EmailInputModel = EmailInputModel;
