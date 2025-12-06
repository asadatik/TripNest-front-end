"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { Booking } from "@/lib/types"





interface BookingsState {
  bookings: Booking[]
  userBookings: Booking[]
  isLoading: boolean
  error: string | null
}

const initialState: BookingsState = {
  bookings: [],
  userBookings: [],
  isLoading: false,
  error: null,
}

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    fetchBookingsStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchBookingsSuccess(state, action: PayloadAction<Booking[]>) {
      state.isLoading = false
      state.bookings = action.payload
    },
    fetchUserBookingsSuccess(state, action: PayloadAction<Booking[]>) {
      state.isLoading = false
      state.userBookings = action.payload
    },
    fetchBookingsError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    updateBookingSuccess(state, action: PayloadAction<Booking>) {
      const index = state.bookings.findIndex((b) => b._id === action.payload._id)
      if (index !== -1) {
        state.bookings[index] = action.payload
      }
      const userIndex = state.userBookings.findIndex((b) => b._id === action.payload._id)
      if (userIndex !== -1) {
        state.userBookings[userIndex] = action.payload
      }
    },
    cancelBookingSuccess(state, action: PayloadAction<string>) {
      const booking = state.bookings.find((b) => b._id === action.payload)
      if (booking) {
        booking.status = "CANCELLED"
      }
      const userBooking = state.userBookings.find((b) => b._id === action.payload)
      if (userBooking) {
        userBooking.status = "CANCELLED"
      }
    },
  },
})

export const {
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchUserBookingsSuccess,
  fetchBookingsError,
  updateBookingSuccess,
  cancelBookingSuccess,
} = bookingsSlice.actions

export default bookingsSlice.reducer
