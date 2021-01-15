"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AddBlockDialog = void 0;
const addBlockDialog_html_1 = require("./addBlockDialog.html");
const ko = require("knockout");
const blocks_1 = require("@paperbits/common/blocks");
const decorators_1 = require("@paperbits/common/ko/decorators");
const modelBinderSelector_1 = require("@paperbits/common/widgets/modelBinderSelector");
let AddBlockDialog = class AddBlockDialog {
    constructor(blockService, modelBinderSelector, viewManager) {
        this.blockService = blockService;
        this.modelBinderSelector = modelBinderSelector;
        this.viewManager = viewManager;
        this.addBlock = this.addBlock.bind(this);
        this.working = ko.observable(false);
        this.name = ko.observable();
        this.name.extend({ required: true });
        this.description = ko.observable();
    }
    addBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.name()) {
                return;
            }
            if (!this.modelBinder) {
                this.modelBinder = this.modelBinderSelector.getModelBinderByModel(this.blockModel);
            }
            const content = this.modelBinder.modelToContract(this.blockModel);
            yield this.blockService.createBlock(this.name(), this.description() || "", content, this.blockType);
            this.viewManager.notifySuccess("Blocks", "Block added to library.");
            if (this.onClose) {
                this.onClose();
            }
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Object)
], AddBlockDialog.prototype, "blockModel", void 0);
__decorate([
    decorators_1.Param(),
    __metadata("design:type", String)
], AddBlockDialog.prototype, "blockType", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], AddBlockDialog.prototype, "onClose", void 0);
AddBlockDialog = __decorate([
    decorators_1.Component({
        selector: "add-block-dialog",
        template: addBlockDialog_html_1.default
    }),
    __metadata("design:paramtypes", [Object, modelBinderSelector_1.ModelBinderSelector, Object])
], AddBlockDialog);
exports.AddBlockDialog = AddBlockDialog;
//# sourceMappingURL=addBlockDialog.js.map