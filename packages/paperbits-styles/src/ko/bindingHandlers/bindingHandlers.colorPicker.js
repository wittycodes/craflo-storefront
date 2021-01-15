"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var Pickr = require("@simonwep/pickr");
ko.bindingHandlers["colorPicker"] = {
    init: function (element, valueAccessor) {
        var config = valueAccessor();
        var pickr = Pickr.create({
            el: element,
            theme: "classic",
            container: element.parentElement,
            default: config.selectedColor(),
            defaultRepresentation: "HEX",
            showAlways: true,
            useAsButton: false,
            inline: true,
            components: {
                preview: true,
                opacity: true,
                hue: true,
                interaction: {
                    hex: false,
                    rgba: false,
                    hsva: false,
                    input: true,
                    clear: false,
                    save: false
                }
            }
        });
        pickr.on("change", function (color) {
            if (config.selectedColor) {
                config.selectedColor(color.toRGBA().toString());
            }
        });
    }
};
