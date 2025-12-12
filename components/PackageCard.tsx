"use client"

import Link from "next/link"
import type { Package as PackageType } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, ArrowRight, Star, Tag, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface PackageCardProps {
  package: PackageType
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  console.log("🚨Rendering PackageCard for package:", pkg)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden border-2 border-slate-200 bg-white shadow-lg transition-all duration-300 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-400 dark:hover:shadow-cyan-400/20">
        {/* Image Section */}
        {pkg.images && (
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900">
            <img
              src={pkg.images[0] || "/pexels-dreamlensproduction-2450296.jpg"}
              alt={pkg.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
            
            {/* Featured Badge */}
            <motion.div
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Star className="h-3 w-3 fill-white" />
              Featured
            </motion.div>

    
            {/* Destination Badge */}
            {pkg.destination && (
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-900 backdrop-blur-sm dark:border-slate-700/30 dark:bg-slate-900/90 dark:text-white">
                <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                {pkg.destination}
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        <CardHeader className="space-y-3 pb-4">
          <CardTitle className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400 line-clamp-2">
            {pkg.title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
            {pkg.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between space-y-4 pt-0">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Duration */}
            {pkg.durationDays && (
              <motion.div
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    Duration
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {pkg.durationDays}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Status/Availability */}
            <motion.div
              className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/50"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <Clock className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                  Status
                </p>
                <p className="flex items-center gap-1 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Available
                </p>
              </div>
            </motion.div>
          </div>

          {/* Price Section */}
          <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
            <p className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
              Starting from
            </p>
            <div className="flex items-baseline gap-2">
              <p className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
                ${pkg.costFrom}
              </p>
              {pkg.currency && (
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {pkg.currency}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              per person
            </p>
          </div>

          {/* CTA Button */}
          <Link href={`/packages/${pkg.slug}`} className="mt-auto">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Details
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </Link>
        </CardContent>

        {/* Hover Glow Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-0 blur-xl transition-opacity group-hover:opacity-30"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.3 }}
        />
      </Card>
    </motion.div>
  )
}