"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewportSelector = void 0;
const ko = require("knockout");
const viewport_selector_html_1 = require("./viewport-selector.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const events_1 = require("@paperbits/common/events");
let ViewportSelector = class ViewportSelector {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.viewport = ko.observable("desktop");
        this.viewport(this.viewManager.getViewport());
    }
    setXl() {
        this.viewport("xl");
        this.viewManager.setViewport("xl");
        this.eventManager.dispatchEvent(events_1.CommonEvents.onViewportChange, "xl");
    }
    setLg() {
        this.viewport("lg");
        this.viewManager.setViewport("lg");
        this.eventManager.dispatchEvent(events_1.CommonEvents.onViewportChange, "lg");
    }
    setMd() {
        this.viewport("md");
        this.viewManager.setViewport("md");
        this.eventManager.dispatchEvent(events_1.CommonEvents.onViewportChange, "md");
    }
    setSm() {
        this.viewport("sm");
        this.viewManager.setViewport("sm");
        this.eventManager.dispatchEvent(events_1.CommonEvents.onViewportChange, "sm");
    }
    setXs() {
        this.viewport("xs");
        this.viewManager.setViewport("xs");
        this.eventManager.dispatchEvent(events_1.CommonEvents.onViewportChange, "xs");
    }
    zoomOut() {
        this.viewport("zoomout");
        this.viewManager.setViewport("zoomout");
    }
};
ViewportSelector = __decorate([
    decorators_1.Component({
        selector: "viewport-selector",
        template: viewport_selector_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], ViewportSelector);
exports.ViewportSelector = ViewportSelector;
//# sourceMappingURL=viewport-selector.js.map