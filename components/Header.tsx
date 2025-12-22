"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Menu, LayoutDashboard, User, Plane } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logoutUser } from "@/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  )
  const [isOpen, setIsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    const result = await dispatch(logoutUser())
    if (result.meta.requestStatus === "fulfilled") {
      router.push("/")
    }
  }

  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return user?.email?.[0]?.toUpperCase() || "U"
  }

  return (
    <header className="fixed w-full top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80">
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />

      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-6">
        {/* Brand Logo */}
        <Link href="/" className="group relative flex items-center gap-3">
          <motion.div
            className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-cyan-500/30 transition-all group-hover:shadow-xl group-hover:shadow-cyan-500/40"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plane className="h-6 w-6 text-white" />
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
              TripNest
            </span>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Travel Made Easy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <Link href="/">
            <motion.div
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.div>
          </Link>
          <Link href="/packages">
            <motion.div
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Packages
            </motion.div>
          </Link>
          <Link href="/about">
            <motion.div
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Us
            </motion.div>
          </Link>
            <Link href="/faq">
            <motion.div
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FAQ
            </motion.div>
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* User Avatar Dropdown */}
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="group relative hidden items-center gap-3 rounded-full border-2 border-slate-200 bg-white p-1.5 pr-4 shadow-md transition-all hover:border-cyan-500 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400 md:flex"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Avatar Circle */}
                    <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-sm font-bold text-white shadow-inner">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt={user.name || "User"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{getUserInitials()}</span>
                      )}
                      <div className="absolute inset-0 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent" />
                    </div>
                    <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="mt-2 min-w-[240px] rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95"
                >
                  {/* User Info Header */}
                  <div className="mb-2 flex items-center gap-3 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 p-3 dark:from-cyan-950/50 dark:to-blue-950/50">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-base font-bold text-white shadow-lg">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt={user.name || "User"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{getUserInitials()}</span>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-semibold text-slate-900 dark:text-white">
                        {user.name || "User"}
                      </p>
                      <p className="truncate text-xs text-slate-600 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />

                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <LayoutDashboard className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/auth/login">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-500 hover:bg-slate-50 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:bg-slate-800"
                  >
                    Login
                  </Button>
                </motion.div>
              </Link>
              <Link href="/auth/register">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40">
                    <span className="relative z-10">Sign Up</span>
                    <motion.div
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white text-slate-700 shadow-md transition-all hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="mt-2 w-64 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95"
              >
                {/* User Info in Mobile Menu (if authenticated) */}
                {isAuthenticated && user && (
                  <>
                    <div className="mb-2 flex items-center gap-3 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 p-3 dark:from-cyan-950/50 dark:to-blue-950/50">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-sm font-bold text-white shadow-lg">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.name || "User"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span>{getUserInitials()}</span>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {user.name || "User"}
                        </p>
                        <p className="truncate text-xs text-slate-600 dark:text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                  </>
                )}

                {/* Navigation Links */}
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href="/"
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href="/packages"
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Packages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href="/about"
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    About Us
                  </Link>
                </DropdownMenuItem>
                   <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href="/faq"
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    FAQ
                  </Link>
                </DropdownMenuItem>



                {isAuthenticated && user && (
                  <>
                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link
                        href={dashboardHref}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <LayoutDashboard className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {/* Auth Actions */}
                {!isAuthenticated && (
                  <>
                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link
                        href="/auth/login"
                        className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link
                        href="/auth/register"
                        className="flex items-center rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-3 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg"
                      >
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {/* Logout */}
                {isAuthenticated && user && (
                  <>
                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}