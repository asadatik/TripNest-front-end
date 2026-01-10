import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, stripePaymentIntentId } = await request.json()

    if (!paymentId) {
      return NextResponse.json({ error: "Missing payment ID" }, { status: 400 })
    }

    // Call your backend to verify and confirm the payment
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001/api"
    const response = await fetch(`${backendUrl}/payments/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.headers.get("authorization")?.split(" ")[1] || ""}`,
      },
      body: JSON.stringify({ paymentId, stripePaymentIntentId }),
    })

    if (!response.ok) {
      throw new Error("Failed to confirm payment")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    // console.error("Error confirming payment:", error)
    return NextResponse.json({ error: "Failed to confirm payment" }, { status: 500 })
  }
}
