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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuEditor = void 0;
const ko = require("knockout");
const menuEditor_html_1 = require("./menuEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const styles_1 = require("@paperbits/styles");
const menuModel_1 = require("../menuModel");
const emptySelectionLabel = "Click to select navigation item...";
let MenuEditor = class MenuEditor {
    constructor(styleService) {
        this.styleService = styleService;
        this.showHeadings = ko.observable();
        this.minHeadingLevel = ko.observable();
        this.maxHeadingLevel = ko.observable();
        this.layout = ko.observable();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
        this.headingLevelOptions = ko.observableArray([
            { label: "Heading 1", value: 1 },
            { label: "Heading 2", value: 2 },
            { label: "Heading 3", value: 3 },
            { label: "Heading 4", value: 4 },
            { label: "Heading 5", value: 5 },
            { label: "Heading 6", value: 6 }
        ]);
        this.layoutOptions = ko.observableArray([
            { label: "Horizontal menu", value: "horizontal" },
            { label: "Vertical menu", value: "vertical" }
        ]);
        this.navigationItemTitle = ko.observable();
    }
    initialize() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.showHeadings(!!this.model.minHeading || !!this.model.maxHeading);
            this.minHeadingLevel(this.model.minHeading || 1);
            this.maxHeadingLevel(this.model.maxHeading || 6);
            const variations = yield this.styleService.getComponentVariations("menu");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.appearanceStyle((_a = this.model.styles) === null || _a === void 0 ? void 0 : _a.appearance);
            this.navigationItemTitle(((_b = this.model.navigationItem) === null || _b === void 0 ? void 0 : _b.label) || emptySelectionLabel);
            this.layout(this.model.layout);
            this.minHeadingLevel.subscribe(this.applyChanges);
            this.maxHeadingLevel.subscribe(this.applyChanges);
            this.layout.subscribe(this.applyChanges);
            this.showHeadings.subscribe(this.applyChanges);
            this.appearanceStyle.subscribe(this.applyChanges);
        });
    }
    onNavigationItemChange(navigationItem) {
        return __awaiter(this, void 0, void 0, function* () {
            this.model.navigationItem = navigationItem;
            this.navigationItemTitle((navigationItem === null || navigationItem === void 0 ? void 0 : navigationItem.label) || emptySelectionLabel);
            this.applyChanges();
        });
    }
    applyChanges() {
        if (this.showHeadings()) {
            this.model.minHeading = this.minHeadingLevel();
            this.model.maxHeading = this.maxHeadingLevel();
        }
        else {
            this.model.minHeading = null;
            this.model.maxHeading = null;
        }
        this.model.layout = this.layout();
        this.model.styles = {
            appearance: this.appearanceStyle()
        };
        this.onChange(this.model);
    }
    onRoleSelect(roles) {
        this.model.roles = roles;
        this.applyChanges();
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", menuModel_1.MenuModel)
], MenuEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], MenuEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuEditor.prototype, "initialize", null);
MenuEditor = __decorate([
    decorators_1.Component({
        selector: "menu-editor",
        template: menuEditor_html_1.default
    }),
    __metadata("design:paramtypes", [styles_1.StyleService])
], MenuEditor);
exports.MenuEditor = MenuEditor;
//# sourceMappingURL=menuEditor.js.map