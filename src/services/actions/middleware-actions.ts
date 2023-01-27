import { createAction } from '@reduxjs/toolkit';
import { TOrdersInfo } from '../reducers/ws-reducers';

export const wsConnect = createAction<string>('WS_CONNECT');
export const wsDisconnect = createAction('WS_DISCONNECT');
export const wsConnecting = createAction('WS_CONNECTING');
export const wsOpen = createAction('WS_OPEN');
export const wsClose = createAction<string>('WS_CLOSE');
export const wsMessage = createAction<TOrdersInfo>('WS_MESSAGE');
export const wsError = createAction<string>('WS_ERROR');
export const clearFetchedOrder = createAction('CLEAR_ORDER');