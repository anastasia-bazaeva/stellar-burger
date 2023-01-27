import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
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
//у меня сломался стор при типизации мидлвара, и я обновила зависимости, как показали на вебинаре.
//Не помогло, зато теперь у меня сломалась типизация экшенов (и библиотек), и вместо
// TAppDispatch = typeof store.dispatch пришлось прописывать новое значение. Надеюсь, так можно

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = ThunkDispatch<TRootState, null, AnyAction>;