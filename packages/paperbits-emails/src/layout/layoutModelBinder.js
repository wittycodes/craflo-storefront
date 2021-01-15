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
exports.LayoutModelBinder = void 0;
var layoutModel_1 = require("./layoutModel");
var LayoutModelBinder = (function () {
    function LayoutModelBinder(emailService, modelBinderSelector) {
        this.emailService = emailService;
        this.modelBinderSelector = modelBinderSelector;
        this.contractToModel = this.contractToModel.bind(this);
    }
    LayoutModelBinder.prototype.canHandleContract = function (contract) {
        return contract.type === "email-layout";
    };
    LayoutModelBinder.prototype.canHandleModel = function (model) {
        return model instanceof layoutModel_1.LayoutModel;
    };
    LayoutModelBinder.prototype.getLayoutModel = function (emailTemplateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var emailTemplate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.emailService.getEmailTemplateByKey(emailTemplateKey)];
                    case 1:
                        emailTemplate = _a.sent();
                        return [4, this.contractToModel(emailTemplate)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    LayoutModelBinder.prototype.contractToModel = function (emailContract, bindingContext) {
        return __awaiter(this, void 0, void 0, function () {
            var layoutModel, layoutContent, modelPromises, widgetModels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layoutModel = new layoutModel_1.LayoutModel();
                        layoutModel.key = emailContract.key;
                        layoutModel.title = emailContract.title;
                        layoutModel.description = emailContract.description;
                        return [4, this.emailService.getEmailTemplateContent(emailContract.key)];
                    case 1:
                        layoutContent = _a.sent();
                        modelPromises = layoutContent.nodes.map(function (contract) { return __awaiter(_this, void 0, void 0, function () {
                            var modelBinder;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
                                        return [4, modelBinder.contractToModel(contract, bindingContext)];
                                    case 1: return [2, _a.sent()];
                                }
                            });
                        }); });
                        return [4, Promise.all(modelPromises)];
                    case 2:
                        widgetModels = _a.sent();
                        layoutModel.widgets = widgetModels;
                        return [2, layoutModel];
                }
            });
        });
    };
    LayoutModelBinder.prototype.modelToContract = function (layoutModel) {
        var _this = this;
        var layoutConfig = {
            type: "email-layout",
            nodes: []
        };
        layoutModel.widgets.forEach(function (model) {
            var modelBinder = _this.modelBinderSelector.getModelBinderByModel(model);
            layoutConfig.nodes.push(modelBinder.modelToContract(model));
        });
        return layoutConfig;
    };
    return LayoutModelBinder;
}());
exports.LayoutModelBinder = LayoutModelBinder;
