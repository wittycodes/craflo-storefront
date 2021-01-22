"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _index = require("../tests/index.js");

var _sampleData = require("./mocks/sampleData");

var _ = _interopRequireWildcard(require("./"));

/* eslint-disable react/prop-types */

/* eslint-disable react/display-name */

/* eslint-disable require-jsdoc */

/* eslint-disable react/no-multi-comp */
var columnData = [{
  Header: "Order ID",
  accessor: "referenceId"
}, {
  Header: "Customer",
  accessor: "customer",
  Cell: function Cell(_ref) {
    var cell = _ref.cell;
    return /*#__PURE__*/_react.default.createElement("a", {
      href: "#".concat(cell.value)
    }, cell.value);
  }
}, {
  Header: "Total",
  accessor: "total"
}]; // Basic table

function TestTable() {
  var columns = (0, _react.useMemo)(function () {
    return columnData;
  }, []);
  var memoizedData = (0, _react.useMemo)(function () {
    return _sampleData.data;
  }, []);
  var dataTableProps = (0, _.useDataTable)({
    columns: columns,
    data: memoizedData
  });
  return /*#__PURE__*/_react.default.createElement(_.default, dataTableProps);
} // Basic table


function TestTableWithServerSidePagination() {
  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      tableData = _useState2[0],
      setTableData = _useState2[1];

  var _useState3 = (0, _react.useState)(1),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      pageCount = _useState4[0],
      setPageCount = _useState4[1];

  var columns = (0, _react.useMemo)(function () {
    return columnData;
  }, []);
  var onFetchData = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref2) {
      var pageIndex, pageSize, _yield$getPaginatedDa, fetchedData;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pageIndex = _ref2.pageIndex, pageSize = _ref2.pageSize;
              _context.next = 3;
              return (0, _sampleData.getPaginatedData)({
                offset: pageIndex * pageSize,
                limit: (pageIndex + 1) * pageSize,
                simulatedDelay: 200,
                // 300ms delay
                sortBy: "referenceId",
                sortOrder: "asc"
              });

            case 3:
              _yield$getPaginatedDa = _context.sent;
              fetchedData = _yield$getPaginatedDa.data;
              setTableData(fetchedData.nodes);
              setPageCount(fetchedData.totalCount / pageSize);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), []);
  var dataTableProps = (0, _.useDataTable)({
    data: tableData,
    columns: columns,
    onFetchData: onFetchData,
    pageCount: pageCount
  });
  return /*#__PURE__*/_react.default.createElement(_.default, dataTableProps);
}

function TestTableWithClientSidePagination() {
  var columns = (0, _react.useMemo)(function () {
    return columnData;
  }, []);
  var memoizedData = (0, _react.useMemo)(function () {
    return _sampleData.data;
  }, []);
  var dataTableProps = (0, _.useDataTable)({
    columns: columns,
    data: memoizedData
  });
  return /*#__PURE__*/_react.default.createElement(_.default, dataTableProps);
}

test("basic snapshot - only default props", function () {
  var _render = (0, _index.render)( /*#__PURE__*/_react.default.createElement(TestTable, null)),
      asFragment = _render.asFragment;

  expect(asFragment()).toMatchSnapshot();
});
test("server-side paginated snapshot - advances one page forward", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var _render2, asFragment, getByText;

  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _render2 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(TestTableWithServerSidePagination, null)), asFragment = _render2.asFragment, getByText = _render2.getByText;
          _context2.next = 3;
          return (0, _index.waitForElement)(function () {
            return getByText("10000001");
          });

        case 3:
          _index.fireEvent.click(getByText("Next"));

          _context2.next = 6;
          return (0, _index.waitForElement)(function () {
            return getByText("10000011");
          });

        case 6:
          expect(asFragment()).toMatchSnapshot();

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test("server-side paginated snapshot - advances one page forward and back to first", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _render3, asFragment, getByText;

  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _render3 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(TestTableWithServerSidePagination, null)), asFragment = _render3.asFragment, getByText = _render3.getByText;
          _context3.next = 3;
          return (0, _index.waitForElement)(function () {
            return getByText("10000001");
          });

        case 3:
          _index.fireEvent.click(getByText("Previous"));

          _context3.next = 6;
          return (0, _index.waitForElement)(function () {
            return getByText("10000001");
          });

        case 6:
          expect(asFragment()).toMatchSnapshot();

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test("client-side paginated snapshot - advances one page forward", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _render4, asFragment, getByText;

  return _regenerator.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _render4 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(TestTableWithClientSidePagination, null)), asFragment = _render4.asFragment, getByText = _render4.getByText;
          _context4.next = 3;
          return (0, _index.waitForElement)(function () {
            return getByText("10000001");
          });

        case 3:
          _index.fireEvent.click(getByText("Next"));

          _context4.next = 6;
          return (0, _index.waitForElement)(function () {
            return getByText("10000011");
          });

        case 6:
          expect(asFragment()).toMatchSnapshot();

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
test("client-side paginated snapshot - advances one page forward and back to first", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var _render5, asFragment, getByText;

  return _regenerator.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _render5 = (0, _index.render)( /*#__PURE__*/_react.default.createElement(TestTableWithClientSidePagination, null)), asFragment = _render5.asFragment, getByText = _render5.getByText;
          _context5.next = 3;
          return (0, _index.waitForElement)(function () {
            return getByText("10000001");
          });

        case 3:
          _index.fireEvent.click(getByText("Previous"));

          _context5.next = 6;
          return (0, _index.waitForElement)(function () {
            return getByText("10000001");
          });

        case 6:
          expect(asFragment()).toMatchSnapshot();

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));