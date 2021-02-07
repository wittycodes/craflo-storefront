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
exports.ColumnEditor = void 0;
const ko = require("knockout");
const columnEditor_html_1 = require("./columnEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const columnModel_1 = require("../columnModel");
let ColumnEditor = class ColumnEditor {
    constructor(viewManager) {
        this.viewManager = viewManager;
        this.alignment = ko.observable();
        this.verticalAlignment = ko.observable();
        this.horizontalAlignment = ko.observable();
        this.scrollOnOverlow = ko.observable();
        this.order = ko.observable();
    }
    initialize() {
        const viewport = this.viewManager.getViewport();
        const alignment = this.determineAlignment(viewport, this.model);
        this.alignment(alignment);
        this.scrollOnOverlow(this.model.overflowY === "scroll");
        const directions = this.alignment().split(" ");
        this.verticalAlignment(directions[0]);
        this.horizontalAlignment(directions[1]);
        const order = this.determineOrder(viewport, this.model);
        this.order(order);
        this.alignment.subscribe(this.applyChanges);
        this.scrollOnOverlow.subscribe(this.applyChanges);
        this.order.subscribe(this.applyChanges);
    }
    applyChanges() {
        const viewport = this.viewManager.getViewport();
        switch (viewport) {
            case "xl":
                this.model.alignment.xl = this.alignment();
                this.model.order.xl = this.order();
                break;
            case "lg":
                this.model.alignment.lg = this.alignment();
                this.model.order.lg = this.order();
                break;
            case "md":
                this.model.alignment.md = this.alignment();
                this.model.order.md = this.order();
                break;
            case "sm":
                this.model.alignment.sm = this.alignment();
                this.model.order.sm = this.order();
                break;
            case "xs":
                this.model.alignment.xs = this.alignment();
                this.model.order.xs = this.order();
                break;
            default:
                throw new Error("Unknown viewport");
        }
        this.model.overflowX = this.model.overflowY = this.scrollOnOverlow() ? "scroll" : null;
        this.onChange(this.model);
    }
    alignContent(alignment) {
        this.alignment(alignment);
    }
    align() {
        this.alignment(`${this.verticalAlignment()} ${this.horizontalAlignment()}`);
    }
    determineAlignment(viewport, model) {
        switch (viewport) {
            case "xl":
                return model.alignment.xl || this.determineAlignment("lg", model);
                break;
            case "lg":
                return model.alignment.lg || this.determineAlignment("md", model);
                break;
            case "md":
                return model.alignment.md || this.determineAlignment("sm", model);
                break;
            case "sm":
                return model.alignment.sm || this.determineAlignment("xs", model);
                break;
            case "xs":
                return model.alignment.xs || "start start";
                break;
            default:
                throw new Error("Unknown viewport");
        }
    }
    determineOrder(viewport, model) {
        switch (viewport) {
            case "xl":
                return model.order.xl || this.determineOrder("lg", model);
                break;
            case "lg":
                return model.order.lg || this.determineOrder("md", model);
                break;
            case "md":
                return model.order.md || this.determineOrder("sm", model);
                break;
            case "sm":
                return model.order.sm || this.determineOrder("xs", model);
                break;
            case "xs":
                return model.order.xs || null;
                break;
            default:
                throw new Error("Unknown viewport");
        }
    }
    toggleHorizontal() {
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
    }
    toggleVertical() {
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
    }
    alignLeft() {
        this.horizontalAlignment("start");
        this.align();
    }
    alignRight() {
        this.horizontalAlignment("end");
        this.align();
    }
    alignCenter() {
        if (this.horizontalAlignment() === "center" || this.horizontalAlignment() === "around" || this.horizontalAlignment() === "between") {
            this.toggleHorizontal();
        }
        else {
            this.horizontalAlignment("center");
        }
        this.align();
    }
    alignTop() {
        this.verticalAlignment("start");
        this.align();
    }
    alignBottom() {
        this.verticalAlignment("end");
        this.align();
    }
    alignMiddle() {
        if (this.verticalAlignment() === "center" || this.verticalAlignment() === "around" || this.verticalAlignment() === "between") {
            this.toggleVertical();
        }
        else {
            this.verticalAlignment("center");
        }
        this.align();
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", columnModel_1.ColumnModel)
], ColumnEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], ColumnEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ColumnEditor.prototype, "initialize", null);
ColumnEditor = __decorate([
    decorators_1.Component({
        selector: "layout-column-editor",
        template: columnEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], ColumnEditor);
exports.ColumnEditor = ColumnEditor;
//# sourceMappingURL=columnEditor.js.map