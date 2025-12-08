"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PackageType {
  _id: string
  name: string
}

interface PackageTypeSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function PackageTypeSelect({
  value,
  onChange,
  placeholder = "Select package type",
}: PackageTypeSelectProps) {
  const [types, setTypes] = useState<PackageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTypes = async () => {
      setIsLoading(true)
      try {
        const response = await api.getPackageTypes()
        setTypes(Array.isArray(response.data) ? response.data : response.data.data || [])
      } catch (err) {
        setError("Failed to load package types")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTypes()
  }, [])

  if (error) {
    return <div className="text-sm text-destructive">{error}</div>
  }

  return (
    <Select value={value} onValueChange={onChange} disabled={isLoading}>
      <SelectTrigger>
        <SelectValue placeholder={isLoading ? "Loading..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {types.map((type) => (
          <SelectItem key={type._id} value={type._id}>
            {type.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
