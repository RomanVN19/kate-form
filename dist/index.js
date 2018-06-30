'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withKateForm = exports.getValues = exports.KateFormProvider = exports.createContent = exports.getIn = exports.setConnectors = exports.getSetData = exports.reducer = exports.Elements = exports.connectors = exports.KateForm = undefined;

var _KateForm = require('./KateForm');

var _KateForm2 = _interopRequireDefault(_KateForm);

var _connectors = require('./connectors');

var _reducer = require('./reducer');

var _actions = require('./actions');

var _context = require('./context');

var _withKateForm = require('./withKateForm');

var _withKateForm2 = _interopRequireDefault(_withKateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    if (element.value) {
      result[element.id] = element.value; // eslint-disable-line no-param-reassign
    }
    if (element[sub]) {
      getValues(element[sub], sub, result);
    }
  });
  return result;
};

exports.KateForm = _KateForm2.default;
exports.connectors = _connectors.connectors;
exports.Elements = _connectors.Elements;
exports.reducer = _reducer.reducer;
exports.getSetData = _actions.getSetData;
exports.setConnectors = _actions.setConnectors;
exports.getIn = _KateForm.getIn;
exports.createContent = createContent;
exports.KateFormProvider = _context.KateFormProvider;
exports.getValues = getValues;
exports.withKateForm = _withKateForm2.default;