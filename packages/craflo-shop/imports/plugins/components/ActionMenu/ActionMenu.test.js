"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _index = require("../tests/index.js");

var _ActionMenu = _interopRequireDefault(require("./ActionMenu"));

var options = [{
  label: "Add tags to products"
}, {
  label: "Remove tags from products"
}, {
  label: "Remove all tags",
  isDisabled: true
}];
test("basic snapshot - only default props", function () {
  var _render = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_ActionMenu.default, {
    options: options
  }, "Actions")),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("select an option", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var onSelect, _render2, asFragment, getAllByText, getByText, removeButton;

  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          onSelect = jest.fn();
          _render2 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_ActionMenu.default, {
            onSelect: onSelect,
            options: options
          }, "Actions")), asFragment = _render2.asFragment, getAllByText = _render2.getAllByText, getByText = _render2.getByText;

          _index.fireEvent.click(getAllByText("Actions")[0]);

          _context.next = 5;
          return (0, _index.waitForElement)(function () {
            return getByText("Remove tags from products");
          });

        case 5:
          removeButton = _context.sent;

          _index.fireEvent.click(removeButton);

          expect(onSelect).toHaveBeenCalled();
          expect(asFragment()).toMatchSnapshot();

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test("option onClick", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var onClick, optionsWithAnOnClick, _render3, asFragment, getAllByText, getByText, removeButton;

  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          onClick = jest.fn();
          optionsWithAnOnClick = [{
            label: "Add tags to products"
          }, {
            label: "Remove tags from products",
            onClick: onClick
          }, {
            label: "Remove all tags",
            isDisabled: true
          }];
          _render3 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_ActionMenu.default, {
            options: optionsWithAnOnClick
          }, "Actions")), asFragment = _render3.asFragment, getAllByText = _render3.getAllByText, getByText = _render3.getByText;

          _index.fireEvent.click(getAllByText("Actions")[0]);

          _context2.next = 6;
          return (0, _index.waitForElement)(function () {
            return getByText("Remove tags from products");
          });

        case 6:
          removeButton = _context2.sent;

          _index.fireEvent.click(removeButton);

          expect(onClick).toHaveBeenCalled();
          expect(asFragment()).toMatchSnapshot();

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test("option onClick with confirmation", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var onClick, optionsWithAnOnClick, _render4, asFragment, getAllByText, getByText, removeButton, dialogConfirmButton;

  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          onClick = jest.fn();
          optionsWithAnOnClick = [{
            label: "Add tags to products"
          }, {
            label: "Remove tags from products",
            confirmTitle: "Confirm action",
            confirmMessage: "Are you sure you want to do that?",
            onClick: onClick
          }, {
            label: "Remove all tags",
            isDisabled: true
          }];
          _render4 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(_ActionMenu.default, {
            options: optionsWithAnOnClick
          }, "Actions")), asFragment = _render4.asFragment, getAllByText = _render4.getAllByText, getByText = _render4.getByText; // Open the menu

          _index.fireEvent.click(getAllByText("Actions")[0]); // Wait for open, then get the "Remove tags from products" button


          _context3.next = 6;
          return (0, _index.waitForElement)(function () {
            return getByText("Remove tags from products");
          });

        case 6:
          removeButton = _context3.sent;

          _index.fireEvent.click(removeButton); // Wait for dialog to open then click the OK button


          _context3.next = 10;
          return (0, _index.waitForElement)(function () {
            return getByText("OK");
          });

        case 10:
          dialogConfirmButton = _context3.sent;

          _index.fireEvent.click(dialogConfirmButton);

          expect(onClick).toHaveBeenCalled();
          expect(asFragment()).toMatchSnapshot();

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));