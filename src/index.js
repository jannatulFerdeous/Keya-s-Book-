import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/shared/styles/index.css';
import App from './App';
import { Provider } from 'react-redux';

import store from './shared/config/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> 
    <App />
  </Provider>
);
