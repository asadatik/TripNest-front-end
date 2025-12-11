"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Menu, LayoutDashboard } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logoutUser } from "@/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  )
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    const result = await dispatch(logoutUser())
    if (result.meta.requestStatus === "fulfilled") {
      router.push("/")
    }
  }

  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      {/* subtle gradient bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-px bg-linear-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa]" />

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-linear-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] blur-md opacity-60" />
            <span className="relative rounded-full bg-background/80 px-3 py-1 text-sm font-semibold tracking-tight text-foreground">
              TripNest
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/packages"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Packages
          </Link>
        </nav>

        {/* Auth + Mobile */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="hidden rounded-full border-border/70 bg-background/60 px-3 text-sm font-medium text-foreground/90 shadow-sm hover:border-border hover:bg-background/80 md:inline-flex"
                >
                  <span className="max-w-[140px] truncate">
                    {user.name || user.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[220px] border-border/70 bg-card/95 backdrop-blur"
              >
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={dashboardHref} className="flex items-center gap-2">
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-destructive"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login" className="hidden md:block">
                <Button
                  variant="outline"
                  className="rounded-full border-border/70 bg-background/40 text-sm"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" className="hidden md:block">
                <Button className="rounded-full bg-linear-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] px-5 text-sm font-medium text-background shadow-md hover:brightness-110">
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background/60 hover:bg-background/80"
                >
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="mt-2 w-44 border-border/70 bg-card/95 backdrop-blur"
              >
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
                {!isAuthenticated && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/register">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
