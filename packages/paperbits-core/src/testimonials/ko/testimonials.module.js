"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialsModule = void 0;
const testimonialsModelBinder_1 = require("../testimonialsModelBinder");
const testimonialsViewModelBinder_1 = require("./testimonialsViewModelBinder");
class TestimonialsModule {
    register(injector) {
        injector.bindToCollection("modelBinders", testimonialsModelBinder_1.TestimonialsModelBinder);
        injector.bindToCollection("viewModelBinders", testimonialsViewModelBinder_1.TestimonialsViewModelBinder);
    }
}
exports.TestimonialsModule = TestimonialsModule;
//# sourceMappingURL=testimonials.module.js.map