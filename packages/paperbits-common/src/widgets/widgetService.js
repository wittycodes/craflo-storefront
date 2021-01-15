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
exports.WidgetService = void 0;
class WidgetService {
    constructor(widgetHandlers) {
        this.widgetHandlers = widgetHandlers;
        this.getWidgetOrders = this.getWidgetOrders.bind(this);
    }
    getWidgetOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrders = new Array();
            const tasks = this.widgetHandlers.map((handler) => __awaiter(this, void 0, void 0, function* () {
                if (handler.getWidgetOrder) {
                    const order = yield handler.getWidgetOrder();
                    widgetOrders.push(order);
                }
            }));
            yield Promise.all(tasks);
            return widgetOrders;
        });
    }
    getWidgetHandler(type) {
        return this.widgetHandlers.find(x => x instanceof type);
    }
}
exports.WidgetService = WidgetService;
//# sourceMappingURL=widgetService.js.map