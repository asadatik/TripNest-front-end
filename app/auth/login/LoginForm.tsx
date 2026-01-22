"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { loginUser } from "@/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  AlertCircle,
  Eye,
  EyeOff,

  Mail,
  Lock,
  LogIn,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const dispatch = useAppDispatch()
  const { isLoading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth,
  )
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      setShowSuccessAlert(true)

      setTimeout(() => {
        // jodi redirect query ache, age
        if (redirect) {
          router.push(redirect)
          return
        }
        // na thakle role-based default
        router.push(
          user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard",
        )
      }, 1500)
    }
  }, [isAuthenticated, user, router, redirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await dispatch(loginUser({ email, password }))

    if (result.meta.requestStatus === "fulfilled") {
      // success handle ta uporer useEffect-e already hocche
    }
  }

  console.log(error, " login page error")

  return (
    <div className="relative min-h-[calc(100vh-theme(space.16))] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
   
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent blur-3xl"
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
          className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-500/30 via-pink-500/20 to-transparent blur-3xl"
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


      <AnimatePresence>
        {showSuccessAlert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-4 w-full max-w-sm overflow-hidden rounded-3xl border-2 border-emerald-200 bg-white shadow-2xl dark:border-emerald-800 dark:bg-slate-900"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-center">
                <motion.div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <svg
                      className="h-10 w-10 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
              <div className="p-6 text-center">
                <motion.h3
                  className="mb-2 text-2xl font-bold text-slate-900 dark:text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Welcome Back!
                </motion.h3>
                <motion.p
                  className="text-sm text-slate-600 dark:text-slate-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Login successful. Redirecting to your dashboard...
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden border-2 border-slate-200 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
            {/* Header with gradient */}
            <CardHeader className="space-y-4 border-b border-slate-200 bg-gradient-to-br from-white to-slate-50 pb-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-800">
              <motion.div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-cyan-500/30"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <LogIn className="h-8 w-8 text-white" />
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="mb-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:via-slate-100 dark:to-white">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-base">
                  Sign in to your account to continue
                </CardDescription>
              </motion.div>

              <motion.div
                className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-sm dark:text-cyan-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="h-4 w-4 text-cyan-500" />
                <span className="text-xs">Secure login with end-to-end encryption</span>
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
                          Login Failed
                        </p>
                        <p className="mt-1 text-xs text-red-700 dark:text-red-300">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
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

                {/* Password Field */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
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

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                   
                          Signing in...
                        </span>
                      ) : (
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Sign In
                          <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      )}
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

              {/* Sign Up Link */}
              <motion.div
                className="mt-6 text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-slate-600 dark:text-slate-400">
                  Don't have an account?{" "}
                </span>
                <Link
                  href="/auth/register"
                  className="font-semibold text-cyan-600 transition-colors hover:text-cyan-700 hover:underline dark:text-cyan-400 dark:hover:text-cyan-300"
                >
                  Sign up
                </Link>
              </motion.div>

  
            </CardContent>
          </Card>

          {/* Footer  */}
          <motion.p
            className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            By signing in, you agree to our Terms of Service and Privacy Policy
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}