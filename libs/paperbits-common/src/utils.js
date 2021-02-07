"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureTrailingSlash = exports.ensureLeadingSlash = exports.delay = exports.localizeQuery = exports.closest = exports.matchUrl = exports.getUrlHashPart = exports.camelCaseToKebabCase = exports.getClosestBreakpoint = exports.optimizeBreakpoints = exports.pointerToClientQuadrant = exports.slugify = exports.elementsFromPoint = exports.findNodesRecursively = exports.assign = exports.replace = exports.intersectDeepMany = exports.uint8ArrayToString = exports.stringToUnit8Array = exports.getCookie = exports.isDirectUrl = exports.progressEventToProgress = exports.readDataUrlFromReader = exports.readBlobAsDataUrl = exports.readFileAsByteArray = exports.base64ToArrayBuffer = exports.arrayBufferToBase64 = exports.downloadFile = exports.randomClassName = exports.identifier = exports.guid = void 0;
const deepmerge = require("deepmerge");
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4();
}
exports.guid = guid;
function identifier() {
    let result = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return result;
}
exports.identifier = identifier;
function randomClassName() {
    let result = "";
    const possible = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 10; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return result;
}
exports.randomClassName = randomClassName;
function downloadFile(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";
        xhr.onload = () => resolve(new Uint8Array(xhr.response));
        xhr.open("GET", url);
        xhr.send();
    });
}
exports.downloadFile = downloadFile;
function arrayBufferToBase64(buffer) {
    if (Buffer) {
        return Buffer.from(buffer).toString("base64");
    }
    else {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
}
exports.arrayBufferToBase64 = arrayBufferToBase64;
function base64ToArrayBuffer(base64) {
    const buffer = Buffer.from(base64, "base64");
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
        uint8Array[i] = buffer[i];
    }
    return uint8Array;
}
exports.base64ToArrayBuffer = base64ToArrayBuffer;
function readFileAsByteArray(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.readAsArrayBuffer(file);
    });
}
exports.readFileAsByteArray = readFileAsByteArray;
function readBlobAsDataUrl(blob) {
    return readDataUrlFromReader(reader => reader.readAsDataURL(blob));
}
exports.readBlobAsDataUrl = readBlobAsDataUrl;
function readDataUrlFromReader(read) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        read(reader);
    });
}
exports.readDataUrlFromReader = readDataUrlFromReader;
function progressEventToProgress(progress) {
    return (event) => {
        if (event.lengthComputable) {
            const percentLoaded = Math.round((event.loaded / event.total) * 100);
            progress(percentLoaded);
        }
    };
}
exports.progressEventToProgress = progressEventToProgress;
function isDirectUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:") || url.startsWith("blob:");
}
exports.isDirectUrl = isDirectUrl;
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}
exports.getCookie = getCookie;
function stringToUnit8Array(content) {
    const escstr = encodeURIComponent(content);
    const binstr = escstr.replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(("0x" + p1));
    });
    const bytes = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, (ch, i) => {
        bytes[i] = ch.charCodeAt(0);
    });
    return bytes;
}
exports.stringToUnit8Array = stringToUnit8Array;
function uint8ArrayToString(bytes) {
    const encodedString = String.fromCharCode.apply(null, bytes);
    const decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}
exports.uint8ArrayToString = uint8ArrayToString;
function intersectDeepMany(target, nonObjectHandler, ...sources) {
    let result = target;
    sources.forEach(source => {
        result = this.intersectDeep(result, nonObjectHandler, source);
    });
    return result;
}
exports.intersectDeepMany = intersectDeepMany;
function replace(path, target, value, delimiter = "/") {
    target = JSON.parse(JSON.stringify(target));
    const segments = path.split(delimiter);
    let segmentObject = target;
    let segment;
    let parent = target;
    segments.forEach(s => {
        if (!segmentObject[s]) {
            segmentObject[s] = {};
        }
        parent = segmentObject;
        segmentObject = segmentObject[s];
        segment = s;
    });
    if (segment) {
        parent[segment] = value;
    }
    return target;
}
exports.replace = replace;
function assign(target, source) {
    Object.assign(target, deepmerge(target, source));
}
exports.assign = assign;
function findNodesRecursively(predicate, source) {
    const result = [];
    if (predicate(source)) {
        result.push(source);
    }
    const keys = Object.keys(source);
    keys.forEach(key => {
        const child = source[key];
        if (child instanceof Object) {
            const childResult = findNodesRecursively(predicate, child);
            result.push.apply(result, childResult);
        }
    });
    return result;
}
exports.findNodesRecursively = findNodesRecursively;
function elementsFromPoint(ownerDocument, x, y) {
    if (!x || !y) {
        return [];
    }
    if (ownerDocument.elementsFromPoint) {
        return Array.prototype.slice.call(ownerDocument.elementsFromPoint(Math.floor(x), Math.floor(y)));
    }
    else if (ownerDocument["msElementsFromPoint"]) {
        return Array.prototype.slice.call(ownerDocument["msElementsFromPoint"](Math.floor(x), Math.floor(y)));
    }
    else {
        throw new Error(`Method "elementsFromPoint" not supported by browser.`);
    }
}
exports.elementsFromPoint = elementsFromPoint;
function slugify(text) {
    return text.toString().toLowerCase().trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
exports.slugify = slugify;
function pointerToClientQuadrant(pointerX, pointerY, element) {
    const rect = element.getBoundingClientRect();
    const clientX = pointerX - rect.left;
    const clientY = pointerY - rect.top;
    let vertical;
    let horizontal;
    if (clientX > rect.width / 2) {
        horizontal = "right";
    }
    else {
        horizontal = "left";
    }
    if (clientY > rect.height / 2) {
        vertical = "bottom";
    }
    else {
        vertical = "top";
    }
    return { vertical: vertical, horizontal: horizontal };
}
exports.pointerToClientQuadrant = pointerToClientQuadrant;
function optimizeBreakpoints(breakpoints) {
    const result = {};
    let lastAssigned = null;
    const breakpointKeys = ["xs", "sm", "md", "lg", "xl"];
    breakpointKeys.forEach(breakpoint => {
        const value = breakpoints[breakpoint];
        if (value && value !== lastAssigned) {
            result[breakpoint] = value;
            lastAssigned = value;
        }
    });
    const resultKeys = Object.keys(result);
    if (resultKeys.length === 1) {
        const singleKey = resultKeys[0];
        return result[singleKey];
    }
    return result;
}
exports.optimizeBreakpoints = optimizeBreakpoints;
function getClosestBreakpoint(source, current) {
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];
    let index = breakpoints.indexOf(current);
    let breakpoint = null;
    do {
        breakpoint = breakpoints[index];
        index--;
    } while (!source[breakpoint] && index >= 0);
    return breakpoint;
}
exports.getClosestBreakpoint = getClosestBreakpoint;
function camelCaseToKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().replace(/\s/g, "-");
}
exports.camelCaseToKebabCase = camelCaseToKebabCase;
function getUrlHashPart(urlPath) {
    if (urlPath.indexOf("#") !== -1) {
        return urlPath.split("#")[1];
    }
    return undefined;
}
exports.getUrlHashPart = getUrlHashPart;
function matchUrl(urlPath, urlTemplate) {
    if (urlPath.charAt(0) === "/") {
        urlPath = urlPath.slice(1);
    }
    if (urlTemplate.charAt(0) === "/") {
        urlTemplate = urlTemplate.slice(1);
    }
    if (urlPath.charAt(urlPath.length - 1) === "/") {
        urlPath = urlPath.slice(0, -1);
    }
    if (urlTemplate.charAt(urlTemplate.length - 1) === "/") {
        urlTemplate = urlTemplate.slice(0, -1);
    }
    const pathSegments = urlPath.split("/");
    const templateSegments = urlTemplate.split("/");
    if (pathSegments.length !== templateSegments.length && urlTemplate.indexOf("*") === -1) {
        return undefined;
    }
    const tokens = [];
    templateSegments.filter((t, index) => {
        if (t.charAt(0) === "{") {
            tokens.push({ index: index, name: t.replace(/{|}/g, "") });
        }
    });
    for (let i = 0; i < templateSegments.length; i++) {
        const segment = pathSegments[i];
        const token = tokens.find(t => t.index === i);
        if (!token && (segment === templateSegments[i] || templateSegments[i] === "*")) {
            if (templateSegments[i] === "*") {
                return tokens;
            }
            continue;
        }
        else {
            if (token) {
                const hashIndex = segment.indexOf("#");
                if (hashIndex === 0) {
                    token.value = segment.substring(1);
                }
                else {
                    if (hashIndex > 0) {
                        return undefined;
                    }
                    else {
                        token.value = segment;
                    }
                }
            }
            else {
                if (templateSegments.length - 1 - i <= 1 && segment.indexOf("#") > 0) {
                    tokens.push({ index: -1, name: "#", value: segment.split("#")[1] });
                    return tokens;
                }
                return undefined;
            }
        }
    }
    return tokens;
}
exports.matchUrl = matchUrl;
function closest(node, predicate) {
    do {
        if (predicate(node)) {
            return node;
        }
    } while (node = node && node.parentNode);
}
exports.closest = closest;
function localizeQuery(query, locale) {
    const localizedQuery = query.copy();
    localizedQuery.filters.forEach(x => x.left = `locales/${locale}/${x.left}`);
    if (localizedQuery.orderingBy) {
        localizedQuery.orderingBy = `locales/${locale}/${localizedQuery.orderingBy}`;
    }
    return localizedQuery;
}
exports.localizeQuery = localizeQuery;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
function ensureLeadingSlash(url = "") {
    return url.startsWith("/") ? url : `/${url}`;
}
exports.ensureLeadingSlash = ensureLeadingSlash;
function ensureTrailingSlash(url = "") {
    return url.endsWith("/") ? url : `${url}/`;
}
exports.ensureTrailingSlash = ensureTrailingSlash;
//# sourceMappingURL=utils.js.map