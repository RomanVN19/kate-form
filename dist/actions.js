'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_DATA = exports.SET_DATA = '@@kate-form/SET_DATA';

var setData = function setData(path, data) {
  return { type: SET_DATA, path: path, data: data };
};

var getSetData = exports.getSetData = function getSetData(subPath) {
  return function (path, data) {
    return setData('' + (subPath || '') + (path ? '.' : '') + path, data);
  };
};