import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group card card-hover p-8"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all group-hover:bg-brand-100 group-hover:ring-brand-200 dark:bg-brand-950 dark:text-brand-300 dark:ring-brand-800 dark:group-hover:bg-brand-900 dark:group-hover:ring-brand-700">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  )
}

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "AI Career Analysis",
    description:
      "Upload your skills, interests, and goals. Our AI analyzes your profile against industry trends to identify your strengths and untapped opportunities.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Personalized Learning Roadmap",
    description:
      "Get a step-by-step 6-month plan tailored to your dream role. Each milestone includes curated resources, projects, and skill-building exercises.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Project Recommendations",
    description:
      "Build real-world projects tailored to close your skill gaps. Get hands-on experience that actually impresses recruiters and prepares you for interviews.",
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Everything you need to bridge the gap
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            SkillBridge AI combines career counseling, skill analysis, and
            project-based learning into one seamless experience.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
