import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie, request, apiLink, deleteCookie, TMethods } from '../../utils/utils';

type TUser = {
    email: string | undefined;
    name: string | undefined;
};

type TUserRegisterData = TUser & { password: string | undefined };

type TUserLoginData = Omit<TUser, 'name'> & { password: string | undefined };

type TUserResponse = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
}

type TTokenResponse = Omit<TUserResponse, "user">;
type TTokenError = {
    success: boolean;
    message: string;
}

export const loginUser = createAsyncThunk(
    'reducerAuth/loginUser',
    async (data: TUserLoginData):Promise<TUserResponse | undefined> => {
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
        async (data: TUserRegisterData):Promise<TUserResponse | undefined> => {
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
        async (refreshToken: string) => {
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
        async (email: string) => {
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

    const fetchUser = async (requestMethod: TMethods, data: string):Promise<TUserResponse | undefined> => {
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
                return await fetchUser('GET', null)
            }
            const refreshRes = await refreshToken();
                    setCookie('accessToken', refreshRes.accessToken.split('Bearer ')[1]);
                    localStorage.setItem('refreshToken', refreshRes.refreshToken);
                    return await fetchUser('GET', null)
    });

    export const updateUserInfo = createAsyncThunk(
        'reducerAuth/updateUserInfo',
        async (data) => {
            if(getCookie('accessToken')) {
            return fetchUser('PATCH', JSON.stringify(data))
            }
            const refreshRes = await refreshToken();
                    setCookie('accessToken', refreshRes.accessToken.split('Bearer ')[1]);
                    localStorage.setItem('refreshToken', refreshRes.refreshToken);
                    return fetchUser('PATCH', JSON.stringify(data))
            });


type TUserInitial = {
    isAuthChecked: string | null,
    user: TUser | null;
    hasError: boolean;
    isLoading: boolean;
    resetSent: boolean;
    errorMessage: string;
}            

const initialAuth : TUserInitial = {
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
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.hasError = false
        }),
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
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
            state.errorMessage = null
        }),
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
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
            state.errorMessage = null
        }),
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
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
            state.errorMessage = null
        }),
        builder.addCase(resetPassword.fulfilled, (state, action) => {
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
            state.errorMessage = null
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
            state.errorMessage = null
        }),
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.user = action.payload.user;
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
            state.errorMessage = null
        }),
        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.user = action.payload.user;
        }),
        builder.addCase(updateUserInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.user = null;
            state.errorMessage = action.error.message
        })
    }
})
export const { updateUser, clearAuthCheck } = reducerAuth.actions;
export default reducerAuth.reducer;