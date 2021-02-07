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
exports.StyleEditor = void 0;
var ko = require("knockout");
var styleEditor_html_1 = require("./styleEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var styleHelper_1 = require("../../styleHelper");
var StyleEditor = (function () {
    function StyleEditor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.styleName = ko.observable("New style");
        this.selectedState = ko.observable();
        this.elementStates = ko.observableArray();
        this.elementStyleTypography = ko.observable();
        this.elementStyleTransform = ko.observable();
        this.elementStyleTransition = ko.observable();
        this.elementStyleBackground = ko.observable();
        this.elementStyleShadow = ko.observable();
        this.elementStyleAnimation = ko.observable();
        this.elementStyleBox = ko.observable();
        this.elementStyleSize = ko.observable();
        this.allowBlockStyles = ko.observable();
        this.working = ko.observable(true);
    }
    StyleEditor.prototype.initialize = function () {
        this.styleName(this.elementStyle.displayName);
        this.allowBlockStyles(!this.elementStyle.key.startsWith("globals/body"));
        this.updateObservables();
        var states = this.elementStyle.allowedStates;
        this.elementStates(states);
        if (states && states.length > 0) {
            this.selectedState.subscribe(this.onStateSelected);
        }
        this.styleName.subscribe(this.onStyleNameUpdate);
        this.eventManager.addEventListener("onViewportChange", this.updateObservables);
    };
    StyleEditor.prototype.scheduleUpdate = function () {
        var _this = this;
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(function () { return _this.onUpdate(_this.elementStyle); }, 500);
    };
    StyleEditor.prototype.updateObservables = function () {
        this.working(true);
        var style = this.getStyleForSelectedState();
        this.elementStyleTypography(style.typography);
        this.elementStyleTransform(style.transform);
        this.elementStyleTransition(style.transition);
        this.elementStyleBackground(style.background);
        this.elementStyleShadow(style.shadow);
        this.elementStyleAnimation(style.animation);
        this.elementStyleBox(style);
        this.elementStyleSize(style.size);
        this.working(false);
    };
    StyleEditor.prototype.onStateSelected = function (state) {
        this.currentState = state;
        this.updateObservables();
    };
    StyleEditor.prototype.getStyleForSelectedState = function () {
        var style;
        if (!this.currentState) {
            style = this.elementStyle;
        }
        else if (this.elementStyle.states) {
            if (!this.elementStyle.states[this.currentState]) {
                this.elementStyle.states[this.currentState] = {};
            }
            style = this.elementStyle.states[this.currentState];
        }
        else {
            style = {};
            this.elementStyle.states = {};
            this.elementStyle.states[this.currentState] = style;
        }
        return style;
    };
    StyleEditor.prototype.onStyleNameUpdate = function (name) {
        this.elementStyle["displayName"] = name;
        this.scheduleUpdate();
    };
    StyleEditor.prototype.onBackgroundUpdate = function (pluginConfig) {
        var style = this.getStyleForSelectedState();
        styleHelper_1.StyleHelper.setPluginConfig(style, "background", pluginConfig, null);
        this.scheduleUpdate();
    };
    StyleEditor.prototype.onShadowUpdate = function (pluginConfig) {
        var style = this.getStyleForSelectedState();
        styleHelper_1.StyleHelper.setPluginConfig(style, "shadow", pluginConfig, null);
        this.scheduleUpdate();
    };
    StyleEditor.prototype.onAnimationUpdate = function (pluginConfig) {
        var style = this.getStyleForSelectedState();
        styleHelper_1.StyleHelper.setPluginConfig(style, "animation", pluginConfig, null);
        this.scheduleUpdate();
    };
    StyleEditor.prototype.onBoxUpdate = function (pluginConfig) {
        var style = this.getStyleForSelectedState();
        Object.assign(style, pluginConfig);
        this.scheduleUpdate();
    };
    StyleEditor.prototype.onSizeUpdate = function (pluginConfig) {
        var style = this.getStyleForSelectedState();
        styleHelper_1.StyleHelper.setPluginConfig(style, "size", pluginConfig, null);
        this.scheduleUpdate();
    };
    StyleEditor.prototype.onTypographyUpdate = function (pluginConfig) {
        var style = this.getStyleForSelectedState();
        styleHelper_1.StyleHelper.setPluginConfig(style, "typography", pluginConfig, null);
        this.scheduleUpdate();
    };
    StyleEditor.prototype.onTransformUpdate = function (pluginConfig) {
        var style = this.getStyleForSelectedState();
        styleHelper_1.StyleHelper.setPluginConfig(style, "transform", pluginConfig, null);
        this.scheduleUpdate();
    };
    StyleEditor.prototype.onTransitionUpdate = function (pluginConfig) {
        var style = this.getStyleForSelectedState();
        styleHelper_1.StyleHelper.setPluginConfig(style, "transition", pluginConfig, null);
        this.scheduleUpdate();
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Object)
    ], StyleEditor.prototype, "elementStyle", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], StyleEditor.prototype, "onUpdate", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StyleEditor.prototype, "initialize", null);
    StyleEditor = __decorate([
        decorators_1.Component({
            selector: "style-editor",
            template: styleEditor_html_1.default
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], StyleEditor);
    return StyleEditor;
}());
exports.StyleEditor = StyleEditor;
