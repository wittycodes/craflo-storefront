"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaToolButton = void 0;
class MediaToolButton {
    constructor(viewManager) {
        this.viewManager = viewManager;
        this.iconClass = "paperbits-icon paperbits-image-2";
        this.title = "Media";
    }
    onActivate() {
        this.viewManager.clearJourney();
        const view = {
            heading: this.title,
            helpText: "<h1>Media library</h1><p>Upload or edit files in the media library.</p>",
            component: { name: "media" }
        };
        this.viewManager.openViewAsWorkshop(view);
    }
}
exports.MediaToolButton = MediaToolButton;
//# sourceMappingURL=mediaToolButton.js.map