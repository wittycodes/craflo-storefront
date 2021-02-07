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
exports.ColumnViewModelBinder = void 0;
const Utils = require("@paperbits/common/utils");
const columnViewModel_1 = require("./columnViewModel");
const columnModel_1 = require("../columnModel");
const placeholderViewModel_1 = require("../../placeholder/ko/placeholderViewModel");
const columnHandlers_1 = require("../columnHandlers");
class ColumnViewModelBinder {
    constructor(viewModelBinderSelector, eventManager) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.eventManager = eventManager;
    }
    toTitleCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    getAlignmentClass(styles, alignmentString, targetBreakpoint) {
        if (!alignmentString) {
            return;
        }
        const alignment = alignmentString.split(" ");
        const vertical = alignment[0];
        const horizontal = alignment[1];
        const x = styles["alignX"] || {};
        const y = styles["alignY"] || {};
        x[targetBreakpoint] = `utils/content/alignHorizontally${this.toTitleCase(horizontal)}`;
        y[targetBreakpoint] = `utils/content/alignVertically${this.toTitleCase(vertical)}`;
        styles["alignX"] = x;
        styles["alignY"] = y;
    }
    modelToViewModel(model, columnViewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!columnViewModel) {
                columnViewModel = new columnViewModel_1.ColumnViewModel();
            }
            const viewModels = [];
            for (const widgetModel of model.widgets) {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                const widgetViewModel = yield widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);
                viewModels.push(widgetViewModel);
            }
            if (viewModels.length === 0) {
                viewModels.push(new placeholderViewModel_1.PlaceholderViewModel("Column"));
            }
            const styles = {};
            columnViewModel.widgets(viewModels);
            if (model.size) {
                model.size = Utils.optimizeBreakpoints(model.size);
                columnViewModel.sizeXs(model.size.xs);
                columnViewModel.sizeSm(model.size.sm);
                columnViewModel.sizeMd(model.size.md);
                columnViewModel.sizeLg(model.size.lg);
                columnViewModel.sizeXl(model.size.xl);
            }
            if (model.alignment) {
                model.alignment = Utils.optimizeBreakpoints(model.alignment);
                columnViewModel.alignmentXs(model.alignment.xs);
                columnViewModel.alignmentSm(model.alignment.sm);
                columnViewModel.alignmentMd(model.alignment.md);
                columnViewModel.alignmentLg(model.alignment.lg);
                columnViewModel.alignmentXl(model.alignment.xl);
            }
            if (model.alignment) {
                model.alignment = Utils.optimizeBreakpoints(model.alignment);
                columnViewModel.alignmentXs(model.alignment.xs);
                columnViewModel.alignmentSm(model.alignment.sm);
                columnViewModel.alignmentMd(model.alignment.md);
                columnViewModel.alignmentLg(model.alignment.lg);
                columnViewModel.alignmentXl(model.alignment.xl);
            }
            if (model.offset) {
                model.offset = Utils.optimizeBreakpoints(model.offset);
                columnViewModel.offsetXs(model.offset.xs);
                columnViewModel.offsetSm(model.offset.sm);
                columnViewModel.offsetMd(model.offset.md);
                columnViewModel.offsetLg(model.offset.lg);
                columnViewModel.offsetXl(model.offset.xl);
            }
            if (model.order) {
                model.order = Utils.optimizeBreakpoints(model.order);
                columnViewModel.orderXs(model.order.xs);
                columnViewModel.orderSm(model.order.sm);
                columnViewModel.orderMd(model.order.md);
                columnViewModel.orderLg(model.order.lg);
                columnViewModel.orderXl(model.order.xl);
            }
            columnViewModel.overflowX(model.overflowX);
            columnViewModel.overflowY(model.overflowY);
            const binding = {
                name: "column",
                displayName: "Column",
                readonly: bindingContext ? bindingContext.readonly : false,
                flow: "inline",
                model: model,
                draggable: false,
                editor: "layout-column-editor",
                handler: columnHandlers_1.ColumnHandlers,
                applyChanges: (changes) => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, columnViewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            columnViewModel["widgetBinding"] = binding;
            return columnViewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof columnModel_1.ColumnModel;
    }
}
exports.ColumnViewModelBinder = ColumnViewModelBinder;
//# sourceMappingURL=columnViewModelBinder.js.map