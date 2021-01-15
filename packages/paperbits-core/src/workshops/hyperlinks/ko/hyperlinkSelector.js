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
exports.HyperlinkSelector = void 0;
const ko = require("knockout");
const hyperlinkSelector_html_1 = require("./hyperlinkSelector.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const defaultTarget = "_self";
let HyperlinkSelector = class HyperlinkSelector {
    constructor(hyperlinkProviders) {
        this.hyperlinkProviders = hyperlinkProviders;
        this.hyperlink = ko.observable();
        this.hyperlinkProvider = ko.observable(null);
        this.target = ko.observable(defaultTarget);
        this.selection = ko.computed(() => {
            const hyperlink = ko.unwrap(this.hyperlink);
            if (!hyperlink) {
                return "No link";
            }
            return `${hyperlink.title}${hyperlink.anchorName ? " (" + hyperlink.anchorName + ")" : ""}`;
        });
    }
    onMounted() {
        this.updateHyperlinkState(this.hyperlink());
        this.hyperlinkProvider.subscribe(this.onResourcePickerChange);
        this.target.subscribe(this.targetChanged);
    }
    onResourcePickerChange(resourcePicker) {
        if (resourcePicker === null) {
            this.hyperlink(null);
            this.onChange(null);
        }
    }
    onHyperlinkSelected(hyperlink) {
        this.hyperlink(hyperlink);
        if (hyperlink) {
            hyperlink.target = this.target();
            const hyperlinkProvider = this.hyperlinkProviders.find(x => x.canHandleHyperlink(hyperlink.targetKey));
            this.hyperlinkProvider(hyperlinkProvider);
        }
        if (this.onChange) {
            this.onChange(hyperlink);
        }
    }
    targetChanged() {
        const hyperlink = this.hyperlink();
        hyperlink.target = this.target();
        this.hyperlink(hyperlink);
        if (this.onChange) {
            this.onChange(hyperlink);
        }
    }
    selectProvider(provider) {
        this.hyperlinkProvider(provider);
        if (!provider) {
            this.hyperlink(null);
        }
    }
    getCurrentSelection() {
        const hyperlink = this.hyperlink();
        if (!this.hyperlinkProvider() || !hyperlink) {
            return "Not selected";
        }
        return `${this.hyperlinkProvider().name}: ${hyperlink.title} ${hyperlink.anchorName ? "(" + hyperlink.anchorName + ")" : ""}`;
    }
    clearProvider() {
        this.hyperlinkProvider(null);
    }
    updateHyperlinkState(hyperlink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hyperlink) {
                this.hyperlinkProvider(null);
                return;
            }
            let hyperlinkProvider;
            if (hyperlink.targetKey) {
                hyperlinkProvider = this.hyperlinkProviders.find(x => x.canHandleHyperlink(hyperlink.targetKey));
            }
            this.hyperlink(hyperlink);
            this.target(hyperlink.target || defaultTarget);
            this.hyperlinkProvider(hyperlinkProvider);
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], HyperlinkSelector.prototype, "hyperlink", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], HyperlinkSelector.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HyperlinkSelector.prototype, "onMounted", null);
HyperlinkSelector = __decorate([
    decorators_1.Component({
        selector: "hyperlink-selector",
        template: hyperlinkSelector_html_1.default
    }),
    __metadata("design:paramtypes", [Array])
], HyperlinkSelector);
exports.HyperlinkSelector = HyperlinkSelector;
//# sourceMappingURL=hyperlinkSelector.js.map