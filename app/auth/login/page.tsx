import { Suspense } from "react"
import LoginForm from "./LoginForm"

export default function LoginPage() {
  return (
    <div>
      <Suspense fallback={<div className="text-center py-20">Loading login...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
