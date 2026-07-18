import { motion } from 'framer-motion'

export default function RoadmapPage() {
  return (
    <div className="py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">Roadmap</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your personalized career learning path</p>
        </div>
        <div className="card-hover relative overflow-hidden p-6 sm:p-8">
          <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950/40 dark:to-brand-900/30"
            >
              <svg className="h-10 w-10 text-brand-500 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </motion.div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Your Roadmap Awaits</h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              View and track your AI-generated career roadmap on the dashboard after setting up your profile.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/dashboard'}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/25 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Dashboard
            </motion.button>
          </div>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-100/30 dark:bg-brand-900/10" />
          <div className="absolute -bottom-6 -right-4 h-20 w-20 rounded-full bg-brand-100/20 dark:bg-brand-900/5" />
        </div>
      </motion.div>
    </div>
  )
}
