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
exports.HyperlinkEditor = void 0;
const ko = require("knockout");
const hyperlinkEditor_html_1 = require("./hyperlinkEditor.html");
const permalinkResolver_1 = require("@paperbits/common/permalinks/permalinkResolver");
const decorators_1 = require("@paperbits/common/ko/decorators");
let HyperlinkEditor = class HyperlinkEditor {
    constructor(htmlEditorProvider, permalinkResolver, eventManager) {
        this.htmlEditorProvider = htmlEditorProvider;
        this.permalinkResolver = permalinkResolver;
        this.eventManager = eventManager;
        this.htmlEditorProvider = htmlEditorProvider;
        this.permalinkResolver = permalinkResolver;
        this.eventManager = eventManager;
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onHyperlinkChange = this.onHyperlinkChange.bind(this);
        this.hyperlink = ko.observable();
        eventManager.addEventListener("htmlEditorChanged", this.onSelectionChange);
    }
    onHyperlinkChange(hyperlink) {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
            if (!htmlEditor) {
                return;
            }
            if (!hyperlink) {
                htmlEditor.removeHyperlink();
            }
            else {
                htmlEditor.setHyperlink(hyperlink);
            }
        });
    }
    onSelectionChange() {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
            const hyperlinkContract = htmlEditor.getHyperlink();
            if (hyperlinkContract) {
                const hyperlinkModel = yield this.permalinkResolver.getHyperlinkFromContract(hyperlinkContract);
                this.hyperlink(hyperlinkModel);
            }
            else {
                this.hyperlink(null);
            }
        });
    }
    onClick() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        htmlEditor.expandSelection();
    }
    dispose() {
        this.eventManager.removeEventListener("htmlEditorChanged", this.onSelectionChange);
    }
};
__decorate([
    decorators_1.OnDestroyed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HyperlinkEditor.prototype, "dispose", null);
HyperlinkEditor = __decorate([
    decorators_1.Component({
        selector: "hyperlink-editor",
        template: hyperlinkEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, permalinkResolver_1.PermalinkResolver, Object])
], HyperlinkEditor);
exports.HyperlinkEditor = HyperlinkEditor;
//# sourceMappingURL=hyperlinkEditor.js.map