"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchPackagesStart, fetchPackagesSuccess, fetchPackagesError } from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import PackageCard from "@/components/PackageCard"
import { Loader2, AlertCircle } from "lucide-react"

export default function PackagesPage() {
  const dispatch = useAppDispatch()
  const { items, isLoading, error } = useAppSelector((state) => state.packages)



  console.log(" PackagesPage render: from Redux store",  items.length)

  useEffect(() => {
    const fetchPackages = async () => {
      dispatch(fetchPackagesStart())
      try {
        const response = await api.getPackages()
        dispatch(fetchPackagesSuccess(response.data.data))
        console.log(" Packages loaded successfully:", response.data.data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch packages"
        dispatch(fetchPackagesError(errorMessage))
        console.error("🚨Error fetching packages:", errorMessage)
      }
    }

    if (items.length === 0) {
      fetchPackages()
    }
  }, [dispatch, items.length])

  return (
    <div className="min-h-[calc(100vh-theme(space.16))] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
          <p className="text-lg text-muted-foreground">Choose from our collection of amazing travel packages</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-start gap-2">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Error loading packages</p>
              <p className="text-sm">{error}</p>
              <p className="text-xs mt-2 opacity-75">Make sure backend is running at http://localhost:5000</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : items.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((pkg) => (
              <PackageCard key={pkg._id} package={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No packages available</p>
          </div>
        )}
      </div>
    </div>
  )
}
