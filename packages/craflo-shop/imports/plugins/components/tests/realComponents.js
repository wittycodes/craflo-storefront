"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Button = _interopRequireDefault(require("../Button"));

/**
 * This components context is for tests that need the real components
 * available, in order to test event handling and such.
 */
var _default = {
  Button: _Button.default
};
exports.default = _default;