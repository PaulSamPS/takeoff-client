import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.scss';

import { createStore } from './redux/store';
import { Provider } from 'react-redux';

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
