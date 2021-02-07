"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
const bindingHandlers_balloon_1 = require("./bindingHandlers.balloon");
const defaultTooltipDelayMs = 700;
ko.bindingHandlers["tooltip"] = {
    init: (triggerElement, valueAccessor) => {
        const options = valueAccessor();
        if (!options) {
            return;
        }
        let tooltipMessage;
        let tooltipPosition = "top";
        let tooltipDelayMs;
        let balloonHandle;
        if (typeof options === "string" || ko.isObservable(options)) {
            tooltipMessage = options;
        }
        else {
            tooltipMessage = options.message;
            tooltipPosition = options.position || "top";
            tooltipDelayMs = options.delay;
        }
        if (!tooltipMessage) {
            return;
        }
        const isOpen = ko.observable();
        const textParams = {};
        let closeTimeout = 0;
        if (ko.isObservable(tooltipMessage)) {
            textParams.observableText = tooltipMessage;
            closeTimeout = 5000;
            tooltipMessage.subscribe(() => {
                if (balloonHandle) {
                    balloonHandle.updatePosition();
                }
            });
        }
        else {
            textParams.text = tooltipMessage;
        }
        ko.applyBindingsToNode(triggerElement, {
            balloon: {
                component: {
                    name: "tooltip",
                    params: textParams
                },
                position: tooltipPosition,
                delay: tooltipDelayMs || defaultTooltipDelayMs,
                isOpen: isOpen,
                activateOn: bindingHandlers_balloon_1.BalloonActivationOptions.hoverOrFocus,
                closeTimeout: closeTimeout,
                onCreated: (handle) => {
                    balloonHandle = handle;
                }
            }
        }, null);
    }
};
//# sourceMappingURL=bindingHandlers.tooltip.js.map