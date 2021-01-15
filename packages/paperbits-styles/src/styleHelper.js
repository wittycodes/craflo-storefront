"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleHelper = void 0;
var breakpoints_1 = require("@paperbits/common/styles/breakpoints");
var Objects = require("@paperbits/common/objects");
var Utils = require("@paperbits/common/utils");
var StyleHelper = (function () {
    function StyleHelper() {
    }
    StyleHelper.isResponsive = function (variation) {
        if (!variation) {
            throw new Error("Parameter \"variation\" not specified.");
        }
        return Object.keys(variation).some(function (props) { return Object.keys(breakpoints_1.BreakpointValues).includes(props); });
    };
    StyleHelper.getPluginConfigForLocalStyles = function (localStyles, pluginName, viewport) {
        if (viewport === void 0) { viewport = "xs"; }
        if (!localStyles) {
            throw new Error("Parameter \"localStyles\" not specified.");
        }
        if (!pluginName) {
            throw new Error("Parameter \"pluginName\" not specified.");
        }
        if (!localStyles.instance) {
            return null;
        }
        var pluginConfig = localStyles.instance[pluginName];
        if (!pluginConfig) {
            return null;
        }
        var isResponsive = this.isResponsive(pluginConfig);
        if (isResponsive) {
            var breakpoint = viewport;
            return pluginConfig[breakpoint];
        }
        else {
            return pluginConfig;
        }
    };
    StyleHelper.setPluginConfigForLocalStyles = function (localStyles, pluginName, pluginConfig, viewport) {
        if (!localStyles) {
            throw new Error("Parameter \"localStyles\" not specified.");
        }
        if (!pluginName) {
            throw new Error("Parameter \"pluginName\" not specified.");
        }
        var instance = localStyles.instance || {};
        var plugin = instance[pluginName] || {};
        if (viewport) {
            plugin[viewport] = pluginConfig;
        }
        else {
            plugin = pluginConfig;
        }
        instance[pluginName] = plugin;
        localStyles.instance = instance;
        if (!instance.key) {
            instance.key = Utils.randomClassName();
        }
        Objects.cleanupObject(localStyles, true, true);
    };
    StyleHelper.getPluginConfig = function (pluginBag, pluginName, viewport) {
        if (viewport === void 0) { viewport = "xs"; }
        if (!pluginBag) {
            throw new Error("Parameter \"pluginBag\" not specified.");
        }
        if (!pluginName) {
            throw new Error("Parameter \"pluginName\" not specified.");
        }
        var pluginConfig = pluginBag[pluginName];
        if (!pluginConfig) {
            return null;
        }
        var isResponsive = this.isResponsive(pluginConfig);
        if (isResponsive) {
            var breakpoint = viewport;
            return pluginConfig[breakpoint];
        }
        else {
            return pluginConfig;
        }
    };
    StyleHelper.setPluginConfig = function (pluginBag, pluginName, pluginConfig, viewport) {
        if (!pluginBag) {
            throw new Error("Parameter \"pluginBag\" not specified.");
        }
        if (!pluginName) {
            throw new Error("Parameter \"pluginName\" not specified.");
        }
        var plugin = pluginBag[pluginName] || {};
        if (viewport) {
            plugin[viewport] = pluginConfig;
        }
        else {
            plugin = pluginConfig;
        }
        pluginBag[pluginName] = plugin;
        if (!pluginBag.key) {
            pluginBag.key = Utils.randomClassName();
        }
        Objects.cleanupObject(pluginBag, true, true);
    };
    StyleHelper.optimizeProperty = function (pluginBag, property) {
        if (!StyleHelper.isResponsive(pluginBag[property])) {
            return;
        }
        var result = Utils.optimizeBreakpoints(pluginBag[property]);
        pluginBag[property] = result;
    };
    StyleHelper.optimizePluginConfig = function (pluginConfig) {
        if (!StyleHelper.isResponsive(pluginConfig)) {
            return;
        }
        var breakpoints = ["xs", "sm", "md", "lg", "xl"];
        var lastValues = {};
        for (var _i = 0, breakpoints_2 = breakpoints; _i < breakpoints_2.length; _i++) {
            var breakpoint = breakpoints_2[_i];
            var pluginBag = pluginConfig[breakpoint];
            if (!pluginBag) {
                continue;
            }
            var properties = Object.keys(pluginBag);
            for (var _a = 0, properties_1 = properties; _a < properties_1.length; _a++) {
                var property = properties_1[_a];
                if (lastValues[property] === pluginBag[property]) {
                    delete pluginBag[property];
                }
                else {
                    lastValues[property] = pluginBag[property];
                }
            }
            if (Object.keys(pluginBag).length === 0) {
                delete pluginConfig[breakpoint];
            }
        }
    };
    return StyleHelper;
}());
exports.StyleHelper = StyleHelper;
