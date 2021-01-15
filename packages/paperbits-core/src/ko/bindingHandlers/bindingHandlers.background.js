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
exports.BackgroundBindingHandler = void 0;
const ko = require("knockout");
ko.bindingHandlers["style"] = {
    update(element, valueAccessor) {
        const value = ko.utils.unwrapObservable(valueAccessor() || {});
        ko.utils.objectForEach(value, function (styleName, styleValue) {
            styleValue = ko.utils.unwrapObservable(styleValue);
            if (styleValue === null || styleValue === undefined || styleValue === false) {
                styleValue = "";
            }
            element.style.setProperty(styleName, styleValue);
        });
    }
};
class BackgroundBindingHandler {
    constructor(styleService) {
        ko.bindingHandlers["background"] = {
            init(element, valueAccessor) {
                const configuration = valueAccessor();
                const styleObservable = ko.observable();
                const setBackground = (backgroundModel) => __awaiter(this, void 0, void 0, function* () {
                    if (backgroundModel.sourceUrl) {
                        styleObservable({
                            "background-image": `url("${ko.unwrap(backgroundModel.sourceUrl)}")`,
                            "background-repeat": "no-repeat",
                            "background-size": "cover",
                            "background-position": "center",
                            "background-color": backgroundModel.color
                        });
                    }
                    else if (backgroundModel.color) {
                        styleObservable({
                            "background-color": backgroundModel.color
                        });
                    }
                    else {
                        styleObservable({
                            "background-image": null,
                            "background-repeat": null,
                            "background-size": null,
                            "background-position": null,
                            "background-color": null
                        });
                    }
                });
                ko.applyBindingsToNode(element, { style: styleObservable }, null);
                if (ko.isObservable(configuration)) {
                    configuration.subscribe((newConfiguration) => {
                        if (!newConfiguration) {
                            setBackground({});
                        }
                        else {
                            setBackground(ko.unwrap(newConfiguration));
                        }
                    });
                }
                let initialConfiguration = ko.unwrap(configuration);
                if (!initialConfiguration) {
                    initialConfiguration = {};
                }
                setBackground(initialConfiguration);
            }
        };
    }
}
exports.BackgroundBindingHandler = BackgroundBindingHandler;
//# sourceMappingURL=bindingHandlers.background.js.map