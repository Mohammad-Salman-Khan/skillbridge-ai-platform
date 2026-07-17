import { motion } from "framer-motion"

interface TimeSelectorProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const TIME_OPTIONS = [
  { value: "less-than-1", label: "Less than 1 hour", description: "Busy schedule" },
  { value: "1-2", label: "1–2 hours", description: "Moderate pace" },
  { value: "3-5", label: "3–5 hours", description: "Fast progress" },
  { value: "5-plus", label: "5+ hours", description: "Intensive focus" },
]

export default function TimeSelector({ value, onChange, error }: TimeSelectorProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Daily Learning Time
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        {TIME_OPTIONS.map((option) => {
          const selected = value === option.value
          return (
            <motion.button
              key={option.value}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(option.value)}
              className={`rounded-xl border px-4 py-3.5 text-left transition-all ${
                selected
                  ? "border-brand-200 bg-brand-50 ring-1 ring-brand-200 dark:border-brand-700 dark:bg-brand-950/40 dark:ring-brand-700"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                    selected
                      ? "border-brand-600 bg-brand-600 dark:border-brand-400 dark:bg-brand-400"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {selected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-2 w-2 rounded-full bg-white"
                    />
                  )}
                </div>
                <div>
                  <div
                    className={`text-sm font-medium ${
                      selected ? "text-brand-700 dark:text-brand-300" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {option.description}
                  </div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  )
}
