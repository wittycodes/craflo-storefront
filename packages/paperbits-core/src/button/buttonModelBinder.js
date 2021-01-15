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
exports.ButtonModelBinder = void 0;
const buttonModel_1 = require("./buttonModel");
const user_1 = require("@paperbits/common/user");
class ButtonModelBinder {
    constructor(permalinkResolver) {
        this.permalinkResolver = permalinkResolver;
    }
    canHandleContract(contract) {
        return contract.type === "button";
    }
    canHandleModel(model) {
        return model instanceof buttonModel_1.ButtonModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new buttonModel_1.ButtonModel();
            model.label = contract.label;
            model.roles = contract.roles || [user_1.BuiltInRoles.everyone.key];
            model.styles = contract.styles || { appearance: "components/button/default" };
            model.iconKey = contract.iconKey;
            if (contract.hyperlink) {
                model.hyperlink = yield this.permalinkResolver.getHyperlinkFromContract(contract.hyperlink);
            }
            return model;
        });
    }
    modelToContract(model) {
        const roles = model.roles
            && model.roles.length === 1
            && model.roles[0] === user_1.BuiltInRoles.everyone.key
            ? null
            : model.roles;
        const buttonConfig = {
            type: "button",
            label: model.label,
            styles: model.styles,
            roles: roles,
            iconKey: model.iconKey
        };
        if (model.hyperlink) {
            buttonConfig.hyperlink = {
                target: model.hyperlink.target,
                targetKey: model.hyperlink.targetKey
            };
        }
        return buttonConfig;
    }
}
exports.ButtonModelBinder = ButtonModelBinder;
//# sourceMappingURL=buttonModelBinder.js.map