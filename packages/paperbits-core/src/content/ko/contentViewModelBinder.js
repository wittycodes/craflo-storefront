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
exports.ContentViewModelBinder = void 0;
const Objects = require("@paperbits/common/objects");
const contentViewModel_1 = require("./contentViewModel");
const contentModel_1 = require("../contentModel");
const contentHandlers_1 = require("../contentHandlers");
class ContentViewModelBinder {
    constructor(viewModelBinderSelector, contentModelBinder, modelBinderSelector, eventManager) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.contentModelBinder = contentModelBinder;
        this.modelBinderSelector = modelBinderSelector;
        this.eventManager = eventManager;
    }
    createBinding(model, viewModel, bindingContext) {
        let savingTimeout;
        const updateContent = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const contentContract = {
                type: model.type,
                nodes: []
            };
            model.widgets.forEach(section => {
                const modelBinder = this.modelBinderSelector.getModelBinderByModel(section);
                contentContract.nodes.push(modelBinder.modelToContract(section));
            });
            const onValueUpdate = (_b = (_a = bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.template) === null || _a === void 0 ? void 0 : _a[contentContract.type]) === null || _b === void 0 ? void 0 : _b.onValueUpdate;
            if (onValueUpdate) {
                onValueUpdate(contentContract);
            }
        });
        const scheduleUpdate = () => __awaiter(this, void 0, void 0, function* () {
            clearTimeout(savingTimeout);
            savingTimeout = setTimeout(updateContent, 600);
        });
        const isReadonly = model.type !== (bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.routeKind);
        const binding = {
            displayName: "Content",
            readonly: false,
            name: "content",
            model: model,
            flow: "block",
            draggable: true,
            handler: contentHandlers_1.ContentHandlers,
            applyChanges: () => __awaiter(this, void 0, void 0, function* () { return yield this.modelToViewModel(model, viewModel, bindingContext); }),
            onCreate: () => {
                if (model.type === (bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.routeKind)) {
                    this.eventManager.addEventListener("onContentUpdate", scheduleUpdate);
                }
            },
            onDispose: () => {
                if (model.type === (bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.routeKind)) {
                    this.eventManager.removeEventListener("onContentUpdate", scheduleUpdate);
                }
            }
        };
        viewModel["widgetBinding"] = binding;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new contentViewModel_1.ContentViewModel();
            }
            let childBindingContext = {};
            if (bindingContext) {
                childBindingContext = Objects.clone(bindingContext);
                childBindingContext.readonly = model.type !== (bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.routeKind);
                childBindingContext.template = bindingContext.template;
                childBindingContext.styleManager = bindingContext.styleManager;
            }
            const viewModels = [];
            for (const widgetModel of model.widgets) {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                const widgetViewModel = yield widgetViewModelBinder.modelToViewModel(widgetModel, null, childBindingContext);
                viewModels.push(widgetViewModel);
            }
            if (!viewModel["widgetBinding"]) {
                this.createBinding(model, viewModel, bindingContext);
            }
            viewModel.widgets(viewModels);
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof contentModel_1.ContentModel;
    }
    getContentViewModelByKey(contentContract, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const layoutModel = yield this.contentModelBinder.contractToModel(contentContract, bindingContext);
            const layoutViewModel = yield this.modelToViewModel(layoutModel, null, bindingContext);
            layoutViewModel["widgetBinding"].readonly = true;
            return layoutViewModel;
        });
    }
}
exports.ContentViewModelBinder = ContentViewModelBinder;
//# sourceMappingURL=contentViewModelBinder.js.map