"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
const ko = require("knockout");
class Toast {
    constructor(title, content, state = "progress", progress = 0, commands = []) {
        this.title = ko.observable(title);
        this.content = ko.observable(content);
        this.progress = ko.observable();
        this.progress.subscribe(this.onProgressUpdate.bind(this));
        this.state = ko.observable(state);
        this.commands = ko.observableArray(commands);
        this.progress(progress);
    }
    onProgressUpdate(progress) {
        if (progress === 100) {
            this.state("success");
        }
    }
}
exports.Toast = Toast;
//# sourceMappingURL=toast.js.map