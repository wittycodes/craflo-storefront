"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _index = require("../tests/index.js");

var _DialogTitle = _interopRequireDefault(require("./DialogTitle"));

test("basic snapshot - only default props", function () {
  var _render = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_DialogTitle.default, null, "Archive 24 products?")),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});