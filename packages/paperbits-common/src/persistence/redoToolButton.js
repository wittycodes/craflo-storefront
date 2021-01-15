"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedoToolButton = void 0;
const ko = require("knockout");
class RedoToolButton {
    constructor(eventManager, offlineObjectStorage) {
        this.eventManager = eventManager;
        this.offlineObjectStorage = offlineObjectStorage;
        this.iconClass = "paperbits-icon paperbits-redo-26";
        this.title = "Redo";
        this.tooltip = `<h1>Redo</h1><p>Redo last undone action.</p><div class="subtle">(Ctrl+Y)</div>`;
        this.disabled = ko.observable(true);
        this.eventManager.addEventListener("onDataChange", this.onDataChange.bind(this));
    }
    onDataChange() {
        this.disabled(!this.offlineObjectStorage.canRedo());
    }
    onActivate() {
        this.eventManager.dispatchEvent("onRedo");
    }
}
exports.RedoToolButton = RedoToolButton;
//# sourceMappingURL=redoToolButton.js.map