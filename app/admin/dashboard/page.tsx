"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Package, Bookmark, CreditCard, RefreshCw, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { api } from "@/lib/api"

interface DashboardStats {
  totalUsers: number
  totalPackages: number
  totalBookings: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPackages: 0,
    totalBookings: 0,
    totalRevenue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [usersRes, packagesRes, bookingsRes, paymentsRes] = await Promise.all([
        api.getUsers(),
        api.getPackages({ page: 1, limit: 999 }),
        api.getBookings(),
        api.getPayments(),
      ])

      const users = usersRes.data?.data || []
      const packages = packagesRes.data?.data || []
      const bookings = bookingsRes.data?.data || []
      const payments = paymentsRes.data?.data || []
      console.log("🚨Dashboard data:", { users, packages, bookings, payments })
      const totalRevenue = (payments ?? []).reduce(
        (sum: number, p: any) => (p.status === "PAID" ? sum + (p.amount || 0) : sum),
        0,
      )

      setStats({
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalPackages: Array.isArray(packages) ? packages.length : 0,
        totalBookings: Array.isArray(bookings) ? bookings.length : 0,
        totalRevenue,
      })
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchDashboardData()
    }
  }, [user])

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Total Packages",
      value: stats.totalPackages,
      icon: Package,
      gradient: "from-green-500/20 via-green-500/10 to-transparent",
      iconColor: "text-green-400",
      borderColor: "border-green-500/20",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Bookmark,
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: CreditCard,
      gradient: "from-orange-500/20 via-orange-500/10 to-transparent",
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/20",
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Welcome to the admin dashboard</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="rounded-xl bg-gradient-to-r text-black from-[#00ddff]/20 to-[#ff4edb]/20 border border-[#00ddff]/30  hover:from-[#00ddff]/30 hover:to-[#ff4edb]/30 gap-2 backdrop-blur transition-all duration-200"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </motion.div>
      </motion.div>

      {/* Error Alert */}
      {error && (
        <motion.div
          className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-start gap-3 text-destructive backdrop-blur"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">Error loading dashboard</p>
            <p className="text-sm">{error}</p>
          </div>
          <Button size="sm" variant="outline" onClick={fetchDashboardData} className="rounded-lg">
            Retry
          </Button>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ translateY: -4 }}
          >
            <Card className={`relative overflow-hidden border border-border/70 bg-card/90 backdrop-blur shadow-[0_20px_70px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-300 ${stat.borderColor}`}>
              {/* Gradient Background */}
              <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${stat.gradient} opacity-60`} />

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </motion.div>
              </CardHeader>

              <CardContent>
                {isLoading ? (
                  <motion.div
                    className="h-8 bg-gradient-to-r from-gray-200/50 to-gray-300/50 rounded-lg backdrop-blur"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                ) : (
                  <motion.div
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}