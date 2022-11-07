//import { combineReducers } from 'redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderNumber } from '../../utils';

const initialStateConstructor = {
    constructorIngredients: [],
    orderList: null,
    orderNumber: 0,
    priceState: 0,
    //вообще никак кроме написать 1255 цифрами не могла получить корректное монтирование компонента конструктора. Либо
    //тотал был NaN, либо не собирался проект с ошибкой, что нет .price у undefined(
    selectedBun: null,
    isLoading: false,
    count: []
}
export const getOrder = createAsyncThunk(
        'reducerConstructor/getOrder',
        getOrderNumber
      )

// export const getOrder = createAsyncThunk(
//     'reducerConstructor/getOrder',
//     async (data, thunkAPI) => {
//       const res = getOrderNumber(data);
//     return res
//   })

export const reducerConstructor = createSlice({
    name: 'reducerConstructor',
    initialState: initialStateConstructor,
    reducers: {
        addItem: (state, action) => {
            state.constructorIngredients = [...state.constructorIngredients, action.payload];
            state.count = [...state.count, action.payload._id]
        },
        addItemPrice: (state, action) => {
            state.priceState = state.priceState + action.payload
        },
        deleteItem: (state, action) => {
            state.constructorIngredients = state.constructorIngredients.filter(item => item._id !== action.payload);
            state.orderList = state.orderList?.filter(item => item._id !== action.payload)
            state.count = state.count.filter(item => item !== action.payload)
            //неправильно, надо не удалять все дубли по id, а только один
        },
        removeItemPrice: (state, action) => {
            state.priceState = state.priceState - action.payload
            //правильно, не надо трогать
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
        // setOrderNumber: (state, action) => {
        //     state.orderNumber = action.payload;
        //     state.orderList = []
        // },
        setBun: (state, action) => {
            state.selectedBun = action.payload;
            // state.count = [...state.count, action.payload._id, action.payload._id]
        },
        // removeBunCount:(state, action) => {
        //     state.count = state.count.filter(item => item !== action.payload)
        // }
    },
    extraReducers: {
        [getOrder.pending]: (state) => {
            state.isLoading = true
        },
        [getOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.orderNumber = action.payload.order.number
        },
        [getOrder.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const { addItem, addItemPrice, deleteItem, removeItemPrice, 
    addBunPrice, removeBunPrice, createOrder, setOrderNumber, setBun, removeBunCount } = reducerConstructor.actions

export default reducerConstructor.reducer;
