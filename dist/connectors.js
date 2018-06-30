'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Elements = exports.connectors = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KateForm = require('./KateForm');

var _KateForm2 = _interopRequireDefault(_KateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var input = function input(_ref) {
  var onChange = _ref.onChange,
      setData = _ref.setData,
      inputType = _ref.inputType,
      value = _ref.value,
      props = _objectWithoutProperties(_ref, ['onChange', 'setData', 'inputType', 'value']);

  var change = function change(e) {
    setData('value', e.target.value);
    if (onChange) onChange(e.target.value);
  };
  return _react2.default.createElement('input', _extends({ onChange: change, type: inputType, value: value || '' }, props));
};

var label = function label(_ref2) {
  var title = _ref2.title,
      setData = _ref2.setData,
      props = _objectWithoutProperties(_ref2, ['title', 'setData']);

  return _react2.default.createElement(
    'span',
    props,
    title
  );
};

var subform = function subform(_ref3) {
  var path = _ref3.path,
      props = _objectWithoutProperties(_ref3, ['path']);

  return _react2.default.createElement(_KateForm2.default, {
    path: path + '.data'
  });
};

var button = function button(_ref4) {
  var title = _ref4.title,
      setData = _ref4.setData,
      props = _objectWithoutProperties(_ref4, ['title', 'setData']);

  return _react2.default.createElement(
    'button',
    props,
    title
  );
};

var group = function group(_ref5) {
  var path = _ref5.path,
      elements = _ref5.elements,
      layout = _ref5.layout,
      props = _objectWithoutProperties(_ref5, ['path', 'elements', 'layout']);

  return _react2.default.createElement(
    'div',
    { style: layout === 'horizontal' ? { display: 'flex' } : null },
    elements.map(function (item, index) {
      return _react2.default.createElement(
        'div',
        { key: index },
        _react2.default.createElement(_KateForm2.default, { path: path + '.elements.' + index })
      );
    })
  );
};

var connectors = {
  input: input,
  button: button,
  subform: subform,
  label: label,
  group: group
};

var Elements = {
  INPUT: 'input',
  BUTTON: 'button',
  FORM: 'subform',
  LABEL: 'label',
  GROUP: 'group'
};

exports.connectors = connectors;
exports.Elements = Elements;