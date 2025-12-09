"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { registerUser } from "@/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.auth)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState("")


  const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return
    }

    const result = await dispatch(registerUser({ name, email, password }))

    if (result.meta.requestStatus === "fulfilled") {
      setSuccessMessage("Account created successfully! Redirecting to login...")
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    }
  }

  return (
    <div className="min-h-[calc(100vh-theme(space.16))] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join TripNest to explore amazing travel packages</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2 text-destructive">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-start gap-2 text-green-700">
              <CheckCircle size={16} className="mt-0.5 shrink-0" />
              <span className="text-sm">{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium mb-2 block">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>





       {/*  */}
  <div className=" relative      ">  
      <label htmlFor="password" className="text-sm font-medium mb-2 block">
        Password
      </label>

      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading}
        className="pr-10"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-[50px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        tabIndex={-1}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>

{/* confirm password */}
            <div className="relative"  >
              <label htmlFor="confirmPassword" className="text-sm font-medium mb-2 block">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
        type={ showConfirmPassword ? "text" : "password"}
                
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
 <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-3 top-[50px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        tabIndex={-1}
      >
        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>



              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive mt-1">Passwords do not match</p>
              )}
             
  
            </div>



            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
