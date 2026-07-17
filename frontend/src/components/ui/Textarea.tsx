import { TextareaHTMLAttributes, forwardRef } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          className={`block w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-gray-500 ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-200 dark:border-red-500/50 dark:focus:ring-red-800"
              : "border-gray-300 focus:border-brand-500 focus:ring-brand-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-brand-400 dark:focus:ring-brand-800"
          } ${className}`}
          rows={4}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export default Textarea
