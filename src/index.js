import KateForm, { getIn } from './KateForm';
import { connectors, Elements } from './connectors';
import { reducer } from './reducer';
import { getSetData, setConnectors } from './actions';
import { KateFormProvider } from './context';
import withKateForm from './withKateForm';

const createElement = (getContent, path, setFormData, prefix = '') => new Proxy({}, {
  get(target, prop) {
    return getIn(getContent(), path)[prop];
  },
  set(target, prop, value) {
    setFormData(`${prefix}${prefix ? '.' : ''}${path}.${prop}`, value);
    return true;
  },
});

const findPath = (data, id, sub) => {
  if (data.id === id) return '';
  if (data[sub]) {
    const subPath = findPath(data[sub], id, sub);
    if (subPath) return `${sub}.${subPath}`;
  }
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].id === id) {
      return `${i}`;
    } else if (data[i][sub]) {
      const subPath = findPath(data[i][sub], id, sub);
      if (subPath) return `${i}.${sub}.${subPath}`;
    }
  }
  return undefined;
};

const createContent = (getFormData, setFormData, sub = 'elements', prefix = '') => {
  const getContent = () => (prefix ? getIn(getFormData(), prefix) : getFormData());
  const elementsProxies = {};
  return new Proxy({}, {
    get(target, prop) {
      const content = getContent();
      const path = findPath(content, prop, sub);
      if (path) {
        if (!elementsProxies[path]) {
          elementsProxies[path] = createElement(getContent, path, setFormData, prefix);
        }
        return elementsProxies[path];
      }

      return undefined;
    },
    set() {
      return true;
    },
  });
};

const getValues = (data, sub = 'elements', result = {}) => {
  data.forEach((element) => {
    if (element.value) {
      result[element.id] = element.value; // eslint-disable-line no-param-reassign
    }
    if (element[sub]) {
      getValues(element[sub], sub, result);
    }
  });
  return result;
};

export {
  KateForm,
  connectors,
  Elements,
  reducer,
  getSetData,
  setConnectors,
  getIn,
  createContent,
  KateFormProvider,
  getValues,
  withKateForm,
};
