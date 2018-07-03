'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withKateForm = exports.getValues = exports.KateFormProvider = exports.createContent = exports.setFieldValue = exports.setValues = exports.setIn = exports.getIn = exports.setConnectors = exports.getSetData = exports.reducer = exports.Elements = exports.connectors = exports.KateForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _KateForm = require('./KateForm');

var _KateForm2 = _interopRequireDefault(_KateForm);

var _connectors = require('./connectors');

var _reducer = require('./reducer');

var _actions = require('./actions');

var _context = require('./context');

var _withKateForm = require('./withKateForm');

var _withKateForm2 = _interopRequireDefault(_withKateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createElement = function createElement(getContent, path, setFormData) {
  var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return new Proxy({}, {
    get: function get(target, prop) {
      return (0, _KateForm.getIn)(getContent(), path)[prop];
    },
    set: function set(target, prop, value) {
      setFormData('' + prefix + (prefix ? '.' : '') + path + '.' + prop, value);
      return true;
    }
  });
};

var findPath = function findPath(data, id, sub) {
  if (data.id === id) return '';
  if (data[sub]) {
    var subPath = findPath(data[sub], id, sub);
    if (subPath) return sub + '.' + subPath;
  }
  for (var i = 0; i < data.length; i += 1) {
    if (data[i].id === id) {
      return '' + i;
    } else if (data[i][sub]) {
      var _subPath = findPath(data[i][sub], id, sub);
      if (_subPath) return i + '.' + sub + '.' + _subPath;
    }
  }
  return undefined;
};

var createContent = function createContent(getFormData, setFormData) {
  var sub = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'elements';
  var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  var getContent = function getContent() {
    return prefix ? (0, _KateForm.getIn)(getFormData(), prefix) : getFormData();
  };
  var elementsProxies = {};
  return new Proxy({}, {
    get: function get(target, prop) {
      var content = getContent();
      var path = findPath(content, prop, sub);
      if (path) {
        if (!elementsProxies[path]) {
          elementsProxies[path] = createElement(getContent, path, setFormData, prefix);
        }
        return elementsProxies[path];
      }

      return undefined;
    },
    set: function set() {
      return true;
    }
  });
};

var getValues = function getValues(data) {
  var sub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'elements';
  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  data.forEach(function (element) {
    if (Object.prototype.hasOwnProperty.call(element, 'value')) {
      result[element.id] = element.value; // eslint-disable-line no-param-reassign
    }
    if (element[sub]) {
      getValues(element[sub], sub, result);
    }
  });
  return result;
};

var setFieldValue = function setFieldValue(data, field, value) {
  var newData = Array.isArray(data) ? [].concat(_toConsumableArray(data)) : _extends({}, data);
  newData[field] = value;
  return newData;
};

var setIn = function setIn(data, path, value) {
  var pathArray = path.split('.');

  if (pathArray.length < 2) {
    // can't make new object
    return;
  }
  var field = pathArray.pop();
  var subElementField = pathArray.pop();
  var parent = (0, _KateForm.getIn)(data, pathArray);
  parent[subElementField] = setFieldValue(parent[subElementField], field, value);
};

var setValues = function setValues(values, data, setData) {
  var sub = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'elements';

  Object.keys(values).forEach(function (key) {
    var path = findPath(data, key, sub);
    if (path) {
      setIn(data, path + '.value', values[key]);
    }
  });
  setData('', data);
};

exports.KateForm = _KateForm2.default;
exports.connectors = _connectors.connectors;
exports.Elements = _connectors.Elements;
exports.reducer = _reducer.reducer;
exports.getSetData = _actions.getSetData;
exports.setConnectors = _actions.setConnectors;
exports.getIn = _KateForm.getIn;
exports.setIn = setIn;
exports.setValues = setValues;
exports.setFieldValue = setFieldValue;
exports.createContent = createContent;
exports.KateFormProvider = _context.KateFormProvider;
exports.getValues = getValues;
exports.withKateForm = _withKateForm2.default;