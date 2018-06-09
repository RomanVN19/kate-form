'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.KateFormProvider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectors = require('./connectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Provider, Consumer } = _react2.default.createContext({
  connectors: _connectors.connectors,
  logRerender: false
});

const KateFormProvider = ({ connectors, logRerender, children }) => _react2.default.createElement(
  Provider,
  { value: { connectors, logRerender } },
  children
);

exports.KateFormProvider = KateFormProvider;
exports.Consumer = Consumer;