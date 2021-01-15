"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnHandlers = void 0;
var ColumnHandlers = (function () {
    function ColumnHandlers(viewManager) {
        this.viewManager = viewManager;
    }
    ColumnHandlers.prototype.canAccept = function (dragSession) {
        return !["section", "row", "column"].includes(dragSession.sourceBinding.name);
    };
    ColumnHandlers.prototype.getContextualEditor = function (context) {
        var _this = this;
        var columnContextualEditor = {
            color: "#4c5866",
            hoverCommands: [],
            deleteCommand: null,
            selectCommands: [{
                    tooltip: "Edit column",
                    iconClass: "paperbits-edit-72",
                    position: "top right",
                    color: "#4c5866",
                    callback: function () { return _this.viewManager.openWidgetEditor(context.binding); }
                },
                {
                    tooltip: "Switch to parent",
                    iconClass: "paperbits-enlarge-vertical",
                    position: "top right",
                    color: "#4c5866",
                    callback: function () {
                        context.switchToParent();
                    }
                }]
        };
        if (context.model.widgets.length === 0) {
            columnContextualEditor.hoverCommands.push({
                color: "#607d8b",
                position: "center",
                tooltip: "Add widget",
                component: {
                    name: "widget-selector",
                    params: {
                        onRequest: function () { return context.providers; },
                        onSelect: function (widget) {
                            context.model.widgets.push(widget);
                            context.binding.applyChanges();
                            _this.viewManager.clearContextualEditors();
                        }
                    }
                }
            });
        }
        return columnContextualEditor;
    };
    return ColumnHandlers;
}());
exports.ColumnHandlers = ColumnHandlers;
