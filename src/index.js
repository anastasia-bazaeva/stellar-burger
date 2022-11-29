import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import { Provider } from 'react-redux';
import store from './services/reducers/store';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default store;