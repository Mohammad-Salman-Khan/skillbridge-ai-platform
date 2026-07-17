import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import ToastContainer, { type ToastData } from '@/components/ui/Toast'

interface ToastContextValue {
  addToast: (message: string, type: 'error' | 'success') => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((message: string, type: 'error' | 'success') => {
    const id = crypto.randomUUID()
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
