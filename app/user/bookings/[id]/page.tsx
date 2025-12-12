"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, MapPin, Calendar, DollarSign, Users } from "lucide-react"

type BookingDetails = {
  _id: string
  status: string
  totalAmount: number
  createdAt: string
  startDate?: string
  endDate?: string
  travelersCount?: number
  package?: {
    title: string
    destination?: string
    durationDays?: number
    costFrom?: number
    currency?: string
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-500/20 text-green-400 border border-green-500/30"
    case "PENDING":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
    case "CANCELLED":
      return "bg-red-500/20 text-red-400 border border-red-500/30"
    case "COMPLETED":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
  }
}

export default function BookingDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchBooking = async () => {
      try {
        setLoading(true)
        const res = await api.getUserBookingById(id)
        setBooking(res.data.data)
        setError(null)
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Failed to load booking details",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00ddff]" />
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="space-y-4 p-4 md:p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <motion.div
          className="rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-destructive"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error || "Booking not found"}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between gap-3"
      >
        <div>
          <h1 className="bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Booking Details
          </h1>
          <p className="mt-1 text-muted-foreground">
            View information about this booking
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to bookings
        </Button>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border border-border/70 bg-card/90 backdrop-blur shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
          {/* Gradient bg */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#00ddff]/20 via-transparent to-[#ff4edb]/20 opacity-60" />

          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl md:text-2xl">
                {booking.package?.title ?? "Booking"}
              </CardTitle>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                Booking ID: {booking._id}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground md:text-sm">
                <Calendar className="h-4 w-4" />
                Booked on{" "}
                {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>
            <Badge
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                booking.status,
              )}`}
            >
              {booking.status}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6 p-6 pt-0">
            {/* Info grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl border border-border/60 bg-background/60 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Trip summary
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-[#00ddff]" />
                  <span>
                    Destination:{" "}
                    <span className="font-medium">
                      {booking.package?.destination ?? "N/A"}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-[#ff4edb]" />
                  <span>
                    Travel dates:{" "}
                    {booking.startDate && booking.endDate
                      ? `${new Date(
                          booking.startDate,
                        ).toLocaleDateString()} - ${new Date(
                          booking.endDate,
                        ).toLocaleDateString()}`
                      : "N/A"}
                  </span>
                </div>
                {booking.package?.durationDays && (
                  <p className="text-sm text-muted-foreground">
                    Duration: {booking.package.durationDays} days
                  </p>
                )}
              </div>

              <div className="space-y-2 rounded-2xl border border-border/60 bg-background/60 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Payment & travelers
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                  <span>
                    Total paid:{" "}
                    <span className="font-semibold">
                      {booking.package?.currency ?? "USD"}{" "}
                      {booking.totalAmount}
                    </span>
                  </span>
                </div>
                {booking.package?.costFrom && (
                  <p className="text-sm text-muted-foreground">
                    Package base price from{" "}
                    {booking.package.currency ?? "USD"}{" "}
                    {booking.package.costFrom}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-sky-400" />
                  <span>
                    Travelers:{" "}
                    <span className="font-medium">
                      {booking.travelersCount ?? 1}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Status note */}
            <div className="rounded-2xl border border-border/60 bg-background/60 p-4 text-xs text-muted-foreground md:text-sm">
              {booking.status === "CONFIRMED" &&
                "Your booking is confirmed. You will receive further details and documents by email."}
              {booking.status === "PENDING" &&
                "Your booking is pending. Payment or manual confirmation may still be in progress."}
              {booking.status === "CANCELLED" &&
                "This booking has been cancelled and is no longer active."}
              {booking.status === "COMPLETED" &&
                "This trip is completed. Thank you for traveling with us."}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
