"use client"

import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchPackagesStart,
  fetchPackagesSuccess,
  fetchPackagesError,
} from "@/redux/slices/packagesSlice"
import { api } from "@/lib/api"
import PackageCard from "@/components/PackageCard"
import { Loader2, AlertCircle, X, Filter, SlidersHorizontal, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function PackagesPage() {
  const dispatch = useAppDispatch()

  const {
    items: rawItems,
    meta,
    isLoading,
    error,
  } = useAppSelector(
    (state) =>
      state.packages ?? {
        items: [],
        meta: null,
        isLoading: false,
        error: null,
      },
  )

  // items সবসময় array হিসেবে force করা
  const items = Array.isArray(rawItems) ? rawItems : []

  const [packageTypes, setPackageTypes] = useState<any[]>([])
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const limit = 10

  // Debug
  console.log("PackagesPage: items length", items.length)
  console.log("PackagesPage: packageTypes", packageTypes)
  console.log("PackagesPage: meta", meta, "local page state", page)

  // Fetch packages + types
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchPackagesStart())

        const [packagesRes, typesRes] = await Promise.all([
          api.getPackages({ page, limit }), // backend → { meta, data }
          api.getPackageTypes(),
        ])

        dispatch(
          fetchPackagesSuccess({
            data: packagesRes.data.data || [],
            meta: packagesRes.data.meta,
          }),
        )

        const types = Array.isArray(typesRes.data)
          ? typesRes.data
          : typesRes.data.data || []
        setPackageTypes(types)
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message ||
          (err instanceof Error ? err.message : "Failed to fetch packages")
        dispatch(fetchPackagesError(errorMessage))
        console.error("🚨 Error fetching packages:", errorMessage)
      }
    }

    fetchData()
  }, [dispatch, page, limit])

  // Filtered packages (current page এর ভিতরে)
  const filteredPackages = useMemo(() => {
    return items.filter((pkg) => {
      const matchesType = !selectedTypeId || pkg.packageType === selectedTypeId

      const text = `${pkg.title} ${pkg.destination}`.toLowerCase()
      const matchesSearch = text.includes(searchTerm.toLowerCase())

      return matchesType && matchesSearch
    })
  }, [items, selectedTypeId, searchTerm])

  // Pagination helpers
  const currentPage = meta?.page ?? page
  const totalPages = meta?.totalPage ?? 1
  const totalItems = meta?.total ?? filteredPackages.length
  const startIndex = (totalItems === 0 ? 0 : (currentPage - 1) * limit + 1)
  const endIndex = Math.min(currentPage * limit, totalItems)

  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-[calc(100vh-theme(space.16))] bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 lg:py-16">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute right-0 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-0 top-60 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg shadow-cyan-500/10 backdrop-blur-sm dark:border-cyan-400/30 dark:from-cyan-400/10 dark:via-blue-400/10 dark:to-purple-400/10 dark:text-cyan-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                </motion.div>
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
                  Explore Our Collection
                </span>
              </motion.div>

              <h1 className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-white dark:via-slate-100 dark:to-white md:text-5xl">
                Travel Packages
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 md:text-lg">
                Choose from our collection of{" "}
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  {totalItems} amazing
                </span>{" "}
                travel packages
              </p>
            </div>

            {/* Search Bar */}
            <motion.div
              className="w-full md:w-auto md:min-w-[320px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder=" 🔍 Search by title, destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border-2 bg-white/80 py-3.5 md:px-4 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-lg backdrop-blur-sm transition-all border-cyan-500 outline-none ring-4 ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400"
                />
                {searchTerm && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-200 p-1 text-slate-600 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-6 overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-5 shadow-lg dark:border-red-900 dark:from-red-950/50 dark:to-pink-950/50"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-900 dark:text-red-100">
                      Error loading packages
                    </p>
                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                      {error}
                    </p>
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                      Make sure backend is running at http://localhost:5000
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Package Type Filters */}
          {packageTypes.length > 0 && (
            <motion.div
              className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-lg backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                    <Filter className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Filter by Type
                  </p>
                </div>
                {selectedTypeId && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSelectedTypeId(null)}
                    className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-3 w-3" />
                    Clear filter
                  </motion.button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <motion.button
                  onClick={() => setSelectedTypeId(null)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    !selectedTypeId
                      ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30"
                      : "border-2 border-slate-200 bg-white text-slate-700 hover:border-cyan-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:bg-slate-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All Packages ({totalItems})
                </motion.button>
                {packageTypes.map((t) => {
                  const count = items.filter(
                    (pkg) =>
                      pkg.packageType && String(pkg.packageType) === String(t._id),
                  ).length

                  return (
                    <motion.button
                      key={t._id}
                      onClick={() => setSelectedTypeId(t._id)}
                      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                        selectedTypeId === t._id
                          ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30"
                          : "border-2 border-slate-200 bg-white text-slate-700 hover:border-cyan-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:bg-slate-800"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t.name} ( {count} )
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 text-cyan-500" />
            </motion.div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Loading amazing packages...
            </p>
          </motion.div>
        ) : filteredPackages.length > 0 ? (
          <>
            {/* Results + pagination info */}
            <motion.div
              className="mb-6 flex flex-col gap-2 items-start justify-between sm:flex-row sm:items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Showing{" "}
                <span className="font-bold text-cyan-600 dark:text-cyan-400">
                  {startIndex}-{endIndex}
                </span>{" "}
                of{" "}
                <span className="font-bold text-cyan-600 dark:text-cyan-400">
                  {totalItems}
                </span>{" "}
                packages
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentPage <= 1}
                  className="rounded-full bg-linear-to-r from-cyan-500 via-blue-500 to-purple-400 border px-3 py-1 text-xs font-medium text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
                >
                  Prev
                </button>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-200">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage >= totalPages}
                  className="rounded-full border px-3 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-400 py-1 text-xs font-medium text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
                >
                  Next
                </button>
              </div>
            </motion.div>

            {/* Package Grid */}
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {filteredPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg._id}
                    variants={itemVariants}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <PackageCard package={pkg} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white/80 py-20 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              <SlidersHorizontal className="h-10 w-10 text-slate-400" />
            </div>
            <div className="text-center">
              <p className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                No packages found
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Try adjusting your filters or search term
              </p>
            </div>
            {(selectedTypeId || searchTerm) && (
              <motion.button
                onClick={() => {
                  setSelectedTypeId(null)
                  setSearchTerm("")
                }}
                className="mt-4 rounded-full bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear all filters
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
