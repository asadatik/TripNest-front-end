import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { bookingId, amount } = await request.json()

    if (!bookingId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Call your backend to create a Stripe checkout session
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1"
    const response = await fetch(`${backendUrl}/payments/checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.headers.get("authorization")?.split(" ")[1] || ""}`,
      },
      body: JSON.stringify({ bookingId, amount }),
    })

    if (!response.ok) {
      throw new Error("Failed to create checkout session")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    // console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
