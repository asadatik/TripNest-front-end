import { Suspense } from "react"
import PaymentSuccessClient from "./payment-success-client"


export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-transparent" />
            <p>Confirming your payment...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  )
}
