"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _MenuDown = _interopRequireDefault(require("mdi-material-ui/MenuDown"));

var _Button = _interopRequireDefault(require("../Button"));

/**
 * @name Button
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
var SplitButton = _react.default.forwardRef(function SplitButton(props, ref) {
  var children = props.children,
      colorProp = props.color,
      initialSelectedOption = props.initialSelectedOption,
      onClick = props.onClick,
      options = props.options,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["children", "color", "initialSelectedOption", "onClick", "options"]);

  var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var anchorRef = ref || _react.default.useRef();

  var _React$useState3 = _react.default.useState(initialSelectedOption),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      selectedIndex = _React$useState4[0],
      setSelectedIndex = _React$useState4[1];

  var selectedOption = options[selectedIndex];
  var color = selectedOption.isDestructive ? "error" : colorProp;
  /**
   * Handle option click
   * @returns {undefined}
   */

  function handleClick() {
    onClick && onClick(selectedOption, selectedIndex);
  }
  /**
   * Handle menu item click
   * @param {SyntheticEvent} event Event object
   * @param {Number} index Menu item index
   * @returns {undefined}
   */


  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setOpen(false);
  }
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


  function handleClose() {
    setOpen(false);
  }

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.ButtonGroup, {
    variant: "contained",
    ref: anchorRef
  }, /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({
    color: color,
    "data-testid": "splitButton-action-button",
    onClick: handleClick
  }, otherProps), selectedOption.label), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: color,
    "data-testid": "splitButton-dropdown-button",
    variant: "contained",
    size: "small",
    "aria-owns": open ? "menu-list-grow" : undefined,
    "aria-haspopup": "true",
    onClick: handleToggle
  }, /*#__PURE__*/_react.default.createElement(_MenuDown.default, null))), /*#__PURE__*/_react.default.createElement(_core.Menu, {
    open: open,
    anchorEl: anchorRef.current,
    transition: true,
    keepMounted: true,
    onClose: handleClose // variant="menu"
    ,
    anchorOrigin: {
      horizontal: "center",
      vertical: "top"
    },
    transformOrigin: {
      horizontal: "center",
      vertical: "top"
    }
  }, /*#__PURE__*/_react.default.createElement(_core.MenuList, {
    disablePadding: true
  }, options.map(function (_ref, index) {
    var label = _ref.label,
        details = _ref.details,
        isDisabled = _ref.isDisabled;
    return /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
      key: label,
      disabled: isDisabled,
      selected: index === selectedIndex,
      onClick: function onClick(event) {
        return handleMenuItemClick(event, index);
      }
    }, /*#__PURE__*/_react.default.createElement(_core.Box, {
      maxWidth: 320,
      whiteSpace: "normal"
    }, /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
      primary: label,
      secondary: details
    })));
  }))));
});

SplitButton.defaultProps = {
  color: "primary",
  initialSelectedOption: 0
};
SplitButton.propTypes = {
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
   * Initial selected option index
   */
  initialSelectedOption: _propTypes.default.number,

  /**
   * If `true`, the CircularProgress will be displayed and the button will be disabled.
   */
  isWaiting: _propTypes.default.bool,

  /**
   * onClick callback
   */
  onClick: _propTypes.default.func,

  /**
   * Menu options
   */
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    details: _propTypes.default.string,
    isDestructive: _propTypes.default.bool,
    isDisabled: _propTypes.default.bool,
    label: _propTypes.default.string.isRequired
  }))
};
var _default = SplitButton;
exports.default = _default;