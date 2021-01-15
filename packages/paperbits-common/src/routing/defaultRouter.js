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
exports.DefaultRouter = void 0;
const _1 = require(".");
class DefaultRouter {
    constructor(routeGuards, eventManager) {
        this.routeGuards = routeGuards;
        this.eventManager = eventManager;
        this.notifyListeners = true;
        this.currentRoute = this.getRouteFromLocation();
    }
    getRouteFromLocation() {
        const path = location.pathname;
        const hash = location.hash.startsWith("#") ? location.hash.slice(1) : null;
        const url = path + (hash ? `#${hash}` : "");
        const route = {
            url: url,
            path: path,
            hash: hash,
            metadata: {},
            previous: null
        };
        return route;
    }
    addRouteChangeListener(eventHandler) {
        this.eventManager.addEventListener(_1.RouterEvents.onRouteChange, eventHandler);
    }
    removeRouteChangeListener(eventHandler) {
        this.eventManager.removeEventListener(_1.RouterEvents.onRouteChange, eventHandler);
    }
    addHistoryUpdateListener(eventHandler) {
        this.eventManager.addEventListener(_1.RouterEvents.onHistoryUpdate, eventHandler);
    }
    removeHistoryUpdateListener(eventHandler) {
        this.eventManager.removeEventListener(_1.RouterEvents.onHistoryUpdate, eventHandler);
    }
    navigateTo(url, title = null, metadata = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const route = this.getRoute(url, title, metadata);
            if (!route) {
                return;
            }
            const canActivate = yield this.canActivate(route);
            if (canActivate) {
                this.currentRoute = route;
                if (this.notifyListeners) {
                    this.scheduleNotification(route);
                }
            }
        });
    }
    scheduleNotification(route) {
        clearTimeout(this.notificationTimeout);
        this.notificationTimeout = setTimeout(() => {
            this.eventManager.dispatchEvent(_1.RouterEvents.onRouteChange, route);
        }, 100);
    }
    updateHistory(url, title) {
        const route = this.getRoute(url, title);
        if (!route) {
            return;
        }
        if (this.notifyListeners) {
            this.eventManager.dispatchEvent(_1.RouterEvents.onHistoryUpdate, route);
        }
    }
    getRoute(url, title = null, metadata = {}) {
        if (!url) {
            return undefined;
        }
        const isFullUrl = url && (url.startsWith("http://") || url.startsWith("https://"));
        const isLocalUrl = url.startsWith(location.origin);
        if (isFullUrl && !isLocalUrl) {
            window.open(url, "_blank");
            return;
        }
        url = isFullUrl
            ? url.substring(location.origin.length)
            : url;
        const parts = url.split("#");
        const route = {
            url: url,
            path: parts.length > 1 ? parts[0] || location.pathname : parts[0],
            title: title,
            metadata: metadata,
            hash: parts.length > 1 ? parts[1] : "",
            previous: this.currentRoute
        };
        return route;
    }
    canActivate(route) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const routeGuard of this.routeGuards) {
                try {
                    const canActivate = yield routeGuard.canActivate(route);
                    if (!canActivate) {
                        return false;
                    }
                }
                catch (error) {
                    throw new Error(`Unable to invoke route a guard: ${error.stack || error.message}`);
                    return false;
                }
            }
            return true;
        });
    }
    getCurrentUrl() {
        let permalink = this.currentRoute.path;
        const hash = this.getHash();
        if (this.currentRoute.hash) {
            permalink += "#" + hash;
        }
        return permalink;
    }
    getCurrentUrlMetadata() {
        return this.currentRoute.metadata;
    }
    getPath() {
        return this.currentRoute.path;
    }
    getHash() {
        return this.currentRoute.hash;
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
}
exports.DefaultRouter = DefaultRouter;
//# sourceMappingURL=defaultRouter.js.map