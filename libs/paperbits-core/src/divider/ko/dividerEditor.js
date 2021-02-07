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
exports.DividerEditor = void 0;
const ko = require("knockout");
const dividerEditor_html_1 = require("./dividerEditor.html");
const styles_1 = require("@paperbits/styles");
const dividerModel_1 = require("../dividerModel");
const decorators_1 = require("@paperbits/common/ko/decorators");
let DividerEditor = class DividerEditor {
    constructor(styleService) {
        this.styleService = styleService;
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
    }
    initialize() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.model.styles) {
                const variations = yield this.styleService.getComponentVariations("divider");
                this.appearanceStyles(variations.filter(x => x.category === "appearance"));
                this.appearanceStyle((_a = this.model.styles) === null || _a === void 0 ? void 0 : _a.appearance);
            }
            this.appearanceStyle.subscribe(this.applyChanges);
        });
    }
    applyChanges() {
        this.model.styles = {
            appearance: this.appearanceStyle()
        };
        this.onChange(this.model);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", dividerModel_1.DividerModel)
], DividerEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], DividerEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DividerEditor.prototype, "initialize", null);
DividerEditor = __decorate([
    decorators_1.Component({
        selector: "divider-editor",
        template: dividerEditor_html_1.default
    }),
    __metadata("design:paramtypes", [styles_1.StyleService])
], DividerEditor);
exports.DividerEditor = DividerEditor;
//# sourceMappingURL=dividerEditor.js.map