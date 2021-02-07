"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationWorkshopModule = void 0;
const navigation_1 = require("./navigation");
const navigationDetails_1 = require("./navigationDetails");
const navigationItemSelector_1 = require("./navigationItemSelector");
const navigationToolButton_1 = require("./navigationToolButton");
const navigationModelBinder_1 = require("../navigationModelBinder");
const navigationViewModelBinder_1 = require("./navigationViewModelBinder");
class NavigationWorkshopModule {
    register(injector) {
        injector.bind("navigationWorkshop", navigation_1.NavigationWorkshop);
        injector.bind("navigationDetailsWorkshop", navigationDetails_1.NavigationDetailsWorkshop);
        injector.bind("navigationItemSelector", navigationItemSelector_1.NavigationItemSelector);
        injector.bindToCollection("workshopSections", navigationToolButton_1.NavigationToolButton);
        injector.bindToCollection("modelBinders", navigationModelBinder_1.NavigationModelBinder, "navigationModelBinder");
        injector.bindToCollection("viewModelBinders", navigationViewModelBinder_1.NavigationViewModelBinder, "navigationViewModelBinder");
    }
}
exports.NavigationWorkshopModule = NavigationWorkshopModule;
//# sourceMappingURL=navigation.module.js.map