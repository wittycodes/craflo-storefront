"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheStorageModule = void 0;
const cachedObjectStorage_1 = require("./cachedObjectStorage");
class CacheStorageModule {
    register(injector) {
        const underlyingObjectStorage = injector.resolve("objectStorage");
        injector.bindSingletonFactory("objectStorage", (ctx) => {
            return new cachedObjectStorage_1.CacheObjectStorage(underlyingObjectStorage);
        });
    }
}
exports.CacheStorageModule = CacheStorageModule;
//# sourceMappingURL=cacheStorageModule.js.map