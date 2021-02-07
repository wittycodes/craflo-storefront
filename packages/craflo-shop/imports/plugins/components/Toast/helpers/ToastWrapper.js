"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToastWrapper;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _Close = _interopRequireDefault(require("mdi-material-ui/Close"));

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    close: {
      padding: theme.spacing(0.5),
      marginLeft: "auto",
      height: "100%"
    },
    messageWrapper: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column"
    },
    title: {
      padding: theme.spacing(0.5, 0, 1, 0),
      fontWeight: theme.typography.fontWeightSemiBold
    },
    action: {
      marginLeft: "auto"
    },
    success: {
      fontSize: theme.typography.fontSize,
      backgroundColor: theme.palette.colors.forestGreenBackground,
      color: theme.palette.colors.forestGreen600,
      border: "".concat(theme.spacing(0.25), "px solid ").concat(theme.palette.colors.forestGreenBorder),
      padding: theme.spacing(1, 2),
      borderRadius: theme.shape.borderRadius,
      minWidth: 288,
      display: "flex"
    },
    error: {
      fontSize: theme.typography.fontSize,
      backgroundColor: theme.palette.colors.redBackground,
      color: theme.palette.colors.red600,
      border: "".concat(theme.spacing(0.25), "px solid ").concat(theme.palette.colors.redBorder),
      padding: theme.spacing(1, 2),
      borderRadius: theme.shape.borderRadius,
      minWidth: 288,
      display: "flex"
    },
    info: {
      fontSize: theme.typography.fontSize,
      backgroundColor: theme.palette.colors.reactionBlueBackground,
      color: theme.palette.colors.reactionBlue600,
      border: "".concat(theme.spacing(0.25), "px solid ").concat(theme.palette.colors.reactionBlueBorder),
      padding: theme.spacing(1, 2),
      borderRadius: theme.shape.borderRadius,
      minWidth: 288,
      display: "flex"
    },
    warning: {
      fontSize: theme.typography.fontSize,
      backgroundColor: theme.palette.colors.yellowBackground,
      color: theme.palette.colors.yellow600,
      border: "".concat(theme.spacing(0.25), "px solid ").concat(theme.palette.colors.yellowBorder),
      padding: theme.spacing(1, 2),
      borderRadius: theme.shape.borderRadius,
      minWidth: 288,
      display: "flex"
    }
  };
});
/**
 * @name ToastWrapper
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */

function ToastWrapper(props) {
  var className = props.className,
      message = props.message,
      variant = props.variant,
      title = props.title,
      onClose = props.onClose,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["className", "message", "variant", "title", "onClose"]);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_core.Paper, (0, _extends2.default)({
    component: "div",
    role: "alertdialog",
    square: true,
    elevation: 6,
    className: (0, _clsx.default)(classes[variant], className),
    "aria-describedby": "message-id"
  }, otherProps), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.messageWrapper
  }, title ? /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h4",
    component: "div",
    className: classes.title
  }, title) : null, message), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    key: "close",
    "aria-label": "close",
    className: classes.close,
    onClick: onClose
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null)));
}

ToastWrapper.propTypes = {
  action: _propTypes.default.node,
  className: _propTypes.default.string,
  message: _propTypes.default.node,
  onClose: _propTypes.default.func,
  title: _propTypes.default.string,
  variant: _propTypes.default.oneOf(["error", "info", "success", "warning"]).isRequired
};