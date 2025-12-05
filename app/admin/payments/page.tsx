"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchPaymentsStart, fetchPaymentsSuccess, fetchPaymentsError } from "@/redux/slices/paymentsSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pointer as Spinner } from "lucide-react"

export default function AdminPayments() {
  const dispatch = useAppDispatch()
  const { payments, isLoading, error } = useAppSelector((state) => state.payments)

  useEffect(() => {
    const fetchPayments = async () => {
      dispatch(fetchPaymentsStart())
      try {
        // Mock data - replace with actual API call
        const mockPayments = [
          {
            id: "1",
            bookingId: "1",
            userId: "1",
            amount: 2999,
            status: "SUCCESS" as const,
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            bookingId: "2",
            userId: "2",
            amount: 3499,
            status: "PENDING" as const,
            createdAt: new Date().toISOString(),
          },
        ]
        dispatch(fetchPaymentsSuccess(mockPayments))
      } catch (err) {
        dispatch(fetchPaymentsError(err instanceof Error ? err.message : "Failed to fetch payments"))
      }
    }

    if (payments.length === 0) {
      fetchPayments()
    }
  }, [dispatch, payments.length])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "FAILED":
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
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">{error}</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner className="animate-spin" size={32} />
            </div>
          ) : payments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No payments found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
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
