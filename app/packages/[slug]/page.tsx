"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchPackageDetailStart,
  fetchPackageDetailSuccess,
  fetchPackageDetailError,
} from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Loader2,
  Users,
  CheckCircle,
  AlertCircle,
  MapPinIcon,
  Clock,
} from "lucide-react"
import type { Package } from "@/lib/types"
import { Input } from "@/components/ui/input"

export default function PackageDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { selectedPackage, isLoading, error } = useAppSelector(
    (state) => state.packages,
  )
  const [localPackage, setLocalPackage] = useState<Package | null>(null)

  // booking + payment state
  const [pax, setPax] = useState(1)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackageDetail = async () => {
      dispatch(fetchPackageDetailStart())
      try {
        const response = await api.getPackageBySlug(slug)
        const pkg = response.data.data || response.data
        setLocalPackage(pkg)
        dispatch(fetchPackageDetailSuccess(pkg))
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch package"
        dispatch(fetchPackageDetailError(errorMessage))
      }
    }

    fetchPackageDetail()
  }, [dispatch, slug])

  const pkg = localPackage || selectedPackage

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-theme(space.16))] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (error || !pkg) {
    return (
      <div className="min-h-[calc(100vh-theme(space.16))] py-12">
        <div className="container mx-auto px-4">
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-start gap-2">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">{error || "Package not found"}</p>
              <p className="text-sm mt-1">
                Make sure backend is running at http://localhost:5000/api/v1
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const mainImage =
    pkg.images && pkg.images.length > 0
      ? pkg.images[0]
      : "/pexels-dreamlensproduction-2450296.jpg"

  // Book Now → booking create → payment session create → Stripe redirect
  const handleBookNow = async () => {
    if (!pkg?._id) return

    try {
      setIsBooking(true)
      setBookingError(null)

      // ১) আগে booking create
      const bookingRes = await api.createBooking({
        package: pkg._id,
        pax: pax || 1,
      })
      const booking =
        bookingRes.data.data || bookingRes.data
      const bookingId = booking._id

      // ২) Stripe checkout session create
      const paymentRes = await api.initStripeCheckout({ bookingId })
      const data = paymentRes.data.data || paymentRes.data
      const url = data.url

      if (!url) {
        throw new Error("Stripe checkout URL missing")
      }

      // ৩) Stripe checkout এ redirect
      window.location.href = url
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to start booking"
      setBookingError(msg)
      console.error("BookNow error:", msg)
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-theme(space.16))] py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
              <img
                src={mainImage || "/placeholder.svg"}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">{pkg.title}</h1>
              <p className="text-lg text-muted-foreground mb-2">
                {pkg.summary}
              </p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPinIcon size={16} />
                  {pkg.destination}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {pkg.durationDays} days
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  {pkg.availableSeats} seats available
                </div>
              </div>
              <p className="text-base leading-relaxed text-foreground">
                {pkg.description}
              </p>
            </div>

            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {pkg.itinerary.map((day, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="font-bold text-primary min-w-12">
                          Day {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{day}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            {pkg.included && pkg.included.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {pkg.excluded && pkg.excluded.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>What's Not Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {pkg.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-destructive mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {pkg.amenities && pkg.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {pkg.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle
                          size={16}
                          className="text-primary shrink-0"
                        />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Book This Package</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Price From
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {pkg.costFrom.toLocaleString()} {pkg.currency}
                  </div>
                </div>

                {/* Pax input */}
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Number of people
                  </div>
                  <Input
                    type="number"
                    min={1}
                    max={pkg.availableSeats || undefined}
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value) || 1)}
                  />
                  {pkg.availableSeats !== undefined && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Available seats: {pkg.availableSeats}
                    </p>
                  )}
                </div>

                <div className="bg-muted/50 p-3 rounded-lg text-sm">
                  <div className="font-semibold mb-2">Package Dates</div>
                  <p className="text-muted-foreground">
                    {new Date(pkg.startDate).toLocaleDateString()} -{" "}
                    {new Date(pkg.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg text-sm">
                  <div className="font-semibold mb-1">Departure & Arrival</div>
                  <p className="text-muted-foreground mb-2">
                    From: {pkg.departureLocation}
                  </p>
                  <p className="text-muted-foreground">
                    To: {pkg.arrivalLocation}
                  </p>
                </div>

                {bookingError && (
                  <p className="text-sm text-destructive">{bookingError}</p>
                )}

                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleBookNow}
                    disabled={isBooking}
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting to payment...
                      </>
                    ) : (
                      "Book Now"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => router.push("/contact")}
                  >
                    Contact Us
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age Range:</span>
                      <span className="font-medium">
                        {pkg.minAge}-{pkg.maxAge} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">
                        {(pkg.packageType as any)?.name ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
