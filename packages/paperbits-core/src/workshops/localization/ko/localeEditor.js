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
exports.LocaleEditor = void 0;
const ko = require("knockout");
const localeEditor_html_1 = require("./localeEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const localization_1 = require("@paperbits/common/localization");
const locales_1 = require("../locales");
let LocaleEditor = class LocaleEditor {
    constructor(localeService, eventManager, viewManager) {
        this.localeService = localeService;
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.selectedLanguage = ko.observable();
        this.selectedLocale = ko.observable();
        this.locales = ko.observableArray();
        this.languages = ko.observable(Object.keys(locales_1.builtInLocales).map(code => {
            return {
                code: code,
                locales: locales_1.builtInLocales[code].locales,
                displayName: locales_1.builtInLocales[code].nameNative
            };
        }));
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedLanguage.subscribe(language => {
                this.locales(null);
                this.selectedLocale(null);
                if (!language.locales) {
                    return;
                }
                this.locales(Object.keys(language.locales).map(x => {
                    return {
                        code: x,
                        displayName: language.locales[x].nameNative
                    };
                }));
            });
        });
    }
    addLocale() {
        return __awaiter(this, void 0, void 0, function* () {
            const language = this.selectedLanguage();
            const locale = this.selectedLocale();
            let code = language.code;
            let displayName = language.displayName;
            if (locale) {
                code += "-" + locale.code;
                displayName += ` (${locale.displayName})`;
            }
            yield this.localeService.createLocale(code, displayName);
            this.eventManager.dispatchEvent("onLocalesChange");
            if (this.onLocaleAdded) {
                this.onLocaleAdded(locale);
            }
            this.viewManager.notifySuccess("Content localization", `Locale "${displayName}" was  added.`);
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Object)
], LocaleEditor.prototype, "locale", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], LocaleEditor.prototype, "onLocaleAdded", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocaleEditor.prototype, "initialize", null);
LocaleEditor = __decorate([
    decorators_1.Component({
        selector: "locale-editor",
        template: localeEditor_html_1.default,
        injectable: "localeEditor"
    }),
    __metadata("design:paramtypes", [localization_1.LocaleService, Object, Object])
], LocaleEditor);
exports.LocaleEditor = LocaleEditor;
//# sourceMappingURL=localeEditor.js.map