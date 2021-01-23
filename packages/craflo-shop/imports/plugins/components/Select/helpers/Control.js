"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Control;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _Input = _interopRequireDefault(require("./Input"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @name Control
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
function Control(props) {
  var children = props.children,
      innerProps = props.innerProps,
      innerRef = props.innerRef,
      _props$selectProps = props.selectProps,
      classes = _props$selectProps.classes,
      TextFieldProps = _props$selectProps.TextFieldProps;
  return /*#__PURE__*/_react.default.createElement(_core.TextField, (0, _extends2.default)({
    fullWidth: true,
    variant: "outlined",
    InputProps: {
      inputComponent: _Input.default,
      inputProps: _objectSpread({
        className: classes.input,
        ref: innerRef,
        children: children
      }, innerProps)
    }
  }, TextFieldProps));
}

Control.propTypes = {
  /**
   * Children to render.
   */
  children: _propTypes.default.node,

  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: _propTypes.default.shape({
    onMouseDown: _propTypes.default.func.isRequired
  }).isRequired,
  innerRef: _propTypes.default.oneOfType([_propTypes.default.oneOf([null]), _propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.any.isRequired
  })]).isRequired,
  selectProps: _propTypes.default.object.isRequired
};