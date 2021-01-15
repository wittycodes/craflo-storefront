"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
function registerStringTemplateEngine() {
    const templates = {};
    const data = {};
    const engine = new ko.nativeTemplateEngine();
    ko.templateSources["stringTemplate"] = function (template) {
        this.templateName = template;
    };
    ko.utils.extend(ko.templateSources["stringTemplate"].prototype, {
        data: function (key, value) {
            data[this.templateName] = data[this.templateName] || {};
            if (arguments.length === 1) {
                return data[this.templateName][key];
            }
            data[this.templateName][key] = value;
        },
        text: function (value) {
            if (arguments.length === 0) {
                return templates[this.templateName];
            }
            templates[this.templateName] = value;
        }
    });
    engine.makeTemplateSource = function (template, doc) {
        let elem;
        if (typeof template === "string") {
            elem = (doc || document).getElementById(template);
            if (elem) {
                return new ko.templateSources.domElement(elem);
            }
            return new ko.templateSources["stringTemplate"](template);
        }
        else if (template && (template.nodeType === 1) || (template.nodeType === 8)) {
            return new ko.templateSources.anonymousTemplate(template);
        }
    };
    ko["templates"] = templates;
    ko.setTemplateEngine(engine);
}
registerStringTemplateEngine();
//# sourceMappingURL=stringTemplateEngine.js.map