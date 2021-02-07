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
const rowLayoutSelector_html_1 = require("./rowLayoutSelector.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const columnModel_1 = require("../../column/columnModel");
const rowModel_1 = require("../rowModel");
let RowLayoutSelector = class RowLayoutSelector {
    constructor() {
        this.rowConfigs = [
            [{ xs: 12 }],
            [{ xs: 12, md: 6 }, { xs: 12, md: 6 }],
            [{ xs: 12, md: 4 }, { xs: 12, md: 4 }, { xs: 12, md: 4 }],
            [{ xs: 12, md: 3 }, { xs: 12, md: 3 }, { xs: 12, md: 3 }, { xs: 12, md: 3 }],
            [{ xs: 12, md: 8 }, { xs: 12, md: 4 }], [{ xs: 12, md: 4 }, { xs: 12, md: 8 }],
            [{ xs: 12, md: 3 }, { xs: 12, md: 9 }], [{ xs: 12, md: 9 }, { xs: 12, md: 3 }],
            [{ xs: 12, md: 6 }, { xs: 12, md: 3 }, { xs: 12, md: 3 }],
            [{ xs: 12, md: 3 }, { xs: 12, md: 3 }, { xs: 12, md: 6 }],
            [{ xs: 12, md: 3 }, { xs: 12, md: 6 }, { xs: 12, md: 3 }]
        ];
        this.selectRowLayout = this.selectRowLayout.bind(this);
    }
    selectRowLayout(columnSizeCfgs) {
        const rowModel = new rowModel_1.RowModel();
        columnSizeCfgs.forEach(size => {
            const column = new columnModel_1.ColumnModel();
            column.size.xs = size.xs;
            column.size.sm = size.sm;
            column.size.md = size.md;
            column.size.lg = size.lg;
            column.size.xl = size.xl;
            rowModel.widgets.push(column);
        });
        if (this.onSelect) {
            this.onSelect(rowModel);
        }
    }
};
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], RowLayoutSelector.prototype, "onSelect", void 0);
RowLayoutSelector = __decorate([
    decorators_1.Component({
        selector: "row-layout-selector",
        template: rowLayoutSelector_html_1.default
    }),
    __metadata("design:paramtypes", [])
], RowLayoutSelector);
exports.RowLayoutSelector = RowLayoutSelector;
//# sourceMappingURL=rowLayoutSelector.js.map