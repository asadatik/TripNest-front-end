"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { User } from "@/lib/types"
import { api } from "@/lib/api"

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Step 1: Login (sets cookie)
      await api.login(payload.email, payload.password)

      // Step 2: Fetch current user from cookie
      const response = await api.getMe()
      return response.data.data || response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed")
    }
  },
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.register(payload.name, payload.email, payload.password)
      return response.data.data || response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed")
    }
  },
)

export const loadUserFromCookie = createAsyncThunk("auth/loadUserFromCookie", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getMe()
    return response.data.data || response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to load auth")
  }
})

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await api.logout()
    return null
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Logout failed")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Login thunk
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })

    // Register thunk
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        state.isAuthenticated = false // User not logged in after registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Load user from cookie thunk
    builder
      .addCase(loadUserFromCookie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loadUserFromCookie.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loadUserFromCookie.rejected, (state) => {
        state.isLoading = false
        state.isAuthenticated = false
      })

    // Logout thunk
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
