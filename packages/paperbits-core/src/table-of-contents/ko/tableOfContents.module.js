"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOfContentsModule = void 0;
const tableOfContentsModelBinder_1 = require("../tableOfContentsModelBinder");
const tableOfContentsViewModelBinder_1 = require("./tableOfContentsViewModelBinder");
class TableOfContentsModule {
    register(injector) {
        injector.bindToCollection("modelBinders", tableOfContentsModelBinder_1.TableOfContentsModelBinder, "tableOfContentsModelBinder");
        injector.bindToCollection("viewModelBinders", tableOfContentsViewModelBinder_1.TableOfContentsViewModelBinder, "tableOfContentsViewModelBinder");
    }
}
exports.TableOfContentsModule = TableOfContentsModule;
//# sourceMappingURL=tableOfContents.module.js.map