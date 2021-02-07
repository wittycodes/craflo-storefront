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
exports.LocalStorageCache = void 0;
class LocalStorageCache {
    constructor(settingsProvider) {
        this.settingsProvider = settingsProvider;
    }
    initialize() {
        if (this.initializePromise) {
            return this.initializePromise;
        }
        this.initializePromise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            this.containerId = (yield this.settingsProvider.getSetting("cacheContainerId")) || "default";
            resolve();
        }));
        return this.initializePromise;
    }
    getKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            return Object.keys(localStorage);
        });
    }
    setItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            localStorage.setItem(`${this.containerId}/${key}`, JSON.stringify(value));
        });
    }
    getItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            return JSON.parse(localStorage.getItem(`${this.containerId}/${key}`));
        });
    }
    estimateSize(object) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            const list = [];
            const stack = [object];
            let bytes = 0;
            while (stack.length) {
                const value = stack.pop();
                if (!value) {
                    continue;
                }
                if (typeof value === "boolean") {
                    bytes += 4;
                }
                else if (typeof value === "string") {
                    bytes += value.length * 2;
                }
                else if (typeof value === "number") {
                    bytes += 8;
                }
                else if (typeof value === "object" &&
                    list.indexOf(value) === -1) {
                    list.push(value);
                    for (const i in value) {
                        if (value.hasOwnProperty(i)) {
                            stack.push(value[i]);
                        }
                    }
                }
            }
            return bytes;
        });
    }
    getOccupiedSpace() {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    getRemainingSpace() {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    addChangeListener(callback) {
    }
    removeItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            localStorage.removeItem(`${this.containerId}/${key}`);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.clear();
        });
    }
}
exports.LocalStorageCache = LocalStorageCache;
//# sourceMappingURL=localStorageCache.js.map