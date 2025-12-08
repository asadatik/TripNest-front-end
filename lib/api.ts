import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login"
      }
    }
    return Promise.reject(error)
  },
)

export const api = {
  // Auth endpoints
  login: (email: string, password: string) => apiClient.post("/auth/login", { email, password }),
  register: (name: string, email: string, password: string) =>
    apiClient.post("/user/register", { name, email, password }),
  logout: () => apiClient.post("/auth/logout", {}),
  getMe: () => apiClient.get("/user/me"), // Fetch current user from cookies

  // Packages endpoints
  getPackages: () => apiClient.get("/packages"),
  getPackageBySlug: (slug: string) => apiClient.get(`/packages/${slug}`),

  // Admin - Users
  getUsers: () => apiClient.get("/user/all-users"),
  updateUserRole: (userId: string, role: "USER" | "ADMIN") => apiClient.patch(`/user/${userId}`, { role }),
  deleteUser: (userId: string) => apiClient.delete(`/user/${userId}`),
  updateUserStatus: (userId: string, status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED") =>
    apiClient.patch(`/user/${userId}`, { status }),



  // Admin - Packages
  createPackage: (data: object) => apiClient.post("/packages/create", data),
  updatePackage: (packageId: string, data: object) => apiClient.patch(`/packages/${packageId}`, data),
  deletePackage: (packageId: string) => apiClient.delete(`/packages/${packageId}`),
  getPackageTypes: () => apiClient.get("/packages/types"),

  // Admin - Bookings
  getBookings: () => apiClient.get("/bookings"),
  getBookingDetails: (bookingId: string) => apiClient.get(`/bookings/${bookingId}`),
  updateBookingStatus: (bookingId: string, status: string) => apiClient.patch(`/bookings/${bookingId}`, { status }),

  // Admin - Payments
  getPayments: () => apiClient.get("/payment"),
  getPaymentDetails: (paymentId: string) => apiClient.get(`/payment/${paymentId}`),

  // User - Bookings
  getUserBookings: () => apiClient.get("/bookings/me"),
  createBooking: (packageId: string, data: object) => apiClient.post("/bookings/create", { packageId, ...data }),
  cancelBooking: (bookingId: string) => apiClient.patch(`/bookings/me/${bookingId}/cancel`, {}),

  // User - Profile
  getUserProfile: () => apiClient.get("/profile"),
  updateUserProfile: (data: object) => apiClient.patch("/profile", data),
  updateUserPassword: (data: object) => apiClient.patch("/password", data),

  // Payments
  createCheckoutSession: (bookingId: string) => apiClient.post("/payments/checkout", { bookingId }),
  verifyPayment: (paymentId: string, stripePaymentIntentId: string) =>
    apiClient.post("/payments/verify", { paymentId, stripePaymentIntentId }),
}

export default apiClient
