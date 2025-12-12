"use client"

import Link from "next/link"
import { ArrowRight, PlaneTakeoff, Sparkles, Star, TrendingUp, Shield } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/redux/hooks"

export default function Hero() {



  const { items } = useAppSelector((state) => state.packages)


  
  // User info for dashboard link
  const { user } = useAppSelector((state) => state.auth)
  const isAdmin = user?.role === "ADMIN"
  const targetHref = isAdmin ? "/admin/dashboard" : "/user/dashboard"
  const buttonLabel = isAdmin ? "Go to my Dashboard" : "Go to my trips"


  // সর্বশেষ package কে featured হিসেবে নিলাম 
  const featuredPkg = items.length > 0 ? items[items.length - 1] : null
  const destination = featuredPkg?.destination || "Destination"
  const title = featuredPkg?.title || "Featured trip"
  const durationLabel = featuredPkg?.durationDays
    ? `${featuredPkg.durationDays} days`
    : "Flexible duration"
  const priceLabel =
    featuredPkg?.costFrom && featuredPkg?.currency
      ? `${featuredPkg.costFrom} ${featuredPkg.currency}`
      : featuredPkg?.costFrom
      ? `${featuredPkg.costFrom}`
      : "Contact for price"
            
  const detailsHref = featuredPkg ? `/packages/${featuredPkg.slug}` : "/packages"

  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-pink-500/15 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="container mx-auto flex flex-col items-center gap-12 px-4 pb-20 pt-24 md:flex-row md:justify-between md:gap-16 md:pb-28 md:pt-32 lg:gap-20 lg:pb-32 lg:pt-40">
        {/* Left: content */}
        <div className="max-w-2xl space-y-8 text-center md:text-left">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 shadow-lg shadow-cyan-500/20 backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Plan your next escape with Tripnest</span>
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          >
            Discover{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                unforgettable
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              adventures 
            </span>
              -in clicks.
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-slate-300 sm:text-xl leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
          >
            Compare curated travel packages, book securely with built‑in
            payments, and keep all your trips organized in one sleek dashboard.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
          >
            <Link href="/packages" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 px-8 py-6 text-base font-semibold text-white shadow-2xl shadow-cyan-500/30 transition-all hover:shadow-cyan-500/40 sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Browse packages</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-pink-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </Button>
              </motion.div>
            </Link>


 {/* User dashboard/trips button */}
         
      <Link href={targetHref} className="w-full sm:w-auto">
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="group w-full rounded-2xl border-2 border-slate-700/70 bg-slate-900/50 px-8 py-6 text-base font-semibold text-white backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <span className="flex items-center justify-center gap-2">
              <span>{buttonLabel}</span>
              <TrendingUp className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </motion.div>
      </Link>


          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-slate-400 md:justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2.5 rounded-lg bg-slate-800/40 px-3 py-2 backdrop-blur">
              <Shield className="h-4 w-4 text-cyan-400" />
              <span className="font-medium">Secure payments</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-slate-800/40 px-3 py-2 backdrop-blur">
              <Star className="h-4 w-4 text-pink-400" />
              <span className="font-medium">Curated tours</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-slate-800/40 px-3 py-2 backdrop-blur">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="font-medium">Real-time updates</span>
            </div>
          </motion.div>
        </div>

        {/* Right: animated card */}
        <motion.div
          className="relative mt-8 h-[340px] w-full max-w-md md:mt-0 lg:h-[380px] lg:max-w-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        >
          {/* Floating glow */}
          <motion.div
            className="absolute -inset-12 -z-10 rounded-full bg-gradient-to-br from-cyan-500/30 via-pink-500/20 to-purple-500/30 blur-[80px]"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main card */}
          <motion.div
            className="relative mx-auto h-full rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 p-6 shadow-2xl backdrop-blur-xl lg:p-7"
            animate={{ y: [-10, 0, -10] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {/* Card header */}
            <div className="mb-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-pink-500 shadow-lg shadow-cyan-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <PlaneTakeoff className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Featured trip
                  </p>
                  <p className="text-base font-bold text-white line-clamp-1 lg:text-lg">
                    {title}
                  </p>
                </div>
              </div>
              <motion.span 
                className="rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                {priceLabel}
              </motion.span>
            </div>

            {/* Destination & Duration */}
            <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 p-[1px]">
              <div className="flex items-center justify-between rounded-[15px] bg-slate-900/90 px-5 py-4 backdrop-blur">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Destination</p>
                  <p className="text-base font-bold text-white line-clamp-1 mt-1">
                    {destination}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Duration</p>
                  <p className="text-base font-bold text-cyan-400 mt-1">{durationLabel}</p>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="mb-5 grid grid-cols-2 gap-4 text-sm">
              <motion.div 
                className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-4 backdrop-blur transition-all hover:border-cyan-500/40 hover:bg-slate-800/70"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Included</p>
                <p className="font-semibold text-white line-clamp-2 text-xs leading-relaxed">
                  {featuredPkg?.included && featuredPkg.included.length > 0
                    ? featuredPkg.included.slice(0, 3).join(", ")
                    : "See package details"}
                </p>
              </motion.div>
              <motion.div 
                className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-4 backdrop-blur transition-all hover:border-pink-500/40 hover:bg-slate-800/70"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="font-semibold text-emerald-400 text-xs">
                    {featuredPkg ? "Available now" : "Loading..."}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-700/40 pt-4">
              <span className="text-xs text-slate-400 max-w-[60%]">
                {featuredPkg
                  ? "Real-time package data"
                  : "Packages loading..."}
              </span>
              <Link href={detailsHref}>
                <motion.span 
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/30 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  View details
                  <ArrowRight className="h-3 w-3" />
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-6 -left-4 rounded-2xl border border-slate-700/60 bg-slate-900/95 px-4 py-3 text-sm font-semibold text-slate-300 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center gap-2">
              <motion.div 
                className="h-2 w-2 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>
                {items.length > 0
                  ? `${items.length} packages available`
                  : "Loading packages..."}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </motion.section>
  )
}