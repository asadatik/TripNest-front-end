"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logout } from "@/redux/slices/authSlice"

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { user, isLoggedIn, isLoading, error } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return { user, isLoggedIn, isLoading, error, logout: handleLogout }
}
