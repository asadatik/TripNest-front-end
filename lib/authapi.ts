import axios from "axios"
import type { User } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1"

const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },

    withCredentials: true,        


})

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
}

interface LoginRawResponse {
  statusCode: number
  success: boolean
  message: string
  data: {
    accessToken: string
    refreshToken: string
    user: User
  }
}

interface RegisterRawResponse {
  message: string
  user: User
}

interface AuthApiResponse<T> {
  user: User
  token?: string
  raw: T
}

export const authApi = {
  /**
   * Login request - matches exact backend /auth/login response
   */
  loginRequest: async (payload: LoginPayload): Promise<AuthApiResponse<LoginRawResponse>> => {
    try {
      const response = await authClient.post<LoginRawResponse>("/auth/login", payload)
      const { data } = response.data

      return {
        user: data.user,
        token: data.accessToken,
        raw: response.data,
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(error.response.data.message || "Login failed")
      }
      throw error
    }
  },

  /**
   * Register request - matches exact backend /user/register response
   */
  registerRequest: async (payload: RegisterPayload): Promise<AuthApiResponse<RegisterRawResponse>> => {
    try {
      const response = await authClient.post<RegisterRawResponse>("/user/register", payload)
      const { user } = response.data

      return {
        user,
        raw: response.data,
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(error.response.data.message || "Registration failed")
      }
      throw error
    }
  },
}

export default authApi
