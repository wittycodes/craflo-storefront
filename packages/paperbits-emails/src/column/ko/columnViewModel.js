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
exports.ColumnViewModel = void 0;
var ko = require("knockout");
var column_html_1 = require("./column.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var ColumnViewModel = (function () {
    function ColumnViewModel() {
        var _this = this;
        this.widgets = ko.observableArray();
        this.size = ko.observable();
        this.horizontalAlign = ko.observable("center");
        this.verticalAlign = ko.observable("center");
        this.alignment = ko.observable();
        this.css = ko.computed(function () {
            var classes = [];
            if (_this.size()) {
                classes.push("email-layout-column-" + _this.size());
            }
            if (_this.alignment()) {
                var alignment = _this.alignment().split(" ");
                var vertical = alignment[0];
                var horizontal = alignment[1];
                _this.verticalAlign(vertical);
                _this.horizontalAlign(horizontal);
            }
            return classes.join(" ");
        });
    }
    ColumnViewModel = __decorate([
        decorators_1.Component({
            selector: "email-layout-column",
            template: column_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], ColumnViewModel);
    return ColumnViewModel;
}());
exports.ColumnViewModel = ColumnViewModel;
