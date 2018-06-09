'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var _KateForm = require('./KateForm');

const setFieldValue = (data, field, value) => {
  const newData = Array.isArray(data) ? [...data] : _extends({}, data);
  newData[field] = value;
  return newData;
};

// eslint-disable-next-line import/prefer-default-export
const reducer = exports.reducer = (state = {}, action) => {
  const { type, path, data } = action;

  switch (type) {
    case _actions.SET_DATA:
      {
        const pathArray = path.split('.');
        const firstElement = pathArray[0];
        let element = state[firstElement];
        if (pathArray.length === 1) {
          element = data;
        } else if (pathArray.length === 2) {
          element = setFieldValue(element, pathArray[1], data);
        } else {
          const field = pathArray.pop();
          const subElementField = pathArray.pop();
          const parent = (0, _KateForm.getIn)(state, pathArray);
          parent[subElementField] = setFieldValue(parent[subElementField], field, data);
        }

        return _extends({}, state, { [firstElement]: element });
      }
    default:
      return state;
  }
};