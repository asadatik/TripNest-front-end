"use client"

import type React from "react"

import AdminSidebar from "@/components/AdminSidebar"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { FullScreenLoader } from "@/components/common/fullscreen-loader"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isAuthenticated } = useAuthGuard({ requireAdmin: true })

  if (isLoading || !isAuthenticated) {
    return <FullScreenLoader />
  }

  return (
    <div className="flex pt-14 md:pt-2 min-h-screen flex-col bg-background">
      {/* <AdminHeader /> */}
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
