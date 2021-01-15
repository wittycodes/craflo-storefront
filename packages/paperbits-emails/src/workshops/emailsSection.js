"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsWorkshopSection = void 0;
var EmailsWorkshopSection = (function () {
    function EmailsWorkshopSection(viewManager) {
        this.viewManager = viewManager;
        this.iconClass = "paperbits-icon paperbits-at-sign";
        this.title = "Emails";
    }
    EmailsWorkshopSection.prototype.onActivate = function () {
        this.viewManager.clearJourney();
        var view = {
            heading: this.title,
            helpText: "<h1>Email templates</h1><p>Add or edit your email templates.</p>",
            component: { name: "emails" }
        };
        this.viewManager.openViewAsWorkshop(view);
    };
    return EmailsWorkshopSection;
}());
exports.EmailsWorkshopSection = EmailsWorkshopSection;
