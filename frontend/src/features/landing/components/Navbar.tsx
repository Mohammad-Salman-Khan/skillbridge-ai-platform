import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-gray-100/80 shadow-sm dark:border-gray-800/80"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex h-16 sm:h-18 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            SkillBridge AI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-[0.98] transition-all"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="flex w-5 flex-col gap-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-full rounded-full bg-gray-600 dark:bg-gray-400"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-full rounded-full bg-gray-600 dark:bg-gray-400"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-full rounded-full bg-gray-600 dark:bg-gray-400"
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden"
          >
            <div className="section-container flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <hr className="my-2 border-gray-100 dark:border-gray-800" />
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white text-center hover:bg-brand-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
