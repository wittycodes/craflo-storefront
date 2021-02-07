"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["angle"] = {
    init: (element, valueAccessor) => {
        const config = valueAccessor();
        const angleObservable = config;
        const rect = element.getBoundingClientRect();
        const centerX = Math.floor(rect.width / 2);
        const centerY = Math.floor(rect.height / 2);
        let tracking = false;
        const determineAngle = (x, y) => {
            const dx = centerX - x;
            const dy = centerY - y;
            let theta = Math.atan2(dy, dx) * 180 / Math.PI;
            theta += -90;
            if (theta < 0) {
                theta += 360;
            }
            angleObservable(Math.floor(theta));
        };
        const onMouseDown = (event) => {
            tracking = true;
            determineAngle(event.offsetX, event.offsetY);
        };
        const onMouseUp = (event) => {
            tracking = false;
            determineAngle(event.offsetX, event.offsetY);
        };
        const onMouseMove = (event) => {
            if (!tracking) {
                return;
            }
            determineAngle(event.offsetX, event.offsetY);
        };
        element.addEventListener("mousedown", onMouseDown);
        element.addEventListener("mouseup", onMouseUp, true);
        element.addEventListener("mousemove", onMouseMove, true);
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            element.removeEventListener("mousedown", onMouseDown);
            element.removeEventListener("mouseup", onMouseUp, true);
            element.removeEventListener("mousemove", onMouseMove, true);
        });
    }
};
//# sourceMappingURL=bindingHandlers.angle.js.map