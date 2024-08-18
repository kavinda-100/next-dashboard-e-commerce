import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {User} from "@prisma/client";
import {RootState} from "@/store/store";

type LogInUserType = {
    user: User | undefined
}

const initialState: LogInUserType = {
    user: undefined
}

const LogInUserSlice = createSlice({
    name: 'LogInUser',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = undefined
        }
    }
})

export const { setUser, removeUser } = LogInUserSlice.actions

export default LogInUserSlice.reducer

export const selectUser = (state: RootState) => state.LogInUser.user