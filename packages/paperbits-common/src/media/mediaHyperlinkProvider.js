"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaHyperlinkProvider = void 0;
const hyperlinkModel_1 = require("../permalinks/hyperlinkModel");
const Constants = require("./constants");
class MediaHyperlinkProvider {
    constructor() {
        this.name = "Media";
        this.componentName = "media-selector";
        this.iconClass = "paperbits-icon paperbits-image-2";
    }
    canHandleHyperlink(contentItemKey) {
        return contentItemKey.startsWith(`${Constants.mediaRoot}/`);
    }
    getHyperlinkFromResource(media) {
        const hyperlinkModel = new hyperlinkModel_1.HyperlinkModel();
        hyperlinkModel.title = media.fileName;
        hyperlinkModel.targetKey = media.key;
        hyperlinkModel.href = media.permalink;
        return hyperlinkModel;
    }
}
exports.MediaHyperlinkProvider = MediaHyperlinkProvider;
//# sourceMappingURL=mediaHyperlinkProvider.js.map