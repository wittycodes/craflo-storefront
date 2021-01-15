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
exports.TextblockEditor = void 0;
const ko = require("knockout");
const textblockEditor_html_1 = require("./textblockEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const __1 = require("..");
let TextblockEditor = class TextblockEditor {
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.pluginNames = ko.observableArray();
        this.pluginNames.push("formatting");
        this.pluginNames.push("hyperlink-editor");
    }
    initialize() {
        this.eventManager.dispatchEvent("enableHtmlEditor");
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", __1.TextblockModel)
], TextblockEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], TextblockEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TextblockEditor.prototype, "initialize", null);
TextblockEditor = __decorate([
    decorators_1.Component({
        selector: "html-editor",
        template: textblockEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], TextblockEditor);
exports.TextblockEditor = TextblockEditor;
//# sourceMappingURL=textblockEditor.js.map