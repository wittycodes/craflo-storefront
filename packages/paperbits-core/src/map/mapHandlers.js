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
exports.MapHandlers = void 0;
const mapModel_1 = require("./mapModel");
class MapHandlers {
    prepareWidgetOrder(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "map",
                displayName: "Map",
                iconClass: "paperbits-m-location",
                requires: ["html", "js"],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    const model = new mapModel_1.MapModel();
                    model.location = config.location;
                    model.caption = config.caption;
                    model.location = config.location;
                    model.mapType = config.mapType;
                    return model;
                })
            };
            return widgetOrder;
        });
    }
    getWidgetOrderByConfig(location, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                type: "map",
                location: location,
                caption: caption,
                mapType: "terrain"
            };
            return yield this.prepareWidgetOrder(config);
        });
    }
    getWidgetOrder() {
        return Promise.resolve(this.getWidgetOrderByConfig("400 Broad St, Seattle, WA 98109", "Space Needle"));
    }
    getContentDescriptorFromDataTransfer(dataTransfer) {
        const mapConfig = this.parseDataTransfer(dataTransfer);
        if (!mapConfig) {
            return null;
        }
        const getThumbnailPromise = () => Promise.resolve(`https://maps.googleapis.com/maps/api/staticmap?center=${mapConfig.location}&format=jpg&size=130x90`);
        const descriptor = {
            title: "Map",
            description: mapConfig.location,
            getWidgetOrder: () => Promise.resolve(this.getWidgetOrderByConfig(mapConfig.location, mapConfig.caption)),
            getThumbnailUrl: getThumbnailPromise
        };
        return descriptor;
    }
    parseDataTransfer(dataTransfer) {
        const source = dataTransfer.source;
        if (source && typeof source === "string") {
            const url = source.toLowerCase();
            if (url.startsWith("https://www.google.com/maps/") || url.startsWith("http://www.google.com/maps/")) {
                let location;
                let match = new RegExp("/place/([^/]+)").exec(url);
                if (match && match.length > 1) {
                    location = match[1].replaceAll("+", " ");
                }
                else {
                    match = new RegExp("/@([^/]+)").exec(url);
                    if (match && match.length > 1) {
                        const locationParts = match[1].split(",");
                        location = locationParts.slice(0, 2).join(",");
                    }
                }
                return location ? { location: location, type: "map" } : null;
            }
        }
        return null;
    }
}
exports.MapHandlers = MapHandlers;
//# sourceMappingURL=mapHandlers.js.map