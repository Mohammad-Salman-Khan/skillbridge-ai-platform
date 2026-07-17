import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  initials: string
  index: number
}

function TestimonialCard({ quote, name, role, initials, index }: TestimonialCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="card card-hover p-8"
    >
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
          {initials}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{role}</div>
        </div>
      </div>
    </motion.div>
  )
}

const testimonials = [
  {
    quote:
      "I had no idea which skills to focus on. SkillBridge AI gave me a clear 6-month roadmap and I just landed my first internship at a tech startup.",
    name: "Priya Sharma",
    role: "B.Tech CSE, 3rd Year",
    initials: "PS",
  },
  {
    quote:
      "The project recommendations were exactly what I needed. I built 3 projects in 2 months and finally had something to show in interviews.",
    name: "Rahul Verma",
    role: "B.Sc Computer Science, Final Year",
    initials: "RV",
  },
  {
    quote:
      "What sets SkillBridge apart is how personalized everything feels. It's not generic advice — it's a plan built for my goals and my timeline.",
    name: "Ananya Patel",
    role: "MCA Student",
    initials: "AP",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Loved by students like you
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Hear from students who transformed their careers with SkillBridge AI.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
