import { Link } from 'react-router-dom'

export default function DashboardFooter() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row sm:px-8">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} SkillBridge AI. All rights reserved.
        </p>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xs text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            About
          </Link>
          <span className="text-xs text-gray-300 dark:text-gray-600">Privacy</span>
          <span className="text-xs text-gray-300 dark:text-gray-600">Terms</span>
          <span className="text-xs text-gray-300 dark:text-gray-600">Contact</span>
          <span className="text-[11px] text-gray-300 dark:text-gray-600">v1.0.0</span>
        </nav>
      </div>
    </footer>
  )
}
