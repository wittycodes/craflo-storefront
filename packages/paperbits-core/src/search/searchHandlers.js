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
exports.SearchHandlers = void 0;
const searchModel_1 = require("./searchModel");
class SearchHandlers {
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "search",
                displayName: "Search website",
                iconClass: "paperbits-cheque-3",
                requires: ["html", "js"],
                createModel: () => __awaiter(this, void 0, void 0, function* () { return new searchModel_1.SearchModel(); })
            };
            return widgetOrder;
        });
    }
}
exports.SearchHandlers = SearchHandlers;
//# sourceMappingURL=searchHandlers.js.map