import {createReducer} from '@reduxjs/toolkit';
import { WebsocketStatus } from "../../utils/utils";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/middleware-actions';

const initialState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    orders: []
}

export const WSReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = ''
    })
    .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
        state.connectionError = ''
    })
    .addCase(wsError, (state, action) => {
        state.connectionError = action.payload
    })
    .addCase(wsMessage, (state, action) => {
        state.orders = action.payload
    })
})

export default WSReducer