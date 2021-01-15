"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlEditorBindingHandler = void 0;
const ko = require("knockout");
class HtmlEditorBindingHandler {
    constructor(eventManager, htmlEditorFactory) {
        ko.bindingHandlers["htmlEditor"] = {
            init(element, valueAccessor, allBindings, viewModel) {
                const config = valueAccessor();
                const htmlEditor = htmlEditorFactory.createHtmlEditor();
                htmlEditor.onStateChange = (newState) => {
                    viewModel["widgetBinding"].model.state = newState;
                    eventManager.dispatchEvent("onContentUpdate");
                };
                const onEscapeKeyPressed = () => htmlEditor.detachFromElement();
                eventManager.addEventListener("onEscape", onEscapeKeyPressed);
                const onWidgetEditorClose = () => htmlEditor.detachFromElement();
                eventManager.addEventListener("onWidgetEditorClose", onWidgetEditorClose);
                const onHtmlEditorRequested = () => htmlEditor.enable();
                htmlEditor.attachToElement(element);
                htmlEditor.setState(ko.unwrap(config));
                eventManager.addEventListener("enableHtmlEditor", onHtmlEditorRequested);
                ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
                    eventManager.removeEventListener("onEscape", onEscapeKeyPressed);
                    eventManager.removeEventListener("onWidgetEditorClose", onWidgetEditorClose);
                    eventManager.removeEventListener("enableHtmlEditor", onHtmlEditorRequested);
                    htmlEditor.detachFromElement();
                });
            }
        };
    }
}
exports.HtmlEditorBindingHandler = HtmlEditorBindingHandler;
//# sourceMappingURL=bindingHandlers.htmlEditor.js.map