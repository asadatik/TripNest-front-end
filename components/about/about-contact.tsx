"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, CheckCircle, Send, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AboutContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            Get In Touch
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full overflow-hidden border-2 border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
                <CardContent className="p-8">
                  <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <motion.div
                      className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-cyan-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-cyan-400"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                          Email Us
                        </p>
                        <a
                          href="mailto:support@tripnest.com"
                          className="text-base font-semibold text-slate-900 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400"
                        >
                          support@tripnest.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-cyan-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-cyan-400"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                          Call Us
                        </p>
                        <a
                          href="tel:+15551234567"
                          className="text-base font-semibold text-slate-900 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400"
                        >
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-cyan-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-cyan-400"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                          Visit Us
                        </p>
                        <p className="text-base font-semibold text-slate-900 dark:text-white">
                          123 Travel Street, Adventure City, AC 12345
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-cyan-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-cyan-400"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                          Working Hours
                        </p>
                        <p className="text-base font-semibold text-slate-900 dark:text-white">
                          Mon - Fri: 9AM - 6PM
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Sat: 10AM - 4PM
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-2 border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
                <CardContent className="p-8">
                  <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                    Send Us a Message
                  </h3>

                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/50"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                          Message sent successfully! We&apos;ll get back to you soon.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="border-2 border-slate-200 py-6 text-base transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="border-2 border-slate-200 py-6 text-base transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Subject
                      </label>
                      <Input
                        type="text"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                        className="border-2 border-slate-200 py-6 text-base transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Message
                      </label>
                      <textarea
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        rows={5}
                        className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <MessageSquare className="h-5 w-5" />
                            </motion.div>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Send Message
                            <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
