import { motion } from 'framer-motion'

interface ProgressCardProps {
  completed: number
  total: number
  percentage: number
}

export default function ProgressCard({ completed, total, percentage }: ProgressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="card p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Progress</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{completed} of {total} completed</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
          <span className="text-gray-400 dark:text-gray-500">{percentage < 100 ? 'Keep going!' : 'Complete!'}</span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className={`h-full rounded-full ${
              percentage === 100
                ? 'bg-emerald-500'
                : percentage > 50
                ? 'bg-brand-500'
                : 'bg-amber-500'
            }`}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors duration-500 ${
                i < completed ? 'bg-brand-500' : 'bg-gray-100 dark:bg-gray-800'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
