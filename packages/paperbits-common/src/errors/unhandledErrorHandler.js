"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnhandledErrorHandler = void 0;
class UnhandledErrorHandler {
    constructor(eventManager, viewManager, logger) {
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.logger = logger;
        this.eventManager.addEventListener("onError", this.handlerError.bind(this));
        this.eventManager.addEventListener("onUnhandledRejection", this.handlerPromiseRejection.bind(this));
    }
    handlerError(event) {
        try {
            if (!(event === null || event === void 0 ? void 0 : event.error)) {
                let message;
                if (event.target) {
                    message = `Unparsable error for element: ${event.target.toString()}`;
                    if (navigator.sendBeacon && event.target["src"]) {
                        navigator.sendBeacon(event.target["src"]);
                    }
                }
                else {
                    message = `Unparsable error thrown.`;
                }
                this.logger.trackError(new Error(message));
                return;
            }
            this.viewManager.notifyError("Oops, something went wrong.", "We are unable to complete your operation this time. Please try again later.");
            this.logger.trackError(event.error.stack || event.error);
        }
        catch (error) {
            console.error(`Unable to log error. ${error.stack || error.message}`);
        }
    }
    handlerPromiseRejection(event) {
        try {
            if (!(event === null || event === void 0 ? void 0 : event.reason)) {
                const message = event.target
                    ? `Unhandled rejection for target: ${event.target.toString()}`
                    : `Unhandled rejection.`;
                this.logger.trackError(new Error(message));
                return;
            }
            this.viewManager.notifyError("Oops, something went wrong.", "We are unable to complete your operation this time. Please try again later.");
            this.logger.trackError(new Error(`Unhandled rejection: ${event.reason.stack || event.reason}`));
        }
        catch (error) {
            console.error(`Unable to log error. ${error.stack || error.message}`);
        }
    }
}
exports.UnhandledErrorHandler = UnhandledErrorHandler;
//# sourceMappingURL=unhandledErrorHandler.js.map