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
exports.TableOfContentsViewModelBinder = void 0;
const tableOfContentsViewModel_1 = require("./tableOfContentsViewModel");
const tableOfContentsModel_1 = require("../tableOfContentsModel");
class TableOfContentsViewModelBinder {
    constructor(eventManager, tableOfContentsModelBinder) {
        this.eventManager = eventManager;
        this.tableOfContentsModelBinder = tableOfContentsModelBinder;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new tableOfContentsViewModel_1.TableOfContentsViewModel();
            }
            viewModel.nodes(model.items);
            viewModel["widgetBinding"] = {
                displayName: "Table of contents",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                flow: "block",
                applyChanges: (updatedModel) => __awaiter(this, void 0, void 0, function* () {
                    const contract = {
                        type: "table-of-contents",
                        navigationItemKey: updatedModel.navigationItemKey
                    };
                    model = yield this.tableOfContentsModelBinder.contractToModel(contract, bindingContext);
                    this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof tableOfContentsModel_1.TableOfContentsModel;
    }
}
exports.TableOfContentsViewModelBinder = TableOfContentsViewModelBinder;
//# sourceMappingURL=tableOfContentsViewModelBinder.js.map