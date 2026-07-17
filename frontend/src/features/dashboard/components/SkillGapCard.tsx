import { motion } from 'framer-motion'

interface SkillGapCardProps {
  skillGaps: string[]
}

export default function SkillGapCard({ skillGaps }: SkillGapCardProps) {
  if (!skillGaps || skillGaps.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="card p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skill Gap</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Skills to develop</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {skillGaps.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
            className="flex items-center gap-2.5 rounded-lg border border-rose-100 bg-rose-50/50 px-3.5 py-2.5 dark:border-rose-900/50 dark:bg-rose-950/30"
          >
            <svg className="h-4 w-4 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
