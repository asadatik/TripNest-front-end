"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchPackagesStart,
  fetchPackagesSuccess,
  fetchPackagesError,
} from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import type { Package } from "@/lib/types"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Trash2, Edit2, Plus, Loader2, AlertCircle } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "framer-motion"
import Swal from "sweetalert2"

type PackageFormState = {
  title: string
  summary: string
  description: string
  destination: string
  costFrom: string
  currency: string
  durationDays: string
  capacity: string
  startDate: string
  endDate: string
  departureLocation: string
  arrivalLocation: string
  minAge: string
  maxAge: string
  tags: string
  included: string
  excluded: string
  amenities: string
  itinerary: string
  packageType: string
  images: string
}

type PackageTypeOption = {
  _id: string
  name: string
}

const emptyForm: PackageFormState = {
  title: "",
  summary: "",
  description: "",
  destination: "",
  costFrom: "",
  currency: "USD",
  durationDays: "",
  capacity: "",
  startDate: "",
  endDate: "",
  departureLocation: "",
  arrivalLocation: "",
  minAge: "",
  maxAge: "",
  tags: "",
  included: "",
  excluded: "",
  amenities: "",
  itinerary: "",
  packageType: "",
  images: "",
}

export default function AdminPackages() {
  const dispatch = useAppDispatch()
  const { items: packages, isLoading, error } = useAppSelector(
    (state) => state.packages,
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<PackageFormState>(emptyForm)
  const [packageTypes, setPackageTypes] = useState<PackageTypeOption[]>([])
  const [filterType, setFilterType] = useState<string>("all")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPackagesStart())
      try {
        const [packagesRes, typesRes] = await Promise.all([
          api.getPackages(),
          api.getPackageTypes(),
        ])

        const pkgs = Array.isArray(packagesRes.data)
          ? packagesRes.data
          : packagesRes.data.data || []
        dispatch(fetchPackagesSuccess(pkgs))

        const types = Array.isArray(typesRes.data)
          ? typesRes.data
          : typesRes.data.data || []
        setPackageTypes(types)
      } catch (err) {
        dispatch(
          fetchPackagesError(
            err instanceof Error ? err.message : "Failed to fetch packages",
          ),
        )
      }
    }

    if (packages.length === 0 || packageTypes.length === 0) {
      fetchData()
    }
  }, [dispatch, packages.length, packageTypes.length])

  const parseCommaList = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)

  const buildPayload = () => ({
    title: formData.title,
    summary: formData.summary,
    description: formData.description,
    destination: formData.destination,
    costFrom: formData.costFrom ? Number(formData.costFrom) : undefined,
    currency: formData.currency,
    durationDays: formData.durationDays
      ? Number(formData.durationDays)
      : undefined,
    capacity: formData.capacity ? Number(formData.capacity) : undefined,
    startDate: formData.startDate || undefined,
    endDate: formData.endDate || undefined,
    departureLocation: formData.departureLocation,
    arrivalLocation: formData.arrivalLocation,
    minAge: formData.minAge ? Number(formData.minAge) : undefined,
    maxAge: formData.maxAge ? Number(formData.maxAge) : undefined,
    tags: parseCommaList(formData.tags),
    included: parseCommaList(formData.included),
    excluded: parseCommaList(formData.excluded),
    amenities: parseCommaList(formData.amenities),
    itinerary: parseCommaList(formData.itinerary),
    images: parseCommaList(formData.images),
  })

  const handleSave = async () => {
    try {
      setIsSaving(true)
      if (editingId) {
        const payload = buildPayload()
        await api.updatePackage(editingId, payload)
      } else {
        const payload = {
          ...buildPayload(),
          packageType: formData.packageType || undefined,
        }
        await api.createPackage(payload)
      }

      const response = await api.getPackages()
      const pkgs = Array.isArray(response.data)
        ? response.data
        : response.data.data || []
      dispatch(fetchPackagesSuccess(pkgs))

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: editingId ? "Package updated successfully" : "Package created successfully",
        confirmButtonColor: "#00ddff",
        background: "#0f172a",
        color: "#f1f5f9",
        timer: 2000,
        timerProgressBar: true,
      })

      setFormData(emptyForm)
      setEditingId(null)
      setIsDialogOpen(false)
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.response?.data?.message || "Failed to save package",
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "#f1f5f9",
      })
      console.error("Failed to save package:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: "Delete Package",
      text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      background: "#0f172a",
      color: "#f1f5f9",
    })

    if (result.isConfirmed) {
      try {
        setIsSaving(true)
        await api.deletePackage(id)
        const response = await api.getPackages()
        const pkgs = Array.isArray(response.data)
          ? response.data
          : response.data.data || []
        dispatch(fetchPackagesSuccess(pkgs))

        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Package has been deleted successfully",
          confirmButtonColor: "#00ddff",
          background: "#0f172a",
          color: "#f1f5f9",
          timer: 2000,
          timerProgressBar: true,
        })
      } catch (err: any) {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.response?.data?.message || "Failed to delete package",
          confirmButtonColor: "#ef4444",
          background: "#0f172a",
          color: "#f1f5f9",
        })
        console.error("Failed to delete package:", err)
      } finally {
        setIsSaving(false)
      }
    }
  }

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg._id)
    setFormData({
      title: pkg.title || "",
      summary: pkg.summary || "",
      description: pkg.description || "",
      destination: pkg.destination || "",
      costFrom: pkg.costFrom?.toString() ?? "",
      currency: pkg.currency || "USD",
      durationDays: pkg.durationDays?.toString() ?? "",
      capacity: pkg.capacity?.toString() ?? "",
      startDate: pkg.startDate ? pkg.startDate.slice(0, 10) : "",
      endDate: pkg.endDate ? pkg.endDate.slice(0, 10) : "",
      departureLocation: pkg.departureLocation || "",
      arrivalLocation: pkg.arrivalLocation || "",
      minAge: pkg.minAge?.toString() ?? "",
      maxAge: pkg.maxAge?.toString() ?? "",
      packageType: (pkg as any).packageType?.toString() || "",
      tags: Array.isArray(pkg.tags) ? pkg.tags.join(", ") : "",
      included: Array.isArray(pkg.included) ? pkg.included.join(", ") : "",
      excluded: Array.isArray(pkg.excluded) ? pkg.excluded.join(", ") : "",
      amenities: Array.isArray(pkg.amenities) ? pkg.amenities.join(", ") : "",
      itinerary: Array.isArray(pkg.itinerary)
        ? pkg.itinerary.join(", ")
        : "",
      images: Array.isArray((pkg as any).images)
        ? (pkg as any).images.join(", ")
        : "",
    })
    setIsDialogOpen(true)
  }

  const shownPackages =
    filterType === "all"
      ? packages
      : packages.filter(
          (pkg) =>
            (pkg as any).packageType?.toString() === filterType,
        )

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00ddff] via-[#ff4edb] to-[#ff00aa] bg-clip-text text-transparent">
            Packages Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage travel packages and deals</p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) {
              setEditingId(null)
              setFormData(emptyForm)
            }
          }}
        >
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="rounded-xl gap-2  bg-gradient-to-r from-[#00ddff]/30 to-[#ff4edb]/30 border border-[#00ddff]/30 hover:from-[#00ddff]/40 hover:to-[#ff4edb]/40 text-black w-full sm:w-auto">
                <Plus size={18} />
                Add Package
              </Button>
            </motion.div>
          </DialogTrigger>

          <DialogContent className="max-h-[80vh] overflow-y-auto bg-card/95 border border-border/70 backdrop-blur rounded-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Package" : "Create Package"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label className="text-sm">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Summary</Label>
                <Input
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Destination</Label>
                <Input
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      destination: e.target.value,
                    })
                  }
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Cost From</Label>
                  <Input
                    type="number"
                    value={formData.costFrom}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        costFrom: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">Currency</Label>
                  <Input
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currency: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Duration (Days)</Label>
                  <Input
                    type="number"
                    value={formData.durationDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationDays: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">Capacity</Label>
                  <Input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">End Date</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Departure Location</Label>
                  <Input
                    value={formData.departureLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departureLocation: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">Arrival Location</Label>
                  <Input
                    value={formData.arrivalLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        arrivalLocation: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Min Age</Label>
                  <Input
                    type="number"
                    value={formData.minAge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minAge: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">Max Age</Label>
                  <Input
                    type="number"
                    value={formData.maxAge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxAge: e.target.value,
                      })
                    }
                    className="rounded-lg border-border/50 bg-background/50 mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value,
                    })
                  }
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Included (comma separated)</Label>
                <Input
                  value={formData.included}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      included: e.target.value,
                    })
                  }
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Excluded (comma separated)</Label>
                <Input
                  value={formData.excluded}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      excluded: e.target.value,
                    })
                  }
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Amenities (comma separated)</Label>
                <Input
                  value={formData.amenities}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: e.target.value,
                    })
                  }
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Itinerary (comma separated)</Label>
                <Input
                  value={formData.itinerary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      itinerary: e.target.value,
                    })
                  }
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Image URLs (comma separated)</Label>
                <Input
                  value={formData.images}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      images: e.target.value,
                    })
                  }
                  placeholder="https://..., https://..."
                  className="rounded-lg border-border/50 bg-background/50 mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Package Type</Label>
                <Select
                  value={formData.packageType}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      packageType: value,
                    })
                  }
                >
                  <SelectTrigger className="rounded-lg border-border/50 bg-background/50 mt-1">
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 border border-border/70">
                    {packageTypes.map((t) => (
                      <SelectItem key={t._id} value={t._id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full rounded-lg bg-gradient-to-r from-[#00ddff]/30 to-[#ff4edb]/30 border border-[#00ddff]/30 hover:from-[#00ddff]/40 hover:to-[#ff4edb]/40 text-black"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={14} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : editingId ? (
                  "Update Package"
                ) : (
                  "Create Package"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
            <p className="font-medium">Error loading packages</p>
            <p className="text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Packages Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border border-border/70 bg-card/90 backdrop-blur shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
          {/* Gradient Background */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#00ddff]/20 via-transparent to-[#ff4edb]/20 opacity-60" />

          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl">All Packages</CardTitle>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Filter by type
              </span>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="rounded-lg border-border/50 bg-background/50 w-full sm:w-[180px]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 border border-border/70">
                  <SelectItem value="all">All types</SelectItem>
                  {packageTypes.map((t) => (
                    <SelectItem key={t._id} value={t._id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                  <Loader2 size={40} className="text-[#00ddff]" />
                </motion.div>
              </div>
            ) : shownPackages.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                No packages found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead>Title</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shownPackages.map((pkg) => (
                      <motion.tr
                        key={pkg._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-border/50 hover:bg-background/30 transition-colors"
                      >
                        <TableCell className="font-medium text-foreground text-sm">
                          {pkg.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {pkg.destination}
                        </TableCell>
                        <TableCell className="text-sm">
                          {pkg.costFrom} {pkg.currency}
                        </TableCell>
                        <TableCell className="text-sm">
                          {pkg.durationDays}d
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2 flex-wrap">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(pkg)}
                                className="rounded-lg border-border/50 bg-background/50 hover:bg-background/80 gap-1 text-xs"
                              >
                                <Edit2 size={14} />
                                <span className="hidden sm:inline">Edit</span>
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  handleDelete(pkg._id, pkg.title)
                                }
                                className="rounded-lg bg-red-600/80 hover:bg-red-600 gap-1 text-xs"
                              >
                                <Trash2 size={14} />
                                <span className="hidden sm:inline">Delete</span>
                              </Button>
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