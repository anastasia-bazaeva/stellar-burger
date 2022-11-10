import { createSlice } from '@reduxjs/toolkit';

const initialDetails = {
    productDetails: {}
}

export const reducerDetails = createSlice({
    name: 'reducerDetails',
    initialState: initialDetails,
    reducers: {
        setDetails: (state, action) => {
            state.productDetails = action.payload
        },
        clearDetails: (state) => {
            state.productDetails = {}
        }
    }
})

export const { setDetails, clearDetails } = reducerDetails.actions

export default reducerDetails.reducer;