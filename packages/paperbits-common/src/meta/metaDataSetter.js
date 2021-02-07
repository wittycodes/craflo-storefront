"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaDataSetter = void 0;
class MetaDataSetter {
    static setFavIcon(iconUrl) {
        if (!iconUrl) {
            return;
        }
        const link = document.querySelector("link[rel*='icon']");
        if (link) {
            link.type = MetaDataSetter.iconContentType;
            link.rel = "icon";
            link.href = iconUrl;
        }
    }
    static setKeywords(keywords) {
        MetaDataSetter.setMetaElement(keywords, "keywords");
    }
    static setDescription(description) {
        MetaDataSetter.setMetaElement(description, "description");
    }
    static setAuthor(author) {
        MetaDataSetter.setMetaElement(author, "author");
    }
    static setScriptElement(content, type) {
        const existScript = MetaDataSetter.getMetaElement("type", type);
        const script = existScript || document.createElement("script");
        script.setAttribute("type", type);
        script.text = JSON.stringify(content);
        document.head.appendChild(script);
    }
    static setMetaObject(data, attributeName) {
        Object.keys(data).forEach(attrValue => {
            MetaDataSetter.setMetaElement(data[attrValue], undefined, attributeName, attrValue);
        });
    }
    static setMetaElement(content, name, attributeName, attributeValue) {
        const existMeta = name ? MetaDataSetter.getMetaElement("name", name) : MetaDataSetter.getMetaElement(attributeName, attributeValue);
        const meta = existMeta || document.createElement("meta");
        if (name) {
            meta.name = name;
        }
        if (attributeName && attributeValue) {
            meta.setAttribute(attributeName, attributeValue);
        }
        meta.content = content;
        if (!existMeta) {
            document.head.appendChild(meta);
        }
    }
    static getMetaElement(attributeName, attributeValue) {
        return attributeName && attributeValue && document.head.querySelector(`[${attributeName}=${attributeValue}]`);
    }
}
exports.MetaDataSetter = MetaDataSetter;
MetaDataSetter.iconContentType = "image/x-icon";
//# sourceMappingURL=metaDataSetter.js.map