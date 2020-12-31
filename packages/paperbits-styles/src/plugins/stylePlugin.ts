import { Style, StyleRule } from "@paperbits/common/styles";
import { ThemeContract } from "../contracts/themeContract";

export abstract class StylePlugin {
    protected name: string;

    public async configToStyleRules?(pluginConfig: any): Promise<StyleRule[]> {
        return [];
    }

    public async configToNestedStyles?(pluginConfig: any): Promise<Style[]> {
        return [];
    }

    public async configToPseudoStyles?(pluginConfig: any): Promise<Style[]> {
        return [];
    }

    public static parseSize = (value: string | number, fallback: string | number = 0): any => {
        if (value === "auto" || value === "initial" || value === "inherit") {
            return value;
        }

        if (value !== null && value !== undefined) {
            return parseInt(<string>value) + "px";
        }
        else {
            return fallback;
        }
    };

    public setThemeContract?(themeContract: ThemeContract): void;
}