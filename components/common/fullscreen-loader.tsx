"use client"

import { PlaneTakeoff } from "lucide-react"
import { motion } from "framer-motion"

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95">
      {/* Main loader card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/80 px-8 py-6 shadow-lg backdrop-blur-md"
      >
        {/* Circular loader */}
        <div className="relative flex h-14 w-14 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-cyan-400/30 border-t-fuchsia-500/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          />
          <PlaneTakeoff className="relative h-6 w-6 text-cyan-200" />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 bg-clip-text text-sm font-semibold text-transparent uppercase tracking-wider">
            TripNest is preparing your journey
          </p>
          <p className="mt-1 text-xs text-slate-300/80">
            Please wait a moment while we load your dashboard and bookings.
          </p>
        </div>

        {/* Simple pulsing dots */}
        <div className="mt-2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-cyan-300"
              animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
