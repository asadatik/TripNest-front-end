"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchBookingsStart, fetchBookingsSuccess, fetchBookingsError } from "@/redux/slices/bookingsSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pointer as Spinner } from "lucide-react"

export default function AdminBookings() {
  const dispatch = useAppDispatch()
  const { bookings, isLoading, error } = useAppSelector((state) => state.bookings)

  useEffect(() => {
    const fetchBookings = async () => {
      dispatch(fetchBookingsStart())
      try {
        // Mock data - replace with actual API call
        const mockBookings = [
          {
            id: "1",
            userId: "1",
            packageId: "1",
            packageTitle: "Beach Paradise",
            userName: "John Doe",
            status: "CONFIRMED" as const,
            createdAt: new Date().toISOString(),
            totalPrice: 2999,
          },
          {
            id: "2",
            userId: "2",
            packageId: "2",
            packageTitle: "Mountain Adventure",
            userName: "Jane Smith",
            status: "PENDING" as const,
            createdAt: new Date().toISOString(),
            totalPrice: 3499,
          },
        ]
        dispatch(fetchBookingsSuccess(mockBookings))
      } catch (err) {
        dispatch(fetchBookingsError(err instanceof Error ? err.message : "Failed to fetch bookings"))
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
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">{error}</div>
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
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.userName}</TableCell>
                      <TableCell>{booking.packageTitle}</TableCell>
                      <TableCell>${booking.totalPrice}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
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
