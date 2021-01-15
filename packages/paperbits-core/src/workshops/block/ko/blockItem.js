"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockItem = void 0;
const ko = require("knockout");
class BlockItem {
    constructor(block, widget, styleManager) {
        this.key = block.key;
        this.contentKey = block.contentKey;
        this.title = ko.observable(block.title);
        this.description = ko.observable(block.description);
        this.hasFocus = ko.observable();
        this.widget = widget;
        this.styleManager = styleManager;
    }
    toBlock() {
        return {
            key: this.key,
            type: "block",
            title: this.title(),
            description: this.description(),
            contentKey: this.contentKey
        };
    }
}
exports.BlockItem = BlockItem;
//# sourceMappingURL=blockItem.js.map