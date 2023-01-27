import { configureStore } from '@reduxjs/toolkit';
import reducerConstructor from './constructor-reducers';
import reducerIngredients from './ingredient-reducers';
import reducerDetails from './ingredient-details-reducers';
import reducerAuth from './auth-reducers';
import { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError } from '../actions/middleware-actions';
import { socketMiddleware } from '../middleware';
import WSReducer from './ws-reducers';


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

const store = configureStore({
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
//беда какая-то
export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch