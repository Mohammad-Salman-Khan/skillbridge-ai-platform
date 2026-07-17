import { Link } from "react-router-dom"

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 transition-colors duration-200">
      <div className="section-container py-12 sm:py-16">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
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
          </div>

          <nav className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Log in
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 dark:border-gray-800 sm:flex-row">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} SkillBridge AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Empowering students to build the careers they deserve.
          </p>
        </div>
      </div>
    </footer>
  )
}
