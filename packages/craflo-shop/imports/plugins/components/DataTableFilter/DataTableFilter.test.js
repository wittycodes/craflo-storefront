"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _index = require("../tests/index.js");

var _DataTableFilter = _interopRequireDefault(require("./DataTableFilter"));

var options = [{
  label: "Created",
  value: "created"
}, {
  label: "Processing",
  value: "processing"
}, {
  label: "Canceled",
  isDisabled: "canceled"
}];
test("basic snapshot - only default props", function () {
  var _render = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_DataTableFilter.default, {
    options: options,
    title: "Filter"
  })),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});