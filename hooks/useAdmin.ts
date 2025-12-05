"use client"

import { useAppSelector } from "@/redux/hooks"

export const useAdmin = () => {
  const { user } = useAppSelector((state) => state.auth)
  const isAdmin = user?.role === "ADMIN"

  return { isAdmin, user }
}
