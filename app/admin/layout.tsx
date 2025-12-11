"use client"

import type React from "react"
import AdminHeader from "@/components/AdminHeader"
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
    <div className="flex min-h-screen flex-col bg-background">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
