"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowHandlers = void 0;
var RowHandlers = (function () {
    function RowHandlers(viewManager) {
        this.viewManager = viewManager;
    }
    RowHandlers.prototype.getContextualEditor = function (context) {
        var _this = this;
        return {
            color: "#29c4a9",
            hoverCommands: [{
                    color: "#29c4a9",
                    position: context.half,
                    tooltip: "Add row",
                    component: {
                        name: "email-row-layout-selector",
                        params: {
                            onSelect: function (newRowModel) {
                                var index = context.parentModel.widgets.indexOf(context.model);
                                if (context.half === "bottom") {
                                    index++;
                                }
                                context.parentModel.widgets.splice(index, 0, newRowModel);
                                context.parentBinding.applyChanges();
                                _this.viewManager.clearContextualEditors();
                            }
                        }
                    },
                }],
            selectCommands: [{
                    tooltip: "Switch to parent",
                    iconClass: "paperbits-enlarge-vertical",
                    position: "top right",
                    color: "#29c4a9",
                    callback: function () {
                        context.switchToParent();
                    }
                }],
            deleteCommand: {
                tooltip: "Delete row",
                color: "#29c4a9",
                callback: function () {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    _this.viewManager.clearContextualEditors();
                }
            }
        };
    };
    return RowHandlers;
}());
exports.RowHandlers = RowHandlers;
