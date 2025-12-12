"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  )
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
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card/90 p-6 text-center shadow-[0_18px_60px_rgba(0,0,0,0.6)] backdrop-blur">
        <h1 className="mb-2 text-2xl font-bold">
          {status === "success" ? "Payment Successful" : "Something went wrong"}
        </h1>
        <p className="mb-4 text-sm text-muted-foreground">{message}</p>
        <Button
          className="rounded-full bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa]"
          onClick={() => router.push("/user/my-payments")}
        >
          My Payment History
        </Button>
      </div>
    </div>
  )
}
