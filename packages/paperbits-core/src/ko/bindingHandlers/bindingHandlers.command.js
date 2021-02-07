"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["command"] = {
    init(element, valueAccessor) {
        const contextCommand = valueAccessor();
        const bindings = {
            background: {
                color: contextCommand.color
            },
            attr: {
                title: contextCommand.tooltip
            }
        };
        if (contextCommand.component) {
            bindings["balloon"] = {
                component: contextCommand.component,
            };
        }
        else if (contextCommand.callback) {
            bindings["click"] = contextCommand.callback;
        }
        ko.applyBindingsToNode(element, bindings, null);
    }
};
//# sourceMappingURL=bindingHandlers.command.js.map