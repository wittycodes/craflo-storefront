"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickCounterRuntime = void 0;
const React = require("react");
const runtimeComponent_decorator_1 = require("./runtimeComponent.decorator");
let ClickCounterRuntime = class ClickCounterRuntime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCount: 0
        };
        this.increaseCount = this.increaseCount.bind(this);
    }
    increaseCount() {
        this.setState({ clickCount: this.state.clickCount + 1 });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { className: "text text-align-center" },
                React.createElement("button", { className: "button", onClick: this.increaseCount }, "Click me"),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "clickCount" }, "Click count:"),
                    React.createElement("b", { id: "clickCount" }, this.state.clickCount)))));
    }
};
ClickCounterRuntime = __decorate([
    runtimeComponent_decorator_1.RuntimeComponent({
        selector: "click-counter-runtime"
    }),
    __metadata("design:paramtypes", [Object])
], ClickCounterRuntime);
exports.ClickCounterRuntime = ClickCounterRuntime;
