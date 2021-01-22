"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

/**
 * @name DialogTitle
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
var DialogTitle = _react.default.forwardRef(function DialogTitle(props, ref) {
  var children = props.children,
      other = (0, _objectWithoutProperties2.default)(props, ["children"]);
  return /*#__PURE__*/_react.default.createElement(_DialogTitle.default, (0, _extends2.default)({
    disableTypography: true,
    ref: ref
  }, other), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    component: "h2",
    variant: "h4"
  }, children));
});

DialogTitle.propTypes = {
  /**
   * Children
   */
  children: _propTypes.default.node
};
var _default = DialogTitle;
exports.default = _default;