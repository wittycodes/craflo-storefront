"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.GridCellStylePlugin = void 0;
var stylePlugin_1 = require("../stylePlugin");
var styles_1 = require("@paperbits/common/styles");
var GridCellStylePlugin = (function (_super) {
    __extends(GridCellStylePlugin, _super);
    function GridCellStylePlugin() {
        var _this = _super.call(this) || this;
        _this.displayName = "Grid area";
        return _this;
    }
    GridCellStylePlugin.prototype.configToStyleRules = function (pluginConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var rules, value, value;
            return __generator(this, function (_a) {
                rules = [
                    new styles_1.StyleRule("display", "flex"),
                    new styles_1.StyleRule("flexWrap", "wrap"),
                    new styles_1.StyleRule("justifyContent", "center"),
                    new styles_1.StyleRule("alignContent", "center"),
                    new styles_1.StyleRule("alignItems", "center"),
                    new styles_1.StyleRule("minWidth", "0")
                ];
                if (pluginConfig.position) {
                    rules.push(new styles_1.StyleRule("gridColumnStart", pluginConfig.position.col));
                    rules.push(new styles_1.StyleRule("gridColumnEnd", pluginConfig.position.col + pluginConfig.span.cols));
                    rules.push(new styles_1.StyleRule("gridRowStart", pluginConfig.position.row));
                    rules.push(new styles_1.StyleRule("gridRowEnd", pluginConfig.position.row + pluginConfig.span.rows));
                }
                if (pluginConfig.alignment) {
                    if (pluginConfig.alignment.horizontal) {
                        value = pluginConfig.alignment.horizontal;
                        if (pluginConfig.alignment.horizontal === "start" || pluginConfig.alignment.horizontal === "end") {
                            value = "flex-" + value;
                        }
                        if (pluginConfig.alignment.horizontal === "around" || pluginConfig.alignment.horizontal === "between") {
                            value = "space-" + value;
                        }
                        rules.push(new styles_1.StyleRule("justifyContent", value));
                    }
                    if (pluginConfig.alignment.vertical) {
                        value = pluginConfig.alignment.vertical;
                        if (pluginConfig.alignment.vertical === "start" || pluginConfig.alignment.vertical === "end") {
                            value = "flex-" + value;
                        }
                        if (pluginConfig.alignment.vertical === "around" || pluginConfig.alignment.vertical === "between") {
                            value = "space-" + value;
                        }
                        rules.push(new styles_1.StyleRule("alignContent", value));
                        rules.push(new styles_1.StyleRule("alignItems", value));
                    }
                }
                if (pluginConfig.overflow) {
                    if (pluginConfig.overflow.vertical && pluginConfig.overflow.horizontal) {
                        rules.push(new styles_1.StyleRule("overflow", "auto"));
                    }
                    else if (pluginConfig.overflow.vertical) {
                        rules.push(new styles_1.StyleRule("overflowY", "auto"));
                    }
                    else {
                        rules.push(new styles_1.StyleRule("overflowX", "auto"));
                    }
                    rules.push(new styles_1.StyleRule("position", "absolute"));
                    rules.push(new styles_1.StyleRule("top", "0"));
                    rules.push(new styles_1.StyleRule("left", "0"));
                    rules.push(new styles_1.StyleRule("right", "0"));
                    rules.push(new styles_1.StyleRule("bottom", "0"));
                }
                return [2, rules];
            });
        });
    };
    return GridCellStylePlugin;
}(stylePlugin_1.StylePlugin));
exports.GridCellStylePlugin = GridCellStylePlugin;
