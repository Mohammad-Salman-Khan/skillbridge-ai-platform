import { motion } from 'framer-motion'

interface InterviewTipsProps {
  tips: string[]
}

export default function InterviewTips({ tips }: InterviewTipsProps) {
  if (!tips || tips.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="card p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Interview Preparation</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tips to ace your interviews</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 4, transition: { duration: 0.15 } }}
            transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
            className="group flex items-start gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-purple-50/50 dark:hover:bg-purple-950/20"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-[11px] font-bold text-purple-700 transition-all duration-200 group-hover:bg-purple-200 group-hover:shadow-sm dark:bg-purple-900/50 dark:text-purple-300 dark:group-hover:bg-purple-800/50">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{tip}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
