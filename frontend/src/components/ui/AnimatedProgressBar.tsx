import { motion } from "framer-motion"

interface AnimatedProgressBarProps {
  value: number
  total: number
}

export default function AnimatedProgressBar({ value, total }: AnimatedProgressBarProps) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">Profile Completion</span>
        <span className="text-gray-500 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full transition-colors duration-500 ${
            percentage === 100
              ? "bg-green-500"
              : percentage > 50
              ? "bg-brand-500"
              : "bg-brand-400"
          }`}
        />
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {value} of {total} sections complete
      </p>
    </div>
  )
}
