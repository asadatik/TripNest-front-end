"use client"

import { Loader2, PlaneTakeoff } from "lucide-react"
import { motion } from "framer-motion"

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* subtle background orbs */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/70 px-10 py-8 shadow-[0_22px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl"
      >
        {/* circular loader with plane icon */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-cyan-400/40 border-t-fuchsia-500"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-3 rounded-full bg-linear-to-br from-cyan-500/40 to-fuchsia-500/40 blur-[2px]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
          <PlaneTakeoff className="relative h-7 w-7 text-cyan-100" />
        </div>

        <div className="text-center">
          <p className="bg-linear-to-r from-cyan-300 via-sky-300 to-fuchsia-300 bg-clip-text text-sm font-semibold uppercase tracking-[0.2em] text-transparent">
            TripNest is preparing your journey
          </p>
          <p className="mt-1 text-xs text-slate-300/80">
            Please wait a moment while we load your dashboard and bookings.
          </p>
        </div>

        {/* small animated dots */}
        <div className="mt-1 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-cyan-300"
              animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
