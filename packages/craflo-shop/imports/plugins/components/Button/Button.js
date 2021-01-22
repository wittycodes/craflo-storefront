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

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    buttonProgress: {
      marginLeft: theme.spacing()
    },
    containedPrimary: {
      "color": theme.palette.primary.contrastText,
      "backgroundColor": theme.palette.colors.red,
      "&:hover": {
        "backgroundColor": theme.palette.colors.redHover,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: theme.palette.colors.redHover
        }
      }
    },
    outlinedPrimary: {
      "color": theme.palette.colors.red,
      "border": "1px solid ".concat(theme.palette.colors.red),
      "&:hover": {
        "border": "1px solid ".concat(theme.palette.colors.redBorder),
        "backgroundColor": theme.palette.colors.redBackground,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  };
});
/**
 * @name Button
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */

var Button = _react.default.forwardRef(function Button(props, ref) {
  var children = props.children,
      color = props.color,
      disabled = props.disabled,
      isWaiting = props.isWaiting,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["children", "color", "disabled", "isWaiting"]);
  var classes = useStyles();

  if (color === "error") {
    return /*#__PURE__*/_react.default.createElement(_core.Button, (0, _extends2.default)({
      classes: {
        containedPrimary: classes.containedPrimary,
        outlinedPrimary: classes.outlinedPrimary
      },
      color: "primary",
      disabled: disabled || isWaiting,
      ref: ref
    }, otherProps), children, isWaiting && /*#__PURE__*/_react.default.createElement(_core.CircularProgress, {
      size: 16,
      className: classes.buttonProgress
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_core.Button, (0, _extends2.default)({
    color: color,
    disabled: disabled || isWaiting,
    ref: ref
  }, otherProps), children, isWaiting && /*#__PURE__*/_react.default.createElement(_core.CircularProgress, {
    size: 16,
    className: classes.buttonProgress
  }));
});

Button.propTypes = {
  /**
   * The content of the Button
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * Options: `default` | `inherit` | `primary` | `secondary` | `error`
   */
  color: _propTypes.default.string,

  /**
   * If `true`, the button will be disabled.
   */
  disabled: _propTypes.default.bool,
  // eslint-disable-line

  /**
   * If `true`, the CircularProgress will be displayed and the button will be disabled.
   */
  isWaiting: _propTypes.default.bool,

  /**
   * onClick callback
   */
  onClick: _propTypes.default.func
};
var _default = Button;
exports.default = _default;