"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useConfirmDialog2 = _interopRequireDefault(require("./helpers/useConfirmDialog"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @name ConfirmDialog
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
var ConfirmDialog = _react.default.forwardRef(function ConfirmDialog(props, ref) {
  var children = props.children,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["children"]);

  var _useConfirmDialog = (0, _useConfirmDialog2.default)(_objectSpread({}, otherProps)),
      isOpen = _useConfirmDialog.isOpen,
      openDialog = _useConfirmDialog.openDialog,
      closeDialog = _useConfirmDialog.closeDialog,
      ConfirmDialogComponent = _useConfirmDialog.ConfirmDialog;

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, children({
    closeDialog: closeDialog,
    isOpen: isOpen,
    openDialog: openDialog
  }), /*#__PURE__*/_react.default.createElement(ConfirmDialogComponent, {
    ref: ref
  }));
});

ConfirmDialog.propTypes = {
  /**
   * Cancel button text
   */
  cancelActionText: _propTypes.default.string,

  /**
   * Render prop `{({ closeDialog, isOpen, openDialog }) => ()}`
   */
  children: _propTypes.default.func,

  /**
   * Text for confirm button
   */
  confirmActionText: _propTypes.default.string,

  /**
   * Child elements of the dialog. Use if this for rendering a custom components in the dialog.
  */
  content: _propTypes.default.element,

  /**
   * Dialog open/close state
   */
  isOpen: _propTypes.default.bool,

  /**
   * Message body. May be a string or a React component. Use if your message is mostly text.
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
ConfirmDialog.defaultProps = {
  cancelActionText: "Cancel",
  confirmActionText: "OK",
  onClose: function onClose() {},
  onConfirm: function onConfirm() {}
};
var _default = ConfirmDialog;
exports.default = _default;