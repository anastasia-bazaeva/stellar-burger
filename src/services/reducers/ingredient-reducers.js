import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInfo } from '../../utils/utils';


const initialStateIngredients = {
    ingredientsData: [],
    isLoading: false,
    ingredientsDetails: {},
    defaultBun: []
}

export const getData = createAsyncThunk(
    'reducerIngredients/getData',
    async (thunkAPI) => {
        const res = getInfo();
        return res
    })

const reducerIngredients = createSlice({
    name: 'reducerIngredients',
    initialState: initialStateIngredients,
    reducers: {
        showDetails: (state, action) => {
            state.ingredientsDetails = action.payload
        },
        hideDetails: (state, action) => {
            state.ingredientsDetails = {}
        }
    },
    extraReducers: {
        [getData.pending]: (state) => {
            state.isLoading = true
        },
        [getData.fulfilled]: (state, action) => {
            state.ingredientsData = action.payload.data;
            state.defaultBun = action.payload.data.find(item => item.type === "bun");
            state.isLoading = false
        },
        [getData.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const { getIngredients, setIngredients, getError, showDetails, hideDetails } = reducerIngredients.actions

export default reducerIngredients.reducer;