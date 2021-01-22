"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  render: true
};
exports.render = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@testing-library/react");

Object.keys(_react2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _react2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _react2[key];
    }
  });
});

var _styles = require("@material-ui/core/styles");

var _notistack = require("notistack");

var _defaultTheme = _interopRequireDefault(require("../theme/defaultTheme"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Component that wraps components with mock providers during testing.
 * @return {Component} - Component wrapped with mock providers
 */
var TestProviders = function TestProviders(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_styles.MuiThemeProvider, {
    theme: _defaultTheme.default
  }, /*#__PURE__*/_react.default.createElement(_notistack.SnackbarProvider, null, children));
};

TestProviders.propTypes = {
  /** React Component */
  children: _propTypes.default.element.isRequired
};
/**
 * Custom test renderer that wraps all components with the appropriate mock providers.
 * @param {Component} component - React component to render.
 * @param {Object} options - Options.
 * @return {Object} - @see {@link https://testing-library.com/docs/react-testing-library/api#render-result|react-testing-library}
 */

var renderWithProviders = function renderWithProviders(component, options) {
  return (0, _react2.render)(component, _objectSpread({
    wrapper: TestProviders
  }, options));
};

exports.render = renderWithProviders;