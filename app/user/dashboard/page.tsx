"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchPackagesStart, fetchPackagesSuccess, fetchPackagesError } from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PackageCard from "@/components/PackageCard"
import { Loader2 } from "lucide-react"

export default function UserDashboard() {
  const dispatch = useAppDispatch()
  const { items: packages, isLoading, error } = useAppSelector((state) => state.packages)
  const { userBookings } = useAppSelector((state) => state.bookings)

  useEffect(() => {
    const fetchPackages = async () => {
      dispatch(fetchPackagesStart())
      try {
        const response = await api.getPackages()
        const packages = Array.isArray(response.data) ? response.data : response.data.data || []
        dispatch(fetchPackagesSuccess(packages))
      } catch (err) {
        dispatch(fetchPackagesError(err instanceof Error ? err.message : "Failed to fetch packages"))
      }
    }

    if (packages.length === 0) {
      fetchPackages()
    }
  }, [dispatch, packages.length])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="text-muted-foreground">Manage your bookings and explore packages</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBookings.filter((b) => b.status === "CONFIRMED").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBookings.filter((b) => b.status === "PENDING").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${userBookings.reduce((sum, b) => (b.status === "CONFIRMED" ? sum + b.totalAmount : sum), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Packages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Packages</h2>
          <Link href="/packages">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : packages.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No packages available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg._id} package={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
