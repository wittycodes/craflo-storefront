"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionModule = void 0;
const sectionViewModel_1 = require("./sectionViewModel");
const sectionModelBinder_1 = require("../sectionModelBinder");
const sectionViewModelBinder_1 = require("./sectionViewModelBinder");
class SectionModule {
    register(injector) {
        injector.bind("section", sectionViewModel_1.SectionViewModel);
        injector.bindToCollection("modelBinders", sectionModelBinder_1.SectionModelBinder, "sectionModelBinder");
        injector.bindToCollection("viewModelBinders", sectionViewModelBinder_1.SectionViewModelBinder);
    }
}
exports.SectionModule = SectionModule;
//# sourceMappingURL=section.module.js.map