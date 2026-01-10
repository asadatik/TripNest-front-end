// app/(admin)/layout.tsx or similar
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
  const { isLoading, isAuthenticated, user } = useAuthGuard({
    requireAdmin: true,
  })

  if (isLoading || !isAuthenticated || !user) {
    return <FullScreenLoader />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pt-14 md:pt-2">
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
