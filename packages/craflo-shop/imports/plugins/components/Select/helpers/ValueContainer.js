"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ValueContainer;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * @name ValueContainer
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
function ValueContainer(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: props.selectProps.classes.valueContainer
  }, props.children);
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: _propTypes.default.node,
  selectProps: _propTypes.default.object.isRequired
};