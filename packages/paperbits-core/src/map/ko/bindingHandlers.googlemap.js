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
exports.GooglmapsBindingHandler = void 0;
const ko = require("knockout");
const google_maps_1 = require("google-maps");
class GooglmapsBindingHandler {
    constructor() {
        const attach = this.attach.bind(this);
        ko.bindingHandlers["googlemap"] = {
            init(element, valueAccessor) {
                const configuration = valueAccessor();
                attach(element, ko.unwrap(configuration));
            }
        };
    }
    attach(element, configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {};
            const loader = new google_maps_1.Loader(configuration.apiKey(), options);
            const google = yield loader.load();
            const geocoder = new google.maps.Geocoder();
            const mapOptions = {};
            const map = new google.maps.Map(element, mapOptions);
            map.setOptions({
                streetViewControl: false,
                mapTypeControl: false,
                scaleControl: true,
                rotateControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true,
                draggable: false,
                disableDefaultUI: true,
                mapTypeId: ko.unwrap(configuration.mapType),
                zoom: parseInt(ko.unwrap(configuration.zoom) || 17)
            });
            const marker = new google.maps.Marker();
            marker.setMap(map);
            const setLocation = (location) => {
                const request = {};
                const coordinates = new RegExp("(-?\\d+\(?:.\\d+)?),(-?\\d+\(?:.\\d+)?)").exec(location);
                if (coordinates) {
                    request.location = {
                        lat: coordinates[1] * 1,
                        lng: coordinates[2] * 1,
                    };
                }
                else {
                    request.address = location;
                }
                geocoder.geocode(request, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        marker.setPosition(results[0].geometry.location);
                        map.setCenter(results[0].geometry.location);
                    }
                });
            };
            const infowindow = new google.maps.InfoWindow();
            const setCaption = (caption) => {
                infowindow.setContent(caption);
                if (caption && caption.length > 0) {
                    infowindow.open(map, marker);
                }
                else {
                    infowindow.close();
                }
            };
            setLocation(configuration.location());
            setCaption(configuration.caption());
        });
    }
}
exports.GooglmapsBindingHandler = GooglmapsBindingHandler;
//# sourceMappingURL=bindingHandlers.googlemap.js.map