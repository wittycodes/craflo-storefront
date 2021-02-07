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
exports.BalloonBindingHandler = exports.BalloonActivationOptions = void 0;
const ko = require("knockout");
const keyboard_1 = require("@paperbits/common/keyboard");
var BalloonActivationOptions;
(function (BalloonActivationOptions) {
    BalloonActivationOptions["click"] = "click";
    BalloonActivationOptions["hoverOrFocus"] = "hoverOrFocus";
})(BalloonActivationOptions = exports.BalloonActivationOptions || (exports.BalloonActivationOptions = {}));
class BalloonBindingHandler {
    constructor(viewStack) {
        ko.bindingHandlers["balloon"] = {
            init: (toggleElement, valueAccessor) => {
                const options = ko.unwrap(valueAccessor());
                const activateOn = options.activateOn || BalloonActivationOptions.click;
                let inBalloon = false;
                let isHoverOver = false;
                let view;
                let balloonElement;
                let balloonTipElement;
                let balloonIsOpen = false;
                let closeTimeout;
                let createBalloonElement;
                if (options.component) {
                    createBalloonElement = () => {
                        balloonElement = document.createElement("div");
                        balloonElement.classList.add("balloon");
                        ko.applyBindingsToNode(balloonElement, { component: options.component }, null);
                        document.body.appendChild(balloonElement);
                    };
                }
                if (options.template) {
                    createBalloonElement = () => {
                        balloonElement = document.createElement("div");
                        balloonElement.classList.add("balloon");
                        ko.applyBindingsToNode(balloonElement, { template: options.template }, null);
                        document.body.appendChild(balloonElement);
                    };
                }
                const createBalloonTip = () => {
                    balloonTipElement = document.createElement("div");
                    balloonTipElement.classList.add("balloon-tip");
                    document.body.appendChild(balloonTipElement);
                };
                const removeBalloon = () => {
                    if (!balloonElement) {
                        return;
                    }
                    delete toggleElement["activeBalloon"];
                    ko.cleanNode(balloonElement);
                    balloonElement.remove();
                    balloonElement = null;
                    balloonTipElement.remove();
                    balloonTipElement = null;
                    viewStack.removeView(view);
                };
                const resetCloseTimeout = () => {
                    if (options.closeTimeout) {
                        clearTimeout(closeTimeout);
                        closeTimeout = setTimeout(close, options.closeTimeout);
                    }
                };
                const updatePosition = () => __awaiter(this, void 0, void 0, function* () {
                    if (!balloonElement || !balloonElement) {
                        return;
                    }
                    const preferredPosition = options.position;
                    const preferredDirection = preferredPosition === "left" || preferredPosition === "right"
                        ? "horizontal"
                        : "vertical";
                    const triggerRect = toggleElement.getBoundingClientRect();
                    const balloonRect = balloonElement.getBoundingClientRect();
                    const spaceTop = triggerRect.top;
                    const spaceBottom = window.innerHeight - triggerRect.bottom;
                    const spaceLeft = triggerRect.left;
                    const spaceRight = window.innerWidth - triggerRect.height;
                    const balloonTipSize = 10;
                    const egdeGap = 10;
                    const padding = 10;
                    let balloonLeft;
                    let balloonRight;
                    let balloonTop;
                    let balloonBottom;
                    let selectedPosition;
                    let positionX;
                    let positionY;
                    let availableSpaceX;
                    let availableSpaceY;
                    let balloonHeight = balloonRect.height;
                    let balloonWidth = balloonRect.width;
                    let balloonTipX;
                    let balloonTipY;
                    if (preferredDirection === "vertical") {
                        if (spaceTop > spaceBottom) {
                            positionY = "top";
                            availableSpaceY = spaceTop - egdeGap - padding;
                        }
                        else {
                            positionY = "bottom";
                            availableSpaceY = spaceBottom - egdeGap - padding;
                        }
                    }
                    else {
                        if (spaceLeft > spaceRight) {
                            positionX = "left";
                            availableSpaceX = spaceLeft - egdeGap;
                        }
                        else {
                            positionX = "right";
                            availableSpaceX = spaceRight - egdeGap;
                        }
                    }
                    if (balloonRect.height > availableSpaceY) {
                        balloonHeight = availableSpaceY;
                    }
                    if (balloonRect.width > availableSpaceX) {
                        balloonWidth = availableSpaceX;
                    }
                    switch (positionY) {
                        case "top":
                            balloonTop = triggerRect.top;
                            if ((balloonTop - balloonHeight) < 0) {
                                positionY = "bottom";
                            }
                            break;
                        case "bottom":
                            balloonTop = triggerRect.top + triggerRect.height;
                            if (balloonTop + balloonHeight > window.innerHeight) {
                                positionY = "top";
                            }
                            break;
                    }
                    switch (positionX) {
                        case "left":
                            balloonLeft = triggerRect.left;
                            if ((balloonLeft - balloonWidth) < 0) {
                                positionX = "right";
                            }
                            break;
                        case "right":
                            balloonLeft = triggerRect.left + triggerRect.width;
                            if (balloonLeft + balloonWidth > window.innerWidth) {
                                positionX = "left";
                            }
                            break;
                    }
                    balloonTipElement.classList.remove("balloon-top");
                    balloonTipElement.classList.remove("balloon-bottom");
                    balloonTipElement.classList.remove("balloon-left");
                    balloonTipElement.classList.remove("balloon-right");
                    if (preferredDirection === "vertical") {
                        switch (positionY) {
                            case "top":
                                balloonTop = triggerRect.top - balloonHeight - padding;
                                balloonLeft = triggerRect.left + Math.floor(triggerRect.width / 2) - Math.floor(balloonWidth / 2);
                                balloonTipX = triggerRect.left + Math.floor(triggerRect.width / 2) - Math.floor(balloonTipSize / 2);
                                balloonTipY = triggerRect.top - Math.floor(balloonTipSize / 2) - padding;
                                balloonTipElement.classList.add("balloon-top");
                                selectedPosition = "top";
                                break;
                            case "bottom":
                                balloonTop = triggerRect.top + triggerRect.height + padding;
                                balloonLeft = triggerRect.left + Math.floor(triggerRect.width / 2) - Math.floor(balloonWidth / 2);
                                balloonTipX = triggerRect.left + Math.floor(triggerRect.width / 2) - Math.floor(balloonTipSize / 2);
                                balloonTipY = triggerRect.bottom - Math.floor(balloonTipSize / 2) + padding;
                                balloonTipElement.classList.add("balloon-bottom");
                                selectedPosition = "bottom";
                                break;
                        }
                    }
                    else {
                        switch (positionX) {
                            case "left":
                                balloonTop = triggerRect.top + Math.floor(triggerRect.height / 2) - Math.floor(balloonHeight / 2);
                                balloonLeft = triggerRect.left - balloonWidth - padding;
                                balloonTipX = triggerRect.left - Math.floor(balloonTipSize / 2) - padding;
                                balloonTipY = triggerRect.top + Math.floor(triggerRect.height / 2) - Math.floor(balloonTipSize / 2);
                                balloonTipElement.classList.add("balloon-left");
                                selectedPosition = "left";
                                break;
                            case "right":
                                balloonTop = triggerRect.top + Math.floor(triggerRect.height / 2) - Math.floor(balloonHeight / 2);
                                balloonLeft = triggerRect.right + padding;
                                balloonTipX = triggerRect.right - Math.floor(balloonTipSize / 2) + padding;
                                balloonTipY = triggerRect.top + Math.floor(triggerRect.height / 2) - Math.floor(balloonTipSize / 2);
                                balloonTipElement.classList.add("balloon-right");
                                selectedPosition = "right";
                                break;
                        }
                    }
                    if (balloonTop < egdeGap) {
                        balloonTop = egdeGap;
                    }
                    if (balloonTop + balloonHeight > innerHeight - egdeGap) {
                        balloonBottom = egdeGap;
                    }
                    else {
                        balloonBottom = innerHeight - (balloonTop + balloonHeight);
                    }
                    if (balloonLeft < egdeGap) {
                        balloonLeft = egdeGap;
                    }
                    delete balloonElement.style.top;
                    delete balloonElement.style.bottom;
                    delete balloonElement.style.left;
                    delete balloonElement.style.right;
                    switch (selectedPosition) {
                        case "top":
                            balloonElement.style.bottom = `${balloonBottom}px`;
                            balloonElement.style.left = `${balloonLeft}px`;
                            break;
                        case "bottom":
                            balloonElement.style.top = `${balloonTop}px`;
                            balloonElement.style.left = `${balloonLeft}px`;
                            break;
                        case "left":
                            balloonElement.style.top = `${balloonTop}px`;
                            balloonElement.style.height = `${balloonHeight}px`;
                            balloonElement.style.left = `${balloonLeft}px`;
                            break;
                        case "right":
                            balloonElement.style.top = `${balloonTop}px`;
                            balloonElement.style.height = `${balloonHeight}px`;
                            balloonElement.style.left = `${balloonLeft}px`;
                            break;
                    }
                    balloonElement.style.maxHeight = availableSpaceY + "px";
                    balloonElement.style.maxWidth = availableSpaceX + "px";
                    balloonTipElement.style.top = `${balloonTipY}px`;
                    balloonTipElement.style.left = `${balloonTipX}px`;
                });
                const open = (returnFocusTo) => {
                    resetCloseTimeout();
                    if (balloonIsOpen) {
                        return;
                    }
                    const existingBalloonHandle = toggleElement["activeBalloon"];
                    if (existingBalloonHandle) {
                        if (activateOn === BalloonActivationOptions.hoverOrFocus) {
                            return;
                        }
                        else {
                            existingBalloonHandle.close();
                        }
                    }
                    setImmediate(() => {
                        const activeBalloonHandle = toggleElement["activeBalloon"];
                        if (activeBalloonHandle) {
                            if (activateOn === BalloonActivationOptions.hoverOrFocus) {
                                return;
                            }
                            else {
                                activeBalloonHandle.close();
                            }
                        }
                        createBalloonElement();
                        createBalloonTip();
                        view = {
                            close: close,
                            element: balloonElement,
                            returnFocusTo: returnFocusTo,
                            hitTest: (targetElement) => {
                                const element = closest(targetElement, x => x === balloonElement) ||
                                    closest(targetElement, x => x === toggleElement);
                                return !!element;
                            }
                        };
                        viewStack.runHitTest(toggleElement);
                        viewStack.pushView(view);
                        toggleElement["activeBalloon"] = ballonHandle;
                        balloonElement.classList.add("balloon-is-active");
                        requestAnimationFrame(updatePosition);
                        balloonIsOpen = true;
                        if (options.onOpen) {
                            options.onOpen();
                        }
                        if (activateOn === BalloonActivationOptions.hoverOrFocus) {
                            balloonElement.addEventListener("mouseenter", () => {
                                inBalloon = true;
                            });
                            balloonElement.addEventListener("mouseleave", () => {
                                inBalloon = false;
                                checkCloseHoverBalloon();
                            });
                        }
                    });
                };
                const close = () => {
                    if (!balloonElement) {
                        return;
                    }
                    balloonIsOpen = false;
                    if (options.onClose) {
                        options.onClose();
                    }
                    removeBalloon();
                    if (options.isOpen && options.isOpen()) {
                        options.isOpen(false);
                    }
                };
                const toggle = () => {
                    resetCloseTimeout();
                    if (balloonIsOpen) {
                        if (!options.closeTimeout) {
                            close();
                        }
                    }
                    else {
                        open(toggleElement);
                    }
                };
                const ballonHandle = {
                    open: open,
                    close: close,
                    toggle: toggle,
                    updatePosition: () => requestAnimationFrame(updatePosition),
                    activateOn: activateOn
                };
                if (options.onCreated) {
                    options.onCreated(ballonHandle);
                }
                const closest = (node, predicate) => {
                    do {
                        if (predicate(node)) {
                            return node;
                        }
                        node = node.parentNode;
                    } while (node);
                };
                const onPointerDown = (event) => __awaiter(this, void 0, void 0, function* () {
                    if (!toggleElement) {
                        return;
                    }
                    const targetElement = event.target;
                    const element = closest(targetElement, (node) => node === toggleElement);
                    if (!element) {
                        return;
                    }
                    toggle();
                });
                const onFocus = () => __awaiter(this, void 0, void 0, function* () {
                    open();
                });
                const onBlur = () => __awaiter(this, void 0, void 0, function* () {
                    close();
                });
                const onMouseEnter = (event) => __awaiter(this, void 0, void 0, function* () {
                    isHoverOver = true;
                    setTimeout(() => {
                        if (!isHoverOver) {
                            return;
                        }
                        open();
                    }, options.delay || 0);
                });
                const onMouseLeave = (event) => __awaiter(this, void 0, void 0, function* () {
                    isHoverOver = false;
                    checkCloseHoverBalloon();
                });
                const checkCloseHoverBalloon = () => __awaiter(this, void 0, void 0, function* () {
                    setTimeout(() => {
                        if (!isHoverOver && !inBalloon) {
                            close();
                        }
                    }, 50);
                });
                const onKeyDown = (event) => __awaiter(this, void 0, void 0, function* () {
                    switch (event.keyCode) {
                        case keyboard_1.Keys.Enter:
                        case keyboard_1.Keys.Space:
                            event.preventDefault();
                            toggle();
                            break;
                    }
                });
                const onClick = (event) => {
                    event.preventDefault();
                };
                const onScroll = (event) => __awaiter(this, void 0, void 0, function* () {
                    if (!balloonElement) {
                        return;
                    }
                    requestAnimationFrame(updatePosition);
                });
                if (options.closeOn) {
                    options.closeOn.subscribe(() => close());
                }
                toggleElement.addEventListener("click", onClick);
                window.addEventListener("scroll", onScroll, true);
                document.addEventListener("mousedown", onPointerDown, true);
                switch (activateOn) {
                    case BalloonActivationOptions.click:
                        toggleElement.addEventListener("keydown", onKeyDown);
                        break;
                    case BalloonActivationOptions.hoverOrFocus:
                        toggleElement.addEventListener("mouseenter", onMouseEnter);
                        toggleElement.addEventListener("mouseleave", onMouseLeave);
                        break;
                    default:
                        throw new Error(`Unknown balloon trigger event: ${activateOn}`);
                }
                ko.utils.domNodeDisposal.addDisposeCallback(toggleElement, () => {
                    window.removeEventListener("mousedown", onPointerDown, true);
                    toggleElement.removeEventListener("click", onClick);
                    switch (activateOn) {
                        case BalloonActivationOptions.click:
                            toggleElement.removeEventListener("keydown", onKeyDown);
                            break;
                        case BalloonActivationOptions.hoverOrFocus:
                            toggleElement.removeEventListener("mouseenter", onMouseEnter);
                            toggleElement.removeEventListener("mouseleave", onMouseLeave);
                            toggleElement.removeEventListener("focus", onFocus);
                            toggleElement.removeEventListener("blur", onBlur);
                            break;
                        default:
                            throw new Error(`Unknown balloon trigger event: ${activateOn}`);
                    }
                    removeBalloon();
                    window.removeEventListener("scroll", onScroll, true);
                });
            }
        };
    }
}
exports.BalloonBindingHandler = BalloonBindingHandler;
//# sourceMappingURL=bindingHandlers.balloon.js.map