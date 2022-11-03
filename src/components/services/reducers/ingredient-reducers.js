import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInfo } from '../../utils';


const initialStateIngredients = {
    ingredientsData: [],
    isLoading: false,
    ingredientsDetails: {}
}

export const getData = createAsyncThunk(
    //action type string
    'reducerIngredients/getData',
    // callback function
    async (thunkAPI) => {
      const res = getInfo();
    return res
  })

const reducerIngredients = createSlice({
    name: 'reducerIngredients',
    initialState: initialStateIngredients,
    reducers: {
        // getIngredients: (state, action) => {
        //     state.isLoading = true
        // },
        // setIngredients: (state, action) => {
        //     state.ingredientsData = action.payload;
        //     state.isLoading = false
        // },
        // getError: (state, action) => {
        //     state.isLoading = false
        // },
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
            state.isLoading = false
        },
        [getData.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const { getIngredients, setIngredients, getError, showDetails, hideDetails } = reducerIngredients.actions

export default reducerIngredients.reducer;