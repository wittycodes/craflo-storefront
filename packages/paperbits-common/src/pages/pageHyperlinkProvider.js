"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHyperlinkProvider = void 0;
class PageHyperlinkProvider {
    constructor() {
        this.name = "Pages";
        this.componentName = "page-selector";
        this.iconClass = "paperbits-icon paperbits-menu-4";
    }
    canHandleHyperlink(contentItemKey) {
        return contentItemKey.startsWith("pages/");
    }
    getHyperlinkFromResource(hyperlinkModel) {
        return hyperlinkModel;
    }
}
exports.PageHyperlinkProvider = PageHyperlinkProvider;
//# sourceMappingURL=pageHyperlinkProvider.js.map