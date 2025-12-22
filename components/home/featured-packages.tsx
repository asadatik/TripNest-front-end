"use client"

import Link from "next/link"
import { Plane, Clock3, MapPin } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect } from "react"
import { fetchPackagesError, fetchPackagesStart, fetchPackagesSuccess } from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import { FullScreenLoader } from "../common/fullscreen-loader"

export default function FeaturedPackages() {

  const dispatch = useAppDispatch()
  const { items, isLoading, error } = useAppSelector((state) => state.packages)



  console.log(" PackagesPage render: from Redux store", items.length)

  useEffect(() => {
    const fetchPackages = async () => {
      dispatch(fetchPackagesStart())
      try {
        const response = await api.getPackages()
        dispatch(fetchPackagesSuccess(response.data.data))
        console.log(" Packages loaded successfully:", response.data.data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch packages"
        dispatch(fetchPackagesError(errorMessage))
        console.error("🚨Error fetching packages:", errorMessage)
      }
    }

    if (items.length === 0) {
      fetchPackages()
    }
  }, [dispatch, items.length])



  if (isLoading) {
    return <FullScreenLoader />
  }

     


  return (
    <section className="border-b border-border/60 bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* heading */}
        <div className="tw-animate-fade-up tw-animate-duration-700 tw-animate-ease-out mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-transparent">
              trip packages
            </span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Hand‑picked getaways to help you plan your next escape faster.
          </p>
        </div>

        {/* state: loading / error / empty */}
        {isLoading && (
          <div className="flex justify-center py-10 text-sm text-muted-foreground">
            Loading packages...
          </div>
        )}

        {!isLoading && error && (
          <div className="flex justify-center py-10 text-sm text-destructive">
            Failed to load packages. Please try again.
          </div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-10 text-center text-sm text-muted-foreground">
            <p>No packages available yet.</p>
            <Link href="/packages">
              <Button variant="outline" size="sm">
                View all packages
              </Button>
            </Link>
          </div>
        )}

        {/* cards */}
        {!isLoading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 6).map((pkg) => (
              <Card
                key={pkg._id}
                className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/90 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-[#00ddff]/40 hover:shadow-[0_0_60px_rgba(0,221,255,0.25)]"
              >
                {/* gradient edge */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-[#00ddff]/10 via-transparent to-[#ff4edb]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader className="space-y-3 pb-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] font-medium text-muted-foreground/90">
                    <Plane className="h-3 w-3 text-[#00ddff]" />
                    <span>{pkg.destination || "Destination"}</span>
                  </div>
                  <CardTitle className="line-clamp-2 text-base font-semibold leading-snug sm:text-lg">
                    {pkg.title || "Trip package"}
                  </CardTitle>
                  {pkg.summary && (
                    <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                      {pkg.summary}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4 pb-5">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                    <div className="inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-1">
                      <MapPin className="h-3 w-3 text-[#ff4edb]" />
                      <span className="truncate max-w-[140px]">
                        {pkg.destination || "Flexible location"}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-1">
                      <Clock3 className="h-3 w-3" />
                      <span>
                        {pkg.durationDays
                          ? `${pkg.durationDays} days`
                          : "Flexible duration"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        Starting from
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {pkg.costFrom
                          ? `${pkg.costFrom} ${pkg.currency || "USD"}`
                          : "Contact for price"}
                      </p>
                    </div>
                    <Link href={`/packages/${pkg.slug}`} className="mt-auto">
                      <Button
                        size="sm"
                        className="rounded-full bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 px-4 text-[11px] font-medium  text-amber-50  shadow-md transition hover:brightness-110"
                      >
                        View details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* view all link */}
        <div className="mt-8 flex justify-center">
          <Link href="/packages">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs rounded-full bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 px-4 text-[11px] font-medium  shadow-md transition hover:brightness-110       "
            >
              View all packages ✨ 
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
