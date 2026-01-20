"use client"

import { motion } from "framer-motion"
import { Compass, CreditCard, MapPin } from "lucide-react"

const steps = [
  {
    icon: Compass,
    title: "Find your perfect trip",
    desc: "Browse curated packages by destination, budget, or duration – no clutter, just what matters.",
    color: "from-cyan-500 to-blue-600",
    accentColor: "cyan",
  },
  {
    icon: CreditCard,
    title: "Book & pay securely",
    desc: "Complete your booking with Stripe-powered payments and instant confirmation in your dashboard.",
    color: "from-blue-500 to-purple-600",
    accentColor: "blue",
  },
  {
    icon: MapPin,
    title: "Enjoy the journey",
    desc: "Keep all your trip details in one place and focus on the experience, not the spreadsheets.",
    color: "from-purple-500 to-pink-600",
    accentColor: "purple",
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -left-40 bottom-10 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-400/20 via-pink-500/15 to-transparent blur-3xl"
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.4, 0.2, 0.4],
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
          className="mx-auto mb-12 md:mb-16 max-w-3xl text-center"
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
            3-Step Process
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Tripnest
            </span>{" "}
            works
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            A simple three-step flow that turns travel planning into something you actually enjoy.
          </p>
        </motion.div>

        {/* Steps Grid with Connector Lines */}
        <div className="relative">
          {/* Connector Lines (visible on desktop) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 dark:via-blue-700/50 to-transparent -z-10" />

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  className="group relative h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                >
                  {/* Step Card */}
                  <div className="relative h-full rounded-2xl border border-blue-200/40 dark:border-blue-900/40 bg-gradient-to-br from-white/80 to-blue-50/40 dark:from-slate-900/80 dark:to-blue-950/30 p-7 shadow-lg backdrop-blur-md hover:shadow-2xl transition-all">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

                    {/* Step Number with Icon */}
                    <motion.div
                      className={`mb-6 inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br ${step.color} text-white shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: index * 0.15 + 0.1,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>

                    {/* Step Badge */}
                    <div className="mb-4 inline-block px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-900/50">
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wider uppercase">
                        Step {index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Decorative dot at bottom */}
                    <motion.div
                      className={`absolute bottom-4 right-4 h-2 w-2 rounded-full bg-gradient-to-br ${step.color}`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Start exploring packages in minutes and manage your trips effortlessly
          </p>
        </motion.div>
      </div>
    </section>
  )
}
