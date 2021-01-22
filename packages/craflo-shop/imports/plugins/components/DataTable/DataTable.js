"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultLabels = void 0;

require("core-js/modules/es6.number.constructor");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx4 = _interopRequireDefault(require("clsx"));

var _core = require("@material-ui/core");

var _lab = require("@material-ui/lab");

var _ChevronLeft = _interopRequireDefault(require("mdi-material-ui/ChevronLeft"));

var _ChevronRight = _interopRequireDefault(require("mdi-material-ui/ChevronRight"));

var _Close = _interopRequireDefault(require("mdi-material-ui/Close"));

var _Button = _interopRequireDefault(require("../Button"));

var _Select = _interopRequireDefault(require("../Select"));

var _ActionMenu = _interopRequireDefault(require("../ActionMenu"));

var _DataTableFilterChipBar = _interopRequireDefault(require("./helpers/DataTableFilterChipBar"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    pagination: {
      paddingTop: theme.spacing(2)
    },
    tableBody: {},
    tableRowOdd: {
      backgroundColor: theme.palette.colors.black02
    },
    tableHead: _objectSpread(_objectSpread({}, theme.typography.h5), {}, {
      fontWeight: theme.typography.fontWeightSemiBold,
      padding: theme.spacing(0.5, 2)
    }),
    tableCell: _objectSpread({}, theme.typography.body2),
    textField: {
      marginTop: 0,
      marginBottom: 0
    },
    tableRowClickable: {
      cursor: "pointer"
    },
    tableRowHover: {
      "&:hover": {
        backgroundColor: theme.palette.colors.black05
      }
    },
    tableRowSelected: {
      "backgroundColor": theme.palette.colors.coolGrey100,
      "&:hover": {
        backgroundColor: theme.palette.colors.coolGreyHoverSelected
      }
    },
    tableWrapper: {
      overflowX: "auto"
    }
  };
});
var defaultLabels = {
  allFilters: "All filters",
  allFiltersDrawerTitle: "All filters",
  clearAllFilters: "Clear all",
  clearFilter: "Clear",
  globalFilterPlaceholder: "Filter",
  loading: "Loading...",
  next: "Next",
  page: "Page",
  pageOf: function pageOf(_ref) {
    var count = _ref.count;
    return "of ".concat(count);
  },
  pageSizeSelect: function pageSizeSelect(_ref2) {
    var count = _ref2.count;
    return "".concat(count, " rows");
  },
  previous: "Previous"
};
/**
 * @name DataTable
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */

exports.defaultLabels = defaultLabels;

var DataTable = _react.default.forwardRef(function DataTable(props, ref) {
  var pageSizes = props.pageSizes,
      isFilterable = props.isFilterable,
      actionMenuProps = props.actionMenuProps,
      FilterDrawerComponent = props.FilterDrawerComponent,
      FilterDrawerButtonComponent = props.FilterDrawerButtonComponent,
      ToolbarComponent = props.ToolbarComponent,
      PaginationComponent = props.PaginationComponent,
      labelsProp = props.labels,
      setShowAdditionalFilters = props.setShowAdditionalFilters,
      shouldShowAdditionalFilters = props.shouldShowAdditionalFilters,
      onRowClick = props.onRowClick,
      onRemoveFilter = props.onRemoveFilter,
      onRemoveManualFilter = props.onRemoveManualFilter,
      isLoading = props.isLoading,
      getTableProps = props.getTableProps,
      flatColumns = props.flatColumns,
      headerGroups = props.headerGroups,
      page = props.page,
      prepareRow = props.prepareRow,
      canPreviousPage = props.canPreviousPage,
      canNextPage = props.canNextPage,
      pageOptions = props.pageOptions,
      pageCount = props.pageCount,
      gotoPage = props.gotoPage,
      nextPage = props.nextPage,
      previousPage = props.previousPage,
      debounceSetGlobalFilter = props.debounceSetGlobalFilter,
      setPageSize = props.setPageSize,
      _props$state = props.state,
      pageIndex = _props$state.pageIndex,
      pageSize = _props$state.pageSize,
      filters = _props$state.filters,
      manualFilters = _props$state.manualFilters;
  var classes = useStyles();
  var theme = (0, _core.useTheme)();
  var isMobile = (0, _core.useMediaQuery)(theme.breakpoints.down("sm"));
  var isTablet = (0, _core.useMediaQuery)(theme.breakpoints.down("md"));
  var shouldShowStandardToolbar = actionMenuProps || isFilterable;
  var activeFilters = flatColumns.filter(function (_ref3) {
    var canFilter = _ref3.canFilter;
    return canFilter;
  });
  var activeFilterCount = activeFilters.length; // Merge labels from props with the default labels

  var labels = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, defaultLabels), labelsProp);
  }, [labelsProp]); // Callback designed to stop event propagation on cells.
  // This is important for cells like the checkbox cell, as clicking the
  // checkbox would also trigger the row click.

  var handleCellClick = (0, _react.useCallback)(function (isClickDisabled) {
    return function (event) {
      if (isClickDisabled) {
        event.stopPropagation();
      }
    };
  }, []); // Callback for closing the filter drawer

  var handleCloseDrawer = (0, _react.useCallback)(function () {
    return setShowAdditionalFilters(false);
  }, []); // Determine how many filter buttons to show

  var maxFilterButtons = 3;
  var hasMoreFilters = false;

  if (isMobile) {
    maxFilterButtons = 0;
  } else if (isTablet) {
    maxFilterButtons = 1;
  }

  var filterDrawerComponents;

  if (activeFilterCount > maxFilterButtons) {
    // If we have more filters, then generate the components
    // for the filter drawer
    filterDrawerComponents = activeFilters.map(function (column, index) {
      return column.render("Filter", {
        container: "card",
        key: index,
        labels: {
          clear: labels.clearFilter,
          clearAll: labels.clearAllFilters
        }
      });
    }); // Display the "All filters" button

    hasMoreFilters = true;
  } // Render loading rows


  var loadingRows;

  if (isLoading) {
    loadingRows = [];
    /* eslint-disable no-loop-func */

    for (var index = 0; index < pageSize; index += 1) {
      loadingRows.push( /*#__PURE__*/_react.default.createElement(_core.TableRow, {
        className: (0, _clsx4.default)((0, _defineProperty2.default)({}, classes.tableRowOdd, (index + 1) % 2 !== 0)),
        key: "loading-".concat(index)
      }, flatColumns.map(function (column, cellIndex) {
        if (column.show === false) return null;
        return /*#__PURE__*/_react.default.createElement(_core.TableCell, {
          classes: {
            root: classes.tableCell
          },
          key: "cell-".concat(cellIndex),
          padding: column.id === "selection" ? "checkbox" : undefined
        }, column.id === "selection" ? /*#__PURE__*/_react.default.createElement(_core.Box, {
          paddingLeft: "12px",
          paddingTop: "13px",
          paddingBottom: "12px"
        }, /*#__PURE__*/_react.default.createElement(_lab.Skeleton, {
          variant: "rect",
          width: 8 * 2 + 2
        })) : /*#__PURE__*/_react.default.createElement(_lab.Skeleton, {
          variant: "text"
        }));
      })));
      /* eslint-enable no-loop-func */
    }
  }

  var extraRows = [];

  if (page.length < pageSize && !isLoading) {
    /* eslint-disable no-loop-func */
    for (var _index = page.length; _index < pageSize; _index += 1) {
      extraRows.push( /*#__PURE__*/_react.default.createElement(_core.TableRow, {
        className: (0, _clsx4.default)((0, _defineProperty2.default)({}, classes.tableRowOdd, (_index + 1) % 2 !== 0)),
        key: "empty-".concat(_index)
      }, flatColumns.map(function (column, cellIndex) {
        if (column.show === false) return null;
        return /*#__PURE__*/_react.default.createElement(_core.TableCell, {
          classes: {
            root: classes.tableCell
          },
          key: "cell-".concat(cellIndex),
          padding: column.id === "selection" ? "checkbox" : undefined
        }, "\xA0");
      })));
      /* eslint-enable no-loop-func */
    }
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, ToolbarComponent(props) || shouldShowStandardToolbar && /*#__PURE__*/_react.default.createElement(_core.Toolbar, null, actionMenuProps && /*#__PURE__*/_react.default.createElement(_core.Box, {
    paddingRight: 2
  }, /*#__PURE__*/_react.default.createElement(_ActionMenu.default, (0, _extends2.default)({
    children: "Actions"
  }, actionMenuProps))), isFilterable && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    className: classes.textField,
    fullWidth: true,
    margin: "dense",
    placeholder: labels.globalFilterPlaceholder,
    onChange: function onChange(event) {
      return debounceSetGlobalFilter(event.target.value);
    },
    variant: "outlined"
  }), /*#__PURE__*/_react.default.createElement(_core.Box, {
    paddingLeft: 2
  }, /*#__PURE__*/_react.default.createElement(_core.ButtonGroup, null, activeFilters.slice(0, maxFilterButtons).map(function (column, index) {
    return column.render("Filter", {
      key: index,
      labels: {
        clear: labels.clearFilter,
        clearAll: labels.clearAllFilters
      }
    });
  }), hasMoreFilters && (FilterDrawerButtonComponent({
    children: labels.allFilters
  }) || /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "primary",
    onClick: function onClick() {
      return setShowAdditionalFilters(!shouldShowAdditionalFilters);
    }
  }, labels.allFilters)), "}"), hasMoreFilters && (FilterDrawerComponent({
    title: labels.allFiltersDrawerTitle,
    children: filterDrawerComponents
  }) || /*#__PURE__*/_react.default.createElement(_core.Drawer, {
    anchor: "right",
    open: shouldShowAdditionalFilters,
    onClose: handleCloseDrawer
  }, /*#__PURE__*/_react.default.createElement(_core.AppBar, {
    position: "sticky"
  }, /*#__PURE__*/_react.default.createElement(_core.Toolbar, null, /*#__PURE__*/_react.default.createElement(_core.Box, {
    flex: 1,
    paddingLeft: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h3"
  }, labels.allFiltersDrawerTitle)), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    onClick: handleCloseDrawer
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null)))), /*#__PURE__*/_react.default.createElement(_core.Box, {
    paddingTop: 1,
    marginLeft: "-1px",
    marginRight: "-1px"
  }, filterDrawerComponents)))))), /*#__PURE__*/_react.default.createElement(_DataTableFilterChipBar.default, {
    columns: flatColumns,
    filters: filters,
    manualFilters: manualFilters,
    labels: labels,
    onRemove: onRemoveFilter,
    onRemoveManualFilter: onRemoveManualFilter
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.tableWrapper
  }, /*#__PURE__*/_react.default.createElement(_core.Table, (0, _extends2.default)({
    ref: ref
  }, getTableProps()), /*#__PURE__*/_react.default.createElement(_core.TableHead, {
    className: classes.tableHead
  }, headerGroups.map(function (headerGroup) {
    return /*#__PURE__*/_react.default.createElement(_core.TableRow, headerGroup.getHeaderGroupProps(), headerGroup.headers.map(function (column) {
      if (column.show === false) return null;
      return /*#__PURE__*/_react.default.createElement(_core.TableCell, (0, _extends2.default)({
        padding: column.id === "selection" ? "checkbox" : "default",
        classes: {
          root: classes.tableHead
        }
      }, column.getHeaderProps()), column.render("Header"));
    }));
  })), /*#__PURE__*/_react.default.createElement(_core.TableBody, {
    className: classes.tableBody
  }, loadingRows, !isLoading && page.map(function (row, index) {
    var _clsx3;

    return prepareRow(row) || /*#__PURE__*/_react.default.createElement(_core.TableRow, (0, _extends2.default)({
      onClick: onRowClick && onRowClick(row)
    }, row.getRowProps(), {
      className: (0, _clsx4.default)((_clsx3 = {}, (0, _defineProperty2.default)(_clsx3, classes.tableRowHover, true), (0, _defineProperty2.default)(_clsx3, classes.tableRowSelected, row.isSelected), (0, _defineProperty2.default)(_clsx3, classes.tableRowOdd, !row.isSelected && (index + 1) % 2 !== 0), (0, _defineProperty2.default)(_clsx3, classes.tableRowClickable, onRowClick), _clsx3))
    }), row.cells.map(function (cell) {
      var _cell$getCellProps = cell.getCellProps(),
          isClickDisabled = _cell$getCellProps.isClickDisabled,
          cellProps = (0, _objectWithoutProperties2.default)(_cell$getCellProps, ["isClickDisabled"]);

      if (cell.column.show === false) return null;
      return /*#__PURE__*/_react.default.createElement(_core.TableCell, (0, _extends2.default)({
        onClick: handleCellClick(isClickDisabled),
        classes: {
          root: classes.tableCell
        }
      }, cellProps), cell.render("Cell"));
    }));
  }), extraRows))), PaginationComponent(props) || /*#__PURE__*/_react.default.createElement(_core.Toolbar, null, /*#__PURE__*/_react.default.createElement(_core.Box, {
    display: "flex",
    alignItems: "center",
    paddingRight: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    component: "span",
    variant: "body2"
  }, labels.page), /*#__PURE__*/_react.default.createElement(_core.Box, {
    maxWidth: 80,
    paddingLeft: 1,
    paddingRight: 1
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    className: classes.textField,
    margin: "dense",
    variant: "outlined",
    type: "number",
    size: "small",
    min: 1,
    max: pageOptions.length,
    value: pageIndex + 1,
    onChange: function onChange(event) {
      var pageNumber = Number(event.target.value);
      pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;
      gotoPage(pageNumber);
    }
  })), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    component: "span",
    variant: "body2"
  }, labels.pageOf({
    count: pageCount
  }))), /*#__PURE__*/_react.default.createElement(_core.Box, {
    flex: 1,
    maxWidth: 120
  }, /*#__PURE__*/_react.default.createElement(_Select.default, {
    value: {
      label: labels.pageSizeSelect({
        count: pageSize
      }),
      value: pageSize
    },
    onChange: function onChange(_ref4) {
      var value = _ref4.value;
      setPageSize(value);
    },
    options: pageSizes.map(function (value) {
      return {
        label: value,
        value: value
      };
    })
  })), /*#__PURE__*/_react.default.createElement(_core.Box, {
    flex: 1
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: function onClick() {
      return previousPage();
    },
    disabled: !canPreviousPage
  }, /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, null), " ", labels.previous), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    component: "span"
  }, " | "), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: function onClick() {
      return nextPage();
    },
    disabled: !canNextPage
  }, labels.next, " ", /*#__PURE__*/_react.default.createElement(_ChevronRight.default, null))));
});

DataTable.propTypes = {
  /**
   * Component to replace the standard button for opening the filter drawer
   */
  FilterDrawerButtonComponent: _propTypes.default.func,

  /**
   * Component to replace the standard filter drawer
   */
  FilterDrawerComponent: _propTypes.default.func,

  /**
   * Replace the built-in pagination component with a custom component
   */
  PaginationComponent: _propTypes.default.elementType,

  /**
   * Replace the built-in toolbar component that contains the action menu and global filter controls
   * with a custom component.
   */
  ToolbarComponent: _propTypes.default.elementType,

  /**
   * Props applied to the built-in action menu. See ActionMenu component for available props.
   */
  actionMenuProps: _propTypes.default.shape({
    options: _propTypes.default.arrayOf(_propTypes.default.shape({
      /**
       * Change the cancel button label in the confirm dialog
       */
      cancelActionText: _propTypes.default.string,

      /**
       * Change the label of the confirmation button in the confirm dialog
       */
      confirmActionText: _propTypes.default.string,

      /**
       * If supplied, the option will show a confirm dialog this message when selected.
       */
      confirmMessage: _propTypes.default.string,

      /**
       * If supplied, the option will show a confirm dialog this title when selected
       */
      confirmTitle: _propTypes.default.string,

      /**
       * Secondary option label
       */
      details: _propTypes.default.string,

      /**
       * Disable the option
       */
      isDisabled: _propTypes.default.bool,

      /**
       * Option label
       */
      label: _propTypes.default.string.isRequired,

      /**
       * If supplied, this function will be called in addition to onSelect
       */
      onClick: _propTypes.default.func
    }))
  }),

  /**
   * Can go to next page
  */
  canNextPage: _propTypes.default.bool,

  /**
   * Can go to previous page
  */
  canPreviousPage: _propTypes.default.bool,

  /**
   * The content of the Button
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * Column header data
   */
  columns: _propTypes.default.arrayOf(_propTypes.default.object),

  /**
   * Row data as an array of objects
   */
  data: _propTypes.default.arrayOf(_propTypes.default.object),

  /**
   * Set the global text filter on a delay
   */
  debounceSetGlobalFilter: _propTypes.default.func,

  /**
   * Flattened array of the original column data
   */
  flatColumns: _propTypes.default.arrayOf(_propTypes.default.object),

  /**
   * Get props for table
   */
  getTableProps: _propTypes.default.func,

  /**
   * Jump to a page
   */
  gotoPage: _propTypes.default.func,

  /**
   * Table headers
   */
  headerGroups: _propTypes.default.array,

  /**
   * Should show the table filters
   */
  isFilterable: _propTypes.default.bool,

  /**
   * Show loading indicator
   */
  isLoading: _propTypes.default.bool,

  /**
   * Is set to true if the table rows are selectable
   */
  isSelectable: _propTypes.default.bool,

  /**
   * Labels for various controls
   */
  labels: _propTypes.default.shape({
    /**
     * The "All filters" button in table toolbar
     */
    allFilters: _propTypes.default.string,

    /**
     * Drawer title for all filters
     */
    allFiltersDrawerTitle: _propTypes.default.string,

    /**
     * Label for clearing all filters
     */
    clearAllFilters: _propTypes.default.string,

    /**
     * Label for clearing a single filter
     */
    clearFilter: _propTypes.default.string,

    /**
     * Global filter text input label
     */
    globalFilterPlaceholder: _propTypes.default.string,

    /**
     * Loading message
     */
    loading: _propTypes.default.string,

    /**
     * Next button label
     */
    next: _propTypes.default.string,

    /**
     * Function to generate the total number of pages ({ count }) => \`of ${count}\`,
     */
    pageOf: _propTypes.default.func,

    /**
     * Function to generate the label in select dropdown ({ count }) => \`${count} rows`,
     */
    pageSizeSelect: _propTypes.default.func,

    /**
     * Previous button label
     */
    previous: _propTypes.default.string
  }),

  /**
   * Go to next page
   */
  nextPage: _propTypes.default.func,

  /**
   * Event triggered when global filter field has changed
   */
  onGlobalFilterChange: _propTypes.default.func,

  /**
   * Event triggered when a filter is removed with the `(key, multiSelectValueIfAvailable) => {}` signature.
   */
  onRemoveFilter: _propTypes.default.func,

  /**
   * Event triggered when a manual filter is removed with the `(key) => {}` signature.
   */
  onRemoveManualFilter: _propTypes.default.func,

  /**
   * Event triggered when a row is clicked
   */
  onRowClick: _propTypes.default.func,

  /**
   * Pages
   */
  page: _propTypes.default.array,

  /**
   * pageCount
   */
  pageCount: _propTypes.default.number,

  /**
   * Page options
   */
  pageOptions: _propTypes.default.array,

  /**
   * Row data as an array of objects
   */
  pageSizes: _propTypes.default.arrayOf(_propTypes.default.number),

  /**
   * Custom row renderer
   */
  prepareRow: _propTypes.default.func,

  /**
   * Go to previous page
   */
  previousPage: _propTypes.default.func,

  /**
   * Set the global text filter
   */
  setGlobalFilter: _propTypes.default.func,

  /**
   * Set the size of the pages
   */
  setPageSize: _propTypes.default.func,

  /**
   * Callback for setting the state shouldShowAdditionalFilters
   */
  setShowAdditionalFilters: _propTypes.default.func,

  /**
   * Show or hide the additional filters drawer
   */
  shouldShowAdditionalFilters: _propTypes.default.bool,

  /**
   * Table state
   */
  state: _propTypes.default.object
};
DataTable.defaultProps = {
  FilterDrawerButtonComponent: function FilterDrawerButtonComponent() {},
  FilterDrawerComponent: function FilterDrawerComponent() {},
  ToolbarComponent: function ToolbarComponent() {},
  PaginationComponent: function PaginationComponent() {},
  isFilterable: true,
  labels: defaultLabels,
  pageSizes: [10, 20, 30, 40, 50]
};
var _default = DataTable;
exports.default = _default;