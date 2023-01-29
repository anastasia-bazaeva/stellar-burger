import { createReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersInfo } from '../../types/order-types';
import { apiLink, request, WebsocketStatus } from "../../utils/utils";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen, clearFetchedOrder, wsConnect } from '../actions/middleware-actions';

export type TOrderInitial = {
    status: string;
    connectionError: string | undefined;
    orders: TOrdersInfo;
}

const initialState: TOrderInitial = {
    status: WebsocketStatus.OFFLINE,
    connectionError: undefined,
    orders: {
        orders: [],
        total: 0,
        totalToday: 0
    }
}

export const fetchOrder = createAsyncThunk(
    'WSReducer/fetchOrder',
    async (order: number): Promise<TOrdersInfo> => {
        const res = request(`${apiLink}orders/${order}`,{
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            }
          })
        return res
    });


export const WSReducer = createReducer(initialState, (builder) => {
    return (
    builder.addCase(wsConnecting, (state, action) => {
            state.status = WebsocketStatus.CONNECTING
    }),
    builder.addCase(wsOpen, (state, action) => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = ''
    }),
    builder.addCase(wsClose, (state, action) => {
        state.status = WebsocketStatus.OFFLINE;
        state.connectionError = ''
    }),
    builder.addCase(wsError, (state, action: PayloadAction<string | undefined>) => {
        state.connectionError = action.payload
    }),
    builder.addCase(wsMessage, (state, action: PayloadAction<Readonly<TOrdersInfo>>) => {
        state.orders = action.payload
    }),
    builder.addCase(fetchOrder.pending, (state) => {
        state.status = WebsocketStatus.CONNECTING
    }),
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = WebsocketStatus.ONLINE;
    }),
    builder.addCase(fetchOrder.rejected, (state) => {
        state.status = WebsocketStatus.OFFLINE;
    }),
    builder.addCase(clearFetchedOrder, (state) => {
        state.status = WebsocketStatus.OFFLINE;
        state.orders = {
            orders: [],
            total: 0,
            totalToday: 0
        }
    }))
})

export default WSReducer;