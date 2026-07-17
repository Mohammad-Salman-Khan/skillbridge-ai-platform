import { forwardRef } from "react"
import { motion, HTMLMotionProps } from "framer-motion"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size" | "children"> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-sm shadow-brand-600/20 hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/25 active:bg-brand-800",
  secondary:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100",
  ghost:
    "text-gray-600 hover:bg-gray-100 active:bg-gray-200",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-sm",
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, icon, children, className = "", disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon ? (
          icon
        ) : null}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export default Button
