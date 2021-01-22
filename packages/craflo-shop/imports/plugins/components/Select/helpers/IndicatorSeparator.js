"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IndicatorSeparator;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

/**
 * @name IndicatorSeparator
 * @returns {React.Component} A React component
 */
function IndicatorSeparator() {
  var theme = (0, _styles.useTheme)();
  var indicatorSeparatorStyle = {
    alignSelf: "stretch",
    backgroundColor: theme.palette.colors.black20,
    marginBottom: 8,
    marginTop: 8,
    width: 1
  };
  return /*#__PURE__*/_react.default.createElement("span", {
    style: indicatorSeparatorStyle
  });
}