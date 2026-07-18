import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface WelcomeCardProps {
  name: string
  careerGoal: string
}

const greetings = ['Good morning', 'Good afternoon', 'Good evening']

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return greetings[0]
  if (hour < 17) return greetings[1]
  return greetings[2]
}

const motivationalQuotes = [
  'Every small step today builds your future career.',
  'The best time to start was yesterday. The next best time is now.',
  'Your career journey is a marathon, not a sprint.',
  'Skills are the new currency of the professional world.',
  'Invest in yourself — it pays the best dividends.',
  'Growth begins at the edge of your comfort zone.',
  'Consistency beats intensity every time.',
  'Your future self will thank you for starting today.',
]

function getDailyQuote(): string {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return motivationalQuotes[dayOfYear % motivationalQuotes.length]
}

export default function WelcomeCard({ name, careerGoal }: WelcomeCardProps) {
  const [greeting, setGreeting] = useState('')
  const quote = useMemo(() => getDailyQuote(), [])

  useEffect(() => {
    setGreeting(getGreeting())
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="card-hover relative overflow-hidden p-6 sm:p-8"
    >
      <div className="relative z-10">
        <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
          {greeting || 'Welcome'}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {name || 'there'} 👋
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {careerGoal
            ? `Let's work toward your goal of becoming a ${careerGoal}. Here's your personalized learning roadmap.`
            : 'Set your career goal in your profile to get started with a personalized learning roadmap.'}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 flex items-start gap-2 rounded-xl bg-brand-50/70 px-4 py-3 dark:bg-brand-950/30"
        >
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <p className="text-sm italic text-brand-700 dark:text-brand-300">"{quote}"</p>
        </motion.div>
      </div>

      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-100/50 dark:bg-brand-900/20" />
      <div className="absolute -bottom-6 -right-4 h-20 w-20 rounded-full bg-brand-100/30 dark:bg-brand-900/10" />
    </motion.div>
  )
}
