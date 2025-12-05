"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Package {
  _id: string
  title: string
  summary: string
  description: string
  images: string[]
  destination: string
  costFrom: number
  currency: string
  durationDays: number
  capacity: number
  availableSeats: number
  startDate: string
  endDate: string
  departureLocation: string
  arrivalLocation: string
  included: string[]
  excluded: string[]
  amenities: string[]
  itinerary: string[]
  minAge: number
  maxAge: number
  division: string
  packageType: string
  tags: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  slug: string
}

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
