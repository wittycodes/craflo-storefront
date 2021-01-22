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

var _ChevronDown = _interopRequireDefault(require("mdi-material-ui/ChevronDown"));

var _Button = _interopRequireDefault(require("../Button"));

var _ConfirmDialog = _interopRequireDefault(require("../ConfirmDialog"));

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    button: {
      paddingRight: theme.spacing(1.5)
    }
  };
});
/**
 * @name ActionMenu
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */

var ActionMenu = _react.default.forwardRef(function ActionMenu(props, ref) {
  var children = props.children,
      onSelect = props.onSelect,
      options = props.options,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["children", "onSelect", "options"]);
  var classes = useStyles();

  var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var anchorRef = ref || _react.default.useRef(null);
  /**
   * Handle menu item click
   * @param {SyntheticEvent} event Event object
   * @param {Number} index Menu item index
   * @returns {undefined}
   */


  function handleMenuItemClick(_ref) {
    var event = _ref.event,
        index = _ref.index,
        onClick = _ref.onClick;
    var selectedOption = options[index];
    onSelect && onSelect(selectedOption, index);
    onClick && onClick(event);
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


  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({
    "aria-controls": "action-menu",
    "aria-haspopup": "true",
    className: classes.button,
    onClick: handleToggle,
    ref: anchorRef
  }, otherProps), children, /*#__PURE__*/_react.default.createElement(_core.Box, {
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
    key: "default-label",
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_core.Box, {
    maxWidth: 320,
    whiteSpace: "normal"
  }, /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
    primary: children
  }))), options.map(function (option, index) {
    var label = option.label,
        details = option.details,
        isDisabled = option.isDisabled,
        cancelActionText = option.cancelActionText,
        confirmActionText = option.confirmActionText,
        confirmTitle = option.confirmTitle,
        confirmMessage = option.confirmMessage,
        onClick = option.onClick;

    var callback = function callback(event) {
      return handleMenuItemClick({
        event: event,
        index: index,
        onClick: onClick
      });
    };

    if (confirmTitle || confirmMessage) {
      return /*#__PURE__*/_react.default.createElement(_ConfirmDialog.default, {
        key: "dialog-".concat(index),
        cancelActionText: cancelActionText,
        confirmActionText: confirmActionText,
        title: confirmTitle,
        message: confirmMessage,
        onConfirm: callback
      }, function (_ref2) {
        var openDialog = _ref2.openDialog;
        return /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
          key: index,
          disabled: isDisabled,
          onClick: openDialog
        }, /*#__PURE__*/_react.default.createElement(_core.Box, {
          maxWidth: 320,
          whiteSpace: "normal"
        }, /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
          primary: label,
          secondary: details
        })));
      });
    }

    return /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
      key: index,
      disabled: isDisabled,
      onClick: callback
    }, /*#__PURE__*/_react.default.createElement(_core.Box, {
      maxWidth: 320,
      whiteSpace: "normal"
    }, /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
      primary: label,
      secondary: details
    })));
  })));
});

ActionMenu.defaultProps = {
  color: "primary",
  variant: "outlined"
};
ActionMenu.propTypes = {
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
   * Called when an option is selected. Can be use simultaneously with option onClick callbacks.
   */
  onSelect: _propTypes.default.func,

  /**
   * Menu options
   */
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    /**
     * Change the cancel button label in the confirm dialog
     */
    cancelActionText: _propTypes.default.string,

    /**
     * Change the label of the confirmation button in the confirm dialog
     */
    confirmActionText: _propTypes.default.string,

    /**
     * If supplied, the option will show a confirm dialog this message when selected.
     */
    confirmMessage: _propTypes.default.string,

    /**
     * If supplied, the option will show a confirm dialog this title when selected
     */
    confirmTitle: _propTypes.default.string,

    /**
     * Secondary option label
     */
    details: _propTypes.default.string,

    /**
     * Disable the option
     */
    isDisabled: _propTypes.default.bool,

    /**
     * Option label
     */
    label: _propTypes.default.string.isRequired,

    /**
     * If supplied, this function will be called in addition to onSelect
     */
    onClick: _propTypes.default.func
  }))
};
var _default = ActionMenu;
exports.default = _default;