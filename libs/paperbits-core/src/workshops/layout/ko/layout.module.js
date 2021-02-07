"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutWorkshopModule = void 0;
const layouts_1 = require("./layouts");
const layoutDetails_1 = require("./layoutDetails");
const layoutSelector_1 = require("./layoutSelector");
const layoutsToolButton_1 = require("./layoutsToolButton");
const layoutHost_1 = require("./layoutHost");
class LayoutWorkshopModule {
    register(injector) {
        injector.bind("layoutHost", layoutHost_1.LayoutHost);
        injector.bind("layoutsWorkshop", layouts_1.LayoutsWorkshop);
        injector.bind("layoutDetails", layoutDetails_1.LayoutDetails);
        injector.bind("layoutSelector", layoutSelector_1.LayoutSelector);
        injector.bindToCollection("workshopSections", layoutsToolButton_1.LayoutsToolButton);
    }
}
exports.LayoutWorkshopModule = LayoutWorkshopModule;
//# sourceMappingURL=layout.module.js.map