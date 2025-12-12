"use client"

import type React from "react"

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
    <div className="flex pt-16 md:pt-4  min-h-screen flex-col bg-background">

      <div className="flex flex-1">
        <UserSidebar />
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
