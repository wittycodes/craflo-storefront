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
exports.StylePreviewBindingHandler = void 0;
var ko = require("knockout");
var jssCompiler_1 = require("../../jssCompiler");
var StylePreviewBindingHandler = (function () {
    function StylePreviewBindingHandler(styleCompiler, styleService) {
        var _this = this;
        this.styleCompiler = styleCompiler;
        this.styleService = styleService;
        ko.bindingHandlers["stylePreview"] = {
            update: function (element, valueAccessor) { return __awaiter(_this, void 0, void 0, function () {
                var config, styleConfig, classNames, cssObservable, styleModel, styleElement, compiler, css;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            config = ko.unwrap(valueAccessor());
                            if (!(typeof config === "string")) return [3, 2];
                            return [4, this.styleService.getStyleByKey(config)];
                        case 1:
                            styleConfig = _a.sent();
                            return [3, 3];
                        case 2:
                            styleConfig = config;
                            _a.label = 3;
                        case 3:
                            if (!styleConfig) {
                                return [2];
                            }
                            cssObservable = ko.observable();
                            if (!(typeof styleConfig === "string" || styleConfig instanceof String)) return [3, 5];
                            return [4, this.styleCompiler.getClassNameByStyleKeyAsync(styleConfig)];
                        case 4:
                            classNames = _a.sent();
                            return [3, 9];
                        case 5:
                            if (!styleConfig.key) return [3, 7];
                            return [4, this.styleCompiler.getClassNameByStyleKeyAsync(styleConfig.key)];
                        case 6:
                            classNames = _a.sent();
                            return [3, 9];
                        case 7: return [4, this.styleCompiler.getStyleModelAsync(styleConfig)];
                        case 8:
                            styleModel = _a.sent();
                            classNames = styleModel.classNames;
                            styleElement = document.createElement("style");
                            compiler = new jssCompiler_1.JssCompiler();
                            css = compiler.compile(styleModel.styleSheet);
                            styleElement.innerHTML = css;
                            element.parentElement.insertBefore(styleElement, element);
                            _a.label = 9;
                        case 9:
                            cssObservable(classNames);
                            ko.applyBindingsToNode(element, { css: cssObservable }, null);
                            return [2];
                    }
                });
            }); }
        };
    }
    return StylePreviewBindingHandler;
}());
exports.StylePreviewBindingHandler = StylePreviewBindingHandler;
