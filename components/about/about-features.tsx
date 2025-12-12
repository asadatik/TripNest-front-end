"use client"

import { motion } from "framer-motion"
import { Shield, Heart, Compass, Camera } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Trusted & Safe",
    description: "Your safety is our priority. All packages are carefully curated and verified.",
  },
  {
    icon: Heart,
    title: "Personalized Experience",
    description: "Customized itineraries tailored to your preferences and travel style.",
  },
  {
    icon: Compass,
    title: "Expert Guidance",
    description: "Local guides with deep knowledge ensure authentic experiences.",
  },
  {
    icon: Camera,
    title: "Unforgettable Memories",
    description: "Create lasting memories with perfectly planned adventures.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function AboutFeatures() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            Why Choose Us
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full overflow-hidden border-2 border-slate-200 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:border-cyan-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-cyan-400">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-lg">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
