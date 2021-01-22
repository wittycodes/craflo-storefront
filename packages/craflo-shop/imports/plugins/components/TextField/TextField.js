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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _utils = require("@material-ui/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Styles for the base input component
var useInputStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      "position": "relative",
      "borderRadius": theme.shape.borderRadius,
      "&:hover $notchedOutline": {
        borderColor: theme.palette.colors.black40
      },
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        "&:hover $notchedOutline": {
          borderColor: theme.palette.colors.black20
        }
      },
      "&$focused $notchedOutline": {
        borderColor: theme.palette.colors.reactionBlue400,
        borderWidth: 2
      },
      "&$error $notchedOutline": {
        borderColor: theme.palette.error.main
      },
      "&$disabled $notchedOutline": {
        borderColor: theme.palette.action.disabled
      },
      "&$disabled $input": {
        backgroundColor: theme.palette.colors.black10
      }
    },

    /* Styles applied to the root element if the component is focused. */
    focused: {},

    /* Styles applied to the root element if `error={true}`. */
    error: {},

    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},

    /* Styles applied to the root element if `startAdornment` is provided. */
    multiline: {
      "padding": 0,
      "backgroundColor": theme.palette.colors.black02,
      "&$marginDense": {
        padding: 0
      }
    },

    /* Styles applied to the `NotchedOutline` element. */
    notchedOutline: {
      borderColor: theme.palette.colors.black20,
      padding: "0"
    },
    input: _objectSpread({
      backgroundColor: theme.palette.colors.black02,
      padding: "11.5px 8px"
    }, theme.typography.body2)
  };
}); // Styles for the label above the field

var useInputLabelStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: _objectSpread({
      marginBottom: theme.spacing(1)
    }, theme.typography.h5),
    formControl: {
      position: "static",
      left: 0,
      top: 0,
      transform: "none"
    },
    shrink: {
      transform: "none",
      transformOrigin: "top left"
    },
    outlined: {
      "transform": "none",
      "&$shrink": {
        transform: "none"
      }
    }
  };
}); // Styles for the helper text below the field

var useFormHelperTextStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: _objectSpread(_objectSpread({}, theme.typography.body2), {}, {
      color: theme.palette.colors.black55
    }),
    contained: {
      marginLeft: 0,
      marginRight: 0
    }
  };
});
/**
 * @name TextField
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component
 */

var TextField = _react.default.forwardRef(function TextField(props, ref) {
  var inputClasses = useInputStyles();
  var inputLabelClasses = useInputLabelStyles();
  var formHelperTextClasses = useFormHelperTextStyles();
  return /*#__PURE__*/_react.default.createElement(_core.TextField, (0, _extends2.default)({
    FormHelperTextProps: {
      classes: formHelperTextClasses
    },
    InputProps: {
      classes: inputClasses,
      notched: false
    },
    InputLabelProps: {
      shrink: true,
      classes: inputLabelClasses
    },
    fullWidth: true,
    variant: "outlined"
  }, props, {
    ref: ref
  }));
});
/* eslint-disable react/boolean-prop-naming */

/**
 *
 * The following prop-type definitions are copied from the Material UI TextField component to aide in documentation generation.
 * Source: [@material-ui/core/TextField](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TextField/TextField.js)
 */


TextField.propTypes = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  FormHelperTextProps: _propTypes.default.object,

  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  InputLabelProps: _propTypes.default.object,

  /**
   * @ignore
   */
  InputProps: _propTypes.default.object,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  SelectProps: _propTypes.default.object,

  /**
   * @ignore
   */
  autoComplete: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  autoFocus: _propTypes.default.bool,

  /**
   * The default value of the `input` element.
   */
  children: _propTypes.default.node,

  /**
   * If `true`, the `input` element will be disabled.
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the label will be displayed in an error state.
   */
  classes: _propTypes.default.object,

  /**
   * Props applied to the [`FormHelperText`](/api/form-helper-text/) element.
   */
  color: _propTypes.default.oneOf(["primary", "secondary"]),

  /**
   * If `true`, the input will take up the full width of its container.
   */
  defaultValue: _propTypes.default.any,

  /**
   * The helper text content.
   */
  disabled: _propTypes.default.bool,

  /**
   * @ignore
   */
  error: _propTypes.default.bool,

  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  fullWidth: _propTypes.default.bool,

  /**
   * Props applied to the [`InputLabel`](/api/input-label/) element.
   */
  helperText: _propTypes.default.node,

  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  hiddenLabel: _propTypes.default.bool,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * Pass a ref to the `input` element.
   */
  inputProps: _propTypes.default.object,

  /**
   * The label content.
   */
  inputRef: _utils.refType,

  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  label: _propTypes.default.node,

  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  margin: _propTypes.default.oneOf(["none", "dense", "normal"]),

  /**
   * Name attribute of the `input` element.
   */
  multiline: _propTypes.default.bool,

  /**
   * @ignore
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onBlur: _propTypes.default.func,

  /**
   * @ignore
   */
  onChange: _propTypes.default.func,

  /**
   * The short hint displayed in the input before the user enters a value.
   */
  onFocus: _propTypes.default.func,

  /**
   * If `true`, the label is displayed as required and the `input` element` will be required.
   */
  placeholder: _propTypes.default.string,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  required: _propTypes.default.bool,

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rows: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Render a [`Select`](/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   */
  rowsMax: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Props applied to the [`Select`](/api/select/) element.
   */
  select: _propTypes.default.bool,

  /**
   * The size of the text field.
   */
  size: _propTypes.default.oneOf(["small", "medium"]),

  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: _propTypes.default.string,

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: _propTypes.default.any,

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(["standard", "outlined", "filled"])
};
/* eslint-enable react/boolean-prop-naming */

var _default = TextField;
exports.default = _default;