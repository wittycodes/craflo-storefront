"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewModelBinderSelector = void 0;
const placeholderViewModelBinder_1 = require("../placeholder/ko/placeholderViewModelBinder");
const placeholder_1 = require("@paperbits/common/widgets/placeholder");
class ViewModelBinderSelector {
    constructor(viewModelBinders) {
        this.viewModelBinders = viewModelBinders;
    }
    getViewModelBinderByModel(model) {
        if (model instanceof placeholder_1.PlaceholderModel) {
            return (new placeholderViewModelBinder_1.PlaceholderViewModelBinder());
        }
        const viewModelBinder = this.viewModelBinders.find(x => x && x.canHandleModel ? x.canHandleModel(model) : false);
        if (!viewModelBinder) {
            console.warn(`Could not find view model binder for model: ${model.constructor["name"] || model}`);
            return (new placeholderViewModelBinder_1.PlaceholderViewModelBinder());
        }
        return viewModelBinder;
    }
}
exports.ViewModelBinderSelector = ViewModelBinderSelector;
//# sourceMappingURL=viewModelBinderSelector.js.map