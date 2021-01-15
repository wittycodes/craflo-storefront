"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationToolButton = void 0;
class NavigationToolButton {
    constructor(viewManager) {
        this.viewManager = viewManager;
        this.iconClass = "paperbits-icon paperbits-menu-34";
        this.title = "Navigation";
    }
    onActivate() {
        this.viewManager.clearJourney();
        const view = {
            heading: this.title,
            helpText: "<h1>Navigation</h1><p>Add or edit navigation menus.</p>",
            component: { name: "navigation" }
        };
        this.viewManager.openViewAsWorkshop(view);
    }
}
exports.NavigationToolButton = NavigationToolButton;
//# sourceMappingURL=navigationToolButton.js.map