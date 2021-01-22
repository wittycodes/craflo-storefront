"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _tests = require("../tests/");

var _Button = _interopRequireDefault(require("../Button"));

var _ConfirmDialog = _interopRequireDefault(require("./ConfirmDialog"));

var _useConfirmDialog3 = _interopRequireDefault(require("./helpers/useConfirmDialog"));

test("basic snapshot - with opening the dialog", function () {
  /* eslint-disable function-paren-newline */
  var _render = (0, _tests.render)( /*#__PURE__*/_react.default.createElement(_ConfirmDialog.default, {
    title: "Are you sure?",
    message: "Are you sure you want to do that?"
  }, function (_ref) {
    var openDialog = _ref.openDialog;
    return /*#__PURE__*/_react.default.createElement(_Button.default, {
      color: "primary",
      onClick: openDialog,
      variant: "contained"
    }, "Open Confirm Dialog");
  })),
      asFragment = _render.asFragment,
      getByText = _render.getByText,
      getByRole = _render.getByRole;

  _tests.fireEvent.click(getByText("Open Confirm Dialog"));

  expect(getByRole("dialog")).toBeInTheDocument();
  expect(getByRole("dialog")).toHaveTextContent("Are you sure you want to do that?");
  expect(getByRole("dialog")).toHaveTextContent("Are you sure?");
  expect(getByRole("dialog")).toHaveTextContent("OK");
  expect(getByRole("dialog")).toHaveTextContent("Cancel");
  expect(getByRole("dialog")).toMatchSnapshot();
  expect(asFragment()).toMatchSnapshot();
});
test("basic snapshot - with opening the dialog using the useConfirmDialog hook", function () {
  // eslint-disable-next-line require-jsdoc
  function TestComponent() {
    var _useConfirmDialog = (0, _useConfirmDialog3.default)({
      title: "Are you sure?",
      message: "Are you sure you want to do that?"
    }),
        openDialog = _useConfirmDialog.openDialog,
        ConfirmDialogComponent = _useConfirmDialog.ConfirmDialog;

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
      color: "primary",
      onClick: openDialog,
      variant: "contained"
    }, "Open Confirm Dialog"), /*#__PURE__*/_react.default.createElement(ConfirmDialogComponent, null));
  }

  var _render2 = (0, _tests.render)( /*#__PURE__*/_react.default.createElement(TestComponent, null)),
      asFragment = _render2.asFragment,
      getByText = _render2.getByText,
      getByRole = _render2.getByRole;

  _tests.fireEvent.click(getByText("Open Confirm Dialog"));

  expect(getByRole("dialog")).toBeInTheDocument();
  expect(getByRole("dialog")).toHaveTextContent("Are you sure you want to do that?");
  expect(getByRole("dialog")).toHaveTextContent("Are you sure?");
  expect(getByRole("dialog")).toHaveTextContent("OK");
  expect(getByRole("dialog")).toHaveTextContent("Cancel");
  expect(getByRole("dialog")).toMatchSnapshot();
  expect(asFragment()).toMatchSnapshot();
});
test("basic snapshot - with opening the dialog using the useConfirmDialog hook with more content", function () {
  // eslint-disable-next-line require-jsdoc, react/no-multi-comp
  function TestComponent() {
    var _useConfirmDialog2 = (0, _useConfirmDialog3.default)({
      title: "Are you sure?",
      content: /*#__PURE__*/_react.default.createElement("span", null, "More content"),
      message: "Are you sure you want to do that?"
    }),
        openDialog = _useConfirmDialog2.openDialog,
        ConfirmDialogComponent = _useConfirmDialog2.ConfirmDialog;

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
      color: "primary",
      onClick: openDialog,
      variant: "contained"
    }, "Open Confirm Dialog"), /*#__PURE__*/_react.default.createElement(ConfirmDialogComponent, null));
  }

  var _render3 = (0, _tests.render)( /*#__PURE__*/_react.default.createElement(TestComponent, null)),
      asFragment = _render3.asFragment,
      getByText = _render3.getByText,
      getByRole = _render3.getByRole;

  _tests.fireEvent.click(getByText("Open Confirm Dialog"));

  expect(getByRole("dialog")).toBeInTheDocument();
  expect(getByRole("dialog")).toHaveTextContent("Are you sure you want to do that?");
  expect(getByRole("dialog")).toHaveTextContent("More content");
  expect(getByRole("dialog")).toHaveTextContent("Are you sure?");
  expect(getByRole("dialog")).toHaveTextContent("OK");
  expect(getByRole("dialog")).toHaveTextContent("Cancel");
  expect(getByRole("dialog")).toMatchSnapshot();
  expect(asFragment()).toMatchSnapshot();
});