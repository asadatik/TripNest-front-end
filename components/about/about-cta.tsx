"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AboutCta() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-2xl dark:border-slate-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="px-8 py-16 text-center md:px-16">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Ready to Start Your Adventure?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Join thousands of travelers who have trusted us with their dream vacations. 
              Let&apos;s create your perfect journey together.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => (window.location.href = "/packages")}
                className="rounded-full bg-white px-8 py-6 text-base font-semibold text-slate-900 shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-100 hover:shadow-xl"
              >
                Browse Packages
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
