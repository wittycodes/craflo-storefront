"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _Chip = _interopRequireDefault(require("../../Chip"));

/**
 * @name getFilterLabel
 * @summary Get the filter label from the labels object
 * @param {Object} labels Filter labels
 * @param {String|Number} filterValue Simple value to match with a label if available
 * @returns {String} A label to display in the chip
 */
function getFilterLabel(labels, filterValue) {
  if (!labels) return filterValue;
  return labels["filterChipValue.".concat(filterValue)] || filterValue;
}
/**
 * @name DataTableFilterChipBar
 * @summary Component to display chips for the DataTable
 * @param {Object} props Component props
 * @returns {PropTypes.elementType} React component
 */


function DataTableFilterChipBar(props) {
  var filters = props.filters,
      manualFilters = props.manualFilters,
      labels = props.labels,
      onRemove = props.onRemove,
      onRemoveManualFilter = props.onRemoveManualFilter; // Don't show the component if there aren't any filters to show

  if (filters.length === 0 && manualFilters.length === 0) return null;
  var manualFilterChips = manualFilters.map(function (_ref) {
    var id = _ref.id;
    return /*#__PURE__*/_react.default.createElement(_core.Box, {
      key: "single_".concat(id),
      paddingRight: 0.5,
      paddingBottom: 0.5
    }, /*#__PURE__*/_react.default.createElement(_Chip.default, {
      color: "primary",
      label: id,
      onDelete: function onDelete() {
        return onRemoveManualFilter(id);
      },
      style: {
        marginRight: "4px"
      }
    }));
  }); // Show filters as chips

  var chips = filters.map(function (_ref2) {
    var id = _ref2.id,
        value = _ref2.value;
    var filterValue = value;

    if (Array.isArray(filterValue)) {
      return filterValue.map(function (multiSelectValue) {
        return /*#__PURE__*/_react.default.createElement(_core.Box, {
          key: "multi_".concat(multiSelectValue),
          paddingRight: 0.5,
          paddingBottom: 0.5
        }, /*#__PURE__*/_react.default.createElement(_Chip.default, {
          color: "primary",
          label: getFilterLabel(labels, multiSelectValue),
          onDelete: function onDelete() {
            return onRemove(id, filterValue, multiSelectValue);
          },
          style: {
            marginRight: "4px"
          }
        }));
      });
    }

    return /*#__PURE__*/_react.default.createElement(_core.Box, {
      key: "single_".concat(filterValue),
      paddingRight: 0.5,
      paddingBottom: 0.5
    }, /*#__PURE__*/_react.default.createElement(_Chip.default, {
      color: "primary",
      label: getFilterLabel(labels, filterValue),
      onDelete: function onDelete() {
        return onRemove(id);
      },
      style: {
        marginRight: "4px"
      }
    }));
  });
  return /*#__PURE__*/_react.default.createElement(_core.Box, {
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    display: "flex",
    flexWrap: "wrap"
  }, manualFilterChips, chips);
}

DataTableFilterChipBar.propTypes = {
  filters: _propTypes.default.array,
  labels: _propTypes.default.object,
  manualFilters: _propTypes.default.array,
  onRemove: _propTypes.default.func,
  onRemoveManualFilter: _propTypes.default.func
};
DataTableFilterChipBar.defaultProps = {
  onRemove: function onRemove() {},
  onRemoveManualFilter: function onRemoveManualFilter() {}
};
var _default = DataTableFilterChipBar;
exports.default = _default;