import * as ko from "knockout";
import * as opentype from "opentype.js";
import template from "./glyph-import.html";
import { Component, Param, Event, OnMounted } from "@paperbits/common/ko/decorators";
import { OpenTypeFontGlyph } from "../../../openType/openTypeFontGlyph";
import { OpenTypeFont } from "../../../openType/openTypeFont";
import { ChangeRateLimit } from "@paperbits/common/ko/consts";
import { FontContract } from "../../../contracts";


export interface GlyphItem {
    name: string;
    font: OpenTypeFont;
    glyph: OpenTypeFontGlyph;
}

@Component({
    selector: "glyph-import",
    template: template
})
export class GlyphImport {
    public readonly working: ko.Observable<boolean>;
    private originalCategories: any;
    public glyphs: ko.ObservableArray;
    public allGlyphs: any[];
    public pages: ko.ObservableArray;

    public readonly categories: ko.Observable<{ name: string, items: any[] }[]>;

    constructor() {
        this.working = ko.observable(true);
        this.glyphs = ko.observableArray([]);
        this.allGlyphs = [];
        this.pages = ko.observableArray();
        this.fonts = ko.observableArray();
        this.searchPattern = ko.observable("");
        this.selectGlyph = this.selectGlyph.bind(this);
        this.showFontNames = ko.observable();
        this.categories = ko.observable<{ name: string, font: any, items: any[] }[]>();
    }

    @Param()
    public fonts: ko.ObservableArray<FontContract>;

    @Param()
    public searchPattern: ko.Observable<string>;

    @Param()
    public showFontNames: ko.Observable<boolean>;

    @Event()
    public onSelect: (glyph: any) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        await this.loadWidgetOrders();

        this.searchPattern
            .extend(ChangeRateLimit)
            .subscribe(this.searchIcons);
    }

    private async loadWidgetOrders(): Promise<void> {
        this.working(true);

        const fonts = this.fonts();
        const groups = [];

        for (const font of fonts) {
            const fontUrl = font.variants[0].file;
            const openTypeFont = await opentype.load(fontUrl, null, { lowMemory: false });
            const glyphs: GlyphItem[] = [];

            this.parseLigatures(openTypeFont);

            for (let index = 0; index < openTypeFont.numGlyphs; index++) {
                const glyph: OpenTypeFontGlyph = openTypeFont.glyphs.get(index);

                if (!glyph.unicode || glyph.unicode.toString().length < 4) {
                    continue;
                }

                glyphs.push({
                    font: openTypeFont,
                    glyph: glyph,
                    name: glyph.name
                });
            }

            groups.push({
                name: font.displayName,
                font: openTypeFont,
                items: glyphs
            });
        }

        this.originalCategories = groups;

        this.searchIcons();
    }

    private searchIcons(pattern: string = ""): void {
        this.working(true);
        pattern = pattern.toLowerCase();

        const filteredCategories = this.originalCategories
            .map(category => ({
                name: category.name,
                font: category.font,
                items: category.items.filter(glyph => glyph.name.toLowerCase().includes(pattern))
            }))
            .filter(category => category.items.length > 0);

        this.categories(filteredCategories);
        this.working(false);
    }

    public async selectGlyph(glyphItem: GlyphItem): Promise<void> {
        if (this.onSelect) {
            this.onSelect(glyphItem.glyph);
        }
    }

    public parseLigatures(font: OpenTypeFont): void {
        if (!font.tables.gsub) {
            return;
        }

        const glyphIndexMap = font.tables.cmap.glyphIndexMap;
        const reverseGlyphIndexMap = {};

        Object.keys(glyphIndexMap).forEach((key: string) => {
            const value = glyphIndexMap[key];
            reverseGlyphIndexMap[value] = key;
        });

        font.tables.gsub.lookups.forEach((lookup) => {
            lookup.subtables.forEach((subtable) => {
                if (subtable.coverage.format === 1) {
                    subtable.ligatureSets.forEach((set, i) => {
                        set.forEach((ligature) => {
                            let coverage1 = subtable.coverage.glyphs[i];
                            coverage1 = reverseGlyphIndexMap[coverage1];
                            coverage1 = parseInt(coverage1);

                            const components = ligature.components.map((component) => {
                                component = reverseGlyphIndexMap[component];
                                component = parseInt(component);
                                return String.fromCharCode(component);
                            });
                            const name = String.fromCharCode(coverage1) + components.join("");
                            const glyph = font.glyphs.get(ligature.ligGlyph);
                            glyph.name = name;
                        });
                    });
                }
                else {
                    subtable.ligatureSets.forEach((set, i) => {
                        set.forEach((ligature) => {
                            const coverage2 = [];
                            subtable.coverage.ranges.forEach((coverage) => {
                                for (let i = coverage.start; i <= coverage.end; i++) {
                                    let character = reverseGlyphIndexMap[i];
                                    character = parseInt(character);
                                    coverage2.push(String.fromCharCode(character));
                                }
                            });

                            const components = ligature.components.map((component) => {
                                component = reverseGlyphIndexMap[component];
                                component = parseInt(component);
                                return String.fromCharCode(component);
                            });

                            const name = coverage2[i] + components.join("");
                            const glyph = font.glyphs.get(ligature.ligGlyph);
                            glyph.name = name;
                        });
                    });
                }
            });
        });
    }
}