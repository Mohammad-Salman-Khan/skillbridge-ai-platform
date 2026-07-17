export default function RoadmapPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/40">
        <svg className="h-8 w-8 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Roadmap</h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        View your roadmap on the dashboard after generating it from your profile.
      </p>
    </div>
  )
}
