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
const ko = require("knockout");
ko.bindingHandlers["stickTo"] = {
    init(element, valueAccessor) {
        const config = valueAccessor();
        const updatePosition = () => {
            if (!config.target) {
                return;
            }
            const parent = config.target.ownerDocument.defaultView.frameElement;
            const parentRect = parent.getBoundingClientRect();
            const rect = config.target.getBoundingClientRect();
            const placement = config.placement || "border";
            let coordX;
            let coordY;
            element.style.right = null;
            element.style.left = null;
            coordX = rect.left + Math.floor((rect.width) / 2) - Math.floor(element.clientWidth / 2);
            coordY = rect.top + Math.floor((rect.height) / 2) - Math.floor(element.clientHeight / 2);
            if (config.position.indexOf("top") >= 0) {
                coordY = rect.top;
                if (placement === "border") {
                    coordY = coordY - Math.floor(element.clientHeight / 2);
                }
            }
            if (config.position.indexOf("bottom") >= 0) {
                coordY = rect.top + rect.height - element.clientHeight;
                if (placement === "border") {
                    coordY = coordY + Math.floor(element.clientHeight / 2);
                }
            }
            if (config.position.indexOf("left") >= 0) {
                element.style.left = parentRect.left + rect.left + 10 + "px";
            }
            else if (config.position.indexOf("right") >= 0) {
                element.style.right = parentRect.right - rect.right + 10 + "px";
            }
            else {
                element.style.left = parentRect.left + coordX + "px";
            }
            element.style.top = parentRect.top + coordY + "px";
        };
        updatePosition();
        const onScroll = (event) => __awaiter(this, void 0, void 0, function* () {
            requestAnimationFrame(updatePosition);
        });
        window.addEventListener("scroll", onScroll, true);
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            window.removeEventListener("scroll", onScroll, true);
        });
    }
};
//# sourceMappingURL=bindingHandlers.stickTo.js.map