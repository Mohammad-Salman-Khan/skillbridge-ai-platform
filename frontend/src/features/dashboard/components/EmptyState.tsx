import { motion } from 'framer-motion'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
        className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950/40 dark:to-brand-900/30"
      >
        <div className="text-brand-500 dark:text-brand-400">{icon}</div>
      </motion.div>
      <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {action && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={action.onClick}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/25 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  )
}
