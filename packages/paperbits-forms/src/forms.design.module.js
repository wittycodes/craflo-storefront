"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsDesignModule = void 0;
var forms_module_1 = require("./forms.module");
var formEditor_module_1 = require("./form/ko/formEditor.module");
var submitEditor_module_1 = require("./submit/ko/submitEditor.module");
var ko_1 = require("./text-input/ko");
var ko_2 = require("./password-input/ko");
var ko_3 = require("./email-input/ko");
var ko_4 = require("./date-input/ko");
var ko_5 = require("./time-input/ko");
var ko_6 = require("./url-input/ko");
var ko_7 = require("./number-input/ko");
var ko_8 = require("./multiline-input/ko");
var ko_9 = require("./checkbox/ko");
var ko_10 = require("./range-input/ko");
var ko_11 = require("./select/ko");
var FormsDesignModule = (function () {
    function FormsDesignModule() {
    }
    FormsDesignModule.prototype.register = function (injector) {
        injector.bindModule(new forms_module_1.FormsModule());
        injector.bindModule(new formEditor_module_1.FormEditorModule());
        injector.bindModule(new submitEditor_module_1.SubmitEditorModule());
        injector.bindModule(new ko_1.TextInputEditorModule());
        injector.bindModule(new ko_2.PasswordInputDesignModule());
        injector.bindModule(new ko_3.EmailInputDesignModule());
        injector.bindModule(new ko_4.DateInputDesignModule());
        injector.bindModule(new ko_5.TimeInputDesignModule());
        injector.bindModule(new ko_6.UrlInputDesignModule());
        injector.bindModule(new ko_7.NumberInputDesignModule());
        injector.bindModule(new ko_8.MultilineInputDesignModule());
        injector.bindModule(new ko_9.CheckboxDesignModule());
        injector.bindModule(new ko_10.RangeInputDesignModule());
        injector.bindModule(new ko_11.SelectInputDesignModule());
    };
    return FormsDesignModule;
}());
exports.FormsDesignModule = FormsDesignModule;
