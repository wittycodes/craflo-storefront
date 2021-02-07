"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _index = require("../tests/index.js");

var _SplitButton = _interopRequireDefault(require("./SplitButton"));

var options = [{
  label: "Add tags to products"
}, {
  label: "Remove tags from products",
  isDestructive: true
}, {
  label: "Remove all tags",
  isDisabled: true,
  isDestructive: true
}];
test("basic snapshot - only default props", function () {
  var _render = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_SplitButton.default, {
    options: options
  })),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("set initial selected option to destructive option snapshot", function () {
  var _render2 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_SplitButton.default, {
    initialSelectedOption: 1,
    options: options
  })),
      asFragment = _render2.asFragment,
      getByTestId = _render2.getByTestId;

  expect(getByTestId("splitButton-action-button")).toHaveTextContent("Remove tags from products");
  expect(asFragment()).toMatchSnapshot();
});
test("select destructive option", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _render3, asFragment, getByTestId, getByText, removeButton;

  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render3 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_SplitButton.default, {
            options: options
          })), asFragment = _render3.asFragment, getByTestId = _render3.getByTestId, getByText = _render3.getByText;

          _index.fireEvent.click(getByTestId("splitButton-dropdown-button"));

          _context.next = 4;
          return (0, _index.waitForElement)(function () {
            return getByText("Remove tags from products");
          });

        case 4:
          removeButton = _context.sent;

          _index.fireEvent.click(removeButton);

          expect(getByTestId("splitButton-action-button")).toHaveTextContent("Remove tags from products");
          expect(asFragment()).toMatchSnapshot();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));