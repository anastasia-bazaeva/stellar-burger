import { ActionCreatorWithOptionalPayload, ActionCreatorWithoutPayload, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "./reducers/store";
import { Middleware } from 'redux';
import { TOrdersInfo } from "./reducers/ws-reducers";


type TWSActions =  {
  wsConnect: ActionCreatorWithOptionalPayload<string, string>;
  wsDisconnect: ActionCreatorWithoutPayload<string>;
  wsConnecting: ActionCreatorWithoutPayload<string>;
  onOpen: ActionCreatorWithoutPayload<string>;
  onClose: ActionCreatorWithOptionalPayload<string, string>
  onError: ActionCreatorWithOptionalPayload<string, string>
  onMessage: ActionCreatorWithOptionalPayload<TOrdersInfo, string>;
}

//: Middleware<{}, TRootState> периодически прячу

export const socketMiddleware = (wsActions: TWSActions): Middleware<{}, TRootState>=> {
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
