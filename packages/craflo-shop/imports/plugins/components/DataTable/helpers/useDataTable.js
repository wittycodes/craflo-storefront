"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDataTable;

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.array.find");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _reactTable = require("react-table");

var _useDataTableCellProps = _interopRequireDefault(require("./useDataTableCellProps"));

var _useDataTableManualFilter = _interopRequireDefault(require("./useDataTableManualFilter"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Convert an array of objects to an object by id
 * @param {Array<Object>} filters An array of objects `{id, value}`
 * @returns {Object} An object containing the filters by key
 */
function filtersArrayToObject(filters) {
  var filtersByKey = {};
  filters.forEach(function (_ref) {
    var id = _ref.id,
        value = _ref.value;
    filtersByKey[id] = value;
  });
  return filtersByKey;
}
/**
 * useDataTable
 * @param {Object} args Arguments for the useDataTable hook
 * @returns {Object} args
 */


function useDataTable(_ref2) {
  var DefaultColumnFilter = _ref2.DefaultColumnFilter,
      columns = _ref2.columns,
      data = _ref2.data,
      getRowId = _ref2.getRowId,
      controlledPageCount = _ref2.pageCount,
      onFetchData = _ref2.onFetchData,
      onRowClick = _ref2.onRowClick,
      onRowSelect = _ref2.onRowSelect,
      _ref2$disableRowClick = _ref2.disableRowClick,
      disableRowClick = _ref2$disableRowClick === void 0 ? false : _ref2$disableRowClick,
      _ref2$disableRowSelec = _ref2.disableRowSelect,
      disableRowSelect = _ref2$disableRowSelec === void 0 ? false : _ref2$disableRowSelec,
      otherProps = (0, _objectWithoutProperties2.default)(_ref2, ["DefaultColumnFilter", "columns", "data", "getRowId", "pageCount", "onFetchData", "onRowClick", "onRowSelect", "disableRowClick", "disableRowSelect"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      shouldShowAdditionalFilters = _useState2[0],
      setShowAdditionalFilters = _useState2[1];

  var isSelectable = typeof onRowSelect === "function" && disableRowSelect === false;
  var isRowInteractive = typeof onRowClick === "function" && disableRowClick === false;

  var defaultColumn = _react.default.useMemo(function () {
    return {
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter || function () {
        return null;
      },
      disableFilters: true
    };
  }, [DefaultColumnFilter]);

  var updatedColumns = columns.map(function (column) {
    if (column.disableFilters !== true && (column.Filter || column.filter)) {
      column.disableFilters = false;
    }

    return column;
  });
  var dataTableProps = (0, _reactTable.useTable)(_objectSpread({
    columns: updatedColumns,
    data: data,
    defaultColumn: defaultColumn,
    getRowId: getRowId,
    initialState: {
      pageIndex: 0
    },
    manualPagination: true,
    manualFilters: true,
    manualGlobalFilter: true,
    manualSortBy: true,
    pageCount: controlledPageCount
  }, otherProps), _useDataTableManualFilter.default, _reactTable.useFilters, _reactTable.useGlobalFilter, _reactTable.usePagination, _useDataTableCellProps.default, _reactTable.useRowSelect, function (hooks) {
    if (isSelectable) {
      var hasCheckboxColumn = Boolean(columns.find(function (_ref3) {
        var id = _ref3.id;
        return id === "selection";
      }));

      if (!hasCheckboxColumn) {
        hooks.flatColumns.push(function (prevColumns) {
          return [{
            id: "selection",
            cellProps: {
              // Disable cell click so that clicking the checkbox doesn't also trigger the row click
              isClickDisabled: true,
              padding: "checkbox"
            },
            // This column is not filterable
            disableFilters: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
            Header: function Header(_ref4) {
              var getToggleAllRowsSelectedProps = _ref4.getToggleAllRowsSelectedProps;
              return /*#__PURE__*/_react.default.createElement(_core.Checkbox, getToggleAllRowsSelectedProps());
            },
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
            Cell: function Cell(_ref5) {
              var row = _ref5.row;
              return /*#__PURE__*/_react.default.createElement(_core.Checkbox, row.getToggleRowSelectedProps());
            }
          }].concat((0, _toConsumableArray2.default)(prevColumns));
        });
      }
    }
  });
  var setAllFilters = dataTableProps.setAllFilters,
      setFilter = dataTableProps.setFilter,
      setAllManualFilters = dataTableProps.setAllManualFilters,
      setManualFilters = dataTableProps.setManualFilters,
      setGlobalFilter = dataTableProps.setGlobalFilter,
      setPageSize = dataTableProps.setPageSize,
      _dataTableProps$state = dataTableProps.state,
      pageIndex = _dataTableProps$state.pageIndex,
      pageSize = _dataTableProps$state.pageSize,
      filters = _dataTableProps$state.filters,
      globalFilter = _dataTableProps$state.globalFilter,
      manualFilters = _dataTableProps$state.manualFilters,
      selectedRowIds = _dataTableProps$state.selectedRowIds,
      sortBy = _dataTableProps$state.sortBy;
  (0, _react.useEffect)(function () {
    if (onFetchData) {
      onFetchData({
        globalFilter: globalFilter,
        sortBy: sortBy,
        filters: filters,
        filtersByKey: filtersArrayToObject(filters),
        manualFilters: manualFilters,
        manualFiltersByKey: filtersArrayToObject(manualFilters),
        pageIndex: pageIndex,
        pageSize: pageSize
      });
    }
  }, [globalFilter, filters, manualFilters, onFetchData, pageIndex, pageSize, sortBy]);
  var debounceSetGlobalFilter = (0, _react.useCallback)((0, _lodash.default)(function (value) {
    setGlobalFilter(value);
  }, 1000), []);
  (0, _react.useEffect)(function () {
    if (isSelectable) {
      onRowSelect({
        globalFilter: globalFilter,
        filters: filters,
        filtersByKey: filtersArrayToObject(filters),
        manualFilters: manualFilters,
        manualFiltersByKey: filtersArrayToObject(manualFilters),
        pageIndex: pageIndex,
        pageSize: pageSize,
        selectedRows: Object.keys(selectedRowIds)
      });
    }
  }, [globalFilter, filters, manualFilters, onFetchData, pageIndex, pageSize, selectedRowIds]);
  var onRowClickWrapper = (0, _react.useMemo)(function () {
    if (isRowInteractive) {
      return function (row) {
        return function () {
          onRowClick({
            row: row,
            data: data,
            filters: filters,
            filtersByKey: filtersArrayToObject(filters),
            manualFilters: manualFilters,
            manualFiltersByKey: filtersArrayToObject(manualFilters),
            pageIndex: pageIndex,
            pageSize: pageSize
          });
        };
      };
    }

    return null;
  }, [onRowClick]);
  var onRemoveFilter = (0, _react.useCallback)(function (id, value, multiSelectValue) {
    if (Array.isArray(value)) {
      var newMultiFilters = value.filter(function (valueToKeep) {
        return valueToKeep !== multiSelectValue;
      });
      setFilter(id, newMultiFilters.length === 0 ? null : newMultiFilters);
    } else {
      setFilter(id, null);
    }
  }, []);
  var onRemoveManualFilter = (0, _react.useCallback)(function (id) {
    setManualFilters(id, null);
  }, []);
  var refetch = (0, _react.useCallback)(function () {
    if (onFetchData) {
      onFetchData({
        globalFilter: globalFilter,
        filters: filters,
        filtersByKey: filtersArrayToObject(filters),
        manualFilters: manualFilters,
        manualFiltersByKey: filtersArrayToObject(manualFilters),
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortBy: sortBy
      });
    }
  }, [globalFilter, filters, onFetchData, manualFilters, pageIndex, pageSize, sortBy]);
  var fetchData = (0, _react.useCallback)(function (_ref6) {
    var globalFilterLocal = _ref6.globalFilter,
        filtersLocal = _ref6.filters,
        manualFiltersLocal = _ref6.manualFilters,
        pageSizeLocal = _ref6.pageSize;
    setGlobalFilter(globalFilterLocal || "");
    setAllFilters(filtersLocal || []);
    setAllManualFilters(manualFiltersLocal || []);
    setPageSize(pageSizeLocal || pageSize);
  }, []);
  return _objectSpread(_objectSpread({}, dataTableProps), {}, {
    debounceSetGlobalFilter: debounceSetGlobalFilter,
    fetchData: fetchData,
    isSelectable: isSelectable,
    onRowClick: onRowClickWrapper,
    onRemoveFilter: onRemoveFilter,
    onRemoveManualFilter: onRemoveManualFilter,
    refetch: refetch,
    shouldShowAdditionalFilters: shouldShowAdditionalFilters,
    setShowAdditionalFilters: setShowAdditionalFilters
  });
}