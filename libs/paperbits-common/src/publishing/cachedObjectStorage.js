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
exports.CacheObjectStorage = void 0;
const caching_1 = require("../caching");
class CacheObjectStorage {
    constructor(underlyingStorage) {
        this.underlyingStorage = underlyingStorage;
        this.cache = new caching_1.LruCache(100);
    }
    searchObjects(key, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.underlyingStorage.searchObjects(key, query);
        });
    }
    getObject(key) {
        const cachedItemPromise = this.cache.getItem(key);
        if (cachedItemPromise) {
            return cachedItemPromise;
        }
        const fetchPromise = this.underlyingStorage.getObject(key);
        this.cache.setItem(key, fetchPromise);
        return fetchPromise;
    }
    addObject(key, dataObject) {
        throw new Error("Not supported.");
    }
    deleteObject(key) {
        throw new Error("Not supported.");
    }
    updateObject(key, dataObject) {
        throw new Error("Not supported.");
    }
}
exports.CacheObjectStorage = CacheObjectStorage;
//# sourceMappingURL=cachedObjectStorage.js.map