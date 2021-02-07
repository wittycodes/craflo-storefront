"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.array.find");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reactTable = require("react-table");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Actions
_reactTable.actions.resetManualFilters = "resetManualFilters";
_reactTable.actions.setManualFilters = "setManualFilters";
_reactTable.actions.setAllManualFilters = "setAllManualFilters";

var useManualFilters = function useManualFilters(hooks) {
  hooks.stateReducers.push(reducer);
  hooks.useInstance.push(useInstance);
};

useManualFilters.pluginName = "useManualFilters";
/**
 * State reducer
 * @param {Object} state State
 * @param {String} action Action name
 * @param {Object} previousState Previous state object
 * @param {Object} instance Table instance
 * @returns {Object} New state
 */

function reducer(state, action, previousState, instance) {
  if (action.type === _reactTable.actions.init) {
    return _objectSpread({
      manualFilters: []
    }, state);
  }

  if (action.type === _reactTable.actions.resetManualFilters) {
    return _objectSpread(_objectSpread({}, state), {}, {
      manualFilters: instance.initialState.manualFilters || []
    });
  }

  if (action.type === _reactTable.actions.setManualFilters) {
    var manualFilterId = action.manualFilterId,
        manualFilterValue = action.manualFilterValue;
    var previousManualFilter = state.manualFilters.find(function (filter) {
      return filter.id === manualFilterId;
    });
    var newManualFilterValue = (0, _reactTable.functionalUpdate)(manualFilterValue, previousManualFilter && previousManualFilter.value);

    if (previousManualFilter) {
      return _objectSpread(_objectSpread({}, state), {}, {
        manualFilters: state.manualFilters.map(function (filter) {
          if (filter.id === manualFilterId) {
            return {
              id: manualFilterId,
              value: newManualFilterValue
            };
          }

          return filter;
        }).filter(function (_ref) {
          var value = _ref.value;
          return typeof value !== "undefined" && value !== null;
        })
      });
    }

    return _objectSpread(_objectSpread({}, state), {}, {
      manualFilters: [].concat((0, _toConsumableArray2.default)(state.manualFilters), [{
        id: manualFilterId,
        value: newManualFilterValue
      }])
    });
  }

  if (action.type === _reactTable.actions.setAllManualFilters) {
    var manualFilters = action.manualFilters;
    return _objectSpread(_objectSpread({}, state), {}, {
      manualFilters: (0, _reactTable.functionalUpdate)(manualFilters, state.manualFilters).filter(function (_ref2) {
        var value = _ref2.value;
        return typeof value !== "undefined" && value !== null;
      })
    });
  }

  return state;
}
/**
 *
 * @param {Object} instance Table instance
 * @returns {undefined} No return value
 */


function useInstance(instance) {
  var data = instance.data,
      manualFilters = instance.manualFilters,
      dispatch = instance.dispatch,
      _instance$autoResetMa = instance.autoResetManualFilters,
      autoResetManualFilters = _instance$autoResetMa === void 0 ? true : _instance$autoResetMa;

  var setManualFilters = function setManualFilters(manualFilterId, manualFilterValue) {
    dispatch({
      type: _reactTable.actions.setManualFilters,
      manualFilterId: manualFilterId,
      manualFilterValue: manualFilterValue
    });
  };

  var setAllManualFilters = function setAllManualFilters(manualFiltersParam) {
    dispatch({
      type: _reactTable.actions.setAllManualFilters,
      manualFilters: manualFiltersParam
    });
  };

  var getAutoResetManualFilters = (0, _reactTable.useGetLatest)(autoResetManualFilters);
  (0, _reactTable.useMountedLayoutEffect)(function () {
    if (getAutoResetManualFilters()) {
      dispatch({
        type: _reactTable.actions.resetManualFilters
      });
    }
  }, [dispatch, manualFilters ? null : data]);
  Object.assign(instance, {
    setManualFilters: setManualFilters,
    setAllManualFilters: setAllManualFilters
  });
}

var _default = useManualFilters;
exports.default = _default;