"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LruCache = void 0;
class LruCache {
    constructor(maxSize = 10000, onEvict) {
        this.maxSize = maxSize;
        this.onEvict = onEvict;
        this.nodeMap = {};
    }
    getItem(key) {
        const item = this.nodeMap[key];
        if (!item) {
            return null;
        }
        this.pop(item);
        return item.value;
    }
    setItem(key, value) {
        const item = this.nodeMap[key];
        if (item) {
            item.value = value;
            this.pop(item);
        }
        else {
            this.insert(key, value);
        }
    }
    clear() {
        this.head = null;
        this.nodeMap = {};
    }
    removeItem(key) {
        const item = this.nodeMap[key];
        this.remove(item);
    }
    removeWhere(predicate) {
        let item = this.head;
        if (!item) {
            return;
        }
        do {
            if (predicate(item.key, item.value)) {
                this.removeItem(item.key);
            }
        } while ((item = item.next) !== null);
    }
    getKeys() {
        const result = new Array();
        let item = this.head;
        if (!item) {
            return result;
        }
        do {
            result.push(item.key);
        } while ((item = item.next) !== null);
        return result;
    }
    size() {
        return Object.keys(this.nodeMap).length;
    }
    pop(item) {
        if (item === this.head) {
            return;
        }
        item.prev.next = item.next;
        if (item.next) {
            item.next.prev = item.prev;
        }
        else {
            this.tail = item.prev;
        }
        item.next = this.head;
        this.head.prev = item;
        item.prev = null;
        this.head = item;
    }
    insert(key, value) {
        if (Object.keys(this.nodeMap).length === this.maxSize) {
            const tail = this.tail;
            this.remove(tail);
            if (this.onEvict) {
                this.onEvict(tail.key, tail.value);
            }
        }
        if (!this.head) {
            this.head = {
                key: key,
                value: value,
                prev: null,
                next: null
            };
            this.tail = this.head;
        }
        else {
            this.head = {
                key: key,
                value: value,
                prev: null,
                next: this.head
            };
            this.head.next.prev = this.head;
        }
        this.nodeMap[key] = this.head;
    }
    remove(item) {
        if (!item) {
            return;
        }
        delete this.nodeMap[item.key];
        if (!this.head) {
            return;
        }
        if (this.head === item) {
            this.head = item.next;
            this.head.prev = null;
            return;
        }
        if (this.tail === item) {
            this.tail = this.tail.prev;
            this.tail.next = null;
            return;
        }
        item.prev.next = item.next;
        item.next.prev = item.prev;
    }
}
exports.LruCache = LruCache;
//# sourceMappingURL=lruCache.js.map