"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialsEditorModule = void 0;
const testimonialsEditor_1 = require("./testimonialsEditor");
const testimonialsHandlers_1 = require("../testimonialsHandlers");
class TestimonialsEditorModule {
    register(injector) {
        injector.bind("testimonialsEditor", testimonialsEditor_1.TestimonialsEditor);
        injector.bindToCollection("widgetHandlers", testimonialsHandlers_1.TestimonialsHandlers, "testimonialsHandler");
    }
}
exports.TestimonialsEditorModule = TestimonialsEditorModule;
//# sourceMappingURL=testimonialsEditor.module.js.map