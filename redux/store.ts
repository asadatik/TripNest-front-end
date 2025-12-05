"use client"

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import packagesReducer from "./slices/packagesSlice"
import usersReducer from "./slices/usersSlice"
import bookingsReducer from "./slices/bookingsSlice"
import paymentsReducer from "./slices/paymentsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    packages: packagesReducer,
    users: usersReducer,
    bookings: bookingsReducer,
    payments: paymentsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
