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
exports.HostBindingHandler = void 0;
const ko = require("knockout");
const ui_1 = require("@paperbits/common/ui");
const metaDataSetter_1 = require("@paperbits/common/meta/metaDataSetter");
class HostBindingHandler {
    constructor(globalEventHandler, viewManager, router, siteService, mediaService) {
        this.globalEventHandler = globalEventHandler;
        this.viewManager = viewManager;
        this.router = router;
        this.siteService = siteService;
        this.mediaService = mediaService;
        this.hostComponent = ko.observable();
        this.designTime = ko.observable(true);
        ko.bindingHandlers["host"] = {
            init: (element, valueAccessor) => {
                const config = valueAccessor();
                const css = ko.observable("desktop");
                config.block.subscribe(this.designTime);
                config.viewport.subscribe((viewport) => {
                    this.viewManager.mode = ui_1.ViewManagerMode.selecting;
                    switch (viewport) {
                        case "zoomout":
                            css("viewport-zoomout");
                            this.viewManager.mode = ui_1.ViewManagerMode.pause;
                            break;
                        case "xl":
                            css("viewport-xl");
                            break;
                        case "lg":
                            css("viewport-lg");
                            break;
                        case "md":
                            css("viewport-md");
                            break;
                        case "sm":
                            css("viewport-sm");
                            break;
                        case "xs":
                            css("viewport-xs");
                            break;
                        default:
                            throw new Error("Unknown viewport");
                    }
                });
                ko.applyBindingsToNode(element, { css: css }, null);
                const hostElement = this.createIFrame();
                element.appendChild(hostElement);
            },
            update: (element, valueAccessor) => {
                const config = valueAccessor();
                this.hostComponent(config.host());
            }
        };
    }
    createIFrame() {
        const hostElement = document.createElement("iframe");
        hostElement.src = "/page.html?designtime=true";
        hostElement.classList.add("host");
        hostElement.title = "Website";
        const onClick = (event) => {
            event.preventDefault();
        };
        const onPointerDown = (event) => {
            if (!event.ctrlKey && !event.metaKey && (this.viewManager.mode !== ui_1.ViewManagerMode.preview)) {
                return;
            }
            const htmlElement = event.target;
            const htmlLinkElement = htmlElement.closest("A");
            if (!htmlLinkElement) {
                return;
            }
            event.preventDefault();
            this.router.navigateTo(htmlLinkElement.href);
        };
        let hostedWindowHistory;
        const onRouteChange = (route) => {
            route.metadata.originatedByHost = true;
            hostedWindowHistory.pushState(route, route.title, route.url);
        };
        const onLoad = () => __awaiter(this, void 0, void 0, function* () {
            const contentDocument = hostElement.contentDocument;
            this.globalEventHandler.appendDocument(contentDocument);
            this.setRootElement(contentDocument.body);
            contentDocument.addEventListener("mousedown", onPointerDown, true);
            contentDocument.addEventListener("click", onClick, true);
            this.viewManager["hostDocument"] = contentDocument;
            hostedWindowHistory = hostElement.contentDocument.defaultView.window.history;
            const hostedWindowOriginalPushState = hostedWindowHistory.pushState;
            this.router.addRouteChangeListener(onRouteChange);
            const initialRoute = this.router.getCurrentRoute();
            hostedWindowHistory.pushState(initialRoute, initialRoute.title, location.href);
            hostedWindowHistory.pushState = (route, title, url) => {
                hostedWindowOriginalPushState.call(hostedWindowHistory, route, title, url);
                if (route && route.metadata.originatedByHost) {
                    return;
                }
                window.history.pushState(route, route.title, route.url);
            };
            const settings = yield this.siteService.getSettings();
            const siteSettings = settings === null || settings === void 0 ? void 0 : settings.site;
            if (!(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.faviconSourceKey)) {
                return;
            }
            const mediaContract = yield this.mediaService.getMediaByKey(siteSettings.faviconSourceKey);
            if (!mediaContract || !mediaContract.permalink) {
                return;
            }
            metaDataSetter_1.MetaDataSetter.setFavIcon(mediaContract.permalink);
        });
        const onUnload = () => {
            this.router.removeRouteChangeListener(onRouteChange);
        };
        hostElement.addEventListener("load", onLoad, false);
        hostElement.addEventListener("beforeunload", onUnload, false);
        return hostElement;
    }
    setRootElement(bodyElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const styleElement = document.createElement("style");
            bodyElement.ownerDocument.head.appendChild(styleElement);
            ko.applyBindingsToNode(bodyElement, { css: { design: this.designTime } }, null);
            ko.applyBindingsToNode(styleElement, { styleSheet: {} }, null);
            ko.applyBindingsToNode(bodyElement, { component: this.hostComponent }, null);
        });
    }
}
exports.HostBindingHandler = HostBindingHandler;
//# sourceMappingURL=bindingHandlers.host.js.map