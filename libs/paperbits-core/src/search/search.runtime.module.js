"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRuntimeModule = void 0;
const search_runtime_1 = require("./ko/runtime/search-runtime");
class SearchRuntimeModule {
    register(injector) {
        injector.bind("searchRuntime", search_runtime_1.SearchRuntime);
    }
}
exports.SearchRuntimeModule = SearchRuntimeModule;
//# sourceMappingURL=search.runtime.module.js.map