import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderNumber, TIngredient, TOrderIngredients } from '../../utils/utils';
import { nanoid } from 'nanoid';
import update from 'immutability-helper';
import { TUser } from './auth-reducers';

type TConstructorIngredient = TIngredient & {uid?: string};

type TConstructorInitial = {
    constructorIngredients: Array<TConstructorIngredient> | null;
    orderNumber: number;
    priceState: number;
    selectedBun: TIngredient | null;
    isLoading: boolean;
}

const initialStateConstructor: TConstructorInitial = {
    constructorIngredients: [],
    orderNumber: 0,
    priceState: 0,
    selectedBun: null,
    isLoading: false,
}

type TOrderResponse = {
    order : {
        createdAt: string;
        ingredients: TIngredient[] | TIngredient;
        name: string;
        number: number;
        owner: TOwner;
        price: number;
        status: string;
        updatedAt: string;
        _id: string;
    };
    success: boolean;
}

type TOwner = TUser & {
    createdAt: string;
    updatedAt: string;
}

export const getOrder = createAsyncThunk(
    'reducerConstructor/getOrder',
    async (data: TOrderIngredients): Promise<TOrderResponse | undefined> => {
        const res = getOrderNumber(data);
        return res
    })

export const reducerConstructor = createSlice({
    name: 'reducerConstructor',
    initialState: initialStateConstructor,
    reducers: {
        addItem: {
            reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
                state.constructorIngredients.push(action.payload);
                state.priceState = state.priceState + action.payload.price;
            },
            prepare: (ingredient: TIngredient) => {
                const uid = nanoid();
                return { payload: { ...ingredient, uid } }
            }
        },

        deleteItem: (state, action: PayloadAction<string>) => {
            state.constructorIngredients = state.constructorIngredients.filter(item => item.uid !== action.payload);
        },

        removeItemPrice: (state, action: PayloadAction<number>) => {
            state.priceState = state.priceState - action.payload
        },

        setBun: (state, action: PayloadAction<TIngredient>) => {
            state.selectedBun = action.payload;
        },

        clearOrder: (state) => {
            state.selectedBun = null;
            state.priceState = 0;
            state.constructorIngredients = [];
        },

        sort(state, action: PayloadAction<{dragIndex: number, hoverIndex: number}>) {
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
    extraReducers: (builder) => {
        builder.addCase(getOrder.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderNumber = action.payload.order.number
        }),
        builder.addCase(getOrder.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { addItem, deleteItem, removeItemPrice, setBun, clearOrder, sort } = reducerConstructor.actions

export default reducerConstructor.reducer;
