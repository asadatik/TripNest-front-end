export interface User {
  id: string
  email: string
  name: string
  role?: "USER" | "ADMIN"
}

export interface Package {
  _id: string
  title: string
  summary: string
  description: string
  images: string[]
  destination: string
  costFrom: number
  currency: string
  durationDays: number
  capacity: number
  availableSeats: number
  startDate: string
  endDate: string
  departureLocation: string
  arrivalLocation: string
  included: string[]
  excluded: string[]
  amenities: string[]
  itinerary: string[]
  minAge: number
  maxAge: number
  division: string
  packageType: string
  tags: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  slug: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface Booking {
  id: string
  userId: string
  packageId: string
  packageTitle: string
  userName: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
  createdAt: string
  totalPrice: number
}

export interface Payment {
  id: string
  bookingId: string
  userId: string
  amount: number
  status: "UNPAID" | "PAID" | "REFUNDED" | "FAILED"
  stripePaymentId?: string
  createdAt: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: "USER" | "ADMIN"
  createdAt: string
}
