"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _core = require("@material-ui/core");

var _ChevronDown = _interopRequireDefault(require("mdi-material-ui/ChevronDown"));

var _Button = _interopRequireDefault(require("../Button"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    button: {
      whiteSpace: "nowrap",
      paddingRight: theme.spacing(1.5)
    },
    listItem: {
      paddingTop: 0,
      paddingBottom: 0
    },
    expansionPanel: {},
    expansionPanelDetails: {
      paddingLeft: theme.spacing(1.5)
    }
  };
});
var defaultLabels = {
  clear: "Clear",
  clearAll: "Clear all"
};
/**
 * @name DataTableFilter
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */

var DataTableFilter = _react.default.forwardRef(function DataTableFilter(props, ref) {
  var children = props.children,
      isMulti = props.isMulti,
      onSelect = props.onSelect,
      options = props.options,
      container = props.container,
      labelsProp = props.labels,
      title = props.title,
      value = props.value,
      classNameProp = props.className,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["children", "isMulti", "onSelect", "options", "container", "labels", "title", "value", "className"]);
  var classes = useStyles();

  var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var anchorRef = ref || _react.default.useRef(null);

  var labels = _objectSpread(_objectSpread({}, defaultLabels), labelsProp);
  /**
   * Toggle menu open
   * @returns {undefined}
   */


  function handleToggle() {
    setOpen(function (prevOpen) {
      return !prevOpen;
    });
  }
  /**
   * Handle menu close
   * @param {SyntheticEvent} event Event object
   * @returns {undefined}
   */


  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  var handleCheckboxChange = (0, _react.useCallback)(function (event) {
    var values = Array.isArray(value) ? value : [];
    var controlValue = event.target.value;
    var selectedValues;

    if (event.target.checked === false) {
      var newValues = values.filter(function (item) {
        return item !== controlValue;
      });
      selectedValues = newValues.length > 0 ? newValues : null;
    } else {
      selectedValues = (0, _toConsumableArray2.default)(new Set([event.target.value].concat((0, _toConsumableArray2.default)(values))));
    }

    onSelect(selectedValues);
  }, [onSelect]);
  var menuItems;

  if (isMulti) {
    menuItems = options.map(function (option, index) {
      var label = option.label,
          optionValue = option.value,
          isDisabled = option.isDisabled;
      return /*#__PURE__*/_react.default.createElement(_core.ListItem, {
        className: classes.listItem,
        key: index
      }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        onChange: handleCheckboxChange,
        value: optionValue,
        control: /*#__PURE__*/_react.default.createElement(_core.Checkbox, null),
        label: label,
        disabled: isDisabled,
        checked: Array.isArray(value) && value.includes(optionValue)
      }));
    });
  } else {
    menuItems = /*#__PURE__*/_react.default.createElement(_core.RadioGroup, {
      onChange: function onChange(event) {
        return onSelect(event.target.value);
      },
      value: value || "",
      "aria-label": title
    }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
      style: {
        display: "none"
      },
      key: "noneSelected",
      control: /*#__PURE__*/_react.default.createElement(_core.Radio, null),
      value: ""
    }), options.map(function (option, index) {
      var label = option.label,
          optionValue = option.value,
          isDisabled = option.isDisabled;
      return /*#__PURE__*/_react.default.createElement(_core.ListItem, {
        className: classes.listItem,
        key: index
      }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        value: optionValue,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, null),
        label: label,
        disabled: isDisabled
      }));
    }));
  }

  if (container === "card") {
    return /*#__PURE__*/_react.default.createElement(_core.ExpansionPanel, {
      className: (0, _clsx.default)(classes.expansionPanel, classNameProp)
    }, /*#__PURE__*/_react.default.createElement(_core.ExpansionPanelSummary, {
      expandIcon: /*#__PURE__*/_react.default.createElement(_ChevronDown.default, null)
    }, /*#__PURE__*/_react.default.createElement(_core.Typography, null, title)), /*#__PURE__*/_react.default.createElement(_core.ExpansionPanelDetails, {
      className: classes.expansionPanelDetails
    }, /*#__PURE__*/_react.default.createElement(_core.Box, null, /*#__PURE__*/_react.default.createElement(_core.List, null, menuItems, /*#__PURE__*/_react.default.createElement(_core.ListItem, {
      key: "clear-button"
    }, /*#__PURE__*/_react.default.createElement(_core.Link, {
      component: "button",
      variant: "body2",
      onClick: function onClick() {
        return onSelect(null);
      }
    }, isMulti ? labels.clearAll : labels.clear))))));
  }

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({
    "aria-controls": "filter-menu",
    "aria-haspopup": "true",
    className: (0, _clsx.default)(classes.button, classNameProp),
    onClick: handleToggle,
    ref: anchorRef,
    variant: "outlined"
  }, otherProps), title, /*#__PURE__*/_react.default.createElement(_core.Box, {
    display: "flex",
    paddingLeft: 1
  }, /*#__PURE__*/_react.default.createElement(_ChevronDown.default, null))), /*#__PURE__*/_react.default.createElement(_core.Menu, {
    MenuListProps: {
      disablePadding: true
    },
    anchorEl: anchorRef.current,
    id: "action-menu",
    keepMounted: true,
    open: open,
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    className: classes.listItem,
    key: "default-label",
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_core.Box, {
    whiteSpace: "normal"
  }, /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
    primary: title
  }))), menuItems, /*#__PURE__*/_react.default.createElement(_core.ListItem, {
    key: "clear-button"
  }, /*#__PURE__*/_react.default.createElement(_core.Link, {
    component: "button",
    variant: "body2",
    onClick: function onClick() {
      return onSelect(null);
    }
  }, labels.clear))));
});

DataTableFilter.defaultProps = {
  color: "primary",
  isMulti: false,
  labels: defaultLabels,
  onSelect: function onSelect() {},
  variant: "outlined"
};
DataTableFilter.propTypes = {
  /**
   * The content of the Button
   */
  children: _propTypes.default.node,

  /**
   * Class name to be applied to the root element
  */
  className: _propTypes.default.string,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * Options: `default` | `inherit` | `primary` | `secondary` | `error`
   */
  color: _propTypes.default.string,

  /**
   * Container type to display as
   */
  container: _propTypes.default.oneOf(["default", "card"]),

  /**
   * If `true`, the button will be disabled.
   */
  disabled: _propTypes.default.bool,
  // eslint-disable-line

  /**
   * If `true, the filter options can be multi-selected
   */
  isMulti: _propTypes.default.bool,

  /**
   * If `true`, the CircularProgress will be displayed and the button will be disabled.
   */
  isWaiting: _propTypes.default.bool,

  /**
   * Labels for various components
   */
  labels: _propTypes.default.shape({
    /**
     * Clear all for multi-select filters
     */
    clearAll: _propTypes.default.string,

    /**
     * Clear label for single select filters
     */
    clear: _propTypes.default.string
  }),

  /**
   * Called when an option is selected. Can be use simultaneously with option onClick callbacks.
   */
  onSelect: _propTypes.default.func,

  /**
   * Menu options
   */
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    /**
     * Disable the option
     */
    isDisabled: _propTypes.default.bool,

    /**
     * Option label
     */
    label: _propTypes.default.string.isRequired,

    /**
     * Value for the item
     */
    value: _propTypes.default.any.isRequired
  })),

  /**
   * Title used for dropdown, card and aria labels for form controls
   */
  title: _propTypes.default.string,

  /**
   * Value to match with selected item(s)
   */
  value: _propTypes.default.any
};
var _default = DataTableFilter;
exports.default = _default;