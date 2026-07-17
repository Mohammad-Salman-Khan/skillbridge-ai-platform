import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export interface ToastData {
  id: string
  message: string
  type: "error" | "success"
}

interface ToastContainerProps {
  toasts: ToastData[]
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 5000)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 shadow-lg backdrop-blur-sm ${
        toast.type === "error"
          ? "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
          : "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
      }`}
    >
      {toast.type === "error" ? (
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ) : (
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded-md p-0.5 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  )
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 sm:top-6">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-full max-w-sm px-4 sm:px-0">
            <ToastItem toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
