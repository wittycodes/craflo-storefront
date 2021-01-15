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
exports.ButtonEditor = void 0;
const ko = require("knockout");
const buttonEditor_html_1 = require("./buttonEditor.html");
const styles_1 = require("@paperbits/styles");
const buttonModel_1 = require("../buttonModel");
const decorators_1 = require("@paperbits/common/ko/decorators");
let ButtonEditor = class ButtonEditor {
    constructor(styleService) {
        this.styleService = styleService;
        this.label = ko.observable();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
        this.hyperlink = ko.observable();
        this.hyperlinkTitle = ko.observable();
    }
    initialize() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.label(this.model.label);
            if (this.model.styles) {
                const variations = yield this.styleService.getComponentVariations("button");
                this.appearanceStyles(variations.filter(x => x.category === "appearance"));
                this.appearanceStyle((_a = this.model.styles) === null || _a === void 0 ? void 0 : _a.appearance);
            }
            this.hyperlink(this.model.hyperlink);
            this.onHyperlinkChange(this.model.hyperlink);
            this.appearanceStyle.subscribe(this.applyChanges);
            this.label.subscribe(this.applyChanges);
            this.hyperlink.subscribe(this.applyChanges);
        });
    }
    onHyperlinkChange(hyperlink) {
        if (hyperlink) {
            this.hyperlinkTitle(hyperlink.title);
            this.hyperlink(hyperlink);
        }
        else {
            this.hyperlinkTitle("Add a link...");
        }
    }
    onRoleSelect(roles) {
        this.model.roles = roles;
        this.applyChanges();
    }
    onIconSelect(iconKey) {
        this.model.iconKey = iconKey;
        this.applyChanges();
    }
    applyChanges() {
        this.model.label = this.label();
        this.model.hyperlink = this.hyperlink();
        this.model.styles = {
            appearance: this.appearanceStyle()
        };
        this.onChange(this.model);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", buttonModel_1.ButtonModel)
], ButtonEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], ButtonEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ButtonEditor.prototype, "initialize", null);
ButtonEditor = __decorate([
    decorators_1.Component({
        selector: "button-editor",
        template: buttonEditor_html_1.default
    }),
    __metadata("design:paramtypes", [styles_1.StyleService])
], ButtonEditor);
exports.ButtonEditor = ButtonEditor;
//# sourceMappingURL=buttonEditor.js.map