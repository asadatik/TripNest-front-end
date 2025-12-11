import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1"

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
  getBookingDetails: (bookingId: string) => apiClient.get(`/bookings/admin/${bookingId}`),

  updateBookingStatus: (bookingId: string, data: { status: string; paymentStatus?: string }) => apiClient.patch(`/bookings/status/${bookingId}`, data),


  // User - Bookings
  getUserBookings: () => apiClient.get("/bookings/me"),
  // createBooking: (packageId: string, data: object) => apiClient.post("/bookings/create", { packageId, ...data }),
  
           

createBooking: (data: { package: string; pax: number }) =>
  apiClient.post("/bookings/create", data),

  cancelBooking: (bookingId: string) => apiClient.patch(`/bookings/me/${bookingId}/cancel`, {}),

  // User - Profile
  getUserProfile: () => apiClient.get("/profile"),
  updateUserProfile: (data: object) => apiClient.patch("/profile", data),
  updateUserPassword: (data: object) => apiClient.patch("/password", data),

  // Payments

  // Admin - Payments
  getPayments: () => apiClient.get("/payments"),
  getPaymentDetails: (paymentId: string) => apiClient.get(`/payments/admin/${paymentId}`),

// stripe checkout session create
initStripeCheckout: (data: { bookingId: string }) =>
  apiClient.post("/payments/create", data),

 

  confirmStripePayment: (data: { sessionId: string }) =>
    apiClient.post("/payments/confirm", data),

}

export default apiClient
