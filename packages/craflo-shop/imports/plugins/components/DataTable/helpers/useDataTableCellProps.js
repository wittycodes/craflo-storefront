"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDataTableCellProps;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * useDataTableCellProps
 * @summary Hook used to add custom props to cells, and headers from the column definition
 * @param {Object} hooks React Table hook object
 * @returns {Undefined} No return value
 */
function useDataTableCellProps(hooks) {
  // Add a helpers function to get additional headerProps from the column definition
  hooks.getHeaderProps.push(function (props, _ref) {
    var column = _ref.column;

    if (typeof column.headerProps === "function") {
      return [props, _objectSpread({}, column.headerProps(column))];
    }

    return [props, _objectSpread({}, column.headerProps)];
  }); // Add a helpers function to get additional cellProps from the column definition

  hooks.getCellProps.push(function (props, _ref2) {
    var cell = _ref2.cell;

    if (typeof cell.column.cellProps === "function") {
      return [props, _objectSpread({}, cell.column.cellProps(cell))];
    }

    return [props, _objectSpread({}, cell.column.cellProps)];
  });
}

useDataTableCellProps.pluginName = "useDataTableCellProps";