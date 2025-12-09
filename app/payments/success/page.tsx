"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const confirm = async () => {
      if (!sessionId) {
        setStatus("error")
        setMessage("Missing session_id in URL")
        return
      }

      try {
        await api.confirmStripePayment({ sessionId })
        setStatus("success")
        setMessage("Payment successful and booking updated!")
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Failed to confirm payment"
        setStatus("error")
        setMessage(msg)
      }
    }

    confirm()
  }, [sessionId])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg border max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">
          {status === "success" ? "Payment Successful" : "Something went wrong"}
        </h1>
        <p className="text-muted-foreground mb-4">{message}</p>
        <Button onClick={() => router.push("/user/bookings")}>
          Go to My Bookings
        </Button>
      </div>
    </div>
  )
}
