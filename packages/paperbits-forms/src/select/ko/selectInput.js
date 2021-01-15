"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInput = void 0;
var ko = require("knockout");
var selectInput_html_1 = require("./selectInput.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var SelectInput = (function () {
    function SelectInput() {
        this.label = ko.observable("Select");
        this.name = ko.observable();
        this.value = ko.observable();
        this.placeholder = ko.observable("Select value");
        this.readonly = ko.observable();
        this.required = ko.observable();
        this.options = ko.observableArray();
        this.styles = ko.observable();
    }
    SelectInput = __decorate([
        decorators_1.Component({
            selector: "select-input",
            template: selectInput_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], SelectInput);
    return SelectInput;
}());
exports.SelectInput = SelectInput;
