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
exports.BlockSelector = void 0;
const blockSelector_html_1 = require("./blockSelector.html");
const ko = require("knockout");
const blockItem_1 = require("./blockItem");
const blocks_1 = require("@paperbits/common/blocks");
const decorators_1 = require("@paperbits/common/ko/decorators");
const modelBinderSelector_1 = require("@paperbits/common/widgets/modelBinderSelector");
const viewModelBinderSelector_1 = require("../../../ko/viewModelBinderSelector");
const consts_1 = require("@paperbits/common/ko/consts");
const styles_1 = require("@paperbits/common/styles");
let BlockSelector = class BlockSelector {
    constructor(blockService, modelBinderSelector, viewModelBinderSelector) {
        this.blockService = blockService;
        this.modelBinderSelector = modelBinderSelector;
        this.viewModelBinderSelector = viewModelBinderSelector;
        this.blocks = ko.observableArray();
        this.widgets = ko.observableArray();
        this.searchPattern = ko.observable();
        this.working = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchBlocks();
            this.searchPattern
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.searchBlocks);
        });
    }
    searchBlocks(searchPattern = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const blocks = yield this.blockService.search(this.blockType, searchPattern);
            const blockItems = [];
            for (const block of blocks) {
                const content = yield this.blockService.getBlockContent(block.key, this.blockType);
                if (!content.type) {
                    content.type = block.type;
                }
                const styleManager = new styles_1.StyleManager();
                const bindingContext = {
                    styleManager: styleManager
                };
                const modelBinder = this.modelBinderSelector.getModelBinderByContract(content);
                const model = yield modelBinder.contractToModel(content);
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(model);
                const widget = yield widgetViewModelBinder.modelToViewModel(model, null, bindingContext);
                blockItems.push(new blockItem_1.BlockItem(block, widget, styleManager));
            }
            this.blocks(blockItems);
            this.working(false);
        });
    }
    selectBlock(block) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.onSelect) {
                this.onSelect({ block: block.toBlock(), blockType: this.blockType });
            }
        });
    }
    deleteBlock(block, event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.stopImmediatePropagation();
            if (block && this.blockType === blocks_1.BlockType.saved) {
                yield this.blockService.deleteBlock(block.toBlock());
                yield this.searchBlocks(this.searchPattern());
            }
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", String)
], BlockSelector.prototype, "blockType", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], BlockSelector.prototype, "onSelect", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockSelector.prototype, "initialize", null);
BlockSelector = __decorate([
    decorators_1.Component({
        selector: "block-selector",
        template: blockSelector_html_1.default
    }),
    __metadata("design:paramtypes", [Object, modelBinderSelector_1.ModelBinderSelector,
        viewModelBinderSelector_1.ViewModelBinderSelector])
], BlockSelector);
exports.BlockSelector = BlockSelector;
//# sourceMappingURL=blockSelector.js.map