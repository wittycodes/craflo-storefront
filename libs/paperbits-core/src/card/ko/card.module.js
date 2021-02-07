"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardModule = void 0;
const cardViewModel_1 = require("./cardViewModel");
const cardModelBinder_1 = require("../cardModelBinder");
const cardViewModelBinder_1 = require("./cardViewModelBinder");
class CardModule {
    register(injector) {
        injector.bind("card", cardViewModel_1.CardViewModel);
        injector.bindToCollection("modelBinders", cardModelBinder_1.CardModelBinder);
        injector.bindToCollection("viewModelBinders", cardViewModelBinder_1.CardViewModelBinder);
    }
}
exports.CardModule = CardModule;
//# sourceMappingURL=card.module.js.map