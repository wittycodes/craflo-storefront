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
exports.RangeInput = void 0;
var ko = require("knockout");
var rangeInput_html_1 = require("./rangeInput.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var RangeInput = (function () {
    function RangeInput() {
        this.label = ko.observable("Range input");
        this.name = ko.observable();
        this.minValue = ko.observable();
        this.maxValue = ko.observable();
        this.value = ko.observable();
        this.readonly = ko.observable();
        this.styles = ko.observable();
    }
    RangeInput = __decorate([
        decorators_1.Component({
            selector: "range-input",
            template: rangeInput_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], RangeInput);
    return RangeInput;
}());
exports.RangeInput = RangeInput;
