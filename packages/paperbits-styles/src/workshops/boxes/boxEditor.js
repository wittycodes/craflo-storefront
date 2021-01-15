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
exports.BoxEditor = void 0;
var ko = require("knockout");
var boxEditor_html_1 = require("./boxEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var BoxEditor = (function () {
    function BoxEditor() {
        var _this = this;
        this.box = ko.observable();
        this.features = "margin,padding,border";
        this.marginEnabled = ko.observable();
        this.marginTop = ko.observable();
        this.marginLeft = ko.observable();
        this.marginRight = ko.observable();
        this.marginBottom = ko.observable();
        this.borderEnabled = ko.observable();
        this.borderTop = ko.observable();
        this.borderLeft = ko.observable();
        this.borderRight = ko.observable();
        this.borderBottom = ko.observable();
        this.paddingEnabled = ko.observable();
        this.paddingTop = ko.observable();
        this.paddingLeft = ko.observable();
        this.paddingRight = ko.observable();
        this.paddingBottom = ko.observable();
        this.topLeftRadius = ko.observable();
        this.topRightRadius = ko.observable();
        this.bottomLeftRadius = ko.observable();
        this.bottomRightRadius = ko.observable();
        this.borderTopWidth = ko.computed(function () { return _this.borderTop() ? _this.borderTop().width : null; });
        this.borderLeftWidth = ko.computed(function () { return _this.borderLeft() ? _this.borderLeft().width : null; });
        this.borderRightWidth = ko.computed(function () { return _this.borderRight() ? _this.borderRight().width : null; });
        this.borderBottomWidth = ko.computed(function () { return _this.borderBottom() ? _this.borderBottom().width : null; });
    }
    BoxEditor.prototype.init = function () {
        var features = this.features.split(",");
        this.marginEnabled(features.includes("margin"));
        this.paddingEnabled(features.includes("padding"));
        this.borderEnabled(features.includes("border"));
        this.loadData(this.box());
        this.box.subscribe(this.updateBox);
        this.marginTop.subscribe(this.dispatchUpdates);
        this.marginLeft.subscribe(this.dispatchUpdates);
        this.marginRight.subscribe(this.dispatchUpdates);
        this.marginBottom.subscribe(this.dispatchUpdates);
        this.borderTop.subscribe(this.dispatchUpdates);
        this.borderLeft.subscribe(this.dispatchUpdates);
        this.borderRight.subscribe(this.dispatchUpdates);
        this.borderBottom.subscribe(this.dispatchUpdates);
        this.topLeftRadius.subscribe(this.dispatchUpdates);
        this.topRightRadius.subscribe(this.dispatchUpdates);
        this.bottomLeftRadius.subscribe(this.dispatchUpdates);
        this.bottomRightRadius.subscribe(this.dispatchUpdates);
        this.paddingTop.subscribe(this.dispatchUpdates);
        this.paddingLeft.subscribe(this.dispatchUpdates);
        this.paddingRight.subscribe(this.dispatchUpdates);
        this.paddingBottom.subscribe(this.dispatchUpdates);
    };
    BoxEditor.prototype.loadData = function (data) {
        if (!data) {
            return;
        }
        var currentStyle = data;
        if (currentStyle.margin) {
            this.marginTop(currentStyle.margin.top);
            this.marginLeft(currentStyle.margin.left);
            this.marginRight(currentStyle.margin.right);
            this.marginBottom(currentStyle.margin.bottom);
        }
        if (currentStyle.border) {
            this.borderTop(currentStyle.border.top);
            this.borderLeft(currentStyle.border.left);
            this.borderRight(currentStyle.border.right);
            this.borderBottom(currentStyle.border.bottom);
        }
        if (currentStyle.borderRadius) {
            this.topLeftRadius(currentStyle.borderRadius.topLeftRadius);
            this.topRightRadius(currentStyle.borderRadius.topRightRadius);
            this.bottomLeftRadius(currentStyle.borderRadius.bottomLeftRadius);
            this.bottomRightRadius(currentStyle.borderRadius.bottomRightRadius);
        }
        if (currentStyle.padding) {
            this.paddingTop(currentStyle.padding.top);
            this.paddingLeft(currentStyle.padding.left);
            this.paddingRight(currentStyle.padding.right);
            this.paddingBottom(currentStyle.padding.bottom);
        }
    };
    BoxEditor.prototype.updateBox = function (update) {
        this.isBoxUpdate = true;
        this.loadData(update);
        this.isBoxUpdate = false;
    };
    BoxEditor.prototype.dispatchUpdates = function () {
        if (!this.onUpdate || this.isBoxUpdate) {
            return;
        }
        var parseNumber = function (value) {
            if (value === "auto") {
                return value;
            }
            if (value === 0) {
                return 0;
            }
            if (value) {
                var parsed = parseInt(value);
                if (parsed === 0) {
                    return 0;
                }
                return parsed || undefined;
            }
            else {
                return undefined;
            }
        };
        this.onUpdate({
            padding: {
                top: parseNumber(this.paddingTop()),
                left: parseNumber(this.paddingLeft()),
                right: parseNumber(this.paddingRight()),
                bottom: parseNumber(this.paddingBottom())
            },
            margin: {
                top: parseNumber(this.marginTop()),
                left: parseNumber(this.marginLeft()),
                right: parseNumber(this.marginRight()),
                bottom: parseNumber(this.marginBottom())
            },
            border: {
                top: this.borderTop(),
                left: this.borderLeft(),
                right: this.borderRight(),
                bottom: this.borderBottom()
            },
            borderRadius: {
                topLeftRadius: parseNumber(this.topLeftRadius()),
                topRightRadius: parseNumber(this.topRightRadius()),
                bottomLeftRadius: parseNumber(this.bottomLeftRadius()),
                bottomRightRadius: parseNumber(this.bottomRightRadius())
            }
        });
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], BoxEditor.prototype, "box", void 0);
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", String)
    ], BoxEditor.prototype, "features", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], BoxEditor.prototype, "onUpdate", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BoxEditor.prototype, "init", null);
    BoxEditor = __decorate([
        decorators_1.Component({
            selector: "box",
            template: boxEditor_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], BoxEditor);
    return BoxEditor;
}());
exports.BoxEditor = BoxEditor;
