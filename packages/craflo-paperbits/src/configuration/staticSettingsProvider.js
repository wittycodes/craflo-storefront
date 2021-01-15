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
exports.StaticSettingsProvider = void 0;
const Utils = require("../utils");
class StaticSettingsProvider {
    constructor(settingsPath) {
        this.settingsPath = settingsPath;
    }
    getSetting(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getSettings();
            return this.configuration[name];
        });
    }
    setSetting(name, value) {
        this.configuration[name] = value;
    }
    getSettings() {
        if (!this.loadingPromise) {
            this.loadingPromise = this.loadSettings();
        }
        return this.loadingPromise;
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const configFileContent = yield Utils.loadFileAsString(this.settingsPath);
            this.configuration = JSON.parse(configFileContent);
            return this.configuration;
        });
    }
}
exports.StaticSettingsProvider = StaticSettingsProvider;
