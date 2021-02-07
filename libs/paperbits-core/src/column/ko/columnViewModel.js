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
const ko = require("knockout");
const column_html_1 = require("./column.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let ColumnViewModel = class ColumnViewModel {
    constructor() {
        this.widgets = ko.observableArray();
        this.sizeXs = ko.observable();
        this.sizeSm = ko.observable();
        this.sizeMd = ko.observable();
        this.sizeLg = ko.observable();
        this.sizeXl = ko.observable();
        this.alignmentXs = ko.observable();
        this.alignmentSm = ko.observable();
        this.alignmentMd = ko.observable();
        this.alignmentLg = ko.observable();
        this.alignmentXl = ko.observable();
        this.offsetXs = ko.observable();
        this.offsetSm = ko.observable();
        this.offsetMd = ko.observable();
        this.offsetLg = ko.observable();
        this.offsetXl = ko.observable();
        this.overflowX = ko.observable();
        this.overflowY = ko.observable();
        this.orderXs = ko.observable();
        this.orderSm = ko.observable();
        this.orderMd = ko.observable();
        this.orderLg = ko.observable();
        this.orderXl = ko.observable();
        this.css = ko.computed(() => {
            const classes = [];
            if (this.sizeXs()) {
                classes.push(this.getSizeClass(this.sizeXs(), "xs"));
            }
            if (this.sizeSm()) {
                classes.push(this.getSizeClass(this.sizeSm(), "sm"));
            }
            if (this.sizeMd()) {
                classes.push(this.getSizeClass(this.sizeMd(), "md"));
            }
            if (this.sizeLg()) {
                classes.push(this.getSizeClass(this.sizeLg(), "lg"));
            }
            if (this.sizeXl()) {
                classes.push(this.getSizeClass(this.sizeXl(), "xl"));
            }
            if (this.alignmentXs()) {
                classes.push(this.getAlignmentClass(this.alignmentXs(), "xs"));
            }
            if (this.alignmentSm()) {
                classes.push(this.getAlignmentClass(this.alignmentSm(), "sm"));
            }
            if (this.alignmentMd()) {
                classes.push(this.getAlignmentClass(this.alignmentMd(), "md"));
            }
            if (this.alignmentLg()) {
                classes.push(this.getAlignmentClass(this.alignmentLg(), "lg"));
            }
            if (this.alignmentXl()) {
                classes.push(this.getAlignmentClass(this.alignmentXl(), "xl"));
            }
            if (this.offsetXs()) {
                classes.push(this.getOffsetClass(this.offsetXs(), "xs"));
            }
            if (this.offsetSm()) {
                classes.push(this.getOffsetClass(this.offsetSm(), "sm"));
            }
            if (this.offsetMd()) {
                classes.push(this.getOffsetClass(this.offsetMd(), "md"));
            }
            if (this.offsetLg()) {
                classes.push(this.getOffsetClass(this.offsetLg(), "lg"));
            }
            if (this.offsetXl()) {
                classes.push(this.getOffsetClass(this.offsetXl(), "xl"));
            }
            if (this.orderXs()) {
                classes.push(this.getOrderClass(this.orderXs(), "xs"));
            }
            if (this.orderSm()) {
                classes.push(this.getOrderClass(this.orderSm(), "sm"));
            }
            if (this.orderMd()) {
                classes.push(this.getOrderClass(this.orderMd(), "md"));
            }
            if (this.orderLg()) {
                classes.push(this.getOrderClass(this.orderLg(), "lg"));
            }
            if (this.orderXl()) {
                classes.push(this.getOrderClass(this.orderXl(), "xl"));
            }
            return classes.join(" ");
        });
        this.overflow = ko.computed(() => {
            return {
                x: this.overflowX(),
                y: this.overflowY()
            };
        });
    }
    getSizeClass(size, targetBreakpoint) {
        let breakpoint = "";
        if (targetBreakpoint !== "xs") {
            breakpoint = targetBreakpoint + "-";
        }
        if (size === "auto") {
            size = "";
        }
        return `col-${breakpoint}${size}`;
    }
    getOffsetClass(offset, targetBreakpoint) {
        let breakpoint = "";
        if (targetBreakpoint !== "xs") {
            breakpoint = targetBreakpoint + "-";
        }
        return `offset-${breakpoint}${offset}`;
    }
    getOrderClass(order, targetBreakpoint) {
        let breakpoint = "";
        if (targetBreakpoint !== "xs") {
            breakpoint = targetBreakpoint + "-";
        }
        return `order-${breakpoint}${order}`;
    }
    getAlignmentClass(alignmentString, targetBreakpoint) {
        const alignment = alignmentString.split(" ");
        const vertical = alignment[0];
        const horizontal = alignment[1];
        let breakpoint = "";
        if (targetBreakpoint !== "xs") {
            breakpoint = targetBreakpoint + "-";
        }
        return `align-content-${breakpoint}${vertical} align-items-${breakpoint}${vertical} justify-content-${breakpoint}${horizontal}`;
    }
};
ColumnViewModel = __decorate([
    decorators_1.Component({
        selector: "layout-column",
        template: column_html_1.default
    }),
    __metadata("design:paramtypes", [])
], ColumnViewModel);
exports.ColumnViewModel = ColumnViewModel;
//# sourceMappingURL=columnViewModel.js.map