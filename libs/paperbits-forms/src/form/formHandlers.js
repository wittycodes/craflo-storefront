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
exports.FormHandlers = void 0;
var formModel_1 = require("./formModel");
var submitModel_1 = require("../submit/submitModel");
var text_input_1 = require("../text-input");
var FormHandlers = (function () {
    function FormHandlers(viewManager) {
        this.viewManager = viewManager;
    }
    FormHandlers.prototype.getWidgetOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var widgetOrder;
            var _this = this;
            return __generator(this, function (_a) {
                widgetOrder = {
                    name: "form",
                    displayName: "Form",
                    category: "Forms",
                    iconClass: "paperbits-form",
                    requires: ["html", "js", "interaction"],
                    createModel: function () { return __awaiter(_this, void 0, void 0, function () {
                        var firstNameModel, lastNameModel, formModel;
                        return __generator(this, function (_a) {
                            firstNameModel = new text_input_1.TextInputModel();
                            firstNameModel.label = "First name";
                            firstNameModel.name = "firstName";
                            firstNameModel.placeholder = "e.g. John";
                            firstNameModel.required = true;
                            lastNameModel = new text_input_1.TextInputModel();
                            lastNameModel.label = "Last name";
                            lastNameModel.name = "lastName";
                            lastNameModel.placeholder = "e.g. Doe";
                            lastNameModel.required = true;
                            formModel = new formModel_1.FormModel();
                            formModel.widgets.push(firstNameModel);
                            formModel.widgets.push(lastNameModel);
                            formModel.widgets.push(new submitModel_1.SubmitModel());
                            return [2, formModel];
                        });
                    }); }
                };
                return [2, widgetOrder];
            });
        });
    };
    FormHandlers.prototype.canAccept = function (dragSession) {
        return !["section", "row", "column", "form"].includes(dragSession.sourceBinding.name);
    };
    FormHandlers.prototype.getContextualEditor = function (context) {
        var _this = this;
        var contextualEditor = {
            color: "#4c5866",
            hoverCommands: [{
                    color: "#607d8b",
                    position: context.half,
                    tooltip: "Add widget",
                    component: {
                        name: "widget-selector",
                        params: {
                            onRequest: function () { return context.providers; },
                            onSelect: function (newWidgetModel) {
                                var index = context.parentModel.widgets.indexOf(context.model);
                                if (context.half === "bottom") {
                                    index++;
                                }
                                context.parentBinding.model.widgets.splice(index, 0, newWidgetModel);
                                context.parentBinding.applyChanges();
                                _this.viewManager.clearContextualEditors();
                            }
                        }
                    }
                }],
            deleteCommand: {
                tooltip: "Delete form",
                color: "#4c5866",
                callback: function () {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    _this.viewManager.clearContextualEditors();
                }
            },
            selectCommands: [{
                    tooltip: "Edit form",
                    iconClass: "paperbits-edit-72",
                    position: "top right",
                    color: "#4c5866",
                    callback: function () {
                        _this.viewManager.openWidgetEditor(context.binding);
                    }
                }]
        };
        if (context.model.widgets.length === 0) {
            contextualEditor.hoverCommands.push({
                color: "#607d8b",
                position: "center",
                tooltip: "Add widget",
                component: {
                    name: "widget-selector",
                    params: {
                        onRequest: function () { return context.providers; },
                        onSelect: function (widgetModel) {
                            context.model.widgets.push(widgetModel);
                            context.binding.applyChanges();
                            _this.viewManager.clearContextualEditors();
                        }
                    }
                }
            });
        }
        return contextualEditor;
    };
    return FormHandlers;
}());
exports.FormHandlers = FormHandlers;
