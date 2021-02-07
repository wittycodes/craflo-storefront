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
exports.SectionLayoutSelector = void 0;
const sectionLayoutSelector_html_1 = require("./sectionLayoutSelector.html");
const modelBinderSelector_1 = require("@paperbits/common/widgets/modelBinderSelector");
const decorators_1 = require("@paperbits/common/ko/decorators");
const sectionModel_1 = require("../sectionModel");
const blocks_1 = require("@paperbits/common/blocks");
let SectionLayoutSelector = class SectionLayoutSelector {
    constructor(modelBinderSelector, blockService) {
        this.modelBinderSelector = modelBinderSelector;
        this.blockService = blockService;
        this.selectSectionLayout = this.selectSectionLayout.bind(this);
        this.onBlockSelected = this.onBlockSelected.bind(this);
    }
    selectSectionLayout() {
        const sectionModel = new sectionModel_1.SectionModel();
        if (this.onSelect) {
            this.onSelect(sectionModel);
        }
    }
    onBlockSelected(block) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield this.blockService.getBlockContent(block.key);
            const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
            const model = yield modelBinder.contractToModel(contract);
            if (this.onSelect) {
                this.onSelect(model);
            }
        });
    }
};
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], SectionLayoutSelector.prototype, "onSelect", void 0);
SectionLayoutSelector = __decorate([
    decorators_1.Component({
        selector: "section-layout-selector",
        template: sectionLayoutSelector_html_1.default
    }),
    __metadata("design:paramtypes", [modelBinderSelector_1.ModelBinderSelector,
        blocks_1.BlockService])
], SectionLayoutSelector);
exports.SectionLayoutSelector = SectionLayoutSelector;
//# sourceMappingURL=sectionLayoutSelector.js.map