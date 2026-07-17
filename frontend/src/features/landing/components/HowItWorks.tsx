import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface StepCardProps {
  number: string
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

function StepCard({ number, icon, title, description, index }: StepCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-950 dark:text-brand-300 dark:ring-brand-800">
        {icon}
      </div>
      <div className="mt-5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
        {number}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </motion.div>
  )
}

const steps = [
  {
    number: "1",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Create Your Profile",
    description:
      "Tell us about your education, skills, interests, and career goals. The more you share, the more personalized your roadmap becomes.",
  },
  {
    number: "2",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "AI Analysis",
    description:
      "Our AI analyzes your profile against market trends, identifying skill gaps and opportunities you might have never considered.",
  },
  {
    number: "3",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Get Your Roadmap",
    description:
      "Receive a detailed 6-month plan with weekly goals, curated resources, and real-world projects tailored to your target role.",
  },
  {
    number: "4",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Track & Grow",
    description:
      "Mark milestones as complete, build projects, and watch your progress. Your roadmap adapts as you grow and your goals evolve.",
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="how-it-works" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Your journey in four simple steps
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            From profile creation to career growth — we guide you at every step.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard key={step.title} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
