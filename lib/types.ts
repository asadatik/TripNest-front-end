export interface User {
  _id: string
  name: string
  email: string
  role: "USER" | "ADMIN"
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED"
  isVerified: boolean
  isDeleted: boolean
  auths: Array<{
    provider: string
    providerId: string
  }>
  bookings: string[]
  reviews: string[]
  wishlist: string[]
  createdAt: string
  updatedAt: string
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
  _id: string
  member: {
    _id: string
    name: string
    email: string
  }
  package: {
    _id: string
    title: string
    slug: string
  }
  pax: number
  totalAmount: number
  currency: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
  paymentStatus: "UNPAID" | "PAID" | "REFUNDED" | "FAILED"
  notes?: string
  createdAt: string
  updatedAt: string
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
