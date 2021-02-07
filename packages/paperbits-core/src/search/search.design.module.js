"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDesignModule = void 0;
const searchHandlers_1 = require("./searchHandlers");
const ko_1 = require("./ko");
const _1 = require(".");
class SearchDesignModule {
    register(injector) {
        injector.bind("search", ko_1.SearchViewModel);
        injector.bindToCollection("modelBinders", _1.SearchModelBinder);
        injector.bindToCollection("viewModelBinders", ko_1.SearchViewModelBinder);
        injector.bindToCollection("widgetHandlers", searchHandlers_1.SearchHandlers);
    }
}
exports.SearchDesignModule = SearchDesignModule;
//# sourceMappingURL=search.design.module.js.map