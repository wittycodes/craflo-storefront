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
exports.StyleInliner = void 0;
var parseCSS = require("css-rules");
var cheerio = require("cheerio");
var flatten = require("flatten");
var pick = require("object.pick");
var extend = require("extend");
var fs = require("fs");
var pseudoCheck_1 = require("./pseudoCheck");
var handleRule_1 = require("./handleRule");
var setWidthAttrs_1 = require("./setWidthAttrs");
var removeClassId_1 = require("./removeClassId");
var mediaquery_1 = require("./mediaquery");
cheerio.prototype.resetAttr = function (attribute) {
    if (!this.attr(attribute)) {
        this.attr(attribute, 0);
    }
    return this;
};
var StyleInliner = (function () {
    function StyleInliner() {
    }
    StyleInliner.applyStylesAsProps = function ($el, styleToAttrMap) {
        var style;
        var styleVal;
        for (style in styleToAttrMap) {
            styleVal = $el.css(style);
            if (styleVal !== undefined) {
                $el.attr(styleToAttrMap[style], styleVal);
                $el.css(style, "");
            }
        }
    };
    StyleInliner.batchApplyStylesAsProps = function ($el, sel, $) {
        $el.find(sel).each(function (i, childEl) {
            StyleInliner.applyStylesAsProps($(childEl), tableStyleAttrMap[sel]);
        });
    };
    StyleInliner.setTableAttrs = function (el, $) {
        var selector, $el = $(el);
        $el = $el.resetAttr("border")
            .resetAttr("cellpadding")
            .resetAttr("cellspacing");
        for (selector in tableStyleAttrMap) {
            if (selector === "table") {
                StyleInliner.applyStylesAsProps($el, tableStyleAttrMap.table);
            }
            else {
                StyleInliner.batchApplyStylesAsProps($el, selector, $);
            }
        }
    };
    StyleInliner.inlineCss = function (html, css, options) {
        var _this = this;
        var opts = options || {};
        var rules;
        var editedElements = [];
        var codeBlockLookup = [];
        var encodeCodeBlocks = function (_html) {
            var __html = _html;
            var blocks = opts.codeBlocks;
            Object.keys(blocks).forEach(function (key) {
                var re = new RegExp(blocks[key].start + "([\\S\\s]*?)" + blocks[key].end, "g");
                __html = __html.replace(re, function (match) {
                    codeBlockLookup.push(match);
                    return "EXCS_CODE_BLOCK_" + (codeBlockLookup.length - 1) + "_";
                });
            });
            return __html;
        };
        var decodeCodeBlocks = function (_html) {
            var index, re;
            var __html = _html;
            for (index = 0; index < codeBlockLookup.length; index++) {
                re = new RegExp("EXCS_CODE_BLOCK_" + index + "_(=\"\")?", "gi");
                __html = StyleInliner.replaceCodeBlock(__html, re, codeBlockLookup[index]);
            }
            return __html;
        };
        var encodeEntities = function (_html) {
            return encodeCodeBlocks(_html);
        };
        var decodeEntities = function (_html) {
            return decodeCodeBlocks(_html);
        };
        var $ = cheerio.load(encodeEntities(html), pick(opts, [
            "xmlMode",
            "decodeEntities",
            "lowerCaseTags",
            "lowerCaseAttributeNames",
            "recognizeCDATA",
            "recognizeSelfClosing"
        ]));
        try {
            rules = parseCSS(css);
            rules.forEach(function (rule) {
                var el;
                var ignoredPseudos;
                ignoredPseudos = pseudoCheck_1.pseudoCheck(rule);
                if (ignoredPseudos) {
                    return false;
                }
                try {
                    el = handleRule_1.handleRule(rule, $);
                    editedElements.push(el);
                }
                catch (err) {
                    return false;
                }
            });
        }
        catch (err) {
            throw new Error(err);
        }
        editedElements = flatten(editedElements);
        editedElements.forEach(function (el) {
            _this.setStyleAttrs(el, $, options);
            if (opts.applyWidthAttributes) {
                setWidthAttrs_1.setWidthAttrs(el, $);
            }
            if (opts.removeHtmlSelectors) {
                removeClassId_1.removeClassId(el, $);
            }
        });
        if (opts.applyTableAttributes) {
            $("table").each(function (index, el) {
                StyleInliner.setTableAttrs(el, $);
            });
        }
        return decodeEntities($.html());
    };
    StyleInliner.replaceCodeBlock = function (html, re, block) {
        return html.replace(re, function () {
            return block;
        });
    };
    StyleInliner.setStyleAttrs = function (el, $, options) {
        var i;
        var style = [];
        for (i in el.styleProps) {
            var styleProp = el.styleProps[i];
            if (typeof styleProp.selector.spec !== "undefined") {
                if (styleProp.selector.spec[0] === 2) {
                    styleProp.value += " !important";
                }
            }
            var regex = /url\(["'](.*)\"\)/gm;
            var matches = regex.exec(styleProp.value);
            var baseUrl = options.baseUrl;
            if (matches && matches.length === 2) {
                var url_1 = matches[1];
                if (!url_1.startsWith("http://") && !url_1.startsWith("https://")) {
                    if (!url_1.startsWith("/")) {
                        url_1 = "/" + url_1;
                    }
                    styleProp.value = "url(\"" + baseUrl + url_1 + "\")";
                }
            }
            style.push(styleProp.prop + ": " + styleProp.value.replace(/["]/g, "'") + ";");
        }
        style = style.sort(function (a, b) {
            var aProp = a.split(":")[0];
            var bProp = b.split(":")[0];
            return (aProp > bProp ? 1 : aProp < bProp ? -1 : 0);
        });
        $(el).attr("style", style.join(" "));
    };
    StyleInliner.extractCss = function (html, options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, stylesData, promises, results, css;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = StyleInliner.getStylesheetList(html, options);
                        stylesData = StyleInliner.getStylesData(data.html, options);
                        promises = [];
                        data.hrefs.forEach(function (stylesheetHref) {
                            promises.push(StyleInliner.getHrefContent(stylesheetHref));
                        });
                        return [4, Promise.all(promises)];
                    case 1:
                        results = _a.sent();
                        results.forEach(function (content) {
                            stylesData.css.push(content);
                        });
                        css = stylesData.css.join("\n");
                        return [2, {
                                css: css,
                                html: stylesData.html
                            }];
                }
            });
        });
    };
    StyleInliner.readFileAsString = function (filepath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filepath, "utf8", function (error, content) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(content);
            });
        });
    };
    StyleInliner.getHrefContent = function (href) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.readFileAsString(decodeURIComponent(href))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    StyleInliner.getStylesheetList = function (sourceHtml, options) {
        var results = {};
        var codeBlocks = {
            EJS: { start: "<%", end: "%>" },
            HBS: { start: "{{", end: "}}" }
        };
        var codeBlockLookup = [];
        var encodeCodeBlocks = function (html) {
            var blocks = extend(codeBlocks, options.codeBlocks);
            Object.keys(blocks).forEach(function (key) {
                var re = new RegExp(blocks[key].start + "([\\S\\s]*?)" + blocks[key].end, "g");
                html = html.replace(re, function (match) {
                    codeBlockLookup.push(match);
                    return "EXCS_CODE_BLOCK_" + (codeBlockLookup.length - 1) + "_";
                });
            });
            return html;
        };
        var decodeCodeBlocks = function (html) {
            var index, re;
            for (index = 0; index < codeBlockLookup.length; index++) {
                re = new RegExp("EXCS_CODE_BLOCK_" + index + '_(="")?', "gi");
                html = StyleInliner.replaceCodeBlock(html, re, codeBlockLookup[index]);
            }
            return html;
        };
        var encodeEntities = function (html) { return encodeCodeBlocks(html); };
        var decodeEntities = function (html) { return decodeCodeBlocks(html); };
        var $ = cheerio.load(encodeEntities(sourceHtml), extend({ decodeEntities: false }, pick(options, [
            "xmlMode",
            "decodeEntities",
            "lowerCaseTags",
            "lowerCaseAttributeNames",
            "recognizeCDATA",
            "recognizeSelfClosing"
        ])));
        results.hrefs = [];
        $("link").each(function (index, element) {
            var $el = $(element);
            if ($el.attr("rel") && $el.attr("rel").toLowerCase() === "stylesheet") {
                if (options.applyLinkTags) {
                    results.hrefs.push($el.attr("href"));
                }
                if (options.removeLinkTags) {
                    $el.remove();
                }
            }
        });
        results.html = decodeEntities($.html());
        return results;
    };
    StyleInliner.getStylesData = function (html, options) {
        var results = {};
        var codeBlocks = {
            EJS: { start: "<%", end: "%>" },
            HBS: { start: "{{", end: "}}" }
        };
        var codeBlockLookup = [];
        var encodeCodeBlocks = function (_html) {
            var __html = _html;
            var blocks = extend(codeBlocks, options.codeBlocks);
            Object.keys(blocks).forEach(function (key) {
                var re = new RegExp(blocks[key].start + "([\\S\\s]*?)" + blocks[key].end, "g");
                __html = __html.replace(re, function (match) {
                    codeBlockLookup.push(match);
                    return "EXCS_CODE_BLOCK_" + (codeBlockLookup.length - 1) + "_";
                });
            });
            return __html;
        };
        var decodeCodeBlocks = function (_html) {
            var index, re, __html = _html;
            for (index = 0; index < codeBlockLookup.length; index++) {
                re = new RegExp("EXCS_CODE_BLOCK_" + index + '_(="")?', "gi");
                __html = StyleInliner.replaceCodeBlock(__html, re, codeBlockLookup[index]);
            }
            return __html;
        };
        var encodeEntities = function (_html) {
            return encodeCodeBlocks(_html);
        };
        var decodeEntities = function (_html) {
            return decodeCodeBlocks(_html);
        };
        var styleDataList;
        var styleData;
        var $ = cheerio.load(encodeEntities(html), extend({
            decodeEntities: false
        }, pick(options, [
            "xmlMode",
            "decodeEntities",
            "lowerCaseTags",
            "lowerCaseAttributeNames",
            "recognizeCDATA",
            "recognizeSelfClosing"
        ])));
        results.css = [];
        $("style").each(function (index, element) {
            var mediaQueries;
            if (typeof $(element).data("embed") !== "undefined") {
                return;
            }
            styleDataList = element.childNodes;
            if (styleDataList.length !== 1) {
                throw new Error("empty style element");
            }
            styleData = styleDataList[0].data;
            if (options.applyStyleTags) {
                results.css.push(styleData);
            }
            if (options.removeStyleTags) {
                if (options.preserveMediaQueries) {
                    mediaQueries = mediaquery_1.mediaQueryText(element.childNodes[0].nodeValue);
                    element.childNodes[0].nodeValue = mediaQueries;
                }
                if (!mediaQueries) {
                    $(element).remove();
                }
            }
        });
        results.html = decodeEntities($.html());
        return results;
    };
    return StyleInliner;
}());
exports.StyleInliner = StyleInliner;
var tableStyleAttrMap = {
    "table": {
        "float": "align",
        "background-color": "bgcolor",
        "width": "width",
        "height": "height"
    },
    "tr": {
        "background-color": "bgcolor",
        "vertical-align": "valign",
        "text-align": "align"
    },
    "td,th": {
        "background-color": "bgcolor",
        "width": "width",
        "height": "height",
        "vertical-align": "valign",
        "text-align": "align",
        "white-space": "nowrap"
    },
    "tbody,thead,tfoot": {
        "vertical-align": "valign",
        "text-align": "align"
    }
};
