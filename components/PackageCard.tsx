"use client"

import Link from "next/link"
import type { Package as PackageType } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign } from "lucide-react"

interface PackageCardProps {
  package: PackageType
}

export default function PackageCard({ package: pkg }: PackageCardProps) {


console.log("🚨Rendering PackageCard for package:", pkg)


  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {pkg.images && (
        <div className="aspect-video bg-muted overflow-hidden">
          <img
            src={pkg.images[0] || "/pexels-dreamlensproduction-2450296.jpg"}
            alt={pkg.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{pkg.title}</CardTitle>
        <CardDescription className="line-clamp-2">{pkg.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-2 mb-4">
          {pkg.durationDays && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              {pkg.durationDays}
            </div>
          )}
          <div className="flex items-center gap-2 text-lg font-bold text-primary">
            <DollarSign size={16} />
            {pkg.costFrom} {pkg.currency}
          </div>
        </div>
        <Link href={`/packages/${pkg.slug}`} className="mt-auto">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
