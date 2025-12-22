"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Package } from "@/lib/types"

interface PackagesMeta {
  page: number
  limit: number
  total: number
  totalPage: number
}

interface PackagesState {
  items: Package[]
  meta: PackagesMeta | null
  selectedPackage: Package | null
  isLoading: boolean
  error: string | null
}

const initialState: PackagesState = {
  items: [],
  meta: null,
  selectedPackage: null,
  isLoading: false,
  error: null,
}

type PackagesSuccessPayload = {
  data: Package[]
  meta: PackagesMeta
}

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    // List
    fetchPackagesStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchPackagesSuccess(state, action: PayloadAction<PackagesSuccessPayload>) {
      state.isLoading = false
      // নিশ্চিত করি সবসময় array সেট হচ্ছে
      state.items = Array.isArray(action.payload.data) ? action.payload.data : []
      state.meta = action.payload.meta
    },
    fetchPackagesError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },

    // Detail
    fetchPackageDetailStart(state) {
      state.isLoading = true
      state.error = null
      state.selectedPackage = null
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
