import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { $fetchAvatar, $login } from '@/api'

export const login = createAsyncThunk('/user/login', async (params, { dispatch, getState }) => {
    try {
        const response = await $login(params)
        return response

    } catch (error) {
        return Promise.reject(error)
    }
})

export const fetchAvatar = createAsyncThunk('/user/fetchAvatar', async () => {
    const response = await $fetchAvatar()
    return response[0]
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'idle',
        user: null || JSON.parse(localStorage.getItem('userInfo')),
        token: localStorage.getItem('token') || '',
        error: null,
    },
    reducers: {
        logout(state, action) {
            state.status = 'idle'
            state.user = null
            state.token = ""
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
        }

    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, { payload: {
            jwt, user: {
                username, email, live, telephone, address
            }
        } }) => {
            state.status = 'succeeded'
            state.user = {
                username, email, live, telephone, address
            }
            state.token = jwt
            localStorage.setItem('userInfo', JSON.stringify(state.user))
            localStorage.setItem('token', jwt)
        })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error

            })
            .addCase(login.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAvatar.fulfilled, (state, { payload }) => {
                state.user = {
                    ...state.user,
                    avatar: payload.url
                }
                localStorage.setItem('userInfo', JSON.stringify(state.user))
            })
    }
})

export const { logout } = userSlice.actions
export const selector = (state) => state.user
export default userSlice.reducer 