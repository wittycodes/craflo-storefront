"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultViewManager = void 0;
const _ = require("lodash");
const ko = require("knockout");
const Arrays = require("@paperbits/common/arrays");
const Utils = require("@paperbits/common/utils");
const defaultViewManager_html_1 = require("./defaultViewManager.html");
require("@paperbits/common/extensions");
const events_1 = require("@paperbits/common/events");
const ui_1 = require("@paperbits/common/ui");
const decorators_1 = require("@paperbits/common/ko/decorators");
const user_1 = require("@paperbits/common/user");
const designerUserService_1 = require("./designerUserService");
const viewStack_1 = require("./viewStack");
let DefaultViewManager = class DefaultViewManager {
    constructor(eventManager, globalEventHandler, designerUserService, settingsProvider, router, viewStack) {
        this.eventManager = eventManager;
        this.globalEventHandler = globalEventHandler;
        this.designerUserService = designerUserService;
        this.settingsProvider = settingsProvider;
        this.router = router;
        this.viewStack = viewStack;
        this.contextualEditorsBag = {};
        this.designTime = ko.observable(false);
        this.previewable = ko.observable(true);
        this.block = ko.computed(() => {
            return this.designTime() && this.previewable();
        });
        this.mode = ui_1.ViewManagerMode.selecting;
        this.toasts = ko.observableArray();
        this.journey = ko.observableArray();
        this.journeyName = ko.pureComputed(() => {
            if (this.journey().length === 0) {
                return null;
            }
            return this.journey()[0].heading;
        });
        this.widgetEditor = ko.observable();
        this.contextualEditors = ko.observableArray([]);
        this.highlightedElement = ko.observable();
        this.splitterElement = ko.observable();
        this.selectedElement = ko.observable();
        this.selectedElementContextualEditor = ko.observable();
        this.viewport = ko.observable("xl");
        this.locale = ko.observable("en-us");
        this.rolesScope = ko.observableArray([user_1.BuiltInRoles.anonymous]);
        this.host = ko.observable();
        this.shutter = ko.observable(true);
        this.dragSession = ko.observable();
        this.primaryToolboxVisible = ko.observable(false);
        this.websitePreviewEnabled = ko.observable(false);
        this.canPreview = ko.pureComputed(() => { var _a; return this.websitePreviewEnabled() && ((_a = this.host()) === null || _a === void 0 ? void 0 : _a.name) === "page-host"; });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.globalEventHandler.addDragEnterListener(this.hideToolboxes.bind(this));
            this.globalEventHandler.addDragDropListener(this.onDragEnd.bind(this));
            this.globalEventHandler.addDragEndListener(this.onDragEnd.bind(this));
            this.globalEventHandler.addDragLeaveScreenListener(this.showToolboxes.bind(this));
            this.eventManager.addEventListener("virtualDragEnd", this.onDragEnd.bind(this));
            this.router.addRouteChangeListener(this.onRouteChange.bind(this));
            this.globalEventHandler.appendDocument(document);
            this.eventManager.addEventListener("onTopLevelEscape", this.onEscape.bind(this));
            this.eventManager.addEventListener("onKeyDown", this.onKeyDown.bind(this));
            this.eventManager.addEventListener("onKeyUp", this.onKeyUp.bind(this));
            const websitePreviewEnabled = yield this.settingsProvider.getSetting("websitePreviewEnabled");
            this.websitePreviewEnabled(websitePreviewEnabled || false);
        });
    }
    onKeyDown(event) {
        if (this.getOpenView()) {
            return;
        }
        if (!event.ctrlKey && !event.metaKey) {
            return;
        }
        this.designTime(false);
    }
    onKeyUp(event) {
        if (this.getOpenView()) {
            return;
        }
        if (event.ctrlKey || event.metaKey) {
            return;
        }
        if (this.mode === ui_1.ViewManagerMode.preview) {
            return;
        }
        this.designTime(true);
    }
    setHost(component) {
        const currentComponent = this.host();
        if (currentComponent && currentComponent.name === component.name && !currentComponent.params) {
            return;
        }
        this.clearContextualEditors();
        this.host(component);
        this.previewable(component.name !== "style-guide");
    }
    getHost() {
        return this.host();
    }
    getHostDocument() {
        return this.hostDocument;
    }
    onRouteChange() {
        this.clearContextualEditors();
        this.closeView();
    }
    getCurrentJourney() {
        return this.journeyName();
    }
    addToast(title, content, commands) {
        const toast = new ui_1.Toast(title, content, "info", null, commands);
        this.toasts.push(toast);
        return toast;
    }
    removeToast(toast) {
        this.toasts.splice(this.toasts().indexOf(toast), 1);
    }
    notifySuccess(title, content) {
        const toast = new ui_1.Toast(title, content, "success");
        this.toasts.push(toast);
        this.scheduleToastRemoval(toast);
    }
    notifyInfo(title, content, commands) {
        const toast = new ui_1.Toast(title, content, "info", null, commands);
        this.toasts.push(toast);
        this.scheduleToastRemoval(toast);
    }
    notifyError(title, content) {
        const toast = new ui_1.Toast(title, content, "error");
        this.toasts.push(toast);
        this.scheduleToastRemoval(toast);
    }
    notifyProgress(promise, title, content) {
        const toast = new ui_1.Toast(title, content);
        this.toasts.push(toast);
        if (promise["progress"]) {
            promise["progress"](toast.progress);
        }
        promise.then(() => {
            toast.progress(100);
        });
        promise.then(() => {
            this.scheduleToastRemoval(toast);
        });
    }
    updateJourneyComponent(view) {
        let journey = this.journey();
        const existingComponent = journey.find(c => { return c.component.name === view.component.name; });
        if (existingComponent) {
            journey = journey.splice(0, journey.indexOf(existingComponent));
        }
        journey.push(view);
        this.journey(journey);
    }
    clearJourney() {
        this.journey([]);
        this.widgetEditor(null);
    }
    hideToolboxes() {
        this.journey([]);
        this.primaryToolboxVisible(false);
        if (this.mode !== ui_1.ViewManagerMode.preview) {
            this.mode = ui_1.ViewManagerMode.dragging;
        }
        this.clearContextualEditors();
    }
    showToolboxes() {
        this.primaryToolboxVisible(true);
        this.mode = ui_1.ViewManagerMode.selecting;
    }
    openViewAsWorkshop(view) {
        this.viewStack.clear();
        this.clearContextualEditors();
        this.updateJourneyComponent(view);
        this.mode = ui_1.ViewManagerMode.configure;
    }
    closeWorkshop(editor) {
        const journey = this.journey();
        let view;
        if (typeof editor === "string") {
            view = journey.find(x => x.component.name === editor);
        }
        else {
            view = editor;
        }
        const indexOfClosingEditor = journey.indexOf(view);
        journey.splice(indexOfClosingEditor);
        this.journey(journey);
        this.mode = ui_1.ViewManagerMode.selecting;
    }
    scheduleToastRemoval(toast) {
        setTimeout(() => {
            this.toasts(_.without(this.toasts(), toast));
        }, 8000);
    }
    openUploadDialog(...accept) {
        uploadDialog.accept = accept === null || accept === void 0 ? void 0 : accept.join(",");
        uploadDialog.click();
        return new Promise((resolve) => {
            uploadDialog.onchange = () => {
                const selectedFiles = Arrays.coerce(uploadDialog.files);
                uploadDialog.value = "";
                resolve(selectedFiles);
            };
        });
    }
    openViewAsPopup(view) {
        this.viewStack.clear();
        if (this.widgetEditor() === view) {
            return;
        }
        view.hitTest = (el) => {
            return !!Utils.closest(el, (x) => (x.getAttribute && !!x.getAttribute("contentEditable")) ||
                ((x === null || x === void 0 ? void 0 : x.classList) && Arrays.coerce(x.classList).includes("toolbox")));
        };
        view.close = () => this.closeView();
        if (view.component.params) {
            view.component.params.onClose = () => this.closeView();
        }
        if (!view.resize) {
            view.resize = "vertically horizontally";
        }
        this.clearContextualEditors();
        this.closeView();
        this.widgetEditor(view);
        this.mode = ui_1.ViewManagerMode.configure;
        this.designTime(false);
        this.viewStack.pushView(view);
    }
    getOpenView() {
        return this.widgetEditor();
    }
    onEscape() {
        const host = this.host();
        if (this.viewStack.getViews().length === 0 && this.journey().length > 0) {
            const journey = this.journey();
            journey.pop();
            this.journey(journey);
            return;
        }
        if (!this.getOpenView() && this.journey().length === 0 && host && host.name !== "page-host") {
            this.setHost({ name: "page-host" });
        }
    }
    closeEditors() {
        this.closeView();
        this.clearJourney();
    }
    openWidgetEditor(binding) {
        const view = {
            component: {
                name: binding.editor,
                params: {
                    model: binding.model,
                    onChange: binding.applyChanges
                }
            },
            heading: binding.displayName,
            resize: binding.editorResize || "vertically horizontally"
        };
        this.openViewAsPopup(view);
    }
    closeView() {
        if (this.mode === ui_1.ViewManagerMode.preview) {
            return;
        }
        const view = this.widgetEditor();
        if (view) {
            this.viewStack.removeView(view);
        }
        this.widgetEditor(null);
        this.eventManager.dispatchEvent("onWidgetEditorClose");
        this.clearContextualEditors();
        this.mode = ui_1.ViewManagerMode.selecting;
        this.primaryToolboxVisible(true);
        this.designTime(true);
    }
    setContextualEditor(editorName, contextualEditor) {
        this.contextualEditorsBag[editorName] = contextualEditor;
        const editors = Object.keys(this.contextualEditorsBag).map(key => this.contextualEditorsBag[key]);
        this.contextualEditors(editors);
    }
    removeContextualEditor(editorName) {
        if (!this.contextualEditorsBag[editorName]) {
            return;
        }
        delete this.contextualEditorsBag[editorName];
        const editors = Object.keys(this.contextualEditorsBag).map(key => this.contextualEditorsBag[key]);
        this.contextualEditors(editors);
    }
    clearContextualEditors() {
        if (this.mode === ui_1.ViewManagerMode.configure) {
            return;
        }
        this.contextualEditorsBag = {};
        this.contextualEditors([]);
        this.highlightedElement(null);
        this.setSplitter(null);
        this.selectedElement(null);
        this.selectedElementContextualEditor(null);
        if (this.mode !== ui_1.ViewManagerMode.preview) {
            this.designTime(true);
            this.mode = ui_1.ViewManagerMode.selecting;
        }
    }
    setHighlight(config) {
        if (this.mode === ui_1.ViewManagerMode.preview) {
            return;
        }
        this.highlightedElement(null);
        this.setSplitter(null);
        this.highlightedElement(config);
    }
    setSplitter(config) {
        if (this.mode === ui_1.ViewManagerMode.preview) {
            return;
        }
        this.splitterElement(null);
        this.splitterElement(config);
    }
    setSelectedElement(config, contextualEditor) {
        if (this.mode === ui_1.ViewManagerMode.preview) {
            return;
        }
        this.clearContextualEditors();
        this.closeView();
        this.selectedElement(null);
        this.selectedElement(config);
        this.selectedElementContextualEditor(contextualEditor);
        if (this.mode !== ui_1.ViewManagerMode.configure) {
            this.mode = ui_1.ViewManagerMode.selected;
        }
        this.clearJourney();
    }
    getSelectedElement() {
        return this.selectedElement();
    }
    setViewport(viewport) {
        this.clearContextualEditors();
        this.viewport(viewport);
    }
    getViewport() {
        return this.viewport();
    }
    setViewRoles(roles) {
        this.rolesScope(roles);
        this.designerUserService.setUserRoles(roles.map(role => role.key));
        this.eventManager.dispatchEvent("onUserRoleChange", roles);
    }
    getViewRoles() {
        return this.rolesScope();
    }
    setShutter() {
        this.previousMode = this.mode;
        this.mode = ui_1.ViewManagerMode.pause;
        this.shutter(true);
    }
    removeShutter() {
        this.mode = this.previousMode;
        this.shutter(false);
    }
    onHoverCommandActivate() {
        this.mode = ui_1.ViewManagerMode.pause;
        this.highlightedElement(null);
        this.selectedElement(null);
    }
    onHoverCommandDeactivate() {
        this.mode = ui_1.ViewManagerMode.selecting;
    }
    beginDrag(session) {
        this.clearContextualEditors();
        this.closeView();
        this.dragSession(session);
        this.hideToolboxes();
    }
    getDragSession() {
        return this.dragSession();
    }
    onDragEnd() {
        if (this.mode !== ui_1.ViewManagerMode.preview) {
            this.showToolboxes();
        }
        this.highlightedElement(null);
        this.selectedElement(null);
    }
    enablePreviewMode() {
        this.previousMode = this.mode;
        this.clearJourney();
        this.hideToolboxes();
        this.designTime(false);
        this.toasts().forEach(toast => {
            this.removeToast(toast);
        });
        this.mode = ui_1.ViewManagerMode.preview;
    }
    disablePreviewMode() {
        this.showToolboxes();
        this.designTime(true);
        this.mode = this.previousMode;
    }
    dispose() {
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefaultViewManager.prototype, "initialize", null);
__decorate([
    decorators_1.OnDestroyed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DefaultViewManager.prototype, "dispose", null);
DefaultViewManager = __decorate([
    decorators_1.Component({
        selector: "view-manager",
        template: defaultViewManager_html_1.default
    }),
    __metadata("design:paramtypes", [Object, events_1.GlobalEventHandler,
        designerUserService_1.DesignerUserService, Object, Object, viewStack_1.ViewStack])
], DefaultViewManager);
exports.DefaultViewManager = DefaultViewManager;
//# sourceMappingURL=defaultViewManager.js.map