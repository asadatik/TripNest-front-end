"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function MyPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMyPayments = async () => {
      try {
        setIsLoading(true)
        const res = await api.getMyPayments()
        setPayments(res.data.data || res.data)
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load your payments"
        setError(msg)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyPayments()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
      case "SUCCESS":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "UNPAID":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      case "FAILED":
      case "REFUNDED":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          My Payments
        </h1>
        <p className="mt-1 text-muted-foreground">
          All your payment history in one place
        </p>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          className="flex items-start gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-destructive backdrop-blur"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="mt-0.5 h-4 w-4" />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border border-border/70 bg-card/90 backdrop-blur shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
          {/* Gradient bg */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#00ddff]/20 via-transparent to-[#ff4edb]/20 opacity-60" />

          <CardHeader>
            <CardTitle>Your Payments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Loader2 className="h-8 w-8 text-[#00ddff]" />
                </motion.div>
              </div>
            ) : payments.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">
                No payments found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="text-xs sm:text-sm">ID</TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Package
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Amount
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Status
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p: any) => (
                      <motion.tr
                        key={p._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-border/50 hover:bg-background/30 transition-colors"
                      >
                        <TableCell className="text-sm font-medium">
                          {p._id?.slice(-8) || "N/A"}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-sm">
                          {p.booking?.package?.title || "N/A"}
                        </TableCell>
                        <TableCell className="text-sm">
                          {p.amount
                            ? `${p.amount} ${p.currency || ""}`
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                              p.status,
                            )}`}
                          >
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {p.createdAt
                            ? new Date(p.createdAt).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
