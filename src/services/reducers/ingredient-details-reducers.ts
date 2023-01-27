import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TDetails = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number; 
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

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