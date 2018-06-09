'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const SET_DATA = exports.SET_DATA = '@@kate-form/SET_DATA';
const CONNECTORS = exports.CONNECTORS = Symbol('connectors');

const setData = (path, data) => ({ type: SET_DATA, path, data });

const getSetData = exports.getSetData = subPath => (path, data) => setData(`${subPath || ''}${path ? '.' : ''}${path}`, data);