import React from 'react';
import { connectors as defaultConnectors } from './connectors';

const { Provider, Consumer } = React.createContext({
  connectors: defaultConnectors,
  logRerender: false,
  t: value => value,
});

const KateFormProvider = ({ connectors, logRerender, t, children }) => (
  <Provider value={{ connectors, logRerender, t }}>
    {children}
  </Provider>
);

export {
  KateFormProvider,
  Consumer,
};
