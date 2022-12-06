import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie, request, apiLink, deleteCookie } from '../../utils/utils';

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
    
    export const refreshToken = ()=> {
        const res = request(`${apiLink}auth/token`, {
            method: 'POST',
               headers: {
                "Content-Type": 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
        })
        return res
    } 

    const fetchUser = async (method, data) => {
        const res = await request(`${apiLink}auth/user`, {
            method: method,
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + getCookie('accessToken')
            }, 
            body: data
        })
        return res
    }

    export const getUserInfo = createAsyncThunk (
        'reducerAuth/getUserInfo',
        async (thunkAPI) => {
            if(getCookie('accessToken')){
                return await fetchUser('GET', null)
            }
            const refreshRes = await refreshToken();
                    setCookie('accessToken', refreshRes.accessToken.split('Bearer ')[1]);
                    localStorage.setItem('refreshToken', refreshRes.refreshToken);
                    return await fetchUser('GET', null)
    });

    export const updateUserInfo = createAsyncThunk(
        'reducerAuth/updateUserInfo',
        async (data, thunkAPI) => {
            if(getCookie('accessToken')) {
            return fetchUser('PATCH', JSON.stringify(data))
            }
            const refreshRes = await refreshToken();
                    setCookie('accessToken', refreshRes.accessToken.split('Bearer ')[1]);
                    localStorage.setItem('refreshToken', refreshRes.refreshToken);
                    return fetchUser('PATCH', JSON.stringify(data))
            });


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
            state.errorMessage = action.error.message;
            deleteCookie('accessToken');
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
            state.errorMessage = action.error.message;
            deleteCookie('accessToken');
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
            state.user = null;
            state.errorMessage = action.error.message
        }
    }
})
export const { updateUser, clearAuthCheck } = reducerAuth.actions;
export default reducerAuth.reducer;