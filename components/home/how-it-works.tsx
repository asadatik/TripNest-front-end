"use client"

import { motion } from "framer-motion"

import { Search, CreditCard , LucideTorus  } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Find your perfect trip",
    desc: "Browse curated packages by destination, budget, or duration – no clutter, just what matters.",
  },
  {
    icon: CreditCard,
    title: "Book & pay securely",
    desc: "Complete your booking with Stripe-powered payments and instant confirmation in your dashboard.",
  },
  {
    icon:  LucideTorus ,
    title: "Enjoy the journey",
    desc: "Keep all your trip details in one place and focus on the experience, not the spreadsheets.",
  },
]

export default function HowItWorks() {
  return (
    <section className="border-b border-border/60 bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            How{" "}
            <span className="bg-linear-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-transparent">
              Tripnest
            </span>{" "}
            works
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            A simple three‑step flow that turns travel planning into something you
            actually enjoy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                className="relative h-full rounded-3xl border border-border/70 bg-card/90 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[#00ddff]/8 via-transparent to-[#ff4edb]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#00ddff] to-[#ff4edb] text-background">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
