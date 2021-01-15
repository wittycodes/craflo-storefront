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
exports.TableOfContentsHandlers = void 0;
const tableOfContentsModel_1 = require("./tableOfContentsModel");
class TableOfContentsHandlers {
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "table-of-contents",
                displayName: "Table of contents",
                iconClass: "paperbits-cheque-3",
                requires: ["html", "js"],
                createModel: () => __awaiter(this, void 0, void 0, function* () { return new tableOfContentsModel_1.TableOfContentsModel(); })
            };
            return widgetOrder;
        });
    }
}
exports.TableOfContentsHandlers = TableOfContentsHandlers;
//# sourceMappingURL=tableOfContentsHandlers.js.map