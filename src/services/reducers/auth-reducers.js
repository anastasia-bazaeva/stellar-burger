import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie, request, apiLink, deleteCookie } from '../../utils/utils';

// export const checkAuth = () => (dispatch) => {
//     if (getCookie('accessToken')) {
//         dispatch(getUser().finally(() => {
//             dispatch(setAuthCheck())
//         }))
//     } else {
//         dispatch(setAuthCheck())
//     }
//   }

//   const loginUser = () => (dispatch) => {
//     //запрос к серверу
//     //перенести в slice с авторизацией и сделать через асинк усилитель
//     return 
//   }


export const loginUser = createAsyncThunk(
    'reducerAuth/loginUser',
    async (data, thunkAPI) => {
        const res = request(`${apiLink}auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return res
    });

    export const registerUser = createAsyncThunk(
        'reducerAuth/registerUser',
        async (data, thunkAPI) => {
            const res = request(`${apiLink}auth/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return res
        }); 
    
    export const logoutUser = createAsyncThunk(
        'reducerAuth/logoutUser',
        async (refreshToken, thunkAPI) => {
            const res = request(`${apiLink}auth/logout`, {
                method: 'POST',
                headers: {
                     "Content-Type": "application/json"
                 },
                body: JSON.stringify({"token": refreshToken})
            })
            return res
        });

    export const resetPassword = createAsyncThunk(
        'reducerAuth/resetPassword',
        async (email, thunkAPI) => {
            const res = request(`${apiLink}password-reset`, {
                method: 'POST',
                headers: {
                     "Content-Type": "application/json"
                 },
                body: JSON.stringify(email)
            })
            return res
        });

    export const setNewPassword = createAsyncThunk(
        'reducerAuth/setNewPassword',
        async (password, thunkAPI) => {
            const res = request(`${apiLink}password-reset/reset`, {
                method: 'POST',
                   headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(password)
            })
            return res
        });
    
    export const refreshToken = createAsyncThunk(
        'reducerAuth/refreshToken',
        async (thunkAPI) => {
            const res = request(`${apiLink}token`, {
                method: 'POST',
                   headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "token": localStorage.getItem('refreshToken') })
            })
            return res
        });

    export const getUserInfo = createAsyncThunk (
        'reducerAuth/getUserInfo',
        async (thunkAPI) => {
            const res = request(`${apiLink}auth/user`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + getCookie('accessToken')
                }
            })
            return res
        });

    export const updateUserInfo = createAsyncThunk(
        'reducerAuth/updateUserInfo',
        async (data, thunkAPI) => {
            const res = request(`${apiLink}auth/user`, {
                method: 'PATCH',
                   headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + getCookie('accessToken')
                },
                body: JSON.stringify(data)
            })
        return res 
        })

const initialAuth = {
    isAuthChecked: null,
    user: null,
    hasError: false,
    isLoading: false,
    resetSent: false,
    errorMessage: null
}

const reducerAuth = createSlice({
    name: 'reducerAuth',
    initialState: initialAuth,
    reducers: {
        updateUser: (state, action) => {
            state.user[action.payload.name] = action.payload.name
        },
        clearAuthCheck: (state) => {
            state.isAuthChecked = null
        }
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.isAuthChecked = "success";
            setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', action.payload.refreshToken)
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        },
        [registerUser.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.isAuthChecked = 'success';
            setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', action.payload.refreshToken)
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        },
        [logoutUser.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null
        },
        [logoutUser.fulfilled]: (state) => {
            state.isLoading = false;
            state.user = null;
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken')
        },
        [logoutUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        },
        [resetPassword.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.resetSent = true
        },
        [resetPassword.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        },
        [setNewPassword.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null
        },
        [setNewPassword.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [setNewPassword.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        },
        [getUserInfo.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.user = action.payload.user;
        },
        [getUserInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        },
        [updateUserInfo.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null
        },
        [updateUserInfo.fulfilled]: (state, action) => {
            state.user = action.payload.user;
        },
        [updateUserInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        },
        [refreshToken.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null
        },
        [refreshToken.fulfilled]: (action) => {
            setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', action.payload.refreshToken)
        },
        [refreshToken.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        }
    }
})
export const { updateUser, clearAuthCheck } = reducerAuth.actions;
export default reducerAuth.reducer;