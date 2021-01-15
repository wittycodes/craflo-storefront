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
exports.TextblockHandlers = exports.nodeName = void 0;
const textblockModel_1 = require("./textblockModel");
exports.nodeName = "paperbits-text";
class TextblockHandlers {
    getWidgetOrderByConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "text-block",
                displayName: "Text block",
                iconClass: "paperbits-edit-2",
                requires: [],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    return new textblockModel_1.TextblockModel([
                        {
                            type: "heading1",
                            content: [{ type: "text", text: "Heading" }]
                        },
                        {
                            type: "paragraph",
                            content: [{ type: "text", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }]
                        }
                    ]);
                })
            };
            return widgetOrder;
        });
    }
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getWidgetOrderByConfig();
        });
    }
}
exports.TextblockHandlers = TextblockHandlers;
//# sourceMappingURL=textblockHandlers.js.map