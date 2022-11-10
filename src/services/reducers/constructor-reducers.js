import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderNumber } from '../../utils/utils';
import { nanoid } from 'nanoid';
import update from 'immutability-helper';

const initialStateConstructor = {
    constructorIngredients: [],
    orderNumber: 0,
    priceState: 0,
    selectedBun: null,
    isLoading: false,
}

export const getOrder = createAsyncThunk(
    'reducerConstructor/getOrder',
    async (data, thunkAPI) => {
        const res = getOrderNumber(data);
        return res
    })

export const reducerConstructor = createSlice({
    name: 'reducerConstructor',
    initialState: initialStateConstructor,
    reducers: {
        addItem: {
            reducer: (state, action) => {
                state.constructorIngredients.push(action.payload);
                state.priceState = state.priceState + action.payload.price;
            },
            prepare: ingredient => {
                const uid = nanoid();
                return { payload: { ...ingredient, uid } }
            }
        },

        deleteItem: (state, action) => {
            state.constructorIngredients = state.constructorIngredients.filter(item => item.uid !== action.payload);
        },

        removeItemPrice: (state, action) => {
            state.priceState = state.priceState - action.payload
        },

        setBun: (state, action) => {
            state.selectedBun = action.payload;
        },

        clearOrder: (state) => {
            state.selectedBun = null;
            state.priceState = 0;
            state.constructorIngredients = [];
        },

        sort(state, action) {
            const dragIndex = action.payload.dragIndex;
            const hoverIndex = action.payload.hoverIndex;
            const array = [...state.constructorIngredients];
            const draggingItem = array[dragIndex];
            state.constructorIngredients = update(array, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, draggingItem],
                ],
            });
        },
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
    setOrderNumber, setBun, clearOrder, sort } = reducerConstructor.actions

export default reducerConstructor.reducer;
