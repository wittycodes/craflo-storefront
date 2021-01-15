"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsToolButton = void 0;
class SettingsToolButton {
    constructor(viewManager) {
        this.viewManager = viewManager;
        this.iconClass = "paperbits-icon paperbits-preferences-circle";
        this.title = "Settings";
    }
    onActivate() {
        this.viewManager.clearJourney();
        const view = {
            heading: this.title,
            helpText: "<h1>Site settings</h1><p>Edit your website metadata.</p>",
            component: { name: "settings" }
        };
        this.viewManager.openViewAsWorkshop(view);
    }
}
exports.SettingsToolButton = SettingsToolButton;
//# sourceMappingURL=settingsToolButton.js.map