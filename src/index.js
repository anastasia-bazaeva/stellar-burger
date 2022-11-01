import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import rootReducer from './components/services/reducers/reducers';
// import reportWebVitals from './reportWebVitals';

import { compose, createStore, applyMiddleware } from 'redux';
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const root = ReactDOM.createRoot(
  document.getElementById('root') 
);

const enhancer = composeEnhancers(applyMiddleware());

//const store = createStore(rootReducer, enhancer); 

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
