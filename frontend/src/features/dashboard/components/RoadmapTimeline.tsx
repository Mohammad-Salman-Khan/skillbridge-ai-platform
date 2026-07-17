import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MonthlyRoadmap } from '@/lib/api/roadmap'
import type { ProgressSummary } from '@/lib/api/progress'
import { toTitleCase } from '@/lib/utils/helpers'
import MonthCheckbox from './MonthCheckbox'

interface RoadmapTimelineProps {
  roadmap: Record<string, MonthlyRoadmap>
  progress: ProgressSummary
  onToggleMonth: (monthName: string, currentCompleted: boolean) => void
}

const DETAIL_FIELDS: Array<'goal' | 'learning_focus' | 'resources'> = ['goal', 'learning_focus', 'resources']

export default function RoadmapTimeline({ roadmap, progress, onToggleMonth }: RoadmapTimelineProps) {
  const monthKeys = useMemo(() => Object.keys(roadmap), [roadmap])
  const [expandedMonth, setExpandedMonth] = useState<string>(monthKeys[0] || '')

  const completedMonthsSet = useMemo(() => {
    const set = new Set<string>()
    for (const entry of progress.entries) {
      if (entry.completed) set.add(entry.month_name)
    }
    return set
  }, [progress.entries])

  const progressPercent = progress.percentage

  const isAllCompleted = monthKeys.length > 0 && completedMonthsSet.size === monthKeys.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="card p-6 sm:p-8"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Roadmap</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {completedMonthsSet.size} of {monthKeys.length} months completed
          </p>
        </div>

        {isAllCompleted && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Complete
          </span>
        )}
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            progressPercent === 100
              ? 'bg-emerald-500'
              : progressPercent > 50
              ? 'bg-brand-500'
              : 'bg-amber-500'
          }`}
        />
      </div>

      <div className="relative space-y-2">
        {monthKeys.map((key, i) => {
          const details = roadmap[key]
          const isCompleted = completedMonthsSet.has(key)
          const isExpanded = expandedMonth === key
          const currentCompleted = progress.entries.find((e) => e.month_name === key)?.completed ?? false

          return (
            <div key={key} className="relative">
              {i < monthKeys.length - 1 && (
                <div
                  className={`absolute left-[23px] top-12 w-0.5 transition-colors duration-300 ${
                    isCompleted ? 'bg-brand-400 dark:bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  style={{ height: 'calc(100% + 0.5rem)' }}
                />
              )}

              <MonthCheckbox
                month={i + 1}
                label={key}
                checked={isCompleted}
                onToggle={() => onToggleMonth(key, currentCompleted)}
                isExpanded={isExpanded}
                onExpand={() => setExpandedMonth(isExpanded ? '' : key)}
              />

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key={`content-${key}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="ml-12 overflow-hidden"
                  >
                    <div className="space-y-3 pb-4 pt-2">
                      {DETAIL_FIELDS.map((field) => {
                        const value = details[field]
                        if (!value) return null
                        return (
                          <div key={field}>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                              {toTitleCase(field)}
                            </p>
                            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                              {value}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
