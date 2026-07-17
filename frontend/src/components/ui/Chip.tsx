import { motion } from "framer-motion"

interface ChipProps {
  label: string
  onRemove?: () => void
  variant?: "default" | "brand" | "suggestion"
}

export default function Chip({ label, onRemove, variant = "brand" }: ChipProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all"

  const variants = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    brand: "bg-brand-50 text-brand-700 ring-1 ring-brand-200 dark:bg-brand-950 dark:text-brand-300 dark:ring-brand-800",
    suggestion:
      "bg-gray-50 text-gray-600 ring-1 ring-gray-200 cursor-pointer hover:bg-gray-100 hover:ring-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-gray-700 dark:hover:ring-gray-600",
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      layout
      className={`${base} ${variants[variant]}`}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-brand-200 dark:hover:bg-brand-800 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.span>
  )
}
