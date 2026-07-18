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
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:bg-rose-900/40 dark:text-rose-400">
          {skillGaps.length} gaps
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {skillGaps.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 4, transition: { duration: 0.15 } }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
            className="group flex items-center gap-3 rounded-lg border border-rose-100 bg-rose-50/50 px-3.5 py-2.5 transition-all duration-200 hover:border-rose-200 hover:bg-rose-50 hover:shadow-sm dark:border-rose-900/50 dark:bg-rose-950/30 dark:hover:border-rose-800 dark:hover:bg-rose-950/50"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-rose-100 text-rose-500 dark:bg-rose-900/50 dark:text-rose-400">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
            <span className="rounded-md bg-rose-200/50 px-1.5 py-0.5 text-[10px] font-medium text-rose-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-rose-800/50 dark:text-rose-400">
              Priority
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
