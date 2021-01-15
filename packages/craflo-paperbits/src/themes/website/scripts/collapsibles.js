"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@paperbits/common");
const collapsibleSelector = ".collapsible";
const collapsibleToggleSelector = "[data-toggle]";
const collapsibleExpandedClass = "expanded";
const collapsibleExpandedAriaAttr = "exaria-expanded";
const selfAndParents = (element) => {
    const elements = [element];
    while (element.parentElement && element.parentElement.tagName !== "BODY") {
        elements.push(element.parentElement);
        element = element.parentElement;
    }
    return elements;
};
const onClick = (event) => {
    if (event.which !== 1) {
        return;
    }
    onActivate();
};
const onKeyDown = (event) => {
    if (event.keyCode !== common_1.Keys.Enter && event.keyCode !== common_1.Keys.Space) {
        return;
    }
    onActivate();
};
const onActivate = () => {
    const target = event.target;
    const collapsibles = Array.prototype.slice.call(document.querySelectorAll(collapsibleSelector));
    let toggleElement;
    if (target.closest) {
        toggleElement = target.closest(collapsibleToggleSelector);
    }
    const exclude = selfAndParents(target);
    if (toggleElement) {
        const collapsible = toggleElement.closest(collapsibleSelector);
        if (collapsible) {
            collapsible.classList.toggle(collapsibleExpandedClass);
        }
        const expanded = collapsible.classList.contains(collapsibleExpandedClass);
        toggleElement.setAttribute(collapsibleExpandedAriaAttr, expanded.toString());
    }
    collapsibles.forEach(x => {
        if (!exclude.includes(x)) {
            x.classList.remove(collapsibleExpandedClass);
            const toggleElement = x.querySelector(collapsibleToggleSelector);
            if (toggleElement) {
                toggleElement.setAttribute(collapsibleExpandedAriaAttr, "false");
            }
        }
    });
};
document.addEventListener("click", onClick, true);
document.addEventListener("keydown", onKeyDown, true);