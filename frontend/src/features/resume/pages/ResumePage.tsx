import { motion } from 'framer-motion'

export default function ResumePage() {
  return (
    <div className="py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">Resume Suggestions</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Optimize your resume for your dream career</p>
        </div>
        <div className="card-hover relative overflow-hidden p-6 sm:p-8">
          <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/30"
            >
              <svg className="h-10 w-10 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </motion.div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Polish Your Resume</h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              Get AI-powered suggestions to make your resume stand out. Generate your roadmap first to receive tailored recommendations.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/profile'}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/25 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Set Up Profile
            </motion.button>
          </div>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-100/30 dark:bg-emerald-900/10" />
          <div className="absolute -bottom-6 -right-4 h-20 w-20 rounded-full bg-emerald-100/20 dark:bg-emerald-900/5" />
        </div>
      </motion.div>
    </div>
  )
}
