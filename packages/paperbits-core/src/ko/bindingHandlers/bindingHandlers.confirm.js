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
const ko = require("knockout");
ko.bindingHandlers["confirm"] = {
    init: (element, valueAccessor) => {
        const observable = ko.unwrap(valueAccessor());
        const message = observable.message;
        const onConfirm = observable.onConfirm;
        let balloon;
        ko.applyBindingsToNode(element, {
            balloon: {
                component: {
                    name: "confirmation",
                    params: {
                        getMessage: () => __awaiter(void 0, void 0, void 0, function* () {
                            return message;
                        }),
                        onConfirm: () => __awaiter(void 0, void 0, void 0, function* () {
                            onConfirm();
                        }),
                        onDecline: () => {
                            balloon.close();
                        }
                    }
                },
                onCreated: (balloonHandle) => {
                    balloon = balloonHandle;
                },
                position: "top"
            }
        }, null);
    }
};
//# sourceMappingURL=bindingHandlers.confirm.js.map