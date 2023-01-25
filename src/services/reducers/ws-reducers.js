import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLink, request, WebsocketStatus } from "../../utils/utils";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen, clearFetchedOrder } from '../actions/middleware-actions';

const initialState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    orders: []
}

export const fetchOrder = createAsyncThunk(
    'WSReducer/fetchOrder',
    async (order, thunkAPI) => {
        const res = request(`${apiLink}orders/${order}`,{
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            }
          })
        return res
    });


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
    .addCase(fetchOrder.pending, (state) => {
        state.status = WebsocketStatus.CONNECTING
    })
    .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = WebsocketStatus.ONLINE;
    })
    .addCase(fetchOrder.rejected, (state) => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(clearFetchedOrder, (state) => {
        state.status = WebsocketStatus.OFFLINE;
        state.orders = []
    })
})

export default WSReducer;