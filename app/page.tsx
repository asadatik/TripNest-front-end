import Hero from "@/components/home/hero"
import FeaturedPackages from "@/components/home/featured-packages"
import { api } from "@/lib/api"
import HowItWorks from "@/components/home/how-it-works"
import WhyTripnest from "@/components/home/why-tripnest"
import Testimonials from "@/components/home/testimonials"
import FinalCta from "@/components/home/final-cta"

async function fetchInitialPackages() {
  try {
    const res = await api.getPackages({ page: 1, limit: 6 })
    return res.data?.data ?? []
  } catch (error) {
    console.error("packages fetch fail", error)
    return []
  }
}

export default async function HomePage() {
  const initialPackages = await fetchInitialPackages()

  // Latest package 
  const featuredPackage =
    initialPackages.length > 0
      ? initialPackages[initialPackages.length - 1] 
      : null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero featuredPkg={featuredPackage} />
      <FeaturedPackages initialData={initialPackages} />
      <HowItWorks />
      <WhyTripnest />
      <Testimonials />
      <FinalCta />
    </main>
  )
}
