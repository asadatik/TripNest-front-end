"use client"

import { useAppSelector } from "@/redux/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, Bookmark, CreditCard } from "lucide-react"

export default function AdminDashboard() {
  const { users } = useAppSelector((state) => state.users)
  const { packages: pkgs } = useAppSelector((state) => state.packages)
  const { bookings } = useAppSelector((state) => state.bookings)
  const { payments } = useAppSelector((state) => state.payments)

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Packages",
      value: pkgs.length,
      icon: Package,
      color: "text-green-500",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: Bookmark,
      color: "text-purple-500",
    },
    {
      title: "Total Revenue",
      value: `$${payments.reduce((sum, p) => (p.status === "SUCCESS" ? sum + p.amount : sum), 0).toLocaleString()}`,
      icon: CreditCard,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
