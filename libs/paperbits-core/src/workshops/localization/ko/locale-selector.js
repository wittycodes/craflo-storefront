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
exports.LocaleSelector = void 0;
const ko = require("knockout");
const locale_selector_html_1 = require("./locale-selector.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let LocaleSelector = class LocaleSelector {
    constructor(eventManager, viewManager, localeService) {
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.localeService = localeService;
        this.selectedLocale = ko.observable();
        this.locales = ko.observableArray();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.refreshLocales();
            this.eventManager.addEventListener("onLocalesChange", this.refreshLocales);
        });
    }
    refreshLocales() {
        return __awaiter(this, void 0, void 0, function* () {
            const locales = yield this.localeService.getLocales();
            const currentLocaleCode = yield this.localeService.getCurrentLocale();
            this.locales(locales);
            this.selectedLocale(locales.find(x => x.code === currentLocaleCode));
        });
    }
    selectLocale(locale) {
        this.viewManager.clearJourney();
        this.localeService.setCurrentLocale(locale.code);
        this.eventManager.dispatchEvent("onLocaleChange", locale);
        this.selectedLocale(locale);
    }
    addLocale() {
        return __awaiter(this, void 0, void 0, function* () {
            const view = {
                heading: "Add locale",
                component: {
                    name: "locale-editor",
                    params: {
                        onLocaleAdded: () => {
                            this.viewManager.closeView();
                        }
                    }
                },
                resize: "vertically horizontally"
            };
            this.viewManager.openViewAsPopup(view);
        });
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocaleSelector.prototype, "initialize", null);
LocaleSelector = __decorate([
    decorators_1.Component({
        selector: "locale-selector",
        template: locale_selector_html_1.default,
        injectable: "localeSelector"
    }),
    __metadata("design:paramtypes", [Object, Object, Object])
], LocaleSelector);
exports.LocaleSelector = LocaleSelector;
//# sourceMappingURL=locale-selector.js.map