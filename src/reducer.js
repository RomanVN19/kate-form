import { SET_DATA } from './actions';
import { getIn } from './KateForm';

const setFieldValue = (data, field, value) => {
  const newData = Array.isArray(data) ? [...data] : { ...data };
  newData[field] = value;
  return newData;
};

// eslint-disable-next-line import/prefer-default-export
export const reducer = (state = {}, action) => {
  const { type, path, data } = action;

  switch (type) {
    case SET_DATA: {
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
        const parent = getIn(state, pathArray);
        parent[subElementField] = setFieldValue(parent[subElementField], field, data);
      }

      return { ...state, [firstElement]: element };
    }
    default: return state;
  }
};
