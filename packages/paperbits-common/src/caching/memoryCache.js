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
exports.MemoryCache = void 0;
const Objects = require("../objects");
class MemoryCache {
    constructor() {
        this.cacheObject = {};
    }
    getKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.keys(this.cacheObject);
        });
    }
    setItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cacheObject[key] = JSON.stringify(value);
        });
    }
    getItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = this.cacheObject[key];
            if (!item) {
                return null;
            }
            return Objects.clone(item);
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
            delete this.cacheObject[key];
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cacheObject = {};
        });
    }
}
exports.MemoryCache = MemoryCache;
//# sourceMappingURL=memoryCache.js.map