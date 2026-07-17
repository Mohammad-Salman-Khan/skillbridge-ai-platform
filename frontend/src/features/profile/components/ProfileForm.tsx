import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"
import AnimatedProgressBar from "@/components/ui/AnimatedProgressBar"
import ToastContainer, { type ToastData } from "@/components/ui/Toast"
import { roadmapApi, type GenerateRoadmapResponse } from "@/lib/api/roadmap"
import SkillInput from "./SkillInput"
import InterestSelector from "./InterestSelector"
import TimeSelector from "./TimeSelector"
import { toTitleCase } from "@/lib/utils/helpers"

interface FormData {
  fullName: string
  college: string
  degree: string
  year: string
  skills: string[]
  careerGoal: string
  interests: string[]
  learningTime: string
}

interface FormErrors {
  [key: string]: string
}

const INITIAL_DATA: FormData = {
  fullName: "",
  college: "",
  degree: "",
  year: "",
  skills: [],
  careerGoal: "",
  interests: [],
  learningTime: "",
}

const DEGREE_OPTIONS = [
  "B.Tech",
  "B.Sc",
  "B.Com",
  "B.A.",
  "BCA",
  "BBA",
  "M.Tech",
  "M.Sc",
  "MCA",
  "MBA",
  "Other",
]

const YEAR_OPTIONS = ["1st", "2nd", "3rd", "4th", "5th", "Graduate"]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function ProfileForm() {
  const [data, setData] = useState<FormData>(INITIAL_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [roadmapResult, setRoadmapResult] = useState<GenerateRoadmapResponse | null>(null)
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((message: string, type: ToastData["type"]) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const completedCount = useMemo(() => {
    let count = 0
    if (data.fullName.trim().length >= 2) count++
    if (data.college.trim().length > 0) count++
    if (data.degree.trim().length > 0) count++
    if (data.year.trim().length > 0) count++
    if (data.skills.length > 0) count++
    if (data.careerGoal.trim().length >= 3) count++
    if (data.interests.length > 0) count++
    if (data.learningTime.length > 0) count++
    return count
  }, [data])

  const totalSections = 8

  function updateField<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) {
    setData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (data.fullName.trim().length < 2) {
      newErrors.fullName = "Enter your full name (at least 2 characters)"
    }
    if (!data.college.trim()) {
      newErrors.college = "Enter your college or university name"
    }
    if (!data.degree.trim()) {
      newErrors.degree = "Select your degree"
    }
    if (!data.year.trim()) {
      newErrors.year = "Select your current year"
    }
    if (data.skills.length === 0) {
      newErrors.skills = "Add at least one skill"
    }
    if (data.careerGoal.trim().length < 3) {
      newErrors.careerGoal = "Enter your career goal (at least 3 characters)"
    }
    if (data.interests.length === 0) {
      newErrors.interests = "Select at least one interest"
    }
    if (!data.learningTime) {
      newErrors.learningTime = "Select your daily learning time"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setRoadmapResult(null)

    try {
      const payload = {
        name: data.fullName.trim(),
        degree: data.degree,
        year: data.year,
        skills: data.skills,
        careerGoal: data.careerGoal.trim(),
      }

      const response = await roadmapApi.generate(payload)
      const roadmapData = response.data
      setRoadmapResult(roadmapData)
      localStorage.setItem('roadmap_data', JSON.stringify(roadmapData))
      localStorage.setItem('roadmap_user_data', JSON.stringify(payload))

      roadmapApi.save(roadmapData).catch(() => {
        // Backend save is best-effort; data is always in localStorage as fallback
      })

      addToast("Your AI career roadmap is ready!", "success")
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      addToast(message, "error")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-2xl space-y-10 pb-16"
      >
        <motion.div variants={sectionVariants}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/50 dark:text-brand-400">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Create Your AI Career Profile
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Tell us about yourself so our AI can build your personalized
                career roadmap.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <AnimatedProgressBar value={completedCount} total={totalSections} />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Let's start with the basics.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Full Name"
                placeholder="e.g. Priya Sharma"
                value={data.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                error={errors.fullName}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="College / University"
                placeholder="e.g. Indian Institute of Technology"
                value={data.college}
                onChange={(e) => updateField("college", e.target.value)}
                error={errors.college}
              />
            </div>
            <div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Degree
                </label>
                <select
                  value={data.degree}
                  onChange={(e) => updateField("degree", e.target.value)}
                  className={`block w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                    errors.degree
                      ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                      : "border-gray-300 focus:border-brand-500 focus:ring-brand-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-700"
                  }`}
                >
                  <option value="" disabled>
                    Select degree
                  </option>
                  {DEGREE_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.degree && (
                  <p className="text-xs text-red-500">{errors.degree}</p>
                )}
              </div>
            </div>
            <div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
                <select
                  value={data.year}
                  onChange={(e) => updateField("year", e.target.value)}
                  className={`block w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                    errors.year
                      ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                      : "border-gray-300 focus:border-brand-500 focus:ring-brand-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-700"
                  }`}
                >
                  <option value="" disabled>
                    Select year
                  </option>
                  {YEAR_OPTIONS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                {errors.year && (
                  <p className="text-xs text-red-500">{errors.year}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            What technologies and tools do you know? Add at least one.
          </p>
          <div className="mt-6">
            <SkillInput
              skills={data.skills}
              onAdd={(skill) =>
                updateField("skills", [...data.skills, skill])
              }
              onRemove={(skill) =>
                updateField(
                  "skills",
                  data.skills.filter((s) => s !== skill)
                )
              }
              error={errors.skills}
            />
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Career Goal</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            What's your dream role? Be specific — the more detail, the better your
            roadmap.
          </p>
          <div className="mt-6">
            <Textarea
              label="Dream Role"
              placeholder="Example: AI Engineer at a top tech company"
              value={data.careerGoal}
              onChange={(e) => updateField("careerGoal", e.target.value)}
              error={errors.careerGoal}
              hint="Think about the role, industry, and company type you're aiming for."
            />
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Interests</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Select the areas that excite you the most.
          </p>
          <div className="mt-6">
            <InterestSelector
              interests={data.interests}
              onToggle={(id) => {
                const next = data.interests.includes(id)
                  ? data.interests.filter((i) => i !== id)
                  : [...data.interests, id]
                updateField("interests", next)
              }}
              error={errors.interests}
            />
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Daily Learning Time
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            How much time can you dedicate each day? This helps us pace your
            roadmap.
          </p>
          <div className="mt-6">
            <TimeSelector
              value={data.learningTime}
              onChange={(v) => updateField("learningTime", v)}
              error={errors.learningTime}
            />
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="pt-2">
          <Button
            type="submit"
            size="lg"
            loading={submitting}
            className="w-full"
          >
            {submitting
              ? "Generating AI Roadmap..."
              : "Generate My AI Roadmap"}
          </Button>
          <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
            Your profile data is used only to personalize your career roadmap.
          </p>
        </motion.div>
      </motion.form>

      <AnimatePresence mode="wait">
        {roadmapResult && (
          <motion.div
            key="roadmap-result"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="mx-auto max-w-2xl space-y-6 pb-16"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Your AI Career Roadmap
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Built for {data.fullName} — {data.degree}, {data.year} Year
                </p>
              </div>
            </div>

            {(
              [
                "career_summary",
                "skill_gap",
                "six_month_roadmap",
                "recommended_projects",
                "interview_preparation_tips",
              ] as const
            ).map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                    {String.fromCharCode(
                      "career_summary" === key
                        ? 65
                        : "skill_gap" === key
                        ? 66
                        : "six_month_roadmap" === key
                        ? 67
                        : "recommended_projects" === key
                        ? 68
                        : 69
                    )}
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {toTitleCase(key)}
                  </h3>
                </div>

                {key === "career_summary" ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {roadmapResult.career_summary}
                  </p>
                ) : key === "six_month_roadmap" ? (
                  <div className="space-y-6">
                    {Object.entries(roadmapResult.six_month_roadmap).map(
                      ([month, details]) => (
                        <div key={month} className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                          <h4 className="text-sm font-semibold text-brand-700 dark:text-brand-400 mb-3">
                            {month}
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(details).map(([field, value]) => (
                              <div key={field}>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  {toTitleCase(field)}
                                </span>
                                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap mt-0.5">
                                  {value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <ul className="list-disc list-inside space-y-1.5">
                    {(roadmapResult[key] as string[]).map((item, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
