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
exports.SectionViewModelBinder = void 0;
var sectionViewModel_1 = require("./sectionViewModel");
var ko_1 = require("@paperbits/core/placeholder/ko");
var sectionHandlers_1 = require("../sectionHandlers");
var sectionModel_1 = require("../sectionModel");
var SectionViewModelBinder = (function () {
    function SectionViewModelBinder(viewModelBinderSelector, eventManager, styleCompiler) {
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
    }
    SectionViewModelBinder.prototype.modelToViewModel = function (model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function () {
            var viewModels, _i, _a, widgetModel, widgetViewModelBinder, widgetViewModel, _b, _c, binding;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!viewModel) {
                            viewModel = new sectionViewModel_1.SectionViewModel();
                        }
                        viewModels = [];
                        _i = 0, _a = model.widgets;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        widgetModel = _a[_i];
                        widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
                        return [4, widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext)];
                    case 2:
                        widgetViewModel = _d.sent();
                        viewModels.push(widgetViewModel);
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        if (viewModels.length === 0) {
                            viewModels.push(new ko_1.PlaceholderViewModel("Section"));
                        }
                        viewModel.widgets(viewModels);
                        viewModel.container(model.container);
                        viewModel.background(model.background);
                        viewModel.snapTo(model.snap);
                        if (!model.styles) return [3, 6];
                        _c = (_b = viewModel).styles;
                        return [4, this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager)];
                    case 5:
                        _c.apply(_b, [_d.sent()]);
                        _d.label = 6;
                    case 6:
                        binding = {
                            name: "section",
                            displayName: "Section",
                            readonly: bindingContext ? bindingContext.readonly : false,
                            model: model,
                            draggable: true,
                            editor: "email-layout-section-editor",
                            handler: sectionHandlers_1.SectionHandlers,
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
                            }); }
                        };
                        viewModel["widgetBinding"] = binding;
                        return [2, viewModel];
                }
            });
        });
    };
    SectionViewModelBinder.prototype.canHandleModel = function (model) {
        return model instanceof sectionModel_1.SectionModel;
    };
    return SectionViewModelBinder;
}());
exports.SectionViewModelBinder = SectionViewModelBinder;
