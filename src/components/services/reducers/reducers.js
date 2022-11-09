//import { combineReducers } from 'redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderNumber } from '../../utils';
import { nanoid } from 'nanoid';

const initialStateConstructor = {
    constructorIngredients: [],
    orderNumber: 0,
    priceState: 0,
    selectedBun: null,
    isLoading: false,
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
        addItem: {
        reducer: (state, action) => {
            state.constructorIngredients.push(action.payload);
            //state.count = [...state.count, action.payload._id]
        },
        prepare: ingredient => {
            const uid = nanoid();
            return { payload: {...ingredient, uid}}
        }},

        addItemPrice: (state, action) => {
            state.priceState = state.priceState + action.payload
        },
        deleteItem: (state, action) => {
            state.constructorIngredients = state.constructorIngredients.filter(item => item.uid !== action.payload);
            //state.orderList = state.orderList?.filter(item => item._id !== action.payload)
            //state.count = state.count.filter(item => item !== action.payload)
            //неправильно, надо не удалять все дубли по id, а только один
        },
        removeItemPrice: (state, action) => {
            state.priceState = state.priceState - action.payload
            //правильно, не надо трогать
        },
        // addBunPrice: (state, action) => {
        //     state.priceState = state.priceState + action.payload * 2
        // },
        // removeBunPrice: (state, action) => {
        //     state.priceState = state.priceState - action.payload * 2
        // },
        // createOrder: (state, action) => {
        //     state.orderList = action.payload
        // },
        // setOrderNumber: (state, action) => {
        //     state.orderNumber = action.payload;
        //     state.orderList = []
        // },
        setBun: (state, action) => {
            state.selectedBun = action.payload;
            //state.bunCount = [ action.payload._id, action.payload._id ]
            //state.count = [...state.count, action.payload._id, action.payload._id]
        },
        // removeBunCount:(state, action) => {
        //     state.count = state.count.filter(item => item !== action.payload)
        // }
        // setBunCount: (state, action) => {
        //     state.bunCount = [ action.payload._id, action.payload._id ]
        // },

        clearOrder: (state) => {
            state.selectedBun = null;
            state.priceState = 0;
            state.constructorIngredients = [];
        }
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
 setOrderNumber, setBun, clearOrder } = reducerConstructor.actions

export default reducerConstructor.reducer;
