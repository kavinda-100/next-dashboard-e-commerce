import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {User} from "@prisma/client";
import {RootState} from "@/store/store";
import {Session} from "next-auth";
import {ExtendedUser} from "../../auth";

type LogInUserType = {
    user: ExtendedUser | null
}

const initialState: LogInUserType = {
    user: null
}

const LogInUserSlice = createSlice({
    name: 'LogInUser',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<ExtendedUser | null>) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = null
        }
    }
})

export const { setUser, removeUser } = LogInUserSlice.actions

export default LogInUserSlice.reducer

export const selectUser = (state: RootState) => state.LogInUser.user