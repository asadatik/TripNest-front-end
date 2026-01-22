"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Bookmark,
  User,
  Menu,
  X,
  CreditCard,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const userNav = [
  { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/bookings", label: "My Bookings", icon: Bookmark },
  { href: "/user/profile", label: "Profile", icon: User },
  { href: "/user/my-payments", label: "My Payments", icon: CreditCard },
]

export default function UserSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-50 inline-flex items-center justify-center rounded-xl border border-border/70 bg-card/90 p-2.5 text-foreground shadow-lg backdrop-blur transition-all duration-200 hover:bg-card/95 md:hidden"
        aria-label="Toggle menu"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={cn(

          "fixed left-0 top-28 z-40 h-[calc(100vh-7rem)] w-64 overflow-y-auto md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:left-0 md:z-30",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
        initial={{ x: -256 }}
        animate={{ x: isOpen || !isMobile ? 0 : -256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
  
        <div className="relative m-4 overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur md:m-0 md:h-full md:rounded-none md:border-none md:border-r md:shadow-none">
 
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#00ddff]/20 via-transparent to-[#ff4edb]/20 opacity-60" />


          <nav className="space-y-2 p-4">
            {userNav.map((item, index) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/")
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 group",
                      isActive
                        ? "bg-gradient-to-r from-[#00ddff]/30 via-[#ff4edb]/25 to-[#ff00aa]/20 text-foreground shadow-lg shadow-[#00ddff]/10 border-[#00ddff]/20"
                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground border-transparent",
                    )}
                  >
                  {/*  */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#00ddff]/30 via-[#ff4edb]/25 to-[#ff00aa]/20 blur-xl"
                        layoutId="activeNavUser"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="transition-transform"
                    >
                      <item.icon
                        size={20}
                        className={isActive ? "text-[#00ddff]" : ""}
                      />
                    </motion.div>
                    <span className="truncate">{item.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </div>
      </motion.aside>
    </>
  )
}
