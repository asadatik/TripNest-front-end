

export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 border-t-fuchsia-400/60 animate-spin" />
          <span className="text-lg font-semibold text-cyan-100">T</span>
        </div>

        <p className="bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 bg-clip-text text-xs font-semibold uppercase tracking-[0.2em] text-transparent">
          TripNest is preparing your journey
        </p>
        <p className="text-[11px] text-slate-300/80">
          Loading your curated packages and dashboard. Please wait a moment.
        </p>

        <div className="mt-1 flex gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.2s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-300 [animation-delay:-0.1s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fuchsia-300" />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
    </div>
  )
}
