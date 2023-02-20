import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TTokenResponse, TUser, TUserLoginData, TUserRegisterData, TUserResponse } from '../../types/user-types';
import { getCookie, setCookie, request, apiLink, deleteCookie, TMethods } from '../../utils/utils';


export const loginUser = createAsyncThunk(
    'reducerAuth/loginUser',
    async (data: TUserLoginData):Promise<TUserResponse> => {
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
        async (data: TUserRegisterData):Promise<TUserResponse> => {
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
        async (refreshToken: string | null) => {
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
        async (email: {email: string}) => {
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
        async (password: {password: string }):Promise<TUserResponse | undefined> => {
            const res = request(`${apiLink}password-reset/reset`, {
                method: 'POST',
                   headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(password)
            })
            return res
        });
    
    export const refreshToken = ():Promise<TTokenResponse> => {
        const res = request(`${apiLink}auth/token`, {
            method: 'POST',
               headers: {
                "Content-Type": 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
        })
        return res
    } 

    const fetchUser = async (requestMethod: TMethods, data: string | undefined):Promise<TUserResponse | undefined> => {
        const res = await request(`${apiLink}auth/user`, {
            method: requestMethod,
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
        async (): Promise<TUserResponse | undefined> => {
            if(getCookie('accessToken')){
                return await fetchUser('GET', undefined)
            }
            const refreshRes = await refreshToken();
                    setCookie('accessToken', refreshRes.accessToken.split('Bearer ')[1]);
                    localStorage.setItem('refreshToken', refreshRes.refreshToken);
                    return await fetchUser('GET', undefined)
    });

    export const updateUserInfo = createAsyncThunk(
        'reducerAuth/updateUserInfo',
        async (data: TUser | TUserRegisterData): Promise<TUserResponse | undefined> => {
            if(getCookie('accessToken')) {
            return fetchUser('PATCH', JSON.stringify(data))
            }
            const refreshRes = await refreshToken();
                    setCookie('accessToken', refreshRes.accessToken.split('Bearer ')[1]);
                    localStorage.setItem('refreshToken', refreshRes.refreshToken);
                    return fetchUser('PATCH', JSON.stringify(data))
            });


type TUserInitial = {
    isAuthChecked: string | undefined,
    user: TUser | undefined;
    hasError: boolean;
    isLoading: boolean;
    resetSent: boolean;
    errorMessage: string | undefined,
}            

const initialAuth : TUserInitial = {
    isAuthChecked: undefined,
    user: undefined,
    hasError: false,
    isLoading: false,
    resetSent: false,
    errorMessage: undefined
}

const reducerAuth = createSlice({
    name: 'reducerAuth',
    initialState: initialAuth,
    reducers: {
        clearAuthCheck: (state) => {
            state.isAuthChecked = undefined
        }
    },
    extraReducers: (builder) => {
        return (
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.hasError = false
        }),
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload?.user;
            state.isAuthChecked = "success";
            setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', action.payload.refreshToken)
        }),
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message;
            deleteCookie('accessToken');
        }),
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = undefined
        }),
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload?.user;
            state.isAuthChecked = 'success';
            setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', action.payload.refreshToken)
        }),
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        }),
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = undefined
        }),
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = undefined;
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken')
        }),
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        }),
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = undefined
        }),
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.resetSent = true
        }),
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        }),
        builder.addCase(setNewPassword.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = undefined
        }),
        builder.addCase(setNewPassword.fulfilled, (state) => {
            state.isLoading = false;
        }),
        builder.addCase(setNewPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message
        }),
        builder.addCase(getUserInfo.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = undefined
        }),
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.user = action.payload?.user;
        }),
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message;
            deleteCookie('accessToken');
        }),
        builder.addCase(updateUserInfo.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = undefined
        }),
        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.user = action.payload?.user;
        }),
        builder.addCase(updateUserInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.user = undefined;
            state.errorMessage = action.error.message
        })
    )}
})
export const { clearAuthCheck } = reducerAuth.actions;
export default reducerAuth.reducer;