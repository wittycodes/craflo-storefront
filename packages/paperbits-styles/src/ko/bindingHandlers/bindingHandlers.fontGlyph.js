"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
ko.bindingHandlers["fontGlyph"] = {
    update: function (canvas, valueAccessor) {
        var pixelRatio = window.devicePixelRatio || 1;
        if (pixelRatio !== 1) {
            var oldWidth = canvas.width;
            var oldHeight = canvas.height;
            canvas.width = oldWidth * pixelRatio;
            canvas.height = oldHeight * pixelRatio;
            canvas.style.width = oldWidth + "px";
            canvas.style.height = oldHeight + "px";
            canvas.getContext("2d").scale(pixelRatio, pixelRatio);
        }
        var glyphItem = valueAccessor();
        var cellWidth = 50;
        var cellHeight = 50;
        var cellMarginTop = 10;
        var cellMarginBottom = 10;
        var cellMarginLeftRight = 10;
        var w = cellWidth - cellMarginLeftRight * 2;
        var h = cellHeight - cellMarginTop - cellMarginBottom;
        var head = glyphItem.font.tables.head;
        var maxHeight = head.yMax - head.yMin;
        var fontScale = Math.min(w / (head.xMax - head.xMin), h / maxHeight);
        var fontSize = fontScale * glyphItem.font.unitsPerEm;
        var fontBaseline = cellMarginTop + h * head.yMax / maxHeight;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, cellWidth, cellHeight);
        var glyph = glyphItem.glyph;
        var glyphWidth = glyph.advanceWidth * fontScale;
        var xmin = (cellWidth - glyphWidth) / 2;
        var xmax = (cellWidth + glyphWidth) / 2;
        var x0 = xmin;
        glyph.draw(ctx, x0, fontBaseline, fontSize);
    }
};
