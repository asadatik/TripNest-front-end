"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchPackagesStart,
  fetchPackagesSuccess,
  fetchPackagesError,
} from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"

import Hero from "@/components/home/hero"
import FeaturedPackages from "@/components/home/featured-packages"
import HowItWorks from "@/components/home/how-it-works"
import WhyTripnest from "@/components/home/why-tripnest"
import Testimonials from "@/components/home/testimonials"
import FinalCta from "@/components/home/final-cta"
import { FullScreenLoader } from "@/components/common/fullscreen-loader"

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { items, isLoading: packagesLoading, error } = useAppSelector(
    (state) => state.packages ?? { items: [], isLoading: false, error: null }
  )

  useEffect(() => {

    // Only fetch if items not already loaded
    
    if (!items || items.length === 0) {
      const loadPackages = async () => {
        dispatch(fetchPackagesStart())
        try {
          const res = await api.getPackages({ page: 1, limit: 10 })
          dispatch(
            fetchPackagesSuccess({
              data: res.data.data || [],
              meta: res.data.meta,
            })
          )
        } catch (err: any) {
          const msg =
            err?.response?.data?.message ||
            (err instanceof Error ? err.message : "Failed to load packages")
          dispatch(fetchPackagesError(msg))
        }
      }

      void loadPackages()
    }
  }, [dispatch, items])

  if ((packagesLoading && items.length === 0) || (!items || items.length === 0)) {

    return <FullScreenLoader />
  }

  if (error && items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm text-destructive">
          Failed to load packages. Please try again later.
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
    
      <Hero />
      <FeaturedPackages />
      <HowItWorks />
      <WhyTripnest />
      <Testimonials />
      <FinalCta />
    </main>
  )
}
