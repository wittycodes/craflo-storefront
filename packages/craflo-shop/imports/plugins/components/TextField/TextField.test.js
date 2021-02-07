"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _index = require("../tests/index.js");

var _TextField = _interopRequireDefault(require("./TextField"));

test("snapshot - singleline", function () {
  var _render = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: "hello"
  })),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot - singleline - disabled", function () {
  var _render2 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: "hello",
    disabled: true
  })),
      asFragment = _render2.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot - singleline - error", function () {
  var _render3 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: "hello",
    error: true,
    helpText: "Help text"
  })),
      asFragment = _render3.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot - multiline", function () {
  var _render4 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: "hello",
    multiline: true
  })),
      asFragment = _render4.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot - multiline - expanded", function () {
  var _render5 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: "hello",
    multiline: true,
    rows: 4
  })),
      asFragment = _render5.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot - multiline - disabled", function () {
  var _render6 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: "hello",
    multiline: true,
    disabled: true
  })),
      asFragment = _render6.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot - multiline - error state", function () {
  var _render7 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: "hello",
    multiline: true,
    error: true,
    helpText: "Help text"
  })),
      asFragment = _render7.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot - select", function () {
  var _render8 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: 1,
    select: true
  }, /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    value: 1
  }, "Option 1"), /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    value: 2
  }, "Option 2"), /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    value: 3
  }, "Option 3"))),
      asFragment = _render8.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot - select - disabled", function () {
  var _render9 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: 1,
    select: true,
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    value: 1
  }, "Option 1"), /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    value: 2
  }, "Option 2"), /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    value: 3
  }, "Option 3"))),
      asFragment = _render9.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot - select - error state", function () {
  var _render10 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_TextField.default, {
    value: 1,
    select: true,
    error: true
  }, /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    value: 1
  }, "Option 1"), /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    value: 2
  }, "Option 2"), /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
    value: 3
  }, "Option 3"))),
      asFragment = _render10.asFragment;

  expect(asFragment()).toMatchSnapshot();
});