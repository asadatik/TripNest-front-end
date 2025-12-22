"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchPackagesStart, fetchPackagesSuccess,
  fetchPackagesError,
} from "@/redux/slices/packagesSlice"
import {
  fetchBookingsStart,
  fetchUserBookingsSuccess,
  fetchBookingsError,
} from "@/redux/slices/bookingsSlice"
import { api } from "@/lib/api"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PackageCard from "@/components/PackageCard"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"



export default function UserDashboard() {
  const dispatch = useAppDispatch()



  const { userBookings, isLoading: bookingsLoading, error: bookingsError } = useAppSelector((state) => state.bookings)
  console.log("User Dashboard loaded bookings:", userBookings)

  const { items: packages = [], isLoading: packagesLoading, error: packagesError, } = useAppSelector((state) => state.packages ?? { items: [], isLoading: false, error: null },);

  // ✅ Packages fetch useEffect
  useEffect(() => {
    const fetchPackages = async () => {
      dispatch(fetchPackagesStart());
      try {
        const response = await api.getPackages();

        // 
        dispatch(
          fetchPackagesSuccess({
            data: response.data?.data || [],
            meta: response.data?.meta,
          }),
        );

        console.log("Packages loaded successfully:", response.data?.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch packages";
        dispatch(fetchPackagesError(errorMessage));
        console.error("🚨 Error fetching packages:", errorMessage);
      }
    };

    if (packages.length === 0) {
      fetchPackages();
    }
  }, [dispatch, packages.length]);




  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      dispatch(fetchBookingsStart())
      try {
        const response = await api.getUserBookings()

        const data = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : []

        dispatch(fetchUserBookingsSuccess(data))
        console.log("User bookings loaded (dashboard):", data)

      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch bookings"
        dispatch(fetchBookingsError(errorMessage))
        console.error("Error fetching bookings (dashboard):", errorMessage)
      }
    }

    if (userBookings.length === 0) {
      fetchBookings()
    }
  }, [dispatch, userBookings.length])

  const activeCount = userBookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length
  const pendingCount = userBookings.filter(
    (b) => b.status === "PENDING",
  ).length
  const totalSpent = userBookings.reduce(
    (sum, b) =>
      b.status === "CONFIRMED" ? sum + (b.totalAmount || 0) : sum,
    0,
  )

  const isLoading = packagesLoading || bookingsLoading
  const error = packagesError || bookingsError

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="bg-linear-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Your Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your bookings and explore new travel experiences
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border border-border/70 bg-card/90 backdrop-blur shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-400/20 opacity-70" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{activeCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Confirmed trips that are upcoming or in progress
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-border/70 bg-card/90 backdrop-blur shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-yellow-500/20 via-transparent to-orange-400/20 opacity-70" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {pendingCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Waiting for confirmation or payment
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-border/70 bg-card/90 backdrop-blur shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#00ddff]/20 via-transparent to-[#ff4edb]/20 opacity-70" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              ${totalSpent.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              On all confirmed bookings so far
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Packages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">
            Featured Packages
          </h2>
          <Link href="/packages">
            <Button
              variant="outline"
              className="rounded-lg border-border/60 bg-background/70 text-sm hover:bg-background"
            >
              View All
            </Button>
          </Link>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-destructive">
            <span className="text-sm">{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : packages.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No packages available right now. Check back later!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((pkg) => (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PackageCard package={pkg} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
