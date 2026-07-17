import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { profileApi } from '@/lib/api/profile'

export function useProfile() {
  const queryClient = useQueryClient()

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const res = await profileApi.get()
        return res.data
      } catch {
        return null
      }
    },
    retry: 1,
    staleTime: 60_000,
  })

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => profileApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    profile,
    isLoading,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  }
}
