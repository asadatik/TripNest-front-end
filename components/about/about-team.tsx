"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  { name: "ATIK RAHMAN", role: "Founder & CEO", image: "👨‍💼" },
  { name: "Michael Chen", role: "Head of Operations", image: "👩‍💼"  },
  { name: "Emily Rodriguez", role: "Travel Curator", image: "👩‍✈️" },
  { name: "David Kumar", role: "Customer Success", image: "👨‍💻" },
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

export function AboutTeam() {
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
            Meet Our Team
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Passionate travelers dedicated to making your journey extraordinary
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="overflow-hidden border-2 border-slate-200 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:border-cyan-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-cyan-400">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-5xl shadow-lg">
                      {member.image}
                    </div>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                    {member.role}
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
