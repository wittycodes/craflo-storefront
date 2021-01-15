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
exports.SecuredBindingHandler = void 0;
const ko = require("knockout");
const user_1 = require("@paperbits/common/user");
class SecuredBindingHandler {
    constructor(eventManager, userService) {
        this.eventManager = eventManager;
        this.userService = userService;
        ko.bindingHandlers["secured"] = {
            update: (element, valueAccessor) => {
                const hiddenObservable = ko.observable(true);
                const dataRoleObservable = ko.observable();
                const applyRoles = () => __awaiter(this, void 0, void 0, function* () {
                    const widgetRoles = ko.unwrap(valueAccessor()) || [user_1.BuiltInRoles.everyone.key];
                    const userRoles = yield this.userService.getUserRoles();
                    const visibleToUser = userRoles.some(x => widgetRoles.includes(x)) || widgetRoles.includes(user_1.BuiltInRoles.everyone.key);
                    const roles = widgetRoles
                        && widgetRoles.length === 1
                        && widgetRoles[0] === user_1.BuiltInRoles.everyone.key
                        ? null
                        : widgetRoles.join(",");
                    dataRoleObservable(roles);
                    hiddenObservable(!visibleToUser);
                });
                this.eventManager.addEventListener("onUserRoleChange", applyRoles);
                ko.applyBindingsToNode(element, {
                    attr: { "data-role": dataRoleObservable },
                    css: { hidden: hiddenObservable }
                }, null);
                ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
                    this.eventManager.removeEventListener("onUserRoleChange", applyRoles);
                });
                applyRoles();
            }
        };
    }
}
exports.SecuredBindingHandler = SecuredBindingHandler;
//# sourceMappingURL=bindingHandlers.secured.js.map