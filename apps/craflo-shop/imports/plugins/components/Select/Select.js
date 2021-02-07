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

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _async = _interopRequireDefault(require("react-select/async"));

var _styles = require("@material-ui/core/styles");

var _helpers = require("./helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    input: {
      color: theme.palette.colors.coolGrey500,
      display: "flex",
      padding: theme.spacing(0.25),
      height: "auto",
      cursor: "pointer",
      fontSize: theme.typography.caption.fontSize,
      letterSpacing: theme.typography.caption.letterSpacing,
      background: theme.palette.colors.black02,
      borderRadius: theme.shape.borderRadius
    },
    valueContainer: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      flex: 1,
      overflow: "hidden",
      paddingLeft: theme.spacing(0.5)
    },
    chip: {
      margin: theme.spacing(0.5, 0.25)
    },
    menuItem: {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: theme.spacing(5)
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2),
      color: theme.palette.colors.black20,
      lineHeight: "40px"
    },
    placeholder: {
      position: "absolute",
      left: theme.spacing(1),
      fontSize: theme.typography.caption.fontSize,
      letterSpacing: theme.typography.caption.letterSpacing,
      color: theme.palette.colors.black55
    },
    paper: {
      "position": "absolute",
      "zIndex": 1,
      "marginTop": 0,
      "left": 0,
      "right": 0,
      "borderTop": 0,
      "minHeight": theme.spacing(5),
      "& div": {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    divider: {
      height: theme.spacing(2),
      color: theme.palette.colors.black20
    }
  };
}); // Custom components for various aspects of the select

var components = {
  Control: _helpers.Control,
  IndicatorSeparator: _helpers.IndicatorSeparator,
  Menu: _helpers.Menu,
  MultiValue: _helpers.MultiValue,
  NoOptionsMessage: _helpers.NoOptionsMessage,
  Option: _helpers.Option,
  Placeholder: _helpers.Placeholder,
  ValueContainer: _helpers.ValueContainer
};
/**
 * @name Select
 * @summary A Select component that supports selecting single or multiple option(s), and
 * loading options synchronously or asynchronously.
 * @param {Object} props - component props
 * @returns {React.Component} A React component
 */

var Select = _react.default.forwardRef(function Select(props, ref) {
  var defaultClasses = useStyles();

  var _theme = (0, _styles.useTheme)();

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var classes = props.classes,
      isAsync = props.isAsync,
      onSelection = props.onSelection,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["classes", "isAsync", "onSelection"]);
  var SelectComponent = isAsync ? _async.default : _reactSelect.default;
  /**
   *
   * @param {String} selectedValue The selected value
   * @returns {undefined} nothing
   */

  function handleChangeMulti(selectedValue) {
    setValue(selectedValue);
    onSelection && onSelection(selectedValue);
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: defaultClasses.root
  }, /*#__PURE__*/_react.default.createElement(SelectComponent, (0, _extends2.default)({
    classes: _objectSpread(_objectSpread({}, defaultClasses), classes),
    components: components,
    inputId: "react-select-multiple",
    onChange: handleChangeMulti,
    ref: ref,
    innerRef: ref,
    TextFieldProps: {
      InputLabelProps: {
        htmlFor: "react-select-multiple",
        shrink: true
      }
    },
    value: value,
    theme: function theme(selectTheme) {
      return _objectSpread(_objectSpread({}, selectTheme), {}, {
        borderRadius: 0,
        colors: _objectSpread(_objectSpread({}, _theme.colors), {}, {
          neutral20: _theme.palette.colors.coolGrey500
        })
      });
    }
  }, otherProps)));
});

Select.defaultProps = {
  placeholder: "Select options"
};
Select.propTypes = {
  /**
   * When provided options will be cached
   */
  cacheOptions: _propTypes.default.bool,
  // eslint-disable-line react/boolean-prop-naming

  /**
   * Additional classes to customize the Select component
   */
  classes: _propTypes.default.string,

  /**
   * The defaultOptions prop determines "when" your remote request is initially fired.
   * There are two valid values for this property.
   * Providing an option array to this prop will populate the initial set of options
   * used when opening the select, at which point the remote load only occurs
   * when filtering the options (typing in the control).
   * Providing the prop by itself (or with 'true') tells the control to immediately
   * fire the remote request, described by your loadOptions,
   * to get those initial values for the Select.
   */
  defaultOptions: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.object), _propTypes.default.bool]),

  /**
   * Set to true if options will be fetched asynchronously.
   */
  isAsync: _propTypes.default.bool,

  /**
   * A function that returns a Promise which will load the options
   */
  loadOptions: _propTypes.default.func,

  /**
   * Function to call when the selected value changes
   */
  onSelection: _propTypes.default.func,

  /**
   * The select options
  */
  options: _propTypes.default.arrayOf(_propTypes.default.object),

  /**
   * The placeholder string
   */
  placeholder: _propTypes.default.string
};
var _default = Select;
exports.default = _default;