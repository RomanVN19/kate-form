'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIn = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var _context = require('./context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const getIn = exports.getIn = (obj, path) => {
  const pathArray = Array.isArray(path) ? path : path.split('.');
  if (pathArray[pathArray.length - 1] === '') pathArray.pop();
  let currentData = obj;
  for (let i = 0; i < pathArray.length && currentData; i += 1) {
    currentData = currentData[pathArray[i]];
  }
  return currentData;
};

const KateForm = props => {
  const {
    data, connectors,
    path, setData,
    logRerender
  } = props;
  if (logRerender) console.log('render ', path, data); // eslint-disable-line no-console

  if (!data) {
    console.error(`[kate-form] Error connecting element: data on path ${path} is null`);
    return null;
  }

  if (Array.isArray(data)) {
    // render sub elements
    return _react2.default.createElement(
      'div',
      null,
      data.map((element, index) => _react2.default.createElement(ConnectedKateForm, {
        key: element.id || index,
        path: `${path}.${index}`
      }))
    );
  }
  // render element
  const { type } = data,
        elementProps = _objectWithoutProperties(data, ['type']);
  if (!data.type || !connectors[data.type] || data.hidden) return null;
  const ElementComponent = connectors[data.type];
  return _react2.default.createElement(ElementComponent, _extends({
    setData: setData,
    path: path
  }, elementProps));
};

const KateFormWithContext = props => _react2.default.createElement(
  _context.Consumer,
  null,
  context => _react2.default.createElement(KateForm, _extends({ connectors: context.connectors, logRerender: context.logRerender }, props))
);

const mapStateToProps = (state, ownProps) => ({
  data: getIn(state['kate-form'], ownProps.path)
});

const mapDispathToProps = (dispatch, ownProps) => {
  const setData = (0, _actions.getSetData)(ownProps.path);
  return {
    setData: (path, data) => dispatch(setData(path, data))
  };
};

const ConnectedKateForm = (0, _reactRedux.connect)(mapStateToProps, mapDispathToProps)(KateFormWithContext);
exports.default = ConnectedKateForm;