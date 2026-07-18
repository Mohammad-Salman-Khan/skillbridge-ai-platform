import { motion } from 'framer-motion'

function SkeletonBar({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="card p-6 sm:p-8">
        <SkeletonBar className="mb-3 h-4 w-24" />
        <SkeletonBar className="mb-2 h-8 w-64" />
        <SkeletonBar className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="stat-card">
            <SkeletonBar className="mb-3 h-10 w-10" />
            <SkeletonBar className="mb-1 h-7 w-16" />
            <SkeletonBar className="h-3 w-20" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card p-6 sm:p-8">
            <SkeletonBar className="mb-2 h-6 w-48" />
            <SkeletonBar className="mb-6 h-4 w-36" />
            <SkeletonBar className="mb-4 h-2 w-full" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-4 flex items-center gap-4">
                <SkeletonBar className="h-7 w-7 rounded-full" />
                <SkeletonBar className="h-5 flex-1" />
              </div>
            ))}
          </div>
          <div className="card p-6 sm:p-8">
            <SkeletonBar className="mb-2 h-6 w-48" />
            <SkeletonBar className="mb-4 h-4 w-36" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBar key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-6 sm:p-8">
              <SkeletonBar className="mb-3 h-10 w-10" />
              <SkeletonBar className="mb-2 h-5 w-32" />
              <SkeletonBar className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
