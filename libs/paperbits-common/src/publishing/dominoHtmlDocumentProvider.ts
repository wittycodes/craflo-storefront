import * as domino from "domino";
import { HtmlDocumentProvider } from "./htmlDocumentProvider";

declare var global: any;

export class DominoHtmlDocumentProvider implements HtmlDocumentProvider {
    public createDocument(html?: string): Document {
        const window = domino.createWindow(html);
        global.window = window;
        global.document = window.document;
        global.navigator = window.navigator;

        return window.document;
    }
}