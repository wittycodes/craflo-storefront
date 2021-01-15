"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylesWorkshopSection = void 0;
var StylesWorkshopSection = (function () {
    function StylesWorkshopSection(viewManager) {
        this.viewManager = viewManager;
        this.iconClass = "paperbits-icon paperbits-palette";
        this.title = "Styles";
        this.helpText = "Manage website global styles.";
    }
    StylesWorkshopSection.prototype.onActivate = function () {
        this.viewManager.clearJourney();
        this.viewManager.setHost({ name: "style-guide" });
    };
    return StylesWorkshopSection;
}());
exports.StylesWorkshopSection = StylesWorkshopSection;
