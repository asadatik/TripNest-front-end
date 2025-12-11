import Hero from "@/components/home/hero"
import FeaturedPackages from "@/components/home/featured-packages"
import HowItWorks from "@/components/home/how-it-works"
import WhyTripnest from "@/components/home/why-tripnest"
import Testimonials from "@/components/home/testimonials"
import FinalCta from "@/components/home/final-cta"


export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <FeaturedPackages />
      <HowItWorks />
      <WhyTripnest />
      <Testimonials />
      <FinalCta />
    </main>
  )
}
