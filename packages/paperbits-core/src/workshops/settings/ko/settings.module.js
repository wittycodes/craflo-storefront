"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsWorkshopModule = void 0;
const _1 = require(".");
const settingsToolButton_1 = require("./settingsToolButton");
class SettingsWorkshopModule {
    register(injector) {
        injector.bind("settingsWorkshop", _1.SettingsWorkshop);
        injector.bindToCollection("workshopSections", settingsToolButton_1.SettingsToolButton);
    }
}
exports.SettingsWorkshopModule = SettingsWorkshopModule;
//# sourceMappingURL=settings.module.js.map