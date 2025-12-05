"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchPackageDetailStart,
  fetchPackageDetailSuccess,
  fetchPackageDetailError,
} from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, MapPin, Calendar, Users, CheckCircle, AlertCircle } from "lucide-react"

export default function PackageDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const dispatch = useAppDispatch()
  const { selectedPackage, isLoading, error } = useAppSelector((state) => state.packages)

  useEffect(() => {
    const fetchPackageDetail = async () => {
      dispatch(fetchPackageDetailStart())
      try {
        const response = await api.getPackageBySlug(slug)
        dispatch(fetchPackageDetailSuccess(response.data))
        console.log("🚨Package detail loaded:", response.data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch package"
        dispatch(fetchPackageDetailError(errorMessage))
        console.error("🚨Error fetching package detail:", errorMessage)
      }
    }

    if (!selectedPackage || selectedPackage.slug !== slug) {
      fetchPackageDetail()
    }
  }, [dispatch, slug, selectedPackage])

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-theme(space.16))] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (error || !selectedPackage) {
    return (
      <div className="min-h-[calc(100vh-theme(space.16))] py-12">
        <div className="container mx-auto px-4">
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-start gap-2">
            <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{error || "Package not found"}</p>
              <p className="text-sm mt-1">Make sure backend is running at http://localhost:5000</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-theme(space.16))] py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {selectedPackage.image && (
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedPackage.image || "/placeholder.svg"}
                  alt={selectedPackage.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{selectedPackage.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{selectedPackage.description}</p>

              {selectedPackage.duration && (
                <div className="flex items-center gap-2 text-lg mb-4">
                  <Calendar size={20} className="text-primary" />
                  <span>{selectedPackage.duration}</span>
                </div>
              )}
            </div>

            {selectedPackage.features && selectedPackage.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Package Includes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedPackage.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
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
                  <div className="text-sm text-muted-foreground mb-2">Price</div>
                  <div className="text-3xl font-bold text-primary">${selectedPackage.price.toLocaleString()}</div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Us
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      <span>Expert Local Guides</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      <span>Group Tours Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>Flexible Dates</span>
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
