"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionModule = void 0;
var sectionViewModel_1 = require("./sectionViewModel");
var sectionModelBinder_1 = require("../sectionModelBinder");
var sectionViewModelBinder_1 = require("./sectionViewModelBinder");
var SectionModule = (function () {
    function SectionModule() {
    }
    SectionModule.prototype.register = function (injector) {
        injector.bind("emailSection", sectionViewModel_1.SectionViewModel);
        injector.bindToCollection("modelBinders", sectionModelBinder_1.SectionModelBinder);
        injector.bindToCollection("viewModelBinders", sectionViewModelBinder_1.SectionViewModelBinder);
    };
    return SectionModule;
}());
exports.SectionModule = SectionModule;
