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
exports.RowModelBinder = void 0;
var rowModel_1 = require("./rowModel");
var RowModelBinder = (function () {
    function RowModelBinder(modelBinderSelector) {
        this.modelBinderSelector = modelBinderSelector;
    }
    RowModelBinder.prototype.canHandleContract = function (contract) {
        return contract.type === "email-layout-row";
    };
    RowModelBinder.prototype.canHandleModel = function (model) {
        return model instanceof rowModel_1.RowModel;
    };
    RowModelBinder.prototype.contractToModel = function (contract, bindingContext) {
        return __awaiter(this, void 0, void 0, function () {
            var rowModel, modelPromises, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        rowModel = new rowModel_1.RowModel();
                        if (contract.align) {
                            if (contract.align.sm) {
                                rowModel.alignSm = contract.align.sm;
                            }
                            if (contract.align.md) {
                                rowModel.alignMd = contract.align.md;
                            }
                            if (contract.align.lg) {
                                rowModel.alignLg = contract.align.lg;
                            }
                        }
                        if (contract.justify) {
                            if (contract.justify.sm) {
                                rowModel.justifySm = contract.justify.sm;
                            }
                            if (contract.justify.md) {
                                rowModel.justifyMd = contract.justify.md;
                            }
                            if (contract.justify.lg) {
                                rowModel.justifyLg = contract.justify.lg;
                            }
                        }
                        if (!contract.nodes) {
                            contract.nodes = [];
                        }
                        modelPromises = contract.nodes.map(function (contract) { return __awaiter(_this, void 0, void 0, function () {
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
                        _a = rowModel;
                        return [4, Promise.all(modelPromises)];
                    case 1:
                        _a.widgets = _b.sent();
                        return [2, rowModel];
                }
            });
        });
    };
    RowModelBinder.prototype.modelToContract = function (rowModel) {
        var _this = this;
        var rowConfig = {
            type: "email-layout-row",
            nodes: []
        };
        rowConfig.align = {};
        rowConfig.align.sm = rowModel.alignSm;
        rowConfig.align.md = rowModel.alignMd;
        rowConfig.align.lg = rowModel.alignLg;
        rowConfig.justify = {};
        rowConfig.justify.sm = rowModel.justifySm;
        rowConfig.justify.md = rowModel.justifyMd;
        rowConfig.justify.lg = rowModel.justifyLg;
        rowModel.widgets.forEach(function (widgetModel) {
            var modelBinder = _this.modelBinderSelector.getModelBinderByModel(widgetModel);
            rowConfig.nodes.push(modelBinder.modelToContract(widgetModel));
        });
        return rowConfig;
    };
    return RowModelBinder;
}());
exports.RowModelBinder = RowModelBinder;
