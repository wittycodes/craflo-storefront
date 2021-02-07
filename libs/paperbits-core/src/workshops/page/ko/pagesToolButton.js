"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesToolButton = void 0;
class PagesToolButton {
    constructor(viewManager) {
        this.viewManager = viewManager;
        this.iconClass = "paperbits-icon paperbits-menu-4";
        this.title = "Pages";
    }
    onActivate() {
        this.viewManager.clearJourney();
        const view = {
            heading: this.title,
            helpText: "<h1>Pages</h1><p>Add or edit pages of your website. Each page has a unique URL, which also automatically defines the layout it is part of.</p>",
            component: { name: "pages" }
        };
        this.viewManager.openViewAsWorkshop(view);
    }
}
exports.PagesToolButton = PagesToolButton;
//# sourceMappingURL=pagesToolButton.js.map