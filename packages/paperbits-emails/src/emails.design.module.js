"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsDesignModule = void 0;
var emails_module_1 = require("./emails.module");
var emails_1 = require("./workshops/emails/ko/emails");
var ko_1 = require("./workshops/emails/ko");
var rowEditor_module_1 = require("./row/ko/rowEditor.module");
var columnEditor_module_1 = require("./column/ko/columnEditor.module");
var sectionEditor_module_1 = require("./section/ko/sectionEditor.module");
var emailsSection_1 = require("./workshops/emailsSection");
var EmailsDesignModule = (function () {
    function EmailsDesignModule() {
    }
    EmailsDesignModule.prototype.register = function (injector) {
        injector.bindModule(new emails_module_1.EmailsModule());
        injector.bind("emailsWorkshop", emails_1.EmailsWorkshop);
        injector.bind("emailDetailsWorkshop", ko_1.EmailDetailsWorkshop);
        injector.bind("emailSelector", ko_1.EmailSelector);
        injector.bind("emailHost", ko_1.EmailHost);
        injector.bindModule(new rowEditor_module_1.RowEditorModule());
        injector.bindModule(new columnEditor_module_1.ColumnEditorModule());
        injector.bindModule(new sectionEditor_module_1.SectionEditorModule());
        injector.bindToCollection("workshopSections", emailsSection_1.EmailsWorkshopSection);
    };
    return EmailsDesignModule;
}());
exports.EmailsDesignModule = EmailsDesignModule;
