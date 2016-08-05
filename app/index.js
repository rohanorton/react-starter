/*globals document */
import './main.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

let store = createStore(todoApp);
const element = document.createElement('div');
document.body.appendChild(element);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  element
);
