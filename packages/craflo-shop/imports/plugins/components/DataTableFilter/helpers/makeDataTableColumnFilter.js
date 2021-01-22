"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDataTableColumnFilter;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DataTableFilter = _interopRequireDefault(require("../DataTableFilter"));

/**
 * @name makeDataTableColumnFilter
 * @summary Helper function for creating a column filter for the DataTable.
 * @param {Object} props Props to be applied to the DataTableFilter component
 * @param {Array} props.options Array of options `[{ label: "Display Label", value: "value" }]
 * @param {String} props.title Title to be displayed for the drop down button, or in the card title
 * @returns {PropTypes.elementType} DataTableFilter component configured with props
 */
function makeDataTableColumnFilter(props) {
  var DataTableColumnFilter = function DataTableColumnFilter(_ref) {
    var _ref$column = _ref.column,
        Header = _ref$column.Header,
        filterValue = _ref$column.filterValue,
        setFilter = _ref$column.setFilter,
        labels = _ref.labels,
        container = _ref.container,
        className = _ref.className;
    return /*#__PURE__*/_react.default.createElement(_DataTableFilter.default, (0, _extends2.default)({
      title: typeof Header === "string" ? Header : "Filter",
      className: className,
      container: container,
      labels: labels,
      onSelect: function onSelect(value) {
        return setFilter(value);
      },
      value: filterValue
    }, props));
  };

  DataTableColumnFilter.propTypes = {
    className: _propTypes.default.string,
    column: _propTypes.default.shape({
      filterValue: _propTypes.default.any,
      setFilter: _propTypes.default.func
    }),
    container: _propTypes.default.oneOf(["default", "card"]),
    labels: _propTypes.default.shape({
      clearAll: _propTypes.default.string.isRequired,
      clear: _propTypes.default.string.isRequired
    })
  };
  return DataTableColumnFilter;
}