import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TDetails, TIngredient, TIngredientsRes } from '../../types/ingredient-types';
import { getInfo } from '../../utils/utils';

type TInitialStateIngredients = {
    ingredientsData: Array<TIngredient>,
    isLoading: boolean,
    ingredientsDetails: TDetails | null,
    defaultBun: TIngredient | null
}

const initialStateIngredients:TInitialStateIngredients = {
    ingredientsData: [],
    isLoading: false,
    ingredientsDetails: null,
    defaultBun: null
}

export const getData = createAsyncThunk(
    'reducerIngredients/getData',
    async () : Promise<TIngredientsRes | undefined> => {
        const res = getInfo();
        return res
    })

const reducerIngredients = createSlice({
    name: 'reducerIngredients',
    initialState: initialStateIngredients,
    reducers: {
        showDetails: (state, action: PayloadAction<Readonly<TDetails>>) => {
            state.ingredientsDetails = action.payload
        },
        hideDetails: (state) => {
            state.ingredientsDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            state.ingredientsData = action.payload.data;
            console.log(action.payload.data);
            state.defaultBun = action.payload.data.find(item => item.type === "bun");
            state.isLoading = false
        })
        builder.addCase(getData.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export const { showDetails, hideDetails } = reducerIngredients.actions

export default reducerIngredients.reducer;