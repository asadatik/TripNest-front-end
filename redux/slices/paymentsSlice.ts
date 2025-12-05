"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Payment {
  id: string
  bookingId: string
  userId: string
  amount: number
  status: "PENDING" | "SUCCESS" | "FAILED"
  stripePaymentId?: string
  createdAt: string
}

interface PaymentsState {
  payments: Payment[]
  isLoading: boolean
  error: string | null
}

const initialState: PaymentsState = {
  payments: [],
  isLoading: false,
  error: null,
}

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    fetchPaymentsStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchPaymentsSuccess(state, action: PayloadAction<Payment[]>) {
      state.isLoading = false
      state.payments = action.payload
    },
    fetchPaymentsError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    createPaymentSuccess(state, action: PayloadAction<Payment>) {
      state.payments.unshift(action.payload)
    },
  },
})

export const { fetchPaymentsStart, fetchPaymentsSuccess, fetchPaymentsError, createPaymentSuccess } =
  paymentsSlice.actions

export default paymentsSlice.reducer
