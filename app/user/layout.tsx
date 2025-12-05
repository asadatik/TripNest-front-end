import type React from "react"
import UserHeader from "@/components/UserHeader"
import UserSidebar from "@/components/UserSidebar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
