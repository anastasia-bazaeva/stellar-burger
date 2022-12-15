import { configureStore } from '@reduxjs/toolkit';
import reducerConstructor from './constructor-reducers.js';
import reducerIngredients from './ingredient-reducers.js';
import reducerDetails from './ingredient-details-reducers';
import reducerAuth from './auth-reducers';
import { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError } from '../actions/middleware-actions';
import { socketMiddleware } from '../middleware.js';
import WSReducer from './ws-reducers.js';

const wsActions = {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage
}


const burgerMiddleware = socketMiddleware(wsActions);

const store = new configureStore({
  reducer: {
    reducerIngredients,
    reducerConstructor,
    reducerDetails,
    reducerAuth,
    WSReducer
  },
  middleware: (getDafaultMiddleware) => {
    return getDafaultMiddleware().concat(burgerMiddleware)
  }
});

export default store;