"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogWorkshopToolButton = void 0;
class BlogWorkshopToolButton {
    constructor(viewManager) {
        this.viewManager = viewManager;
        this.iconClass = "paperbits-icon paperbits-chat-45-2";
        this.title = "Blog";
    }
    onActivate() {
        this.viewManager.clearJourney();
        const view = {
            heading: this.title,
            component: { name: "blogs" }
        };
        this.viewManager.openViewAsWorkshop(view);
    }
}
exports.BlogWorkshopToolButton = BlogWorkshopToolButton;
//# sourceMappingURL=blogToolButton.js.map