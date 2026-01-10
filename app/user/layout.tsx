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


  
 const { isLoading, isAuthenticated, user } = useAuthGuard()

if (isLoading || !isAuthenticated || !user) {
  return <FullScreenLoader />
}


  // ekhane ashle mane:
  // - logged in
  // - role jeta-i hok, hook already unauthorized case e redirect diye dise
  return (
    <div className="flex min-h-screen flex-col bg-background pt-16 md:pt-4">
      <div className="flex flex-1">
        <UserSidebar />
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
