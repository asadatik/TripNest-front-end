"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Aisha Rahman",
    role: "Frequent traveler",
    quote:
      "Tripnest made booking my trips feel effortless. All my bookings and payments in one clean interface.",
  },
  {
    name: "Karim Hasan",
    role: "Travel agency owner",
    quote:
      "The admin dashboard is exactly what I needed to track bookings and revenue without custom spreadsheets.",
  },
  {
    name: "Sarah Ahmed",
    role: "Remote worker",
    quote:
      "Loved how fast it was to compare packages and checkout securely. The dark UI looks premium on mobile.",
  },
]

export default function Testimonials() {
  return (
    <section className="border-b border-border/60 bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-8 max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Travelers using{" "}
            <span className="bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-transparent">
              Tripnest
            </span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            A few words from people who already like this kind of booking flow.
          </p>
        </motion.div>

        <motion.div
          className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {testimonials.map((t, index) => (
            <motion.article
              key={t.name}
              className="min-w-[260px] flex-1 rounded-3xl border border-border/70 bg-card/90 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur md:min-w-0"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24,
                delay: index * 0.06,
              }}
            >
              <p className="text-sm text-muted-foreground">“{t.quote}”</p>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#00ddff] to-[#ff4edb] text-[11px] font-semibold text-background">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
