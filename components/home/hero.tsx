"use client"

import Link from "next/link"
import { ArrowRight, PlaneTakeoff, Sparkles, Star, TrendingUp, Shield } from "lucide-react"
import { motion, type Variants } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/redux/hooks"

export default function Hero() {
const { items = [] } = useAppSelector((state) => state.packages ?? { items: [] })

const featuredPkg = items.length > 0 ? items[items.length - 1] : null

  const { user } = useAppSelector((state) => state.auth)
  const isAdmin = user?.role === "ADMIN"
  const targetHref = isAdmin ? "/admin/dashboard" : "/user/dashboard"
  const buttonLabel = isAdmin ? "Go to my Dashboard" : "Go to my trips"



// console.log("Hero render: featured package:", featuredPkg)


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

  // Animation variants
  const containerVariants : Variants= {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants  : Variants= {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const floatingVariants  : Variants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const glowVariants  : Variants = {
    animate: {
      scale: [1, 1.08, 1],
      opacity: [0.4, 0.65, 0.4],
      transition: {
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const pulseVariants  : Variants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const bgOrbVariants   : Variants = {
    animate: (i: number) => ({
      y: [0, 30, 0],
      x: [0, i % 2 === 0 ? 20 : -20, 0],
      transition: {
        duration: 8 + i,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Premium animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-b from-cyan-500/30 to-cyan-500/5 blur-3xl"
          variants={bgOrbVariants}
          animate="animate"
          custom={0}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-t from-pink-500/25 to-pink-500/5 blur-3xl"
          variants={bgOrbVariants}
          animate="animate"
          custom={1}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/5 blur-3xl"
          variants={bgOrbVariants}
          animate="animate"
          custom={2}
        />
      </div>

      {/* Grid pattern overlay - enhanced */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Radial gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-950/40" />

      <div className="container mx-auto flex flex-col items-center gap-12 px-4 pb-20 pt-24 md:flex-row md:justify-between md:gap-16 md:pb-28 md:pt-32 lg:gap-20 lg:pb-32 lg:pt-40">
        {/* Left: content */}
        <motion.div
          className="max-w-2xl space-y-8 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 shadow-lg shadow-cyan-500/20 backdrop-blur-xl"
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Plan your next escape with Tripnest</span>
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Main heading */}
          <motion.div
            className="space-y-3"
            variants={itemVariants}
          >
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1]">
              Discover{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-400 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  unforgettable
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 rounded-full blur-sm"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                adventures
              </span>
              <span className="text-white"> — in clicks.</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg text-slate-300 sm:text-xl leading-relaxed max-w-xl mx-auto md:mx-0"
            variants={itemVariants}
          >
            Compare curated travel packages, book securely with built‑in
            payments, and keep all your trips organized in one sleek dashboard.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start pt-2"
            variants={itemVariants}
          >
            <Link href="/packages" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button className="group relative w-full overflow-hidden rounded-2xl bg-linear-to-tr from-cyan-500 via-blue-600 to-purple-600 px-8 py-6 text-base font-semibold text-white shadow-2xl shadow-cyan-500/30 transition-all hover:shadow-cyan-500/50 sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Browse packages</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-cyan-600 via-pink-500 to-purple-500 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </Link>

            <Link href={targetHref} className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  variant="outline"
                  className="group w-full rounded-2xl border-2 border-slate-700/50 bg-slate-900/40 px-8 py-6 text-base font-semibold text-white backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>{buttonLabel}</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <TrendingUp className="h-4 w-4" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 pt-4 text-sm text-slate-400 md:justify-start"
            variants={itemVariants}
          >
            {[
              { icon: Shield, label: "Secure payments", color: "cyan" },
              { icon: Star, label: "Curated tours", color: "pink" },
              { icon: TrendingUp, label: "Real-time updates", color: "purple" },
            ].map((indicator, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2.5 rounded-lg bg-slate-800/40 px-3 py-2 backdrop-blur border border-slate-700/50 transition-all"
                whileHover={{ 
                  y: -2,
                  boxShadow: indicator.color === "cyan" 
                    ? "0 0 20px rgba(34, 211, 238, 0.2)" 
                    : indicator.color === "pink"
                    ? "0 0 20px rgba(236, 72, 153, 0.2)"
                    : "0 0 20px rgba(168, 85, 247, 0.2)"
                }}
              >
                <indicator.icon 
                  className={`h-4 w-4 text-${indicator.color}-400`} 
                />
                <span className="font-medium">{indicator.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: animated card - Premium version */}
        <motion.div
          className="relative mt-8 h-[340px] w-full max-w-md md:mt-0 lg:h-[380px] lg:max-w-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Floating glow - enhanced */}
          <motion.div
            className="absolute -inset-12 -z-10 rounded-full bg-gradient-to-br from-cyan-500/30 via-pink-500/20 to-purple-500/30 blur-3xl"
            variants={glowVariants}
            animate="animate"
          />

          {/* Animated gradient border wrapper */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 via-cyan-500 to-purple-500 p-1"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            {/* Inner card container */}
            <div className="relative h-full rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl overflow-hidden">
              {/* Shine effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"
                animate={{
                  x: [-500, 500],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Main card content */}
              <motion.div
                className="relative h-full p-6 lg:p-7"
                variants={floatingVariants}
                animate="animate"
              >
                {/* Card header */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-pink-500 shadow-lg shadow-cyan-500/30"
                      whileHover={{ rotate: 360 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
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
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {priceLabel}
                  </motion.span>
                </div>

                {/* Destination & Duration */}
                <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/15 via-pink-500/15 to-purple-500/15 p-px">
                  <div className="flex items-center justify-between rounded-[15px] bg-slate-900/90 px-5 py-4 backdrop-blur">
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Destination
                      </p>
                      <p className="text-base font-bold text-white line-clamp-1 mt-1">
                        {destination}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Duration
                      </p>
                      <p className="text-base font-bold text-cyan-400 mt-1">
                        {durationLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info grid */}
                <div className="mb-5 grid grid-cols-2 gap-4 text-sm">
                  <motion.div
                    className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur transition-all hover:border-cyan-500/40 hover:bg-slate-800/60"
                    whileHover={{ scale: 1.03, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                      Included
                    </p>
                    <p className="font-semibold text-white line-clamp-2 text-xs leading-relaxed">
                      {featuredPkg?.included && featuredPkg.included.length > 0
                        ? featuredPkg.included.slice(0, 3).join(", ")
                        : "See package details"}
                    </p>
                  </motion.div>
                  <motion.div
                    className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur transition-all hover:border-pink-500/40 hover:bg-slate-800/60"
                    whileHover={{ scale: 1.03, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                      Status
                    </p>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                        variants={pulseVariants}
                        animate="animate"
                      />
                      <p className="font-semibold text-emerald-400 text-xs">
                        {featuredPkg ? "Available now" : "Loading..."}
                      </p>
                    </div>
                  </motion.div>
                </div>

          
              </motion.div>
            </div>
          </motion.div>

          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-4 -right-4 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/95 to-slate-900/95    text-slate-300 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
          
          >
            <Link href={detailsHref}>
                    <motion.span
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/30 px-3 py-1.5 text-sm md:text-lg font-semibold text-cyan-300 transition-all hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      View details
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </motion.span>
                  </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade - enhanced */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />
    </motion.section>
  )
}