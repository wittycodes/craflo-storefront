"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _clsx4 = _interopRequireDefault(require("clsx"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    success: {
      color: theme.palette.colors.coolGrey500,
      backgroundColor: theme.palette.colors.forestGreen100
    },
    info: {
      color: theme.palette.colors.coolGrey500,
      backgroundColor: theme.palette.colors.darkBlue100
    },
    danger: {
      color: theme.palette.colors.coolGrey500,
      backgroundColor: theme.palette.colors.red100
    },
    colorPrimaryError: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.colors.red
    },
    outlinedPrimaryError: {
      color: theme.palette.colors.red,
      border: "1px solid ".concat(theme.palette.colors.red)
    }
  };
});
/**
 * @name Chip
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */

var Chip = _react.default.forwardRef(function Chip(props, ref) {
  var _clsx;

  var color = props.color,
      variant = props.variant,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["color", "variant"]);
  var classes = useStyles();
  var colorVariants = (0, _clsx4.default)((_clsx = {}, (0, _defineProperty2.default)(_clsx, classes.success, color === "success"), (0, _defineProperty2.default)(_clsx, classes.info, color === "info"), (0, _defineProperty2.default)(_clsx, classes.danger, color === "danger"), _clsx));
  var errorClasses = {};
  var errorColorProp = {};

  if (color === "error") {
    errorClasses = {
      colorPrimary: (0, _clsx4.default)((0, _defineProperty2.default)({}, classes.colorPrimaryError, variant === "default")),
      outlinedPrimary: (0, _clsx4.default)((0, _defineProperty2.default)({}, classes.outlinedPrimaryError, variant === "outlined"))
    };
    errorColorProp = {
      color: "primary"
    };
  }

  var colorProp = {}; // Only add props accepted by MUI Chip

  if (["default", "primary", "secondary"].includes(color)) {
    colorProp = {
      color: color
    };
  }

  return /*#__PURE__*/_react.default.createElement(_core.Chip, (0, _extends2.default)({}, colorProp, {
    classes: _objectSpread(_objectSpread({}, errorClasses), {}, {
      root: colorVariants
    }),
    variant: variant
  }, errorColorProp, {
    ref: ref // eslint-disable-next-line react/jsx-indent-props

  }, otherProps));
});

Chip.propTypes = {
  /**
   * CSS Classes
   */
  classes: _propTypes.default.object,

  /**
   * The color of the component
   */
  color: _propTypes.default.oneOf(["default", "primary", "secondary", "success", "info", "danger", "error"]),

  /**
   * The variant to use
   */
  variant: _propTypes.default.oneOf(["default", "outlined"])
};
Chip.defaultProps = {
  color: "primary",
  variant: "default"
};
var _default = Chip;
exports.default = _default;