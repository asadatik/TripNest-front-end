"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Package, Bookmark, CreditCard, RefreshCw, AlertCircle } from "lucide-react"
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
        api.getPackages(),
        api.getBookings(),
        api.getPayments(),
      ])

      const users = usersRes.data?.data || []
      const packages = packagesRes.data?.data || []
      const bookings = bookingsRes.data?.data || []
      const payments = paymentsRes.data?.data || []
     console.log("🚨Dashboard data:", { users, packages, bookings, payments })
      const totalRevenue = (payments ?? []).reduce(
        (sum: number, p: any) => (p.status === "UNPAID" ? sum + (p.amount || 0) : sum),
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
      color: "text-blue-500",
    },
    {
      title: "Total Packages",
      value: stats.totalPackages,
      icon: Package,
      color: "text-green-500",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Bookmark,
      color: "text-purple-500",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: CreditCard,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the admin dashboard</p>
        </div>
        <Button onClick={fetchDashboardData} disabled={isLoading} variant="outline" className="gap-2 bg-transparent">
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-3 text-destructive">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">Error loading dashboard</p>
            <p className="text-sm">{error}</p>
          </div>
          <Button size="sm" variant="outline" onClick={fetchDashboardData}>
            Retry
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
