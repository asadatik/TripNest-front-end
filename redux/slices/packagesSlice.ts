"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Package } from "@/lib/types"

interface PackagesState {
  items: Package[]
  selectedPackage: Package | null
  isLoading: boolean
  error: string | null
}

const initialState: PackagesState = {
  items: [],
  selectedPackage: null,
  isLoading: false,
  error: null,
}

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    fetchPackagesStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchPackagesSuccess(state, action: PayloadAction<Package[]>) {
      state.isLoading = false
      state.items = action.payload
    },
    fetchPackagesError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    fetchPackageDetailStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchPackageDetailSuccess(state, action: PayloadAction<Package>) {
      state.isLoading = false
      state.selectedPackage = action.payload
    },
    fetchPackageDetailError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const {
  fetchPackagesStart,
  fetchPackagesSuccess,
  fetchPackagesError,
  fetchPackageDetailStart,
  fetchPackageDetailSuccess,
  fetchPackageDetailError,
  clearError,
} = packagesSlice.actions

export default packagesSlice.reducer
