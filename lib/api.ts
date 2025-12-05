import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken")
        window.location.href = "/auth/login"
      }
    }
    return Promise.reject(error)
  },
)

export const api = {
  // Auth endpoints
  login: (email: string, password: string) => apiClient.post("/auth/login", { email, password }),
  register: (email: string, password: string, name: string) =>
    apiClient.post("/auth/register", { email, password, name }),

  // Packages endpoints
  getPackages: () => apiClient.get("/package"),
  getPackageBySlug: (slug: string) => apiClient.get(`/package/${slug}`),

  // Admin - Users
  getUsers: () => apiClient.get("/admin/users"),
  updateUserRole: (userId: string, role: "USER" | "ADMIN") => apiClient.patch(`/admin/users/${userId}`, { role }),
  deleteUser: (userId: string) => apiClient.delete(`/admin/users/${userId}`),

  // Admin - Packages
  createPackage: (data: { title: string; description: string; price: number; duration: string }) =>
    apiClient.post("/admin/packages", data),
  updatePackage: (packageId: string, data: { title: string; description: string; price: number; duration: string }) =>
    apiClient.patch(`/admin/packages/${packageId}`, data),
  deletePackage: (packageId: string) => apiClient.delete(`/admin/packages/${packageId}`),

  // Admin - Bookings
  getBookings: () => apiClient.get("/admin/bookings"),
  getBookingDetails: (bookingId: string) => apiClient.get(`/admin/bookings/${bookingId}`),
  updateBookingStatus: (bookingId: string, status: "PENDING" | "CONFIRMED" | "CANCELLED") =>
    apiClient.patch(`/admin/bookings/${bookingId}`, { status }),

  // Admin - Payments
  getPayments: () => apiClient.get("/admin/payments"),
  getPaymentDetails: (paymentId: string) => apiClient.get(`/admin/payments/${paymentId}`),

  // User - Bookings
  getUserBookings: () => apiClient.get("/user/bookings"),
  createBooking: (packageId: string, data: { startDate: string; endDate: string; guests: number }) =>
    apiClient.post("/user/bookings", { packageId, ...data }),
  cancelBooking: (bookingId: string) => apiClient.patch(`/user/bookings/${bookingId}/cancel`, {}),

  // User - Profile
  getUserProfile: () => apiClient.get("/user/profile"),
  updateUserProfile: (data: { name: string; email: string }) => apiClient.patch("/user/profile", data),
  updateUserPassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.patch("/user/password", data),

  // Payments
  createCheckoutSession: (bookingId: string) => apiClient.post("/payments/checkout-session", { bookingId }),
  verifyPayment: (paymentId: string, stripePaymentIntentId: string) =>
    apiClient.post("/payments/verify", { paymentId, stripePaymentIntentId }),
}

export default apiClient
