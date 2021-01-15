"use strict";
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
exports.LocaleService = void 0;
const localesPath = "locales";
class LocaleService {
    constructor(objectStorage) {
        this.objectStorage = objectStorage;
        this.currentLocale = "en-us";
    }
    getLocales() {
        return __awaiter(this, void 0, void 0, function* () {
            const localeEnUs = {
                key: `${localesPath}/en-us`,
                code: "en-us",
                displayName: "English (US)"
            };
            const result = yield this.objectStorage.getObject(localesPath);
            if (!result) {
                return [localeEnUs];
            }
            const locales = Object.values(result);
            return [localeEnUs].concat(locales);
        });
    }
    createLocale(code, displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `${localesPath}/${code}`;
            const locale = {
                key: key,
                code: code,
                displayName: displayName
            };
            yield this.objectStorage.addObject(key, locale);
        });
    }
    deleteLocale(code) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getDefaultLocale() {
        return __awaiter(this, void 0, void 0, function* () {
            return "en-us";
        });
    }
    getCurrentLocale() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.currentLocale;
        });
    }
    setCurrentLocale(localeCode) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentLocale = localeCode;
        });
    }
    isLocalizationEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
}
exports.LocaleService = LocaleService;
//# sourceMappingURL=localeService.js.map