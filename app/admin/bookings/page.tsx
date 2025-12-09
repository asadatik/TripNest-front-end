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

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true)
        const response = await api.getBookings()
        setBookings(response.data.data || response.data)
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch bookings",
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      case "COMPLETED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800"
      case "UNPAID":
        return "bg-yellow-100 text-yellow-800"
      case "FAILED":
      case "REFUNDED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  const handleUpdateSuccess = () => {
    // Refresh bookings list
    const fetchBookings = async () => {
      try {
        const response = await api.getBookings()
        setBookings(response.data.data || response.data)
      } catch (err: any) {
        console.error("Failed to refresh bookings:", err)
      }
    }
    fetchBookings()
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings Management</h1>
        <p className="text-muted-foreground">
          View and manage all customer bookings
        </p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-start gap-2">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">{error}</p>
            <p className="text-sm mt-1">
              Make sure backend is running at http://localhost:5000/api/v1
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : bookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No bookings found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Booking Status</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking: any) => (
                    <TableRow key={booking._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {booking.member?.name || "N/A"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.member?.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {booking.package?.title || "N/A"}
                      </TableCell>
                    
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getPaymentStatusColor(
                            booking.paymentStatus,
                          )}
                        >
                          {booking.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Link href={`/admin/bookings/${booking._id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(booking)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

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
