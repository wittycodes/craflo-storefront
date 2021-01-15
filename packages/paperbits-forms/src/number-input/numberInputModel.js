"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInputModel = void 0;
var NumberInputModel = (function () {
    function NumberInputModel() {
        this.label = "Number input";
        this.name = "quantity";
        this.value = null;
        this.placeholder = "e.g. 100";
        this.styles = { appearance: "components/formControl/default" };
    }
    return NumberInputModel;
}());
exports.NumberInputModel = NumberInputModel;
