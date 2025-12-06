import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Providers from "@/components/Providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TripNest - Travel Packages",
  description: "Discover amazing travel packages and create unforgettable memories",
  generator: "Next.js",
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  keywords: ["Travel", "Packages", "TripNest", "Vacation", "Holidays"],
 
  icons
: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
