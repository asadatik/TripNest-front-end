"use client"

import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logoutUser } from "@/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

export default function UserHeader() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/user/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">TripNest</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                {user?.name || "User"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>{user?.email}</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="gap-2">
                <LogOut size={16} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
