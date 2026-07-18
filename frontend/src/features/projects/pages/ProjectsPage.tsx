import { motion } from 'framer-motion'

export default function ProjectsPage() {
  return (
    <div className="py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">Project Recommendations</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Build real-world projects to strengthen your portfolio</p>
        </div>
        <div className="card-hover relative overflow-hidden p-6 sm:p-8">
          <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/40 dark:to-violet-900/30"
            >
              <svg className="h-10 w-10 text-violet-500 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875s2.25.84 2.25 1.875c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.277.599.61.58a48.138 48.138 0 0 0 5.39-.607c0-1.613-.293-3.25-.315-4.907a.656.656 0 0 1 .658-.663v0c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.036 0 1.875-1.007 1.875-2.25s-.84-2.25-1.875-2.25c-.369 0-.713.128-1.003.349-.283.215-.604.401-.959.401v0c-.31 0-.555-.26-.532-.57a48.039 48.039 0 0 1 .642-5.056 48.377 48.377 0 0 0-4.616-.354.64.64 0 0 0-.657.643v0Z" />
              </svg>
            </motion.div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Discover Your Next Project</h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              AI-powered project recommendations tailored to your career goals will appear here once you generate your roadmap.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/profile'}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition-all hover:bg-violet-700 hover:shadow-md hover:shadow-violet-600/25 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Get Started
            </motion.button>
          </div>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-100/30 dark:bg-violet-900/10" />
          <div className="absolute -bottom-6 -right-4 h-20 w-20 rounded-full bg-violet-100/20 dark:bg-violet-900/5" />
        </div>
      </motion.div>
    </div>
  )
}
