"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputModel = void 0;
var TextInputModel = (function () {
    function TextInputModel() {
        this.label = "Text input";
        this.name = "firstName";
        this.value = "";
        this.placeholder = "e.g. First name";
        this.styles = { appearance: "components/formControl/default" };
    }
    return TextInputModel;
}());
exports.TextInputModel = TextInputModel;
