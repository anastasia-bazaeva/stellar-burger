import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { Provider } from 'react-redux';
import store from './components/services/reducers/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') 
);

root.render(
  <Provider store={store}>
    <App/>
    </Provider>
);

export default store;