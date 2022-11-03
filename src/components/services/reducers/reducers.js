//import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import { GET_INGREDIENTS_REQ, GET_INGREDIENTS_SUCC, GET_INGREDIENTS_ERR, 
        SHOW_DETAILS, HIDE_DETAILS,
        ADD_ITEM, DELETE_ITEM, ADD_BUN, DELETE_BUN, 
        CREATE_ORDER_OBJ,GET_ORDER_NUMBER } from '../actions/actions';

// const initialStateIngredients = {
//     ingredientsData: [null],
//     isLoading: false,
//     ingredientsDetails: {}
// }


// export const reducerIngredients = (state = initialStateIngredients, action) => {
//     switch (action.type) {
//         case GET_INGREDIENTS_REQ: {
//             return {
//                 ...state,
//                 isLoading: true,
//             }
//         }
//         case GET_INGREDIENTS_SUCC: {
//             return {
//                 ...state,
//                 isLoading: false,
//                 ingredientsData: action.data
//             }
//         }
//         case GET_INGREDIENTS_ERR: {
//             return {
//                 ...state,
//                 isLoading: false
//             }
//         }
//         case SHOW_DETAILS: {
//             return {
//                 ...state,
//                 ingredientsDetails: action.productInfo
//             }
//         }
//         case HIDE_DETAILS: {
//             return {
//                 ...state,
//                 ingredientsDetails: {}
//             }
//         }
//         default: {
//             return {
//                 state
//             }
//         }
//     }
// }

// export const reducerIngredients = createSlice({
//     name: 'reducerIngredients',
//     initialStateIngredients,
//     reducers: {
//         getIngredients: (state, action) => {
//             state.isLoading = true
//         },
//         setIngredients: (state, action) => {
//             state.ingredientsData = action.payload;
//             state.isLoading = false
//         },
//         getError: (state, action) => {
//             state.isLoading = false
//         },
//         showDetails: (state, action) => {
//             state.ingredientsDetails = action.payload
//         },
//         hideDetails: (state, action) => {
//             state.ingredientsDetails = {}
//         }
//     }
// })

const initialStateConstructor = {
    constructorIngredients: [null],
    orderList: {},
    orderNumber: null,
    priceState: 0,
}

// export const reducerConstructor = (state = initialStateConstructor, action) => {
//     switch (action.type) {
//         case ADD_ITEM: {
//             return {
//                 ...state,
//                 constructorIngredients: action.constructorIngredients,
//                 priceState: state.priceState + action.price
//             }
//         }
//         case DELETE_ITEM: {
//             return {
//                 ...state,
//                 constructorIngredients: action.constructorIngredients,
//                 priceState: state.priceState - action.price
//             }
//         }
//         case ADD_BUN: {
//             return {
//                 ...state,
//                 constructorIngredients: action.constructorIngredients,
//                 priceState: state.priceState + action.price*2
//             }
//         }
//         case DELETE_BUN: {
//             return {
//                 ...state,
//                 constructorIngredients: action.constructorIngredients,
//                 priceState: state.priceState - action.price*2
//             }
//         }
//         case CREATE_ORDER_OBJ: {
//             return {
//                 ...state,
//                 orderList: action.orderList
//             }
//         }
//         case GET_ORDER_NUMBER: {
//             return {
//                 ...state,
//                 orderNumber: action.orderNumber,
//                 constructorIngredients: [null],
//                 priceState: 0
//             }
//         }
//         default: {
//             return {
//                 state
//             }
//         }
//     }
// }

export const reducerConstructor = createSlice({
    name: 'reducerConstructor',
    initialState: initialStateConstructor,
    reducers: {
        addItem: (state, action) => {
            state.constructorIngredients = action.payload
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
        }
    }
})


// const rootReducer = combineReducers({
//     reducerIngredients,
//     reducerConstructor
// })

// export default reducerIngredients.reducer;
export const { addItem, addItemPrice, deleteItem, removeItemPrice, 
    addBunPrice, removeBunPrice, createOrder, getOrderNumber } = reducerConstructor.actions

export default reducerConstructor.reducer;
