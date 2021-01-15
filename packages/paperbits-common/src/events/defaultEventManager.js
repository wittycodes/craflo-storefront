"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventManager = void 0;
require("../extensions");
class DefaultEventManager {
    constructor() {
        this.eventListeners = [];
    }
    addEventListener(eventName, eventHandler) {
        const exists = this.eventListeners.some(listener => listener.eventName === eventName &&
            listener.eventHandler === eventHandler);
        if (!exists) {
            this.eventListeners.push({ eventName: eventName, eventHandler: eventHandler });
        }
    }
    removeEventListener(eventName, eventHandler) {
        const listener = this.eventListeners.find(listener => listener.eventName === eventName &&
            listener.eventHandler === eventHandler);
        if (listener) {
            this.eventListeners.remove(listener);
        }
    }
    dispatchEvent(eventName, args) {
        this.eventListeners
            .filter(listener => listener.eventName === eventName)
            .forEach(x => x.eventHandler(args));
    }
}
exports.DefaultEventManager = DefaultEventManager;
//# sourceMappingURL=defaultEventManager.js.map