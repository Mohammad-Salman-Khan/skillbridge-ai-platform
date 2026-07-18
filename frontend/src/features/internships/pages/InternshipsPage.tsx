import { motion } from 'framer-motion'

export default function InternshipsPage() {
  return (
    <div className="py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">Internship Recommendations</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Find the perfect internship for your career path</p>
        </div>
        <div className="card-hover relative overflow-hidden p-6 sm:p-8">
          <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/30"
            >
              <svg className="h-10 w-10 text-rose-500 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </motion.div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Internships Coming Soon</h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              We're curating the best internship opportunities based on your career goal and skills. Check back after generating your roadmap.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/dashboard'}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-rose-600/20 transition-all hover:bg-rose-700 hover:shadow-md hover:shadow-rose-600/25 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              View Dashboard
            </motion.button>
          </div>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose-100/30 dark:bg-rose-900/10" />
          <div className="absolute -bottom-6 -right-4 h-20 w-20 rounded-full bg-rose-100/20 dark:bg-rose-900/5" />
        </div>
      </motion.div>
    </div>
  )
}
