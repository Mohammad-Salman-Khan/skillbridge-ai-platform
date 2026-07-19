import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import VideoModal from "./VideoModal"

function HeroIllustration() {
  return (
    <svg viewBox="0 0 560 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="560" height="440" rx="20" fill="#F8FAFC" className="dark:fill-gray-800" />
      <rect x="40" y="32" width="200" height="24" rx="6" fill="#E2E8F0" className="dark:fill-gray-700" />
      <rect x="40" y="64" width="140" height="20" rx="4" fill="#DBEAFE" className="dark:fill-blue-900/40" />
      <rect x="40" y="104" width="480" height="8" rx="4" fill="#E2E8F0" className="dark:fill-gray-700" />
      <rect x="40" y="124" width="480" height="8" rx="4" fill="#E2E8F0" className="dark:fill-gray-700" opacity="0.5" />
      <rect x="40" y="144" width="320" height="8" rx="4" fill="#E2E8F0" className="dark:fill-gray-700" opacity="0.3" />

      <rect x="40" y="180" width="220" height="80" rx="12" fill="white" stroke="#E2E8F0" className="dark:fill-gray-800 dark:stroke-gray-700" />
      <rect x="56" y="196" width="16" height="16" rx="4" fill="#DBEAFE" className="dark:fill-blue-900/40" />
      <rect x="80" y="198" width="100" height="12" rx="3" fill="#2563EB" opacity="0.8" />
      <rect x="56" y="218" width="140" height="8" rx="4" fill="#94A3B8" className="dark:fill-gray-600" />
      <rect x="56" y="234" width="100" height="8" rx="4" fill="#CBD5E1" className="dark:fill-gray-600" />

      <rect x="280" y="180" width="220" height="80" rx="12" fill="white" stroke="#E2E8F0" className="dark:fill-gray-800 dark:stroke-gray-700" />
      <rect x="296" y="196" width="16" height="16" rx="4" fill="#DBEAFE" className="dark:fill-blue-900/40" />
      <rect x="320" y="198" width="100" height="12" rx="3" fill="#2563EB" opacity="0.8" />
      <rect x="296" y="218" width="140" height="8" rx="4" fill="#94A3B8" className="dark:fill-gray-600" />
      <rect x="296" y="234" width="100" height="8" rx="4" fill="#CBD5E1" className="dark:fill-gray-600" />

      <rect x="40" y="284" width="480" height="80" rx="14" fill="white" stroke="#E2E8F0" className="dark:fill-gray-800 dark:stroke-gray-700" />
      <rect x="56" y="300" width="200" height="12" rx="3" fill="#E2E8F0" className="dark:fill-gray-700" />
      <rect x="56" y="320" width="12" height="12" rx="3" fill="#22C55E" />
      <rect x="76" y="320" width="160" height="10" rx="3" fill="#DBEAFE" className="dark:fill-blue-900/40" />
      <rect x="260" y="320" width="12" height="12" rx="3" fill="#F59E0B" />
      <rect x="280" y="320" width="140" height="10" rx="3" fill="#DBEAFE" className="dark:fill-blue-900/40" />
      <rect x="444" y="320" width="12" height="12" rx="3" fill="#3B82F6" />
      <rect x="464" y="320" width="40" height="10" rx="3" fill="#DBEAFE" className="dark:fill-blue-900/40" />
      <rect x="56" y="344" width="100" height="8" rx="4" fill="#CBD5E1" className="dark:fill-gray-600" />

      <rect x="40" y="384" width="120" height="24" rx="8" fill="#2563EB" opacity="0.1" />
      <rect x="52" y="392" width="40" height="8" rx="4" fill="#2563EB" opacity="0.5" />
      <rect x="100" y="392" width="20" height="8" rx="4" fill="#2563EB" opacity="0.3" />

      <circle cx="440" cy="220" r="40" fill="#DBEAFE" opacity="0.5" className="dark:fill-blue-900/30" />
      <circle cx="440" cy="220" r="20" fill="#BFDBFE" opacity="0.6" className="dark:fill-blue-800/40" />
      <circle cx="440" cy="220" r="8" fill="#2563EB" opacity="0.3" />

      <path d="M344 220 L360 208 L376 220 L360 232 Z" fill="#2563EB" opacity="0.15" />
      <path d="M376 220 L392 208 L408 220 L392 232 Z" fill="#2563EB" opacity="0.25" />
      <path d="M408 220 L424 208 L440 220 L424 232 Z" fill="#2563EB" opacity="0.15" />
    </svg>
  )
}

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 sm:pt-32 lg:pt-36 dark:bg-gray-950">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
                AI-Powered Career Guidance
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight dark:text-white"
            >
              Your Career Path,{" "}
              <span className="gradient-text">Powered by AI.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400"
            >
              Get a personalized roadmap, discover your skill gaps, and build the
              career you've always dreamed of.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/register"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/25 active:scale-[0.98] transition-all"
              >
                Start Your Journey
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button onClick={() => setIsVideoOpen(true)} className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-brand-400 to-brand-600 dark:border-gray-950"
                    style={{ opacity: 1 - i * 0.15 }}
                  />
                ))}
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">2,000+</span>{" "}
                students already started
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-brand-100/50 to-transparent blur-xl dark:from-brand-900/20" />
              <div className="relative rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-800 dark:shadow-gray-950/50">
                <HeroIllustration />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none dark:from-gray-950" />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  )
}
