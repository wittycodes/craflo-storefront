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
exports.UrlInput = void 0;
var ko = require("knockout");
var urlInput_html_1 = require("./urlInput.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var UrlInput = (function () {
    function UrlInput() {
        this.label = ko.observable("URL input");
        this.name = ko.observable();
        this.value = ko.observable();
        this.placeholder = ko.observable("URL input");
        this.readonly = ko.observable();
        this.required = ko.observable();
        this.maxLength = ko.observable();
        this.styles = ko.observable();
    }
    UrlInput = __decorate([
        decorators_1.Component({
            selector: "url-input",
            template: urlInput_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], UrlInput);
    return UrlInput;
}());
exports.UrlInput = UrlInput;
