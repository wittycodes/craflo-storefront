"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Input;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * @name Input
 * @param {Function } inputRef Input reference
 * @param {Object} props Component props
 * @returns {React.Component} A React Component
 */
function Input(_ref) {
  var inputRef = _ref.inputRef,
      props = (0, _objectWithoutProperties2.default)(_ref, ["inputRef"]);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    ref: inputRef
  }, props));
}

Input.propTypes = {
  inputRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.any.isRequired
  })])
};