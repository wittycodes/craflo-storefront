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

var _core = require("@material-ui/core");

var _helpers = require("./helpers");

/**
 * @name Toast
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */
var Toast = _react.default.forwardRef(function Toast(props, ref) {
  var message = props.message,
      variant = props.variant,
      title = props.title,
      onClose = props.onClose,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["message", "variant", "title", "onClose"]);
  return /*#__PURE__*/_react.default.createElement(_core.Snackbar, (0, _extends2.default)({
    ref: ref
  }, otherProps), /*#__PURE__*/_react.default.createElement(_helpers.ToastWrapper, {
    props: otherProps,
    variant: variant,
    title: title,
    message: message,
    onClose: onClose
  }));
});

Toast.propTypes = {
  /**
   * Message: Node, <span>Message goes here</span>
   */
  message: _propTypes.default.node,

  /**
   * onClose: Callback fired when the component requests to be closed and when the X icon button is clicked
   */
  onClose: _propTypes.default.func.isRequired,

  /**
   * Title: Optional string, displayed in bold
   */
  title: _propTypes.default.string,

  /**
   * Variant: Info, Success, Warning, Error
   */
  variant: _propTypes.default.oneOf(["error", "info", "success", "warning"]).isRequired
};
Toast.defaultProps = {
  variant: "info"
};
var _default = Toast;
exports.default = _default;