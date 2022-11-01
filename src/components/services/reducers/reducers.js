// import { combineReducers } from 'redux';
// import { GET_INGREDIENTS_REQ, GET_INGREDIENTS_SUCC, GET_INGREDIENTS_ERR, 
//         SHOW_DETAILS, HIDE_DETAILS,
//         ADD_ITEM, DELETE_ITEM, ADD_BUN, DELETE_BUN, 
//         CREATE_ORDER_OBJ,GET_ORDER_NUMBER } from '../actions/actions';

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
//     }
// }

// const initialStateConstructor = {
//     constructorIngredients: [null],
//     orderList: {},
//     orderNumber: null,
//     priceState: 0,
// }

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
//     }
// }

// const rootReducer = combineReducers({
//     ingredients: reducerIngredients,
//     burgerConstructor: reducerConstructor
// })

// export default rootReducer;