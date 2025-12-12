
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Plane, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/60 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 dark:border-slate-800/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-3xl"
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
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent blur-3xl"
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

      <div className="container relative z-10 mx-auto px-4 py-16 lg:py-20">
        <motion.div
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-6 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <motion.div
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-cyan-500/30"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Plane className="h-6 w-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
                  TripNest
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Travel Made Easy
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Discover amazing travel packages and create unforgettable memories with our curated tours and seamless booking experience.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-600 transition-all hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:bg-cyan-950 dark:hover:text-cyan-400"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Packages", href: "/packages" },
                { label: "About Us", href: "/about" },
                { label: "Dashboard", href: "/user/dashboard" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
                  >
                    <motion.span
                      className="mr-2 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600"
                      whileHover={{ scale: 1.5, backgroundColor: "#06b6d4" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Help Center", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Contact Support", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
                  >
                    <motion.span
                      className="mr-2 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600"
                      whileHover={{ scale: 1.5, backgroundColor: "#06b6d4" }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <motion.a
                href="mailto:support@tripnest.com"
                className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-cyan-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Email Us
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    support@tripnest.com
                  </p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Call Us
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    +1 (555) 123-4567
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Visit Us
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    123 Travel St, City
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-12 rounded-3xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 p-8 backdrop-blur-sm dark:border-slate-800/60 dark:from-slate-900/90 dark:to-slate-800/50 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-300"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mail className="h-4 w-4" />
              Stay Updated
            </motion.div>
            <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
              Get the latest travel deals, tips, and exclusive offers delivered to your inbox.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border-2 border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
              />
              <motion.button
                className="rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            &copy; {currentYear} TripNest. Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </motion.span>{" "}
            for travelers.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <a href="#" className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}