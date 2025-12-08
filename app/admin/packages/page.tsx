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
import { Trash2, Edit2, Plus, Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

  // fetch packages + packageTypes
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
    // packageType ইচ্ছাকৃতভাবে এখানে রাখব না; নিচে create case এ আলাদা করে add করব
  })

  const handleSave = async () => {
    try {
      if (editingId) {
        // update: packageType না পাঠাই, backend আগেরটাই রাখবে
        const payload = buildPayload()
        await api.updatePackage(editingId, payload)
      } else {
        // create: packageType সহ পাঠাই
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

      setFormData(emptyForm)
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
      const pkgs = Array.isArray(response.data)
        ? response.data
        : response.data.data || []
      dispatch(fetchPackagesSuccess(pkgs))
    } catch (err) {
      console.error("Failed to delete package:", err)
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
      // form এ দেখাই; কিন্তু update এ send করব না
      packageType: (pkg as any).packageType?.toString() || "",
      tags: Array.isArray(pkg.tags) ? pkg.tags.join(", ") : "",
      included: Array.isArray(pkg.included) ? pkg.included.join(", ") : "",
      excluded: Array.isArray(pkg.excluded) ? pkg.excluded.join(", ") : "",
      amenities: Array.isArray(pkg.amenities) ? pkg.amenities.join(", ") : "",
      itinerary: Array.isArray(pkg.itinerary)
        ? pkg.itinerary.join(", ")
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Packages Management</h1>
          <p className="text-muted-foreground">Manage travel packages</p>
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
            <Button className="gap-2">
              <Plus size={18} />
              Add Package
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Package" : "Create Package"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Summary</Label>
                <Input
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Destination</Label>
                <Input
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      destination: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cost From</Label>
                  <Input
                    type="number"
                    value={formData.costFrom}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        costFrom: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Input
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currency: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Duration (Days)</Label>
                  <Input
                    type="number"
                    value={formData.durationDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationDays: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Capacity</Label>
                  <Input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Departure Location</Label>
                  <Input
                    value={formData.departureLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departureLocation: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Arrival Location</Label>
                  <Input
                    value={formData.arrivalLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        arrivalLocation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Min Age</Label>
                  <Input
                    type="number"
                    value={formData.minAge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minAge: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Max Age</Label>
                  <Input
                    type="number"
                    value={formData.maxAge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxAge: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Included (comma separated)</Label>
                <Input
                  value={formData.included}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      included: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Excluded (comma separated)</Label>
                <Input
                  value={formData.excluded}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      excluded: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Amenities (comma separated)</Label>
                <Input
                  value={formData.amenities}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Itinerary (comma separated)</Label>
                <Input
                  value={formData.itinerary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      itinerary: e.target.value,
                    })
                  }
                />
              </div>

              {/* শুধু create এর জন্য ব্যবহার হবে; update এ payload এ যাবে না */}
              <div>
                <Label>Package Type</Label>
                <Select
                  value={formData.packageType}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      packageType: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map((t) => (
                      <SelectItem key={t._id} value={t._id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} className="w-full">
                {editingId ? "Update" : "Create"} Package
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardHeader className="flex items-center justify-between gap-4">
          <CardTitle>All Packages</CardTitle>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Filter by type
            </span>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
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
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : shownPackages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No packages found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Price (From)</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shownPackages.map((pkg) => (
                    <TableRow key={pkg._id}>
                      <TableCell className="font-medium">
                        {pkg.title}
                      </TableCell>
                      <TableCell>{pkg.destination}</TableCell>
                      <TableCell>
                        {pkg.costFrom} {pkg.currency}
                      </TableCell>
                      <TableCell>
                        {pkg.durationDays} days
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(pkg)}
                          className="gap-1"
                        >
                          <Edit2 size={14} />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleDelete(pkg._id)
                          }
                          className="gap-1"
                        >
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
