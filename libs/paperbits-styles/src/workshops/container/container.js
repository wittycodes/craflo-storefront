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
exports.Container = void 0;
var ko = require("knockout");
var container_html_1 = require("./container.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var Container = (function () {
    function Container() {
        this.alignment = ko.observable();
        this.verticalAlignment = ko.observable();
        this.horizontalAlignment = ko.observable();
        this.scrollOnOverlow = ko.observable();
        this.container = ko.observable();
        this.overflowControls = ko.observable(false);
    }
    Container.prototype.initialize = function () {
        this.updateObservables();
        this.container.subscribe(this.updateObservables);
        this.scrollOnOverlow.subscribe(this.onOverflowChange);
    };
    Container.prototype.updateObservables = function () {
        var _a, _b;
        var containerStyle = this.container();
        if (containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle.overflow) {
            this.scrollOnOverlow(true);
        }
        else {
            this.scrollOnOverlow(false);
        }
        this.verticalAlignment((_a = containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle.alignment) === null || _a === void 0 ? void 0 : _a.vertical);
        this.horizontalAlignment((_b = containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle.alignment) === null || _b === void 0 ? void 0 : _b.horizontal);
    };
    Container.prototype.applyChanges = function () {
        this.alignment(this.verticalAlignment() + " " + this.horizontalAlignment());
        var overflow = this.scrollOnOverlow()
            ? { vertical: "scroll", horizontal: "scroll" }
            : null;
        this.onUpdate({
            alignment: {
                vertical: this.verticalAlignment(),
                horizontal: this.horizontalAlignment()
            },
            overflow: overflow
        });
    };
    Container.prototype.alignContent = function (alignment) {
        this.alignment(alignment);
    };
    Container.prototype.toggleHorizontal = function () {
        switch (this.horizontalAlignment()) {
            case "center":
                this.horizontalAlignment("around");
                break;
            case "around":
                this.horizontalAlignment("between");
                break;
            case "between":
                this.horizontalAlignment("center");
                break;
        }
    };
    Container.prototype.toggleVertical = function () {
        switch (this.verticalAlignment()) {
            case "center":
                this.verticalAlignment("around");
                break;
            case "around":
                this.verticalAlignment("between");
                break;
            case "between":
                this.verticalAlignment("center");
                break;
        }
    };
    Container.prototype.alignLeft = function () {
        this.horizontalAlignment("start");
        this.applyChanges();
    };
    Container.prototype.alignRight = function () {
        this.horizontalAlignment("end");
        this.applyChanges();
    };
    Container.prototype.alignCenter = function () {
        if (this.horizontalAlignment() === "center" || this.horizontalAlignment() === "around" || this.horizontalAlignment() === "between") {
            this.toggleHorizontal();
        }
        else {
            this.horizontalAlignment("center");
        }
        this.applyChanges();
    };
    Container.prototype.alignTop = function () {
        this.verticalAlignment("start");
        this.applyChanges();
    };
    Container.prototype.alignBottom = function () {
        this.verticalAlignment("end");
        this.applyChanges();
    };
    Container.prototype.alignMiddle = function () {
        if (this.verticalAlignment() === "center" || this.verticalAlignment() === "around" || this.verticalAlignment() === "between") {
            this.toggleVertical();
        }
        else {
            this.verticalAlignment("center");
        }
        this.applyChanges();
    };
    Container.prototype.onOverflowChange = function () {
        this.applyChanges();
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], Container.prototype, "container", void 0);
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], Container.prototype, "overflowControls", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], Container.prototype, "onUpdate", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Container.prototype, "initialize", null);
    Container = __decorate([
        decorators_1.Component({
            selector: "container",
            template: container_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], Container);
    return Container;
}());
exports.Container = Container;
