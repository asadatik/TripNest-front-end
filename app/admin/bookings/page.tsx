"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle, Eye, Settings } from "lucide-react"
import { UpdateBookingStatusModal } from "@/components/UpdateBookingStatusModal"
import { motion } from "framer-motion"
import Swal from "sweetalert2"

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  console.log("🚨Admin bookings loaded:", bookings)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true)
        const response = await api.getBookings()
        setBookings(response.data.data || response.data)
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message ||
          err.message ||
          "Failed to fetch bookings"
        setError(errorMessage)
        
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorMessage,
          confirmButtonColor: "#ef4444",
          background: "#0f172a",
          color: "#f1f5f9",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "UNPAID":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      case "FAILED":
      case "REFUNDED":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  const handleStatusUpdate = (booking: any) => {
    setSelectedBooking(booking)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedBooking(null)
  }

  const handleUpdateSuccess = async () => {
    try {
      const response = await api.getBookings()
      setBookings(response.data.data || response.data)
      
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Booking status updated successfully",
        confirmButtonColor: "#00ddff",
        background: "#0f172a",
        color: "#f1f5f9",
        timer: 2000,
        timerProgressBar: true,
      })
    } catch (err: any) {
      console.error("Failed to refresh bookings:", err)
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to refresh bookings",
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "#f1f5f9",
      })
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-transparent">
          Bookings Management
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage all customer bookings
        </p>
      </motion.div>

      {/* Error Alert */}
      {error && (
        <motion.div
          className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive flex items-start gap-3 backdrop-blur"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-medium">{error}</p>
            <p className="text-sm mt-1">
              Make sure backend is running at http://localhost:5000/api/v1
            </p>
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
          {/* Gradient Background */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#00ddff]/20 via-transparent to-[#ff4edb]/20 opacity-60" />

          <CardHeader>
            <CardTitle className="text-xl">All Bookings</CardTitle>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 size={40} className="text-[#00ddff]" />
                </motion.div>
              </div>
            ) : bookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                No bookings found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="text-xs sm:text-sm">Customer</TableHead>
                      <TableHead className="text-xs sm:text-sm">Package</TableHead>
                      <TableHead className="text-xs sm:text-sm">Status</TableHead>
                      <TableHead className="text-xs sm:text-sm">Payment</TableHead>
                      <TableHead className="text-xs sm:text-sm">Date</TableHead>
                      <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking: any) => (
                      <motion.tr
                        key={booking._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-border/50 hover:bg-background/30 transition-colors"
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm text-foreground">
                              {booking.member?.name || "N/A"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {booking.member?.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-sm max-w-[150px] truncate">
                          {booking.package?.title || "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                              booking.status,
                            )}`}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${getPaymentStatusColor(
                              booking.paymentStatus,
                            )}`}
                          >
                            {booking.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2 flex-wrap">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link href={`/admin/bookings/${booking._id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-lg border-border/50 bg-background/50 hover:bg-background/80 text-xs"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="hidden sm:inline ml-1">View</span>
                                </Button>
                              </Link>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusUpdate(booking)}
                                className="rounded-lg border-border/50 bg-background/50 hover:bg-background/80 text-xs"
                              >
                                <Settings className="h-4 w-4" />
                                <span className="hidden sm:inline ml-1">Update</span>
                              </Button>
                            </motion.div>
                          </div>
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

      {/* Status Update Modal */}
      {selectedBooking && (
        <UpdateBookingStatusModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          bookingId={selectedBooking._id}
          currentStatus={selectedBooking.status}
          currentPaymentStatus={selectedBooking.paymentStatus}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  )
}