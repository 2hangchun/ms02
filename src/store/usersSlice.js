import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $fetchUsers, $addUser, $deleteUserById, $fetchUserById, $updateUserById } from '@/api';

const initialState = {
    status: 'idle',
    userList: [],
    pagination: {},
}


export const fetchUsers = createAsyncThunk('/users/fetchUsers', async () => {
    const response = await $fetchUsers()
    return response
})

export const addUser = createAsyncThunk('/users/addUser', async (params) => {
    const response = await $addUser(params)
    return response
})

export const deleteUserById = createAsyncThunk('/users/deleteUser', async (id) => {
    const response = await $deleteUserById(id)
    return response
})

export const fetchUserById = createAsyncThunk('/users/fetchUser', async (id) => {
    const response = await $fetchUserById(id)
    return response
})
export const updateUserById = createAsyncThunk('/users/updateUser', async ({ id, params }) => {
    const response = await $updateUserById(id, params)
    return response
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, { payload: { data, meta } }) => {
            state.status = 'succeeded'
            state.userList = data
            state.pagination = meta.pagination
        })
    }
})

export const selector = (state) => state.users
export default usersSlice.reducer


