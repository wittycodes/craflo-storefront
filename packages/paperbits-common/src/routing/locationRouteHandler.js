"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRouteHandler = void 0;
class LocationRouteHandler {
    constructor(router) {
        this.router = router;
        window.addEventListener("popstate", this.onPopState.bind(this));
        router.addRouteChangeListener(this.onRouteChange);
    }
    onPopState(event) {
        const url = location.pathname + location.hash;
        this.router.navigateTo(url);
    }
    onRouteChange(route) {
        const locationHash = location.hash.slice(1);
        if (route.path !== location.pathname || route.hash !== locationHash) {
            location.assign(route.url);
        }
    }
}
exports.LocationRouteHandler = LocationRouteHandler;
//# sourceMappingURL=locationRouteHandler.js.map