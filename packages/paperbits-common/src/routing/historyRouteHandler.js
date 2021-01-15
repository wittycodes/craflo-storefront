"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRouteHandler = void 0;
class HistoryRouteHandler {
    constructor(router) {
        this.router = router;
        this.internalPushState = history.pushState;
        history.pushState = this.externalPushState.bind(this);
        this.onRouteChange = this.onRouteChange.bind(this);
        router.addRouteChangeListener(this.onRouteChange);
        router.addHistoryUpdateListener(this.onRouteChange);
        window.addEventListener("popstate", this.onPopState.bind(this));
    }
    onPopState(event) {
        const url = location.pathname + location.hash;
        this.router.navigateTo(url);
    }
    externalPushState(route) {
        this.router.navigateTo(route.url);
    }
    onRouteChange(route) {
        this.internalPushState.call(history, route, route.title, route.url);
    }
}
exports.HistoryRouteHandler = HistoryRouteHandler;
//# sourceMappingURL=historyRouteHandler.js.map