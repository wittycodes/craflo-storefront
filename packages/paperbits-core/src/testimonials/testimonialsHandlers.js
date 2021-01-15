"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialsHandlers = void 0;
const testimonialsModel_1 = require("./testimonialsModel");
class TestimonialsHandlers {
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "testimonials",
                displayName: "Testimonials",
                iconClass: "paperbits-favourite-31",
                requires: ["html", "js"],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    const model = new testimonialsModel_1.TestimonialsModel();
                    model.starsCount = 5;
                    model.allStarsCount = 5;
                    model.author = "John Doe";
                    model.authorTitle = "CEO at Contoso";
                    model.textContent = "Testimonials text";
                    return model;
                })
            };
            return widgetOrder;
        });
    }
}
exports.TestimonialsHandlers = TestimonialsHandlers;
//# sourceMappingURL=testimonialsHandlers.js.map