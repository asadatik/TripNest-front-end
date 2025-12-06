"use client"

import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logoutUser } from "@/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, Menu, LayoutDashboard } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Header() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    const result = await dispatch(logoutUser())
    if (result.meta.requestStatus === "fulfilled") {
      router.push("/")
    }
  }

  const dashboardHref = user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">TripNest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/packages" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Packages
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {user.name || user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={dashboardHref} className="gap-2 flex">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} disabled={isLoading} className="gap-2">
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/packages">Packages</Link>
                </DropdownMenuItem>
                {isAuthenticated && (
                  <DropdownMenuItem asChild>
                    <Link href={dashboardHref}>Dashboard</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
