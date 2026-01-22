"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { registerUser } from "@/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader2, UserPlus, Mail, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.auth)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return
    }

    const result = await dispatch(registerUser({ name, email, password }))

    if (result.meta.requestStatus === "fulfilled") {
      setSuccessMessage("Account created successfully! Redirecting to login...")
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-theme(space.16))] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-500/30 via-pink-500/20 to-transparent blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden border-2 border-slate-200 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
            {/* Header with gradient */}
            <CardHeader className="space-y-4 border-b border-slate-200 bg-gradient-to-br from-white to-slate-50  dark:border-slate-800 dark:from-slate-900 dark:to-slate-800">
        
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="mb-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:via-slate-100 dark:to-white">
                  Create Account
                </CardTitle>
                <CardDescription className="text-base">
                  Join TripNest to explore amazing travel packages
                </CardDescription>
              </motion.div>

              <motion.div
                className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-sm dark:text-cyan-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CheckCircle className="h-4 w-4 text-cyan-500" />
                <span className="text-xs">Fast, secure and easy signup</span>
              </motion.div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-4 shadow-lg dark:border-red-900 dark:from-red-950/50 dark:to-pink-950/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500 text-white shadow-lg">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                          Registration Failed
                        </p>
                        <p className="mt-1 text-xs text-red-700 dark:text-red-300">
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>


              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 shadow-lg dark:border-emerald-900 dark:from-emerald-950/50 dark:to-teal-950/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-lg">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                          Account Created
                        </p>
                        <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                          {successMessage}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <UserPlus className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="border-2 border-slate-200 py-6 pl-12 pr-4 text-base transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700 dark:focus:border-cyan-400"
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="border-2 border-slate-200 py-6 pl-12 pr-4 text-base transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700 dark:focus:border-cyan-400"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="border-2 border-slate-200 py-6 pl-12 pr-12 text-base transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700 dark:focus:border-cyan-400"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                      tabIndex={-1}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </motion.button>
                  </div>
                </motion.div>

      
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="border-2 border-slate-200 py-6 pl-12 pr-12 text-base transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700 dark:focus:border-cyan-400"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                      tabIndex={-1}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </motion.button>
                  </div>

                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="mt-1 text-xs text-destructive">
                      Passwords do not match
                    </p>
                  )}
                </motion.div>

                {/* submitbutton */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
                      disabled={isLoading}
                    >
                     
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Sign Up
                          <UserPlus className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                    
                      <motion.div
                        className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </motion.div>
              </form>

              {/* Login link */}
              <motion.div
                className="mt-6 text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-slate-600 dark:text-slate-400">
                  Already have an account?{" "}
                </span>
                <Link
                  href="/auth/login"
                  className="font-semibold text-cyan-600 transition-colors hover:text-cyan-700 hover:underline dark:text-cyan-400 dark:hover:text-cyan-300"
                >
                  Sign in
                </Link>
              </motion.div>
            </CardContent>
          </Card>

          {/* Footer note */}
          <motion.p
            className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
