import { createReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiLink, request, WebsocketStatus } from "../../utils/utils";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen, clearFetchedOrder, wsConnect } from '../actions/middleware-actions';

export type TOrderInitial = {
    status: string;
    connectionError: string;
    orders: TOrdersInfo;
}

export type TOrder = {
    _id: string;
    owner: string;
    status: string;
    ingredients: Array<string>;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    __v: number;
}

export type TOrdersInfo = {
    success?: boolean, 
    orders: TOrder[] | [];
    total: number;
    totalToday: number;
};


const initialState: TOrderInitial = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    orders: {
        orders: [],
        total: 0,
        totalToday: 0
    }
}

export const fetchOrder = createAsyncThunk(
    'WSReducer/fetchOrder',
    async (order: number): Promise<TOrdersInfo | undefined> => {
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
    .addCase(wsError, (state, action: PayloadAction<string>) => {
        state.connectionError = action.payload
    })
    .addCase(wsMessage, (state, action: PayloadAction<Readonly<TOrdersInfo>>) => {
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
        state.orders = {
            orders: [],
            total: 0,
            totalToday: 0
        }
    })
})

export default WSReducer;