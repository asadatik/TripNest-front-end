"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react"

export default function PaymentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const paymentId = params.id as string

  const [payment, setPayment] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setIsLoading(true)
        const response = await api.getPaymentDetails(paymentId)
        setPayment(response.data.data || response.data)
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch payment details",
        )
      } finally {
        setIsLoading(false)
      }
    }

    if (paymentId) {
      fetchPaymentDetails()
    }
  }, [paymentId])

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-theme(space.16))] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 space-y-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-start gap-2">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <p className="text-muted-foreground">Payment not found</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
      case "SUCCESS":
        return "bg-green-100 text-green-800"
      case "PENDING":
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
      <Button
        variant="ghost"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Payments
      </Button>

      <div className="space-y-6">
        {/* Payment Info */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment ID</p>
                <p className="font-mono text-sm">{payment._id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(payment.status)}>
                  {payment.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-semibold text-lg">
                  {payment.amount} {payment.currency}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gateway</p>
                <p className="font-medium">{payment.gateway}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p>{new Date(payment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{payment.member?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm">{payment.member?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-sm">
                  {payment.member?.phone || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Info */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Booking ID</p>
                <p className="font-mono text-sm">
                  {payment.booking?._id}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="outline">
                  {payment.booking?.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Payment Status
                </p>
                <Badge variant="outline">
                  {payment.booking?.paymentStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Participants
                </p>
                <p className="font-medium">{payment.booking?.pax}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Info */}
        <Card>
          <CardHeader>
            <CardTitle>Package Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">
                  {payment.booking?.package?.title}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Destination</p>
                <p className="font-medium">
                  {payment.booking?.package?.destination}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">
                  {payment.booking?.package?.durationDays} days
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost</p>
                <p className="font-medium">
                  {payment.booking?.package?.costFrom}{" "}
                  {payment.booking?.package?.currency}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stripe Transaction */}
        {payment.gatewaySessionId && (
          <Card>
            <CardHeader>
              <CardTitle>Stripe Transaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Session ID
                </p>
                <p className="font-mono text-xs break-all">
                  {payment.gatewaySessionId}
                </p>
              </div>
              {payment.gatewayPaymentIntentId && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment Intent ID
                  </p>
                  <p className="font-mono text-xs break-all">
                    {payment.gatewayPaymentIntentId}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
