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
exports.CarouselModelBinder = void 0;
const carouselModel_1 = require("./carouselModel");
class CarouselModelBinder {
    constructor(modelBinderSelector) {
        this.modelBinderSelector = modelBinderSelector;
    }
    canHandleContract(contract) {
        return contract.type === "carousel";
    }
    canHandleModel(model) {
        return model instanceof carouselModel_1.CarouselModel;
    }
    contractItemToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new carouselModel_1.CarouselItemModel();
            contract.nodes = contract.nodes || [];
            model.styles = contract.styles || {};
            const modelPromises = contract.nodes.map((contract) => __awaiter(this, void 0, void 0, function* () {
                const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                return yield modelBinder.contractToModel(contract, bindingContext);
            }));
            model.widgets = yield Promise.all(modelPromises);
            return model;
        });
    }
    contractToModel(contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new carouselModel_1.CarouselModel();
            contract.carouselItems = contract.carouselItems || [];
            model.styles = contract.styles || {};
            const modelPromises = contract.carouselItems.map((contract) => __awaiter(this, void 0, void 0, function* () {
                return yield this.contractItemToModel(contract, bindingContext);
            }));
            model.carouselItems = yield Promise.all(modelPromises);
            return model;
        });
    }
    itemModelToContract(carouselItemModel) {
        const carouselContract = {
            type: "carousel-item",
            styles: carouselItemModel.styles,
            nodes: []
        };
        carouselItemModel.widgets.forEach(carouselItemModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(carouselItemModel);
            carouselContract.nodes.push(modelBinder.modelToContract(carouselItemModel));
        });
        return carouselContract;
    }
    modelToContract(carouselModel) {
        const carouselContract = {
            type: "carousel",
            styles: carouselModel.styles,
            carouselItems: []
        };
        carouselModel.carouselItems.forEach(carouselItemModel => {
            carouselContract.carouselItems.push(this.itemModelToContract(carouselItemModel));
        });
        return carouselContract;
    }
}
exports.CarouselModelBinder = CarouselModelBinder;
//# sourceMappingURL=carouselModelBinder.js.map