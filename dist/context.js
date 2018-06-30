'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.KateFormProvider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectors = require('./connectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$createContext = _react2.default.createContext({
  connectors: _connectors.connectors,
  logRerender: false
}),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

var KateFormProvider = function KateFormProvider(_ref) {
  var connectors = _ref.connectors,
      logRerender = _ref.logRerender,
      children = _ref.children;
  return _react2.default.createElement(
    Provider,
    { value: { connectors: connectors, logRerender: logRerender } },
    children
  );
};

exports.KateFormProvider = KateFormProvider;
exports.Consumer = Consumer;