String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
};
Array.prototype.remove = function (item) {
    const index = this.indexOf(item);
    if (index < 0) {
        return;
    }
    this.splice(index, 1);
};
//# sourceMappingURL=extensions.js.map