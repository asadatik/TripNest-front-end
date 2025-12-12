"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ShieldCheck, User as UserIcon, Phone, MapPin, Image, Lock, User, EyeOff, Eye } from "lucide-react"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { api } from "@/lib/api"
// optional: jodi authSlice e updateUser thake
// import { updateUser } from "@/redux/slices/authSlice"

export default function UserProfile() {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)


  const [showCurrent, setShowCurrent] = useState(false)
const [showNew, setShowNew] = useState(false)
const [showConfirm, setShowConfirm] = useState(false)
  

console.log(user , 'tyyytrhyyhyh')

  const [formData, setFormData] = useState({
    name: user?.name || "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const initials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "U"

  const memberSince =
    user?.createdAt || user?._id
      ? new Date(user.createdAt || user._id).toLocaleDateString()
      : "N/A"

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">No user information found.</p>
      </div>
    )
  }

  const handleProfileSave = async () => {
    try {
      setIsSaving(true)

      await api.updateUserProfile(user._id, {
        name: formData.name || undefined,
  
      })

      // optional: jodi auth slice e updateUser ase
      // dispatch(updateUser({ ...user, ...formData }))

      setIsEditing(false)

      await Swal.fire({
        icon: "success",
        title: "Profile updated",
        text: "Your profile information has been saved successfully.",
        confirmButtonColor: "#00ddff",
        background: "#0f172a",
        color: "#f1f5f9",
        timer: 2000,
        timerProgressBar: true,
      })
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update profile"

      await Swal.fire({
        icon: "error",
        title: "Update failed",
        text: msg,
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "#f1f5f9",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordUpdate = async () => {
    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
      await Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in all password fields.",
        confirmButtonColor: "#f97316",
        background: "#0f172a",
        color: "#f1f5f9",
      })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      await Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "New password and confirm password do not match.",
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "#f1f5f9",
      })
      return
    }

    try {
      setIsPasswordSaving(true)

      await api.updateUserPassword(user._id, {
        password: passwordForm.newPassword,
      })

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      await Swal.fire({
        icon: "success",
        title: "Password updated",
        text: "Your password has been updated successfully.",
        confirmButtonColor: "#00ddff",
        background: "#0f172a",
        color: "#f1f5f9",
        timer: 2000,
        timerProgressBar: true,
      })
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update password"

      await Swal.fire({
        icon: "error",
        title: "Update failed",
        text: msg,
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "#f1f5f9",
      })
    } finally {
      setIsPasswordSaving(false)
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Your Profile
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your personal details and account security
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure account • Encrypted data</span>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Left column: profile + security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-6"
        >
          {/* Personal Info */}
          <Card className="border border-border/70 bg-card/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-gradient-to-br from-[#00ddff] to-[#ff4edb] text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>
                  Update your profile details (email is managed by admin)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="mt-1 flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    disabled={!isEditing || isSaving}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-0"
                  />
                </div>
              </div>

           

             


              <div className="flex flex-wrap gap-2 pt-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} size="sm">
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleProfileSave}
                      size="sm"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isSaving}
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          name: user.name || "",
                  
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security / Password */}
       <Card className="border border-border/70 bg-card/90 backdrop-blur">
  <CardHeader>
    <div className="flex items-center gap-2">
      <Lock className="h-4 w-4 text-muted-foreground" />
      <div>
        <CardTitle className="text-lg">Security</CardTitle>
        <CardDescription>Update your password</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="grid gap-4 md:grid-cols-2">
      {/* Current password */}
      <div>
        <Label htmlFor="currentPassword" className="text-sm font-medium">
          Current Password
        </Label>
        <div className="mt-1 relative">
          <Input
            id="currentPassword"
            type={showCurrent ? "text" : "password"}
            autoComplete="current-password"
            className="pr-10"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            tabIndex={-1}
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* New password */}
      <div>
        <Label htmlFor="newPassword" className="text-sm font-medium">
          New Password
        </Label>
        <div className="mt-1 relative">
          <Input
            id="newPassword"
            type={showNew ? "text" : "password"}
            autoComplete="new-password"
            className="pr-10"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                newPassword: e.target.value,
              })
            }
          />
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            tabIndex={-1}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </div>

    {/* Confirm */}
    <div>
      <Label htmlFor="confirmPassword" className="text-sm font-medium">
        Confirm Password
      </Label>
      <div className="mt-1 relative">
        <Input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          autoComplete="new-password"
          className="pr-10"
          value={passwordForm.confirmPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              confirmPassword: e.target.value,
            })
          }
        />
        <button
          type="button"
          onClick={() => setShowConfirm((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          tabIndex={-1}
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>

    <Button
      size="sm"
      onClick={handlePasswordUpdate}
      disabled={isPasswordSaving}
    >
      {isPasswordSaving ? "Updating..." : "Update Password"}
    </Button>
  </CardContent>
</Card>

        </motion.div>

        {/* Right column: account info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="space-y-4"
        >
          <Card className="border border-border/70 bg-card/90 backdrop-blur">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Read-only details about your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium truncate max-w-[180px] text-right">
                  {user.email}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">{memberSince}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Account Status</span>
                <span className="font-medium text-emerald-400">Active</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium capitalize">
                  {user.role?.toLowerCase() || "user"}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
