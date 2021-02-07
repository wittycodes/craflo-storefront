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
exports.MapModelBinder = void 0;
const mapModel_1 = require("./mapModel");
class MapModelBinder {
    canHandleContract(contract) {
        return contract.type === "map";
    }
    canHandleModel(model) {
        return model instanceof mapModel_1.MapModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new mapModel_1.MapModel();
            model.location = contract.location;
            model.caption = contract.caption;
            model.zoom = contract.zoom;
            model.mapType = contract.mapType;
            model.styles = contract.styles;
            return model;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "map",
            caption: model.caption,
            location: model.location,
            zoom: model.zoom,
            mapType: model.mapType,
            styles: model.styles
        };
        return contract;
    }
}
exports.MapModelBinder = MapModelBinder;
//# sourceMappingURL=mapModelBinder.js.map