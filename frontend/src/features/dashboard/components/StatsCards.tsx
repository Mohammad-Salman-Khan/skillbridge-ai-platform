import { motion } from 'framer-motion'
import type { GenerateRoadmapResponse } from '@/lib/api/roadmap'

interface StatsCardsProps {
  roadmap: GenerateRoadmapResponse | null
  profileProgress: { completed: number; total: number; percentage: number }
  hasRoadmap: boolean
}

const statItems = [
  {
    key: 'roadmaps',
    label: 'Roadmaps Generated',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
    gradient: 'from-blue-500/10 to-transparent',
    getValue: (props: StatsCardsProps) => props.hasRoadmap ? '1' : '0',
    getSuffix: () => '',
  },
  {
    key: 'skills',
    label: 'Skills to Learn',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
    gradient: 'from-amber-500/10 to-transparent',
    getValue: (props: StatsCardsProps) => props.roadmap?.skill_gap?.length.toString() || '0',
    getSuffix: () => '',
  },
  {
    key: 'projects',
    label: 'Projects Recommended',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875s2.25.84 2.25 1.875c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.277.599.61.58a48.138 48.138 0 0 0 5.39-.607c0-1.613-.293-3.25-.315-4.907a.656.656 0 0 1 .658-.663v0c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.036 0 1.875-1.007 1.875-2.25s-.84-2.25-1.875-2.25c-.369 0-.713.128-1.003.349-.283.215-.604.401-.959.401v0c-.31 0-.555-.26-.532-.57a48.039 48.039 0 0 1 .642-5.056 48.377 48.377 0 0 0-4.616-.354.64.64 0 0 0-.657.643v0Z" />
      </svg>
    ),
    color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400',
    gradient: 'from-violet-500/10 to-transparent',
    getValue: (props: StatsCardsProps) => props.roadmap?.recommended_projects?.length.toString() || '0',
    getSuffix: () => '',
  },
  {
    key: 'resume',
    label: 'Profile Score',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
    gradient: 'from-emerald-500/10 to-transparent',
    getValue: (props: StatsCardsProps) => `${props.profileProgress.percentage}%`,
    getSuffix: (props: StatsCardsProps) => `${props.profileProgress.completed}/${props.profileProgress.total}`,
  },
  {
    key: 'internships',
    label: 'Internships Explored',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    ),
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400',
    gradient: 'from-rose-500/10 to-transparent',
    getValue: () => 'Explore',
    getSuffix: () => 'Coming Soon',
  },
]

export default function StatsCards(props: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {statItems.map((item, index) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="stat-card group cursor-default"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.06, type: 'spring', stiffness: 200 }}
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.color} transition-transform duration-300 group-hover:scale-110`}
            >
              {item.icon}
            </motion.div>
            <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.getValue(props)}
            </p>
            <p className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
            <p className="mt-0.5 text-[10px] text-gray-400 dark:text-gray-500">
              {item.getSuffix(props)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
