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
exports.NavigationViewModelBinder = void 0;
const navigation_1 = require("@paperbits/common/navigation");
const _1 = require(".");
class NavigationViewModelBinder {
    modelToViewModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!model) {
                throw new Error(`Parameter "model" not specified.`);
            }
            const viewModel = new _1.NavigationItemViewModel(model);
            viewModel.key = model.key;
            viewModel.label(model.label);
            viewModel.targetKey(model.targetKey);
            viewModel.targetUrl(model.targetUrl);
            if (model.nodes) {
                const tasks = [];
                model.nodes.forEach(child => tasks.push(this.modelToViewModel(child)));
                const childViewModels = yield Promise.all(tasks);
                childViewModels.forEach(childViewModel => {
                    viewModel.nodes.push(childViewModel);
                    childViewModel.parent = viewModel;
                });
            }
            return viewModel;
        });
    }
    viewModelToModel(viewModel) {
        const model = {
            key: viewModel.key,
            label: viewModel.label(),
            targetKey: viewModel.targetKey(),
            targetUrl: viewModel.targetUrl(),
            targetWindow: viewModel.targetWindow(),
            nodes: viewModel.nodes().map(x => this.viewModelToModel(x))
        };
        return model;
    }
    canHandleModel(model) {
        return model instanceof navigation_1.NavigationItemModel;
    }
}
exports.NavigationViewModelBinder = NavigationViewModelBinder;
//# sourceMappingURL=navigationViewModelBinder.js.map