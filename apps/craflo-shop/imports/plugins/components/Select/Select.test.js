"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _tests = require("../tests");

var _Select = _interopRequireDefault(require("./Select"));

var options = ["Mens", "Womens", "Kids"].map(function (option) {
  return {
    label: option.toLowerCase(),
    value: option
  };
});
test("basic snapshot test", function () {
  var _render = (0, _tests.render)( /*#__PURE__*/_react.default.createElement(_Select.default, {
    options: options
  })),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});