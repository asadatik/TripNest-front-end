"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchPaymentsStart,
  fetchPaymentsSuccess,
  fetchPaymentsError,
} from "@/redux/slices/paymentsSlice"
import { api } from "@/lib/api"
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
import { Loader2, AlertCircle } from "lucide-react"

export default function AdminPayments() {
  const dispatch = useAppDispatch()
  const { payments, isLoading, error } = useAppSelector(
    (state) => state.payments,
  )

  useEffect(() => {
    const fetchPayments = async () => {
      dispatch(fetchPaymentsStart())
      try {
        // ✅ Real API call - adjust endpoint if your backend uses different path
        const response = await api.getPayments()
        const paymentsData = response.data.data || response.data
        dispatch(fetchPaymentsSuccess(paymentsData))
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch payments"
        dispatch(fetchPaymentsError(errorMessage))
      }
    }

    // Only fetch once, not on every render
    if (payments.length === 0 && !isLoading) {
      fetchPayments()
    }
  }, [dispatch, payments.length, isLoading])


 console.log("Payments:", payments)


  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments Management</h1>
        <p className="text-muted-foreground">View all payment transactions</p>
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
          <CardTitle>All Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : payments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No payments found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment: any) => (
                    <TableRow key={payment._id}>
                      <TableCell className="font-medium">
                        {payment._id?.slice(-8) || "N/A"}
                      </TableCell>
                      <TableCell>
                        {payment.booking?._id?.slice(-8) ||
                          payment.bookingId?.slice(-8) ||
                          "N/A"}
                      </TableCell>
                      <TableCell>
                        {payment.booking?.package?.title ||
                        
                          "Unknown"}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {payment.amount}
                        {payment.currency
                          ? ` ${payment.currency}`
                          : " BDT"}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {payment?.member?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        {new Date(payment.createdAt).toLocaleDateString()}
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
