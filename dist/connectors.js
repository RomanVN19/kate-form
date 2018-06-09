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

const input = (_ref) => {
  let { onChange, setData, inputType, value } = _ref,
      props = _objectWithoutProperties(_ref, ['onChange', 'setData', 'inputType', 'value']);

  const change = e => {
    setData('value', e.target.value);
    if (onChange) onChange(e.target.value);
  };
  return _react2.default.createElement('input', _extends({ onChange: change, type: inputType, value: value || '' }, props));
};

const label = (_ref2) => {
  let { title, setData } = _ref2,
      props = _objectWithoutProperties(_ref2, ['title', 'setData']);

  return _react2.default.createElement(
    'span',
    props,
    title
  );
};

const subform = (_ref3) => {
  let { path } = _ref3,
      props = _objectWithoutProperties(_ref3, ['path']);

  return _react2.default.createElement(_KateForm2.default, {
    path: `${path}.data`
  });
};

const button = (_ref4) => {
  let { title, setData } = _ref4,
      props = _objectWithoutProperties(_ref4, ['title', 'setData']);

  return _react2.default.createElement(
    'button',
    props,
    title
  );
};

const group = (_ref5) => {
  let { path, elements, layout } = _ref5,
      props = _objectWithoutProperties(_ref5, ['path', 'elements', 'layout']);

  return _react2.default.createElement(
    'div',
    { style: layout === 'horizontal' ? { display: 'flex' } : null },
    elements.map((item, index) => _react2.default.createElement(
      'div',
      { key: index },
      _react2.default.createElement(_KateForm2.default, { path: `${path}.elements.${index}` })
    ))
  );
};

const connectors = {
  input,
  button,
  subform,
  label,
  group
};

const Elements = {
  INPUT: 'input',
  BUTTON: 'button',
  FORM: 'subform',
  LABEL: 'label',
  GROUP: 'group'
};

exports.connectors = connectors;
exports.Elements = Elements;