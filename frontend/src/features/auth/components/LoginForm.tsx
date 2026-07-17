import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'

interface FieldErrors {
  email?: string
  password?: string
}

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const { login, isLoading } = useAuth()

  function validate(): boolean {
    const next: FieldErrors = {}
    if (!email.trim()) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Invalid email address'
    }
    if (!password) {
      next.password = 'Password is required'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (validate()) {
      login({ email, password })
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome back</h2>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">Sign in to continue your journey</p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })) }}
          className={`block w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:placeholder:text-gray-500 ${
            errors.email
              ? 'border-red-300 focus:border-red-400 focus:ring-red-200 dark:border-red-500/50 dark:focus:ring-red-800'
              : 'border-gray-300 focus:border-brand-500 focus:ring-brand-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-brand-400 dark:focus:ring-brand-800'
          }`}
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-xs text-red-500 dark:text-red-400">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })) }}
          className={`block w-full rounded-xl border px-4 py-2.5 text-sm shadow-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:placeholder:text-gray-500 ${
            errors.password
              ? 'border-red-300 focus:border-red-400 focus:ring-red-200 dark:border-red-500/50 dark:focus:ring-red-800'
              : 'border-gray-300 focus:border-brand-500 focus:ring-brand-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-brand-400 dark:focus:ring-brand-800'
          }`}
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-xs text-red-500 dark:text-red-400">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading && (
          <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">Create one</Link>
      </p>
    </motion.form>
  )
}
