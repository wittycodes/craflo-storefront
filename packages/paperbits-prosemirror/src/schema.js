"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBuilder = void 0;
var prosemirror_model_1 = require("prosemirror-model");
var SchemaBuilder = (function () {
    function SchemaBuilder() {
    }
    SchemaBuilder.prototype.setupBlock = function (tag) {
        return {
            group: "block",
            content: "inline*",
            attrs: {
                id: { default: null },
                className: { default: null },
                styles: { default: null }
            },
            toDOM: function (node) {
                var _a, _b;
                var properties = {};
                if ((_a = node.attrs) === null || _a === void 0 ? void 0 : _a.id) {
                    properties.id = node.attrs.id;
                }
                if ((_b = node.attrs) === null || _b === void 0 ? void 0 : _b.className) {
                    properties.class = node.attrs.className;
                }
                return [tag, properties, 0];
            },
            parseDOM: [{ tag: tag }]
        };
    };
    SchemaBuilder.prototype.setupHeading = function (tag) {
        var block = this.setupBlock(tag);
        block.parseDOM = [{
                tag: tag,
                getAttrs: function (dom) {
                    return {
                        id: dom.hasAttribute("id") ? dom.getAttribute("id") : null
                    };
                }
            }];
        return block;
    };
    SchemaBuilder.prototype.build = function () {
        var nodes = {
            text: {
                group: "inline",
            },
            paragraph: this.setupBlock("p"),
            formatted: this.setupBlock("pre"),
            ordered_list: {
                content: "list_item+",
                group: "block",
                attrs: { order: { default: 1 } },
                parseDOM: [{
                        tag: "ol",
                        getAttrs: function (dom) {
                            return { order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1 };
                        }
                    }],
                toDOM: function (node) {
                    return node.attrs.order === 1
                        ? ["ol", 0]
                        : ["ol", { start: node.attrs.order }, 0];
                }
            },
            bulleted_list: {
                content: "list_item+",
                group: "block",
                attrs: {
                    className: { default: null },
                    styles: { default: null }
                },
                parseDOM: [{ tag: "ul" }],
                toDOM: function (node) {
                    var tag = "ul";
                    var properties = {};
                    if (node.attrs.className) {
                        properties.class = node.attrs.className;
                    }
                    return [tag, properties, 0];
                }
            },
            list_item: {
                content: "paragraph block*",
                parseDOM: [{
                        tag: "li"
                    }],
                toDOM: function () {
                    return ["li", 0];
                },
                defining: true
            },
            heading1: this.setupHeading("h1"),
            heading2: this.setupHeading("h2"),
            heading3: this.setupHeading("h3"),
            heading4: this.setupHeading("h4"),
            heading5: this.setupHeading("h5"),
            heading6: this.setupHeading("h6"),
            quote: this.setupBlock("blockquote"),
            break: {
                inline: true,
                group: "inline",
                selectable: false,
                parseDOM: [{ tag: "br" }],
                toDOM: function () { return ["br"]; }
            },
            doc: {
                content: "block+"
            }
        };
        var marks = {
            bold: {
                toDOM: function () { return ["b"]; },
                parseDOM: [{ tag: "b" }]
            },
            italic: {
                toDOM: function () { return ["i"]; },
                parseDOM: [{ tag: "i" }]
            },
            underlined: {
                toDOM: function () { return ["u"]; },
                parseDOM: [{ tag: "u" }]
            },
            highlighted: {
                toDOM: function () { return ["mark"]; },
                parseDOM: [{ tag: "mark" }]
            },
            striked: {
                toDOM: function () { return ["strike"]; },
                parseDOM: [{ tag: "strike" }]
            },
            code: {
                toDOM: function () { return ["code"]; },
                parseDOM: [{ tag: "code" }]
            },
            color: {
                attrs: {
                    colorKey: {},
                    colorClass: {},
                },
                toDOM: function (node) {
                    return ["span", { class: node.attrs.colorClass }];
                }
            },
            hyperlink: {
                attrs: {
                    href: { default: undefined },
                    anchor: { default: undefined },
                    anchorName: { default: undefined },
                    targetKey: { default: undefined },
                    target: { default: undefined },
                    download: { default: undefined }
                },
                toDOM: function (node) {
                    return ["a", {
                            href: "" + node.attrs.href + (node.attrs.anchor ? "#" + node.attrs.anchor : ""),
                            target: node.attrs.target,
                            download: node.attrs.download
                        }];
                },
                parseDOM: [{
                        tag: "a",
                        getAttrs: function (dom) { return { href: dom.href }; }
                    }],
                inclusive: false
            }
        };
        var schema = new prosemirror_model_1.Schema({
            nodes: nodes,
            marks: marks
        });
        return schema;
    };
    return SchemaBuilder;
}());
exports.SchemaBuilder = SchemaBuilder;
