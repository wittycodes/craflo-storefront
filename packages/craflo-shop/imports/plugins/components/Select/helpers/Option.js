"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Option;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

/**
 * @name Option
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
function Option(props) {
  return /*#__PURE__*/_react.default.createElement(_core.MenuItem, (0, _extends2.default)({
    ref: props.innerRef,
    component: "div",
    className: props.selectProps.classes.menuItem,
    selected: props.isFocused
  }, props.innerProps), props.children);
}

Option.propTypes = {
  /**
   * The children to be rendered.
   */
  children: _propTypes.default.node,

  /**
   * CSS class passed down from parent
   */
  className: _propTypes.default.string,

  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    key: _propTypes.default.string,
    onClick: _propTypes.default.func.isRequired,
    onMouseMove: _propTypes.default.func.isRequired,
    onMouseOver: _propTypes.default.func.isRequired,
    tabIndex: _propTypes.default.number.isRequired
  }).isRequired,

  /**
   * Inner ref to DOM Node
   */
  innerRef: _propTypes.default.oneOfType([_propTypes.default.oneOf([null]), _propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.any.isRequired
  })]),

  /**
   * Whether the option is focused.
   */
  isFocused: _propTypes.default.bool.isRequired,

  /**
   * Whether the option is selected.
   */
  isSelected: _propTypes.default.bool.isRequired,
  selectProps: _propTypes.default.object.isRequired
};