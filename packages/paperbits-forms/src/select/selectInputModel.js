"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInputModel = void 0;
var SelectInputModel = (function () {
    function SelectInputModel() {
        this.label = "Select";
        this.name = "select";
        this.placeholder = "Select value";
        this.options = [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" }
        ];
        this.value = null;
        this.styles = { appearance: "components/formControl/default" };
    }
    return SelectInputModel;
}());
exports.SelectInputModel = SelectInputModel;
