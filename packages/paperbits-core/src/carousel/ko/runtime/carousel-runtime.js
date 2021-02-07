"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselHTMLElement = void 0;
const common_1 = require("@paperbits/common");
class CarouselHTMLElement extends HTMLElement {
    constructor() {
        super();
        this.setActiveItem = (index) => {
            this.style.setProperty("--slide", index.toString());
            const activeIndicator = this.querySelector(".carousel-indicator.active");
            if (activeIndicator) {
                activeIndicator.classList.remove("active");
            }
            setImmediate(() => {
                const carouselIndicators = common_1.coerce(this.querySelectorAll(".carousel-indicator"));
                carouselIndicators[index].classList.add("active");
            });
        };
        const activeSlideAttr = this.getAttribute("data-active-slide");
        this.currentSlideIndex = !!activeSlideAttr
            ? parseInt(activeSlideAttr)
            : 0;
    }
    static get observedAttributes() {
        return ["data-active-slide"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name !== "data-active-slide") {
            return;
        }
        if (!newValue || oldValue === newValue) {
            return;
        }
        this.currentSlideIndex = parseInt(newValue);
        this.setActiveItem(this.currentSlideIndex);
    }
    connectedCallback() {
        const element = this;
        const prev = () => {
            const carouselItems = common_1.coerce(element.querySelectorAll(".carousel-item"));
            this.currentSlideIndex--;
            if (this.currentSlideIndex < 0) {
                this.currentSlideIndex = carouselItems.length - 1;
            }
            this.setActiveItem(this.currentSlideIndex);
        };
        const next = () => {
            const carouselItems = common_1.coerce(element.querySelectorAll(".carousel-item"));
            this.currentSlideIndex++;
            if (this.currentSlideIndex >= carouselItems.length) {
                this.currentSlideIndex = 0;
            }
            this.setActiveItem(this.currentSlideIndex);
        };
        const prevButton = element.querySelector(".carousel-control-prev");
        prevButton.onclick = prev;
        const nextButton = element.querySelector(".carousel-control-next");
        nextButton.onclick = next;
    }
}
exports.CarouselHTMLElement = CarouselHTMLElement;
//# sourceMappingURL=carousel-runtime.js.map