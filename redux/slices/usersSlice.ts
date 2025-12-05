"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AdminUser {
  id: string
  email: string
  name: string
  role: "USER" | "ADMIN"
  createdAt: string
}

interface UsersState {
  users: AdminUser[]
  isLoading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchUsersSuccess(state, action: PayloadAction<AdminUser[]>) {
      state.isLoading = false
      state.users = action.payload
    },
    fetchUsersError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    updateUserStart(state) {
      state.isLoading = true
      state.error = null
    },
    updateUserSuccess(state, action: PayloadAction<AdminUser>) {
      state.isLoading = false
      const index = state.users.findIndex((u) => u.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
    deleteUserSuccess(state, action: PayloadAction<string>) {
      state.users = state.users.filter((u) => u.id !== action.payload)
    },
  },
})

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersError,
  updateUserStart,
  updateUserSuccess,
  deleteUserSuccess,
} = usersSlice.actions

export default usersSlice.reducer
