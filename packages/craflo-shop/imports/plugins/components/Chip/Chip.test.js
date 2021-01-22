"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _index = require("../tests/index.js");

var _Chip = _interopRequireDefault(require("./Chip"));

test("basic snapshot - only default props", function () {
  var _render = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Chip.default, null)),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("deletable chip snapshot", function () {
  var onDelete = function onDelete() {};

  var _render2 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Chip.default, {
    color: "primary",
    variant: "default",
    onDelete: onDelete
  })),
      asFragment = _render2.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("deletable chip in small, secondary sizesnapshot", function () {
  var onDelete = function onDelete() {};

  var _render3 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Chip.default, {
    color: "secondary",
    variant: "default",
    onDelete: onDelete,
    size: "small"
  })),
      asFragment = _render3.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("error chip snapshot", function () {
  var _render4 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Chip.default, {
    color: "error"
  })),
      asFragment = _render4.asFragment;

  expect(asFragment()).toMatchSnapshot();
});