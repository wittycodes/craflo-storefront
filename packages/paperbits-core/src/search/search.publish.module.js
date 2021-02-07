"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPublishModule = void 0;
const searchViewModel_1 = require("./ko/searchViewModel");
const searchModelBinder_1 = require("./searchModelBinder");
const searchViewModelBinder_1 = require("./ko/searchViewModelBinder");
class SearchPublishModule {
    register(injector) {
        injector.bind("widget", searchViewModel_1.SearchViewModel);
        injector.bindToCollection("modelBinders", searchModelBinder_1.SearchModelBinder);
        injector.bindToCollection("viewModelBinders", searchViewModelBinder_1.SearchViewModelBinder);
    }
}
exports.SearchPublishModule = SearchPublishModule;
//# sourceMappingURL=search.publish.module.js.map