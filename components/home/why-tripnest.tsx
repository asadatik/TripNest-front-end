"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Sparkles, Headset, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Curated experiences",
    desc: "No random listings – only structured packages with clear pricing and inclusions.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    desc: "JWT auth, role‑based admin, and Stripe payments keep your data and money safe.",
  },
  {
    icon: BarChart3,
    title: "Smart dashboard",
    desc: "Track bookings, payments, and statuses in one place – for both users and admins.",
  },
  {
    icon: Headset,
    title: "Built for support",
    desc: "Trip details organized so helping your customers actually becomes easy.",
  },
]

export default function WhyTripnest() {
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
            Why travelers choose{" "}
            <span className="bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-transparent">
              Tripnest
            </span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Under the hood it’s a solid booking engine, on the surface it feels
            like a premium travel brand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="group flex h-full items-start gap-4 rounded-3xl border border-border/70 bg-card/90 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <div className="relative mt-1 flex h-10 w-10 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00ddff]/30 to-[#ff4edb]/30 blur-md opacity-60 group-hover:opacity-90" />
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-background/80">
                    <Icon className="h-5 w-5 text-[#00ddff]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
