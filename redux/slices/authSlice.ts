"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  name: string
  role?: "USER" | "ADMIN"
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true
      state.error = null
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false
      state.user = action.payload
      state.isLoggedIn = true
    },
    loginError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
      state.isLoggedIn = false
    },
    registerStart(state) {
      state.isLoading = true
      state.error = null
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false
      state.user = action.payload
      state.isLoggedIn = true
    },
    registerError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    logout(state) {
      state.user = null
      state.isLoggedIn = false
      state.error = null
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginError,
  registerStart,
  registerSuccess,
  registerError,
  logout,
  clearError,
} = authSlice.actions

export default authSlice.reducer
