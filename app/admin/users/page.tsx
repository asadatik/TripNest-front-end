"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersError,
  updateUserSuccess,
  deleteUserSuccess,
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
import { Trash2, Edit2, Loader2, AlertCircle } from "lucide-react"

export default function AdminUsers() {
  const dispatch = useAppDispatch()
  const { users = [], isLoading, error } = useAppSelector((state) => state.users)
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRole, setNewRole] = useState<"USER" | "ADMIN">("USER")

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersStart())
      try {
        const response = await api.getUsers()
        dispatch(fetchUsersSuccess(response.data.data)) // <-- backend response: data array
        console.log("🚨Users loaded:", response.data.data)
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch users"
        dispatch(fetchUsersError(errorMessage))
        console.error("🚨Error fetching users:", errorMessage)
      }
    }

    if (users.length === 0) {
      fetchUsers()
    }
  }, [dispatch, users.length])

  // Update user role
  const handleUpdateRole = async () => {
    if (!selectedUser) return
    try {
      await api.updateUserRole(selectedUser.id, newRole) // <- make sure _id matches backend
      const updatedUser = { ...selectedUser, role: newRole }
      dispatch(updateUserSuccess(updatedUser))
      setIsDialogOpen(false)
      console.log("🚨User role updated:", selectedUser.id)
    } catch (err) {
      console.error("🚨Failed to update user:", err)
    }
  }

  // Delete user
  const handleDelete = async (_id: string) => {
    try {
      await api.deleteUser(_id)
      dispatch(deleteUserSuccess(_id))
      console.log("🚨User deleted:", _id)
    } catch (err) {
      console.error("🚨Failed to delete user:", err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-start gap-2">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Error loading users</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : users.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No users found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            user.role === "ADMIN" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog open={isDialogOpen && selectedUser?.email === user.email} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user)
                                setNewRole(user.role)
                                setIsDialogOpen(true)
                              }}
                              className="gap-1"
                            >
                              <Edit2 size={14} />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User Role</DialogTitle>
                              <DialogDescription>Change the role for {user.name}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Select value={newRole} onValueChange={(value) => setNewRole(value as "USER" | "ADMIN")}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USER">User</SelectItem>
                                  <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button onClick={handleUpdateRole} className="w-full">
                                Save Changes
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(user.email)} className="gap-1">
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
