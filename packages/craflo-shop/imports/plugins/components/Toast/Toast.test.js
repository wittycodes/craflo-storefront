"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _index = require("../tests/index.js");

var _Toast = _interopRequireDefault(require("./Toast"));

test("basic snapshot - only default props", function () {
  var _render = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Toast.default, {
    message: "Test message",
    open: true
  })),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("basic snapshot - information variant", function () {
  var _render2 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Toast.default, {
    message: "Test message",
    variant: "info",
    open: true
  })),
      asFragment = _render2.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("basic snapshot - success variant", function () {
  var _render3 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Toast.default, {
    message: "Test message",
    variant: "success",
    open: true
  })),
      asFragment = _render3.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("basic snapshot - error variant", function () {
  var _render4 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Toast.default, {
    message: "Test message",
    variant: "error",
    open: true
  })),
      asFragment = _render4.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("basic snapshot - warning variant", function () {
  var _render5 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Toast.default, {
    message: "Test message",
    variant: "warning",
    open: true
  })),
      asFragment = _render5.asFragment;

  expect(asFragment()).toMatchSnapshot();
});