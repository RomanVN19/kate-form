
export const SET_DATA = '@@kate-form/SET_DATA';
export const CONNECTORS = Symbol('connectors');

const setData = (path, data) => ({ type: SET_DATA, path, data });

export const getSetData = subPath =>
  (path, data) => setData(`${subPath || ''}${path ? '.' : ''}${path}`, data);
