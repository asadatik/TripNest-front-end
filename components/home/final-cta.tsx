"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Plane, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FinalCta() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-gradient-to-tr from-purple-400/20 via-pink-500/15 to-transparent blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-blue-200/40 dark:border-blue-900/40 bg-gradient-to-br from-white/80 to-blue-50/40 dark:from-slate-900/80 dark:to-blue-950/30 p-8 md:p-12 shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-60 blur-2xl" />

          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between text-center lg:text-left">
            {/* Left content */}
            <motion.div
              className="flex-1 max-w-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Plane className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                </motion.div>
                <span className="text-sm font-semibold text-blue-600 dark:text-cyan-400 tracking-wider">
                  START YOUR JOURNEY
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to plan your next{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  adventure
                </span>
                ?
              </h2>

              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Discover curated travel packages, manage your itineraries, and keep all your trip details in one place. Your next unforgettable experience awaits.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
                <Link href="/packages">
                  <Button
                    size="lg"
                    className="relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold px-8 py-3 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all hover:scale-105 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Explore packages</span>
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-2 border-blue-200 dark:border-blue-900/50 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white font-semibold px-8 py-3 backdrop-blur-sm hover:bg-blue-50/80 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-800 transition-all"
                  >
                    <span>Create account</span>
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right decorative element */}
            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-64 h-64">
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/20 border border-blue-300/40 dark:border-blue-700/40"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Plane className="w-32 h-32 text-blue-500 dark:text-cyan-400 opacity-80" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
