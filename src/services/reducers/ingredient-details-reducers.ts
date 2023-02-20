import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TDetails } from '../../types/ingredient-types';

type TIngredientDetailsInitial = {
    productDetails: {} | TDetails;
}

const initialDetails: TIngredientDetailsInitial = {
    productDetails: {}
}


export const reducerDetails = createSlice({
    name: 'reducerDetails',
    initialState: initialDetails,
    reducers: {
        setDetails: (state, action: PayloadAction<Readonly<TDetails>>) => {
            state.productDetails = action.payload
        },
        clearDetails: (state) => {
            state.productDetails = {}
        }
    }
})

export const { setDetails, clearDetails } = reducerDetails.actions

export default reducerDetails.reducer;