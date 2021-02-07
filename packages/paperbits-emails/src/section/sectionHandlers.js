"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionHandlers = void 0;
var SectionHandlers = (function () {
    function SectionHandlers(viewManager) {
        this.viewManager = viewManager;
    }
    SectionHandlers.prototype.canAccept = function (dragSession) {
        return dragSession.sourceBinding.name === "row";
    };
    SectionHandlers.prototype.getContextualEditor = function (context) {
        var _this = this;
        var sectionContextualEditor = {
            color: "#2b87da",
            hoverCommands: [{
                    position: context.half,
                    tooltip: "Add section",
                    color: "#2b87da",
                    component: {
                        name: "email-layout-section-layout-selector",
                        params: {
                            onSelect: function (newSectionModel) {
                                var sectionHalf = context.half;
                                var index = context.parentModel.widgets.indexOf(context.model);
                                if (sectionHalf === "bottom") {
                                    index++;
                                }
                                context.parentModel.widgets.splice(index, 0, newSectionModel);
                                context.parentBinding.applyChanges();
                                _this.viewManager.clearContextualEditors();
                            }
                        }
                    }
                }],
            deleteCommand: {
                tooltip: "Delete section",
                color: "#2b87da",
                callback: function () {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    _this.viewManager.clearContextualEditors();
                }
            },
            selectCommands: [{
                    tooltip: "Edit section",
                    iconClass: "paperbits-edit-72",
                    position: "top right",
                    color: "#2b87da",
                    callback: function () { return _this.viewManager.openWidgetEditor(context.binding); }
                },
                {
                    tooltip: "Add to library",
                    iconClass: "paperbits-simple-add",
                    position: "top right",
                    color: "#2b87da",
                    callback: function () {
                        var view = {
                            heading: "Add to library",
                            component: {
                                name: "add-block-dialog",
                                params: context.model
                            },
                            resize: "vertically horizontally"
                        };
                        _this.viewManager.openViewAsPopup(view);
                    }
                }]
        };
        if (context.model.widgets.length === 0) {
            sectionContextualEditor.hoverCommands.push({
                position: "center",
                tooltip: "Add row",
                color: "#29c4a9",
                component: {
                    name: "email-layout-row-layout-selector",
                    params: {
                        onSelect: function (newRowModel) {
                            context.model.widgets.push(newRowModel);
                            context.binding.applyChanges();
                            _this.viewManager.clearContextualEditors();
                        }
                    }
                }
            });
        }
        return sectionContextualEditor;
    };
    return SectionHandlers;
}());
exports.SectionHandlers = SectionHandlers;
