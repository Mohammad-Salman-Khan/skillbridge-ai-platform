import { motion } from 'framer-motion'

export default function SkillGapPage() {
  return (
    <div className="py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">Skill Gap Analysis</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Identify and bridge your skill gaps</p>
        </div>
        <div className="card-hover relative overflow-hidden p-6 sm:p-8">
          <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/30"
            >
              <svg className="h-10 w-10 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </motion.div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Understand Your Gaps</h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              Your skill gap analysis will appear here after generating your career roadmap. It identifies exactly what you need to learn.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/profile'}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-amber-600/20 transition-all hover:bg-amber-700 hover:shadow-md hover:shadow-amber-600/25 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Complete Your Profile
            </motion.button>
          </div>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-100/30 dark:bg-amber-900/10" />
          <div className="absolute -bottom-6 -right-4 h-20 w-20 rounded-full bg-amber-100/20 dark:bg-amber-900/5" />
        </div>
      </motion.div>
    </div>
  )
}
