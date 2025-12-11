"use client"

import type React from "react"
import UserHeader from "@/components/UserHeader"
import UserSidebar from "@/components/UserSidebar"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { FullScreenLoader } from "@/components/common/fullscreen-loader"


export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isAuthenticated } = useAuthGuard()

  if (isLoading || !isAuthenticated) {
    return <FullScreenLoader />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UserHeader />
      <div className="flex flex-1">
        <UserSidebar />
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
