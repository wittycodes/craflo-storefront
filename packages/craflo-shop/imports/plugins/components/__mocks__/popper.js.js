"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.object.get-own-property-descriptors");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.sort");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _popper = _interopRequireDefault(require("popper.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Popper = function Popper(reference, popper) {
  var _this = this;

  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  (0, _classCallCheck2.default)(this, Popper);
  this.state = {
    isDestroyed: false
  };
  var modifiers = Object.keys(options.modifiers).map(function (name) {
    return _objectSpread({
      name: name
    }, options.modifiers[name]);
  }).sort(function (a, b) {
    return a.order - b.order;
  });

  var update = function update() {
    var data = {
      placement: options.placement,
      arrowStyles: {},
      offsets: {
        popper: {
          position: "absolute"
        },
        reference: {}
      }
    };
    modifiers.forEach(function (m) {
      if (m.enabled && m.fn) {
        m.fn(data, m);
      }
    });
  };

  update();
  return {
    reference: reference,
    popper: popper,
    options: _objectSpread(_objectSpread({}, Popper.Defaults), options),
    state: this.state,
    destroy: function destroy() {
      _this.state.isDestroyed = true;
    },
    scheduleUpdate: function scheduleUpdate() {
      update();
    }
  };
};

exports.default = Popper;
Popper.placements = _popper.default.placements;