"use strict";
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
exports.VisibilityGuard = void 0;
class VisibilityGuard {
    constructor(userService, eventManager) {
        this.userService = userService;
        this.eventManager = eventManager;
        this.setVisibility();
        this.eventManager.addEventListener("onUserRoleChange", this.setVisibility);
    }
    setVisibility() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRoles = yield this.userService.getUserRoles();
            document.querySelectorAll("[data-role]").forEach((element) => {
                const requiredRolesAttribute = element.getAttribute("data-role");
                const requiredRoles = requiredRolesAttribute.split(",");
                const authorized = userRoles.some(userRole => requiredRoles.includes(userRole));
                if (authorized) {
                    element.classList.remove("hidden");
                }
                else {
                    element.classList.add("hidden");
                }
            });
        });
    }
}
exports.VisibilityGuard = VisibilityGuard;
//# sourceMappingURL=visibilityGuard.js.map