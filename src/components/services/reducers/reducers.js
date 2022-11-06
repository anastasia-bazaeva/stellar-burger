//import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initialStateConstructor = {
    constructorIngredients: [],
    orderList: {},
    orderNumber: null,
    priceState: 1255*2,
    //вообще никак кроме написать 1255 цифрами не могла получить корректное монтирование компонента конструктора. Либо
    //тотал был NaN, либо не собирался проект с ошибкой, что нет .price у undefined(
    selectedBun: []
}

export const reducerConstructor = createSlice({
    name: 'reducerConstructor',
    initialState: initialStateConstructor,
    reducers: {
        addItem: (state, action) => {
            state.constructorIngredients = [...state.constructorIngredients, action.payload]
        },
        addItemPrice: (state, action) => {
            state.priceState = state.priceState + action.payload
        },
        deleteItem: (state, action) => {
            state.constructorIngredients = state.constructorIngredients.filter(item => item._id !== action.payload)
        },
        removeItemPrice: (state, action) => {
            state.priceState = state.priceState - action.payload
        },
        addBunPrice: (state, action) => {
            state.priceState = state.priceState + action.payload * 2
        },
        removeBunPrice: (state, action) => {
            state.priceState = state.priceState - action.payload * 2
        },
        createOrder: (state, action) => {
            state.orderList = action.payload
        },
        getOrderNumber: (state, action) => {
            state.orderNumber = action.payload;
            state.orderList = {}
        },
        setBun: (state, action) => {
            state.selectedBun = action.payload;
        }
    }
})

export const { addItem, addItemPrice, deleteItem, removeItemPrice, 
    addBunPrice, removeBunPrice, createOrder, getOrderNumber, setBun } = reducerConstructor.actions

export default reducerConstructor.reducer;
