import { ActionCreatorWithOptionalPayload, ActionCreatorWithoutPayload, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "./reducers/store";
import { Middleware } from 'redux';
import { TOrdersInfo } from "./reducers/ws-reducers";


type TWSActions =  {
  wsConnect: ActionCreatorWithOptionalPayload<string | undefined, string>;
  wsDisconnect: ActionCreatorWithoutPayload<string>;
  wsConnecting: ActionCreatorWithoutPayload<string>;
  onOpen: ActionCreatorWithoutPayload<string>;
  onClose: ActionCreatorWithOptionalPayload<string | undefined, string>
  onError: ActionCreatorWithOptionalPayload<string | undefined, string>
  onMessage: ActionCreatorWithOptionalPayload<TOrdersInfo, string>;
}

//: Middleware<{}, TRootState> спрячу, оно ломает мне приложение
//Я пока просто это убрала, вроде работает и видит где какой экшен нужен и где могут быть аргументы. 
//Кстати, а зачем этому мидлвару вообще мой стор? он же сам ничего не делает с ним, только вызывает экшены, 
//уже прописанные в ws.reducers, и вот там уже есть манипуляции со стором.

export const socketMiddleware = (wsActions: TWSActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;

      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError());
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log('socket.onclose', event);
            dispatch(onError(event.code.toString()))
          }

          dispatch(onClose(event.code.toString()));

          if(isConnected){
            dispatch(wsConnecting())
            reconnectTimer = window.setTimeout(() => {
                dispatch(wsConnect(url))
            }, 7000)
          }

        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        if (wsDisconnect.match(action)) {
          isConnected = false;
          socket.close(1000, 'Работа приложения закончена');
          dispatch(onClose());
        }
      }

      next(action);
    };
  };
};
