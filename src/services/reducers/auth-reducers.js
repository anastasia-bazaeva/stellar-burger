import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialAuth = {
    isAuthChecked: false,
    user: null,
    hasError: false,
}

const reducerAuth = createSlice({
    name: 'reducerAuth',
    initialState: initialAuth,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})
export const {setUser} = reducerAuth.actions;
export default reducerAuth.reducer;