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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutViewModelBinder = void 0;
var layoutViewModel_1 = require("./layoutViewModel");
var layoutModel_1 = require("../layoutModel");
var LayoutViewModelBinder = (function () {
    function LayoutViewModelBinder(viewModelBinderSelector, eventManager, emailService, modelBinderSelector, emailLayoutModelBinder) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.eventManager = eventManager;
        this.emailService = emailService;
        this.modelBinderSelector = modelBinderSelector;
        this.emailLayoutModelBinder = emailLayoutModelBinder;
        this.getLayoutViewModel = this.getLayoutViewModel.bind(this);
    }
    LayoutViewModelBinder.prototype.createBinding = function (model, viewModel, emailTemplateKey, bindingContext) {
        var _this = this;
        var savingTimeout;
        var updateContent = function () { return __awaiter(_this, void 0, void 0, function () {
            var contentContract;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentContract = {
                            type: "email-layout",
                            nodes: []
                        };
                        model.widgets.forEach(function (section) {
                            var modelBinder = _this.modelBinderSelector.getModelBinderByModel(section);
                            contentContract.nodes.push(modelBinder.modelToContract(section));
                        });
                        return [4, this.emailService.updateEmailTemplateContent(emailTemplateKey, contentContract)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        var scheduleUpdate = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                clearTimeout(savingTimeout);
                savingTimeout = setTimeout(updateContent, 600);
                return [2];
            });
        }); };
        var binding = {
            name: "email-layout",
            displayName: "Layout",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: false,
            applyChanges: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.modelToViewModel(model, viewModel, bindingContext)];
                        case 1:
                            _a.sent();
                            this.eventManager.dispatchEvent("onContentUpdate");
                            return [2];
                    }
                });
            }); },
            onCreate: function () {
                _this.eventManager.addEventListener("onContentUpdate", scheduleUpdate);
            },
        };
        viewModel["widgetBinding"] = binding;
    };
    LayoutViewModelBinder.prototype.modelToViewModel = function (model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function () {
            var viewModels, _i, _a, widgetModel, widgetViewModelBinder, widgetViewModel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!viewModel) {
                            viewModel = new layoutViewModel_1.LayoutViewModel();
                        }
                        viewModels = [];
                        _i = 0, _a = model.widgets;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        widgetModel = _a[_i];
                        widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                        return [4, widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext)];
                    case 2:
                        widgetViewModel = _b.sent();
                        viewModels.push(widgetViewModel);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        viewModel.widgets(viewModels);
                        return [2, viewModel];
                }
            });
        });
    };
    LayoutViewModelBinder.prototype.canHandleModel = function (model) {
        return model instanceof layoutModel_1.LayoutModel;
    };
    LayoutViewModelBinder.prototype.getLayoutViewModel = function (emailTemplateKey, bindingContext) {
        return __awaiter(this, void 0, void 0, function () {
            var emailTemplateContract, layoutModel, layoutViewModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.emailService.getEmailTemplateByKey(emailTemplateKey)];
                    case 1:
                        emailTemplateContract = _a.sent();
                        return [4, this.emailLayoutModelBinder.contractToModel(emailTemplateContract, bindingContext)];
                    case 2:
                        layoutModel = _a.sent();
                        return [4, this.modelToViewModel(layoutModel, null, bindingContext)];
                    case 3:
                        layoutViewModel = _a.sent();
                        if (!layoutViewModel["widgetBinding"]) {
                            this.createBinding(layoutModel, layoutViewModel, emailTemplateKey, bindingContext);
                        }
                        return [2, layoutViewModel];
                }
            });
        });
    };
    return LayoutViewModelBinder;
}());
exports.LayoutViewModelBinder = LayoutViewModelBinder;
