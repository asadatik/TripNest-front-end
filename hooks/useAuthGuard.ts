// hooks/useAuthGuard.ts
"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Swal from "sweetalert2"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { loadUserFromCookie, logoutUser } from "@/redux/slices/authSlice"

type AuthGuardOptions = {
  requireAdmin?: boolean
}

export const useAuthGuard = (options?: AuthGuardOptions) => {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading } = useAppSelector((s) => s.auth)

  const requireAdmin = options?.requireAdmin ?? false

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      dispatch(loadUserFromCookie())
    }
  }, [dispatch, isAuthenticated, isLoading])

  useEffect(() => {
    if (isLoading) return

    //  Not logged in 
    if (!user && !isAuthenticated) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }


    if (requireAdmin && user && user.role !== "ADMIN") {
      Swal.fire({
        icon: "warning",
        title: "Access denied",
        text: "This area is only for admins. You have been logged out.",
        confirmButtonColor: "#0ea5e9",
      }).then(() => {
        dispatch(logoutUser())
        router.replace("/")
      })
      return
    }

 
    if (!requireAdmin && user && user.role === "ADMIN") {
      Swal.fire({
        icon: "warning",
        title: "Access denied",
        text: "This area is only for regular users. You have been logged out.",
        confirmButtonColor: "#0ea5e9",
      }).then(() => {
        dispatch(logoutUser())
        router.replace("/")
      })
      return
    }
  }, [user, isAuthenticated, isLoading, requireAdmin, router, pathname, dispatch])

  return { user, isAuthenticated, isLoading }
}
