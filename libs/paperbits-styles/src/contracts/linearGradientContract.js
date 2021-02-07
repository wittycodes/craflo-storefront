"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinearGradientString = void 0;
function getLinearGradientString(contract) {
    var colorStops = contract.colorStops
        .sort(function (a, b) { return a.length - b.length; })
        .map(function (colorStop) {
        var colorStopString = colorStop.color;
        if (colorStop.length) {
            colorStopString += " " + colorStop.length + "%";
        }
        return colorStopString;
    });
    return "linear-gradient(" + contract.direction + "," + colorStops.join(",") + ")";
}
exports.getLinearGradientString = getLinearGradientString;
