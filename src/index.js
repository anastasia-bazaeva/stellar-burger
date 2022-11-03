import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
//import rootReducer from './components/services/reducers/reducers';
// import reportWebVitals from './reportWebVitals';

//import { compose, createStore, applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import reducerConstructor from './components/services/reducers/reducers.js';
import reducerIngredients from './components/services/reducers/ingredient-reducers.js';
import { Provider } from 'react-redux';

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose; 

// const enhancer = composeEnhancers(applyMiddleware());

// const store = createStore(rootReducer, composeWithDevTools()); 

const store = new configureStore({
  reducer: {
    reducerIngredients,
    reducerConstructor
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') 
);

root.render(
  <Provider store={store}>
    <App/>
    </Provider>
);

export default store;