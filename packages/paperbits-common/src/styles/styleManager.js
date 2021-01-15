"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleManager = void 0;
class StyleManager {
    constructor(eventManager = null) {
        this.eventManager = eventManager;
        this.styleSheets = {};
    }
    setStyleSheet(styleSheet) {
        this.styleSheets[styleSheet.key] = styleSheet;
        if (this.eventManager) {
            this.eventManager.dispatchEvent("onStyleChange", styleSheet);
        }
    }
    getStyleSheet(key) {
        return this.styleSheets[key];
    }
    getAllStyleSheets() {
        return Object.values(this.styleSheets);
    }
    removeStyleSheet(key) {
        if (this.eventManager) {
            this.eventManager.dispatchEvent("onStyleRemove", key);
        }
    }
    removeAllStyleSheets() {
        this.styleSheets = {};
    }
}
exports.StyleManager = StyleManager;
//# sourceMappingURL=styleManager.js.map