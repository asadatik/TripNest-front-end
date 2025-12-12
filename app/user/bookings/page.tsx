"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchBookingsStart,
  fetchUserBookingsSuccess,
  fetchBookingsError,
  cancelBookingSuccess,
} from "@/redux/slices/bookingsSlice"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"


export default function UserBookings() {
  const dispatch = useAppDispatch()
   const router = useRouter()
  const { userBookings: bookings, isLoading, error } = useAppSelector(
    (state) => state.bookings,
  )

  useEffect(() => {
    const fetchBookings = async () => {
      dispatch(fetchBookingsStart())
      try {
        const response = await api.getUserBookings()
        dispatch(fetchUserBookingsSuccess(response.data.data))
        console.log("🚨User bookings loaded:", response.data.data)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch bookings"
        dispatch(fetchBookingsError(errorMessage))
        console.error("🚨Error fetching bookings:", errorMessage)
      }
    }
    console.log("🚨Bookings length:", bookings.length)
    if (bookings.length === 0) {
      fetchBookings()
    }
  }, [dispatch, bookings.length])

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await api.cancelBooking(bookingId)
      dispatch(cancelBookingSuccess(bookingId))
      console.log("🚨Booking cancelled:", bookingId)
    } catch (err) {
      console.error("🚨Failed to cancel booking:", err)
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

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          My Bookings
        </h1>
        <p className="mt-1 text-muted-foreground">
          View and manage your travel bookings
        </p>
      </motion.div>

      {/* Error Alert */}
      {error && (
        <motion.div
          className="flex items-start gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-destructive backdrop-blur"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Error loading bookings</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Bookings Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border border-border/70 bg-card/90 backdrop-blur shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
          {/* Gradient bg */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#00ddff]/20 via-transparent to-[#ff4edb]/20 opacity-60" />

          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Loader2 size={40} className="text-[#00ddff]" />
                </motion.div>
              </div>
            ) : bookings.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">
                No bookings found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="text-xs sm:text-sm">
                        Package
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Price
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Status
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Date
                      </TableHead>
                      <TableHead className="text-right text-xs sm:text-sm">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <motion.tr
                        key={booking._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-border/50 hover:bg-background/30 transition-colors"
                      >
                        <TableCell className="max-w-[200px] truncate font-medium text-sm">
                          {booking.package?.title || "N/A"}
                        </TableCell>
                        <TableCell className="text-sm">
                          ${booking.totalAmount}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                              booking.status,
                            )}`}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 rounded-lg text-xs"
                            onClick={() => router.push(`/user/bookings/${booking._id}`)}
                          >
                            Details
                          </Button>
                          {booking.status !== "CANCELLED" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="gap-1 rounded-lg text-xs"
                                >
                                  <Trash2 size={14} />
                                  <span className="hidden sm:inline">
                                    Cancel
                                  </span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Cancel Booking
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this
                                    booking? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="flex gap-3">
                                  <AlertDialogCancel>
                                    Keep Booking
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleCancelBooking(booking._id)
                                    }
                                  >
                                    Cancel Booking
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
