"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsModule = void 0;
var emailService_1 = require("./emailService");
var layout_module_1 = require("./layout/ko/layout.module");
var column_module_1 = require("./column/ko/column.module");
var row_module_1 = require("./row/ko/row.module");
var section_module_1 = require("./section/ko/section.module");
require("./ko/bindingHandler.tableCell");
var EmailsModule = (function () {
    function EmailsModule() {
    }
    EmailsModule.prototype.register = function (injector) {
        injector.bindSingleton("emailService", emailService_1.EmailService);
        injector.bindModule(new layout_module_1.LayoutModule());
        injector.bindModule(new column_module_1.ColumnModule());
        injector.bindModule(new row_module_1.RowModule());
        injector.bindModule(new section_module_1.SectionModule());
    };
    return EmailsModule;
}());
exports.EmailsModule = EmailsModule;
