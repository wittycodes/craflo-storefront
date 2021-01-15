"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["gridCommand"] = {
    init(element, valueAccessor) {
        const command = valueAccessor();
        if (!command) {
            return;
        }
        const bindings = {
            background: { color: command.color },
            attr: { title: command.tooltip }
        };
        if (command.component) {
            bindings["balloon"] = { target: "#sc-" + command.component.name, position: "top" };
        }
        if (command.callback) {
            bindings["click"] = command.callback;
        }
        ko.applyBindingsToNode(element, bindings, null);
    }
};
//# sourceMappingURL=bindingHandlers.gridCommand.js.map