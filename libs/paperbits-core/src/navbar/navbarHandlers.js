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
exports.NavbarHandlers = void 0;
const navbarModel_1 = require("./navbarModel");
class NavbarHandlers {
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "navbar",
                displayName: "Navigation bar",
                iconClass: "paperbits-menu-34",
                requires: ["html", "js"],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    return new navbarModel_1.NavbarModel();
                })
            };
            return widgetOrder;
        });
    }
}
exports.NavbarHandlers = NavbarHandlers;
//# sourceMappingURL=navbarHandlers.js.map