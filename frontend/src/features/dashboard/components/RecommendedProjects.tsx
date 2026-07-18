import { motion } from 'framer-motion'

interface RecommendedProjectsProps {
  projects: string[]
}

const PROJECT_COLORS = [
  { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500', tag: 'Web' },
  { bg: 'bg-violet-50 dark:bg-violet-950/40', text: 'text-violet-700 dark:text-violet-300', dot: 'bg-violet-500', tag: 'AI/ML' },
  { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500', tag: 'API' },
  { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500', tag: 'Full Stack' },
  { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-300', dot: 'bg-rose-500', tag: 'Mobile' },
]

const PROJECT_TAGS = ['Web', 'AI/ML', 'API', 'Full Stack', 'Mobile', 'DevOps', 'Data', 'Cloud']

export default function RecommendedProjects({ projects }: RecommendedProjectsProps) {
  if (!projects || projects.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="card p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875s2.25.84 2.25 1.875c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.277.599.61.58a48.138 48.138 0 0 0 5.39-.607c0-1.613-.293-3.25-.315-4.907a.656.656 0 0 1 .658-.663v0c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.036 0 1.875-1.007 1.875-2.25s-.84-2.25-1.875-2.25c-.369 0-.713.128-1.003.349-.283.215-.604.401-.959.401v0c-.31 0-.555-.26-.532-.57a48.039 48.039 0 0 1 .642-5.056 48.377 48.377 0 0 0-4.616-.354.64.64 0 0 0-.657.643v0Z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended Projects</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Build these to strengthen your portfolio</p>
        </div>
        {projects.length > 0 && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
            {projects.length} projects
          </span>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {projects.map((project, i) => {
          const color = PROJECT_COLORS[i % PROJECT_COLORS.length]
          const tag = PROJECT_TAGS[i % PROJECT_TAGS.length]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ x: 4, transition: { duration: 0.15 } }}
              transition={{ delay: 0.35 + i * 0.06, duration: 0.3 }}
              className={`flex items-start gap-3 rounded-xl ${color.bg} p-4 transition-all duration-200 hover:shadow-sm`}
            >
              <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color.dot}`} />
              <div className="flex-1">
                <p className={`text-sm leading-relaxed ${color.text}`}>{project}</p>
              </div>
              <span className="shrink-0 rounded-md bg-white/60 px-2 py-0.5 text-[10px] font-medium text-gray-500 shadow-sm dark:bg-gray-800/60 dark:text-gray-400">
                {tag}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
