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
exports.SavingHandler = void 0;
class SavingHandler {
    constructor(eventManager, offlineObjectStorage, viewManager) {
        eventManager.addEventListener("onSaveChanges", () => __awaiter(this, void 0, void 0, function* () {
            const hasChanges = yield offlineObjectStorage.hasUnsavedChanges();
            if (!hasChanges) {
                return;
            }
            yield offlineObjectStorage.saveChanges();
            viewManager.notifySuccess("Changes saved", "All changes saved successfully.");
        }));
    }
}
exports.SavingHandler = SavingHandler;
//# sourceMappingURL=savingHandler.js.map