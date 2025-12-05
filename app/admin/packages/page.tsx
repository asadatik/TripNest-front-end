"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchPackagesStart, fetchPackagesSuccess, fetchPackagesError } from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Trash2, Edit2, Plus } from "lucide-react"
import { Pointer as Spinner } from "lucide-react"

export default function AdminPackages() {
  const dispatch = useAppDispatch()
  const { items: packages, isLoading, error } = useAppSelector((state) => state.packages)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ title: "", description: "", price: "", duration: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      dispatch(fetchPackagesStart())
      try {
        const response = await api.getPackages()
        dispatch(fetchPackagesSuccess(response.data))
      } catch (err) {
        dispatch(fetchPackagesError(err instanceof Error ? err.message : "Failed to fetch packages"))
      }
    }

    if (packages.length === 0) {
      fetchPackages()
    }
  }, [dispatch, packages.length])

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing package
      } else {
        // Create new package
      }
      setFormData({ title: "", description: "", price: "", duration: "" })
      setEditingId(null)
      setIsDialogOpen(false)
    } catch (err) {
      console.error("Failed to save package:", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      // Delete package
    } catch (err) {
      console.error("Failed to delete package:", err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Packages Management</h1>
          <p className="text-muted-foreground">Manage travel packages</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={18} />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Package" : "Create Package"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                Save Package
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">{error}</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner className="animate-spin" size={32} />
            </div>
          ) : packages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No packages found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.title}</TableCell>
                      <TableCell>${pkg.price}</TableCell>
                      <TableCell>{pkg.duration || "N/A"}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingId(pkg.id)
                            setFormData({
                              title: pkg.title,
                              description: pkg.description,
                              price: pkg.price.toString(),
                              duration: pkg.duration || "",
                            })
                            setIsDialogOpen(true)
                          }}
                          className="gap-1"
                        >
                          <Edit2 size={14} />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(pkg.id)} className="gap-1">
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
