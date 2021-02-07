"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndoToolButton = void 0;
const ko = require("knockout");
class UndoToolButton {
    constructor(eventManager, offlineObjectStorage) {
        this.eventManager = eventManager;
        this.offlineObjectStorage = offlineObjectStorage;
        this.iconClass = "paperbits-icon paperbits-undo-25";
        this.title = "Undo";
        this.tooltip = `<h1>Undo</h1><p>Undo last action.</p><div class="subtle">(Ctrl+Z)</div>`;
        this.disabled = ko.observable(true);
        this.eventManager.addEventListener("onDataChange", this.onDataChange.bind(this));
    }
    onDataChange() {
        this.disabled(!this.offlineObjectStorage.canUndo());
    }
    onActivate() {
        this.eventManager.dispatchEvent("onUndo");
    }
}
exports.UndoToolButton = UndoToolButton;
//# sourceMappingURL=undoToolButton.js.map