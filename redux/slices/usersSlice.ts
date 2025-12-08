



"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AdminUser {
  _id: string
  email: string
  name: string
  role: "USER" | "ADMIN"
  status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED"
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
      const index = state.users.findIndex((u) => u._id === action.payload._id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
    updateUserStatusSuccess(state, action: PayloadAction<AdminUser>) {
      state.isLoading = false
      const index = state.users.findIndex((u) => u._id === action.payload._id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
  },
})

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersError,
  updateUserStart,
  updateUserSuccess,
  updateUserStatusSuccess,
} = usersSlice.actions

export default usersSlice.reducer
