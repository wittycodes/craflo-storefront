"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutsToolButton = void 0;
class LayoutsToolButton {
    constructor(viewManager) {
        this.viewManager = viewManager;
        this.iconClass = "paperbits-icon paperbits-layout-11-2";
        this.title = "Layouts";
    }
    onActivate() {
        this.viewManager.clearJourney();
        const view = {
            heading: this.title,
            helpText: "<h1>Layouts</h1><p>Add or edit layouts. Layouts let you centralize common content (e.g., navigation bar, footer), which will be applied to pages. Each page is automatically matched with a layout based on the URL template.</p>",
            component: { name: "layouts" }
        };
        this.viewManager.openViewAsWorkshop(view);
    }
}
exports.LayoutsToolButton = LayoutsToolButton;
//# sourceMappingURL=layoutsToolButton.js.map