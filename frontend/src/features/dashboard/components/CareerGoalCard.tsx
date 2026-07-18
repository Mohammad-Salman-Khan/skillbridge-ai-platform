import { motion } from 'framer-motion'

interface CareerGoalCardProps {
  careerGoal: string
  careerSummary: string
}

export default function CareerGoalCard({ careerGoal, careerSummary }: CareerGoalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="card p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Career Goal</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your target role</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-50 to-brand-100 px-4 py-3 dark:from-brand-950/50 dark:to-brand-900/30">
          <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
          </svg>
          <span className="text-sm font-bold text-brand-800 dark:text-brand-300">{careerGoal}</span>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {careerSummary}
        </p>
      </div>
    </motion.div>
  )
}
