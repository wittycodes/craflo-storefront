"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MultiValue;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx2 = _interopRequireDefault(require("clsx"));

var _Chip = _interopRequireDefault(require("../../Chip"));

/**
 * @name MultiValue
 * @param {Object} props Component props
 * @returns {React.Component} A React Component
 */
function MultiValue(props) {
  return /*#__PURE__*/_react.default.createElement(_Chip.default, {
    size: "small",
    variant: "default",
    color: "secondary",
    label: props.children,
    className: (0, _clsx2.default)(props.selectProps.classes.chip, (0, _defineProperty2.default)({}, props.selectProps.classes.chipFocused, props.isFocused)),
    onDelete: props.removeProps.onClick
  });
}

MultiValue.propTypes = {
  children: _propTypes.default.node,
  isFocused: _propTypes.default.bool.isRequired,
  removeProps: _propTypes.default.shape({
    onClick: _propTypes.default.func.isRequired,
    onMouseDown: _propTypes.default.func.isRequired,
    onTouchEnd: _propTypes.default.func.isRequired
  }).isRequired,
  selectProps: _propTypes.default.object.isRequired
};