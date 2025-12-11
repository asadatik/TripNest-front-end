"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logoutUser } from "@/redux/slices/authSlice"


export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return { user, isAuthenticated, isLoading, error, logout: handleLogout }
}
