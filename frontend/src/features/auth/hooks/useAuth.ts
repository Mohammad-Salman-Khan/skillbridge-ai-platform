import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/lib/api/auth'
import { useToast } from '@/contexts/ToastContext'

export function useAuth() {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token)
      navigate('/profile')
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        'Login failed'
      addToast(message, 'error')
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      authApi.register({ full_name: data.name, email: data.email, password: data.password }),
    onSuccess: () => {
      addToast('Account created successfully.', 'success')
      navigate('/login')
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        'Registration failed'
      addToast(message, 'error')
    },
  })

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  }
}
