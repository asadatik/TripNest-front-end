// src/app/not-found.tsx
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="min-h-[calc(100vh-theme(space.16))] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Page not found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Button onClick={() => router.push("/")}>Go Home</Button>
      </div>
    </div>
  )
}
