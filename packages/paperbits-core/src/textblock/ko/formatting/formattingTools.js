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
exports.FormattingTools = void 0;
const ko = require("knockout");
const Utils = require("@paperbits/common/utils");
const formattingTools_html_1 = require("./formattingTools.html");
const editing_1 = require("@paperbits/common/editing");
const decorators_1 = require("@paperbits/common/ko/decorators");
const styleService_1 = require("@paperbits/styles/styleService");
let FormattingTools = class FormattingTools {
    constructor(htmlEditorProvider, eventManager, viewManager, styleService) {
        this.htmlEditorProvider = htmlEditorProvider;
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.styleService = styleService;
        this.style = ko.observable();
        this.appearance = ko.observable();
        this.colored = ko.observable();
        this.selectedColorKey = ko.observable();
        this.font = ko.observable();
        this.sized = ko.observable();
        this.ol = ko.observable();
        this.ul = ko.observable();
        this.bold = ko.observable();
        this.italic = ko.observable();
        this.underlined = ko.observable();
        this.highlighted = ko.observable();
        this.striked = ko.observable();
        this.code = ko.observable();
        this.ul = ko.observable();
        this.ol = ko.observable();
        this.pre = ko.observable();
        this.alignment = ko.observable();
        this.anchored = ko.observable();
        this.textStyles = ko.observableArray();
        this.orderedListStyles = ko.observableArray();
        this.unorderedListStyles = ko.observableArray();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadTextStyles();
            this.updateFormattingState();
            this.eventManager.addEventListener(editing_1.HtmlEditorEvents.onSelectionChange, this.updateFormattingState);
        });
    }
    loadTextStyles() {
        return __awaiter(this, void 0, void 0, function* () {
            this.textStyles(yield this.styleService.getVariations("globals", "body"));
            this.orderedListStyles(yield this.styleService.getVariations("globals", "ol"));
            this.unorderedListStyles(yield this.styleService.getVariations("globals", "ul"));
        });
    }
    updateFormattingState() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            if (this.textStyles()) {
                const defaultStyle = this.textStyles().find(x => x.key === "globals/body/default");
                const appearance = defaultStyle.displayName;
                this.appearance(appearance);
                this.style("Normal");
            }
            return;
        }
        const selectionState = htmlEditor.getSelectionState();
        this.bold(selectionState.bold);
        this.italic(selectionState.italic);
        this.underlined(selectionState.underlined);
        this.highlighted(selectionState.highlighted);
        this.striked(selectionState.striked);
        this.code(selectionState.code);
        this.colored(!!selectionState.colorKey);
        this.selectedColorKey(selectionState.colorKey);
        this.ul(selectionState.bulletedList);
        this.ol(selectionState.orderedList);
        let alignment = "left";
        if (selectionState.alignment) {
            const breakpoint = Utils.getClosestBreakpoint(selectionState.alignment, this.viewManager.getViewport());
            const alignmentStyleKey = selectionState.alignment[breakpoint];
            switch (alignmentStyleKey) {
                case editing_1.alignmentStyleKeys.left:
                    alignment = "left";
                    break;
                case editing_1.alignmentStyleKeys.center:
                    alignment = "center";
                    break;
                case editing_1.alignmentStyleKeys.right:
                    alignment = "right";
                    break;
                case editing_1.alignmentStyleKeys.justify:
                    alignment = "justify";
                    break;
                default:
                    console.warn(`Unknown alignment style key: ${alignmentStyleKey}`);
            }
        }
        this.alignment(alignment);
        if (this.textStyles()) {
            let appearance = this.textStyles()[0]["displayName"];
            if (selectionState.appearance) {
                const styleKey = selectionState.appearance;
                const textStyle = this.textStyles().find(item => item["key"] === styleKey);
                appearance = textStyle && textStyle["displayName"];
            }
            this.appearance(appearance);
        }
        this.anchored(!!selectionState.anchorKey);
        switch (selectionState.block) {
            case "heading1":
                this.style("Heading 1");
                break;
            case "heading2":
                this.style("Heading 2");
                break;
            case "heading3":
                this.style("Heading 3");
                break;
            case "heading4":
                this.style("Heading 4");
                break;
            case "heading5":
                this.style("Heading 5");
                break;
            case "heading6":
                this.style("Heading 6");
                break;
            case "quote":
                this.style("Quote");
                break;
            case "formatted":
                this.style("Formatted");
                break;
            default:
                this.style("Normal");
        }
    }
    toggleNn() {
        this.updateFormattingState();
    }
    toggleBold() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleBold();
    }
    toggleItalic() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleItalic();
    }
    toggleParagraph() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleParagraph();
    }
    toggleUnderlined() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleUnderlined();
    }
    toggleStriked() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleStriked();
    }
    toggleHighlighted() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleHighlighted();
    }
    toggleCode() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleCode();
    }
    toggleSize() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleSize();
    }
    toggleOrderedList() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleOrderedList();
    }
    toggleUnorderedList() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleUnorderedList();
    }
    onUnorderedListStyleSelected(style) {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.toggleUnorderedList(style.key);
    }
    incIndent() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.increaseIndent();
        this.updateFormattingState();
    }
    decIndent() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.decreaseIndent();
    }
    toggleAlignLeft() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.alignLeft(this.viewManager.getViewport());
    }
    toggleAlignCenter() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.alignCenter(this.viewManager.getViewport());
    }
    toggleAlignRight() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.alignRight(this.viewManager.getViewport());
    }
    toggleJustify() {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        htmlEditor.justify(this.viewManager.getViewport());
    }
    onColorSelected(color) {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        if (color) {
            htmlEditor.setColor(color.key);
        }
        else {
            htmlEditor.removeColor();
        }
    }
    onTextStyleSelected(style) {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();
        if (!htmlEditor) {
            return;
        }
        this.htmlEditorProvider.getCurrentHtmlEditor().setTextStyle(style.key, this.viewManager.getViewport());
        this.appearance(style.displayName);
    }
    dispose() {
        this.eventManager.removeEventListener(editing_1.HtmlEditorEvents.onSelectionChange, this.updateFormattingState);
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormattingTools.prototype, "init", null);
__decorate([
    decorators_1.OnDestroyed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormattingTools.prototype, "dispose", null);
FormattingTools = __decorate([
    decorators_1.Component({
        selector: "formatting",
        template: formattingTools_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, Object, styleService_1.StyleService])
], FormattingTools);
exports.FormattingTools = FormattingTools;
//# sourceMappingURL=formattingTools.js.map