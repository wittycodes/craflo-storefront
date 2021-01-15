"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = exports.isEmpty = exports.findObjects = exports.clone = exports.deleteNodeAt = exports.setValue = exports.setValueWithCompensation = exports.cleanupObject = exports.setStructure = exports.mergeDeepAt = exports.mergeDeep = exports.getObjectAt = exports.isObject = void 0;
function isObject(item) {
    return item !== undefined && (item && typeof item === "object" && !Array.isArray(item));
}
exports.isObject = isObject;
function getObjectAt(path, source, delimiter = "/") {
    const segments = path.split(delimiter);
    let segmentObject = source;
    for (const segment of segments) {
        segmentObject = segmentObject[segment];
        if (segmentObject === null || segmentObject === undefined) {
            return segmentObject;
        }
    }
    return segmentObject;
}
exports.getObjectAt = getObjectAt;
function mergeDeep(target, changeset, removeNulls = false) {
    const reverseChangeset = {};
    if (isObject(target) && isObject(changeset)) {
        Object.keys(changeset).forEach(key => {
            const sourceProperty = changeset[key];
            if (isObject(sourceProperty)) {
                if (target[key] !== undefined && target[key] !== null) {
                    reverseChangeset[key] = mergeDeep(target[key], sourceProperty, removeNulls);
                }
                else {
                    if (target[key] !== sourceProperty) {
                        reverseChangeset[key] = target[key] || null;
                        target[key] = sourceProperty;
                        if (removeNulls) {
                            if (target[key] === null || target[key] === undefined) {
                                delete target[key];
                            }
                        }
                    }
                }
            }
            else {
                if (target[key] !== sourceProperty) {
                    reverseChangeset[key] = target[key] || null;
                    target[key] = sourceProperty;
                    if (removeNulls) {
                        if (target[key] === null || target[key] === undefined) {
                            delete target[key];
                        }
                    }
                }
            }
        });
    }
    return reverseChangeset;
}
exports.mergeDeep = mergeDeep;
function mergeDeepAt(path, target, source, removeNulls = false) {
    if (Array.isArray(source)) {
        setValueWithCompensation(path, target, source);
    }
    else {
        const updatingObject = setStructure(path, target);
        mergeDeep(updatingObject, source, removeNulls);
    }
}
exports.mergeDeepAt = mergeDeepAt;
function setStructure(path, target, delimiter = "/") {
    const segments = path.split(delimiter);
    let segmentObject = target;
    segments.forEach(segment => {
        if (!segmentObject[segment]) {
            segmentObject[segment] = {};
        }
        segmentObject = segmentObject[segment];
    });
    return segmentObject;
}
exports.setStructure = setStructure;
function cleanupObject(source, includingNulls = false, includingEmptyString = false) {
    if (source instanceof Object) {
        Object.keys(source).forEach(key => {
            const child = source[key];
            if (Array.isArray(child)) {
                child.forEach(x => cleanupObject(x, includingNulls, includingEmptyString));
                if (child.length === 0) {
                    source[key] = null;
                    if (includingNulls) {
                        delete source[key];
                    }
                }
            }
            else if (child instanceof Object) {
                cleanupObject(child, includingNulls, includingEmptyString);
                if (Object.keys(child).length === 0) {
                    delete source[key];
                }
            }
            else if (child === undefined || (includingNulls && child === null) || (includingEmptyString && child === "")) {
                delete source[key];
            }
        });
    }
}
exports.cleanupObject = cleanupObject;
function setValueWithCompensation(path, target, value) {
    const original = clone(target);
    const compensation = getObjectAt(path, original);
    setValue(path, target, value);
    return compensation;
}
exports.setValueWithCompensation = setValueWithCompensation;
function setValue(path, target, value) {
    const segments = path.split("/");
    let segmentObject = target;
    for (let i = 0; i < segments.length - 1; i++) {
        const segment = segments[i];
        if (!segmentObject[segment]) {
            segmentObject[segment] = {};
        }
        segmentObject = segmentObject[segment];
    }
    segmentObject[segments[segments.length - 1]] = value;
}
exports.setValue = setValue;
function deleteNodeAt(path, target) {
    const segments = path.split("/");
    let segmentObject = target;
    for (let i = 0; i < segments.length - 1; i++) {
        const segment = segments[i];
        if (!segmentObject[segment]) {
            segmentObject[segment] = {};
        }
        segmentObject = segmentObject[segment];
    }
    delete segmentObject[segments[segments.length - 1]];
}
exports.deleteNodeAt = deleteNodeAt;
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.clone = clone;
function findObjects(source, predicate) {
    let result = [];
    const keys = Object.keys(source);
    for (const key of keys) {
        const node = source[key];
        if (predicate(node)) {
            result.push(node);
        }
        else {
            const childResult = findObjects(node, predicate);
            result = result.concat(childResult);
        }
    }
    return result;
}
exports.findObjects = findObjects;
function isEmpty(source) {
    return !source || Object.keys(source).length === 0;
}
exports.isEmpty = isEmpty;
function deepFreeze(obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    for (const name of propNames) {
        const value = obj[name];
        if (value && typeof value === "object") {
            this.deepFreeze(value);
        }
    }
    Object.freeze(obj);
}
exports.deepFreeze = deepFreeze;
//# sourceMappingURL=objects.js.map