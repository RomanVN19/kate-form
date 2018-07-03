'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var _KateForm = require('./KateForm');

var _index = require('./index');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line import/prefer-default-export
var reducer = exports.reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var type = action.type,
      path = action.path,
      data = action.data;


  switch (type) {
    case _actions.SET_DATA:
      {
        var pathArray = path.split('.');
        var firstElement = pathArray[0];
        var element = state[firstElement];
        if (pathArray.length === 1) {
          element = data;
        } else if (pathArray.length === 2) {
          element = (0, _index.setFieldValue)(element, pathArray[1], data);
        } else {
          var field = pathArray.pop();
          var subElementField = pathArray.pop();
          var parent = (0, _KateForm.getIn)(state, pathArray);
          parent[subElementField] = (0, _index.setFieldValue)(parent[subElementField], field, data);
        }

        return _extends({}, state, _defineProperty({}, firstElement, element));
      }
    default:
      return state;
  }
};