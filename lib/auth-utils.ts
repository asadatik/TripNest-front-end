// Authentication utility functions
import type { useAppDispatch } from "@/redux/hooks"
import { loginSuccess, loginError, registerSuccess, registerError } from "@/redux/slices/authSlice"
import type { User } from "./types"

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

export const handleLoginResponse = (
  dispatch: ReturnType<typeof useAppDispatch>,
  data: { user: User; token: string },
) => {
  localStorage.setItem("authToken", data.token)
  localStorage.setItem("user", JSON.stringify(data.user))
  dispatch(loginSuccess(data.user))
}

export const handleRegisterResponse = (
  dispatch: ReturnType<typeof useAppDispatch>,
  data: { user: User; token: string },
) => {
  localStorage.setItem("authToken", data.token)
  localStorage.setItem("user", JSON.stringify(data.user))
  dispatch(registerSuccess(data.user))
}

export const handleAuthError = (dispatch: ReturnType<typeof useAppDispatch>, error: unknown, isLogin: boolean) => {
  const errorMessage = error instanceof Error ? error.message : "An error occurred"
  if (isLogin) {
    dispatch(loginError(errorMessage))
  } else {
    dispatch(registerError(errorMessage))
  }
}

export const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

export const getStoredUser = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }
  return null
}

export const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  }
}
