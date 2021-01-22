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
var chai_1 = require("chai");
var styleHelper_1 = require("./../src/styleHelper");
describe("Style helper", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it("Can extracts local styles properly depending on requested viewport.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var sizeConfigXs, localStyles, stylePluginConfigXs;
            return __generator(this, function (_a) {
                sizeConfigXs = 100;
                localStyles = {
                    instance: {
                        size: {
                            xs: sizeConfigXs
                        }
                    }
                };
                stylePluginConfigXs = styleHelper_1.StyleHelper.getPluginConfigForLocalStyles(localStyles, "size", "xs");
                chai_1.expect(stylePluginConfigXs).to.equal(sizeConfigXs);
                return [2];
            });
        }); });
        it("Returns null when local styles are empty.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var emptyLocalStyles, stylePluginConfigMd;
            return __generator(this, function (_a) {
                emptyLocalStyles = {};
                stylePluginConfigMd = styleHelper_1.StyleHelper.getPluginConfigForLocalStyles(emptyLocalStyles, "size", "md");
                chai_1.expect(stylePluginConfigMd).to.equal(null);
                return [2];
            });
        }); });
        it("Sets local styles properly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var sizeConfigXs, sizeConfigNew, backgroundConfigXs, appearanceVariationKey, localStyles;
            return __generator(this, function (_a) {
                sizeConfigXs = 100;
                sizeConfigNew = 200;
                backgroundConfigXs = 300;
                appearanceVariationKey = "components/picture/default";
                localStyles = {
                    instance: {
                        size: {
                            xs: sizeConfigXs
                        },
                        background: {
                            xs: backgroundConfigXs
                        }
                    },
                    appearance: appearanceVariationKey
                };
                styleHelper_1.StyleHelper.setPluginConfigForLocalStyles(localStyles, "size", sizeConfigNew, "md");
                chai_1.expect(localStyles.instance.size.md).to.equal(sizeConfigNew);
                chai_1.expect(localStyles.instance.size.xs).to.equal(sizeConfigXs);
                chai_1.expect(localStyles.instance.background.xs).to.equal(backgroundConfigXs);
                chai_1.expect(localStyles.appearance).to.equal(appearanceVariationKey);
                styleHelper_1.StyleHelper.setPluginConfigForLocalStyles(localStyles, "size", sizeConfigNew);
                chai_1.expect(localStyles.instance.size).to.equal(sizeConfigNew);
                chai_1.expect(localStyles.instance.size.md).to.equal(undefined);
                chai_1.expect(localStyles.instance.size.xs).to.equal(undefined);
                chai_1.expect(localStyles.instance.background.xs).to.equal(backgroundConfigXs);
                chai_1.expect(localStyles.appearance).to.equal(appearanceVariationKey);
                return [2];
            });
        }); });
        it("Test1", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fontSizeXs, fontSizeMd, fontSizeLg, fontWeight, pluginBag, typographyConfig;
            return __generator(this, function (_a) {
                fontSizeXs = 15;
                fontSizeMd = 15;
                fontSizeLg = 20;
                fontWeight = 400;
                pluginBag = {
                    fontSize: {
                        xs: fontSizeXs,
                        md: fontSizeMd
                    },
                    fontWeight: 400
                };
                typographyConfig = {
                    fontSize: fontSizeMd,
                };
                styleHelper_1.StyleHelper.setPluginConfig(pluginBag, "size", typographyConfig, "lg");
                styleHelper_1.StyleHelper.optimizeProperty(pluginBag, "fontSize");
                debugger;
                return [2];
            });
        }); });
        it("Can optimize style plugin config", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fontSizeXs, fontSizeMd, fontSizeLg, fontWeightXs, fontWeightLg, config;
            return __generator(this, function (_a) {
                fontSizeXs = 15;
                fontSizeMd = 17;
                fontSizeLg = 17;
                fontWeightXs = 400;
                fontWeightLg = 600;
                config = {
                    xs: {
                        fontWeight: fontWeightXs,
                        fontSize: fontSizeXs,
                    },
                    md: {
                        fontSize: fontSizeMd
                    },
                    lg: {
                        fontWeight: fontWeightLg,
                        fontSize: fontSizeLg
                    }
                };
                styleHelper_1.StyleHelper.optimizePluginConfig(config);
                console.log(JSON.stringify(config));
                chai_1.expect(config.xs.fontSize).to.equal(fontSizeXs);
                chai_1.expect(config.md.fontSize).to.equal(fontSizeMd);
                chai_1.expect(config.lg.fontSize).to.equal(undefined);
                chai_1.expect(config.lg.fontWeight).to.equal(600);
                return [2];
            });
        }); });
        return [2];
    });
}); });
