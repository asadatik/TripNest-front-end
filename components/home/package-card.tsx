// "use client"

// import Link from "next/link"
// import { m } from "framer-motion"
// import { Plane, Clock, MapPin, ArrowRight, Star } from "lucide-react"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import type { Package } from "./featured-packages"

// interface PackageCardProps {
//   pkg: Package
// }

// export default function PackageCard({ pkg }: PackageCardProps) {
//   return (
//     <m.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
//       <Card className="group relative h-full overflow-hidden border-2 border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/20 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-cyan-400 dark:hover:shadow-cyan-400/20">

//         {/* Gradient overlay */}
//         <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//         {/* Featured Badge */}
//         <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
//           <Star className="h-3 w-3 fill-white" />
//           Featured
//         </div>

//         {/* Header */}
//         <CardHeader className="space-y-4 pb-4">
//           <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
//             <Plane className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
//             <span>{pkg.destination || "Destination"}</span>
//           </div>

//           <CardTitle className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400 line-clamp-2">
//             {pkg.title || "Trip package"}
//           </CardTitle>

//           {pkg.summary && (
//             <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
//               {pkg.summary}
//             </p>
//           )}
//         </CardHeader>

//         {/* Content */}
//         <CardContent className="space-y-5 pb-6">
//           <div className="flex flex-wrap gap-2">
//             <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium dark:border-slate-700 dark:bg-slate-800">
//               <MapPin className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
//               <span>{pkg.destination || "Flexible"}</span>
//             </div>
//             <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium dark:border-slate-700 dark:bg-slate-800">
//               <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
//               <span>{pkg.durationDays ? `${pkg.durationDays} days` : "Flexible"}</span>
//             </div>
//           </div>

//           <div className="flex items-end justify-between">
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                 Starting from
//               </p>
//               <p className="mt-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
//                 {pkg.costFrom ? `$${pkg.costFrom}` : "Contact"}
//               </p>
//               {pkg.currency && (
//                 <p className="text-xs text-slate-600 dark:text-slate-400">{pkg.currency}</p>
//               )}
//             </div>

//             <Link href={`/packages/${pkg.slug}`}>
//               <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Button className="rounded-xl bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40">
//                   <span className="flex items-center gap-1.5">
//                     View
//                     <ArrowRight className="h-4 w-4" />
//                   </span>
//                 </Button>
//               </m.div>
//             </Link>
//           </div>
//         </CardContent>

//         {/* Hover glow */}
//         <m.div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-0 blur-xl transition-opacity group-hover:opacity-20" />
//       </Card>
//     </m.div>
//   )
// }
