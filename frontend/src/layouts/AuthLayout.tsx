import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-brand-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-brand-950/20">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 shadow-lg shadow-brand-600/20">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                SkillBridge AI
              </span>
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200/60 bg-white p-8 shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-950/50">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
