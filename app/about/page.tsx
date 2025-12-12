"use client"

import { motion } from "framer-motion"
import { AboutHero } from "@/components/about/about-hero"

import { AboutFeatures } from "@/components/about/about-features"
import { AboutTeam } from "@/components/about/about-team"
import { AboutContact } from "@/components/about/about-contact"
import { AboutCta } from "@/components/about/about-cta"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* background blobs same as before */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute right-0 top-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-0 top-96 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <AboutHero />
      <AboutFeatures />
      <AboutTeam />
      <AboutContact />
      <AboutCta />
    </div>
  )
}
