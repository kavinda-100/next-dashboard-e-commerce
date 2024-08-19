import { configureStore } from '@reduxjs/toolkit'
import LogInUserSlice from "@/store/features/LogedInUserSclice";
import { baseApi } from "@/store/api/baseApi";

export const store = configureStore({
    reducer: {
        LogInUser: LogInUserSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch