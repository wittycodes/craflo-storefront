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
exports.RowLayoutSelector = void 0;
var rowLayoutSelector_html_1 = require("./rowLayoutSelector.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var columnModel_1 = require("../../column/columnModel");
var rowModel_1 = require("../rowModel");
var RowLayoutSelector = (function () {
    function RowLayoutSelector() {
        this.rowConfigs = [
            [{ xs: 12 }],
            [{ xs: 6 }, { xs: 6 }],
            [{ xs: 4 }, { xs: 4 }, { xs: 4 }]
        ];
        this.selectRowLayout = this.selectRowLayout.bind(this);
    }
    RowLayoutSelector.prototype.selectRowLayout = function (columnSizeCfgs) {
        var rowModel = new rowModel_1.RowModel();
        columnSizeCfgs.forEach(function (size) {
            var column = new columnModel_1.ColumnModel();
            column.size = size.xs.toString();
            rowModel.widgets.push(column);
        });
        if (this.onSelect) {
            this.onSelect(rowModel);
        }
    };
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], RowLayoutSelector.prototype, "onSelect", void 0);
    RowLayoutSelector = __decorate([
        decorators_1.Component({
            selector: "email-row-layout-selector",
            template: rowLayoutSelector_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], RowLayoutSelector);
    return RowLayoutSelector;
}());
exports.RowLayoutSelector = RowLayoutSelector;
