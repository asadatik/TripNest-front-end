"use client"

import { motion } from "framer-motion"
import { Sparkles, ShieldCheck, BarChart3, Headset } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Curated experiences",
    desc: "No random listings – only structured packages with clear pricing and inclusions.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    desc: "JWT auth, role-based admin, and Stripe payments keep your data and money safe.",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: BarChart3,
    title: "Smart dashboard",
    desc: "Track bookings, payments, and statuses in one place – for both users and admins.",
     color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Headset,
    title: "Built for support",
    desc: "Trip details organized so helping your customers actually becomes easy.",
     color: "from-blue-500 to-purple-600",
  },
]

export default function WhyTripnest() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-transparent blur-3xl"
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
          className="absolute -right-32 bottom-32 h-72 w-72 rounded-full bg-gradient-to-tl from-purple-400/20 via-pink-500/15 to-transparent blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.2, 0.3],
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
        {/* Header */}
        <motion.div
          className="mx-auto mb-14 md:mb-18 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block text-sm font-semibold text-blue-600 dark:text-cyan-400 tracking-widest uppercase mb-4 px-4 py-1 rounded-full bg-blue-100/50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-900/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Core Strengths
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Why travelers choose{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Tripnest
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Under the hood it's a solid booking engine, on the surface it feels like a premium travel brand.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="group relative h-full overflow-hidden rounded-2xl border border-blue-200/40 dark:border-blue-900/40 bg-gradient-to-br from-white/80 to-blue-50/40 dark:from-slate-900/80 dark:to-blue-950/30 p-7 shadow-lg backdrop-blur-md hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

                {/* Icon Container */}
                <div className="flex items-start gap-5">
                  <motion.div
                    className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br ${feature.color} text-white shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.1 + 0.1,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>

                {/* Decorative line at bottom */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${feature.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
