"use client"

import { motion } from "framer-motion"
import { Plane, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutHero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur-sm dark:text-cyan-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Plane className="h-4 w-4 text-cyan-500" />
            <span>About TripNest</span>
          </motion.div>

          <h1 className="mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-white dark:via-slate-100 dark:to-white md:text-6xl lg:text-7xl">
            Your Journey,{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Passion
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
            We're not just a travel company—we're your partners in creating extraordinary experiences. 
            Since 2009, we've helped thousands of travelers discover the world's most amazing destinations.
          </p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="group rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40">
                <span className="flex items-center gap-2">
                  Get In Touch
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
