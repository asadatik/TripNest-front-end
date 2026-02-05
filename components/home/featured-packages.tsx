"use client"

import Link from "next/link"
import { Plane, Clock, MapPin, ArrowRight, Star, Sparkles } from "lucide-react"
import { motion, LazyMotion, domAnimation, m } from "framer-motion"  // ✅ m import
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FullScreenLoader } from "../common/fullscreen-loader"
import { useState } from "react"

type Package = {
  _id: string
  title: string
  destination?: string
  summary?: string
  durationDays?: number
  costFrom?: number
  currency?: string
  slug?: string
}

interface FeaturedPackagesProps {
  initialData?: Package[]
}

export default function FeaturedPackages({
  initialData = []
}: FeaturedPackagesProps) {
  const [packages, setPackages] = useState(initialData)
  const [loading, setLoading] = useState(!initialData.length)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (loading && packages.length === 0) {
    return <FullScreenLoader />
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 py-16 dark:border-slate-800/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:py-24">

        <div className="pointer-events-none absolute inset-0 -z-10 animate-pulse">
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">

          <m.div
            className="mx-auto mb-12 max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <m.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur-sm dark:text-cyan-100"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Sparkles className="h-4 w-4 text-cyan-500" />
              <span>Handpicked Destinations</span>
            </m.div>

            <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Featured{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trip Packages
              </span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 md:text-lg">
              Hand‑picked getaways to help you plan your next escape faster.
            </p>
          </m.div>

          {/* empty msg*/}
          {!loading && packages.length === 0 && (
            <m.div
              className="flex flex-col items-center gap-4 py-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                <Plane className="h-10 w-10 text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-400">No packages available yet.</p>
              <Link href="/packages">
                <Button className="rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30">
                  View all packages
                </Button>
              </Link>
            </m.div>
          )}

          {/* Cards */}
          {packages.length > 0 && (
            <m.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {packages.slice(0, 6).map((pkg) => (
                <m.div
                  key={pkg._id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group relative h-full overflow-hidden border-2 border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/20 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-cyan-400 dark:hover:shadow-cyan-400/20">
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />


                    {/*  */}
                    <CardHeader className="space-y-4 pb-4">

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          <Plane className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                          <span>{pkg.destination || "Destination"}</span>
                        </div>

                        
                        <div className="inline-flex   items-center gap-1.5 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                          <Star className="h-3 w-3 fill-white" />
                          Featured
                        </div>
                      </div>



                      <CardTitle className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400 line-clamp-2">
                        {pkg.title || "Trip package"}
                      </CardTitle>

                      {pkg.summary && (
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
                          {pkg.summary}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-5 pb-6">
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium dark:border-slate-700 dark:bg-slate-800">
                          <MapPin className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                          <span className="text-slate-700 dark:text-slate-300">{pkg.destination || "Flexible"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium dark:border-slate-700 dark:bg-slate-800">
                          <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                          <span className="text-slate-700 dark:text-slate-300">
                            {pkg.durationDays ? `${pkg.durationDays} days` : "Flexible"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Starting from
                          </p>
                          <p className="mt-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
                            {pkg.costFrom ? `$${pkg.costFrom}` : "Contact"}
                          </p>
                          {pkg.currency && (
                            <p className="text-xs text-slate-600 dark:text-slate-400">{pkg.currency}</p>
                          )}
                        </div>

                        <Link href={`/packages/${pkg.slug}`}>
                          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="group/btn rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40">
                              <span className="flex items-center gap-1.5">
                                View
                                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                              </span>
                            </Button>
                          </m.div>
                        </Link>
                      </div>
                    </CardContent>

                    <m.div
                      className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 opacity-0 blur-xl transition-opacity group-hover:opacity-20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                    />
                  </Card>
                </m.div>
              ))}
            </m.div>
          )}
          {/*  */}
          {packages.length > 0 && (
            <m.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/packages">
                <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="group rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40">
                    <span className="flex items-center gap-2">
                      View All Packages
                      <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    </span>
                  </Button>
                </m.div>
              </Link>
            </m.div>
          )}
        </div>
      </section>
    </LazyMotion>
  )
}
