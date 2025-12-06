"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { 
  fetchBookingsStart, 
  fetchBookingsSuccess, 
  fetchBookingsError 
} from "@/redux/slices/bookingsSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2 as Spinner, AlertCircle } from "lucide-react"
import { api } from "@/lib/api"

export default function AdminBookings() {
  const dispatch = useAppDispatch()
  const { bookings, isLoading, error } = useAppSelector((state) => state.bookings)

  console.log("🚨 Initial bookings state:", bookings)

  useEffect(() => {
    const fetchBookings = async () => {
      console.log("🚨 Fetching bookings...")
      dispatch(fetchBookingsStart())

      try {
        const response = await api.getBookings() // <-- backend GET endpoint
        console.log("🚨 Response from backend:", response.data.data)
        
        if (response.data && response.data.data) {
          dispatch(fetchBookingsSuccess(response.data.data))
          console.log("🚨 Bookings saved to Redux state")
        } else {
          dispatch(fetchBookingsError("No bookings data received"))
          console.error("🚨 No data in response")
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to fetch bookings"
        dispatch(fetchBookingsError(errorMessage))
        console.error("🚨 Error fetching bookings:", errorMessage)
      }
    }

    if (bookings.length === 0) {
      fetchBookings()
    }
  }, [dispatch, bookings.length])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings Management</h1>
        <p className="text-muted-foreground">View and manage all bookings</p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner className="animate-spin" size={32} />
            </div>
          ) : bookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No bookings found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">{booking.member.name || "N/A"}</TableCell>
                      <TableCell>{booking.package.title || "N/A"}</TableCell>
                      <TableCell>${booking.totalAmount || 0}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
