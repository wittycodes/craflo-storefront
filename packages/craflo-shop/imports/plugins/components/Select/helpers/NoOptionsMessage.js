"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoOptionsMessage;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

/**
 * @name NoOptionsMessage
 * @param {Object} props Component props
 * @returns {React.Component} A React Component
 */
function NoOptionsMessage(props) {
  return /*#__PURE__*/_react.default.createElement(_core.Typography, (0, _extends2.default)({
    variant: "caption",
    className: props.selectProps.classes.noOptionsMessage
  }, props.innerProps), props.children);
}

NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: _propTypes.default.node,

  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: _propTypes.default.object,

  /**
   * Props passed to the select, which include classes for the no options message.
   */
  selectProps: _propTypes.default.object.isRequired
};