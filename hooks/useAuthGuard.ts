"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { loadUserFromCookie } from "@/redux/slices/authSlice"

export const useAuthGuard = (options?: { requireAdmin?: boolean }) => {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading } = useAppSelector((s) => s.auth)
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      dispatch(loadUserFromCookie())
    }
  }, [dispatch, isAuthenticated, isLoading])

  useEffect(() => {
    if (isLoading) return

    if (!user && !isAuthenticated) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    if (options?.requireAdmin && user?.role !== "ADMIN") {
      router.replace("/")
    }
  }, [user, isAuthenticated, isLoading, options, router, pathname])

  return { user, isAuthenticated, isLoading }
}
