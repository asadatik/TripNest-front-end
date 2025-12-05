"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchPackagesStart, fetchPackagesSuccess, fetchPackagesError } from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import type { Package } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Trash2, Edit2, Plus, Loader2 } from "lucide-react"

export default function AdminPackages() {
  const dispatch = useAppDispatch()
  const { items: packages, isLoading, error } = useAppSelector((state) => state.packages)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    costFrom: "",
    currency: "USD",
    durationDays: "",
    destination: "",
    departureLocation: "",
    arrivalLocation: "",
  })

  useEffect(() => {
    const fetchPackages = async () => {
      dispatch(fetchPackagesStart())
      try {
        const response = await api.getPackages()
        const packages = Array.isArray(response.data) ? response.data : response.data.data || []
        dispatch(fetchPackagesSuccess(packages))
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
      const packageData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.costFrom),
        duration: formData.durationDays,
      }
      if (editingId) {
        await api.updatePackage(editingId, packageData)
      } else {
        await api.createPackage(packageData)
      }
      // Refresh packages list
      const response = await api.getPackages()
      const packages = Array.isArray(response.data) ? response.data : response.data.data || []
      dispatch(fetchPackagesSuccess(packages))

      setFormData({
        title: "",
        summary: "",
        description: "",
        costFrom: "",
        currency: "USD",
        durationDays: "",
        destination: "",
        departureLocation: "",
        arrivalLocation: "",
      })
      setEditingId(null)
      setIsDialogOpen(false)
    } catch (err) {
      console.error("Failed to save package:", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.deletePackage(id)
      const response = await api.getPackages()
      const packages = Array.isArray(response.data) ? response.data : response.data.data || []
      dispatch(fetchPackagesSuccess(packages))
    } catch (err) {
      console.error("Failed to delete package:", err)
    }
  }

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg._id)
    setFormData({
      title: pkg.title,
      summary: pkg.summary,
      description: pkg.description,
      costFrom: pkg.costFrom.toString(),
      currency: pkg.currency,
      durationDays: pkg.durationDays.toString(),
      destination: pkg.destination,
      departureLocation: pkg.departureLocation,
      arrivalLocation: pkg.arrivalLocation,
    })
    setIsDialogOpen(true)
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
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Package" : "Create Package"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <Label>Summary</Label>
                <Input
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cost From</Label>
                  <Input
                    type="number"
                    value={formData.costFrom}
                    onChange={(e) => setFormData({ ...formData, costFrom: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Input
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Duration (Days)</Label>
                <Input
                  type="number"
                  value={formData.durationDays}
                  onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
                />
              </div>
              <div>
                <Label>Destination</Label>
                <Input
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>
              <div>
                <Label>Departure Location</Label>
                <Input
                  value={formData.departureLocation}
                  onChange={(e) => setFormData({ ...formData, departureLocation: e.target.value })}
                />
              </div>
              <div>
                <Label>Arrival Location</Label>
                <Input
                  value={formData.arrivalLocation}
                  onChange={(e) => setFormData({ ...formData, arrivalLocation: e.target.value })}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingId ? "Update" : "Create"} Package
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
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : packages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No packages found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Price (From)</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg._id}>
                      <TableCell className="font-medium">{pkg.title}</TableCell>
                      <TableCell>{pkg.destination}</TableCell>
                      <TableCell>
                        {pkg.costFrom} {pkg.currency}
                      </TableCell>
                      <TableCell>{pkg.durationDays} days</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(pkg)} className="gap-1">
                          <Edit2 size={14} />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(pkg._id)} className="gap-1">
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
