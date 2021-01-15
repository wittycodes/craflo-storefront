"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorStopViewModel = exports.LinearGradientViewModel = void 0;
var ko = require("knockout");
var LinearGradientViewModel = (function () {
    function LinearGradientViewModel(gradient) {
        var _this = this;
        this.colorStops = ko.observableArray([]);
        this.direction = ko.observable();
        if (gradient) {
            this.key = gradient.key;
            this.displayName = ko.observable(gradient.displayName);
            this.direction(gradient.direction || "");
            if (gradient.colorStops) {
                gradient.colorStops.forEach(function (colorStop) {
                    _this.colorStops.push(new ColorStopViewModel(colorStop));
                });
            }
            return;
        }
        this.key = "";
        this.displayName("");
    }
    LinearGradientViewModel.prototype.toContract = function () {
        return {
            key: this.key,
            displayName: this.displayName(),
            direction: this.direction(),
            colorStops: this.colorStops().map(function (x) { return x.toContract(); })
        };
    };
    return LinearGradientViewModel;
}());
exports.LinearGradientViewModel = LinearGradientViewModel;
var ColorStopViewModel = (function () {
    function ColorStopViewModel(color) {
        this.color = ko.observable(color.color);
        this.length = ko.observable(color.length);
    }
    ColorStopViewModel.prototype.toContract = function () {
        return {
            color: this.color(),
            length: this.length()
        };
    };
    return ColorStopViewModel;
}());
exports.ColorStopViewModel = ColorStopViewModel;
