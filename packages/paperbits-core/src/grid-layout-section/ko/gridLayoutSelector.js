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
exports.GridLayoutSelector = void 0;
const ko = require("knockout");
const Utils = require("@paperbits/common");
const Constants = require("@paperbits/common/constants");
const gridLayoutSelector_html_1 = require("./gridLayoutSelector.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const grid_layout_section_1 = require("../../grid-layout-section");
const section_1 = require("../../section");
const _1 = require(".");
const blocks_1 = require("@paperbits/common/blocks");
const modelBinderSelector_1 = require("@paperbits/common/widgets/modelBinderSelector");
let GridLayoutSelector = class GridLayoutSelector {
    constructor(gridModelBinder, gridViewModelBinder, modelBinderSelector, blockService, httpClient) {
        this.gridModelBinder = gridModelBinder;
        this.gridViewModelBinder = gridViewModelBinder;
        this.modelBinderSelector = modelBinderSelector;
        this.blockService = blockService;
        this.httpClient = httpClient;
        this.heading = ko.observable();
        this.selectLayout = this.selectLayout.bind(this);
        this.snippets = ko.observableArray();
        this.selected = ko.observable();
        this.working = ko.observable(true);
        this.isBlocksEnabled = ko.observable();
    }
    initaialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const snippets = [];
            const response = yield this.httpClient.send({ method: "GET", url: Constants.gridSnippetsLibraryUrl });
            const presets = response.toObject();
            for (const preset of Utils.clone(presets)) {
                const model = yield this.gridModelBinder.contractToModel(preset);
                const viewModel = yield this.gridViewModelBinder.modelToViewModel(model);
                snippets.push(viewModel);
            }
            this.snippets(snippets);
            const blocksUrl = Constants.blockSnippetsLibraryUrl;
            this.isBlocksEnabled(blocksUrl ? true : false);
            this.working(false);
        });
    }
    selectLayout(viewModel) {
        const sectionModel = new section_1.SectionModel();
        sectionModel.widgets = [viewModel["widgetBinding"].model];
        const gridModel = sectionModel.widgets[0];
        const styles = gridModel.styles.instance;
        styles["size"] = {
            sm: {
                maxWidth: 540
            },
            md: {
                maxWidth: 720
            },
            lg: {
                maxWidth: 960
            },
            xl: {
                maxWidth: 1140
            }
        };
        styles["margin"] = {
            xs: {
                top: 10,
                left: "auto",
                right: "auto",
                bottom: 10
            },
            md: {
                top: 15,
                bottom: 15
            },
            xl: {
                top: 25,
                bottom: 25
            }
        };
        gridModel.widgets.forEach(x => {
            x.styles.instance["padding"] = {
                xs: {
                    top: 5,
                    left: 5,
                    right: 5,
                    bottom: 5
                },
                md: {
                    top: 15,
                    left: 15,
                    right: 15,
                    bottom: 15
                }
            };
        });
        if (this.onSelect) {
            this.onSelect(sectionModel);
        }
    }
    onBlockSelected(updateBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield this.blockService.getBlockContent(updateBlock.block.key, updateBlock.blockType);
            const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
            const model = yield modelBinder.contractToModel(contract);
            if (this.onSelect) {
                this.onSelect(model);
            }
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], GridLayoutSelector.prototype, "heading", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], GridLayoutSelector.prototype, "onSelect", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GridLayoutSelector.prototype, "initaialize", null);
GridLayoutSelector = __decorate([
    decorators_1.Component({
        selector: "grid-layout-selector",
        template: gridLayoutSelector_html_1.default
    }),
    __metadata("design:paramtypes", [grid_layout_section_1.GridModelBinder,
        _1.GridViewModelBinder,
        modelBinderSelector_1.ModelBinderSelector,
        blocks_1.BlockService, Object])
], GridLayoutSelector);
exports.GridLayoutSelector = GridLayoutSelector;
//# sourceMappingURL=gridLayoutSelector.js.map