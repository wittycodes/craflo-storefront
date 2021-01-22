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

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogContentText = _interopRequireDefault(require("@material-ui/core/DialogContentText"));

var _DialogTitle = _interopRequireDefault(require("../../DialogTitle"));

/**
 * @name ConfirmDialogBase
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
var ConfirmDialogBase = _react.default.forwardRef(function ConfirmDialogBase(props, ref) {
  var cancelActionText = props.cancelActionText,
      children = props.children,
      confirmActionText = props.confirmActionText,
      isOpen = props.isOpen,
      onClose = props.onClose,
      message = props.message,
      onConfirm = props.onConfirm,
      title = props.title,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["cancelActionText", "children", "confirmActionText", "isOpen", "onClose", "message", "onConfirm", "title"]);
  return /*#__PURE__*/_react.default.createElement(_Dialog.default, (0, _extends2.default)({
    "aria-labelledby": "confirm-action-dialog-title",
    maxWidth: "sm",
    fullWidth: true,
    onClose: onClose,
    open: isOpen,
    ref: ref
  }, otherProps), /*#__PURE__*/_react.default.createElement(_DialogTitle.default, {
    id: "confirm-action-dialog-title"
  }, title), message && /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, /*#__PURE__*/_react.default.createElement(_DialogContentText.default, null, message)), children && /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, children), /*#__PURE__*/_react.default.createElement(_DialogActions.default, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onClose,
    color: "primary",
    variant: "outlined"
  }, cancelActionText), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onConfirm,
    color: "primary",
    variant: "contained"
  }, confirmActionText)));
});

ConfirmDialogBase.propTypes = {
  /**
   * Cancel button text
   */
  cancelActionText: _propTypes.default.string,

  /**
   * Child elements of the dialog
   */
  children: _propTypes.default.element,

  /**
   * Text for confirm button
   */
  confirmActionText: _propTypes.default.string,

  /**
   * Dialog open/close state
   */
  isOpen: _propTypes.default.bool,

  /**
   * Message body. May be a string or a React component.
   */
  message: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * Close callback
   */
  onClose: _propTypes.default.func,

  /**
   * Confirmation callback
   */
  onConfirm: _propTypes.default.func,

  /**
   * Dialog title
   */
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
};
ConfirmDialogBase.defaultProps = {
  cancelActionText: "Cancel",
  confirmActionText: "OK",
  onClose: function onClose() {},
  onConfirm: function onConfirm() {}
};
var _default = ConfirmDialogBase;
exports.default = _default;