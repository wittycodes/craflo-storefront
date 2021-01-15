"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveChangesToolButton = void 0;
const ko = require("knockout");
class SaveChangesToolButton {
    constructor(eventManager, offlineObjectStorage, logger) {
        this.eventManager = eventManager;
        this.offlineObjectStorage = offlineObjectStorage;
        this.logger = logger;
        this.iconClass = "paperbits-icon paperbits-floppy-disk";
        this.title = "Save changes";
        this.tooltip = `<h1>Save changes</h1><p>Push your changes to the storage.</p><div class="subtle">(Ctrl+S)</div>`;
        this.disabled = ko.observable(true);
        this.eventManager.addEventListener("onDataChange", this.updateState.bind(this));
        this.updateState();
    }
    updateState() {
        return __awaiter(this, void 0, void 0, function* () {
            const hasUnsavedChanges = yield this.offlineObjectStorage.hasUnsavedChanges();
            this.disabled(!hasUnsavedChanges);
        });
    }
    onActivate() {
        this.logger.trackEvent("Click: Save changes");
        this.eventManager.dispatchEvent("onSaveChanges");
    }
}
exports.SaveChangesToolButton = SaveChangesToolButton;
//# sourceMappingURL=saveChangesToolbutton.js.map