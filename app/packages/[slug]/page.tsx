"use client"

import { useEffect, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchPackageDetailStart, fetchPackageDetailSuccess, fetchPackageDetailError } from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Users, CheckCircle, AlertCircle, MapPinIcon, Clock, Calendar, MapPin, DollarSign, Shield, Info, Star, ArrowRight, Navigation, XCircle, Sparkles } from "lucide-react"
import type { Package } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

export default function PackageDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const dispatch = useAppDispatch()
  const router = useRouter()


const pathname = usePathname()


  const { user } = useAppSelector((state) => state.auth)
  const isAdmin = user?.role === "ADMIN"

  const { selectedPackage, isLoading, error } = useAppSelector(
    (state) => state.packages,
  )
  const [localPackage, setLocalPackage] = useState<Package | null>(null)

  // booking + payment state//
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
  // booking + payment state //

  const pkg = localPackage || selectedPackage

  const isOutOfStock = pkg?.availableSeats === 0


  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-theme(space.16))] items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 text-cyan-500" />
          </motion.div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Loading package details...
          </p>
        </motion.div>
      </div>
    )
  }

  if (error || !pkg) {
    return (
      <div className="min-h-[calc(100vh-theme(space.16))] bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-start gap-4 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-6 shadow-lg dark:border-red-900 dark:from-red-950/50 dark:to-pink-950/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-900 dark:text-red-100">
                {error || "Package not found"}
              </p>
              <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                Make sure backend is running at http://localhost:5000/api/v1
              </p>
              <Button
                onClick={() => router.push("/packages")}
                className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              >
                Back to Packages
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const mainImage =
    pkg.images && pkg.images.length > 0
      ? pkg.images[0]
      : "/pexels-dreamlensproduction-2450296.jpg"

  // Handle book Now button click
  const handleBookNow = async () => {

  if (!user) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
    return
  }


    if (!pkg?._id) return

    try {
      setIsBooking(true)
      setBookingError(null)

      //  booking create
      const bookingRes = await api.createBooking({
        package: pkg._id,
        pax: pax || 1,
      })
      const booking = bookingRes.data.data || bookingRes.data
      const bookingId = booking._id

      //Stripe checkout session create
      const paymentRes = await api.initStripeCheckout({ bookingId })
      const data = paymentRes.data.data || paymentRes.data
      const url = data.url

      if (!url) {
        throw new Error("Stripe checkout URL missing")
      }

      //Stripe checkout এ redirect
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
    <div className="min-h-[calc(100vh-theme(space.16))] bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 lg:py-16">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute right-0 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            {/* Hero Image */}
            <motion.div
              className="group relative mb-8 aspect-video overflow-hidden rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-200 to-slate-300 shadow-2xl dark:border-slate-800 dark:from-slate-800 dark:to-slate-900"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={mainImage || "/placeholder.svg"}
                alt={pkg.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Featured Badge */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                <Star className="h-4 w-4 fill-white" />
                Featured Package
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-3 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur-sm">
                  <MapPinIcon className="h-4 w-4 text-cyan-600" />
                  {pkg.destination}
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-blue-600" />
                  {pkg.durationDays} days
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur-sm">
                  <Users className="h-4 w-4 text-purple-600" />
                  {pkg.availableSeats} seats
                </div>
              </div>
            </motion.div>

            {/* Title & Description */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-white dark:via-slate-100 dark:to-white lg:text-5xl">
                {pkg.title}
              </h1>

              {pkg.summary && (
                <p className="mb-4 text-lg font-medium text-slate-700 dark:text-slate-300">
                  {pkg.summary}
                </p>
              )}

              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {pkg.description}
              </p>
            </motion.div>

            {/* Itinerary --- day by day  */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="mb-8 overflow-hidden border-2 border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 to-blue-50 dark:border-slate-800 dark:from-cyan-950/30 dark:to-blue-950/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl">Day-by-Day Itinerary</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ol className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
                      {pkg.itinerary.map((day, index) => (
                        <motion.li
                          key={index}
                          className="flex gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >

                          <div className="">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-base font-bold text-white shadow-lg">
                              {index + 1}
                            </div>


                            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                              {day}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ol>
                  </CardContent>

                </Card>
              </motion.div>
            )}

            {/* What's Included */}
            {pkg.included && pkg.included.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="mb-8 overflow-hidden border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg dark:border-emerald-800 dark:from-emerald-950/50 dark:to-teal-950/50">
                  <CardHeader className="border-b border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl text-emerald-900 dark:text-emerald-100">
                        What's Included
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="grid gap-4 md:grid-cols-2">
                      {pkg.included.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                        >
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* What's Not Included */}
            {pkg.excluded && pkg.excluded.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="mb-8 overflow-hidden border-2 border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-lg">
                        <XCircle className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl">What's Not Included</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="grid gap-3 md:grid-cols-2">
                      {pkg.excluded.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
                        >
                          <span className="mt-1 text-slate-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Amenities */}
            {pkg.amenities && pkg.amenities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="overflow-hidden border-2 border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-slate-800 dark:from-purple-950/30 dark:to-pink-950/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl">Amenities & Features</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {pkg.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium dark:border-slate-700 dark:bg-slate-800"
                        >
                          <CheckCircle className="h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
                          <span className="text-slate-700 dark:text-slate-300">
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>



          {/* Right ---- Booking Card */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="sticky top-24 overflow-hidden border-2 border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 to-blue-50 dark:border-slate-800 dark:from-cyan-950/30 dark:to-blue-950/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                    <Shield className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">Book This Package</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                {/* Price Display */}
                <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                  <p className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Starting from
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
                      {pkg.costFrom.toLocaleString()}
                    </p>
                    <span className="text-lg font-semibold text-slate-600 dark:text-slate-400">
                      {pkg.currency}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    per person
                  </p>
                </div>

                {/* Number of People */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Number of people
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={pkg.availableSeats || undefined}
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value) || 1)}
                    className="border-2 border-slate-200 text-base dark:border-slate-700"
                  />
                  {pkg.availableSeats !== undefined && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <Info className="h-3 w-3" />
                      {pkg.availableSeats} seats available
                    </p>
                  )}
                </div>

                {/* Package Dates */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <Calendar className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    Package Dates
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(pkg.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(pkg.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Departure & Arrival */}
                <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <Navigation className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    Departure & Arrival
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        From:
                      </span>
                      <span className="flex-1">{pkg.departureLocation}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        To:
                      </span>
                      <span className="flex-1">{pkg.arrivalLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {bookingError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
                    >
                      {bookingError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={handleBookNow}
                      disabled={isBooking || isAdmin || isOutOfStock}
                    >
                      {isAdmin ? (
                        "Admins cannot book packages"
                      ) : isOutOfStock ? (
                        "No seats available"
                      ) : isBooking ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Redirecting to payment...
                        </>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Book Now
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      )}

                      <motion.div
                        className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>


                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-xl border-2 border-slate-300 bg-white py-6 font-semibold transition-all hover:border-cyan-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400 dark:hover:bg-slate-800"
                    onClick={() => router.push("/about")}
                  >
                    Contact Us
                  </Button>

                  {isAdmin && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400"
                    >
                      <Info className="h-3 w-3" />
                      You are logged in as admin. Booking is available only for normal users.
                    </motion.p>
                  )}
                </div>

                {/* Additional Info */}
                <div className="space-y-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                      Age Range:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {pkg.minAge}-{pkg.maxAge} years
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                      Package Type:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {(pkg.packageType as any)?.name ?? "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}