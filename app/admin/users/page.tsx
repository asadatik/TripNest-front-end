"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersError,
  updateUserSuccess,
  updateUserStatusSuccess,
} from "@/redux/slices/usersSlice"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2, Loader2, AlertCircle, Lock, LockOpen } from "lucide-react"
import { motion } from "framer-motion"
import Swal from "sweetalert2"

type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED"

export default function AdminUsers() {
  const dispatch = useAppDispatch()
  const { users, isLoading, error } = useAppSelector((state) => state.users)
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRole, setNewRole] = useState<"USER" | "ADMIN">("USER")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersStart())
      try {
        const response = await api.getUsers()
        dispatch(fetchUsersSuccess(response.data.data || response.data))
        console.log("[v0] Users loaded:", response.data.data || response.data)
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch users"
        dispatch(fetchUsersError(errorMessage))
           
      }
    }

    if (users.length === 0) {
      fetchUsers()
    }
  }, [dispatch, users.length])

  const handleUpdateRole = async () => {
    if (!selectedUser) return

    try {
      setIsUpdating(true)
      const response = await api.updateUserRole(selectedUser._id, newRole)
      const updatedUser = { ...selectedUser, role: newRole }
      dispatch(updateUserSuccess(updatedUser))
      
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${selectedUser.name}'s role updated to ${newRole}`,
        confirmButtonColor: "#00ddff",
        background: "#0f172a",
        color: "#f1f5f9",
        confirmButtonText: "OK",
      })
      
      setIsDialogOpen(false)
      console.log("[v0] User role updated:", selectedUser._id)
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.response?.data?.message || "Failed to update user role",
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "#f1f5f9",
      })
      // console.error("[v0] Failed to update user:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleUpdateStatus = async (userId: string, userName: string, newStatus: UserStatus) => {
    const action = newStatus === "BLOCKED" ? "block" : "unblock"
    const actionTitle = newStatus === "BLOCKED" ? "Block User" : "Unblock User"

    const result = await Swal.fire({
      title: actionTitle,
      text: `Are you sure you want to ${action} ${userName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "BLOCKED" ? "#ef4444" : "#22c55e",
      cancelButtonColor: "#64748b",
      confirmButtonText: newStatus === "BLOCKED" ? "Yes, Block" : "Yes, Unblock",
      background: "#0f172a",
      color: "#f1f5f9",
    })

    if (result.isConfirmed) {
      try {
        setIsUpdating(true)
        const response = await api.updateUserStatus(userId, newStatus)
        const updatedUser = response.data.data || response.data
        dispatch(updateUserStatusSuccess(updatedUser))

        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: `${userName} has been ${action}ed successfully`,
          confirmButtonColor: "#00ddff",
          background: "#0f172a",
          color: "#f1f5f9",
          timer: 2000,
          timerProgressBar: true,
        })

        console.log("[v0] User status updated:", userId, "->", newStatus)
      } catch (err: any) {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.response?.data?.message || `Failed to ${action} user`,
          confirmButtonColor: "#ef4444",
          background: "#0f172a",
          color: "#f1f5f9",
        })
        // console.error("[v0] Failed to update user status:", err)
      } finally {
        setIsUpdating(false)
      }
    }
  }

  const getStatusBadgeClass = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "INACTIVE":
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
      case "BLOCKED":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "DELETED":
        return "bg-slate-500/20 text-slate-400 border border-slate-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  const getRoleBadgeClass = (role: string) => {
    return role === "ADMIN"
      ? "bg-[#00ddff]/20 text-[#00ddff] border border-[#00ddff]/30"
      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-transparent">
          Users Management
        </h1>
        <p className="text-muted-foreground mt-1">Manage user roles, permissions, and account status</p>
      </motion.div>

      {/* Error Alert */}
      {error && (
        <motion.div
          className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive flex items-start gap-3 backdrop-blur"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading users</p>
            <p className="text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Users Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border border-border/70 bg-card/90 backdrop-blur shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
          {/* Gradient Background */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#00ddff]/20 via-transparent to-[#ff4edb]/20 opacity-60" />

          <CardHeader>
            <CardTitle className="text-xl">All Users</CardTitle>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                  <Loader2 size={40} className="text-[#00ddff]" />
                </motion.div>
              </div>
            ) : users.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No users found</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-border/50 hover:bg-background/30 transition-colors"
                      >
                        <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeClass(user.role)}`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(user.status)}`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2 flex-wrap">
                            <Dialog open={isDialogOpen && selectedUser?._id === user._id} onOpenChange={setIsDialogOpen}>
                              <DialogTrigger asChild>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setNewRole(user.role)
                                    }}
                                    className="rounded-lg border-border/50 bg-background/50 hover:bg-background/80 gap-1 text-xs"
                                  >
                                    <Edit2 size={14} />
                                    Edit Role
                                  </Button>
                                </motion.div>
                              </DialogTrigger>
                              <DialogContent className="bg-card/95 border border-border/70 backdrop-blur">
                                <DialogHeader>
                                  <DialogTitle>Edit User Role</DialogTitle>
                                  <DialogDescription>Change the role for {user.name}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <Select value={newRole} onValueChange={(value) => setNewRole(value as "USER" | "ADMIN")}>
                                    <SelectTrigger className="rounded-lg border-border/50 bg-background/50">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card/95 border border-border/70">
                                      <SelectItem value="USER">User</SelectItem>
                                      <SelectItem value="ADMIN">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    onClick={handleUpdateRole}
                                    disabled={isUpdating}
                                    className="w-full  rounded-lg bg-gradient-to-r from-[#00ddff]/30 to-[#ff4edb]/30 border border-[#00ddff]/30 hover:from-[#00ddff]/40 hover:to-[#ff4edb]/40 text-black backdrop-blur transition-all duration-200"
                                  >
                                    {isUpdating ? (
                                      <>
                                        <Loader2 size={14} className="animate-spin mr-2" />
                                        Saving...
                                      </>
                                    ) : (
                                      "Save Changes"
                                    )}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              {user.status === "BLOCKED" ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUpdateStatus(user._id, user.name, "ACTIVE")}
                                  disabled={isUpdating}
                                  className="rounded-lg border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-400 gap-1 text-xs"
                                >
                                  <LockOpen size={14} />
                                  Unblock
                                </Button>
                              ) : (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleUpdateStatus(user._id, user.name, "BLOCKED")}
                                  disabled={isUpdating}
                                  className="rounded-lg bg-red-600/80 hover:bg-red-600 gap-1 text-xs"
                                >
                                  <Lock size={14} />
                                  Block
                                </Button>
                              )}
                            </motion.div>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}