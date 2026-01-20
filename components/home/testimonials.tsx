"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Aisha Rahman",
    role: "Frequent traveler",
    quote:
      "Tripnest made booking my trips feel effortless. All my bookings and payments in one clean interface.",
    initials: "AR",
    color: "from-blue-500 to-cyan-500",
    rating: 5,
     image: "/testimonial/aisha (2).jpg", 
  },
  {
    name: "Asadujjaman Atik",
    role: "Travel agency owner",
    quote:
      "The admin dashboard is exactly what I needed to track bookings and revenue without custom spreadsheets.",
    initials: "KH",
    color: "from-purple-500 to-pink-500",
    rating: 5,
     image: "/testimonial/aisha (1).jpg"
  },
  {
    name: "Sarah Ahmed",
    role: "Remote worker",
    quote:
      "Loved how fast it was to compare packages and checkout securely. The dark UI looks premium on mobile.",
    initials: "SA",
    color: "from-cyan-400 to-blue-600",
    rating: 5,
     image: "/testimonial/aisha (3).jpg"
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-transparent blur-3xl"
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
          className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-400/20 via-pink-500/15 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
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
            className="inline-block text-sm font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-3 px-4 py-1 rounded-full bg-cyan-100/50 dark:bg-cyan-950/50 border border-cyan-200/50 dark:border-cyan-900/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Traveler Stories
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              travelers worldwide
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            See what adventurers and travel planners have to say about their Tripnest experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {testimonials.map((t, index) => (
            <motion.article
              key={t.name}
              className="group relative overflow-hidden rounded-2xl border border-blue-200/40 dark:border-blue-900/40 bg-gradient-to-br from-white/80 to-blue-50/40 dark:from-slate-900/80 dark:to-blue-950/30 p-6 md:p-7 shadow-lg backdrop-blur-md hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Star Rating */}
              <motion.div
                className="flex gap-1 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      delay: index * 0.1 + 0.2 + i * 0.05,
                      stiffness: 200,
                    }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Quote */}
              <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent dark:via-blue-700/50 mb-6" />

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border/60">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Join hundreds of happy travelers
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Share your story and inspire others on their journey
          </p>
        </motion.div>
      </div>
    </section>
  )
}
