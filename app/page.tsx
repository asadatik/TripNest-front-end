"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Compass, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-theme(space.16))]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Explore the World with <span className="text-primary">TripNest</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Discover amazing travel packages tailored to your dreams. From exotic beaches to mountain adventures, we
            have something for everyone.
          </p>
          <Link href="/packages">
            <Button size="lg" className="gap-2">
              <Compass size={20} />
              Explore Packages
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose TripNest?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Curated Destinations",
                description: "Hand-picked locations around the world",
              },
              {
                icon: Users,
                title: "Group Travel",
                description: "Travel with friends and create lasting memories",
              },
              {
                icon: Compass,
                title: "Expert Guides",
                description: "Local experts to guide your journey",
              },
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <feature.icon size={32} className="text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="mb-6 text-primary-foreground/90">
            Browse our collection of travel packages and find your next destination.
          </p>
          <Link href="/packages">
            <Button variant="secondary" size="lg">
              View All Packages
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
