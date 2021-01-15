"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarModule = void 0;
const navbarViewModel_1 = require("./navbarViewModel");
const navbarModelBinder_1 = require("../navbarModelBinder");
const navbarViewModelBinder_1 = require("./navbarViewModelBinder");
class NavbarModule {
    register(injector) {
        injector.bind("navbar", navbarViewModel_1.NavbarViewModel);
        injector.bindToCollection("modelBinders", navbarModelBinder_1.NavbarModelBinder, "navbarModelBinder");
        injector.bindToCollection("viewModelBinders", navbarViewModelBinder_1.NavbarViewModelBinder);
    }
}
exports.NavbarModule = NavbarModule;
//# sourceMappingURL=navbar.module.js.map