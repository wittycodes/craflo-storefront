"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Placeholder;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

/**
 * @name Placeholder
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
function Placeholder(props) {
  var selectProps = props.selectProps,
      _props$innerProps = props.innerProps,
      innerProps = _props$innerProps === void 0 ? {} : _props$innerProps,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement(_core.Typography, (0, _extends2.default)({
    color: "textSecondary",
    className: selectProps.classes.placeholder
  }, innerProps), children);
}

Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: _propTypes.default.node,

  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: _propTypes.default.object,
  selectProps: _propTypes.default.object.isRequired
};