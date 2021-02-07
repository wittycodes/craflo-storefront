"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useConfirmDialog;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _ConfirmDialogBase = _interopRequireDefault(require("./ConfirmDialogBase"));

/**
 * @summary React hook for creating detached confirm dialogs with ease
 * @param {Object} props Props to configure a confirm dialog
 * @param {String} props.cancelActionText Cancel button text
 * @param {Boolean} props.closeOnConfirm Close dialog on confirmation. Default `true`
 * @param {String} props.confirmActionText Text for confirm button
 * @param {ReactElement} props.content Child elements of the dialog. Use if this for rendering a custom components in the dialog.
 * @param {String|React.Element} props.message Message body. May be a String or a React component. Use if your message is mostly text.
 * @param {Function} props.onClose Close callback
 * @param {Function} props.onConfirm Confirmation callback
 * @param {String|React.Element} props.title Dialog title
 * @returns {Object} An object containing {openDialog: func, dialog: React.Element}
 */
function useConfirmDialog(_ref) {
  var content = _ref.content,
      children = _ref.children,
      _ref$closeOnConfirm = _ref.closeOnConfirm,
      closeOnConfirm = _ref$closeOnConfirm === void 0 ? true : _ref$closeOnConfirm,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
      _ref$onConfirm = _ref.onConfirm,
      onConfirm = _ref$onConfirm === void 0 ? function () {} : _ref$onConfirm,
      props = (0, _objectWithoutProperties2.default)(_ref, ["content", "children", "closeOnConfirm", "onClose", "onConfirm"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isOpen = _useState2[0],
      setOpen = _useState2[1];

  var openDialog = function openDialog() {
    return setOpen(true);
  };

  var closeDialog = function closeDialog() {
    setOpen(false);
    onClose();
  };

  var handleConfirm = function handleConfirm() {
    onConfirm();

    if (closeOnConfirm) {
      closeDialog();
    }
  };

  return {
    isOpen: isOpen,
    openDialog: openDialog,
    closeDialog: closeDialog,
    ConfirmDialog: function ConfirmDialog() {
      return /*#__PURE__*/_react.default.createElement(_ConfirmDialogBase.default, (0, _extends2.default)({
        isOpen: isOpen,
        onClose: closeDialog,
        onConfirm: handleConfirm,
        children: content || children
      }, props));
    }
  };
}