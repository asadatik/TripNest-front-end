"use client"

import type React from "react"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import { AppDispatch } from "@/redux/store"
import { loadUserFromCookie } from "@/redux/slices/authSlice"
import { useAppDispatch } from "@/redux/hooks"

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadUserFromCookie())
  }, [dispatch])

  return <>{children}</>
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  )
}
