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
exports.DefaultSettingsProvider = void 0;
const Objects = require("@paperbits/common/objects");
class DefaultSettingsProvider {
    constructor(httpClient, eventManager) {
        this.httpClient = httpClient;
        this.eventManager = eventManager;
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.send({ url: "/config.json" });
            this.configuration = response.toObject();
            return this.configuration;
        });
    }
    getSetting(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getSettings();
            return Objects.getObjectAt(name, this.configuration);
        });
    }
    onSettingChange(name, eventHandler) {
        this.eventManager.addEventListener("onSettingChange", (setting) => {
            if (setting.name === name) {
                eventHandler(setting.value);
            }
        });
    }
    setSetting(name, value) {
        this.configuration[name] = value;
        this.eventManager.dispatchEvent("onSettingChange", { name: name, value: value });
    }
    getSettings() {
        if (!this.loadingPromise) {
            this.loadingPromise = this.loadSettings();
        }
        return this.loadingPromise;
    }
}
exports.DefaultSettingsProvider = DefaultSettingsProvider;
//# sourceMappingURL=defaultSettingsProvider.js.map