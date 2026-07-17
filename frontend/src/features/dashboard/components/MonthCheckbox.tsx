import { motion } from 'framer-motion'

interface MonthCheckboxProps {
  month: number
  label: string
  checked: boolean
  isExpanded: boolean
  onToggle: (month: number) => void
  onExpand: () => void
}

export default function MonthCheckbox({
  month,
  label,
  checked,
  isExpanded,
  onToggle,
  onExpand,
}: MonthCheckboxProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onToggle(month)}
        className="relative flex h-10 w-10 shrink-0 items-center justify-center"
        aria-label={`Mark ${label} as ${checked ? 'incomplete' : 'complete'}`}
      >
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            checked
              ? 'border-brand-500 bg-brand-500 dark:border-brand-400 dark:bg-brand-400'
              : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
          }`}
        >
          <motion.svg
            initial={false}
            animate={checked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path d="M4.5 12.75l6 6 9-13.5" />
          </motion.svg>
        </div>
      </button>

      <button
        type="button"
        onClick={onExpand}
        className="flex flex-1 items-center justify-between gap-2 rounded-xl py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
      >
        <span
          className={`text-sm font-medium transition-colors ${
            checked
              ? 'text-gray-500 line-through dark:text-gray-400'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {label}
        </span>
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="mr-1 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </motion.svg>
      </button>
    </div>
  )
}
