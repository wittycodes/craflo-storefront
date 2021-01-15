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
exports.Hinter = void 0;
class Hinter {
    constructor(eventManager, viewManager, router, layoutService) {
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.router = router;
        this.layoutService = layoutService;
        this.noHints = false;
        this.eventManager.addEventListener("DesignTimeNavigationHint", this.showDesignTimeNavigationHint.bind(this));
        this.eventManager.addEventListener("InactiveLayoutHint", this.showInactiveLayoutHint.bind(this));
    }
    showDesignTimeNavigationHint() {
        if (this.noHints) {
            return;
        }
        this.noHints = true;
        this.viewManager.notifyInfo("Did you know?", `When you're in the administrative view, you still can navigate any website hyperlinks by holding CTRL or ⌘ key and clicking on it.`);
        setTimeout(() => this.noHints = false, 8000);
    }
    showInactiveLayoutHint() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.noHints) {
                return;
            }
            this.noHints = true;
            const url = this.router.getPath();
            const layoutContract = yield this.layoutService.getLayoutByPermalink(url);
            this.viewManager.notifyInfo("Did you know?", `This section is a part of "<b>${layoutContract.title}</b>" layout. Would you like to open it for editing?`, [{
                    title: "Edit layout",
                    iconClass: "paperbits-edit-72",
                    action: () => __awaiter(this, void 0, void 0, function* () {
                        this.viewManager.setHost({ name: "layout-host", params: { layoutKey: layoutContract.key } });
                    })
                }]);
            setTimeout(() => this.noHints = false, 8000);
        });
    }
}
exports.Hinter = Hinter;
//# sourceMappingURL=hinter.js.map