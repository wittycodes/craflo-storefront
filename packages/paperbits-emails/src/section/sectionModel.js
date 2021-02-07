"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionModel = void 0;
var background_1 = require("@paperbits/common/widgets/background");
var SectionModel = (function () {
    function SectionModel() {
        this.container = "container";
        this.padding = "with-padding";
        this.snap = "none";
        this.background = new background_1.BackgroundModel();
        this.widgets = [];
    }
    return SectionModel;
}());
exports.SectionModel = SectionModel;
