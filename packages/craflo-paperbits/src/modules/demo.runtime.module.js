"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoRuntimeModule = void 0;
require("@paperbits/core/ko/bindingHandlers/bindingHandlers.component");
const events_1 = require("@paperbits/common/events");
const routing_1 = require("@paperbits/common/routing");
const user_1 = require("@paperbits/common/user");
const http_1 = require("@paperbits/common/http");
const knockout_loaders_1 = require("@paperbits/core/ko/knockout.loaders");
const staticUserService_1 = require("../user/staticUserService");
const staticRoleService_1 = require("../user/staticRoleService");
const runtime_1 = require("../components/click-counter/ko/runtime");
class DemoRuntimeModule {
    register(injector) {
        injector.bindModule(new knockout_loaders_1.KnockoutRegistrationLoaders());
        injector.bindModule(new runtime_1.ClickCounterRuntimeModule());
        injector.bindSingleton("eventManager", events_1.DefaultEventManager);
        injector.bindCollection("autostart");
        injector.bindCollection("routeGuards");
        injector.bindSingleton("router", routing_1.DefaultRouter);
        injector.bind("httpClient", http_1.XmlHttpRequestClient);
        injector.bindToCollection("autostart", user_1.VisibilityGuard);
        injector.bindSingleton("userService", staticUserService_1.StaticUserService);
        injector.bindSingleton("roleService", staticRoleService_1.StaticRoleService);
        injector.bindToCollection("autostart", location.href.includes("designtime=true")
            ? routing_1.HistoryRouteHandler
            : routing_1.LocationRouteHandler);
    }
}
exports.DemoRuntimeModule = DemoRuntimeModule;
