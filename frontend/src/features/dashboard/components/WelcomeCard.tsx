import { useEffect, useState } from 'react'
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

export default function WelcomeCard({ name, careerGoal }: WelcomeCardProps) {
  const [greeting, setGreeting] = useState('')

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
      </div>

      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-100/50 dark:bg-brand-900/20" />
      <div className="absolute -bottom-6 -right-4 h-20 w-20 rounded-full bg-brand-100/30 dark:bg-brand-900/10" />
    </motion.div>
  )
}
