"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react"

function BookingDetailsPageInner() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string

  const [booking, setBooking] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true)
        const response = await api.getBookingDetails(bookingId)

        setBooking(response.data.data || response.data)


console.log("🚨 Booking data:", booking)

      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch booking details",
        )
      } finally {
        setIsLoading(false)
      }
    }

    if (bookingId) {
      fetchBookingDetails()
    }
  }, [bookingId])

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

  if (!booking) {
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
        <p className="text-muted-foreground">Booking not found</p>
      </div>
    )
  }




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

  return (
    <div className="p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Bookings
      </Button>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Package Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {booking.package?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Destination
                    </p>
                    <p className="font-medium">
                      {booking.package?.destination}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Duration
                    </p>
                    <p className="font-medium">
                      {booking.package?.durationDays} days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Participants
                    </p>
                    <p className="font-medium">{booking.pax}</p>
                  </div>
                </div>
              </div>

              {booking.package?.description && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Description
                  </p>
                  <p className="text-sm leading-relaxed">
                    {booking.package.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Booking ID
                  </p>
                  <p className="font-mono text-sm">{booking._id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Booking Date
                  </p>
                  <p className="text-sm">
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
                {booking.package?.startDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Trip Start
                    </p>
                    <p className="text-sm">
                      {new Date(
                        booking.package.startDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {booking.package?.endDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Trip End
                    </p>
                    <p className="text-sm">
                      {new Date(
                        booking.package.endDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Itinerary */}
          {booking.package?.itinerary &&
            booking.package.itinerary.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {booking.package.itinerary.map(
                      (day: string, index: number) => (
                        <li key={index} className="flex gap-4">
                          <div className="font-bold text-primary min-w-12">
                            Day {index + 1}
                          </div>
                          <p className="text-sm">{day}</p>
                        </li>
                      ),
                    )}
                  </ol>
                </CardContent>
              </Card>
            )}

          {/* Included & Excluded */}
          <div className="grid md:grid-cols-2 gap-6">
            {booking.package?.included &&
              booking.package.included.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      What's Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {booking.package.included.map(
                        (item: string, index: number) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <span className="text-green-600">✓</span>
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </Card>
              )}

            {booking.package?.excluded &&
              booking.package.excluded.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      What's Not Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {booking.package.excluded.map(
                        (item: string, index: number) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <span className="text-red-600">✗</span>
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>

        {/* Sidebar - Status & Pricing */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Booking Status
                </p>
                <Badge
                  className={getStatusColor(booking.status)}
                  variant="default"
                >
                  {booking.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Payment Status
                </p>
                <Badge
                  className={getPaymentStatusColor(
                    booking.paymentStatus,
                  )}
                  variant="default"
                >
                  {booking.paymentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Card */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm text-muted-foreground">
                  Base Price
                </span>
                <span className="font-medium">
                  {booking.package?.costFrom}{" "}
                  {booking.package?.currency || "BDT"}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm text-muted-foreground">
                  Participants
                </span>
                <span className="font-medium">x {booking.pax}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-semibold">Total Amount</span>
                <span className="text-lg font-bold text-primary">
                  {booking.totalAmount}{" "}
                  {booking.currency || "BDT"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function BookingDetailsPage() {
  return (
    // <       Prote requiredRole="admin">
      <BookingDetailsPageInner />
    // </ProtectedRoute>
  )
}
