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
exports.GridCellEditor = void 0;
const ko = require("knockout");
const Utils = require("@paperbits/common/utils");
const Objects = require("@paperbits/common/objects");
const gridCellEditor_html_1 = require("./gridCellEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const gridCellModel_1 = require("../gridCellModel");
let GridCellEditor = class GridCellEditor {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.container = ko.observable();
        this.box = ko.observable();
    }
    initialize() {
        this.updateObservables();
        this.eventManager.addEventListener("onViewportChange", this.updateObservables);
    }
    updateObservables() {
        const gridCellStyleConfig = Objects.getObjectAt(`styles/instance/grid-cell`, this.model);
        if (!gridCellStyleConfig) {
            return;
        }
        const viewport = this.viewManager.getViewport();
        const breakpoint = Utils.getClosestBreakpoint(gridCellStyleConfig, viewport);
        const styleConfig = gridCellStyleConfig[breakpoint];
        const containerConfig = {
            alignment: styleConfig.alignment,
            overflow: styleConfig.overflow
        };
        this.container(containerConfig);
        const paddingConfig = Objects.getObjectAt(`styles/instance/padding/${viewport}`, this.model);
        this.box({ padding: paddingConfig });
    }
    onContainerUpdate(containerConfig) {
        const viewport = this.viewManager.getViewport();
        Objects.setValue(`styles/instance/grid-cell/${viewport}/alignment`, this.model, containerConfig.alignment);
        Objects.setValue(`styles/instance/grid-cell/${viewport}/overflow`, this.model, containerConfig.overflow);
        this.onChange(this.model);
    }
    onBoxUpdate(boxConfig) {
        const viewport = this.viewManager.getViewport();
        Objects.setValue(`styles/instance/padding/${viewport}`, this.model, boxConfig.padding);
        this.onChange(this.model);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", gridCellModel_1.GridCellModel)
], GridCellEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], GridCellEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GridCellEditor.prototype, "initialize", null);
GridCellEditor = __decorate([
    decorators_1.Component({
        selector: "grid-cell-editor",
        template: gridCellEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], GridCellEditor);
exports.GridCellEditor = GridCellEditor;
//# sourceMappingURL=gridCellEditor.js.map