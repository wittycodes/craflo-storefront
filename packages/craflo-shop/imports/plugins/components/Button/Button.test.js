"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _index = require("../tests/index.js");

var _Button = _interopRequireDefault(require("./Button"));

test("basic snapshot - only default props", function () {
  var _render = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "myBtn"
  }, "Submit")),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("error button snapshot", function () {
  var _render2 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "myBtn",
    color: "error",
    variant: "contained"
  }, "Delete")),
      asFragment = _render2.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("error button snapshot", function () {
  var _render3 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "myBtn",
    color: "error",
    variant: "outlined"
  }, "Delete")),
      asFragment = _render3.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("isWaiting button snapshot", function () {
  var _render4 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "myBtn",
    isWaiting: true
  }, "Upload")),
      asFragment = _render4.asFragment,
      getByText = _render4.getByText;

  expect(getByText("Upload")).toBeDisabled();
  expect(asFragment()).toMatchSnapshot();
});