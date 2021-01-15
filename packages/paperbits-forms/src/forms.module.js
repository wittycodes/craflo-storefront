"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsModule = void 0;
var form_module_1 = require("./form/ko/form.module");
var submit_module_1 = require("./submit/ko/submit.module");
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
var FormsModule = (function () {
    function FormsModule() {
    }
    FormsModule.prototype.register = function (injector) {
        injector.bindModule(new form_module_1.FormModule());
        injector.bindModule(new submit_module_1.SubmitModule());
        injector.bindModule(new ko_1.TextInputModule());
        injector.bindModule(new ko_2.PasswordInputModule());
        injector.bindModule(new ko_3.EmailInputModule());
        injector.bindModule(new ko_4.DateInputModule());
        injector.bindModule(new ko_5.TimeInputModule());
        injector.bindModule(new ko_6.UrlInputModule());
        injector.bindModule(new ko_7.NumberInputModule());
        injector.bindModule(new ko_8.MultilineInputModule());
        injector.bindModule(new ko_9.CheckboxModule());
        injector.bindModule(new ko_10.RangeInputModule());
        injector.bindModule(new ko_11.SelectInputModule());
    };
    return FormsModule;
}());
exports.FormsModule = FormsModule;
