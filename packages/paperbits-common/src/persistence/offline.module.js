"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineModule = void 0;
const persistence_1 = require("../persistence");
const undoToolButton_1 = require("./undoToolButton");
const redoToolButton_1 = require("./redoToolButton");
const saveChangesToolbutton_1 = require("./saveChangesToolbutton");
class OfflineModule {
    constructor(options) {
        this.options = options;
        this.register = this.register.bind(this);
    }
    register(injector) {
        var _a;
        if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.autosave)) {
            injector.bindToCollection("trayCommands", saveChangesToolbutton_1.SaveChangesToolButton);
        }
        injector.bindToCollection("trayCommands", undoToolButton_1.UndoToolButton);
        injector.bindToCollection("trayCommands", redoToolButton_1.RedoToolButton);
        injector.bindSingleton("offlineObjectStorage", persistence_1.OfflineObjectStorage);
        const underlyingObjectStorage = injector.resolve("objectStorage");
        injector.bindSingletonFactory("objectStorage", (ctx) => {
            var _a;
            const offlineObjectStorage = ctx.resolve("offlineObjectStorage");
            offlineObjectStorage.setRemoteObjectStorage(underlyingObjectStorage);
            offlineObjectStorage.autosave = !!((_a = this.options) === null || _a === void 0 ? void 0 : _a.autosave);
            return offlineObjectStorage;
        });
        injector.bindToCollection("autostart", persistence_1.SavingHandler);
        injector.bindToCollection("autostart", persistence_1.LoadingHandler);
    }
}
exports.OfflineModule = OfflineModule;
//# sourceMappingURL=offline.module.js.map