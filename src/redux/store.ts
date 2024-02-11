import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counterSlice'
import { spotifyApi } from './services/spotifyApi'
import { setupListeners } from '@reduxjs/toolkit/query';
import { constructoraBolivarApi } from "./services/constructoraBolivarApi";

export const store = configureStore({
    reducer: {
        counterReducer,
        [spotifyApi.reducerPath]: spotifyApi.reducer,
        [constructoraBolivarApi.reducerPath]: constructoraBolivarApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware, constructoraBolivarApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch