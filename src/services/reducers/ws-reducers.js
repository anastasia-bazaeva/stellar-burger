import { createSlice } from '@reduxjs/toolkit';

const initialWSState = {
    connected: false,
    authConnected: false,
    error: null,
    authError: null,
    message: [],
    authMessage: []
};

const reducerWS = createSlice({
    name: 'reducerWS',
    initialState: initialWSState,
    reducers: {
        WS_CONNECTION_SUCCESS: (state) => {
            state.connected = true;
            state.error = null
        },
        WS_CONNECTION_CLOSED: (state) => {
            state.connected = false;
            state.error = null
        },
        WS_CONNECTION_ERROR: (state, action) => {
            state.connected = false;
            state.error = action.payload
        },
        WS_GET_MESSAGE: (state, action) => {
            state.message = action.payload
        },
        WS_CONNECTION_AUTH_SUCCESS: (state) => {
            state.authConnected = true;
            state.authError = null
        },
        WS_CONNECTION_AUTH_CLOSED: (state) =>{
            state.authConnected = false;
            state.authError = null
        },
        WS_CONNECTION_AUTH_ERROR: (state, action) => {
            state.authConnected = false;
            state.authError = action.payload
        },
        WS_GET_AUTH_MESSAGE: (state, action) => {
            state.authMessage = action.payload
        }
    }
})

export const {WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE, 
WS_CONNECTION_AUTH_SUCCESS, WS_CONNECTION_AUTH_CLOSED, WS_CONNECTION_AUTH_ERROR, WS_GET_AUTH_MESSAGE} = reducerWS.actions;

export default reducerWS.reducer;