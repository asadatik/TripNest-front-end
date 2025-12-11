"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FinalCta() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/90 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.6)] backdrop-blur md:p-10"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#00ddff]/30 via-[#ff4edb]/25 to-[#ff00aa]/30 opacity-80 blur-3xl" />

          <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to plan your next{" "}
                <span className="bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-transparent">
                  escape
                </span>
                ?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Start by exploring packages, or create an account to keep all
                your trips and payments in one dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/packages">
                <Button
                  asChild
                  className="relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] px-6 py-2 text-sm font-medium text-background shadow-lg shadow-[#00ddff]/25 hover:brightness-110"
                >
                  <span>
                    <span>Browse packages</span>
                  </span>
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  variant="outline"
                  className="rounded-full border-border/80 bg-background/70 px-6 py-2 text-sm text-foreground/90 backdrop-blur hover:bg-background"
                >
                  Create account
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
