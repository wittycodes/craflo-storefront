"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Menu;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

/**
 * @name Menu
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
function Menu(props) {
  return /*#__PURE__*/_react.default.createElement(_core.Paper, (0, _extends2.default)({
    elevation: 2,
    className: props.selectProps.classes.paper
  }, props.innerProps), props.children);
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: _propTypes.default.element.isRequired,

  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: _propTypes.default.object.isRequired,
  selectProps: _propTypes.default.object.isRequired
};