"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggablesBindingHandler = void 0;
const ko = require("knockout");
class DraggablesBindingHandler {
    constructor(dragManager) {
        ko.bindingHandlers["dragsource"] = {
            init(element, valueAccessor) {
                const config = valueAccessor();
                dragManager.registerDragSource(element, config);
            }
        };
        ko.bindingHandlers["dragtarget"] = {
            init(element, valueAccessor) {
                const config = valueAccessor();
                dragManager.registerDragTarget(element, config);
            }
        };
    }
}
exports.DraggablesBindingHandler = DraggablesBindingHandler;
//# sourceMappingURL=bindingHandlers.draggables.js.map