// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { api } from "@/lib/api"
// import { getStripe } from "@/lib/stripe"
// import { Loader2, AlertCircle } from "lucide-react"
// import { toast } from "sonner"

// interface PaymentButtonProps {
//   bookingId: string
//   amount: number
//   disabled?: boolean
// }

// export function PaymentButton({ bookingId, amount, disabled = false }: PaymentButtonProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()

//   const handlePayment = async () => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       // Create checkout session on backend
//       console.log("[v0] Creating checkout session for booking:", bookingId)
//       const response = await api.createCheckoutSession(bookingId)
//       console.log("[v0] Checkout session response:", response.data)

//       const sessionId = response.data.data?.sessionId || response.data.sessionId

//       if (!sessionId) {
//         throw new Error("No session ID received from backend")
//       }

//       // Get Stripe instance
//       const stripe = await getStripe()
//       if (!stripe) {
//         throw new Error("Failed to load Stripe")
//       }

//       // Redirect to Stripe checkout
//       console.log("[v0] Redirecting to Stripe with session ID:", sessionId)
//       const { error: stripeError } = await stripe.redirectToCheckout({
//         sessionId,
//       })

//       if (stripeError) {
//         throw new Error(stripeError.message || "Stripe redirect failed")
//       }
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Payment initialization failed"
//       console.error("[v0] Payment error:", errorMessage)
//       setError(errorMessage)
//       toast.error("Payment Error", {
//         description: errorMessage,
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-3">
//       {error && (
//         <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-start gap-2">
//           <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
//           <p>{error}</p>
//         </div>
//       )}
//       <Button onClick={handlePayment} disabled={isLoading || disabled} size="lg" className="w-full">
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 animate-spin" size={16} />
//             Processing...
//           </>
//         ) : (
//           `Pay Now (${amount})`
//         )}
//       </Button>
//     </div>
//   )
// }
